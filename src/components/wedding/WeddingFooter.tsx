import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { BRIDE_NAME, GROOM_NAME } from '@/lib/constants';

const WeddingFooter = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="py-12 md:py-16 text-center"
    >
      {/* Decorative line */}
      <div className="mx-auto w-20 decorative-line mb-8" />

      {/* Thank you message */}
      <p className="font-body text-lg md:text-xl text-muted-foreground mb-4">
        Sua presença é o nosso maior presente
      </p>

      {/* Couple names */}
      <div className="flex items-center justify-center gap-3 text-primary">
        <span className="font-serif text-2xl md:text-3xl">{BRIDE_NAME}</span>
        <Heart className="w-4 h-4 fill-current" />
        <span className="font-serif text-2xl md:text-3xl">{GROOM_NAME}</span>
      </div>

      {/* Bottom decorative line */}
      <div className="mx-auto w-32 decorative-line mt-8" />

      {/* Copyright */}
      <p className="mt-8 text-xs text-muted-foreground/60 font-body">
        Feito com 💕 para celebrar o amor
      </p>
    </motion.footer>
  );
};

export default WeddingFooter;
