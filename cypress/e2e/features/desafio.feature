Feature: Acessar página e fechar aviso de cookies

  Scenario: Acessar a plataforma e fechar os avisos
    Given que o usuário acessa a página inicial
    Then o usuário fecha os avisos da tela, se presentes
