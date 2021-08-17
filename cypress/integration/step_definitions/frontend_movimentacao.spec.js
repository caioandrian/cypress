/// <reference types="cypress" />
import {Given, When, Then, After, Before, And} from 'cypress-cucumber-preprocessor/steps'

import {Head} from '../../pages/head'
import {Conta} from '../../pages/contas'
import {Movimentacao} from '../../pages/movimentacoes'
import {Extratos} from '../../pages/extratos'
import {Home} from '../../pages/home'

Given(`que esteja na página de extrato`, () => {
    Home.validaSaldoConta('Conta para saldo', '534,00')
    Head.acessarMenuExtratos();
})

When('criar uma nova transação com {string}, {string}, {string} e {string}', (descricao, valor, interessado, nome_conta) => {
    if(Cypress.env('MockRequest')){
        cy.intercept('POST','/transacoes',{
            statusCode: 201,
            fixture: 'mock/post_response_nova_transacao.json'
        }).as('postMovimentacao')

        cy.intercept('GET','/extrato/**',{
            statusCode: 200,
            fixture: 'mock/get_response_movimentacao_atualizada.json'
        }).as('movimentacoes')
    }

    if(!Cypress.env('MockRequest')){
        Head.acessarMenuConta();
        Conta.inserirConta(nome_conta)
    }
    
    Head.acessarMenuMovimentacao();
    Movimentacao.inserirTransacao(descricao, valor, interessado, nome_conta)
})

When(`editar a transação com a descrição {string} referente a conta {string}`, (descricao_transacao, nome_conta) => {
    if(Cypress.env('MockRequest')){
        cy.intercept('PUT','/transacoes/**',{
            statusCode: 200,
            fixture: 'mock/put_response_transacao_atualizada.json'
        }).as('postMovimentacao')

        cy.intercept('GET','/transacoes/**',{
            statusCode: 200,
            fixture: 'mock/get_response_transacao.json'
        }).as('getMovimentacao')
    }
    
    Extratos.editarTransacao(descricao_transacao)

    Movimentacao.validaCampos(descricao_transacao, nome_conta)
    Movimentacao.salvar()
})

When(`remover a transação com a descrição {string}`, (descricao_transacao) => {
    if(Cypress.env('MockRequest')){
        cy.intercept('DELETE','/transacoes/*',{
            statusCode: 204,
            body: {}
        }).as('deleteTransacao')
    }

    if(Cypress.env('MockRequest')){
        cy.intercept('GET','/extrato/**',{
            statusCode: 200,
            fixture: 'mock/get_response_lista_atualizada_extratos.json'
        }).as('getMovimentacoesAtualizadas')
    }
   
    Extratos.removerTransacao(descricao_transacao)
})

Then(`deverá apresentar a mensagem {string}`, (msg) => {
    Head.validaMensagemToast(msg);
})

Then(`deverá apresentar um total {string} a {int} transações na página de extratos`, (operador, qtde) => {
    Extratos.validaQuantidadeDeTransacoes(qtde, operador);
})

Then(`deverá encontrar a transação criada com a descrição {string} e {string}`, (descricao, valor) => {
    Extratos.validaUltimaTransacaoRealizada(descricao, valor);
})

Then(`apresentar o saldo atualizado da conta {string} com valor de {string}`, (nome_conta, valor) => {
    if(Cypress.env('MockRequest')){
        cy.intercept('GET','/saldo',{
            statusCode: 200,
            fixture: 'mock/get_response_transacao_saldo_atualizado.json'
        }).as('saldoAtualizado')
    }
    
    Head.acessarMenuHome()
    Home.validaSaldoConta(nome_conta, valor)
})
