import { motion } from "framer-motion";
import { Gift, ExternalLink, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GIFT_LIST_URL } from "@/lib/constants";

const GiftListSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-[#F6F7F2]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto text-center"
      >
        {/* Section Header */}
        <p className="uppercase text-sm tracking-[0.3em] text-[#6B7B4B] mb-3">
          Com carinho
        </p>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#2F3A1F] mb-4">
          Lista de Presentes
        </h2>

        <div className="mx-auto w-20 h-[2px] bg-[#6B7B4B]/40 mb-12 rounded-full" />

        {/* Gift Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-[#6B7B4B]/10 overflow-hidden"
        >
          {/* Background hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#6B7B4B]/5 via-transparent to-[#6B7B4B]/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />

          {/* Icon */}
          <div className="mb-6 relative z-10">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#6B7B4B]/10 flex items-center justify-center">
              <Gift className="w-8 h-8 text-[#6B7B4B]" />
            </div>
          </div>

          {/* Message */}
          <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8 relative z-10">
            Sua presença é o nosso maior presente, mas se desejar nos
            presentear, preparamos uma lista especial com todo carinho.
          </p>

          {/* CTA */}
          <div className="relative z-10 flex justify-center">
            <Button
              size="lg"
              onClick={() => window.open(GIFT_LIST_URL, "_blank")}
              className="
             w-full sm:w-auto
            px-6 sm:px-8
            py-6
            text-base md:text-lg
             bg-[#6B7B4B] text-white
            hover:bg-[#55663A]
            transition-all duration-300
            shadow-md hover:shadow-lg
             flex items-center justify-center gap-2
            "
            >
              <Gift className="w-5 h-5 mr-2" />
              Acessar Lista de Presentes
              <ExternalLink className="w-4 h-4 ml-2 opacity-70" />
            </Button>
          </div>

          {/* Thank you */}
          <div className="mt-8 flex items-center justify-center gap-2 text-gray-500">
            <Heart className="w-4 h-4 text-[#6B7B4B] fill-current" />
            <span className="text-sm">Obrigado por celebrar conosco!</span>
            <Heart className="w-4 h-4 text-[#6B7B4B] fill-current" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default GiftListSection;
