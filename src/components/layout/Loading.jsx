import loader from "../../images/loader.png";
import styles from "./Loading.module.css";

function Loading({ customClass }) {
  return (
    <div
      className={`${styles.loaderContainer} ${customClass ? styles.marginFix : ""}`}
    >
      <img className={styles.loader} src={loader} alt="Loading" />
    </div>
  );
}

export default Loading;
