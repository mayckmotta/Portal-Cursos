const input = document.getElementById("searchInput");
const results = document.getElementById("results");

function render(lista) {
  results.innerHTML = "";
  lista.forEach(c => {
    results.innerHTML += `
      <div class="card">
        <h3>${c.titulo}</h3>
        <p>${c.descricao}</p>
        <a href="${c.link}" target="_blank">Acessar curso</a>
      </div>
    `;
  });
}

input.oninput = () => {
  const v = input.value.toLowerCase();
  render(cursos.filter(c =>
    c.titulo.toLowerCase().includes(v) ||
    c.tags.some(t => t.includes(v))
  ));
};

render(cursos);