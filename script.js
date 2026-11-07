// ==========================================================================
// Configuração da API TMDB
// ==========================================================================
const API_KEY = '53178150e837ff10e36ad0cf2dd4485e';
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query="`;
const ACTION_API = `https://api.themoviedb.org/3/discover/movie?with_genres=28&sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
// ==========================================================================
// Elementos do DOM
// ==========================================================================
const container = document.getElementById('container');
const openBtn = document.getElementById('open');
const closeBtn = document.getElementById('close');

const main = document.getElementById('main');
const topRatedSection = document.getElementById('top-rated-section');
const aboutSection = document.getElementById('about-section');
const sectionTitle = document.getElementById('section-title');

const form = document.getElementById('form');
const search = document.getElementById('search');

const navItems = document.querySelectorAll('nav ul li');

// ==========================================================================
// Dados estáticos de fallback (garante que a aplicação funcione sempre)
// ==========================================================================
const STATIC_MOVIES = [
    {
        title: 'Spider-Man: Brand New Day',
        poster_path: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&auto=format&fit=crop&q=80',
        vote_average: 8.5,
        overview: 'Peter Parker enfrenta novos desafios e inimigos enquanto tenta equilibrar a sua vida pessoal e as responsabilidades como o Homem-Aranha numa Nova Iorque em constante transformação.'
    },
    {
        title: 'The Odyssey',
        poster_path: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
        vote_average: 8.0,
        overview: 'Uma jornada épica inspirada no clássico da literatura grega antiga, acompanhando os desafios mitológicos e marítimos de regresso ao lar.'
    },
    {
        title: 'Project Hail Mary',
        poster_path: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
        vote_average: 8.6,
        overview: 'Um astronauta solitário acorda numa nave espacial sem memória da sua identidade e descobre que é a última esperança para salvar a humanidade da extinção.'
    },
    {
        title: 'Hope',
        poster_path: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
        vote_average: 6.8,
        overview: 'Num futuro distópico, sobreviventes unem esforços para restabelecer a esperança e reconstruir a sociedade após uma crise global devastadora.'
    },
    {
        title: 'Matchbox the Movie',
        poster_path: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80',
        vote_average: 7.9,
        overview: 'Aventuras em alta velocidade numa competição eletrizante que testa a destreza dos melhores pilotos e os seus carros em pistas radicais.'
    },
    {
        title: 'Insidious: Out of the Further',
        poster_path: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=800&auto=format&fit=crop&q=80',
        vote_average: 7.7,
        overview: 'Novas entidades aterrorizantes emergem do além, forçando a família a confrontar os seus segredos mais sombrios para sobreviver.'
    },
    {
        title: 'Resident Evil',
        poster_path: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=800&auto=format&fit=crop&q=80',
        vote_average: 7.3,
        overview: 'Uma unidade militar especial combate um poderoso supercomputador descontrolado e centenas de cientistas que se transformaram em criaturas mutantes.'
    },
    {
        title: 'The Disaster Zone',
        poster_path: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
        vote_average: 3.5,
        overview: 'Uma equipa de resgate tenta conter um desastre ambiental catastrófico numa fábrica abandonada repleta de químicos perigosos.'
    }
];

const ACTION_FALLBACK = STATIC_MOVIES.filter(m =>
    ['Spider-Man: Brand New Day', 'Resident Evil', 'Matchbox the Movie'].includes(m.title)
);

// Cache local de filmes obtidos da API para alimentar os itens do menu
let cachedMovies = [...STATIC_MOVIES];

// ==========================================================================
// Controlo do Menu Rotativo (Requisito 1)
// ==========================================================================
if (openBtn && closeBtn && container) {
    openBtn.addEventListener('click', () => {
        container.classList.add('show-nav');
    });

    closeBtn.addEventListener('click', () => {
        container.classList.remove('show-nav');
    });
}

// Fechar menu ao pressionar Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && container.classList.contains('show-nav')) {
        container.classList.remove('show-nav');
    }
});

// ==========================================================================
// Navegação Entre os Itens do Menu (Requisito 2)
// ==========================================================================
navItems.forEach((item) => {
    item.addEventListener('click', () => {
        const target = item.dataset.target;
        switchTab(target);
        // Fecha o menu após a seleção
        container.classList.remove('show-nav');
    });
});

function switchTab(target) {
    // Atualizar classe ativa nos itens do menu
    navItems.forEach((li) => {
        li.classList.toggle('active', li.dataset.target === target);
    });

    // Ocultar todas as vistas
    main.classList.remove('active');
    topRatedSection.classList.remove('active');
    aboutSection.classList.remove('active');

    // Apresentar a secção selecionada
    if (target === 'item1') {
        main.classList.add('active');
        sectionTitle.innerHTML = '<i class="fas fa-film"></i> ITEM 1: Filmes em Destaque';
    } else if (target === 'item2') {
        topRatedSection.classList.add('active');
        sectionTitle.innerHTML = '<i class="fas fa-star"></i> ITEM 2: Filmes Mais Votados (Top Rated)';
        renderTopRated();
    } else if (target === 'item3') {
        aboutSection.classList.add('active');
        sectionTitle.innerHTML = '<i class="fas fa-fire"></i> ITEM 3: Filmes de Ação';
        renderAction();
    }
}

// ==========================================================================
// Funções de Obtenção e Renderização de Filmes (Item 1)
// ==========================================================================
getMovies(API_URL);

async function getMovies(url, searchTerm = '') {
    try {
        if (API_KEY.includes('abc123def456')) {
            filterLocal(searchTerm);
            return;
        }

        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Erro na API: ${res.status}`);
        }
        const data = await res.json();
        if (data.results && data.results.length > 0) {
            cachedMovies = data.results;
            showMovies(data.results, main);
        } else {
            filterLocal(searchTerm);
        }
    } catch (error) {
        console.warn('Não foi possível carregar da API TMDB. A apresentar filmes estáticos.', error);
        filterLocal(searchTerm);
    }
}

