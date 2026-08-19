// ============================================================
// Catálogo de fórmulas — usado pelo menu (index.html)
// Cada item aponta para o arquivo da página correspondente.
// ============================================================

const CATEGORIAS = [
  {
    nome: "Matemática",
    formulas: [
      { arquivo: "pitagoras.html", titulo: "Teorema de Pitágoras", formula: "a² + b² = c²", descricao: "No triângulo retângulo, o quadrado da hipotenusa é igual à soma dos quadrados dos catetos.", cor: "#3b82f6" },
      { arquivo: "funcao-linear.html", titulo: "Função Linear", formula: "y = ax + b", descricao: "Deslize o coeficiente angular e o termo independente para ver a reta mudar.", cor: "#ef4444" },
      { arquivo: "funcao-quadratica.html", titulo: "Função Quadrática", formula: "y = ax² + bx + c", descricao: "Veja a parábola, o vértice e as raízes mudarem ao vivo.", cor: "#f59e0b" },
      { arquivo: "area-circulo.html", titulo: "Área do Círculo", formula: "A = πr² · C = 2πr", descricao: "Área e comprimento da circunferência em função do raio.", cor: "#3b82f6" },
      { arquivo: "area-triangulo.html", titulo: "Área do Triângulo", formula: "A = b·h / 2", descricao: "Área = (base × altura) ÷ 2.", cor: "#ef4444" },
      { arquivo: "area-retangulo.html", titulo: "Área do Retângulo", formula: "A = b·h · P = 2(b+h)", descricao: "Área e perímetro do retângulo.", cor: "#3b82f6" },
      { arquivo: "porcentagem.html", titulo: "Porcentagem", formula: "parte = p% de base", descricao: "Quanto é X% de um valor? A parte é (p/100)·base.", cor: "#22c55e" },
      { arquivo: "distancia-pontos.html", titulo: "Distância entre Dois Pontos", formula: "d = √(Δx² + Δy²)", descricao: "Mova dois pontos no plano e veja a distância entre eles.", cor: "#f59e0b" },
      { arquivo: "seno-cosseno.html", titulo: "Seno e Cosseno", formula: "sen²θ + cos²θ = 1", descricao: "No triângulo retângulo de hipotenusa 1: sen θ = cateto oposto, cos θ = cateto adjacente.", cor: "#3b82f6" },
      { arquivo: "progressao-aritmetica.html", titulo: "Progressão Aritmética", formula: "aₙ = a₁ + (n − 1)·r", descricao: "Cada termo é o anterior mais a razão.", cor: "#f59e0b" },
      { arquivo: "volume-cubo.html", titulo: "Volume do Cubo", formula: "V = a³", descricao: "Aumente a aresta e veja o cubo crescer em 3D.", cor: "#8b5cf6" },
      { arquivo: "esfera.html", titulo: "Área e Volume da Esfera", formula: "A = 4πr² · V = 4πr³/3", descricao: "Gire o raio e veja a esfera crescer.", cor: "#06b6d4" },
      { arquivo: "juros-compostos.html", titulo: "Juros Compostos", formula: "M = C·(1 + i)ᵗ", descricao: "Veja o montante crescer ao longo dos meses.", cor: "#f59e0b" },
      { arquivo: "celsius-fahrenheit.html", titulo: "Celsius para Fahrenheit", formula: "°F = °C·9/5 + 32", descricao: "Ajuste a temperatura e compare nos dois termômetros.", cor: "#f97316" },
      { arquivo: "media-ponderada.html", titulo: "Média Ponderada", formula: "M = (v₁p₁ + v₂p₂) / (p₁ + p₂)", descricao: "Notas com pesos diferentes.", cor: "#ec4899" }
    ]
  },
  {
    nome: "Física",
    formulas: [
      { arquivo: "queda-livre.html", titulo: "Queda Livre", formula: "h = ½gt² · v = gt", descricao: "A distância e a velocidade dependem do tempo (g = 9,8 m/s²).", cor: "#ef4444" },
      { arquivo: "mru.html", titulo: "Movimento Uniforme", formula: "s = s₀ + v·t", descricao: "O gráfico é uma reta cuja inclinação é a velocidade.", cor: "#22c55e" },
      { arquivo: "segunda-lei-newton.html", titulo: "Segunda Lei de Newton", formula: "F = m·a", descricao: "A força resultante é o produto da massa pela aceleração.", cor: "#ef4444" },
      { arquivo: "lei-ohm.html", titulo: "Lei de Ohm", formula: "U = R·I", descricao: "A corrente é a razão entre a tensão e a resistência: I = U/R.", cor: "#22c55e" },
      { arquivo: "energia-cinetica.html", titulo: "Energia Cinética", formula: "Ec = ½·m·v²", descricao: "A energia cresce com o quadrado da velocidade.", cor: "#22c55e" },
      { arquivo: "energia-potencial.html", titulo: "Energia Potencial Gravitacional", formula: "Ep = m·g·h", descricao: "A energia armazenada pela altura (g = 9,8 m/s²).", cor: "#f59e0b" },
      { arquivo: "trabalho.html", titulo: "Trabalho", formula: "W = F·d", descricao: "O trabalho da força paralela ao deslocamento.", cor: "#ef4444" },
      { arquivo: "pressao.html", titulo: "Pressão", formula: "P = F / A", descricao: "A pressão é a força distribuída pela área.", cor: "#3b82f6" },
      { arquivo: "densidade.html", titulo: "Densidade", formula: "ρ = m / V", descricao: "Compare com a água (ρ = 1): o objeto flutua ou afunda?", cor: "#22c55e" },
      { arquivo: "gravitacao-universal.html", titulo: "Lei da Gravitação Universal", formula: "F = G·m₁·m₂ / d²", descricao: "A força entre duas massas, com G = 6,67×10⁻¹¹.", cor: "#3b82f6" },
      { arquivo: "mruv.html", titulo: "Movimento Uniformemente Variado", formula: "v = v₀ + a·t", descricao: "A velocidade muda com aceleração constante.", cor: "#8b5cf6" },
      { arquivo: "pendulo.html", titulo: "Período do Pêndulo", formula: "T = 2π√(L / g)", descricao: "O período depende do comprimento e da gravidade.", cor: "#06b6d4" },
      { arquivo: "calor-sensivel.html", titulo: "Calor Sensível", formula: "Q = m·c·ΔT", descricao: "Quanto de calor para aquecer a água?", cor: "#ef4444" },
      { arquivo: "lei-hooke.html", titulo: "Lei de Hooke (Mola)", formula: "F = k·x", descricao: "Quanto mais estica a mola, maior a força.", cor: "#22c55e" },
      { arquivo: "forca-eletrica.html", titulo: "Força Elétrica (Coulomb)", formula: "F = k·q₁·q₂ / d²", descricao: "Cargas iguais se repelem (k = 9×10⁹).", cor: "#f97316" }
    ]
  }
];