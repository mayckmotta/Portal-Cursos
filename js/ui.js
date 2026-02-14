const body = document.body;
const toggle = document.getElementById("toggleTheme");
const themeIcon = toggle.querySelector("span");

// --- Lógica de Favoritos ---
let favoritos = JSON.parse(localStorage.getItem('portal_cursos_favs')) || [];

function toggleFavorite(titulo) {
  const index = favoritos.indexOf(titulo);
  if (index > -1) {
    favoritos.splice(index, 1);
  } else {
    favoritos.push(titulo);
  }
  localStorage.setItem('portal_cursos_favs', JSON.stringify(favoritos));
  
  // Re-renderiza para atualizar os ícones
  const v = document.getElementById("searchInput").value.toLowerCase();
  const currentCat = document.querySelector(".chip.active").innerText;
  
  // Atualiza a visualização atual
  if (currentCat === "Favoritos") {
    render(cursos.filter(c => favoritos.includes(c.titulo)));
  } else {
    // Se não estiver no filtro de favoritos, apenas re-filtra
    const filtrados = cursos.filter(c => 
      (currentCat === "Todos" || c.categoria === currentCat) &&
      (c.titulo.toLowerCase().includes(v) || c.categoria.toLowerCase().includes(v))
    );
    render(filtrados);
  }
}

// --- Tema ---
toggle.addEventListener("click", () => {
  if (!document.startViewTransition) {
    toggleTheme();
    return;
  }
  document.startViewTransition(() => toggleTheme());
});

function toggleTheme() {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");
  themeIcon.innerText = isDark ? "light_mode" : "dark_mode";
}

// --- Chips de Categoria ---
const chipsDiv = document.getElementById("chips");
// Adicionamos "Favoritos" como uma categoria especial
const categorias = ["Todos", "Favoritos", ...new Set(cursos.map(c => c.categoria))];
let activeChip = null;

categorias.forEach(cat => {
  const chip = document.createElement("button");
  chip.className = "chip";
  chip.innerText = cat;

  if (cat === "Todos") {
    chip.classList.add("active");
    activeChip = chip;
  }

  chip.addEventListener("click", () => {
    if (activeChip) activeChip.classList.remove("active");
    chip.classList.add("active");
    activeChip = chip;

    let filtrados;
    if (cat === "Todos") {
      filtrados = cursos;
    } else if (cat === "Favoritos") {
      filtrados = cursos.filter(c => favoritos.includes(c.titulo));
    } else {
      filtrados = cursos.filter(c => c.categoria === cat);
    }
    
    render(filtrados);
  });

  chipsDiv.appendChild(chip);
});
