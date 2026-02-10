// Troca de Tema com View Transitions
const body = document.body;
const toggle = document.getElementById("toggleTheme");
const themeIcon = toggle.querySelector("span");

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

// Lógica dos Chips de Categoria
const chipsDiv = document.getElementById("chips");
const categorias = ["Todos", ...new Set(cursos.map(c => c.categoria))];
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

    const filtrados = (cat === "Todos") 
      ? cursos 
      : cursos.filter(c => c.categoria === cat);
    
    render(filtrados);
  });

  chipsDiv.appendChild(chip);
});