import styles from "./Home.module.css";
import hero from "../../images/hero.png";
import LinkButton from "../layout/LinkButton";

function Home() {
  return (
    <section className={styles.home}>
      <h1>
        Bem-vindo ao <span>Costs</span>
      </h1>
      <p>Comece a gerenciar seus projetos:</p>
      <LinkButton to="/newproject" text="Criar Projeto" />
      <img src={hero} alt="Hero Illustration" />
    </section>
  );
}

export default Home;
