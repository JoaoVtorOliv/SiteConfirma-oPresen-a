import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  WEDDING_DATE,
  WEDDING_TIME,
  WEDDING_VENUE,
  WEDDING_ADDRESS,
  WEDDING_CITY,
  GOOGLE_MAPS_URL,
} from "@/lib/constants";

const EventInfoSection = () => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const infoItems = [
    {
      icon: Calendar,
      label: "Data",
      value: formatDate(WEDDING_DATE),
    },
    {
      icon: Clock,
      label: "Horário",
      value: `${WEDDING_TIME}h`,
    },
    {
      icon: MapPin,
      label: "Local",
      value: WEDDING_VENUE,
      subvalue: `${WEDDING_ADDRESS}\n${WEDDING_CITY}`,
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center"
      >
        {/* Section Header */}
        <p className="wedding-subtitle mb-4 tracking-[0.2em]">
          Cerimônia & Recepção
        </p>
        <h2 className="wedding-title text-3xl md:text-4xl lg:text-5xl mb-4">
          Detalhes do Evento
        </h2>
        <div className="mx-auto w-20 decorative-line mb-12" />

        {/* Info Cards */}
        <div className="grid gap-6 md:gap-8">
          {infoItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="wedding-card p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <p className="text-sm text-muted-foreground font-body uppercase tracking-wider mb-1">
                    {item.label}
                  </p>
                  <p className="font-serif text-xl md:text-2xl text-foreground capitalize">
                    {item.value}
                  </p>
                  {item.subvalue && (
                    <p className="text-muted-foreground font-body mt-1 whitespace-pre-line">
                      {item.subvalue}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Maps Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8"
        >
          <Button
            variant="outline"
            size="lg"
            className="font-body px-6 py-5 text-base border-primary/30 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
            onClick={() => window.open(GOOGLE_MAPS_URL, "_blank")}
          >
            <MapPin className="w-5 h-5 mr-2 text-primary" />
            Ver no Google Maps
            <ExternalLink className="w-4 h-4 ml-2 opacity-60" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default EventInfoSection;
