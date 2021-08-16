/// <reference types="cypress" />

import Base from '../../pages/base_page'
import {Head} from '../../pages/head'
import {Conta} from '../../pages/contas'
import {Movimentacao} from '../../pages/movimentacoes'
import {Extratos} from '../../pages/extratos'
import {Home} from '../../pages/home'
import {Login} from '../../pages/login'

import buildEnv from '../../support/buildEnv'

describe('Cypress basics', () => {
    after(()=>{
        cy.clearLocalStorage();
    })

    beforeEach(()=>{
        Base.visitarPagina()

        if(Cypress.env('MockRequest')){
            // prepara o ambiente com uma "massa de dados" pré-definida de acordo com cada rotas da nossa api
            buildEnv()
            Login.fazerLogin('usuario_inexistente', 'qualquer');
            Head.validaMensagemToast('Bem vindo');
        }else{
            Login.fazerLogin('caio@caio', '123');
            Head.validaMensagemToast('Bem vindo');
            Head.resetApp()
            Head.validaMensagemToast('Dados resetados com sucesso!')
        }
    })

    it('Deve criar uma conta para movimentações', () => {
        if(Cypress.env('MockRequest')){
            cy.intercept('POST','/contas',{
                body: {id: 3,nome:"Conta de Teste",visivel: true,usuario_id: 1}
            }).as('postConta')
    
            cy.intercept('GET','/contas',{
                fixture: 'get_response_contas_atualizadas.json'
            }).as('contas Atualizadas')
        }
        
        Head.acessarMenuConta();
        Conta.inserirConta('Carteira')
        Head.validaMensagemToast('Conta inserida com sucesso')
    })

    it.skip('Deve atualizar uma conta', () => {
        if(Cypress.env('MockRequest')){
            cy.intercept('PUT','/contas',{
                body: {id: 1,nome:"Carteira Alterada Yesss",visivel: true,usuario_id: 1}
            }).as('putConta')
        }

        Head.acessarMenuConta();
        Conta.editarUmaConta('Carteira');
        Head.validaMensagemToast('Conta atualizada com sucesso')
    })

    it('Não deve criar uma conta com um nome já cadastrado', () => {
        if(Cypress.env('MockRequest')){
            cy.intercept('POST','/contas',{
                statusCode: 400,
                body: {error: "Já existe uma conta com esse nome!"}
            }).as('postContaDuplicada')
        }else{
            Head.acessarMenuConta();
            Conta.inserirConta('Carteira')
            Head.validaMensagemToast('sucesso')
        }

        Head.acessarMenuConta();
        Conta.inserirConta('Carteira')
        Head.validaMensagemToast('code 400')
    })

    it('Deve criar uma transação', () => {
        if(Cypress.env('MockRequest')){
            cy.intercept('POST','/transacoes',{
                statusCode: 201,
                fixture: 'post_response_nova_transacao.json'
            }).as('postMovimentacao')
    
            cy.intercept('GET','/extrato/**',{
                statusCode: 200,
                fixture: 'get_response_movimentacao_atualizada.json'
            }).as('movimentacoes')
        }

        if(!Cypress.env('MockRequest')){
            Head.acessarMenuConta();
            Conta.inserirConta('Carteira')
        }
        
        Head.acessarMenuMovimentacao();
        Movimentacao.inserirTransacao('Qualquer Descricao', '900.00', 'Qualquer Pessoa', 'Carteira')
        Head.validaMensagemToast('sucesso')

        Extratos.validaQuantidadeDeTransacoes(7)
        Extratos.validaUltimaTransacaoRealizada('Desc','900')
    })

    it('Deve apresentar o valor atualizado da conta', () => {
        if(Cypress.env('MockRequest')){
            cy.intercept('PUT','/transacoes/**',{
                statusCode: 200,
                fixture: 'put_response_transacao_atualizada.json'
            }).as('postMovimentacao')
    
            cy.intercept('GET','/transacoes/**',{
                statusCode: 200,
                fixture: 'get_response_transacao.json'
            }).as('getMovimentacao')
        }
        
        Home.validaSaldoConta('Conta para saldo', '534,00')
        Head.acessarMenuExtratos();

        Extratos.editarTransacao('Movimentacao 1, calculo saldo')

        Movimentacao.validaCampos('Movimentacao 1, calculo saldo', 'Conta para saldo')
        Movimentacao.salvar()
        
        Head.validaMensagemToast('sucesso')

        if(Cypress.env('MockRequest')){
            cy.intercept('GET','/saldo',{
                statusCode: 200,
                fixture: 'get_response_transacao_saldo_atualizado.json'
            }).as('saldoAtualizado')
        }
       
        Head.acessarMenuHome()
        Home.validaSaldoConta('Conta para saldo', '4.034,00')
    })

    it('Deve remover uma transação', () => {
        if(Cypress.env('MockRequest')){
            cy.intercept('DELETE','/transacoes/*',{
                statusCode: 204,
                body: {}
            }).as('deleteTransacao')
        }

        Head.acessarMenuExtratos();

        if(Cypress.env('MockRequest')){
            cy.intercept('GET','/extrato/**',{
                statusCode: 200,
                fixture: 'get_response_lista_atualizada_extratos.json'
            }).as('getMovimentacoesAtualizadas')
        }
       
        Extratos.removerTransacao('Movimentacao para exclusao')

        Head.validaMensagemToast('sucesso')
        Extratos.validaQuantidadeDeTransacoes(5, '>=')
    })
})