// Referências dos elementos do DOM
const input = document.getElementById("searchInput");
const results = document.getElementById("results");
const countEl = document.getElementById("resultCount");

/**
 * Função para renderizar a lista de cursos na tela
 * @param {Array} lista - Array de objetos de cursos
 */
function render(lista) {
  results.innerHTML = "";
  
  // Atualiza o contador de resultados
  const total = lista.length;
  countEl.innerText = total === 0 ? "Nenhum curso encontrado" : 
                     total === 1 ? "1 curso encontrado" : `${total} cursos encontrados`;

  // Estado vazio: quando a busca não retorna nada
  if (total === 0) {
    results.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; opacity: 0.6;">
      <span class="material-icons" style="font-size: 48px;">search_off</span>
      <p>Nenhum curso por aqui. Tente outros termos.</p>
    </div>`;
    return;
  }

  // Itera sobre a lista para criar os cards
  lista.forEach((c, index) => {
    // Verifica estados de favorito e concluído (IDs vindos do localStorage via ui.js)
    const listaFavs = (typeof favoritos !== 'undefined') ? favoritos : [];
    const listaDone = (typeof concluidos !== 'undefined') ? concluidos : [];
    
    const isFav = listaFavs.includes(c.titulo);
    const isDone = listaDone.includes(c.titulo);
    
    const article = document.createElement("article");
    article.className = "card";
    
    // Efeito de entrada escalonado para os cards
    article.style.animation = `fadeIn 0.4s ease forwards ${index * 0.05}s`;
    article.style.opacity = "0";

    article.innerHTML = `
      <div class="card-header">
        <span class="material-icons" style="color: var(--md-sys-color-primary)">school</span>
        <div class="card-actions" style="display: flex; gap: 8px;">
          <button class="done-btn ${isDone ? 'active' : ''}" onclick="toggleDone('${c.titulo}')" title="Marcar como concluído">
            <span class="material-icons">${isDone ? 'check_circle' : 'radio_button_unchecked'}</span>
          </button>
          
          <button class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite('${c.titulo}')" title="Favoritar">
            <span class="material-icons">${isFav ? 'star' : 'star_border'}</span>
          </button>
        </div>
      </div>
      <h3>${c.titulo}</h3>
      <p style="opacity: 0.8; font-size: 14px; line-height: 1.5;">${c.descricao}</p>
      <a href="${c.link}" target="_blank">Acessar Conteúdo</a>
    `;
    results.appendChild(article);
  });
}

/**
 * Lógica de Filtro e Busca
 */
input.oninput = () => {
  const termoBusca = input.value.toLowerCase();
  
  // Identifica qual categoria (chip) está ativa no momento
  const chipAtivo = document.querySelector(".chip.active");
  const categoriaAtiva = chipAtivo ? chipAtivo.innerText : "Todos";

  const filtrados = cursos.filter(c => {
    // Verifica se o termo de busca bate com título, tags ou categoria
    const bateBusca = c.titulo.toLowerCase().includes(termoBusca) || 
                      c.tags.some(t => t.includes(termoBusca)) || 
                      c.categoria.toLowerCase().includes(termoBusca);
    
    // Verifica se o curso pertence à categoria/filtro selecionado
    let bateCategoria = true;
    if (categoriaAtiva === "Favoritos") {
      bateCategoria = (typeof favoritos !== 'undefined') && favoritos.includes(c.titulo);
    } else if (categoriaAtiva !== "Todos") {
      bateCategoria = (c.categoria === categoriaAtiva);
    }

    return bateBusca && bateCategoria;
  });

  render(filtrados);
};

/**
 * Controle da Splash Screen
 */
function hideSplash() {
  const splash = document.getElementById('splash');
  if (splash) {
    // Delay de 1s para garantir que a animação seja vista, depois fade out
    setTimeout(() => {
      splash.classList.add('splash-hidden');
      setTimeout(() => {
        splash.style.display = 'none';
      }, 500); // Tempo da transição de opacidade definida no CSS
    }, 1000);
  }
}

// --- Inicialização do Portal ---

// 1. Renderiza todos os cursos inicialmente
render(cursos);

// 2. Remove a Splash Screen quando a janela carregar totalmente
window.addEventListener('load', hideSplash);

// 3. Segurança: Caso o evento 'load' demore demais, força a saída em 3 segundos
setTimeout(hideSplash, 3000);
