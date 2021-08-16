import Base from '../base_page'

const el = require('./elements').ELEMENTS;

export class Extratos extends Base {

    static validaQuantidadeDeTransacoes(qtde, operador = ""){
        super.validateElementLenght(el.EXTRATO.LINHAS, qtde, operador)
    }

    static validaUltimaTransacaoRealizada(descricao, valor){
        let valorApresentado = parseFloat(valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        //let valorApresentado = parseFloat(valor).toLocaleString('pt-br', {minimumFractionDigits: 2});

        super.getElementByXPath(el.EXTRATO.FN_XP_BUSCA_ELEMENTO(descricao, valorApresentado)).should('be.visible')
    }

    static editarTransacao(descricaoTransacao){
        super.esperaImplicitaByXpath("GET", "/transacoes/**", 
            el.EXTRATO.FN_XP_EDITAR_ELEMENTO(descricaoTransacao), undefined, false, true)
    }

    static removerTransacao(descricaoTransacao){
        super.clickOnElementByXpath(el.EXTRATO.FN_XP_REMOVER_ELEMENTO(descricaoTransacao))
    }
}

