const input = document.getElementById("searchInput");
const results = document.getElementById("results");
const countEl = document.getElementById("resultCount");

function render(lista) {
  results.innerHTML = "";
  
  const total = lista.length;
  countEl.innerText = total === 0 ? "Nenhum curso encontrado" : 
                     total === 1 ? "1 curso encontrado" : `${total} cursos encontrados`;

  if (total === 0) {
    results.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; opacity: 0.6;">
      <span class="material-icons" style="font-size: 48px;">search_off</span>
      <p>Nenhum curso por aqui.</p>
    </div>`;
    return;
  }

  lista.forEach((c, index) => {
    // Verifica se favoritos existe (evita erro se ui.js demorar)
    const listaFavs = (typeof favoritos !== 'undefined') ? favoritos : [];
    const isFav = listaFavs.includes(c.titulo);
    
    const article = document.createElement("article");
    article.className = "card";
    article.style.animation = `fadeIn 0.4s ease forwards ${index * 0.05}s`;
    article.style.opacity = "0";

    article.innerHTML = `
      <div class="card-header">
        <span class="material-icons" style="color: var(--md-sys-color-primary)">school</span>
        <button class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite('${c.titulo}')">
          <span class="material-icons">${isFav ? 'star' : 'star_border'}</span>
        </button>
      </div>
      <h3>${c.titulo}</h3>
      <p style="opacity: 0.8; font-size: 14px; line-height: 1.5;">${c.descricao}</p>
      <a href="${c.link}" target="_blank">Acessar Conteúdo</a>
    `;
    results.appendChild(article);
  });
}

input.oninput = () => {
  const v = input.value.toLowerCase();
  const chipAtivo = document.querySelector(".chip.active");
  const currentCat = chipAtivo ? chipAtivo.innerText : "Todos";

  const filtrados = cursos.filter(c => {
    const matchSearch = c.titulo.toLowerCase().includes(v) || 
                        c.tags.some(t => t.includes(v)) || 
                        c.categoria.toLowerCase().includes(v);
    
    let matchCat = true;
    if (currentCat === "Favoritos") matchCat = (typeof favoritos !== 'undefined') && favoritos.includes(c.titulo);
    else if (currentCat !== "Todos") matchCat = (c.categoria === currentCat);

    return matchSearch && matchCat;
  });

  render(filtrados);
};

// --- Lógica da Splash Screen ---

function hideSplash() {
  const splash = document.getElementById('splash');
  if (splash) {

    // Adicionamos um delay proposital de 1 segundo para a animação aparecer

    setTimeout(() => {
      splash.classList.add('splash-hidden');
      setTimeout(() => { splash.style.display = 'none'; }, 500);
    }, 2000); 
  }
}

// Inicialização
render(cursos);

// Dispara a saída da splash
window.addEventListener('load', hideSplash);