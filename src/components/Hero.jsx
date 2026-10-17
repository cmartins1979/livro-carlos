import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import BookMockup from "./BookMockup.jsx";
import { CTA, ease } from "./ui.jsx";

// Ruas em planta, desenhadas na entrada (mesmo traço da capa).
const ruas = [
  "M-40 120 L380 -20",
  "M-40 260 L560 40",
  "M60 420 L700 160",
  "M120 -20 L360 520",
  "M300 -20 L520 470",
  "M480 -20 L700 420",
  "M640 210 C760 160 860 170 980 120",
  "M700 420 C820 360 900 360 1060 330",
];
const quadras = [
  "M150 90 h70 v50 h-70z",
  "M250 150 h80 v60 h-80z",
  "M380 120 h60 v70 h-60z",
  "M200 250 h70 v60 h-70z",
  "M330 280 h90 v55 h-90z",
  "M470 230 h70 v60 h-70z",
];

function Planta() {
  return (
    <svg className="planta" viewBox="0 0 1000 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.4">
        {ruas.map((d, i) => (
          <motion.path key={d} d={d} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.2, delay: 0.2 + i * 0.12, ease }} />
        ))}
        {quadras.map((d, i) => (
          <motion.path key={d} d={d} initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.7 }} transition={{ duration: 1.4, delay: 1 + i * 0.1, ease }} />
        ))}
        <motion.circle cx="860" cy="150" r="46" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8, delay: 0.8 }} />
        <motion.circle cx="860" cy="150" r="30" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8, delay: 1 }} />
        <motion.path
          d="M560 470 C640 420 700 340 760 330 C820 320 840 400 900 410"
          strokeDasharray="10 12"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.6, delay: 1.2, ease }}
        />
      </g>
    </svg>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const fotoY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const bookY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const plantaY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <header className="hero" ref={ref}>
      <motion.div className="hero-bg" style={{ y: plantaY }}>
        <Planta />
      </motion.div>

      <div className="wrap hero-grid">
        <div className="hero-copy">
          <motion.span className="pill" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.2 }}>
            <span className="pill-dot" /> Escrito por quem chegou a Diretor em uma Multinacional em apenas 10 anos de carreira
          </motion.span>

          <h1 className="hero-title">
            {"Saiba exatamente como acelerar a sua carreira logística com um passo a passo completo".split(" ").map((w, i) => (
              <span className="word-mask" key={i}>
                <motion.span
                  className={["acelerar", "passo", "completo"].includes(w) ? "word hl" : "word"}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.85, ease, delay: 0.35 + i * 0.05 }}
                >
                  {w}
                </motion.span>{" "}
              </span>
            ))}
          </h1>

          <motion.p className="hero-sub" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 1.05 }}>
            Tudo o que eu usei e continuo usando para ir de estagiário a diretor, em grandes operações de varejo e e-commerce.
          </motion.p>

          <motion.div className="hero-actions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 1.2 }}>
            <CTA>Quero acelerar minha carreira</CTA>
          </motion.div>
        </div>

        <div className="hero-visual">
          <motion.figure className="hero-foto" style={{ y: fotoY }} initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4, ease, delay: 0.3 }}>
            <img src="/img/carlos-armazem.webp" alt="Carlos Martins em um centro de distribuição" width="1100" height="1375" />
            <figcaption>
              <span>Carlos Martins</span> Diretor de logística em atividade
            </figcaption>
          </motion.figure>
          <motion.div className="hero-book" style={{ y: bookY }} initial={{ opacity: 0, x: 60, rotate: 6 }} animate={{ opacity: 1, x: 0, rotate: 0 }} transition={{ duration: 1.2, ease, delay: 0.7 }}>
            <BookMockup size={240} />
          </motion.div>
        </div>
      </div>

      <motion.a href="#dor" className="scroll-cue" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} aria-label="Rolar para baixo">
        <span />
      </motion.a>
    </header>
  );
}
