import Base from '../base_page'

const el = require('./elements').ELEMENTS;

export class Extratos extends Base {

    static validaQuantidadeDeTransacoes(qtde, option = ""){
        super.validateElementLenght(el.EXTRATO.LINHAS, qtde, option)
    }

    static validaUltimaTransacaoRealizada(descricao, valor){
        super.getElementByXPath(el.EXTRATO.FN_XP_BUSCA_ELEMENTO(descricao, valor)).should('exist')
    }

    static editarTransacao(descricaoTransacao){
        super.esperaImplicitaByXpath("GET", "/transacoes/**", 
            el.EXTRATO.FN_XP_EDITAR_ELEMENTO(descricaoTransacao), undefined, false, true)
    }

    static removerTransacao(descricaoTransacao){
        super.clickOnElementByXpath(el.EXTRATO.FN_XP_REMOVER_ELEMENTO(descricaoTransacao))
    }
}

