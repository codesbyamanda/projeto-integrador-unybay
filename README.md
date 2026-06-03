# UnyBay - Projeto Integrador

Este projeto foi desenvolvido como parte do Projeto Integrador do curso, com o objetivo de criar uma aplicação web utilizando React, TypeScript, Vite e Tailwind CSS.

A proposta da aplicação é simular uma plataforma de marketplace chamada **UnyBay**, onde o usuário pode visualizar produtos, acessar uma listagem completa, pesquisar itens, ver detalhes de um produto específico e acessar uma página institucional de “Quem Somos”.

## Funcionalidades

* Página inicial com banner em carrossel;
* Campo de busca de produtos;
* Seção de itens recentes;
* Seção de categorias;
* Listagem de anúncios;
* Página com todos os produtos;
* Página de resultado de busca;
* Página de detalhes do produto;
* Página “Quem Somos”;
* Header e Footer reutilizáveis através de um layout principal.

## Tecnologias utilizadas

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router DOM
* React Icons

## Estrutura do projeto

```txt
src
├── components
│   ├── Header.tsx
│   └── Footer.tsx
├── layouts
│   └── MainLayout.tsx
├── pages
│   ├── Home.tsx
│   ├── Produtos.tsx
│   ├── ResultadoBusca.tsx
│   ├── ProdutoDetalhes.tsx
│   └── QuemSomos.tsx
├── App.tsx
├── index.css
└── main.tsx
```

## Como executar o projeto

Primeiro, clone o repositório:

```bash
git clone LINK_DO_REPOSITORIO
```

Acesse a pasta do projeto:

```bash
cd projeto-integrador
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

Depois, acesse o endereço exibido no terminal, normalmente:

```txt
http://localhost:5173
```

## Páginas do sistema

* `/` - Página inicial
* `/produtos` - Listagem de produtos
* `/resultado-busca` - Resultado da busca
* `/produtos/:id` - Detalhes do produto
* `/quem-somos` - Página institucional

## Sobre o projeto

A UnyBay é uma aplicação fictícia criada para fins acadêmicos. O projeto tem como objetivo aplicar conceitos de componentização, rotas, estilização com Tailwind CSS e organização de páginas em uma aplicação React.

## Autora

Desenvolvido por Amanda como atividade do Projeto Integrador.
