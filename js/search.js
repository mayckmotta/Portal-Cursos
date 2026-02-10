const input = document.getElementById("searchInput");
const results = document.getElementById("results");
const countEl = document.getElementById("resultCount");

function render(lista) {
  results.innerHTML = "";
  
  // Atualiza o contador
  const total = lista.length;
  countEl.innerText = total === 0 ? "Nenhum curso encontrado" : 
                     total === 1 ? "1 curso encontrado" : `${total} cursos encontrados`;

  if (total === 0) {
    results.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; opacity: 0.6;">
      <span class="material-symbols-outlined" style="font-size: 48px;">search_off</span>
      <p>Tente outros termos de busca.</p>
    </div>`;
    return;
  }

  lista.forEach((c, index) => {
    const article = document.createElement("article");
    article.className = "card";
    // Efeito de entrada escalonado
    article.style.animation = `fadeIn 0.4s ease forwards ${index * 0.05}s`;
    article.style.opacity = "0";

    article.innerHTML = `
      <span class="material-symbols-outlined" style="color: var(--md-sys-color-primary)">school</span>
      <h3>${c.titulo}</h3>
      <p style="opacity: 0.8; font-size: 14px; line-height: 1.5;">${c.descricao}</p>
      <a href="${c.link}" target="_blank">Acessar Conteúdo</a>
    `;
    results.appendChild(article);
  });
}

input.oninput = () => {
  const v = input.value.toLowerCase();
  const filtrados = cursos.filter(c =>
    c.titulo.toLowerCase().includes(v) ||
    c.tags.some(t => t.includes(v)) ||
    c.categoria.toLowerCase().includes(v)
  );
  render(filtrados);
};

// Inicialização
render(cursos);