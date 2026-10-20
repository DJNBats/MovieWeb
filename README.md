# MovieWeb - Aula Prática 1 (HTML, CSS, JavaScript e Git)

**Unidade Curricular:** Tópicos de Informática e Telecomunicações II / Linguagens e Tecnologias Web (LTW)  
**Instituição:** Instituto de Engenharia e Ciências do Mar (ISECMAR-UTA)  
**Autor:** Dalton (DJNBats)  
**Email:** daltonbaptista5@gmail.com  

---

## 📌 1. Visão Geral do Projeto

O **MovieWeb** é uma aplicação Web front-end desenvolvida com **HTML5**, **CSS3** e **JavaScript (ES6+)**, desenhada para consulta e pesquisa de filmes. A aplicação integra a API pública do **The Movie Database (TMDb)** e inclui um conjunto de dados de fallback estáticos de alta fidelidade para garantir funcionamento contínuo, mesmo quando utilizada com uma chave de teste (como a chave de demonstração fornecida na aula).

### Requisitos Implementados:
- **Apresentação de filmes:** Ao carregar a página, a aplicação obtém e renderiza dinamicamente os filmes populares.
- **Informação do cartão:** Cada cartão de filme exibe o cartaz oficial, o título, a classificação média (formatada) e a sinopse.
- **Classificação por cores:**
  - 🟢 **Verde (`.green`):** Classificação $\ge 8.0$
  - 🟠 **Laranja (`.orange`):** Classificação $\ge 5.0$ e $< 8.0$
  - 🔴 **Vermelho (`.red`):** Classificação $< 5.0$
- **Sinopse Dinâmica (CSS Hover):** Ao passar o cursor do rato sobre qualquer cartão (`.movie:hover .overview`), a sinopse sobe suavemente (*slide-up*) sobre o cartão com animação fluida.
- **Pesquisa por Título:** A barra de pesquisa no cabeçalho permite filtrar filmes por título em tempo real ou via API. Se o formulário for submetido sem texto (vazio), a aplicação restaura automaticamente os filmes populares.

---

## 📁 2. Estrutura de Ficheiros

```text
MovieWeb/
├── .git/               # Repositório Git com histórico e commits estruturados
├── index.html          # Estrutura semântica HTML da aplicação
├── style.css           # Estilos modernos (dark theme, grid flexível e transições)
├── script.js           # Lógica JavaScript, integração da API e manipulação do DOM
└── README.md           # Documentação completa e guia de comandos Git
```

---

## 🛠️ 3. Histórico de Desenvolvimento e Comandos Git Realizados

Conforme exigido pelo guião prático, o desenvolvimento seguiu uma metodologia estruturada de versionamento em Git:

### Slide 6: Inicialização do Repositório Local
```bash
# Aceder à pasta do projeto
cd MovieWeb

# Inicializar o repositório na branch principal (main)
git init -b main

# Configurar autor do repositório
git config user.name "Dalton"
git config user.email "daltonbaptista5@gmail.com"
```

### Slide 7: Primeiro Commit - Estrutura HTML
```bash
git add index.html
git commit -m "Estrutura inicial HTML"
```

### Slides 8 e 9: Segundo Commit - Estilização CSS com Branch e Merge
```bash
# Criar e mudar para a branch featureCSS
git checkout -b featureCSS

# Adicionar estilos e registar commit
git add style.css
git commit -m "Estilização CSS da aplicação"

# Regressar à branch principal
git checkout main

# Integrar alterações via merge fast-forward
git merge featureCSS

# Remover branch temporária
git branch -d featureCSS
```

### Slide 10: Terceiro Commit - JavaScript e Manipulação do DOM
```bash
# Criar branch para JavaScript
git checkout -b featureJS

# Adicionar script.js com fetch de filmes e criação dos cartões
git add script.js
git commit -m "JavaScript e manipulação do DOM"

# Integrar na branch principal e remover a branch temporária
git checkout main
git merge featureJS
git branch -d featureJS
```

