// Configuração da API TMDB
const API_KEY = '53178150e837ff10e36ad0cf2dd4485e';
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query="`;

// Elementos do DOM
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// Dados estáticos de fallback (garante que a aplicação funcione mesmo com a chave de API de teste)
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
        poster_path: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
        vote_average: 7.3,
        overview: 'Uma unidade militar especial combate um poderoso supercomputador descontrolado e centenas de cientistas que se transformaram em criaturas mutantes.'
    },
    {
        title: 'Galactic Horizon',
        poster_path: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
        vote_average: 6.4,
        overview: 'Exploradores espaciais desbravam galáxias desconhecidas à procura de um novo planeta habitável perante o esgotamento dos recursos terrestres.'
    },
    {
        title: 'Shadow Realm',
        poster_path: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=800&auto=format&fit=crop&q=80',
        vote_average: 4.8,
        overview: 'Um misterioso portal abre-se numa cidade remota, libertando sombras que distorcem o tempo e a realidade dos seus habitantes.'
    },
    {
        title: 'The Disaster Zone',
        poster_path: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
        vote_average: 3.5,
        overview: 'Uma equipa de resgate tenta conter um desastre ambiental catastrófico numa fábrica abandonada repleta de químicos perigosos.'
    }
];

// Obter filmes iniciais (populares)
getMovies(API_URL);

// Função para obter filmes da API ou fallback estático
async function getMovies(url, searchTerm = '') {
    try {
        // Se a chave for a de demonstração/falsa, filtrar dados locais
        if (API_KEY.includes('abc123def456')) {
            if (searchTerm) {
                const filtered = STATIC_MOVIES.filter(movie =>
                    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
                );
                showMovies(filtered);
            } else {
                showMovies(STATIC_MOVIES);
            }
            return;
        }

        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Erro na API: ${res.status}`);
        }
        const data = await res.json();
        showMovies(data.results);
    } catch (error) {
        console.warn('Não foi possível carregar da API TMDB. A apresentar filmes estáticos.', error);
        if (searchTerm) {
            const filtered = STATIC_MOVIES.filter(movie =>
                movie.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            showMovies(filtered);
        } else {
            showMovies(STATIC_MOVIES);
        }
    }
}

// Apresentar lista de filmes no DOM
function showMovies(movies) {
    main.innerHTML = '';

    if (!movies || movies.length === 0) {
        main.innerHTML = '<p style="color: #fff; font-size: 1.2rem; text-align: center; width: 100%;">Nenhum filme encontrado.</p>';
        return;
    }

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;

        // Construir caminho correto para o cartaz
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

        main.appendChild(movieEl);
    });
}

// Determinar classe de cor com base na classificação:
// - Verde: >= 8
// - Laranja: >= 5 e < 8
// - Vermelho: < 5
function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

// Pesquisa de filmes pelo formulário
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value.trim();

    if (searchTerm && searchTerm !== '') {
        // Pesquisa pelo título (substitui os filmes apresentados)
        getMovies(SEARCH_API + searchTerm, searchTerm);
        search.value = '';
    } else {
        // Se a pesquisa for submetida sem texto, voltam a ser apresentados os filmes populares
        getMovies(API_URL);
    }
});
