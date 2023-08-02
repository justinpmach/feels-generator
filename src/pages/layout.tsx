// app/layout.tsx
// import { Header } from "~/component/Header";
import Head from "next/head";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>Feels Generator</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        {/* <Header /> */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}