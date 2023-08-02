import { type ReactNode, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Carousel({
  children,
  active,
}: {
  children: ReactNode;
  active: boolean;
}) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(active);
  }, [active]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="flex h-56 w-full items-center justify-center rounded-md bg-zinc-600 text-black shadow-md"
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
}
