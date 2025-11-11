import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import ContextWrapper from "@/components/context/context_wrapper";
import ReplyHolder from "@/components/context/reply_context";
import LoadingHolder from "@/components/context/loadingWrapper";
import { Provider } from "react-redux";
import { store } from "@/components/redux/store";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <ReplyHolder>
          <LoadingHolder>
            <ContextWrapper>
              <Component {...pageProps} />
            </ContextWrapper>
          </LoadingHolder>
        </ReplyHolder>
      </Provider>
    </>
  );
}
