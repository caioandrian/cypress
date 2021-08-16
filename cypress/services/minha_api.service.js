import Rest from './common/_rest_service'

const URL_VOTES = '/votes'

export class API extends Rest{

    static getToken(user, passwd){
        let body = {email: user, redirecionar: false, senha: passwd}

        super.httpRequestWithBody('POST', '/signin', body)
            .its('body.token')
            .should('not.be.empty')
            .then(token => {
                Cypress.env('token', token)
                return token;
            })
    }

    static resetAppByApi(){
        super.httpRequestWithoutBody('GET', '/reset').its('status').should('be.eq', 200)
    }

    static criarUmaConta(){
        let body = {nome: "Conta qualquer 5"}
        return super.httpRequestWithBody('POST', '/contas', body)
    }

    static criarUmaContaDuplicada(){
        let body = {nome: "Conta para alterar"}
        return super.httpRequestWithBody('POST', '/contas', body)
    }

    static getContaPorName_QS(nomeconta){
        return super.httpRequestWithoutBody('GET', '/contas', {}, {nome: nomeconta})
    }

    static atualizarUmaConta(nomeConta){
        return this.getContaPorName_QS(nomeConta).then(res => {
            let body = {nome: "conta alterada via rest"}
            super.httpRequestWithBody('PUT', `/contas/${res.body[0].id}`, body)
        })
    }

    static criarUmaTransacaoNaConta(nomeConta){
        return this.getContaPorName_QS(nomeConta)
            .then((res) => {
                let body = {
                    conta_id: res.body[0].id,
                    data_pagamento: "20/10/2025",
                    data_transacao: "18/02/2021",
                    descricao: "desc",
                    envolvido: "inter",
                    status: true,
                    tipo: "REC",
                    valor: "123"
                }

                super.httpRequestWithBody('POST', '/transacoes', body)
            })
    }

    static validaSaldoConta(nomeConta, valor){
        super.httpRequestWithoutBody('GET', '/saldo').then((res) => {
            let saldoConta = null

            res.body.forEach(c => {
                if(c.conta === nomeConta)
                    saldoConta = c.saldo
            })
            expect(saldoConta).to.be.eq(valor)
        })
    }

    static pegarIdTransacaoPorDescricao_QS(descricaoTransacao){
        return super.httpRequestWithoutBody('GET', '/transacoes', {}, {descricao: descricaoTransacao} )
    }

    static atualizaUmaTransacaoPorDescricao(descricaoTransacao){
        return this.pegarIdTransacaoPorDescricao_QS(descricaoTransacao).then( (res) => {
            let body = {
                status: true,
                data_transacao: "11/02/2021",
                data_pagamento: "18/02/2021",
                descricao: res.body[0].descricao,
                envolvido: res.body[0].envolvido,
                valor: res.body[0].valor,
                conta_id: res.body[0].conta_id
            }

            super.httpRequestWithBody('PUT', `/transacoes/${res.body[0].id}`, body)
                .its('status')
                .should('be.equal', 200)
        })
    }

    static removerUmaContaDeMovimentacao(descricaoTransacao){
        return this.pegarIdTransacaoPorDescricao_QS(descricaoTransacao).then((res) => {
            super.httpRequestWithoutBody('DELETE', `/transacoes/${res.body[0].id}`)
        })
    }
}
