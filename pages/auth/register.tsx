import React, { FC, useState } from "react";
import styles from "@/styles/login.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, TextField } from "@mui/material";
import { useReplyContext } from "@/components/context/reply_context";
import { useLoadingContext } from "@/components/context/loadingWrapper";
import { useRegisterMutation } from "@/components/redux/api/authApi";
const SignUp: FC = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const { setReply } = useReplyContext();
  const { loading, setLoading } = useLoadingContext();
  const [register] = useRegisterMutation()

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
    const response = register({

      ...userData,
    }).unwrap().then(res => {
      router.push("/auth/login");
    }).catch(err => console.log({ err }))
    setLoading(false);

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
            <Button
              disabled={loading}
              fullWidth
              type="submit"
              variant="outlined"
            >
              {loading ? "Registering" : "Register"}
            </Button>
          </form>
        </article>
      </div>
    </div>
  );
};

export default SignUp;
