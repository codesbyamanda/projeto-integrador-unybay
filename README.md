# UnyBay - Projeto Integrador

Este projeto foi desenvolvido como parte do Projeto Integrador do curso, com o objetivo de criar uma aplicação web utilizando React, TypeScript, Vite e Tailwind CSS.

A proposta da aplicação é simular uma plataforma de marketplace chamada **UnyBay**, onde usuários podem visualizar produtos, pesquisar itens, acessar detalhes de produtos, criar uma conta, fazer login e cadastrar seus próprios anúncios dentro de uma área administrativa.

O projeto também utiliza integração com API externa para listagem e busca de produtos, além de recursos como autenticação simulada, estado global, Local Storage, validações de formulários, feedback visual ao usuário e responsividade.

## Funcionalidades

* Página inicial com banner em carrossel;
* Campo de busca de produtos;
* Seção de itens recentes consumindo dados de API;
* Seção de categorias com filtro de produtos;
* Seção de produtos recomendados;
* Página com listagem completa de produtos;
* Página de resultado de busca integrada à API;
* Página de detalhes do produto;
* Página “Quem Somos”;
* Página “Fale Conosco” com formulário;
* Cadastro de usuário;
* Login de usuário;
* Autenticação simulada com Context API;
* Persistência do usuário logado com Local Storage;
* Dashboard para usuário logado;
* Cadastro de anúncios por perfil de usuário;
* Edição de anúncios cadastrados;
* Exclusão de anúncios com confirmação;
* Página de detalhes do anúncio cadastrado;
* Upload de imagens para anúncios;
* Validação dos formulários com React Hook Form e Yup;
* Feedback visual com React Toastify;
* Máscara no campo de telefone;
* Formatação monetária no campo de preço;
* Layouts separados para páginas públicas, autenticação e dashboard;
* Responsividade para diferentes tamanhos de tela.

## Tecnologias utilizadas

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router DOM
* React Icons
* Axios
* React Hook Form
* Yup
* React Toastify
* React Quill New
* React Number Format
* Context API
* Local Storage
* DummyJSON API

## Estrutura do projeto

```txt
src
├── components
│   ├── AuthHeader.tsx
│   ├── DashboardHeader.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── ProductCard.tsx
│   └── ProductCardSkeleton.tsx
├── contexts
│   └── AuthContext.tsx
├── layouts
│   ├── AuthLayout.tsx
│   ├── DashboardLayout.tsx
│   └── MainLayout.tsx
├── pages
│   ├── admin
│   │   ├── AnuncioDetalhes.tsx
│   │   ├── CadastrarProduto.tsx
│   │   ├── Dashboard.tsx
│   │   └── MeusAnuncios.tsx
│   ├── Cadastro.tsx
│   ├── FaleConosco.tsx
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── ProdutoDetalhes.tsx
│   ├── Produtos.tsx
│   ├── QuemSomos.tsx
│   └── ResultadoBusca.tsx
├── services
│   └── api.ts
├── utils
│   └── ScrollToTop.tsx
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

### Área pública

* `/` - Página inicial
* `/produtos` - Listagem de produtos
* `/resultado-busca` - Resultado da busca
* `/produtos/:id` - Detalhes do produto
* `/quem-somos` - Página institucional
* `/fale-conosco` - Página de contato
* `/login` - Página de login
* `/cadastro` - Página de cadastro de usuário

### Área logada / Dashboard

* `/dashboard` - Página inicial do usuário logado
* `/dashboard/produtos` - Listagem de produtos dentro do dashboard
* `/dashboard/produtos/:id` - Detalhes do produto dentro do dashboard
* `/dashboard/resultado-busca` - Resultado de busca dentro do dashboard
* `/dashboard/quem-somos` - Página Quem Somos dentro do dashboard
* `/dashboard/fale-conosco` - Página Fale Conosco dentro do dashboard
* `/dashboard/anuncios` - Página de anúncios do usuário
* `/dashboard/anuncios/novo` - Cadastro de novo anúncio
* `/dashboard/anuncios/:id` - Detalhes do anúncio cadastrado
* `/dashboard/anuncios/editar/:id` - Edição de anúncio cadastrado

## Integração com API

O projeto utiliza a API pública **DummyJSON** para carregar produtos, detalhes de produtos, resultados de busca e produtos por categoria.

A configuração da API foi feita com Axios no arquivo:

```txt
src/services/api.ts
```

Exemplo de configuração:

```ts
import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://dummyjson.com',
})
```

## Autenticação e Local Storage

A autenticação do projeto foi implementada de forma simulada no front-end, utilizando **Context API** e **Local Storage**.

Quando o usuário faz cadastro ou login, seus dados são armazenados globalmente no `AuthContext` e persistidos no navegador. Também é gerado um token simulado para representar o fluxo de autenticação.

Os anúncios cadastrados são salvos no Local Storage de acordo com o e-mail do usuário logado. Dessa forma, cada perfil possui sua própria lista de anúncios.

Exemplo de chave utilizada:

```txt
@unybay:produtos:email-do-usuario
```

## Validações

Os formulários do sistema utilizam **React Hook Form** e **Yup** para validação dos campos antes do envio dos dados.

Foram aplicadas validações em formulários como:

* Login;
* Cadastro de usuário;
* Cadastro de produto/anúncio;
* Fale Conosco.

Caso algum campo esteja inválido, o sistema exibe mensagens de erro e impede o envio até que as informações sejam preenchidas corretamente.

## Feedback ao usuário

O projeto utiliza **React Toastify** para exibir mensagens de feedback ao usuário.

Foram implementados toasts para situações como:

* Login realizado com sucesso;
* Cadastro realizado com sucesso;
* Produto cadastrado;
* Produto editado;
* Produto excluído;
* Erros em requisições;
* Logout do usuário.

## Funcionalidade extra

Como funcionalidade extra com biblioteca de terceiros, foi utilizada a biblioteca **React Number Format**.

Ela foi aplicada para melhorar a usabilidade dos formulários:

* Máscara no campo de telefone, no formato `(00) 00000-0000`;
* Formatação monetária no campo de preço, no formato `R$ 0,00`.

Essa melhoria ajuda a padronizar os dados inseridos pelo usuário e deixa os formulários mais próximos de uma aplicação real.

## Responsividade

O projeto recebeu ajustes de responsividade para melhorar a navegação em diferentes tamanhos de tela.

Foram adaptados:

* Headers;
* Cards de produtos;
* Grids;
* Formulários;
* Páginas de detalhes;
* Área administrativa;
* Componentes de anúncios.

## Sobre o projeto

A **UnyBay** é uma aplicação fictícia criada para fins acadêmicos. O projeto tem como objetivo aplicar conceitos de componentização, rotas, consumo de API, autenticação simulada, compartilhamento de estado global, persistência com Local Storage, validação de formulários, bibliotecas de terceiros, responsividade e organização de uma aplicação React.

## Autora

Desenvolvido por Amanda como atividade do Projeto Integrador.
