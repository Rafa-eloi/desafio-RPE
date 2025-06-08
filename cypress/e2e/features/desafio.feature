Feature: Desafio técinico RPE

  Background: Acessar a plataforma e fechar os avisos
    Given que o usuário acessa a página inicial
    Then fecha os avisos da tela, se presentes
  
  @smoke
  Scenario: Desafio RPE
    When faço a pesquisa pelo produto
    And filtro pelo preço
    Then listar produtos que atendem os critérios
