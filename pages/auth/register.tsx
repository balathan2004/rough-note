import React, { FC, useState } from "react";
import SendData from "@/components/utils/SendData";
import styles from "@/styles/login.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, TextField } from "@mui/material";
import { useReplyContext } from "@/components/context/reply_context";
import { useLoadingContext } from "@/components/context/loadingWrapper";
const SignUp: FC = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const { setReply } = useReplyContext();
  const {setLoading}=useLoadingContext()

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(!userData.email&&!userData.password){
      console.log("Enter Details");
      return;
    }
    setLoading(true)
    const response = await SendData({ route: "/api/auth/register", data: userData });
    setLoading(false)
    setError(response.message);
    setReply(response.message);
    if (response.status == 200) {
      router.push("/auth/login");
    }
  };

  return (
    <div className="container">
      <div className={styles.login_container}>
        <article>
          <h1>SignUp</h1>
          <span>{error}</span>
          <form onSubmit={handleForm}>
            <div>
              <label>Enter Email</label>
              <TextField
                fullWidth
                placeholder="Your Email"
                name="email"
                required
                onChange={handleInput}
                multiline={false}
                type="email"
              ></TextField>
            </div>
            <div>
              <label>Enter Password</label>
              <TextField
                fullWidth
                name="password"
                required
                placeholder="Your Password"
                multiline={false}
                onChange={handleInput}
                type="text" 
              ></TextField>
            </div>
            <Link href="/auth/login">already have an account </Link>
            <Button fullWidth type="submit" variant="outlined">
              Sign up
            </Button>
          </form>
        </article>
      </div>
    </div>
  );
};

export default SignUp;
