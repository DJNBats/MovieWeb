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
| **Karen Santos** | **Colaboradora / Desenvolvedora** | Desenvolvimento de estilos visuais, secção informativa do projeto e testes de integração multiplataforma. |

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
  - ⭐ **ITEM 2:** Filmes Mais Votados (Top Rated - filmes com melhor classificação).
  - ✉️ **ITEM 3:** Sobre o Projeto & Equipa (apresentação detalhada da equipa ISECMAR-UTA, tecnologias e curso).
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
- `feature-item3`: Secção sobre o projeto e equipa.

### 2. Fluxo de Trabalho (Workflow Individual)
```bash
# 1. Atualizar a branch main local
git checkout main
git pull origin main

# 2. Criar uma nova branch para a funcionalidade
git checkout -b feature-nome-da-funcionalidade

# 3. Implementar o código e registar commits descritivos
git add .
git commit -m "Descricao clara da alteracao"

# 4. Publicar a branch no repositório remoto
git push -u origin feature-nome-da-funcionalidade
```

### 3. Submissão e Integração de Pull Requests
1. O estudante acede ao GitHub e cria um **Pull Request (PR)** da sua branch para a branch `main`.
2. O responsável pelo repositório (**Dalton Baptista**) revê o código, valida a compatibilidade e a ausência de conflitos.
3. Após aprovação, o responsável efetua o **Merge** do Pull Request na branch `main`.

---

## 🚀 Como Executar e Testar a Aplicação

1. Clone o repositório ou faça o download dos ficheiros:
   ```bash
   git clone https://github.com/DJNBats/MovieWeb.git
   cd MovieWeb
   ```
2. Abra o ficheiro `index.html` diretamente em qualquer navegador moderno (Chrome, Edge, Firefox).
3. **Interações do Menu:**
   - Clique no botão circular vermelho no canto superior esquerdo para abrir o menu rotativo.
   - Observe a rotação suave do ecrã e a aparição dos 3 itens à esquerda em degraus.
   - Clique em **ITEM 1**, **ITEM 2** ou **ITEM 3** para alternar instantaneamente de secção.
   - Pressione o botão com o "X" ou a tecla `Esc` para recolher o menu.
4. **Pesquisa:**
   - Utilize o campo no cabeçalho para pesquisar qualquer filme (ex.: *Spider-Man*, *Odyssey*).
