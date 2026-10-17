import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "motion/react";
import BookMockup from "./BookMockup.jsx";
import { CTA, CountUp, Label, Reveal, Tape, Words, ease } from "./ui.jsx";
import { CNPJ, EMPRESAS, PAGINAS_LIVRO, PRECO_DE, PRECO_POR, WHATSAPP_URL } from "../config.js";

/* ---------- Faixa do topo ---------- */
export function TopBar() {
  const item = (
    <span className="topbar-item">
      Desconto de lançamento: <b>DE R$ {PRECO_DE} POR R$ {PRECO_POR}</b>
    </span>
  );
  return (
    <div className="topbar" role="note">
      <div className="topbar-track">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
}

export function Nav() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 120], ["rgba(13,21,38,0)", "rgba(13,21,38,0.82)"]);
  const border = useTransform(scrollY, [0, 120], ["rgba(185,205,240,0)", "rgba(185,205,240,0.12)"]);
  return (
    <motion.nav className="nav" style={{ backgroundColor: bg, borderColor: border }}>
      <div className="wrap nav-in">
        <img className="nav-logo" src="/img/logo.svg" alt="Mentor de Logística" width="140" height="46" />
        <CTA variant="ghost" className="nav-cta">
          Garantir por R$ {PRECO_POR}
        </CTA>
      </div>
    </motion.nav>
  );
}

