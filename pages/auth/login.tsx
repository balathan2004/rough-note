import React, { FC, useState } from "react";
import SendData from "@/components/utils/SendData";
import styles from "@/styles/login.module.css";
import { useRouter } from "next/router";
import { TextField } from "@mui/material";
import Link from "next/link";

const Login: FC = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [error, setError] = useState("");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await SendData({
      route: "/api/auth/login",
      data: userData,
    });
    setError(response.message);

    if (response.status == 200) {
      router.push("/home");
    }
  };

  return (
    <div className="container">
      <div className={styles.login_container}>
        <article>
          <h1>Login</h1>
          <span>{error}</span>
          <form onSubmit={handleForm}>
            <div>
              <label>Enter Email</label>
              <TextField
                fullWidth
                multiline={false}
                name="email"
                required
                onChange={handleInput}
                type="email"
              ></TextField>
            </div>
            <div>
              <label>Enter Password</label>
              <TextField
                fullWidth
                multiline={false}
                name="password"
                required
                onChange={handleInput}
                type="text"
              ></TextField>
            </div>
            <Link href="/auth/reset_password">forget password ??</Link>
            <button>Login</button>
          </form>
        </article>
      </div>
    </div>
  );
};

export default Login;
