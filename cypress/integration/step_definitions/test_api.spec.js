/// <reference types="cypress" />

import {API} from '../../services/minha_api.service'

describe('Cypress Integration API', () => {
    before(()=>{
        API.getToken('caio@caio', '123')
    })

    beforeEach(()=>{
        API.resetAppByApi();
    })

    it('Deve criar uma nova conta para movimentacao', () => {
        API.criarUmaConta().as('response')

        cy.get('@response').then((res) => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', "Conta qualquer 5")
        })
    })

    it('Não deve criar uma conta com mesmo nome', () => {
        API.criarUmaContaDuplicada().as('response')

        cy.get('@response').then((res) => {
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.eq('Já existe uma conta com esse nome!')
        })
    })

    it('Deve atualizar o nome de uma conta', () => {
        API.atualizarUmaConta('Conta para alterar').as('response')

        cy.get('@response').its('status').should('be.equal', 200)
        cy.get('@response').its('body.nome').should('be.eq', 'conta alterada via rest')
    })
   
    it('Deve criar uma nova transação na conta', () => {
        API.criarUmaTransacaoNaConta('Conta para alterar').as('response')

        cy.get('@response').its('status').should('be.equal', 201)
        cy.get('@response').its('body.id').should('exist')
    })

    it('Deve apresentar o saldo atualizado da conta', () => {
        API.validaSaldoConta('Conta para saldo', '534.00');
        API.atualizaUmaTransacaoPorDescricao("Movimentacao 1, calculo saldo")
        API.validaSaldoConta('Conta para saldo', '4034.00');
    })

    it('Deve remover uma conta de movimentacao', () => {
        API.removerUmaContaDeMovimentacao("Movimentacao para exclusao").as('response')
        
        cy.get('@response').its('status').should('be.equal', 204)
    })
})