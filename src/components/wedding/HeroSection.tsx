import { motion } from "framer-motion";
import { Heart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRIDE_NAME, GROOM_NAME } from "@/lib/constants";

interface HeroSectionProps {
  onRSVPClick: () => void;
}

const HeroSection = ({ onRSVPClick }: HeroSectionProps) => {
  return (
    <section className="flex flex-col items-center relative px-4 pt-24 pb-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-rose/20 via-transparent to-transparent opacity-60" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-40" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center max-w-3xl mx-auto"
      >
        {/* Pre-title */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="wedding-subtitle mb-6 tracking-[0.3em] text-xs md:text-sm"
        >
          “Assim, eles já não são dois, mas sim uma só carne. Portanto, o que
          Deus uniu, ninguém o separe.”<br></br>— Mateus 19:6
        </motion.p>

        {/* Decorative top flourish */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mx-auto w-20 md:w-28 decorative-line mb-8"
        />

        {/* Couple Names */}
        <h1 className="wedding-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 leading-tight">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="block"
          >
            {BRIDE_NAME}
          </motion.span>

          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex items-center justify-center gap-3 md:gap-5 my-4"
          >
            <span className="w-10 md:w-16 decorative-line" />
            <Heart
              className="w-5 h-5 md:w-7 md:h-7 text-primary animate-pulse-soft"
              fill="currentColor"
            />
            <span className="w-10 md:w-16 decorative-line" />
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="block"
          >
            {GROOM_NAME}
          </motion.span>
        </h1>
      </motion.div>
    </section>
  );
};

export default HeroSection;
