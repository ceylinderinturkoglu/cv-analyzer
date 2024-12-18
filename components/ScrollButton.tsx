import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollButton({
  id,
  text = "Scroll",
  direction = "down",
  size = "md",
  position = "center-bottom",
  hideWhenVisible = true,
}: {
  id: string;
  text: string;
  direction: "up" | "down";
  size?: "sm" | "md" | "lg";
  position?:
    | "center"
    | "center-top"
    | "center-bottom"
    | "left-top"
    | "left-bottom"
    | "right-top"
    | "right-bottom";
  hideWhenVisible?: boolean;
}) {
  id = id.replace("#", "");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = document.getElementById(id);

    if (element && hideWhenVisible) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        { threshold: 0.3 }
      );

      observer.observe(element);

      return () => observer.disconnect();
    }
  }, [id, hideWhenVisible]);

  const positionClases = `absolute ${
    position === "center"
      ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      : position == "center-top"
        ? "top-0"
        : position == "center-bottom"
          ? "bottom-0"
          : position == "left-top"
            ? "left-0 top-0"
            : position == "left-bottom"
              ? "left-0 bottom-0"
              : position == "right-top"
                ? "right-0 top-0"
                : "right-0 bottom-0"
  }`;
  const containerClasses =
    `self-center flex flex-col items-center gap-2 p-4 ` + positionClases;
  const textClasses = `${
    direction === "up" ? "order-2" : ""
  } text-primary-500 font-light ${
    size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-md"
  }`;
  const iconClasses = `${
    direction === "up" ? "rotate-180" : ""
  } ${size === "sm" ? "h-4 w-4" : size === "md" ? "h-6 w-6" : "h-8 w-8"}`;
  const arrowClasses = `fill-transparent stroke-1 stroke-primary-500`;

  const createAnimation = (delay: number) => ({
    opacity: [0, 1, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop" as const,
      delay,
    },
  });

  const handleClick = () => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const variants = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0.8 },
  };

  return (
    <AnimatePresence>
      {(!hideWhenVisible || !isVisible) && (
        <motion.button
          className={containerClasses}
          onClick={handleClick}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variants}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <span className={textClasses}>{text}</span>
          <svg viewBox="0 0 32 32" className={iconClasses}>
            <motion.path
              d="M2.7,0L16,14.2L29.3,0"
              className={arrowClasses}
              initial={{ opacity: 0 }}
              animate={createAnimation(direction == "up" ? 1 : 0)}
            />
            <motion.path
              d="M2.7,8.9L16,23.1L29.3,8.9"
              className={arrowClasses}
              initial={{ opacity: 0 }}
              animate={createAnimation(0.5)}
            />
            <motion.path
              d="M2.7,17.8L16,32l13.3-14.2"
              className={arrowClasses}
              initial={{ opacity: 0 }}
              animate={createAnimation(direction == "up" ? 0 : 1)}
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
