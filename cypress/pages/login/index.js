import Base from '../base_page'

const el = require('./elements').ELEMENTS;

export class Login extends Base {

    static fazerLogin(user, passwd){
        super.setElementTypeValue(el.LOGIN.USER, user)
        super.setElementTypeValue(el.LOGIN.PASSWORD, passwd)
        super.clickOnElement(el.LOGIN.BTN_LOGIN)
    }
    
}

