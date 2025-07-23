const apiKey = "https://api.rawg.io/api/games?key=YOUR_API_KEY";
const gamesContainer = document.getElementById("gamesContainer");
const searchInput = document.getElementById("searchInput");
const toggleTheme = document.getElementById("toggleTheme");

// Buscar jogos populares
async function fetchGames(query = "") {
  const url = query
    ? `https://api.rawg.io/api/games?search=${query}&page_size=12&key=YOUR_API_KEY`
    : `https://api.rawg.io/api/games?ordering=-rating&page_size=12&key=YOUR_API_KEY`;

  const res = await fetch(url);
  const data = await res.json();
  displayGames(data.results);
}

// Exibir jogos no container
function displayGames(games) {
  gamesContainer.innerHTML = "";
  games.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML = `
      <img src="\${game.background_image}" alt="\${game.name}" />
      <div class="game-title">\${game.name}</div>
    `;
    gamesContainer.appendChild(card);
  });
}

// Tema escuro/claro
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

// Busca
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  fetchGames(query);
});

// Inicial
fetchGames();
