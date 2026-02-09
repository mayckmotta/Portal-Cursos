const input = document.getElementById("searchInput");
const results = document.getElementById("results");

function render(cursosFiltrados) {
  results.innerHTML = "";

  cursosFiltrados.forEach(curso => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${curso.titulo}</h3>
      <p>${curso.descricao}</p>
      <a href="${curso.link}" target="_blank">Acessar curso</a>
    `;

    results.appendChild(card);
  });
}

input.addEventListener("input", () => {
  const termo = input.value.toLowerCase();

  const filtrados = cursos.filter(curso =>
    curso.tags.some(tag => tag.includes(termo)) ||
    curso.titulo.toLowerCase().includes(termo)
  );

  render(filtrados);
});

// Render inicial
render(cursos);