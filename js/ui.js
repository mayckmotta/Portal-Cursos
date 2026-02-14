// --- Gerenciamento de Dados Locais ---
let favoritos = JSON.parse(localStorage.getItem('portal_cursos_favs')) || [];
let concluidos = JSON.parse(localStorage.getItem('portal_cursos_done')) || [];

// --- Funções de Alternância (Favoritos e Conclusão) ---
function toggleFavorite(titulo) {
  const index = favoritos.indexOf(titulo);
  if (index > -1) favoritos.splice(index, 1);
  else favoritos.push(titulo);
  
  localStorage.setItem('portal_cursos_favs', JSON.stringify(favoritos));
  executarRenderAtual();
}

function toggleDone(titulo) {
  const index = concluidos.indexOf(titulo);
  if (index > -1) concluidos.splice(index, 1);
  else concluidos.push(titulo);
  
  localStorage.setItem('portal_cursos_done', JSON.stringify(concluidos));
  atualizarProgresso();
  executarRenderAtual();
}

// --- Atualização da Interface ---
function atualizarProgresso() {
  const porcentagem = Math.round((concluidos.length / cursos.length) * 100);
  const bar = document.getElementById("progressBar");
  const text = document.getElementById("completionRate");
  
  if (bar) bar.style.width = `${porcentagem}%`;
  if (text) text.innerText = `${porcentagem}% concluído`;
}

function executarRenderAtual() {
  const v = document.getElementById("searchInput").value.toLowerCase();
  const chipAtivo = document.querySelector(".chip.active");
  const cat = chipAtivo ? chipAtivo.innerText : "Todos";
  
  // Filtra de acordo com a categoria e busca atual
  const filtrados = cursos.filter(c => {
    const matchBusca = c.titulo.toLowerCase().includes(v) || c.categoria.toLowerCase().includes(v);
    let matchCat = true;
    if (cat === "Favoritos") matchCat = favoritos.includes(c.titulo);
    else if (cat !== "Todos") matchCat = (c.categoria === cat);
    return matchBusca && matchCat;
  });
  
  if (typeof render === "function") render(filtrados);
}

// --- Tema ---
const toggleThemeBtn = document.getElementById("toggleTheme");
toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  toggleThemeBtn.querySelector("span").innerText = isDark ? "light_mode" : "dark_mode";
});

// --- Inicialização dos Chips ---
const chipsDiv = document.getElementById("chips");
const categorias = ["Todos", "Favoritos", ...new Set(cursos.map(c => c.categoria))];

categorias.forEach(cat => {
  const chip = document.createElement("button");
  chip.className = "chip" + (cat === "Todos" ? " active" : "");
  chip.innerText = cat;

  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    executarRenderAtual();
  });

  chipsDiv.appendChild(chip);
});

// Inicializa a barra de progresso no carregamento
window.addEventListener('DOMContentLoaded', atualizarProgresso);
