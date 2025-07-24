📖 Visão Geral
Este projeto é um protótipo funcional de e-commerce completo com frontend responsivo e backend simulado. Implementa todas as funcionalidades essenciais de uma loja virtual moderna, incluindo vitrine de produtos, carrinho de compras, sistema de busca e filtragem por categorias.

✨ Funcionalidades Principais
Vitrine de Produtos: Exibição de produtos em grid responsivo

Carrinho de Compras: Adição/remoção de itens e cálculo de total

Sistema de Filtros: Busca por texto e filtragem por categorias

Design Responsivo: Adaptado para mobile, tablet e desktop

Persistência de Dados: Carrinho salvo no localStorage

Backend Simulado: API REST com Node.js e Express

Notificações: Feedback visual para ações do usuário

🛠️ Tecnologias Utilizadas
Frontend
HTML5: Estrutura semântica

CSS3: Estilização com Flexbox, Grid e variáveis CSS

JavaScript ES6+: Lógica da aplicação

Fetch API: Comunicação com backend

Backend
Node.js: Ambiente de execução JavaScript

Express: Framework para criação da API REST

CORS: Middleware para políticas de segurança

Ferramentas
JSON Server: Simulação de banco de dados

Font Awesome: Ícones

Git: Controle de versão

🚀 Como Executar o Projeto
Pré-requisitos
Node.js (v14+)

Navegador moderno (Chrome, Firefox, Edge)

Passo a Passo
Clonar o repositório

bash
git clone https://github.com/seu-usuario/loja-virtual-simples.git
cd loja-virtual-simples
Instalar dependências do backend

bash
cd backend
npm install express cors
Iniciar o servidor backend

bash
node server.js
O servidor iniciará em: http://localhost:3001

Abrir o frontend

Abra o arquivo frontend/index.html no navegador

Ou utilize um servidor local como:

bash
npx serve frontend
🧠 Arquitetura do Sistema
text
Cliente (Browser)          Frontend (JS)          Backend (Express)
     |                         |                         |
     |----1. Carregar HTML---->|                         |
     |                         |                         |
     |----2. GET /products------------------------------>|
     |                         |                         |
     |<-----------------------3. JSON-------------------<|
     |                         |                         |
     |----4. Render Produtos-->|                         |
     |                         |                         |
     |----5. Adicionar Carrinho->|                         |
     |                         |---6. Save LocalStorage  |
📂 Estrutura de Arquivos
text
loja-virtual-simples/
├── backend/
│   ├── server.js         # Servidor Express (API)
│   └── products.js       # Dados dos produtos (mock)
├── frontend/
│   ├── index.html        # Página principal
│   ├── style.css         # Estilos CSS
│   ├── script.js         # Lógica JavaScript
│   └── assets/           # Imagens (opcional)
├── .gitignore
└── README.md
🔍 Endpoints da API
GET /api/products - Lista todos os produtos

GET /api/search?q=termo - Busca produtos por termo

Exemplo de resposta:

json
[
  {
    "id": 1,
    "name": "Smartphone Galaxy S21",
    "price": 2499.99,
    "category": "eletrônicos",
    "image": "smartphone.jpg",
    "description": "Smartphone de última geração com câmera tripla"
  }
]
💡 Conceitos Técnicos Explicados
Backend Simulado
O backend utiliza Node.js com Express para criar uma API REST simulada:

Rotas: Manipulam requisições HTTP (GET, POST, etc.)

Middleware: app.use(cors()) permite requisições entre origens diferentes

Mock de dados: Produtos armazenados em array JavaScript

Frontend Avançado
Fetch API: Comunicação assíncrona com o backend

LocalStorage: Persistência do carrinho no navegador

Manipulação do DOM: Renderização dinâmica de elementos

Event Delegation: Gerenciamento eficiente de eventos

CSS Responsivo: Media queries, Flexbox e Grid

Padrões de Projeto
MVC (Model-View-Controller): Separação de responsabilidades

Singleton: Instância única do carrinho

Module Pattern: Encapsulamento de funcionalidades

🧪 Testando a Aplicação
Adicione produtos ao carrinho

Verifique o cálculo automático do total

Teste filtros por categoria

Experimente a busca por termos

Recarregue a página para ver a persistência do carrinho

Redimensione a janela para testar a responsividade
