import "./main.scss";
import Navbar from "../../components/navbar/Navbar";
import Hero from "../../components/hero/hero";
import Parallax from "../../components/parallax/Parallax";
import Services from "../../components/services/Sevices";
import Portfolio from "../../components/portfolio/Portfolio";

const Main = () => {
  return (
    <div>
      <section id="Welcome">
        <Navbar />
        <Hero />
      </section>
      <section id="Think">
        <Parallax type="Think" />{" "}
      </section>
      <section id="Ideas">
        <Services />
      </section>
      <section id="Insights">
        <Parallax type="Insights" />{" "}
      </section>
      <Portfolio />
    </div>
  );
};

export default Main;
