import { type NextPage } from "next";
import {
  ReactElement,
  ReactFragment,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  { question: "Describe the image you want to output" },
  { question: "Pick Image Color" },
  { question: "Pick Image Shape" },
  { question: "Pick Image Style" },
  { question: "Pick Image Quantity" },
];

const TestPage: NextPage = ({ children, active }) => {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    setIsActive(active);
  }, []);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="box bg-blue-400 text-black"
          initial={{ translateX: "100%", opacity: 1 }}
          animate={{ translateX: 0, opacity: 1 }}
          exit={{
            translateX: "-100%",
            transition: { duration: 0.1 },
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default TestPage;

{
  /* <motion.div
key={item.id}
className="box bg-blue-400 text-black"
initial={{ translateX: 100, opacity: 0, scale: 0.5 }}
animate={{ translateX: 0, opacity: 1, scale: 1 }}
exit={{ translateX: -100 }}
transition={{ duration: 0.2, ease: "easeOut" }}
>
Item {item.id}
</motion.div> */
}
