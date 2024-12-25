import React, { FC, useState } from "react";
import AuthSendData from "@/components/utils/auth_send_data";
import styles from "@/styles/login.module.css";
import { useRouter } from "next/router";
import { Button, TextField } from "@mui/material";
import { useReplyContext } from "@/components/context/reply_context";
import Link from "next/link";
import { useLoadingContext } from "@/components/context/loadingWrapper";
import { useUserContext } from "@/components/context/user_wrapper";
import {
  useNavbarContext,
  NavUsers,
} from "@/components/context/navbar_wrapper";
const Login: FC = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const { setReply } = useReplyContext();
  const { setLoading } = useLoadingContext();
  const { setUserCred } = useUserContext();
  const { setDirs } = useNavbarContext();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userData.email && !userData.password) {
      console.log("Enter Details");
      return;
    }
    setLoading(true);
    const response = await AuthSendData({
      route: "/api/auth/login",
      data: userData,
    });
    setLoading(false);
    setError(response.message);
    setReply(response.message);

    if (response.status == 200) {
      setDirs(NavUsers);
      setUserCred(response.credentials);
      router.push("/account");
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
                placeholder="Your Email"
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
                placeholder="Your Password"
                required
                onChange={handleInput}
                type="text"
              ></TextField>
            </div>
            <Link href="/auth/reset_password">forget password ??</Link>
            <Link href="/auth/register">create account -&gt; </Link>
            <Button fullWidth type="submit" variant="outlined">
              Login
            </Button>
          </form>
        </article>
      </div>
    </div>
  );
};

export default Login;
