import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, FormField, Message } from "semantic-ui-react";
import { useAuth } from "../../../contexts/auth";
import LoginGithub from "./LoginGithub";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const router = useRouter();

  const [loginError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const { handleSubmit } = useForm();
  const { login } = useAuth();

  async function onSubmit() {
    try {
      await login(username, password);
      router.push(router.query["forward"] || "/");
    } catch (e) {
      setError(true)
      console.log("in catch");
      console.error(e);
      router.push("/sign-in");
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginRight}>
        <h2 style={{ textAlign: "center" }}>SIGN IN</h2>
        <Form error={error} onSubmit={handleSubmit(onSubmit)}>
          <FormField>
            <label>Email or Username</label>
            <input
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormField>
          <FormField>
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormField>
          {error && <Message negative error content="Invalid username or password" />}
          <div className={styles.loginButton}>
            <Button
              type="submit"
              color={"linkedin"}
              style={{ backgroundColor: "#50009d"}}
            >
              LOGIN
            </Button>
            <LoginGithub />
          </div>
        </Form>
        <div className={styles.notRegis}>
          <p className={styles.notRegisP}>Not registered yet?</p>
          <Link href="/sign-up">
            <a>Sign Up</a>
          </Link>
        </div>
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      </div>
      <div className={styles.loginLeft}>
        <img src="/static/worker.png" alt="worker" />
      </div>
    </div>
  );
}

export default LoginPage;
