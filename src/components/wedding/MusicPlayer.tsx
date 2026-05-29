import { useState, useEffect, useRef } from "react";
import { Music, Pause, Play, SkipForward } from "lucide-react";

// -------------------------------------------------------
// Adicione aqui os arquivos de música que estão em public/music/
// O "title" aparece no player. O "file" é o caminho a partir de public/.
// -------------------------------------------------------
const SONGS = [
  {
    title: "Beautiful Things – Benson Boone",
    file: "/music/Benson_Boone_-_Beautiful_Things_(mp3.pm).mp3",
  },
];
// -------------------------------------------------------

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isPlayingRef = useRef(false);
  const firstMount = useRef(true);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onEnded = () => setCurrentIndex((i) => (i + 1) % SONGS.length);
    audio.addEventListener("ended", onEnded);

    // Inicia mutado — navegadores permitem autoplay sem som
    // Desmuta no primeiro gesto do visitante (click, scroll ou toque)
    audio.muted = true;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        const unmute = () => { audio.muted = false; };
        document.addEventListener("click", unmute, { once: true });
        document.addEventListener("scroll", unmute, { once: true });
        document.addEventListener("touchstart", unmute, { once: true });
      })
      .catch(() => {
        // Fallback: se até o autoplay mutado falhar, toca no primeiro gesto
        const onInteract = () => {
          audio.muted = false;
          audio.play().then(() => setIsPlaying(true)).catch(() => {});
        };
        document.addEventListener("click", onInteract, { once: true });
        document.addEventListener("scroll", onInteract, { once: true });
        document.addEventListener("touchstart", onInteract, { once: true });
      });

    return () => {
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
      return;
    }
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = SONGS[currentIndex].file;
    audio.load();
    if (isPlayingRef.current) {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [currentIndex]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.muted = false;
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const skipNext = () => setCurrentIndex((i) => (i + 1) % SONGS.length);

  return (
    <>
      <audio ref={audioRef} src={SONGS[0].file} preload="auto" />

      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-border rounded-full px-4 py-2 shadow-lg">
        <Music className="w-4 h-4 text-primary shrink-0" />

        <span
          className="text-xs text-primary max-w-[130px] truncate hidden sm:block"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {SONGS[currentIndex].title}
        </span>

        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pausar música" : "Tocar música"}
          className="p-1 hover:opacity-70 transition-opacity"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-primary fill-primary" />
          ) : (
            <Play className="w-4 h-4 text-primary fill-primary" />
          )}
        </button>

        {SONGS.length > 1 && (
          <button
            onClick={skipNext}
            aria-label="Próxima música"
            className="p-1 hover:opacity-70 transition-opacity"
          >
            <SkipForward className="w-4 h-4 text-primary" />
          </button>
        )}
      </div>
    </>
  );
};

export default MusicPlayer;