function filterLocal(searchTerm) {
    if (searchTerm) {
        const filtered = STATIC_MOVIES.filter(movie =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        showMovies(filtered, main);
    } else {
        showMovies(STATIC_MOVIES, main);
    }
}

function showMovies(movies, targetElement) {
    targetElement.innerHTML = '';

    if (!movies || movies.length === 0) {
        targetElement.innerHTML = '<p style="color: #fff; font-size: 1.2rem; text-align: center; width: 100%;">Nenhum filme encontrado.</p>';
        return;
    }

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;

        let posterUrl = '';
        if (poster_path && poster_path.startsWith('http')) {
            posterUrl = poster_path;
        } else if (poster_path) {
            posterUrl = IMG_PATH + poster_path;
        } else {
            posterUrl = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80';
        }

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        const rating = typeof vote_average === 'number' ? vote_average.toFixed(1) : vote_average;

        movieEl.innerHTML = `
            <img src="${posterUrl}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${rating}</span>
            </div>
            <div class="overview">
                <h3>Sinopse</h3>
                <p>${overview ? overview : 'Sinopse não disponível.'}</p>
            </div>
        `;

        targetElement.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

// ==========================================================================
// Conteúdo do Item 2: Filmes Mais Votados
// ==========================================================================
function renderTopRated() {
    // Filtra filmes com avaliação igual ou superior a 7.5 ou ordena por vote_average
    const topMovies = [...cachedMovies]
        .sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0))
        .filter(m => (m.vote_average || 0) >= 7.0);

    showMovies(topMovies.length > 0 ? topMovies : cachedMovies, topRatedSection);
}

// ==========================================================================
// Conteúdo do Item 3: Filmes de Ação
// ==========================================================================
async function renderAction() {
    try {
        const res = await fetch(ACTION_API);
        if (!res.ok) throw new Error(`Erro na API: ${res.status}`);
        const data = await res.json();

        if (data.results && data.results.length > 0) {
            showMovies(data.results, aboutSection);
        } else {
            showMovies(ACTION_FALLBACK, aboutSection);
        }
    } catch (error) {
        console.warn('Falha ao carregar filmes de ação. A usar fallback.', error);
        showMovies(ACTION_FALLBACK, aboutSection);
    }
}

// ==========================================================================
// Pesquisa de Filmes (Requisito 6: integração funcional)
// ==========================================================================
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value.trim();

    // Se estiver noutra secção, regressa ao catálogo principal para ver os resultados
    if (!main.classList.contains('active')) {
        switchTab('item1');
    }

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm, searchTerm);
        search.value = '';
    } else {
        getMovies(API_URL);
    }
});
