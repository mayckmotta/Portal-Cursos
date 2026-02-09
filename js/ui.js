const body = document.body;
const toggle = document.getElementById("toggleTheme");

toggle.onclick = () => {
  body.classList.toggle("dark");
};

const chipsDiv = document.getElementById("chips");
const categorias = [...new Set(cursos.map(c => c.categoria))];

categorias.forEach(cat => {
  const chip = document.createElement("div");
  chip.className = "chip";
  chip.innerText = cat;

  chip.onclick = () => {
    document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    render(cursos.filter(c => c.categoria === cat));
  };

  chipsDiv.appendChild(chip);
});