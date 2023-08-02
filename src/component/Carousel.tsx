import { Box, Slide, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Button } from "~/component/Button";

export default function Carousel({
  children: questions,
  currIndex,
  carouselIdx,
}: {
  children: Array<string>;
  currIndex: number;
  carouselIdx: number;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(currIndex);
  }, [currentIndex]);

  function handleSlides(index: number) {
    return currentIndex === index;
  }

  // const { isOpen, onToggle } = useDisclosure();
  return (
    <div>
      <Slide
        direction="right"
        in={currentIndex === carouselIdx}
        style={{ zIndex: 20 }}
      >
        <Box
          p="20px"
          color="white"
          mt="10"
          bg="blue.400"
          rounded="sm"
          shadow="md"
        >
          {carouselIdx + 1}. {questions}
        </Box>
      </Slide>
    </div>
  );
}
