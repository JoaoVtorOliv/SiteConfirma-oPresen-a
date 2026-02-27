import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WEDDING_DATE } from "@/lib/constants";
import { Heart } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownSection = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = WEDDING_DATE.getTime() - new Date().getTime();

      if (difference <= 0) {
        setIsExpired(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <div className="wedding-card px-4 py-4 md:px-8 md:py-6 min-w-[70px] md:min-w-[100px]">
        <span className="block text-3xl md:text-5xl lg:text-6xl font-serif text-primary font-semibold">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-3 text-xs md:text-sm text-muted-foreground uppercase tracking-[0.15em] font-body">
        {label}
      </span>
    </motion.div>
  );

  if (isExpired) {
    return (
      <section className="py-16 md:py-24 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <Heart
            className="w-12 h-12 mx-auto text-primary mb-6 animate-pulse-soft"
            fill="currentColor"
          />
          <h2 className="wedding-title text-3xl md:text-4xl gold-gradient-text mb-4">
            O Grande Dia Chegou!
          </h2>
          <p className="text-muted-foreground font-body text-lg">
            Felicidades aos noivos! 💕
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-50" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center relative z-10"
      >
        {/* Section Header */}
        <p className="wedding-subtitle mb-4 tracking-[0.2em]">Faltam apenas</p>
        <h2 className="wedding-title text-3xl md:text-4xl lg:text-5xl mb-4">
          Contagem Regressiva
        </h2>
        <div className="mx-auto w-20 decorative-line mb-10" />

        {/* Countdown Blocks */}
        <div className="flex justify-center gap-2 sm:gap-4 md:gap-6">
          <TimeBlock value={timeLeft.days} label="Dias" />
          <TimeBlock value={timeLeft.hours} label="Horas" />
          <TimeBlock value={timeLeft.minutes} label="Min" />
          <TimeBlock value={timeLeft.seconds} label="Seg" />
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-muted-foreground font-body text-lg md:text-xl italic"
        >
          para celebrar nosso amor 💕
        </motion.p>
      </motion.div>
    </section>
  );
};

export default CountdownSection;
