# 🏖️ Grand Veloria Resort & Spa

![Status do Projeto](https://img.shields.io/badge/Status-Concluído-success)
![Linguagens](https://img.shields.io/badge/Linguagens-HTML%20|%20CSS%20|%20JS%20|%20Python-blue)
![Banco de Dados](https://img.shields.io/badge/Database-MariaDB-orange)

Projeto acadêmico Full Stack focado no desenvolvimento de um sistema web para gerenciamento de reservas de um resort familiar. O objetivo principal foi criar uma jornada de usuário clara (UI/UX) integrada a um back-end funcional e seguro.

---

## 🎥 Demonstração Visual

*(Substitua o link abaixo pelo caminho do seu GIF/Vídeo demonstrando o cadastro, login e checkout)*
![Demonstração do Fluxo de Reserva e Login](link_para_seu_gif_aqui.gif)

---

## 💻 Tecnologias Utilizadas

**Front-end:**
* **HTML5 & CSS3:** Estruturação semântica e estilização responsiva (Mobile-First).
* **JavaScript (Vanilla):** Manipulação do DOM, Web Components (`<menu-principal>`) e requisições assíncronas.

**Back-end & Banco de Dados:**
* **Python (Flask):** Criação de uma API RESTful leve e rápida para gerenciar as rotas.
* **MariaDB:** Banco de dados relacional para persistência de usuários e registros de reservas.
* **Bibliotecas Adicionais:** `flask-cors` (controle de acesso transversal), `mysql-connector-python` (integração de dados).

---

## 🔐 Arquitetura e Segurança

Para garantir a integridade da aplicação simulada, foram aplicadas as seguintes práticas de desenvolvimento corporativo:
* **Consumo de API Própria:** O Front-end estático é completamente desacoplado e se comunica com o Back-end exclusivamente através da `Fetch API`, enviando e recebendo payloads em formato JSON.
* **Criptografia de Dados:** Senhas de usuários nunca são expostas ou salvas em texto puro. A biblioteca `Werkzeug` é utilizada para gerar *hashes* seguros antes de qualquer inserção no banco de dados.
* **Prevenção contra SQL Injection:** O uso exclusivo de *Parameterized Queries* no conector do banco de dados impede ataques de injeção de código nas rotas de login e checkout.
* **Gerenciamento de Estado:** Utilização de `localStorage` para a persistência do token/sessão do usuário durante a navegação entre páginas HTML puras.

---

## 🚀 Como rodar o projeto localmente

Siga o passo a passo abaixo para executar a aplicação completa na sua máquina:

### 1. Preparação do Banco de Dados
1. Inicie o seu servidor MariaDB/MySQL (via XAMPP, Laragon, ou terminal).
2. Crie um banco de dados chamado `grand_veloria`.
3. Importe o arquivo `schema.sql` (ou rode as *querys* de criação das tabelas `usuarios` e `reservas`).

### 2. Configuração do Back-end (Python)
1. Certifique-se de ter o [Python](https://www.python.org/) instalado em sua máquina.
2. Abra o terminal na pasta do projeto e instale as dependências executando:
   ```bash
   pip install flask flask-cors mysql-connector-python werkzeug
Inicie o servidor Flask rodando o arquivo principal:

Bash
python index.py
O terminal confirmará que a API está rodando em http://127.0.0.1:5000.

3. Acessando a Aplicação
Com o back-end rodando, basta dar um duplo clique no arquivo index.html localizado na pasta do Front-end (ou abri-lo pelo Live Server do VSCode). O site estará pronto para uso e integrado ao banco!

👨‍💻 Autor
Alex Vitor Lins da Silva
Estudante de Análise e Desenvolvimento de Sistemas

Conecte-se comigo no LinkedIn(https://www.linkedin.com/in/alex-lins-1013apw/)

Veja outros projetos no meu GitHub(https://github.com/AlexLins33)


***