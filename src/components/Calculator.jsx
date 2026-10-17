import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion, useInView } from "motion/react";
import { useRef } from "react";
import { CARGOS, PRECO_POR } from "../config.js";
import { CTA, Label, Words, brl, ease } from "./ui.jsx";

function Numero({ value, delay = 0, big = false, run }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    const c = animate(0, value, { duration: big ? 1.8 : 0.9, delay, ease: [0.16, 1, 0.3, 1], onUpdate: setV });
    return () => c.stop();
  }, [value, delay, big, run]);
  return <span className={big ? "calc-big" : "calc-num"}>{brl(v)}</span>;
}

const toNumber = (s) => Number(String(s).replace(/\D/g, "")) || 0;
const mascara = (s) => {
  const n = toNumber(s);
  return n ? n.toLocaleString("pt-BR") : "";
};

export default function Calculator() {
  const [modo, setModo] = useState("coordenador");
  const [hojeTxt, setHojeTxt] = useState("");
  const [cimaTxt, setCimaTxt] = useState("");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  const manual = modo === "manual";
  const cargo = CARGOS[modo];
  const hoje = manual ? toNumber(hojeTxt) : cargo.hoje;
  const cima = manual ? toNumber(cimaTxt) : cargo.cima;
  const preenchido = !manual || (hoje > 0 && cima > 0);
  const diff = (cima - hoje) * 12;
  const valido = preenchido && diff > 0;
  // A chave reinicia as animações a cada troca de cenário.
  const chave = `${modo}-${hoje}-${cima}`;

  return (
    <section className="section calc-section" id="conta">
      <div className="wrap">
        <div className="calc-head">
          <Label>a conta que ninguém faz</Label>
          <Words as="h2" className="h2" text="Faz uma conta comigo." highlight={[2]} />
          <p className="lead">Quanto custa ficar mais um ano na mesma cadeira?</p>
        </div>

        <motion.div ref={ref} className="calc" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.9, ease }}>
          <div className="calc-tabs" role="tablist" aria-label="Escolha o teu cargo">
            {[
              ["coordenador", CARGOS.coordenador.rotulo],
              ["gerente", CARGOS.gerente.rotulo],
              ["manual", "Digitar meus valores"],
            ].map(([k, rot]) => (
              <button key={k} role="tab" aria-selected={modo === k} className={modo === k ? "calc-tab on" : "calc-tab"} onClick={() => setModo(k)}>
                {modo === k && <motion.span layoutId="tab-bg" className="calc-tab-bg" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                <span>{rot}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {manual && (
              <motion.div className="calc-inputs" key="inputs" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease }}>
                <label>
                  <span>Salário de hoje (por mês)</span>
                  <div className="calc-field">
                    <em>R$</em>
                    <input inputMode="numeric" placeholder="14.200" value={hojeTxt} onChange={(e) => setHojeTxt(mascara(e.target.value))} />
                  </div>
                </label>
                <label>
                  <span>Salário do cargo de cima (por mês)</span>
                  <div className="calc-field">
                    <em>R$</em>
                    <input inputMode="numeric" placeholder="25.600" value={cimaTxt} onChange={(e) => setCimaTxt(mascara(e.target.value))} />
                  </div>
                </label>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="calc-row" key={chave}>
            {preenchido && !valido ? (
              <p className="calc-aviso">Confere os valores. O salário do cargo de cima precisa ser maior que o de hoje.</p>
            ) : !preenchido ? (
              <p className="calc-aviso">Digita os dois salários para ver a conta.</p>
            ) : (
              <>
                <motion.div className="calc-cell" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease }}>
                  <span className="calc-cap">Salário de hoje</span>
                  <Numero value={hoje} run={inView} />
                  <span className="calc-sub">{manual ? "por mês" : `por mês · ${cargo.cargoHoje}`}</span>
                </motion.div>
                <motion.span className="calc-op" initial={{ opacity: 0, scale: 0.4 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.35 }}>
                  →
                </motion.span>
                <motion.div className="calc-cell" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.4 }}>
                  <span className="calc-cap">Salário do cargo de cima</span>
                  <Numero value={cima} delay={0.4} run={inView} />
                  <span className="calc-sub">{manual ? "por mês" : `por mês · ${cargo.cargoCima}`}</span>
                </motion.div>
                <motion.span className="calc-op" initial={{ opacity: 0, scale: 0.4 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.75 }}>
                  =
                </motion.span>
                <motion.div className="calc-cell calc-result" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.8 }}>
                  <span className="calc-cap">Diferença × 12</span>
                  <Numero value={diff} delay={0.9} big run={inView} />
                  <span className="calc-sub">por ano</span>
                </motion.div>
              </>
            )}
          </div>

          <AnimatePresence>
            {valido && inView && (
              <motion.div className="calc-after" key={"after-" + chave} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2, duration: 0.7, ease }}>
                <p className="calc-frase">Esse é o preço de mais um ano na mesma cadeira.</p>
                <p className="calc-contra">
                  O guia custa <strong>R$ {PRECO_POR}</strong>.
                </p>
                <p className="calc-pergunta">Agora a pergunta que importa: o que tu fez nos últimos doze meses pra esse ano não se repetir?</p>
                <CTA>Quero garantir meu guia agora</CTA>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="calc-fonte">Fonte: Guia Salarial 2026, Robert Half. Salário-base mensal, mediana, empresas de pequeno e médio porte. Os valores que tu digita não são guardados nem enviados.</p>
        </motion.div>
      </div>
    </section>
  );
}
