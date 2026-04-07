# Plano de Testes – ParaBank
Integrantes da equipe: Marcos Paulo, Raica Lira, Nicolas do Vale, Genidy Laurentino, Rosana dos Anjos e Yago Victor.
## Nome do Sistema
ParaBank

## Descrição do Sistema
O ParaBank é uma aplicação de internet banking simulada, projetada para oferecer serviços bancários essenciais em um ambiente controlado. O principal objetivo do sistema é permitir que usuários gerenciem suas finanças online, realizando aberturas de contas, transferências e solicitações de empréstimos com foco em usabilidade e segurança transacional.

---

## Funcionalidades em Escopo
*Accounts Overview*: Visualização do saldo e histórico de transações.
*Open New Account*: Abertura de novas contas (corrente ou poupança).
*Transfer Funds*: Movimentação de valores entre contas internas.
*Request Loan*: Processamento de solicitações de empréstimo com base em saldo disponível.

---

## Critérios de Aceite

### Accounts Overview

**Front-end**
- A tabela de contas deve carregar em menos de 2 segundos
- exibir o saldo total atualizado
- 

**API / Back-end**
- O endpoint GET /accounts deve retornar o status 200 OK e um JSON contendo a lista exata de contas vinculadas ao ID do usuário logado
- 
- 

---

### Open New Account

**Front-end**
- O usuário deve conseguir selecionar o tipo de conta (SAVINGS/CHECKING) via dropdown e visualizar a mensagem de sucesso com o novo número da conta
- 
- 

**API / Back-end**
- O endpoint POST /createAccount deve validar se o depósito inicial mínimo foi cumprido e persistir os dados no banco de dados
- 
- 

---

### Transfer Funds

**Front-end**
- O sistema deve impedir a transferência caso o valor inserido seja superior ao saldo da conta de origem
- 
- 

**API / Back-end**
- A transação deve ser atômica; em caso de falha no crédito da conta de destino, o débito na conta de origem deve sofrer rollback
- 
- 

---

### Request Loan

**Front-end**
- Exibir claramente o valor da entrada (down payment) necessário e o status da solicitação (Approved/Denied)
- 
- 

**API / Back-end**
- O motor de regras deve retornar erro 400 se os campos de valor ou entrada estiverem vazios ou negativos
- 
- 

---

## Funcionalidades Fora de Escopo
Atualização de perfil de usuário (Update Contact Info).
Pagamento de contas externas (Bill Pay).
Localização de agências (Locations).
Administração do sistema (Admin Page).
---

## Estratégia de Testes
Descreva, de forma resumida:
-*Objetivo:* Garantir a integridade das transações financeiras e a experiência do usuário sem erros críticos de interface
-*Tipos de Teste:* * *Funcionais:* Manuais e Automatizados.
-*Regressão:* Para garantir que novas funcionalidades não quebrem o fluxo de transferência.
-*Testes de API:* Validação de contratos e status codes.
-*Ferramentas:* Selenium WebDriver (Java/Python), Postman/RestAssured para APIs, e Jira para gestão de bugs.
---

## Premissas e Riscos

### Premissas
- O ambiente de banco de dados será resetado antes de cada ciclo de teste.
- A documentação da API Swagger está atualizada.
### Riscos
- Instabilidade no servidor de demonstração do ParaBank (terceirizado).
- Atraso na configuração do ambiente de automação.

## Gerenciamento do Projeto

### Metodologia
Ágil (Scrum adaptado).
### Organização em Sprints
*Sprint 1 (1 semana)*: Planejamento, configuração do ambiente e testes manuais de Accounts Overview e Open New Account.
*Sprint 2 (1 semana)*: Testes de Transfer Funds e Request Loan, início da automação de testes críticos (Smoke Test).
*Sprint 3 (1 semana)*: Testes de regressão, execução de testes de API e fechamento do relatório de bugs.

### Cronograma

- Data de início do projeto: 07/04/2026
- Data prevista de encerramento:
