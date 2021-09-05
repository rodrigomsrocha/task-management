import LogInForm from "../../components/LogInForm/LogInForm";

import styles from "./styles/LogIn.module.scss";

function SignIn() {
  return (
    <div className={styles.log_in_container}>
      <header>
        <h1>Log In</h1>
        <p>Login to your account.</p>
      </header>
      <LogInForm />
    </div>
  );
}

export default SignIn;
