const buildEnv = () => {
    cy.server()

    cy.route({
        method: 'POST',
        url: '/signin',
        response: {
            id:19299,
            nome:"Usuario Falso",
            token:"token que nao deveria ser aceito"
        }
    }).as('signin')

    cy.route({
        method: 'GET',
        url: '/saldo',
        response: [
            {conta_id: 99999,conta:"Carteira",saldo:"100.00"},
            {conta_id: 66666,conta:"Banco ",saldo:"6000.00"}
        ]
    }).as('saldo')

    cy.route({
        method: 'GET',
        url: '/contas',
        response: [
            {conta_id: 1,nome:"Carteira",visivel: true,usuario_id: 1},
            {conta_id: 2,nome:"Banco",visivel: true,usuario_id: 1}
        ]
    }).as('contas')

    cy.route({
        method: 'GET',
        url: '/extrato/**',
        response: [
            {"conta":"Conta para movimentacoes","id":214217,"descricao":"Movimentacao para exclusao","envolvido":"AAA","observacao":null,"tipo":"DESP","data_transacao":"2020-08-15T03:00:00.000Z","data_pagamento":"2020-08-15T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":239070,"usuario_id":10899,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Conta com movimentacao","id":214218,"descricao":"Movimentacao de conta","envolvido":"BBB","observacao":null,"tipo":"DESP","data_transacao":"2020-08-15T03:00:00.000Z","data_pagamento":"2020-08-15T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":239071,"usuario_id":10899,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Conta para saldo","id":214219,"descricao":"Movimentacao 1, calculo saldo","envolvido":"CCC","observacao":null,"tipo":"REC","data_transacao":"2020-08-15T03:00:00.000Z","data_pagamento":"2020-08-15T03:00:00.000Z","valor":"3500.00","status":false,"conta_id":239072,"usuario_id":10899,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Conta para saldo","id":214220,"descricao":"Movimentacao 2, calculo saldo","envolvido":"DDD","observacao":null,"tipo":"DESP","data_transacao":"2020-08-15T03:00:00.000Z","data_pagamento":"2020-08-15T03:00:00.000Z","valor":"-1000.00","status":true,"conta_id":239072,"usuario_id":10899,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Conta para saldo","id":214221,"descricao":"Movimentacao 3, calculo saldo","envolvido":"EEE","observacao":null,"tipo":"REC","data_transacao":"2020-08-15T03:00:00.000Z","data_pagamento":"2020-08-15T03:00:00.000Z","valor":"1534.00","status":true,"conta_id":239072,"usuario_id":10899,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Conta para extrato","id":214222,"descricao":"Movimentacao para extrato","envolvido":"FFF","observacao":null,"tipo":"DESP","data_transacao":"2020-08-15T03:00:00.000Z","data_pagamento":"2020-08-15T03:00:00.000Z","valor":"-220.00","status":true,"conta_id":239073,"usuario_id":10899,"transferencia_id":null,"parcelamento_id":null}
        ]
    }).as('movimentacoes')
}

export default buildEnv