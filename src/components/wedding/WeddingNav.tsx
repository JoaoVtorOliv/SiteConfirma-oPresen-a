import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WeddingNavProps {
  onRSVPClick: () => void;
}

const navLinks = [
  { label: "Início", href: "inicio" },
  { label: "Evento", href: "evento" },
  { label: "Nossa história", href: "historia" },
  { label: "Galeria", href: "galeria" },
  { label: "Presentes", href: "presentes" },
];

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const WeddingNav = ({ onRSVPClick }: WeddingNavProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25 }}
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-background/80 border-b border-border/30"
        >
          <div className="container max-w-5xl mx-auto px-4 h-14 flex items-center">
            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-6 flex-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Confirm button — always visible, right-aligned */}
            <Button
              size="sm"
              onClick={onRSVPClick}
              className="ml-auto bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Heart className="w-4 h-4 mr-1.5" fill="currentColor" />
              Confirmar
            </Button>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default WeddingNav;
