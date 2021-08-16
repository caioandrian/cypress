import Base from '../base_page'

const el = require('./elements').ELEMENTS;

export class Conta extends Base{

    static inserirConta(nomeConta){
        super.setElementTypeValue(el.CONTAS.NOME,nomeConta)
        super.clickOnElement(el.CONTAS.BTN_SALVAR)
    }

    static editarUmaConta(nomeConta){
        super.getElementByXPath(el.CONTAS.FN_XP_BTN_ALTERAR(nomeConta)).click()
        super.clickOnElement(el.CONTAS.BTN_SALVAR)
    }
}

