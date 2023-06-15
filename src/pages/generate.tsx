/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "~/component/Button";
import { FormGroup } from "~/component/FormGroup";
import { Input } from "~/component/Input";
import { useBuyCredits } from "~/hooks/useBuyCredits";
import { api } from "~/utils/api";

const GeneratePage: NextPage = () => {
  const { buyCredits } = useBuyCredits();

  const [form, setForm] = useState({
    prompt: "",
  });
  const [imageUrl, setImageUrl] = useState("");

  const generateImage = api.generate.generateImage.useMutation({
    onSuccess(data) {
      if (!data.imageUrl) return;
      setImageUrl(data.imageUrl);
    },
  });
  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    // submit form data to backend
    generateImage.mutate({
      prompt: form.prompt,
    });

    setForm({ prompt: "" });
    //
  }

  function updateForm(key: string) {
    return function (e: React.ChangeEvent<HTMLInputElement>) {
      setForm((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };
  }

  const session = useSession();

  const isLoggedIn = !!session.data;

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        {!isLoggedIn && (
          <Button
            onClick={() => {
              signIn().catch(console.error);
            }}
          >
            Login
          </Button>
        )}
        {isLoggedIn && (
          <>
            <Button
              onClick={() => {
                buyCredits().catch(console.error);
              }}
            >
              Buy Credits
            </Button>
            <Button
              onClick={() => {
                signOut().catch(console.error);
              }}
            >
              Logout
            </Button>
          </>
        )}
        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
          <FormGroup>
            <label>Prompt</label>
            <Input value={form.prompt} onChange={updateForm("prompt")} />
          </FormGroup>
          <button className="rounded-md bg-blue-400 px-4 py-2">Submit</button>
        </form>

        <Image
          src={imageUrl}
          alt="an image of generated prompt"
          width="100"
          height="100"
        />
      </main>
    </>
  );
};

export default GeneratePage;
