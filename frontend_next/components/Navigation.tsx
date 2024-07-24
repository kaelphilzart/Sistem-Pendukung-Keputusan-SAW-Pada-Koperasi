"use client"; // Atur komponen sebagai "Client Component"

import { auth } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Transition from "./Transition"; // Import Transition component from its file

const Navigation = () => {
  const [isRouting, setisRouting] = useState(false);
  const path = usePathname();
  const [prevPath, setPrevPath] = useState("/");

  useEffect(() => {
    if (prevPath !== path) {
      setisRouting(true);
    }
  }, [path, prevPath]);

  useEffect(() => {
    if (isRouting) {
      setPrevPath(path);
      const timeout = setTimeout(() => {
        setisRouting(false);
      }, 1200);

      return () => clearTimeout(timeout);
    }
  }, [isRouting]);

  const transitionVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div>
      {/* Call Transition component directly */}
      <Transition />

      {/* Your navigation links */}
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={transitionVariants}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mr-10">
          <div className="text-left mt-5 mx-3">
            
            <Link
              href="/auth/login"
              className="rounded-[20px] group relative bg-slate-700 hover:bg-sky-700 px-5 py-3 text-lg text-white max-w-[200px]"
            >
              Login
            </Link>
          </div>
          <div className="text-left mt-5 mx-3">
            <Link
              href="/auth/register"
              className="rounded-[20px] group relative bg-slate-700 hover:bg-sky-700 px-5 py-3 text-lg text-white max-w-[200px]"
            >
              Register
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Navigation;
