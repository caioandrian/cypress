export default class Base {

    static esperaImplicita(method = "GET", endpoint = "", elementID = undefined){
        cy.intercept({
            method: method,
            url: `${endpoint}`,
        }).as("loadPageFirst");

        if(elementID != undefined)
            this.clickElement(elementID)

        cy.wait("@loadPageFirst", {requestTimeout: Cypress.env('global_requestTimeout')});
    }

    static visit(path = "") {
        cy.visit(path);
    }

    static esperaExplicita(segundos = 1000){
        cy.wait(segundos)
    }

    static getElement(elementID, pScroll = true){
        if(pScroll)
            return cy.get(elementID, { timeout: Cypress.env('global_timeout') }).scrollIntoView()
        else
            return cy.get(elementID, { timeout: Cypress.env('global_timeout') })
    }

    static getElementByIndex(elementID, index = 0){
        return cy.get(elementID, { timeout: Cypress.env('global_timeout') }).eq(index).scrollIntoView()
    }

    static getElementByContainsText(text){
        return cy.contains(text, { timeout: Cypress.env('global_timeout') }).scrollIntoView()
    }

    static getElementFilterByFind(elementID, finder){
        return this.getElement(elementID).find(finder).scrollIntoView()
    }

    static getElementFilterByContains(elementID, text){
        return this.getElement(elementID).contains(text).scrollIntoView()
    }

    static getElementFilterByFindAndContains(elementID, finder, text){
        return this.getElement(elementID).find(finder).contains(text).scrollIntoView()
    }

    static scrollIntoView(elementID){
        this.getElement(elementID).scrollIntoView()
    }

    static scrollToBottomOfElement(elementID){
        this.getElement(elementID).scrollTo('bottom')
    }

    static scrollToTopOfElement(elementID){
        this.getElement(elementID).scrollTo('top')
    }

    static setElementValue(elementID, value){
        this.getElement(elementID).type(value, {force: true});
    }

    static clickElement(elementID){
        this.getElement(elementID).click({force: true});
    }

    static clickElementUsingContainsText(text){
        this.getElementByContainsText(text).click({force: true})
    }

    static validateElementIsVisible(elementID){
        this.getElement(elementID).should('be.visible')
    }

    static validateElementIsNotEmpty(elementID){
        this.getElement(elementID).should('to.be.not.empty')
    }

    static validateElementText(elementID, text){
        this.getElement(elementID).should('have.text', text)
    }

    static validateElementInnerText(elementID, text){
        this.getElement(elementID).should('have.text', text)
    }

    static validateElementLengthByChildren(elementID, value, option = ""){
        console.log(option)
        switch(option){
            case "<=": this.getElement(elementID).children().should('have.length.lte', value); break;
            default: this.getElement(elementID).children().should('have.length', value);break;
        }
    }

    static validateElementVal(elementID, texto, index = undefined, scrollIntoView = false){
        this.getElement(elementID, index, scrollIntoView).invoke('val').then(($el) => {
            expect($el, { timeout: Cypress.env('global_timeout') }).contains(texto)
        })
    }

    static validateElementTextByInvokeText(elementID, texto){
        this.getElement(elementID).invoke('text').then(($el) => {
            expect($el.trim(), { timeout: Cypress.env('global_timeout') }).contains(texto)
        })
    }

    static validateLinkAttrHREF(elementLinkID, path){
        this.getElement(elementLinkID).should('have.attr', 'href', path)
    }

    static validateRequestStatusCode(response_request, expectCode){
        console.log(response_request)
        
        /*if(response_request.body != "")
            response_request.body.forEach(c => {
                console.log(c)
        })*/

        expect(response_request.statusCode).to.be.eq(expectCode)
    }

}

