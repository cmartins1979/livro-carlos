// Tudo que muda sem mexer no layout fica aqui.

// Link do checkout (Amazon, Eduzz...). Enquanto estiver "#oferta", o botão rola até o preço.
export const CHECKOUT_URL = "https://www.amazon.com.br/Tímido-demais-para-ser-diretor-ebook/dp/B0HN5SWG1N/";

// Link do WhatsApp da equipe. Formato: https://wa.me/55DDDNUMERO
export const WHATSAPP_URL = "https://wa.me/555193134247?text=" + encodeURIComponent("Olá! Vim pela página de vendas do livro e gostaria de tirar uma dúvida.");

// CNPJ do rodapé. Vazio, a linha some.
export const CNPJ = "";

export const PRECO_DE = "97,00";
export const PRECO_POR = "14,96";

// Prints das páginas do livro. Salvar em public/img/paginas/ e listar aqui na ordem.
// Enquanto a lista estiver vazia, a página mostra aberturas de capítulo desenhadas a partir do sumário.
export const PAGINAS_LIVRO = [
  // "/img/paginas/01.webp",
];

// Empresas do currículo. Trocar por logos em SVG (cinza) quando houver os arquivos.
// A empresa atual fica de fora pela regra de compliance do Carlos.
export const EMPRESAS = [
  "Sonae",
  "Walmart",
  "Grupo Pão de Açúcar",
  "Via Varejo",
  "Casas Bahia",
  "Cencosud",
  "Linea Alimentos",
  "Dufrio",
];

// Mediana do Guia Salarial 2026 da Robert Half (mesma fonte da VSL). Conferir antes de publicar.
export const CARGOS = {
  coordenador: {
    rotulo: "Sou coordenador",
    hoje: 14200,
    cima: 25600,
    cargoHoje: "Coordenador de planejamento",
    cargoCima: "Gerente de supply chain",
  },
  gerente: {
    rotulo: "Sou gerente",
    hoje: 25600,
    cima: 37650,
    cargoHoje: "Gerente de supply chain",
    cargoCima: "Diretor de supply chain",
  },
};
