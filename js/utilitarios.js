// ============================================================
// Utilitários compartilhados — Fórmulas Interativas
// Funções de apoio usadas pelo app e por todas as fórmulas.
// ============================================================

// Encurta document.getElementById
const porId = (id) => document.getElementById(id);

// Mantém um valor dentro de um intervalo [mínimo, máximo]
function limitar(valor, minimo, maximo) {
  return Math.min(Math.max(valor, minimo), maximo);
}

// Caracteres de sobrescrito (⁰¹²³...) para exibir expoentes bonitos
const SOBRESCRITOS = "\u2070\u00B9\u00B2\u00B3\u2074\u2075\u2076\u2077\u2078\u2079";

// Converte um número de expoente em sobrescrito unicode (ex.: 12 -> ¹², -3 -> ⁻³)
function expoenteSoBescrito(exp) {
  const negativo = exp < 0 ? "\u207B" : "";
  return negativo + String(Math.abs(exp)).split("").map((d) => SOBRESCRITOS[Number(d)]).join("");
}

// Formata um número em notação científica visual (ex.: 1234 -> 1,23×10³)
function notacaoCientifica(n) {
  const partes = n.toExponential(2).split("e");
  return partes[0].replace(".", ",") + "×10" + expoenteSoBescrito(Number(partes[1]));
}

// Formata um número para exibição: científica se muito grande/pequeno, senão até 2 casas decimais
function formatarNumero(n) {
  if (!isFinite(n)) return String(n);
  if (n === 0) return "0";
  const absoluto = Math.abs(n);
  if (absoluto >= 1e5 || absoluto < 1e-3) return notacaoCientifica(n);
  const arredondado = Math.round(n * 100) / 100;
  return String(arredondado);
}

// Converte um valor para porcentagem dentro do seu intervalo (serve para encher o trilho do slider)
function posicaoPercentual(valor, minimo, maximo) {
  return ((valor - minimo) / (maximo - minimo)) * 100;
}

// Escreve um número com sinal: "+ 3" ou "− 3" (sinal de menos unicode)
function comSinal(n) {
  if (n < 0) return "− " + formatarNumero(Math.abs(n));
  return "+ " + formatarNumero(n);
}

// Monta os atributos SVG de um texto com contorno escuro, para legibilidade sobre o gráfico
function contornoPreto(cor) {
  return 'stroke="#0b1020" stroke-width="6" paint-order="stroke" fill="' + cor + '"';
}

// Desenha um plano cartesiano (grade + eixos + números) e devolve a string SVG
// junto com as funções que convertem coordenadas matemáticas em pixels.
function planoCartesiano(xMin, xMax, yMin, yMax) {
  const W = 500, H = 500, M = 38; // largura, altura e margem do SVG
  const fatorX = (W - 2 * M) / (xMax - xMin);
  const fatorY = (H - 2 * M) / (yMax - yMin);

  // Convertem coordenadas matemáticas -> pixels do SVG
  const xParaPixels = (x) => M + (x - xMin) * fatorX;
  const yParaPixels = (y) => (H - M) - (y - yMin) * fatorY;

  let grade = "";

  // Linhas verticais da grade
  for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
    grade += '<line x1="' + xParaPixels(x).toFixed(2) + '" y1="' + M + '" x2="' + xParaPixels(x).toFixed(2) + '" y2="' + (H - M) + '" stroke="rgba(148,163,184,0.10)"/>';
  }
  // Linhas horizontais da grade
  for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
    grade += '<line x1="' + M + '" y1="' + yParaPixels(y).toFixed(2) + '" x2="' + (W - M) + '" y2="' + yParaPixels(y).toFixed(2) + '" stroke="rgba(148,163,184,0.10)"/>';
  }
  // Eixos
  grade += '<line x1="' + M + '" y1="' + yParaPixels(0).toFixed(2) + '" x2="' + (W - M) + '" y2="' + yParaPixels(0).toFixed(2) + '" stroke="#cbd5e1" stroke-width="2"/>';
  grade += '<line x1="' + xParaPixels(0).toFixed(2) + '" y1="' + M + '" x2="' + xParaPixels(0).toFixed(2) + '" y2="' + (H - M) + '" stroke="#cbd5e1" stroke-width="2"/>';
  // Números no eixo X
  for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
    if (x === 0) continue;
    grade += '<text x="' + xParaPixels(x).toFixed(2) + '" y="' + (yParaPixels(0) + 18) + '" text-anchor="middle" font-size="11" fill="#94a3b8">' + x + "</text>";
  }
  // Números no eixo Y
  for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
    if (y === 0) continue;
    grade += '<text x="' + (xParaPixels(0) - 7) + '" y="' + (yParaPixels(y) + 4).toFixed(2) + '" text-anchor="end" font-size="11" fill="#94a3b8">' + y + "</text>";
  }

  return { grade, xParaPixels, yParaPixels };
}