### Slide 11: Quarto Commit - Funcionalidade de Pesquisa de Filmes
```bash
# Criar branch para a pesquisa
git checkout -b featureSearch

# Implementar evento de pesquisa e fallback no script.js
git add script.js
git commit -m "Implementa funcionalidade de pesquisa de filmes por título"

# Integrar e remover branch
git checkout main
git merge featureSearch
git branch -d featureSearch
```

### Verificação do Histórico:
```bash
git log --oneline --graph
```
Saída obtida:
```text
* 9fa5f0a (HEAD -> main) Implementa funcionalidade de pesquisa de filmes por título
* a970591 JavaScript e manipulação do DOM
* 10a3484 Estilização CSS da aplicação
* 85d00c4 Estrutura inicial HTML
```

---

## 📖 4. Respostas e Guia dos Exercícios Experimentais (Slides 12 a 15)

O guião inclui exercícios práticos adicionais de manipulação do repositório Git:

### Slide 12: Remover e Restaurar Ficheiros
1. **Simular remoção de um ficheiro de teste:**
   ```bash
   touch teste.txt
   git add teste.txt
   git commit -m "Adiciona ficheiro de teste"
   git rm teste.txt
   git commit -m "Remove ficheiro de teste"
   ```
2. **Restaurar o ficheiro a partir de um commit anterior:**
   ```bash
   # Restaurar o ficheiro a partir do penúltimo commit (HEAD~1)
   git checkout HEAD~1 -- teste.txt
   # Ou com git restore:
   git restore --source=HEAD~1 teste.txt
   git add teste.txt
   git commit -m "Restaura ficheiro teste.txt"
   ```

### Slide 13: Renomear Ficheiros
```bash
# Renomear ficheiro de forma rastreada pelo Git:
git mv teste.txt exemplo.txt
git commit -m "Renomeia teste.txt para exemplo.txt"
git log --stat -n 1
```

### Slide 14: Alterar um Commit Existente (`--amend`)
```bash
# Criar commit de teste
echo "teste" >> exemplo.txt
git commit -am "Mensagem com erro"

# Corrigir a mensagem do último commit
git commit --amend -m "Mensagem corrigida com --amend"
```
> **Explicação Teórica (Pergunta do Slide 14):**
> - **Alterar um commit local:** É uma operação segura porque o commit apenas existe na sua máquina. O `--amend` regrava o commit com um novo identificador SHA-1 sem impactar ninguém.
> - **Modificar um commit já partilhado (pushed para um repositório remoto):** É perigoso e não recomendado. Se alterar a história de um commit já enviado para o GitHub/remoto, a sua história divergirá da dos seus colegas de equipa. Para enviar a alteração seria necessário um `git push --force`, o que sobrescreveria o histórico de outros colaboradores e geraria conflitos graves de merge.

### Slide 15: Recuar no Histórico com `git reset`
> **Efeito das opções sobre Commits, Staging Area e Working Directory:**
>
> | Opção | O commit é desfeito? | A Staging Area (Index) é alterada? | O Working Directory (Ficheiros) é alterado? |
> | :--- | :--- | :--- | :--- |
> | **`git reset --soft HEAD~1`** | **Sim** (HEAD aponta para o commit anterior) | **Não** (as alterações mantêm-se preparadas/staged) | **Não** (o código permanece intacto) |
> | **`git reset --mixed HEAD~1`** *(padrão)* | **Sim** | **Sim** (as alterações saem da staging area) | **Não** (as alterações continuam no disco como não preparadas) |
> | **`git reset --hard HEAD~1`** | **Sim** | **Sim** (staging area é limpa) | **Sim (ATENÇÃO!)** (todas as alterações no código são destruídas irreversivelmente) |

---

## 🚀 5. Como Executar a Aplicação

1. Basta abrir o ficheiro `index.html` em qualquer navegador web moderno (Google Chrome, Microsoft Edge, Firefox).
2. Se pretender utilizar a sua própria chave real da API do TMDb, basta abrir o ficheiro `script.js` e substituir o valor da constante `API_KEY`:
   ```javascript
   const API_KEY = 'A_SUA_CHAVE_TMDB_AQUI';
   ```
