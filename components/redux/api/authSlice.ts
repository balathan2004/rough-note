import { createSlice } from "@reduxjs/toolkit";
import authApi from "./authApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { User } from "@/server/utils/interfaces";

export type NavBarType = { path: string; name: string }[];

export const NavGuests = [
  { name: "About", path: "/about" },
  { name: "Login", path: "/auth/login" },
  { name: "Signup", path: "/auth/register" },
];
export const NavUsers = [
  { name: "Home", path: "/home" },
  { name: "Get Note", path: "/get_document" },
  { name: "About", path: "/about" },
  { name: "Account", path: "/account" },
];

const initialState = {
  userData: {
    display_name: "",
    email: "",
    profile_url: "",
    uid: "",
    createdAt: 0,
    accessToken: "",
    refreshToken: "",
  } as User,
  navState: NavGuests,
};

const authSlice = createSlice({
  initialState: initialState,
  name: "authSlice",
  reducers: {
    setAccessToken: (state, action) => {
      state.userData.accessToken = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.userData.refreshToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    (builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.userData = payload.data;
        state.navState = NavUsers;
        localStorage.setItem("accessToken", payload.data?.accessToken || "");
        localStorage.setItem("refreshToken", payload.data?.refreshToken || "");
      },
    ),
      builder.addMatcher(
        authApi.endpoints.getLoginCred.matchFulfilled,
        (state, { payload }) => {
          state.userData = payload.data;
          state.navState = NavUsers;
        },
      ));
  },
});

export const { setAccessToken,setRefreshToken } = authSlice.actions;

export const useAuth = () => {
  const dispatch = useDispatch();

  const changeAccessToken = (token: string) => {
    dispatch(setAccessToken(token));
  };

  const changeRefreshToken = (token: string) => {
    dispatch(setRefreshToken(token));
  }

  const data = useSelector((state: RootState) => state.auth);

  return { ...data, changeAccessToken, changeRefreshToken };
};

export default authSlice.reducer;
