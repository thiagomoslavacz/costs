import { useNavigate } from "react-router-dom";

import ProjectForm from "../project/ProjectForm";
import styles from "./NewProject.module.css";

function NewProject() {
  const navigate = useNavigate();

  function createPost(project) {
    project.cost = 0;
    project.services = [];

    fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        navigate("/projects", {
          state: { message: "Projeto criado com sucesso!" },
        });
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className={styles.newprojectContainer}>
      <h1>Criar Projeto</h1>
      <p>
        Crie projetos de controle de gastos de forma simples e eficiente, com a
        possibilidade de adicionar serviços, acompanhar custos e manter tudo
        organizado em um só lugar.
      </p>
      <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
    </div>
  );
}

export default NewProject;
