import Base from '../base_page'

const el = require('./elements').ELEMENTS;

export class Head extends Base{

    static acessarMenuConta(){
        super.esperaImplicita("GET", "/contas", el.MENU.SETTINGS, el.MENU.CONTAS, undefined, false, true);
    }

    static acessarMenuHome(){
        super.esperaImplicita("GET", "/saldo", el.MENU.HOME, undefined, false, true);
    }

    static acessarMenuExtratos(){
        super.esperaImplicita("GET", "/extrato/**", el.MENU.EXTRATO, undefined, false, true);
    }

    static acessarMenuMovimentacao(){
        super.esperaImplicita("GET", "/contas", el.MENU.MOVIMENTACAO, undefined, false, true );
    }

    static validaMensagemToast(texto){
        super.esperaExplicita(2000)
        super.validateTextElement(el.MESSAGE, texto)
        super.clickOnElement(el.BTN_CLOSE_MESSAGE)
    }

    static resetApp(){
        super.esperaExplicita()
        super.clickOnElement(el.MENU.SETTINGS).then( () => {
            super.clickOnElement(el.MENU.RESETAR)
        })
    }

    static deslogar(){
        super.esperaExplicita()
        super.clickOnElement(el.MENU.SETTINGS).then( () => {
            super.clickOnElement(el.MENU.SAIR)
        })
    }
}

