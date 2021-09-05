import SignUpForm from "../../components/SignUpForm/SignUpForm";
import styles from "./styles/SignUp.module.scss";

function SignUp() {
  return (
    <div className={styles.sign_up_container}>
      <header>
        <h1>Sign Up</h1>
        <p>Create your account and start organizing your life.</p>
      </header>
      <SignUpForm />
    </div>
  );
}

export default SignUp;
