import { Box, Slide, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { Button } from "~/component/Button";

export default function TestCarousel({
  children: questions,
}: {
  children: Array<string>;
}) {
  // console.log("PROPS: ", props);
  // console.log("CHILDREN: ", props.children);
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((current) =>
      current === 0 ? questions.length - 1 : current - 1
    );
  };
  const nextSlide = () => {
    setCurrentIndex((current) =>
      current === questions.length - 1 ? 0 : current + 1
    );
  };
  const { isOpen, onToggle } = useDisclosure();

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {questions}
      </div>

      <Slide direction="left" in={isOpen} style={{ zIndex: 10 }}>
        <Box
          p="40px"
          color="white"
          mt="4"
          bg="teal.500"
          rounded="md"
          shadow="md"
        ></Box>
      </Slide>

      <div className="absolute inset-0 flex items-center justify-between p-4">
        <Button onClick={() => prevSlide()}>Back</Button>
        <Button onClick={() => nextSlide()}>Next</Button>
      </div>
    </div>
  );
}
