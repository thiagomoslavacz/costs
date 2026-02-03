import { v4 as uuidv4 } from "uuid";

import styles from "./Project.module.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Loading from "../layout/Loading";
import Container from "../layout/Container";
import Message from "../layout/Message";
import ProjectForm from "../project/ProjectForm";
import ServiceForm from "../service/ServiceForm";
import ServiceCard from "../service/ServiceCard";

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);
  const [projectForm, setProjectForm] = useState(false);
  const [serviceForm, setServiceForm] = useState(false);
  const [message, setMessage] = useState(null);
  const [type, setType] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProject(data);
          setServices(data.services);
        })
        .catch((error) => console.log(error));
    }, 500);
  }, [id]);

  useEffect(() => {
    if (message) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [message]);

  function editPost(project) {
    if (project.budget < project.cost) {
      setMessage("O orçamento não pode ser menor que o custo do projeto!");
      setType("error");
      return false;
    }

    fetch(`http://localhost:5000/projects/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setProjectForm(false);
        setMessage("Projeto atualizado com sucesso!");
        setType("success");
      })
      .catch((error) => console.log(error));
  }

  function createService(service) {
    const newService = {
      ...service,
      id: uuidv4(),
    };

    const serviceCost = newService.cost;
    const currentCost = project.cost || 0;
    const budget = project.budget;

    const newCost = currentCost + serviceCost;
    if (newCost > budget) {
      setMessage(
        "Orçamento ultrapassado! Verifique o custo adicionado em seu serviço.",
      );
      setType("error");
      return;
    }

    const updatedProject = {
      ...project,
      cost: newCost,
      services: [...project.services, newService],
    };

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProject),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setServices(data.services);
        setServiceForm(false);
        setMessage("Serviço cadastrado com sucesso!");
        setType("success");
      })
      .catch((error) => console.log(error));
  }

  function toggleProjectForm() {
    setProjectForm(!projectForm);
  }

  function toggleServiceForm() {
    setServiceForm(!serviceForm);
  }

  function removeService(id, cost) {
    const servicesUpdate = project.services.filter(
      (service) => service.id !== id,
    );

    const projectUpdated = {
      ...project,
      services: servicesUpdate,
      cost: project.cost - cost,
    };

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectUpdated),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setServices(data.services);
        setMessage("Serviço removido com sucesso!");
        setType("success");
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      {project.name ? (
        <div className={styles.projectDetails}>
          <Container customClass="column">
            {message && (
              <Message
                type={type}
                msg={message}
                clearMessage={() => setMessage("")}
              />
            )}
            <div className={styles.detailsContainer}>
              <h1>
                Projeto: <span>{project.name}</span>
              </h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!projectForm ? "Editar projeto" : "Fechar"}
              </button>
              {!projectForm ? (
                <div className={styles.projectInfo}>
                  <p>
                    <span>Categoria:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Orçamento:</span> R$ {project.budget}
                  </p>
                  {services.length > 0 && (
                    <p>
                      <span>Orçamento Restante:</span> R$
                      {project.budget - project.cost}
                    </p>
                  )}
                  <p>
                    <span>Total Utilizado:</span> R$ {project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.projectForm}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={styles.servicesContainer}>
              <h2>Adicione um serviço:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!serviceForm ? "Adicionar serviço" : "Fechar"}
              </button>
              <div className={styles.projectForm}>
                {serviceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar Serviço"
                  />
                )}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))}
              {!services.length && (
                <p className={styles.textCenter}>
                  Não há serviços cadastrados!
                </p>
              )}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading customClass="marginFix" />
      )}
    </>
  );
}

export default Project;
