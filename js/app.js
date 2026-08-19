// ============================================================
// Motor do app — Fórmulas Interativas
// Lê a variável global "formula" (definida em cada página),
// monta os controles, desenha o SVG e roda o loop de animação.
// ============================================================

const app = porId("app");

// estado[chave]    -> valor real definido pelos controles (ex.: a = 3)
// exibicao[chave]  -> valor suavizado usado no desenho (para dar fluidez)
const estado = {};
const exibicao = {};

let precisaRedesenhar = true; // avisa o loop que o SVF precisa ser refeito
let idFrame = null;           // controle do loop de animação

// Limpa as variáveis de estado entre uma página e outra
function zeraEstado() {
  for (const k in estado) delete estado[k];
  for (const k in exibicao) delete exibicao[k];
}

// Monta a página de uma fórmula a partir da variável global "formula"
function montarPagina(formula) {
  document.body.classList.add("pagina");
  document.title = formula.titulo + " · Fórmulas Interativas";
  zeraEstado();

  // 1. Valores iniciais de cada campo, usando o padrão definido
  for (const campo of formula.campos) {
    estado[campo.chave] = campo.padrao;
  }
  // 2. Calcula os valores derivados (ex.: c = hipotenusa)
  if (formula.calcular) formula.calcular(estado);
  // 3. Inicializa o que será exibido no desenho
  for (const k in estado) {
    if (typeof estado[k] === "number") exibicao[k] = estado[k];
  }

  // 4. Monta o HTML da página
  app.innerHTML =
    '<div class="page-head">' +
    '<div class="topline"><a class="back" href="../index.html">← Menu</a><span id="fix">' + formula.formula + "</span></div>" +
    "<h1>" + formula.titulo + "</h1>" +
    '<p class="sub">' + formula.descricao + "</p>" +
    "</div>" +
    '<div class="layout">' +
    '<div class="stage"><svg id="viz"></svg></div>' +
    '<div class="panel"><div id="live" class="live"></div><div id="controls"></div></div>' +
    "</div>";

  // 5. Cria um controle (slider + caixa numérica) para cada campo
  const painel = porId("controls");
  for (const campo of formula.campos) {
    const cartao = document.createElement("div");
    cartao.className = "control";
    cartao.style.setProperty("--accent", campo.cor);
    cartao.innerHTML =
      '<label><span class="dot"></span>' + campo.rotulo + "</label>" +
      "<output></output>" +
      '<input type="number" min="' + campo.min + '" max="' + campo.max + '" step="' + campo.passo + '" inputmode="decimal">' +
      '<input type="range" min="' + campo.min + '" max="' + campo.max + '" step="' + campo.passo + '">';

    const saida = cartao.querySelector("output");
    const caixaNumero = cartao.querySelector("input[type=number]");
    const slider = cartao.querySelector("input[type=range]");

    // O que acontece quando o usuário mexe em algum controle
    const aoMudar = (valor) => {
      if (formula.campoEspecial && formula.campoEspecial[campo.chave]) {
        // Regra especial (ex.: no pitágoras, mexer na hipotenusa escala os catetos)
        formula.campoEspecial[campo.chave](estado, valor);
      } else {
        estado[campo.chave] = limitar(valor, campo.min, campo.max);
      }
      if (formula.calcular) formula.calcular(estado);
      precisaRedesenhar = true;
      sincronizarCampos(formula);
    };

    slider.addEventListener("input", () => aoMudar(Number(slider.value)));
    caixaNumero.addEventListener("change", () => aoMudar(Number(caixaNumero.value) || 0));

    // Guarda referências para o campo ser atualizado depois
    campo._elementos = { saida, caixaNumero, slider };
    painel.appendChild(cartao);
  }

  // 6. Primeiro desenho e início do loop de animação
  sincronizarCampos(formula);
  precisaRedesenhar = true;

  const svg = porId("viz");
  svg.setAttribute("viewBox", "0 0 640 640");
  formula.desenhar(svg, exibicao);
  const dimensoes = svg.viewBox.baseVal;
  svg.setAttribute("width", dimensoes.width);
  svg.setAttribute("height", dimensoes.height);

  idFrame = requestAnimationFrame(loop);
}

// Pega o valor atual de cada campo e reflete na tela (slider, número e texto ao vivo)
function sincronizarCampos(formula) {
  for (const campo of formula.campos) {
    const valor = estado[campo.chave];
    const elementos = campo._elementos;
    elementos.slider.value = valor;
    elementos.caixaNumero.value = formatarNumero(valor);
    elementos.saida.textContent = formatarNumero(valor);
    elementos.slider.style.setProperty("--p", posicaoPercentual(valor, campo.min, campo.max) + "%");
  }
  porId("live").innerHTML = formula.textoAoVivo(estado);
}

// Loop de animação: interpola os valores (efeito de deslize) e redesenha o SVG
function loop() {
  let algoAnimando = false;

  // Aproxima lentamente o valor exibido do valor real (interpolação exponencial)
  for (const k in exibicao) {
    if (Math.abs(estado[k] - exibicao[k]) > 0.02) {
      exibicao[k] += (estado[k] - exibicao[k]) * 0.35;
      algoAnimando = true;
    } else {
      exibicao[k] = estado[k];
    }
  }

  // Páginas com animação contínua redesenham em todo frame (bola caindo, elétrons...)
  if (formula.sempre) precisaRedesenhar = true;

  if (algoAnimando || precisaRedesenhar) {
    precisaRedesenhar = false;
    formula.desenhar(porId("viz"), exibicao);
  }

  idFrame = requestAnimationFrame(loop);
}

// Inicia o app (o arquivo de cada página define "window.formula" antes de incluir este script)
montarPagina(formula);