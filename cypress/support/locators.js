const locators = {
    LOGIN:{
        USER:   '[data-test=email]',
        PASSWORD: '[data-test=passwd]',
        BTN_LOGIN: '.btn'
    },
    MENU:{
        SETTINGS: '[data-test=menu-settings]',
        CONTAS: '[href="/contas"]',
        RESETAR: '[href="/reset"]',
        MOVIMENTACAO: '[data-test=menu-movimentacao]',
        HOME: '[data-test=menu-home]',
        EXTRATO: '[data-test=menu-extrato]',
        SAIR:  '[href="/logout"]'
    },
    CONTAS:{
        NOME: '[data-test=nome]',
        BTN_SALVAR: '.btn',
        FN_XP_BTN_ALTERAR: (nome) => `//table//td[contains(., '${nome}')]/..//i[@class='far fa-edit']`
    },
    MOVIMENTACAO: {
        DESCRICAO: '[data-test=descricao]',
        VALOR: '[data-test=valor]',
        INTERESSADO: '[data-test=envolvido]',
        STATUS: '[data-test=status]',
        CONTA: '[data-test=conta]',
        BTN_SALVAR: '.btn-primary'
    },
    EXTRATO: {
        LINHAS: '.list-group > li',
        FN_XP_BUSCA_ELEMENTO: (desc, valor) => `//span[contains(., '${desc}')]//following-sibling::small[contains(., '${valor}')]`,
        FN_XP_REMOVER_ELEMENTO: (desc) => `//span[contains(., '${desc}')]/../../..//i[@class='far fa-trash-alt']`,
        FN_XP_EDITAR_ELEMENTO: (desc) => `//span[contains(., '${desc}')]/../../..//i[@class='fas fa-edit']`
    },
    SALDO: {
        FN_XP_SALDO_CONTA: (nome) => `//td[contains(., '${nome}')]/../td[2]`
    },
    MESSAGE: '.toast-message',
}

//exportar a variavel para poder 
//ser utilizada quando necessario
export default locators;
