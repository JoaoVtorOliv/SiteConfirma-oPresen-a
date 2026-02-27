import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import foto2 from "../../../src/assets/img/foto2.jpeg";
import foto3 from "../../../src/assets/img/foto3.jpeg";
import foto4 from "../../../src/assets/img/foto4.jpeg";
import foto5 from "../../../src/assets/img/foto5.jpeg";
import foto6 from "../../../src/assets/img/foto6.jpeg";
import foto7 from "../../../src/assets/img/foto7.jpeg";

interface Photo {
  id: number;
  src: string;
  alt: string;
  caption?: string;
}

// Placeholder photos - replace with actual couple photos
const photos: Photo[] = [
  {
    id: 1,
    src: foto2,
    alt: " ",
    caption: " ",
  },
  {
    id: 2,
    src: foto3,
    alt: " ",
    caption: " ",
  },
  {
    id: 3,
    src: foto4,
    alt: " ",
    caption: " ",
  },
  {
    id: 4,
    src: foto5,
    alt: " ",
    caption: " ",
  },
  {
    id: 5,
    src: foto6,
    alt: " ",
    caption: " ",
  },
  {
    id: 6,
    src: foto7,
    alt: " ",
    caption: " ",
  },
];

const PhotoGallerySection = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (photo: Photo, index: number) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const goToPrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  }, [currentIndex]);

  const goToNext = useCallback(() => {
    const newIndex = currentIndex === photos.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;

      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "Escape") {
        closeLightbox();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhoto, goToPrevious, goToNext]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="py-16 md:py-24">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 md:mb-16"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/40" />
          <Heart className="w-5 h-5 text-primary fill-primary/20" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/40" />
        </div>

        <h2 className="wedding-title text-3xl md:text-4xl lg:text-5xl mb-4">
          Alguns registros que marcaram nossa caminhada até aqui
        </h2>
      </motion.div>

      {/* Photo Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:gap-6"
      >
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            variants={itemVariants}
            className="group relative aspect-square overflow-hidden rounded-lg md:rounded-xl cursor-pointer"
            onClick={() => openLightbox(photo, index)}
          >
            {/* Image */}
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Caption on Hover */}
            {photo.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-background text-sm md:text-base font-body text-center">
                  {photo.caption}
                </p>
              </div>
            )}

            {/* Subtle border glow on hover */}
            <div className="absolute inset-0 rounded-lg md:rounded-xl border-2 border-transparent group-hover:border-primary/30 transition-colors duration-300" />
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox Modal */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => closeLightbox()}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 bg-background/95 backdrop-blur-sm border-border/50 overflow-hidden">
          {selectedPhoto && (
            <div className="relative">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 z-20 bg-background/80 hover:bg-background rounded-full"
                onClick={closeLightbox}
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </Button>

              {/* Navigation Arrows */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-background/80 hover:bg-background rounded-full hidden md:flex"
                onClick={goToPrevious}
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-background/80 hover:bg-background rounded-full hidden md:flex"
                onClick={goToNext}
                aria-label="Próxima foto"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>

              {/* Image */}
              <motion.div
                key={selectedPhoto.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-[4/3] md:aspect-video"
              >
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  className="w-full h-full object-contain"
                />
              </motion.div>

              {/* Caption */}
              {selectedPhoto.caption && (
                <div className="p-4 md:p-6 text-center border-t border-border/30">
                  <p className="font-body text-lg md:text-xl text-foreground">
                    {selectedPhoto.caption}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {currentIndex + 1} de {photos.length}
                  </p>
                </div>
              )}

              {/* Mobile Swipe Hint */}
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-1 md:hidden">
                {photos.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === currentIndex ? "bg-primary" : "bg-primary/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Mobile Navigation Buttons (visible when lightbox is open) */}
      {selectedPhoto && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] flex gap-4 md:hidden">
          <Button
            variant="outline"
            size="icon"
            className="bg-background/90 backdrop-blur-sm rounded-full w-12 h-12"
            onClick={goToPrevious}
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-background/90 backdrop-blur-sm rounded-full w-12 h-12"
            onClick={goToNext}
            aria-label="Próxima foto"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      )}
    </section>
  );
};

export default PhotoGallerySection;
