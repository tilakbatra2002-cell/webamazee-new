"use client";

import { motion } from "framer-motion";

/**
 * Smooth page-entry transition. Wraps page content with a fade + rise
 * reveal and a subtle colored sweep. Lightweight — transforms/opacity only.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1], delay: 0.05 }}
        style={{ originY: "top" }}
        className="pointer-events-none fixed inset-0 z-[70] bg-[#f6f9ff]"
        aria-hidden
      />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
      >
        {children}
      </motion.div>
    </>
  );
}
