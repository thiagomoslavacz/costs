import { useState } from "react";

import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";

import styles from "../project/ProjectForm.module.css";

function ServiceForm({ handleSubmit, btnText }) {
  const [service, setService] = useState({});

  function submit(e) {
    e.preventDefault();

    if (!service.name || !service.cost || !service.description) {
      alert("Preencha todos os campos");
      return;
    }

    handleSubmit({
      ...service,
      cost: Number(service.cost),
    });
  }

  function handleChange(e) {
    setService({ ...service, [e.target.name]: e.target.value });
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Insira o título:"
        name="name"
        placeholder="Insira o título do serviço"
        handleOnChange={handleChange}
      />
      <Input
        type="number"
        text="Defina o custo:"
        name="cost"
        placeholder="Insira o valor do serviço"
        handleOnChange={handleChange}
      />
      <Input
        type="text"
        text="Atribua uma descrição:"
        name="description"
        placeholder="Insira a descrição do serviço"
        handleOnChange={handleChange}
      />
      <SubmitButton text={btnText} />
    </form>
  );
}

export default ServiceForm;
