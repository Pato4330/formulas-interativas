// Validação profunda: estrutura das páginas + links do menu
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const raiz = __dirname;
const dirPaginhas = path.join(raiz, "formulas");

function ler(nome) {
  return fs.readFileSync(path.join(raiz, nome), "utf8");
}

let ok = true;

// 1) Links do menu devem existir e cada página ter a estrutura esperada
const CATEGORIAS = new vm.Script(ler("js/formulas.js") + "\n; CATEGORIAS", { filename: "formulas.js" }).runInNewContext();
const total = CATEGORIAS.reduce((s, c) => s + c.formulas.length, 0);
console.log("Menus: " + CATEGORIAS.map((c) => c.nome + " (" + c.formulas.length + ")").join(", "));

const arquivos = fs.readdirSync(dirPaginhas).filter((f) => f.endsWith(".html"));
const presentes = new Set();
for (const catItem of CATEGORIAS) {
  for (const f of catItem.formulas) {
    const caminho = path.join(dirPaginhas, f.arquivo);
    presentes.add(f.arquivo);
    if (!fs.existsSync(caminho)) {
      ok = false;
      console.log("FALTA ARQUIVO: " + f.arquivo);
      continue;
    }
    const html = fs.readFileSync(caminho, "utf8");
    const script = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join("\n");
    const cheques = {
      "titulo:": !!script.match(/titulo:/),
      "formula: (fix)": !!script.match(/formula:/),
      "campos:": !!script.match(/campos:/),
      "calcular (opcional)": script.match(/calcular\s*\(estado\)/) ? true : null,
      "textoAoVivo": !!script.match(/textoAoVivo\s*\(estado\)/),
      "desenhar": !!script.match(/desenhar\s*\(svg,\s*estado\)/),
      "app.js no final": html.includes('src="../js/app.js"'),
      "utilitarios": html.includes('src="../js/utilitarios.js"'),
      "css": html.includes('../css/estilo.css')
    };
    const faltam = Object.entries(cheques).filter(([nome, ok]) => ok === false).map(([c]) => c);
    if (faltam.length) {
      ok = false;
      console.log("INCOMPLETA " + f.arquivo + " -> falta: " + faltam.join(", "));
    }
  }
}

// 2) Nenhuma página órfã (fora do menu)
for (const arq of arquivos) {
  if (!presentes.has(arq)) {
    ok = false;
    console.log("ÓRFÃ (sem link no menu): " + arq);
  }
}

console.log(ok ? "VALIDAÇÃO COMPLETA OK — " + total + " fórmulas no menu, " + arquivos.length + " páginas no disco" : "PROBLEMAS ENCONTRADOS");