import Hero from "./components/Hero.jsx";
import Calculator from "./components/Calculator.jsx";
import {
  BarraMobile,
  Beneficios,
  Bio,
  Comparacao,
  Conteudo,
  Dor,
  FAQ,
  Footer,
  Futuro,
  Garantia,
  Logos,
  Nav,
  Objecao,
  Oferta,
  ParaQuem,
  Pilares,
  Resultados,
  Rota,
  TopBar,
  Valor,
  Whats,
} from "./components/Sections.jsx";

export default function App() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <TopBar />
      <Nav />
      <Rota />
      <main>
        <Hero />
        <Logos />
        <Beneficios />
        <Dor />
        <Objecao />
        <Calculator />
        <Futuro />
        <Pilares />
        <Comparacao />
        <Conteudo />
        <ParaQuem />
        <Resultados />
        <Valor />
        <Oferta />
        <Garantia />
        <Bio />
        <FAQ />
        <Whats />
      </main>
      <Footer />
      <BarraMobile />
    </>
  );
}
