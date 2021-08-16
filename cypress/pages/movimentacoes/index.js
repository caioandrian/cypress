import Base from '../base_page'

const el = require('./elements').ELEMENTS;

export class Movimentacao extends Base {

    static inserirTransacao(desc, valor, interessado, nome_conta){
        super.setElementTypeValue(el.MOVIMENTACAO.DESCRICAO,desc)
        super.setElementTypeValue(el.MOVIMENTACAO.VALOR,valor)
        super.setElementTypeValue(el.MOVIMENTACAO.INTERESSADO,interessado)
        super.selectOption(el.MOVIMENTACAO.CONTA, nome_conta)

        this.salvar()
    }

    static validaCampos(descricao, contaSelecionada){
        super.validateValElement(el.MOVIMENTACAO.DESCRICAO, descricao)
        super.clickOnElement(el.MOVIMENTACAO.STATUS)
        super.selectOption(el.MOVIMENTACAO.CONTA, contaSelecionada)
    }

    static salvar(){
        super.clickOnElement(el.MOVIMENTACAO.BTN_SALVAR)
    }
}

