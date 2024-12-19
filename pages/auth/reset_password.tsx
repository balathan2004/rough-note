import React, { FC, useState } from "react";
import SendData from "@/components/SendData";
import styles from "@/styles/login.module.css";
import { TextField } from "@mui/material";

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
          <span>{error}</span>
          <form onSubmit={handleForm}>
            <div>
              <label>Enter Email</label>
              <TextField
                multiline={false}
                fullWidth
                name="email"
                required
                onChange={(event) => setEmail(event.target.value)}
                type="email"
              ></TextField>
            </div>

            <button>Send Mail</button>
          </form>
        </article>
      </div>
    </div>
  );
};

export default ResetPassword;
