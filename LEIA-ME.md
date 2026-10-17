# Página de vendas do livro do Carlos

Página em React + Vite, com animações em Motion (`motion/react`).

## Duas formas de usar

**1. Só subir a página pronta (sem programar)**
A pasta `dist/` é o site já compilado. Basta enviar o conteúdo dela para a hospedagem
(raiz do domínio ou subpasta). Funciona em qualquer servidor estático.
Se for colocar numa subpasta (ex.: site.com/livro), compilar de novo com `npx vite build --base=/livro/`.

**2. Editar e compilar**
Precisa de Node 18 ou mais novo.

```
npm install
npm run dev      # abre em http://localhost:5173
npm run build    # gera a pasta dist/
```

## O que trocar antes de publicar

Tudo fica em `src/config.js`:

- `CHECKOUT_URL`: link do checkout. Hoje rola até a seção de preço.
- `WHATSAPP_URL`: link do WhatsApp da equipe (https://wa.me/55DDDNUMERO).
- `CNPJ`: aparece no rodapé quando preenchido.
- `PAGINAS_LIVRO`: prints das páginas do livro (salvar em `public/img/paginas/`).
  Vazio, a página mostra aberturas de capítulo desenhadas a partir do sumário.
- `EMPRESAS`: nomes do carrossel "Estão no meu currículo". A empresa atual do Carlos fica de fora (regra de compliance dele).
- `CARGOS`: salários da calculadora (Guia Salarial 2026, Robert Half, mediana).

Imagens em `public/img/`. Textos da página em `src/components/`.

## Fontes

Outfit (títulos) e Manrope (texto), ambas Google Fonts com licença livre, embutidas pelo pacote `@fontsource`.
A Polymath e a Arbeit da identidade visual têm licença só de uso pessoal ou teste, por isso não foram usadas.
