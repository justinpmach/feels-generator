/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "~/component/Button";
import { FormGroup } from "~/component/FormGroup";
import { Input } from "~/component/Input";
import { api } from "~/utils/api";

const colors = [
  "blue",
  "red",
  "pink",
  "green",
  "orange",
  "yellow",
  "white",
  "black",
];

const shapes = ["square", "circle", "triangle", "diamond"];

const styles = [
  "claymorphic",
  "3d rendered",
  "pixelated",
  "illustrated color pencil",
];

const GeneratePage: NextPage = () => {
  const [form, setForm] = useState({
    prompt: "",
    color: "",
    shape: "",
    style: "",
    quantity: "1",
  });
  const [error, setError] = useState("");
  const [imagesUrl, setImagesUrl] = useState<{ imageUrl: string }[]>([]);

  const generateImage = api.generate.generateImage.useMutation({
    onSuccess(data) {
      setImagesUrl(data);
    },
    onError(error) {
      setError(error.message);
    },
  });

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    // submit form data to backend
    generateImage.mutate({
      ...form,
      quantity: parseInt(form.quantity),
    });

    // setForm((prev) => ({ ...prev, prompt: "" }));
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

  return (
    <>
      <Head>
        <title>Generate Feels Image</title>
        <meta name="description" content="Generated by create-t3-app" />
      </Head>
      <main className="container mx-auto mt-24 flex min-h-screen flex-col gap-4 px-8">
        <h1 className="text-6xl">Generate Your Image</h1>
        <p className="mb-12 text-2xl"></p>
        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
          <h2>1. Describe the image you want to output</h2>
          <FormGroup className="mb-12">
            <label>Prompt</label>
            <Input
              required
              value={form.prompt}
              onChange={updateForm("prompt")}
            />
          </FormGroup>

          <h2>2. Pick Image Color</h2>
          <FormGroup className="mb-12 grid grid-cols-4">
            {colors.map((color) => (
              <label key={color} className="flex gap-2 text-2xl">
                <input
                  required
                  type="radio"
                  name="color"
                  checked={color === form.color}
                  onChange={() => setForm((prev) => ({ ...prev, color }))}
                ></input>
                {color}
              </label>
            ))}
          </FormGroup>

          <h2>3. Pick Image Shape</h2>
          <FormGroup className="mb-12 grid grid-cols-4">
            {shapes.map((shape) => (
              <label key={shape} className="flex gap-2 text-2xl">
                <input
                  required
                  type="radio"
                  name="color"
                  checked={shape === form.shape}
                  onChange={() => setForm((prev) => ({ ...prev, shape }))}
                ></input>
                {shape}
              </label>
            ))}
          </FormGroup>

          <h2>4. Pick Image Style</h2>
          <FormGroup className="mb-12 grid grid-cols-4">
            {styles.map((style) => (
              <label key={style} className="flex gap-2 text-2xl">
                <input
                  required
                  type="radio"
                  name="color"
                  checked={style === form.style}
                  onChange={() => setForm((prev) => ({ ...prev, style }))}
                ></input>
                {style}
              </label>
            ))}
          </FormGroup>

          <h2 className="text-xl">5. Quantity</h2>
          <FormGroup className="mb-12">
            <label>Number of Images</label>

            <Input
              required
              inputMode="numeric"
              pattern="[1-9]|10"
              value={form.quantity}
              onChange={updateForm("quantity")}
            ></Input>
          </FormGroup>

          {error && (
            <div className="rounded bg-red-500 px-8 py-4 text-xl text-white">
              {error}
            </div>
          )}

          <Button
            disabled={generateImage.isLoading}
            isLoading={generateImage.isLoading}
          >
            Submit
          </Button>
        </form>

        {imagesUrl.length > 0 && (
          <>
            <h2 className="text-xl">Your Images</h2>
            <section className="mb-12 grid grid-cols-4 gap-4">
              {imagesUrl.map(({ imageUrl }) => (
                <Image
                  key={imageUrl}
                  src={imageUrl}
                  alt="an image of generated prompt"
                  width="512"
                  height="512"
                  className="w-full"
                />
              ))}
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default GeneratePage;
