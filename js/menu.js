// ============================================================
// Menu — Fórmulas Interativas
// Monta a página inicial com os cards das fórmulas (usa CATEGORIAS)
// ============================================================

const app = porId("app");

function montarMenu() {
  let html =
    '<div class="hero">' +
    '<p class="eyebrow">Aprenda mexendo</p>' +
    "<h1>Fórmulas Interativas</h1>" +
    '<p class="sub">Escolha uma fórmula e mexa nas barras para vê-la ganhar vida.</p>' +
    "</div>";

  for (const categoria of CATEGORIAS) {
    html += '<div class="section"><h2>' + categoria.nome + '</h2><div class="menu-grid">';
    for (const f of categoria.formulas) {
      html +=
        '<a class="card" style="--c:' + f.cor + '" href="formulas/' + f.arquivo + '">' +
        "<h3>" + f.titulo + "</h3>" +
        '<div class="fix">' + f.formula + "</div>" +
        "<p>" + f.descricao + "</p>" +
        "</a>";
    }
    html += "</div></div>";
  }

  app.innerHTML = html;
}

montarMenu();