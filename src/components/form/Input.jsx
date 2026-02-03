import styles from "./Input.module.css";

function Input({ type, text, name, placeholder, handleOnChange, value }) {
  return (
    <div className={styles.formControl}>
      <label htmlFor={name}>{text}</label>

      {type === "number" ? (
        <div className={styles.inputNumberContainer}>
          <span className={styles.prefix}>R$</span>
          <input
            type={type}
            name={name}
            id="name"
            placeholder={placeholder}
            onChange={handleOnChange}
            value={value}
          />
        </div>
      ) : (
        <input
          type={type}
          name={name}
          id="name"
          placeholder={placeholder}
          onChange={handleOnChange}
          value={value}
        />
      )}
    </div>
  );
}

export default Input;
