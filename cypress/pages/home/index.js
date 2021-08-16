import Base from '../base_page'

const el = require('./elements').ELEMENTS;

export class Home extends Base {

    static validaSaldoConta(nomeConta, valor){
        super.getElementByXPath(el.SALDO.FN_XP_SALDO_CONTA(nomeConta)).should('contain', valor)
    }
    
}

