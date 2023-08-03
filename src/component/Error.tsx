import { Box, Slide } from "@chakra-ui/react";

interface ErrorProps {
  message?: string;
  hasErrors: boolean;
}

export function Error({ message = "Required", hasErrors }: ErrorProps) {
  const errors = hasErrors;
  const msg = message;

  return (
    <Slide
      direction="top"
      in={errors}
      style={{ zIndex: 0, position: "absolute" }}
    >
      <Box p="5px 10px" color="white" bg="red.500" rounded="sm" shadow="md">
        {msg}
      </Box>
    </Slide>
  );
}
