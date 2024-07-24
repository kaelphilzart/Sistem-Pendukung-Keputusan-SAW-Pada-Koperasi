import React from "react";
import { motion } from "framer-motion";

const TransitionVariants = {
  initial: {
    y: "100%",
    height: "100%",
  },
  animate: {
    y: "0%",
    height: "0%",
  },
  exit: {
    y: ["0%", "100%"],
    height: ["0%", "100%"],
  },
};

const Transition = () => {
  return (
    <div>
      <motion.div
        className="fixed right-0 h-screen w-screen bottom-full bg-[#3670cc]"
        style={{ zIndex: 80 }} // Tambahkan zIndex yang lebih tinggi dari header
        variants={TransitionVariants}
        initial="initial"
        exit="exit"
        animate="animate"
        transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed right-0 h-screen w-screen bottom-full bg-[#448ad1]"
        style={{ zIndex: 70 }} // ZIndex yang lebih rendah dari yang pertama
        variants={TransitionVariants}
        initial="initial"
        exit="exit"
        animate="animate"
        transition={{ delay: 0.4, duration: 0.6, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed right-0 h-screen w-screen bottom-full bg-[#71a8fb]"
        style={{ zIndex: 60 }} // ZIndex yang lebih rendah dari yang kedua
        variants={TransitionVariants}
        initial="initial"
        exit="exit"
        animate="animate"
        transition={{ delay: 0.6, duration: 0.6, ease: "easeInOut" }}
      />
    </div>
  );
};

export default Transition;
