import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import UserContextHolder from "@/components/context/user_wrapper";
import ContextWrapper from "@/components/context/context_wrapper";
import NavbarHolder from "@/components/context/navbar_wrapper";
import ReplyHolder from "@/components/context/reply_context";
import LoadingHolder from "@/components/context/loadingWrapper";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserContextHolder>
        <NavbarHolder>
          <ReplyHolder>
            <LoadingHolder>
              <ContextWrapper>
                <Component {...pageProps} />
              </ContextWrapper>
            </LoadingHolder>
          </ReplyHolder>
        </NavbarHolder>
      </UserContextHolder>
    </>
  );
}
