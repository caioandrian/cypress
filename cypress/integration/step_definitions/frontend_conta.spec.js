/// <reference types="cypress" />
import {Given, When, Then, After, Before} from 'cypress-cucumber-preprocessor/steps'

import {Head} from '../../pages/head'
import {Conta} from '../../pages/contas'

Given(`que tenha uma conta cadastrada com o nome {string}`, (nome_conta) => {
    if(!Cypress.env('MockRequest')){
        Head.acessarMenuConta();
        Conta.inserirConta(nome_conta)
        Head.validaMensagemToast('sucesso')
    }
})

When(`criar uma conta com um nome válido`, () => {
    if(Cypress.env('MockRequest')){
        cy.intercept('POST','/contas',{
            statusCode: 201,
            fixture: 'mock/post_response_conta_valida.json'
        }).as('postConta')

        cy.intercept('GET','/contas',{
            fixture: 'mock/get_response_contas_atualizadas.json'
        }).as('contas Atualizadas')
    }
    
    Head.acessarMenuConta();
    Conta.inserirConta('Carteira')
})

When(`criar uma conta com um nome que já existe no sistema`, () => {
    if(Cypress.env('MockRequest')){
        cy.intercept('POST','/contas',{
            statusCode: 400,
            body: {error: "Já existe uma conta com esse nome!"}
        }).as('postContaDuplicada')
    }

    Head.acessarMenuConta();
    Conta.inserirConta('Carteira')
})

Then(`deverá apresentar a mensagem {string}`, (msg) => {
    Head.validaMensagemToast(msg)
})

/*it.skip('Deve atualizar uma conta', () => {
    if(Cypress.env('MockRequest')){
        cy.intercept('PUT','/contas',{
            body: {id: 1,nome:"Carteira Alterada Yesss",visivel: true,usuario_id: 1}
        }).as('putConta')
    }

    Head.acessarMenuConta();
    Conta.editarUmaConta('Carteira');
    Head.validaMensagemToast('Conta atualizada com sucesso')
})*/
