import { ReactNode } from "react";
import styles from "./styles/ErrorMessage.module.scss";

type ErrorProps = {
  children?: ReactNode;
  errors: string[] | undefined;
};

function ErrorMessage(props: ErrorProps) {
  if (!props.errors) {
    return null;
  }

  function renderMessages(errors: string[]) {
    return errors.map((error) => <li>{error}</li>);
  }

  return (
    <ul className={styles.error_container}>
      {Array.isArray(props.errors) ? (
        renderMessages(props.errors)
      ) : (
        <li>{props.errors}</li>
      )}
    </ul>
  );
}

export default ErrorMessage;
