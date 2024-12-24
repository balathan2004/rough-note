import React, { FC, useState } from "react";
import SendData from "@/components/utils/SendData";
import styles from "@/styles/login.module.css";
import { TextField, Button } from "@mui/material";

const ResetPassword: FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) {
      setError("Enter Valid Email");
      return;
    }

    const response = await SendData({
      route: `/api/auth/reset_password?email=${email}`,
      data: { email: email },
    });
    if (response) {
      setError(response.message);
    }
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
            >
              Send Password Reset Mail
            </Button>
          </form>
        </article>
      </div>
    </div>
  );
};

export default ResetPassword;
