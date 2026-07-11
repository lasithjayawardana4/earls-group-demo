"use client";

import { motion } from "framer-motion";

interface HomeClientEffectsProps {
  children: React.ReactNode;
}

export default function HomeClientEffects({ children }: HomeClientEffectsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
