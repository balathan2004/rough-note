import { FC, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
const NavBar: FC = () => {
  const [inputValue, setInputValue] = useState(false);
  const [dirs, setDirs] = useState([
    {
      text: "home",
      route: "/home",
    },
    {
      text: "login",
      route: "/auth/login",
    },
    {
      text: "singup",
      route: "/auth/signup",
    },
  ]);
  const currentRoute = useRouter().asPath;

  const changeInput = () => {
    setInputValue(false);
  };

  const setInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.checked);
  };




  return (
    <div>
      <nav className={"nav"}>
        <input
          className={"input"}
          type="checkbox"
          id="check"
          onChange={setInput}
          checked={inputValue}
        ></input>
        <label htmlFor="check" className={"checkbtn"}>
          <FontAwesomeIcon icon={faBars} />
        </label>
        <Link href="/" className={"brand"}>
          Rough Note
        </Link>
        <ul className={"uls"}>
          {dirs.map((x) => {
            if (x.route != currentRoute) {
              return (
                <li key={x.route} id={x.route}>
                  <Link href={x.route} onClick={changeInput}>
                    {x.text}
                  </Link>
                </li>
              );
            } else {
              return (
                <li key={x.route} id={x.route}>
                  <Link href={x.route} className={"active"}>
                    {x.text}
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
