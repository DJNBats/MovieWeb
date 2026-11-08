# MovieWeb - Desenvolvimento Web Colaborativo

**Unidade Curricular:** Tópicos de Informática e Telecomunicações II / Linguagens e Tecnologias Web (LTW)  
**Instituição:** Instituto de Engenharia e Ciências do Mar (ISECMAR-UTA)  
**Docente:** Prof.ª Carmen Silva  
**Repositório Remoto (GitHub Privado):** [https://github.com/DJNBats/MovieWeb](https://github.com/DJNBats/MovieWeb)

---

## 👥 Equipa de Desenvolvimento & Organização do Grupo

Conforme as diretrizes da **Aula Prática 2 (Slides 10 a 13)**, o projeto foi desenvolvido de forma colaborativa com recurso ao Git e GitHub:

| Estudante | Papel / Função | Responsabilidades no Repositório |
| :--- | :--- | :--- |
| **Dalton Baptista** (`DJNBats`) | **Responsável pelo Repositório** | Criação e configuração do repositório remoto, gestão de branches, revisão de Pull Requests e merge na branch `main`. Implementação do menu rotativo e integração de vistas. |
| **Flávio Monteiro** (`FlavioRLMonteiro`) | **Colaborador / Desenvolvedor** | Desenvolvimento de funcionalidades no catálogo de filmes, tratamento de dados da API e implementação de filtros. |
| **Karen Santos** (`KarenSofiaa`) | **Colaborador / Desenvolvedor** | Implementação do Item 3: filmes de ação via API TMDb. |

---

## 📌 Visão Geral do Projeto

O **MovieWeb** é uma aplicação Web front-end moderna construída com **HTML5 semântico**, **CSS3 avançado** e **JavaScript (ES6+) assíncrono**, concebida para exploração, avaliação e pesquisa de filmes através da API do **The Movie Database (TMDb)** com fallback estático de alta fidelidade.

### 🌟 Funcionalidades Implementadas

#### Aula Prática 1: Catálogo e Pesquisa
- **Apresentação dinâmica de filmes:** Obtenção e renderização dos filmes mais populares no DOM.
- **Cartões de filme completos:** Apresentação de poster, título, classificação numérica e sinopse em camada deslizante (*overview hover*).
- **Classificação por cores:**
  - 🟢 **Verde (`.green`):** Classificação $\ge 8.0$
  - 🟠 **Laranja (`.orange`):** Classificação $\ge 5.0$ e $< 8.0$
  - 🔴 **Vermelho (`.red`):** Classificação $< 5.0$
- **Pesquisa por título:** Filtragem instantânea via API TMDb ou catálogo local ao submeter a barra de pesquisa.

#### Aula Prática 2: Menu Lateral Rotativo Interativo (Rotating Navigation)
- **Menu Lateral Rotativo (Requisito 1):**
  - Botão circular de alternância no canto superior esquerdo com cor de destaque (`#ff7979`).
  - Ícone de hambúrguer (`fas fa-bars`) para abrir o menu e ícone de fecho (`fas fa-times`) ao abrir.
  - Efeito visual de rotação do conteúdo principal (`transform: rotate(-20deg)` com `transform-origin: top left`).
  - Rotação sincronizada do botão circular (`transform: rotate(-70deg)`).
- **Três Itens de Navegação (Requisito 2):**
  - 🏠 **ITEM 1:** Filmes em Destaque (catálogo principal e pesquisa).
  - ⭐ **ITEM 2:** Filmes Mais Votados (Top Rated) — apresentação dos filmes com classificação superior ou igual a 7.5, ordenados por avaliação descendente para destacar os melhores resultados.
  - 🔥 **ITEM 3:** Filmes de Ação (catálogo filtrado por género Ação, ID 28 da API TMDb, com fallback estático).
- **Integração das Funcionalidades (Requisito 6):**
  - A pesquisa de filmes permanece acessível e operacional em qualquer momento.
  - Ao pesquisar a partir dos itens 2 ou 3, a aplicação regressa automaticamente ao catálogo principal para apresentar os resultados.
  - Fecho rápido do menu ao pressionar a tecla `Escape` ou ao clicar em qualquer item do menu.

---

## 📁 Estrutura de Ficheiros

```text
MovieWeb/
├── .git/               # Repositório Git com histórico de commits e branches
├── index.html          # Estrutura semântica HTML e container rotativo
├── style.css           # Estilos CSS, animações 2D/3D e responsividade
├── script.js           # Lógica JavaScript, integração da API, rotação e navegação
└── README.md           # Documentação completa e relatório prático
```

---

## 🛠️ Metodologia de Trabalho Colaborativo com Git & GitHub

O desenvolvimento colaborativo respeitou rigorosamente as regras estipuladas no guião prático:

### 1. Branches por Funcionalidade
Nenhum colaborador realiza commits diretos na branch principal (`main`). Cada funcionalidade é desenvolvida numa branch isolada:
- `feature-menu-rotativo`: Estrutura do menu rotativo, botões circulares e navegação entre os 3 itens.
- `feature-item1`: Refinamento do catálogo e pesquisa.
- `feature-item2`: Secção dos filmes mais votados.
- `feature-item3-acao`: Secção de filmes de ação (Item 3).
