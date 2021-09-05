import { FormEvent, MouseEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { api } from "../../services/api";

import ErrorMessage from "../Error/ErrorMessage";

import styles from "./styles/LogInForm.module.scss";
import "font-awesome/css/font-awesome.min.css";
import toast from "react-hot-toast";

function LogInForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string[] | null>();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  let history = useHistory();

  async function handleSignUp(e: FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await api.post("/auth/signin", { username, password });
      localStorage.setItem("token", data.accessToken);
      history.push("/todo");
      toast.success("Logged in successfully", {
        style: {
          fontFamily: "Roboto, sans-serif",
        },
        iconTheme: {
          primary: "#4c00c9",
          secondary: "#f0f0f0",
        },
      });
      setError(null);
    } catch (err: any) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  function handlePasswordVisibility(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <form className={styles.form_container} onSubmit={handleSignUp}>
      {error && <ErrorMessage errors={error} />}
      <label htmlFor="username">Username</label>
      <input
        value={username}
        type="text"
        name="username"
        id="username"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />
      <label htmlFor="password">Password</label>
      <div className={styles.password}>
        <input
          value={password}
          type={isPasswordVisible ? "text" : "password"}
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button
          onClick={handlePasswordVisibility}
          className={styles.view_password}
        >
          {isPasswordVisible ? (
            <i className="fa fa-eye"></i>
          ) : (
            <i className="fa fa-eye-slash"></i>
          )}
        </button>
      </div>
      <button disabled={loading}>{loading ? "Loading..." : "Login"}</button>
      <p>
        Dont have an account? <Link to="/">Sign Up</Link>
      </p>
    </form>
  );
}

export default LogInForm;
