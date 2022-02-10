import React, { useState } from "react";

import styles from "./login.module.scss";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";

export default function LoginPage() {
  const [page, setPage] = useState("login");

  return (
    <div className={styles.container}>
      <Link href="/"><a className={styles.logo}>Shopping</a></Link>
      <div className={styles.content}>
        <div className={styles.switchContainer}>
          <button
            className={styles.switchButton}
            onClick={() => setPage("login")}
            style={{ backgroundColor: page === "login" ? "white" : "#f6f6f6" }}
          >
            <span>Login</span>
          </button>
          <button
            className={styles.switchButton}
            onClick={() => setPage("register")}
            style={{
              backgroundColor: page === "register" ? "white" : "#f6f6f6",
            }}
          >
            <span>Register</span>
          </button>
        </div>
        {page === "login" ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}
