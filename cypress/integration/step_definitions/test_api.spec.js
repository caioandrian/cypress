/// <reference types="cypress" />
import {Given, When, Then, After, Before, And} from 'cypress-cucumber-preprocessor/steps'

import {API} from '../../services/minha_api.service'

Given(`que esteja com um token válido`, ()=>{
    API.getToken('caio@caio', '123')
})

Given(`que o saldo da conta {string} esteja com {string}`, (nomeConta, valor)=>{
    API.validaSaldoConta(nomeConta, valor);
})

Given(`tenha resetado o banco de dados pela rota`, ()=>{
    API.resetAppByApi();
})

When('criar uma nova conta com o nome {string}', (tipoNome) => {
    API.criarUmaConta(tipoNome).as('response')
})

When('atualizar o nome da conta {string} pelo nome {string}', (nome_atual_conta, novo_nome) => {
    API.atualizarUmaConta(nome_atual_conta, novo_nome).as('response')
})

When('criar uma nova transação na conta {string}', (nomeConta) => {
    API.criarUmaTransacaoNaConta(nomeConta).as('response')
})

When('deletar a transação com a descrição {string}', (descricao_transacao) => {
    API.removerUmaTransacao(descricao_transacao).as('response')
})

When('atualizar o status da transação com a descrição {string}', (descricaoTransacao) => {
    API.atualizaUmaTransacaoPorDescricao(descricaoTransacao).as('response')
})

Then(`deverá apresentar o saldo atualizado na conta {string} com valor {string}`, (nomeConta, valor) => {
    API.validaSaldoConta(nomeConta, valor);
})

Then(`deve apresentar no corpo da resposta o conteúdo {string}`, (tipoRetornoEsperado) => {
    cy.get('@response').then((res) => {
        API.validaCorpoDaResposta(res, tipoRetornoEsperado)
    })
})

Then(`deve obter como resposta o schema {string} com status {int}`, (schema, status) => {
	cy.get('@response').then(res => {
        cy.validacaoDeContrato(res, schema, status).then(valid => {
            expect(valid).to.be.true;
        })
    })
});