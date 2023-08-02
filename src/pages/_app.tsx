"use client";

// import { CacheProvider } from "@chakra-ui/next-js";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { api } from "~/utils/api";

import { Header } from "~/component/Header";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <Header />
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  );
};

export default api.withTRPC(MyApp);
