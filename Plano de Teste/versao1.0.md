# Plano de Testes – ParaBank

**Integrantes da Equipe:** Marcos Paulo, Raica Lira, Nicolas do Vale, Genidy Laurentino, Rosana dos Anjos e Yago Victor.

---

## 1. ESPECIFICAÇÕES DO SISTEMA

* **Nome do Sistema:** ParaBank.
* **Descrição:** O ParaBank é um sistema bancário online de demonstração que simula o funcionamento de um banco real, permitindo operações como consulta de contas, transferências, pagamentos e empréstimos para fins de aprendizado e testes.
* **Funcionalidades em Escopo:**
    * **Accounts Overview:** Visão consolidada da posição financeira e detalhes de contas.
    * **Open New Account:** Abertura de conta exigindo tipo de conta e depósito inicial.
    * **Transfer Funds:** Transferência entre contas do mesmo usuário.
    * **Request Loan:** Solicitação de empréstimo com base em valores e conta de origem.
* **Funcionalidades Fora de Escopo:**
    * Login.
    * Customer Care.
    * Find transactions.
    * Atualização de perfil (Update Contact Info).
    * Pagamento de contas (Bill Pay).
    * Localização de agências (Locations).
    * Administração do sistema (Admin Page).

---

## 2. CRITÉRIOS DE ACEITE

### Accounts Overview (Visão Geral da Conta)
* **Front-end:**
    * Permite identificar cada conta de forma única.
    * Exibe saldo e valor disponível de forma clara.
* **API / Back-end:**
    * Retorna dados de forma isolada por cliente, sem mistura de informações.
    * Respostas consistentes mesmo sem contas associadas.
    * Não expõe dados de contas de terceiros.

### Open New Account (Abrir Conta)
* **Front-end:**
    * Exige definição do tipo de conta e conta de origem.
    * Comunica o resultado (sucesso ou erro) ao usuário.
* **API / Back-end:**
    * Não permite a criação sem informações mínimas obrigatórias.
    * Em caso de erro, não gera efeitos colaterais em contas existentes.

### Transfer Funds (Transferir Fundos)
* **Front-end:**
    * Exige valor, conta de origem e conta de destino.
    * Mantém o contexto de navegação após a operação.
* **API / Back-end:**
    * Garante que as contas pertençam ao mesmo cliente.
    * Registro atômico da transação (sem estados inconsistentes).

### Request Loan (Solicitar Empréstimo)
* **Front-end:**
    * Exige valor do empréstimo, entrada e conta de origem.
    * Apresenta o resultado dentro do próprio fluxo.
* **API / Back-end:**
    * Retorna claramente se a solicitação foi processada ou não.
    * Em caso de erro, não provoca alterações parciais em dados financeiros.

---

## 3. ESTRATÉGIA DE TESTES

* **Objetivo:** Garantir a integridade das transações financeiras e a experiência do usuário sem erros críticos de interface.
* **Níveis de Teste:** Funcionais (Manuais e Automatizados) e Testes de API.
* **Técnica de Teste:** Caixa Preta.
* **Ferramentas:**
    * **Gestão de Casos de Teste:** TestRail.
    * **Gestão/Bugs:** Trello.
    * **Automação Web:** Selenium WebDriver (Java/Python).
     * **Testes de API:** Insomnia.
* **Ambientes:** Navegadores (Chrome, Firefox) e dispositivos desktop.
* **Observação:** Não haverá testes de regressão nesta fase.

---

## 4. GERENCIAMENTO DO PROJETO

* **Abordagem:** Método Ágil – Scrum.
* **Ferramenta de Controle:** Trello.
* **Cronograma:**
    * **Data de Início:** 23/04/2026.
    * **Data de Entrega:** 04/06/2026.
* **Organização das Sprints:**
    * **Sprint 1:** Planejamento e configuração de ambiente.
    * **Sprint 2:** Testes manuais e de API das funcionalidades em escopo.
    * **Sprint 3:** Automação de testes críticos e fechamento de relatórios.

---

## 5. PREMISSAS E RISCOS

* **Premissas:**
    * Disponibilidade do ambiente simulado ParaBank.
    * Acesso às ferramentas Trello, TestRail e Insomnia por toda a equipe.
* **Riscos:**
    * Instabilidade no servidor de demonstração do ParaBank.
    * Curva de aprendizado das ferramentas de automação atrasar o cronograma.
