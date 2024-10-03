import React, { FC, useState } from "react";
import SendData from "@/components/SendData";
import styles from "@/styles/login.module.css";
import { useRouter } from "next/router";

const SignUp: FC = () => {
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
    const response = await SendData({ route: "/api/signup", data: userData });
    setError(response.message);

    if (response.status == 200) {
      router.push("/home");
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
              <input
                minLength={6}
                required
                onChange={handleInput}
                name="email"
                type="email"
              />
            </div>
            <div>
              <label>Enter Password</label>
              <input
                minLength={6}
                required
                onChange={handleInput}
                name="password"
                type="text"
              />
            </div>
            <button>SignUp</button>
          </form>
        </article>
      </div>
    </div>
  );
};

export default SignUp;
