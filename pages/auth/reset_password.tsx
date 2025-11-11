import React, { FC, useState } from "react";
import styles from "@/styles/login.module.css";
import { TextField, Button } from "@mui/material";
import { useLoadingContext } from "@/components/context/loadingWrapper";
import Link from "next/link";
import { useResetPasswordEmailMutation } from "@/components/redux/api/authApi";

const ResetPassword: FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { loading, setLoading } = useLoadingContext();
  const [ResetPassword] = useResetPasswordEmailMutation()

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) {
      setError("Enter Valid Email");
      return;
    }

    setLoading(true);
    ResetPassword(
      { email: email },
    ).unwrap().then(res => console.log({ res })).catch(err => {
      console.log({ err })
    })

  };

  return (
    <div className="container">
      <div className={styles.login_container}>
        <article>
          <h1>Reset Password</h1>
          <p>{error}</p>
          <form onSubmit={handleForm}>
            <div>
              <label>Enter Email</label>
              <TextField
                fullWidth
                name="email"
                required
                placeholder="Your Email"
                id="outlined-basic"
                onChange={(event) => setEmail(event.target.value)}
                type="email"
              ></TextField>
            </div>
            <Button
              className={styles.forget_btn}
              fullWidth
              type="submit"
              variant="outlined"
              disabled={loading}
            >
              {loading ? "Sending mail" : "Send Password Reset Mail"}
            </Button>
            <Link href="/auth/login">Login here</Link>
          </form>
        </article>
      </div>
    </div>
  );
};

export default ResetPassword;
