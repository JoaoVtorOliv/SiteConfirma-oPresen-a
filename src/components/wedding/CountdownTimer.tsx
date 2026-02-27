import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { WEDDING_DATE } from '@/lib/constants';
import { Calendar, Clock } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
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

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <div className="wedding-card px-4 py-3 md:px-6 md:py-4 min-w-[70px] md:min-w-[90px]">
        <span className="block text-3xl md:text-5xl font-serif text-primary font-semibold">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="mt-2 text-xs md:text-sm text-muted-foreground uppercase tracking-widest font-body">
        {label}
      </span>
    </motion.div>
  );

  if (isExpired) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="flex items-center justify-center gap-2 text-primary mb-4">
          <Calendar className="w-5 h-5" />
          <span className="wedding-subtitle">O Grande Dia Chegou!</span>
        </div>
        <h2 className="wedding-title text-3xl md:text-4xl gold-gradient-text">
          Felicidades aos Noivos! 💒
        </h2>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="text-center py-8 md:py-12"
    >
      {/* Section Header */}
      <div className="flex items-center justify-center gap-2 text-primary mb-6">
        <Clock className="w-4 h-4" />
        <span className="wedding-subtitle tracking-[0.2em]">Contagem Regressiva</span>
      </div>

      {/* Wedding Date */}
      <p className="text-muted-foreground font-body text-lg md:text-xl mb-8 capitalize">
        {formatDate(WEDDING_DATE)}
      </p>

      {/* Countdown Blocks */}
      <div className="flex justify-center gap-3 md:gap-6">
        <TimeBlock value={timeLeft.days} label="Dias" />
        <TimeBlock value={timeLeft.hours} label="Horas" />
        <TimeBlock value={timeLeft.minutes} label="Min" />
        <TimeBlock value={timeLeft.seconds} label="Seg" />
      </div>

      {/* Decorative text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-muted-foreground font-body text-base md:text-lg italic"
      >
        "para o grande dia 💕"
      </motion.p>
    </motion.section>
  );
};

export default CountdownTimer;
