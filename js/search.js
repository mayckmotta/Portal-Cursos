const input = document.getElementById("searchInput");
const results = document.getElementById("results");

input.addEventListener("input", () => {
  const termo = input.value.toLowerCase();
  results.innerHTML = "";

  if (termo.length === 0) return;

  const encontrados = cursos.filter(curso =>
    curso.tags.some(tag => tag.includes(termo))
  );

  if (encontrados.length === 0) {
    results.innerHTML = "<p>Nenhum curso encontrado.</p>";
    return;
  }

  encontrados.forEach(curso => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${curso.titulo}</h3>
      <p>${curso.descricao}</p>
      <a href="${curso.link}" target="_blank">Acessar curso</a>
    `;

    results.appendChild(div);
  });
});