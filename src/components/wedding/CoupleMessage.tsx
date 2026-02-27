import { motion } from "framer-motion";
import { Heart, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRIDE_NAME, GROOM_NAME } from "@/lib/constants";

interface CoupleMessageSectionProps {
  onRSVPClick: () => void;
}

const CoupleMessageSection = ({ onRSVPClick }: CoupleMessageSectionProps) => {
  return (
    <section className="py-16 md:py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-rose/15 via-transparent to-transparent opacity-60" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto text-center relative z-10"
      >
        {/* Quote icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Quote className="w-12 h-12 mx-auto text-primary/30 rotate-180" />
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="wedding-card p-8 md:p-12"
        >
          <h2 className="wedding-title text-2xl md:text-3xl mb-6">
            Nossa história...
          </h2>

          <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
            A nossa história começou em 2021, em meio à pandemia, quando uma
            resposta despretensiosa ao story no Instagram virou conversa e a
            conversa virou rotina, carinho e vontade de estar perto. Entre
            mensagens infinitas, veio o primeiro encontro: simples, em casa, com
            uma cervejinha gelada e um papo tão bom que, até hoje, é o nosso
            maior hábito. Não foi tudo imediato: teve tempo, cuidado, algumas
            incertezas e muita conversa. Mas Deus, que entende de encontros bem
            feitos, nos uniu no momento certo. Hoje, já são cinco anos de
            caminhada juntos, construídos com amizade, diálogo, cumplicidade e
            muita leveza. Seguimos escolhendo um ao outro todos os dias,
            acreditando no amor e fazendo dar certo, do nosso jeito.
          </p>

          <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
            Venha compartilhar conosco a magia deste dia único, repleto de amor,
            felicidade e boas energias. Será uma honra ter você ao nosso lado!
          </p>

          {/* Signature */}
          <div className="flex items-center justify-center gap-3 text-primary mb-8">
            <span className="font-serif text-xl md:text-2xl">{BRIDE_NAME}</span>
            <Heart className="w-4 h-4 fill-current animate-pulse-soft" />
            <span className="font-serif text-xl md:text-2xl">{GROOM_NAME}</span>
          </div>

          {/* Decorative line */}
          <div className="mx-auto w-24 decorative-line mb-8" />

          {/* CTA Button */}
          <Button
            onClick={onRSVPClick}
            size="lg"
            className="px-8 py-6 text-base md:text-lg font-body bg-primary hover:bg-primary/90 text-primary-foreground shadow-elegant transition-all duration-300 hover:scale-105"
          >
            <Heart className="w-5 h-5 mr-2" />
            Confirmar Presença
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CoupleMessageSection;
