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
    const isFav = favoritos.includes(c.titulo);
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
  const currentCat = document.querySelector(".chip.active").innerText;

  const filtrados = cursos.filter(c => {
    const matchSearch = c.titulo.toLowerCase().includes(v) || 
                        c.tags.some(t => t.includes(v)) || 
                        c.categoria.toLowerCase().includes(v);
    
    let matchCat = true;
    if (currentCat === "Favoritos") matchCat = favoritos.includes(c.titulo);
    else if (currentCat !== "Todos") matchCat = (c.categoria === currentCat);

    return matchSearch && matchCat;
  });

  render(filtrados);
};

render(cursos);

/* Splash Screen Styles */
#splash {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--md-sys-color-surface);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: opacity 0.5s ease, visibility 0.5s;
}

.splash-content {
  text-align: center;
  animation: pulse 2s infinite ease-in-out;
}

.splash-logo {
  font-size: 80px;
  color: var(--md-sys-color-primary);
  margin-bottom: 16px;
}

.splash-title {
  font-weight: 400;
  color: var(--md-sys-color-primary);
  margin-bottom: 24px;
}

/* Loader Circular Estilo MD3 */
.loader {
  width: 40px;
  height: 40px;
  border: 4px solid var(--md-sys-color-primary-container);
  border-top: 4px solid var(--md-sys-color-primary);
  border-radius: 50%;
  margin: 0 auto;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
}

/* Classe para esconder a splash */
.splash-hidden {
  opacity: 0;
  visibility: hidden;
}

// No final do seu search.js, apague o que tinha e coloque isso:
function fecharSplash() {
  const splash = document.getElementById('splash');
  if (splash) {
    console.log("Removendo Splash Screen...");
    splash.style.opacity = '0';
    setTimeout(() => {
      splash.style.display = 'none';
    }, 500);
  }
}

// Executa assim que o script carregar
fecharSplash();

// E por segurança, executa de novo quando a janela carregar tudo
window.onload = fecharSplash;
