import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import UserContextHolder from "@/components/context/user_wrapper";
import ContextWrapper from "@/components/context/context_wrapper";
import NavbarHolder from "@/components/context/navbar_wrapper";
import ReplyHolder from "@/components/context/reply_context";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserContextHolder>
        <NavbarHolder>
          <ReplyHolder>
            <ContextWrapper>
              <Component {...pageProps} />
            </ContextWrapper>
          </ReplyHolder>
        </NavbarHolder>
      </UserContextHolder>
    </>
  );
}