/* ---------- Currículo ---------- */
export function Logos() {
  const lista = [...EMPRESAS, ...EMPRESAS];
  return (
    <section className="logos" aria-label="Empresas do currículo">
      <p className="logos-cap">Estão no meu currículo:</p>
      <div className="logos-mask">
        <div className="logos-track">
          {lista.map((e, i) => (
            <span className="logo-word" key={i}>
              {e}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 3 benefícios ---------- */
const icones = {
  cargos: (
    <svg viewBox="0 0 40 40"><path d="M6 32h7v-7h7v-7h7v-7h7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="34" cy="8" r="3" fill="currentColor" /></svg>
  ),
  exercicio: (
    <svg viewBox="0 0 40 40"><rect x="8" y="6" width="24" height="29" rx="3" fill="none" stroke="currentColor" strokeWidth="2.4" /><path d="M14 17l3 3 6-6M14 27h12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  pilares: (
    <svg viewBox="0 0 40 40"><path d="M6 33h28M8 14h24M20 6l14 8H6z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" /><path d="M11 17v13M17 17v13M23 17v13M29 17v13" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
  ),
};

export function Beneficios() {
  const itens = [
    ["cargos", "Organizado por Cargos", "Do assistente ao diretor, 5 degraus."],
    ["exercicio", "Com exercícios práticos", "Cada capítulo termina em exemplo e exercício."],
    ["pilares", "4 pilares com exemplos reais", "Mentalidade, Produtividade, Comunicação e Transbordo."],
  ];
  return (
    <section className="beneficios">
      <div className="wrap bene-grid">
        {itens.map(([ic, t, d], i) => (
          <Reveal key={t} delay={i * 0.12} className="bene">
            <span className="bene-ic">{icones[ic]}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- Identificação ---------- */
export function Dor() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  return (
    <section className="section dor" id="dor" ref={ref}>
      <div className="wrap split">
        <div>
          <Words as="h2" className="h2" text="Tu entrega. Bate a meta. Resolve o problema que ninguém mais quis pegar." />
          <Reveal delay={0.1}>
            <p className="big-line">E na hora da promoção, o nome que sai da boca do diretor é de outro.</p>
          </Reveal>
          <Reveal delay={0.15}>
            <p>
              Não é falta de competência. Quase sempre é outra coisa: quem decide a tua promoção <strong>não sabe o que tu fez</strong>. Ou sabe, mas não consegue te enxergar naquela cadeira.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p>Eu comecei do mesmo lugar. Aos 18 anos, em Porto Alegre, eu era um estagiário de logística que se perguntava se um cara introvertido ia ter vez no meio de tanto estagiário e profissional mais eloquente que eu.</p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="dor-fecho">
              Esse cara chegou a diretor de logística no Walmart Brasil <Tape rotate={-2}>antes dos 30</Tape>.
            </p>
          </Reveal>
        </div>
        <motion.figure className="photo-card tilt-r" style={{ y }}>
          <img src="/img/carlos-palco.webp" alt="Carlos Martins palestrando para profissionais de logística" loading="lazy" width="960" height="1280" />
        </motion.figure>
      </div>
    </section>
  );
}

/* ---------- Objeção ---------- */
export function Objecao() {
  return (
    <section className="section objecao">
      <div className="wrap split split-rev">
        <Reveal className="photo-card mono">
          <img src="/img/carlos-retrato.webp" alt="Retrato de Carlos Martins" loading="lazy" width="900" height="1126" />
        </Reveal>
        <div>
          <motion.h2 className="h2 quote" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
            <span>“Eu sou tímido.”</span>
            <span className="quote-2">“Não quero ser um puxa saco.”</span>
          </motion.h2>
          <Reveal delay={0.1}>
            <p className="big-line">
              Eu também não. Por isso mesmo, <strong>tu não precisa virar outra pessoa</strong> nem aparecer em tudo que é reunião.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p>O guia ensina a transformar resultado operacional em visibilidade executiva, mesmo para quem não é o mais falante da sala.</p>
          </Reveal>
          <Reveal delay={0.2}>
            <p>
              E outra: ele serve tanto para quem <strong>está entrando</strong> em logística quanto para quem <strong>já está no meio</strong> e quer subir. Os capítulos começam no assistente.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Cenário futuro ---------- */
export function Futuro() {
  return (
    <section className="section futuro">
      <div className="wrap split">
        <div>
          <Label>agora, o outro lado da conta</Label>
          <Words as="h2" className="h2" text="Imagina tu daqui a alguns meses." highlight={[4, 5]} />
          <Reveal delay={0.1}>
            <p className="big-line">Tu sabe em qual degrau está e qual é o próximo passo concreto. Tu apresenta teu resultado de um jeito que o diretor entende em dois minutos. Quando abre uma vaga acima da tua, teu nome já está na conversa antes de tu pedir.</p>
          </Reveal>
          <Reveal delay={0.15} className="stat-inline">
            <CountUp to={6} className="stat-n" />
            <p>
              Funciona assim. <strong>Todas as minhas 6 contratações vieram por indicação</strong>, nunca por processo seletivo. Uma ex-coordenadora me viu postar no LinkedIn que eu estaria em Porto Alegre no dia seguinte e na hora ofereceu me indicar para uma vaga de diretor.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="dor-fecho">Ninguém indica quem não conhece. O guia te ensina a ser conhecido pelas razões certas.</p>
          </Reveal>
        </div>
        <Reveal className="photo-card tilt-l">
          <img src="/img/quadro-promocao.webp" alt="Quadro com o diagrama de promoção: ser acima da média e construir um time acima da média" loading="lazy" width="1200" height="900" />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 4 pilares ---------- */
const pilares = [
  ["Mentalidade", "Como pensar como quem já ocupa o cargo que tu quer, em vez de esperar permissão para agir."],
  ["Produtividade", "Como entregar resultado rápido, e com número, para ser lembrado pelo que fez."],
  ["Comunicação", "Como falar com um executivo, apresentar uma ideia e convencer a diretoria a investir nela."],
  ["Transbordo", "Como compartilhar conhecimento com o time, formar sucessor e crescer junto, sem deixar buraco atrás de ti."],
];

export function Pilares() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const linha = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  return (
    <section className="section pilares" ref={ref}>
      <div className="wrap">
        <div className="center-head">
          <Label>método mpct</Label>
          <Words as="h2" className="h2" text="O método se baseia em 4 pilares" highlight={[5, 6]} />
        </div>
        <div className="pil-track">
          <svg className="pil-line" viewBox="0 0 1000 20" preserveAspectRatio="none" aria-hidden="true">
            <motion.path d="M0 10 H1000" stroke="currentColor" strokeWidth="2" strokeDasharray="8 10" fill="none" style={{ pathLength: linha }} />
          </svg>
          {pilares.map(([t, d], i) => (
            <motion.article
              key={t}
              className="pilar"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, ease, delay: i * 0.12 }}
              whileHover={{ y: -8 }}
            >
              <span className="pilar-n">0{i + 1}</span>
              <span className="pilar-letra">{t[0]}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Comparação ---------- */
const comparacao = [
  ["Trabalha mais horas esperando ser notado", "Transforma o resultado em visibilidade para quem decide"],
  ["Estuda teoria que não vira prática", "Aplica um exercício por capítulo"],
  ["Espera ter o cargo para agir como líder", "Lidera projetos e pessoas antes do cargo"],
  ["Cresce no tempo da empresa", "Segue o roteiro dos 5 degraus"],
];

export function Comparacao() {
  return (
    <section className="section comparacao">
      <div className="wrap">
        <div className="cmp">
          <div className="cmp-col cmp-no">
            <h3>O que a maioria faz</h3>
            {comparacao.map(([a], i) => (
              <motion.p key={a} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6, ease }}>
                <span className="cmp-ic">✕</span>
                <span className="cmp-strike">{a}</span>
              </motion.p>
            ))}
          </div>
          <div className="cmp-col cmp-yes">
            <h3>O que o guia propõe</h3>
            {comparacao.map(([, b], i) => (
              <motion.p key={b} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease }}>
                <span className="cmp-ic">✓</span>
                {b}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- O que tem no guia ---------- */
const previas = [
  { tipo: "escura", topo: "Sessão 1", titulo: "Os 4 Pilares do Sucesso" },
  { tipo: "clara", topo: "Capítulo 1", titulo: "Mentalidade", linhas: 9 },
  { tipo: "clara", topo: "Capítulo 3", titulo: "Comunicação", linhas: 8 },
  { tipo: "escura", topo: "Sessão 2", titulo: "As 5 Transições de Carreira" },
  { tipo: "clara", topo: "Capítulo 5", titulo: "De Assistente para Analista de Logística", linhas: 7 },
  { tipo: "clara", topo: "Capítulo 9", titulo: "De Gerente Geral para Diretor de Logística", linhas: 7 },
  { tipo: "escura", topo: "Sessão 3", titulo: "20 dicas que as escolas não ensinam" },
];

function PaginaPrevia({ p, i }) {
  if (p.tipo === "escura") {
    return (
      <div className="pg pg-dark">
        <span className="pg-top">{p.topo}</span>
        <h4>{p.titulo}</h4>
        <span className="pg-tape">GUIA DE CARREIRA</span>
        <span className="pg-num">{String(i * 9 + 12).padStart(2, "0")}</span>
      </div>
    );
  }
  return (
    <div className="pg pg-light">
      <span className="pg-top">{p.topo}</span>
      <h4>{p.titulo}</h4>
      {Array.from({ length: p.linhas }).map((_, k) => (
        <span className="pg-line" key={k} style={{ width: `${70 + ((k * 37) % 30)}%` }} />
      ))}
      <span className="pg-box">Exemplo e exercício</span>
      <span className="pg-num">{String(i * 9 + 12).padStart(2, "0")}</span>
    </div>
  );
}

export function Conteudo() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-38%"]);
  const transicoes = [
    "De Assistente para Analista de Logística",
    "De Analista para Coordenador",
    "De Coordenador para Gerente de Logística",
    "De Gerente para Gerente Geral",
    "De Gerente Geral para Diretor de Logística",
  ];
  return (
    <section className="section conteudo" ref={ref}>
      <div className="wrap split conteudo-top">
        <div className="conteudo-book">
          <BookMockup size={300} baseY={-28} />
        </div>
        <div>
          <Label>dentro do livro</Label>
          <Words as="h2" className="h2" text="O que você encontra no guia?" highlight={[5]} />
          <ul className="lista">
            <Reveal as="li">Guia de Carreira em Logística em PDF, com mais de 70 páginas</Reveal>
            <Reveal as="li" delay={0.05}>
              <strong>Sessão 1:</strong> os 4 pilares do Método MPCT
            </Reveal>
            <Reveal as="li" delay={0.1}>
              <strong>Sessão 2:</strong> as 5 transições de carreira
            </Reveal>
            <Reveal as="li" delay={0.15}>
              <strong>Sessão 3:</strong> 20 dicas que as escolas não ensinam
            </Reveal>
            <Reveal as="li" delay={0.2}>Exemplo e exercício em cada capítulo</Reveal>
            <Reveal as="li" delay={0.25}>Acesso imediato</Reveal>
          </ul>
        </div>
      </div>

      <div className="paginas" aria-label="Páginas do livro">
        <motion.div className="paginas-track" style={{ x }}>
          {PAGINAS_LIVRO.length
            ? PAGINAS_LIVRO.map((src, i) => (
                <div className="pg pg-img" key={src}>
                  <img src={src} alt={`Página ${i + 1} do livro`} loading="lazy" />
                </div>
              ))
            : previas.map((p, i) => <PaginaPrevia p={p} i={i} key={i} />)}
        </motion.div>
      </div>

      <div className="wrap">
        <div className="escada">
          <h3 className="escada-tit">As 5 transições de carreira</h3>
          <ol>
            {transicoes.map((t, i) => (
              <motion.li
                key={t}
                style={{ "--step": i }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 0.7, ease, delay: i * 0.1 }}
              >
                <span className="escada-n">{i + 1}</span>
                {t}
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------- Para quem é ---------- */
const perfis = [
  ["Quem está começando", "Estudante ou assistente que quer entrar na área com um mapa, e não no escuro."],
  ["Quem entrega muito e não sobe", "Profissional técnico forte que sente que a promoção nunca vem."],
  ["Quem acabou de ser promovido", "Gerente de primeira viagem que ainda não se sente seguro na nova posição."],
  ["Quem tem ambição de longo prazo", "Júnior ou pleno que sonha em ser gerente ou diretor e quer saber o caminho."],
];

export function ParaQuem() {
  return (
    <section className="section paraquem">
      <div className="wrap">
        <div className="center-head">
          <Words as="h2" className="h2" text="Mas afinal, será que o guia é para você?" highlight={[8]} />
          <Reveal>
            <p className="lead">O guia foi criado para quem quer crescer em logística e aqui entra muita gente:</p>
          </Reveal>
        </div>
        <div className="perfis">
          {perfis.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.08} className="perfil">
              <span className="perfil-pin" />
              <h3>{t}</h3>
              <p>{d}</p>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="nao-e">
            E se tu quer <strong>teoria acadêmica de supply chain</strong>, esse não é o guia. Aqui é o que se faz no dia a dia.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Resultados ---------- */
export function Resultados() {
  return (
    <section className="section resultados">
      <div className="wrap">
        <div className="center-head">
          <Words as="h2" className="h2" text="Veja alguns resultados de quem trabalhou comigo" highlight={[2]} />
        </div>
        <div className="res-grid">
          <Reveal className="res-card">
            <p className="res-big">
              De R$ <CountUp to={4} /> mil para R$ <CountUp to={8} /> mil em 6 meses!
            </p>
            <p>Mentorado da minha diretoria, promovido de analista pleno a especialista em 6 meses.</p>
          </Reveal>
          <Reveal className="res-card" delay={0.12}>
            <p className="res-big">
              De coordenador a R$ <CountUp to={17} /> mil em 12 meses!
            </p>
            <p>Gerente que liderei. O projeto dele ganhou o Prêmio Inbrasc 2025, categoria Integração Logística de E-commerce.</p>
          </Reveal>
        </div>
        {/* Espaço para prints de leitores do guia: adicionar imagens aqui quando houver. */}
      </div>
    </section>
  );
}

/* ---------- Valor ---------- */
export function Valor() {
  return (
    <section className="section valor">
      <div className="wrap narrow">
        <Words as="h2" className="h2" text="E ainda assim valeria cada centavo" highlight={[4, 5]} />
        <Reveal>
          <p className="big-line">
            <strong>Pensa na conta.</strong>
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <p>Um mentorado meu foi de R$ 4 mil para R$ 8 mil em 6 meses. O guia custa R$ {PRECO_POR}.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p>
            Se ele te ajudar a dar <strong>um único passo de carreira</strong>, a diferença entre o que tu paga e o que tu ganha é enorme. E se não ajudar, tu tem 7 dias para pedir o dinheiro de volta.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p>
            Ao longo da minha carreira, eu investi <strong className="tape-text">R$ 200 mil em educação</strong>. Sei o que vale um conhecimento bom e sei o que um conhecimento barato e vazio entrega. Esse guia é o primeiro tipo.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Oferta ---------- */
export function Oferta() {
  return (
    <section className="section oferta" id="oferta">
      <div className="wrap">
        <motion.div className="oferta-card" initial={{ opacity: 0, y: 60, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 1, ease }}>
          <div className="oferta-glow" />
          <div className="oferta-book">
            <BookMockup size={260} baseY={-22} />
          </div>
          <div className="oferta-body">
            <span className="oferta-tag">Condição válida por tempo limitado</span>
            <div className="oferta-linha">
              <span>Guia de Carreira em Logística (PDF completo)</span>
              <span className="dots" />
              <span>R$ {PRECO_DE}</span>
            </div>
            <p className="oferta-de">
              <s>De R$ {PRECO_DE}</s>
            </p>
            <p className="oferta-mas">Mas tu vai ter acesso ao Guia completo hoje por:</p>
            <p className="oferta-preco">
              <small>R$</small>
              <CountUp to={parseFloat(PRECO_POR.replace(",", "."))} duration={1.2} format={(n) => n.toFixed(2).replace(".", ",")} />
            </p>
            <p className="oferta-desc">desconto de lançamento</p>
            <CTA className="cta-xl">Quero garantir meu guia agora</CTA>
            <div className="selos">
              <span>
                <svg viewBox="0 0 24 24" width="16" height="16"><path d="M12 2l8 4v6c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10V6z" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
                Compra segura
              </span>
              <span>
                <svg viewBox="0 0 24 24" width="16" height="16"><path d="M13 2L4 14h7l-1 8 9-12h-7z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
                Acesso imediato
              </span>
              <span>
                <svg viewBox="0 0 24 24" width="16" height="16"><path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
                7 dias de garantia
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Garantia ---------- */
export function Garantia() {
  return (
    <section className="section garantia">
      <div className="wrap garantia-in">
        <motion.div className="selo" initial={{ rotate: -90, scale: 0.6, opacity: 0 }} whileInView={{ rotate: 0, scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 90, damping: 14 }}>
          <svg viewBox="0 0 200 200" className="selo-ring" aria-hidden="true">
            <defs>
              <path id="circ" d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" />
            </defs>
            <text>
              <textPath href="#circ">GARANTIA INCONDICIONAL · SEM LETRINHAS MIÚDAS · GARANTIA INCONDICIONAL · </textPath>
            </text>
          </svg>
          <span className="selo-n">7</span>
          <span className="selo-d">dias</span>
        </motion.div>
        <div>
          <Words as="h2" className="h2" text="Eu tenho certeza do teu resultado" highlight={[4, 5]} />
          <Reveal>
            <p className="big-line">
              Se mesmo assim tu não gostar, tu tem <strong>7 dias de garantia incondicional</strong>. Sem letrinhas miúdas. Tu pede, eu devolvo o teu dinheiro.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Bio ---------- */
const marcos = [
  ["Fui de estagiário a diretor antes dos 30", "Comecei como estagiário de logística no Sonae Distribuição, a maior rede de supermercados da região sul. Passei por todas as posições até Diretor de Supply Chain no Walmart Brasil."],
  ["Liderei um time de 930 pessoas", "Conduzi a transformação digital do supply chain de uma empresa inteira, sob o lema \"20 anos em 2\": implantar em 2 anos as melhorias de 20.", 930],
  ["Promovi centenas de pessoas", "Foi depois de liderar e promover centenas de pessoas que eu decidi escrever este guia."],
  ["R$ 6 milhões economizados em 2025", "E R$ 1 milhão por ano economizado na primeira semana de trabalho em uma empresa nova."],
  ["Implantei um sistema de estoque para gerir 3 bilhões de estoque que funciona até hoje."],
];

export function Bio() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  return (
    <section className="section bio" ref={ref}>
      <div className="wrap bio-grid">
        <div className="bio-foto-wrap">
          <motion.figure className="bio-foto" style={{ y }}>
            <img src="/img/carlos-bio.webp" alt="Carlos Martins, diretor de logística" loading="lazy" width="1000" height="1000" />
          </motion.figure>
          <img className="bio-logo" src="/img/logo.svg" alt="" width="160" height="52" />
        </div>
        <div>
          <Label>quem escreveu</Label>
          <Words as="h2" className="h2 bio-tit" text="Prazer, Carlos" highlight={[1]} />
          <div className="marcos">
            {marcos.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.06} className="marco">
                <h3>{t}</h3>
                {d && <p>{d}</p>}
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="bio-fecho">Hoje sou diretor de logística em atividade. E fui, antes de tudo, um cara tímido que descobriu que o resultado só vira promoção quando alguém enxerga.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
const faq = [
  ["Para quem é o Guia?", "Para estudantes e profissionais de logística que querem entrar na área ou subir de cargo: assistentes, analistas, coordenadores, gerentes e quem sonha em chegar a diretor."],
  ["Por quanto tempo terei acesso?", "O PDF é teu. Tu baixa, guarda e lê quantas vezes quiser."],
  ["E se eu não gostar?", "Tu pode pedir o reembolso dentro de 7 dias e eu devolvo o teu dinheiro."],
  ["Preciso ser extrovertido para aplicar?", "Não. O guia nasceu de uma pessoa tímida. Comunicação e visibilidade se aprendem."],
  ["Como terei acesso?", "Logo após a confirmação do pagamento, o acesso chega no teu e-mail."],
];

export function FAQ() {
  const [aberto, setAberto] = useState(0);
  return (
    <section className="section faq">
      <div className="wrap narrow">
        <Words as="h2" className="h2 center" text="Perguntas frequentes" highlight={[1]} />
        <div className="faq-list">
          {faq.map(([q, a], i) => {
            const on = aberto === i;
            return (
              <div className={on ? "faq-item on" : "faq-item"} key={q}>
                <button className="faq-q" onClick={() => setAberto(on ? -1 : i)} aria-expanded={on}>
                  <span>{q}</span>
                  <motion.span className="faq-plus" animate={{ rotate: on ? 45 : 0 }}>
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div className="faq-a" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }}>
                      <p>{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        <div className="center">
          <CTA>Quero garantir meu guia agora</CTA>
        </div>
      </div>
    </section>
  );
}

export function Whats() {
  return (
    <section className="whats">
      <div className="wrap whats-in">
        <h2 className="h3">Dúvidas? Chama minha equipe no WhatsApp</h2>
        <CTA href={WHATSAPP_URL} variant="ghost" target="_blank" rel="noopener noreferrer">
          Ir para o WhatsApp
        </CTA>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-in">
        <img src="/img/logo.svg" alt="Mentor de Logística" width="130" height="43" />
        <p>
          @carlosermartins · <a href="#">Termos de uso</a> · <a href="#">Política de privacidade</a>
        </p>
        <p className="footer-legal">{CNPJ ? `CNPJ ${CNPJ} · ` : ""}Todos os direitos reservados</p>
      </div>
    </footer>
  );
}

/* ---------- Rota de carreira (barra lateral de progresso) ---------- */
const degraus = ["Assistente", "Analista", "Coordenador", "Gerente", "Diretor"];

export function Rota() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });
  const top = useTransform(p, [0, 1], ["0%", "100%"]);
  return (
    <aside className="rota" aria-hidden="true">
      <div className="rota-line">
        <motion.div className="rota-fill" style={{ scaleY: p }} />
        <motion.div className="rota-dot" style={{ top }} />
      </div>
      {degraus.map((d, i) => (
        <span key={d} className="rota-step" style={{ top: `${(i / (degraus.length - 1)) * 100}%` }}>
          {d}
        </span>
      ))}
    </aside>
  );
}

export function BarraMobile() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [500, 700], [120, 0]);
  return (
    <motion.div className="barra-mobile" style={{ y }}>
      <div>
        <s>R$ {PRECO_DE}</s> <strong>R$ {PRECO_POR}</strong>
      </div>
      <CTA>Garantir agora</CTA>
    </motion.div>
  );
}
