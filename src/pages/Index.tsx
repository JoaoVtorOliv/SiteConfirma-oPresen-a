import { useRef } from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/wedding/HeroSection";
import EventInfoSection from "@/components/wedding/EventInfoSection";
import CountdownSection from "../components/wedding/CountDownSection";
import CoupleMessageSection from "../components/wedding/CoupleMessage";
import PhotoGallerySection from "@/components/wedding/PhotoGallerySection";
import GiftListSection from "@/components/wedding/GiftListSection";
import RSVPForm from "@/components/wedding/RSVPForm";
import WeddingFooter from "@/components/wedding/WeddingFooter";
import weddingFlowers from "@/assets/wedding-flowers.png";

const Index = () => {
  const rsvpRef = useRef<HTMLDivElement>(null);

  const scrollToRSVP = () => {
    rsvpRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Top left floral */}
        <div
          className="absolute -top-20 -left-20 w-72 md:w-96 h-72 md:h-96 opacity-15"
          style={{
            backgroundImage: `url(${weddingFlowers})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "rotate(-30deg)",
          }}
        />
        {/* Bottom right floral */}
        <div
          className="absolute -bottom-20 -right-20 w-72 md:w-96 h-72 md:h-96 opacity-15"
          style={{
            backgroundImage: `url(${weddingFlowers})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "rotate(150deg)",
          }}
        />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-olive-light/30 via-transparent to-primary/5" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section - Full viewport */}
        <HeroSection onRSVPClick={scrollToRSVP} />

        {/* Divider */}
        <div className="container max-w-4xl mx-auto px-4">
          <div className="mx-auto w-40 decorative-line" />
        </div>

        {/* Event Info Section */}
        <div className="container max-w-4xl mx-auto px-4">
          <EventInfoSection />
        </div>

        {/* Divider */}
        <div className="container max-w-4xl mx-auto px-4">
          <div className="mx-auto w-40 decorative-line" />
        </div>

        {/* Countdown Section */}
        <div className="container max-w-4xl mx-auto px-4">
          <CountdownSection />
        </div>

        {/* Divider */}
        <div className="container max-w-4xl mx-auto px-4">
          <div className="mx-auto w-40 decorative-line" />
        </div>

        {/* Couple Message Section */}
        <div className="container max-w-4xl mx-auto px-4">
          <CoupleMessageSection onRSVPClick={scrollToRSVP} />
        </div>

        {/* Divider */}
        <div className="container max-w-4xl mx-auto px-4">
          <div className="mx-auto w-40 decorative-line" />
        </div>

        {/* Photo Gallery Section */}
        <div className="container max-w-5xl mx-auto px-4">
          <PhotoGallerySection />
        </div>

        {/* Divider */}
        <div className="container max-w-4xl mx-auto px-4">
          <div className="mx-auto w-40 decorative-line" />
        </div>

        {/* Gift List Section */}
        <div className="container max-w-4xl mx-auto px-4">
          <GiftListSection />
        </div>

        {/* Divider */}
        <div className="container max-w-4xl mx-auto px-4">
          <div className="mx-auto w-40 decorative-line" />
        </div>

        {/* RSVP Form Section */}
        <motion.div
          ref={rsvpRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="container max-w-4xl mx-auto px-4 py-16 md:py-24 scroll-mt-8"
        >
          <RSVPForm />
        </motion.div>

        {/* Footer */}
        <div className="container max-w-4xl mx-auto px-4">
          <WeddingFooter />
        </div>
      </div>
    </div>
  );
};

export default Index;
