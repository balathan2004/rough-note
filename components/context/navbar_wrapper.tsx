import React, { useContext, useState, FC, ReactNode } from "react";

export const NavInit = [
  { name: "Home", path: "/home" },
  { name: "About", path: "/about" },
  { name: "Login", path: "/auth/login" },
  { name: "Signup", path: "/auth/register" },
];
export const NavUsers = [
  { name: "Home", path: "/home" },
  { name: "Get Note", path: "/get_doc" },
  { name: "About", path: "/about" },
  { name: "Account", path: "/account" },
];
interface NavItem {
  name: string;
  path: string;
}

export interface NavbarContextType {
  dirs: NavItem[];
  setDirs: React.Dispatch<React.SetStateAction<NavItem[]>>;
}
export const NavbarContext = React.createContext<NavbarContextType>({
  dirs: NavInit,
  setDirs: () => {},
});
interface Props {
  children: ReactNode;
}

const NavbarHolder: FC<Props> = ({ children }) => {
  const [dirs, setDirs] = useState<NavItem[]>(NavInit);

  return (
    <NavbarContext.Provider value={{ dirs, setDirs }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbarContext = () => useContext(NavbarContext);

export default NavbarHolder;