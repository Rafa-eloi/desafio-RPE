Feature: Acessar página e fechar aviso de cookies

  Background: Acessar a plataforma e fechar os avisos
    Given que o usuário acessa a página inicial
    Then o usuário fecha os avisos da tela, se presentes
  
  Scenario: Desafio RPE
    When Faço a pesquisa pelo produto
    When Filtro pelo preço
    Then Listar produtos que atendem os critérios





# 1. Clicar no botão "Pesquisar"  
# 2. Dentro do filtro "Preço" selecionar opção "R$ 2.500 - R$ 5.000"
# 3. A partir da listagem obtida imprimir os seguintes itens mas apenas dos produtos que tiverem valor maior que R$3500:
#    Nome do produto
#    Valor
#    Rating Avaliação [Quantidade de estrelas]

# Saída esperada no console:  
# ● Informações do produto desejado:  
# ● Nome: <valor> Estrelas: <valor>  
