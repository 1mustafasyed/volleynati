import { motion } from "framer-motion";

/**
 * Full-screen splash overlay shown during page transitions.
 * Displays the Volleynati favicon + "LOADING" text on the earthy cream background.
 */
export default function LoadingSplash() {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{ backgroundColor: "#F5F0E8" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: "easeInOut" }}
    >
      <motion.img
        src="/favicon.png"
        alt="Volleynati"
        className="w-14 h-14 object-contain mb-4"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut", delay: 0.05 }}
      />
      <motion.p
        className="text-xs tracking-[0.25em]"
        style={{ color: "#8C7355" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15, delay: 0.15 }}
      >
        LOADING
      </motion.p>
    </motion.div>
  );
}
