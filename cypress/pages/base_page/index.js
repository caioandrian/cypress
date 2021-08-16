export default class Base {

    static esperaImplicita(method = "GET", endpoint, clickElemento = "", 
        clickElemento2 = "", index = undefined, scrollIntoView = false, force = false){
        cy.intercept({
            method: method,
            url: `${endpoint}`,
        }).as("dataGetFirst");

        if(!clickElemento2)
            this.clickOnElement(clickElemento, index, scrollIntoView, force)
        else{
            this.clickOnElement(clickElemento, index, scrollIntoView, force).then( () => {
                this.verifyIfElementIsVisible(clickElemento2)
                this.clickOnElement(clickElemento2, index, scrollIntoView, force)
            })
        }

        cy.wait("@dataGetFirst");
    }

    static esperaImplicitaByXpath(method = "GET", endpoint, clickElemento = "", 
        clickElemento2 = "", index = undefined, scrollIntoView = false, force = false){
        cy.intercept({
            method: method,
            url: `${endpoint}`,
        }).as("dataGetFirst");

        if(!clickElemento2)
            this.clickOnElementByXpath(clickElemento, index, scrollIntoView, force)
        else{
            this.clickOnElementByXpath(clickElemento, index, scrollIntoView, force).then( () =>{
                this.verifyIfElementIsVisible(clickElemento2)
                this.clickOnElementByXpath(clickElemento2, index, scrollIntoView, force)
            })
        }

        cy.wait("@dataGetFirst");
    }

    static esperaExplicita(segundos = 1000){
        cy.wait(segundos)
    }

    static getElement(element, index = undefined, scrollIntoView = false) {
        let elem;

        if (typeof index !== 'undefined' || index > 0) {
            if(!scrollIntoView)
                elem = cy.get(element, { timeout: Cypress.env('global_timeout') }).eq(index)
            else
                elem = cy.get(element, { timeout: Cypress.env('global_timeout') }).eq(index).scrollIntoView();
        } else {
            if(!scrollIntoView)
                elem = cy.get(element, { timeout: Cypress.env('global_timeout') })
            else
                elem = cy.get(element, { timeout: Cypress.env('global_timeout') }).scrollIntoView()
        }
        return elem;
    }

    static getElementByXPath(element, index = undefined, scrollIntoView = false) {
        let elem;

        if (typeof index !== 'undefined' || index > 0) {
            if(!scrollIntoView)
                elem = cy.xpath(element, { timeout: Cypress.env('global_timeout') }).eq(index)
            else
                elem = cy.xpath(element, { timeout: Cypress.env('global_timeout') }).eq(index).scrollIntoView()
        } else {
            if(!scrollIntoView)
                elem = cy.xpath(element, { timeout: Cypress.env('global_timeout') })
            else
                elem = cy.xpath(element, { timeout: Cypress.env('global_timeout') }).scrollIntoView()
        }

        return elem;
    }

    static getElementInvokeText(element, index = undefined, scrollIntoView = false) {
        return this.getElement(element, index, scrollIntoView).should('be.visible').invoke('text')
    }

    static setElementTypeValue(element, value, index = undefined, scrollIntoView = false) {
        this.getElement(element, index, scrollIntoView).clear().type(value);
    }

    static removeReadOnly(element, index = undefined, scrollIntoView = false) {
        this.getElement(element, index, scrollIntoView).then((x) => {
            x.removeAttr('readonly','readonly')
        })
    }

    static clickOnElementByFind_InsideAnotherElement(element, btnInsideOfModal, index = undefined, scrollIntoView = false, optforce = false){
        this.getElement(element,  index, scrollIntoView)
            .should('be.visible')
            .find(btnInsideOfModal)
            .click({force: true})
    }

    static clickOnModalByXPath_and_elementInside(element, btnInsideOfModal, index = undefined, scrollIntoView = false, optforce = false){
        this.getElementByXPath(element, index, scrollIntoView)
            .should('be.visible')
            .find(btnInsideOfModal)
            .click({force: true})
    }

    static clickOnElement(element, index = undefined, scrollIntoView = false, force = false) {
        if (force === true) {
            if(!scrollIntoView)
                return this.getElement(element, index).click({ force: true, multiple: true }, { timeout: Cypress.env('global_timeout') });
            else
                return this.getElement(element, index).scrollIntoView().click({ force: true, multiple: true }, { timeout: Cypress.env('global_timeout') });
        } else {
            if(!scrollIntoView)
                return this.getElement(element, index).click({ multiple: true }, { timeout: Cypress.env('global_timeout') });
            else
                return this.getElement(element, index).scrollIntoView().click({ multiple: true }, { timeout: Cypress.env('global_timeout') });
        }
    }

    static clickOnElementByXpath(element, index = undefined, scrollIntoView = false, force = false) {
        if (force === true) {
            if(!scrollIntoView)
                return this.getElementByXPath(element, index).click({ force: true });
            else
                return this.getElementByXPath(element, index).scrollIntoView().click({ force: true });
        } else {
            if(!scrollIntoView)
                return this.getElementByXPath(element, index).click();
            else
                return this.getElementByXPath(element, index).scrollIntoView().click();
        }
    }

    static clickOnElementByText(element, text, scrollIntoView = false, force = false) {
        if (force === true) {
                return this.getElement(element, undefined, scrollIntoView).contains(text).click({force: true});
        } else {
                return this.getElement(element, undefined, scrollIntoView).contains(text).click();
        }
    }

    static clickOnText(text, scrollIntoView = false, force = false) {
        if (force === true) {
            if(!scrollIntoView)
                return cy.contains(text).click({force: true});
            else
                return cy.contains(text).scrollIntoView().click({force: true});
        } else {
            if(!scrollIntoView)
                return cy.contains(text).click();
            else
                return cy.contains(text).scrollIntoView().click();
        }
    }

    static validateElementLenghtByXPath(element, quantidade, option = "", index = undefined, scrollIntoView = false){
        if(option === "" || option === "=")
            //igual
            this.getElementByXPath(element, index, scrollIntoView).should('have.length', quantidade)
        else{
            switch (option) {
                //no mínimo
                case ">=":
                    this.getElementByXPath(element, index, scrollIntoView).should('have.length.at.least', quantidade)
                    break;

                 //no máximo
                 case "<=":
                    this.getElementByXPath(element, index, scrollIntoView).should('have.length.at.most', quantidade)
                    break;

                //maior que
                case ">":
                    this.getElementByXPath(element, index, scrollIntoView).should('have.length.greaterThan', quantidade)
                    break;

                //menor que
                case "<":
                    this.getElementByXPath(element, index, scrollIntoView).should('have.length.below', quantidade)
                    break;

                default:
                    break;
            }
        }
    }

    static validateElementLenght(element, quantidade, option = "", index = undefined, scrollIntoView = false){
        if(option === "=" || option === "")
            //igual
            this.getElement(element, index, scrollIntoView).should('have.length', quantidade)
        else{
            switch (option) {
                //no mínimo
                case ">=":
                    this.getElement(element, index, scrollIntoView).should('have.length.at.least', quantidade)
                    break;

                 //no máximo
                 case "<=":
                    this.getElement(element, index, scrollIntoView).should('have.length.at.most', quantidade)
                    break;

                //maior que
                case ">":
                    this.getElement(element, index, scrollIntoView).should('have.length.greaterThan', quantidade)
                    break;

                //menor que
                case "<":
                    this.getElement(element, index, scrollIntoView).should('have.length.below', quantidade)
                    break;

                default:
                    break;
            }
        }
    }

    static verifyIfCheckBoxElementIsChecked(element, index = undefined, scrollIntoView = false){
        this.getElement(element, index, scrollIntoView).should('be.checked')
    }

    static verifyIfCheckBoxElementIsNotChecked(element, index = undefined, scrollIntoView = false){
        this.getElement(element, index, scrollIntoView).should('be.not.checked')
    }

    static validateTextElement(element, texto, index = undefined, scrollIntoView = false){
        if(texto)
            this.getElement(element, index, scrollIntoView).invoke('text').then(($el) => {
                expect($el.trim(), { timeout: Cypress.env('global_timeout') }).contains(texto)
            })
    }

    static validateValElement(element, texto, index = undefined, scrollIntoView = false){
        if(texto)
            this.getElement(element, index, scrollIntoView).invoke('val').then(($el) => {
                expect($el.trim(), { timeout: Cypress.env('global_timeout') }).contains(texto)
            })
    }

    static validateTextExistOnPage(texto, scrollIntoView = false){
        if(!scrollIntoView)
            cy.contains(texto).should('to.be.visible', { timeout: Cypress.env('global_timeout') })
        else
            cy.contains(texto).scrollIntoView().should('to.be.visible', { timeout: Cypress.env('global_timeout') })
    }

    static verifyIfElementExists(element, index = undefined, scrollIntoView = false) {
        this.getElement(element, index, scrollIntoView).should('exist', { timeout: Cypress.env('global_timeout') });
    }

    static verifyIfElementNotExists(element, index = undefined, scrollIntoView = false) {
        this.getElement(element, index, scrollIntoView).should('not.exist', { timeout: Cypress.env('global_timeout') });
    }

    static verifyIfElementIsVisible(element, index = undefined, scrollIntoView = false ) {
        this.getElement(element, index, scrollIntoView).should('to.be.visible', { timeout: Cypress.env('global_timeout') });
    }

    static verifyIfElementIsVisibleByXPatch(element, index = undefined, scrollIntoView = false ) {
        this.getElementByXPath(element, index, scrollIntoView).should('to.be.visible', { timeout: Cypress.env('global_timeout') });
    }

    static verifyIfElementIsHidden(element, index = undefined, scrollIntoView = false) {
        this.getElement(element, index, scrollIntoView).should('not.be.visible', { timeout: Cypress.env('global_timeout') });
    }

    static verifyIfElementNotEmpty(element, index = undefined, scrollIntoView = false) {
        this.getElement(element, index, scrollIntoView)
            .should('to.not.be.empty', { timeout: Cypress.env('global_timeout') });
    }

    static verifyIfElementValNotEmpty(element, index = undefined, scrollIntoView = false) {
        this.getElement(element, index, scrollIntoView).invoke('val').then(($valor) => {
            expect($valor.trim()).to.be.not.empty
        })
    }

    static verifyIfElementIsEmpty(element, index = undefined, scrollIntoView = false) {
        this.getElement(element, index, scrollIntoView)
            .should('to.be.empty', { timeout: Cypress.env('global_timeout') });
    }

    static verifyStringQuantidadeCaracteres(elementInput, quantidade, index = undefined, scrollIntoView = false) {
        this.getElement(elementInput, index, scrollIntoView)
            .invoke('val').its("length").should("eq", quantidade);
    }

    static verifyIfElementByXPathNotEmpty(element, index = undefined, scrollIntoView = false) {
        this.getElementByXPath(element, index, scrollIntoView)
            .should('not.be.empty', { timeout: Cypress.env('global_timeout') });
    }

    static selectOption(element, option, index = undefined, scrollIntoView = false) {
        return this.getElement(element, index, scrollIntoView).select(option);
    }

    static visitarPagina(){
        cy.visit('https://barrigareact.wcaquino.me')
    }

    static getToken(user, passwd){
        cy.request({
            url: '/signin',
            method: 'POST',
            body: {
                email: user, 
                redirecionar: false,
                senha: passwd
            }
        }).its('body.token').should('not.be.empty')
            .then(token => {
                Cypress.env('token', token)
                return token;
            })
    }

    static resetAppByApi(token){
        cy.request({
            url: '/reset',
            method: 'GET',
            //headers: { Authorization: `JWT ${token}`}
        }).its('status').should('be.eq', 200)
    }

    static getContaByName(token, nomeconta){
        cy.request({
            method: 'GET',
            url: '/contas',
            headers: {Authorization: `JWT ${token}`},
            qs:{
                nome: nomeconta
            }
        }).then(res => {
            return res.body[0].id;
        })
    }
}

