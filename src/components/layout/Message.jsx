import { useState, useEffect } from "react";
import styles from "./Message.module.css";

function Message({ type, msg, clearMessage }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!msg) {
      setVisible(false);
      return;
    }

    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      clearMessage();
    }, 3000);

    return () => clearTimeout(timer);
  }, [msg, clearMessage]);

  return (
    <>
      {visible && (
        <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
      )}
    </>
  );
}

export default Message;
