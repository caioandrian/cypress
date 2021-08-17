#language: pt

@funcionalidade_movimentacao
Funcionalidade: Movimentação
    Como cliente da aplicação
    Quero realizar uma ou mais transações usando uma conta

    Contexto:
        Dado que esteja logado com uma conta ativa
        E que esteja com o banco de dados resetado

    @criar_transacao
    Esquema do Cenario: Criar uma nova transação
        Quando criar uma nova transação com "<descricao>", "<valor>", "<interessado>" e "<nome_conta>"
        Então deverá apresentar a mensagem "<msg>"
        E deverá apresentar um total "<operador>" a 7 transações na página de extratos
        E deverá encontrar a transação criada com a descrição "<descricao>" e "<valor>"
        E deverá deslogar da conta
        Exemplos:
            | descricao            | valor  | interessado     | nome_conta | msg     | operador |
            | Transação de Exemplo | 900.50 | Qualquer Pessoa | Carteira   | sucesso | =        |
    
    @editar_transacao
    Cenario: Editar uma transação
        Dado que esteja na página de extrato
        Quando editar a transação com a descrição "Movimentacao 1, calculo saldo" referente a conta "Conta para saldo"
        Então deverá apresentar a mensagem "sucesso"
        E apresentar o saldo atualizado da conta "Conta para saldo" com valor de "4.034,00"
        E deverá deslogar da conta

    @deletar_transacao
    Cenario: Excluir uma nova transação
        Dado que esteja na página de extrato
        Quando remover a transação com a descrição "Movimentacao para exclusao"
        Então deverá apresentar a mensagem "sucesso"
        E deverá apresentar um total ">=" a 5 transações na página de extratos
        E deverá deslogar da conta
        
        