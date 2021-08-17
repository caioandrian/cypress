/// <reference types="cypress" />
import {Given, When, Then, After, Before} from 'cypress-cucumber-preprocessor/steps'

import Base from '../../pages/base_page'
import {Head} from '../../pages/head'
import {Login} from '../../pages/login'

import buildEnv from '../../support/buildEnv'

Given(`que esteja com o banco de dados resetado`, () => {
    Head.resetApp()
    Head.validaMensagemToast('Dados resetados com sucesso!')
})

Then(`deverá deslogar da conta`, () => {
    Head.deslogar()
    Head.validaMensagemToast('Até Logo!')
})

Given('que esteja logado com uma conta ativa', () => {
    Base.visitarPagina()

    if(Cypress.env('MockRequest')){
        // prepara o ambiente com uma "massa de dados" pré-definida de acordo com cada rotas da nossa api
        buildEnv()
        Login.fazerLogin('usuario_inexistente', 'qualquer');
    }else
        Login.fazerLogin('caio@caio', '123');
    
    Head.validaMensagemToast('Bem vindo');
})

Then(`deverá apresentar a mensagem {string}`, (msg) => {
    Head.validaMensagemToast(msg);
})