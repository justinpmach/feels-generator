/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { Box, Slide } from "@chakra-ui/react";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { MouseEventHandler, useState } from "react";
import { Button } from "~/component/Button";
import Carousel from "~/component/Carousel";
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

const questions = [
  { id: "prompt", question: "Describe the image you want to output" },
  { id: "color", question: "Pick Image Color" },
  { id: "shape", question: "Pick Image Shape" },
  { id: "style", question: "Pick Image Style" },
  { id: "quantity", question: "Pick Image Quantity" },
];

const GeneratePage: NextPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
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
    console.log("Submitting...");
    e.preventDefault();
    setError("");
    // submit form data to backend
    console.log("Generating...");
    generateImage.mutate({
      ...form,
      quantity: parseInt(form.quantity),
    });
    console.log("Generating...SUCCCESS");

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

  const prevSlide = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (currentIndex === 0) {
      return;
    }
    setCurrentIndex((current) =>
      current === 0 ? questions.length - 1 : current - 1
    );
    return true;
  };

  const nextSlide = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (handleErrors()) {
      return;
    }
    setCurrentIndex((current) =>
      current === questions.length - 1 ? 0 : current + 1
    );
    return true;
  };

  function handleErrors() {
    if (
      (currentIndex === 0 && !form.prompt) ||
      (currentIndex === 1 && !form.color) ||
      (currentIndex === 2 && !form.shape) ||
      (currentIndex === 3 && !form.style) ||
      (currentIndex === 4 && !form.quantity)
    ) {
      setError("Required");
      return true;
    }
    setError("");
    return false;
  }

  function handleSlides(index: number) {
    return currentIndex === index;
  }
  return (
    <>
      <Head>
        <title>Generate an Image that makes you feel</title>
        <meta name="description" content="Generated by create-t3-app" />
      </Head>

      <main>
        <div className="container mx-auto">
          <h1 className="mb-4 text-3xl">Generate Your Image</h1>

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

          <form
            className="container flex flex-col rounded-md bg-gray-700 p-8"
            onSubmit={handleFormSubmit}
          >
            {questions.map((q, index) => (
              <>
                {currentIndex === 0 && (
                  <Carousel active={handleSlides(index)}>
                    <FormGroup>
                      <label key={index} className="block">
                        1. {q.question}
                      </label>
                      <Input
                        required
                        value={form.prompt}
                        onChange={updateForm("prompt")}
                      />
                    </FormGroup>
                  </Carousel>
                )}

                {currentIndex === 1 && (
                  <Carousel active={handleSlides(index)}>
                    <FormGroup>
                      <label key={index} className="block">
                        2. {q.question}
                      </label>
                      <div className="grid grid-cols-4 gap-4">
                        {colors.map((color) => (
                          <label key={color}>
                            <input
                              required
                              type="radio"
                              name="color"
                              checked={color === form.color}
                              onChange={() =>
                                setForm((prev) => ({ ...prev, color }))
                              }
                            ></input>
                            {color}
                          </label>
                        ))}
                      </div>
                    </FormGroup>
                  </Carousel>
                )}

                {currentIndex === 2 && (
                  <Carousel active={handleSlides(index)}>
                    <FormGroup>
                      <label key={index} className="block">
                        3. {q.question}
                      </label>
                      <div className="grid grid-cols-4 gap-4">
                        {shapes.map((shape) => (
                          <label key={shape} className="flex gap-2">
                            <input
                              required
                              type="radio"
                              name="color"
                              checked={shape === form.shape}
                              onChange={() =>
                                setForm((prev) => ({ ...prev, shape }))
                              }
                            ></input>
                            {shape}
                          </label>
                        ))}
                      </div>
                    </FormGroup>
                  </Carousel>
                )}

                {currentIndex === 3 && (
                  <Carousel active={handleSlides(index)}>
                    <FormGroup>
                      <label key={index} className="block">
                        4. {q.question}
                      </label>
                      <div className="grid grid-cols-4 gap-4">
                        {styles.map((style) => (
                          <label key={style} className="flex gap-2">
                            <input
                              required
                              type="radio"
                              name="color"
                              checked={style === form.style}
                              onChange={() =>
                                setForm((prev) => ({ ...prev, style }))
                              }
                            />
                            {style}
                          </label>
                        ))}
                      </div>
                    </FormGroup>
                  </Carousel>
                )}

                {currentIndex === 4 && (
                  <Carousel active={handleSlides(index)}>
                    <FormGroup>
                      <label key={index} className="block">
                        5. {q.question}
                      </label>
                      <Input
                        required
                        inputMode="numeric"
                        pattern="[1-9]|10"
                        value={form.quantity}
                        onChange={updateForm("quantity")}
                      ></Input>
                    </FormGroup>
                  </Carousel>
                )}
              </>
            ))}

            <div className="mx-auto mt-8 flex w-full flex-wrap justify-center gap-4">
              <Button
                className="z-20"
                disabled={currentIndex === 0}
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                  prevSlide(e)
                }
              >
                Back
              </Button>
              {currentIndex === 4 ? (
                <Button
                  className="z-20"
                  disabled={generateImage.isLoading}
                  isLoading={generateImage.isLoading}
                  type="submit"
                >
                  Submit
                </Button>
              ) : (
                <Button
                  className="z-20"
                  onClick={(
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                  ) => nextSlide(e)}
                >
                  Next
                </Button>
              )}
            </div>
          </form>

          {error && (
            <Slide direction="bottom" in={!!error} style={{ zIndex: 20 }}>
              <Box p="10px" color="white" bg="red.400" rounded="sm" shadow="md">
                {error}
              </Box>
            </Slide>
            // <div className="rounded bg-red-500 px-8 py-4 text-xl text-white">
            //   {error}
            // </div>
          )}
        </div>
      </main>
    </>
  );
};

export default GeneratePage;
