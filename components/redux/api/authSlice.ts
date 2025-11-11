import { createSlice } from "@reduxjs/toolkit";
import authApi from "./authApi";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { userInterface } from "@/components/utils/interfaces";
export type NavBarType = { path: string; name: string }[];



export const NavGuests = [
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

const initialState = {
  userData: {} as userInterface,
  navState: NavGuests,
};

const authSlice = createSlice({
  initialState: initialState,
  name: "authSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.userData = payload.credentials || ({} as userInterface);
        state.navState = NavUsers;
      }
    ),
      builder.addMatcher(
        authApi.endpoints.getLoginCred.matchFulfilled,
        (state, { payload }) => {
          state.userData = payload.credentials || ({} as userInterface);
          state.navState = NavUsers;
        }
      );
  },
});

export const useAuth = () => {
  return useSelector((state: RootState) => state.auth);
};

export default authSlice.reducer;
