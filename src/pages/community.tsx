/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { type ImageAi } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { api } from "~/utils/api";

const CommunityPage: NextPage = () => {
  const images = api.images.getCommunityImages.useQuery();
  return (
    <>
      <Head>
        <title>Community Images</title>
        <meta name="description" content="Your Feel Images" />
      </Head>
      <main>
        <div className="container mx-auto flex min-h-screen flex-col gap-4 px-8">
          <h1 className="text-4xl">Community Images</h1>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6">
            {images.data?.map((image: ImageAi) => (
              <li key={image.id}>
                <Image
                  className="w-full rounded-lg"
                  width="100"
                  height="100"
                  alt={image.prompt ?? "a generated image"}
                  src={`https://feels-generator.s3.amazonaws.com/${image.id}`}
                />
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
};

export default CommunityPage;
