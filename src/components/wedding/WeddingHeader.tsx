import { motion } from "framer-motion";
import { BRIDE_NAME, GROOM_NAME } from "@/lib/constants";
import { Heart } from "lucide-react";

const WeddingHeader = () => {
  return (
    <header className="relative py-16 md:py-24 text-center overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-radial from-rose/30 via-transparent to-transparent opacity-50" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        {/* Decorative top flourish */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mx-auto w-24 decorative-line mb-8"
        />

        {/* Pre-title */}
        <p className="wedding-subtitle mb-4 tracking-[0.3em]">
          Você está convidado para o casamento de
        </p>

        {/* Couple Names */}
        <h1 className="wedding-title text-5xl md:text-7xl lg:text-8xl mb-6">
          <span className="block">{BRIDE_NAME}</span>
          <span className="flex items-center justify-center gap-4 my-3">
            <span className="w-12 md:w-20 decorative-line" />
            <Heart
              className="w-5 h-5 md:w-6 md:h-6 text-primary animate-pulse-soft"
              fill="currentColor"
            />
            <span className="w-12 md:w-20 decorative-line" />
          </span>
          <span className="block">{GROOM_NAME}</span>
        </h1>

        {/* Decorative bottom flourish */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mx-auto w-32 decorative-line mt-8"
        />
      </motion.div>
    </header>
  );
};

export default WeddingHeader;
