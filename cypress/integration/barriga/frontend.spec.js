/// <reference types="cypress" />

//todas locators criadas estarao dentro
//da variavel loc
import loc from '../../support/locators'

import '../../support/commandsContas'

import buildEnv from '../../support/buildEnv'

describe('Cypress basics', () => {
    after(()=>{
        cy.clearLocalStorage();
    })

    before(()=>{
        //usa o primeiro POST SIGNIN que esta no buildEnv.js
        //usa o primeiro GET SALDO que esta no buildEnv.js
        
        //cy.login('caio@caio', '123');
        //cy.login('usuario_inexistente', 'qualquer');
    })

    beforeEach(()=>{
        //invocamos as rotas definidas para cada teste
        buildEnv()
        cy.login('usuario_inexistente', 'qualquer');

        cy.get(loc.MENU.HOME).click();
        //cy.resetApp();
    })

    it('Should create an account', () => {
        //usa o primeiro GET CONTAS que esta no buildEnv.js

        //rota principal do teste
        cy.route({
            method: 'POST',
            url: '/contas',
            response: 
                {id: 3,nome:"Conta de Teste",visivel: true,usuario_id: 1}
        }).as('postConta')

        cy.acessarMenuConta();

        //rota com valores alterados para nosso teste
        //por isso nao esta definida no buildEnv
        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                {conta_id: 1,nome:"Carteira",visivel: true,usuario_id: 1},
                {conta_id: 2,nome:"Banco",visivel: true,usuario_id: 1},
                {conta_id: 3,nome:"Conta de Teste",visivel: true,usuario_id: 1}
            ]
        }).as('contas Atualizadas')

        cy.inserirConta('conta padrao')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    })

    it.only('Should update an account', () => {
        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                {conta_id: 1,nome:"Carteira",visivel: true,usuario_id: 1},
                {conta_id: 2,nome:"Banco",visivel: true,usuario_id: 1}
            ]
        }).as('contas')

        cy.route({
            method: 'PUT',
            //url: '/contas/1',
            url: '/contas/**',
            response: 
                {id: 1,nome:"Carteira Alterada",visivel: true,usuario_id: 1}
        }).as('putConta')

        cy.acessarMenuConta();

        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Carteira')).click()
    
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Carteira Alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')
    })

    it('Should NOT create an account with same name', () => {
        /*cy.acessarMenuConta();
        cy.inserirConta('Conta mesmo nome')
        cy.get(loc.MESSAGE).should('contain', 'code 400')*/
    })

    it.only('Should create a transaction', () => {
        cy.route({
            method: 'POST',
            url: '/transacoes',
            response: 
                {
                    "id":999,
                    "descricao":"Desc",
                    "envolvido":"AAA",
                    "observacao":null,
                    "tipo":"REC",
                    "data_transacao":"2020-08-15T03:00:00.000Z",
                    "data_pagamento":"2020-08-15T03:00:00.000Z",
                    "valor":"123.00",
                    "status":true,
                    "conta_id":1,
                    "usuario_id":10899,
                    "transferencia_id":null,
                    "parcelamento_id":null
                }
        }).as('postMovimentacao')

        cy.route({
            method: 'GET',
            url: '/extrato/**',
            response: 'fixture:movimentacaoSalva'
        })

        cy.get(loc.MENU.MOVIMENTACAO).click();

        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('AAA')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Carteira')
        
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123'))
            .should('exist')
    })

    it('Should get balance', () => {
        /*cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '534,00')
        
        cy.get(loc.MENU.EXTRATO).click();
        cy.xpath(loc.EXTRATO.FN_XP_EDITAR_ELEMENTO('Movimentacao 1, calculo saldo')).click();
        
        //cy.wait(1000)
        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo');
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para saldo')
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '4.034,00')*/
    })

    it('Should remove a transaction', () => {
        /*cy.get(loc.MENU.EXTRATO).click()

        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click();
        cy.get(loc.MESSAGE).should('contain', 'sucesso')*/
    })
})