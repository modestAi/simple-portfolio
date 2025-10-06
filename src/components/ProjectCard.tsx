import { useState, useRef, useEffect } from "react";
import { FaGithub } from "react-icons/fa6";
import { GoLinkExternal } from "react-icons/go";

interface CardProps {
  tech: string[];
  about: string;
  title: string;
  imgLink?: string;
  videoSrc?: string;
  thumbnail?: string;
  liveLink?: string;
  githubRepoLink?: string;
}

export default function Card({
  tech,
  about,
  title,
  imgLink,
  videoSrc,
  githubRepoLink,
  thumbnail,
  liveLink,
}: CardProps) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current && !entry.isIntersecting) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
          setPlaying(false);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col rounded-xl bg-black/10 border border-white/20 overflow-hidden backdrop-blur-md hover:translate-y-[-0.4em] hover:shadow-lg transition-transform duration-300"
    >
      <div className="relative h-56 w-full overflow-hidden cursor-pointer" onClick={videoSrc ? handlePlayClick : undefined} >
        {/* Poster / Video */}
        {videoSrc && (
          <>
            <img
              src={thumbnail || imgLink}
              alt={title}
              className={`w-full h-full object-cover transition-transform duration-500 ${playing ? "opacity-0" : "opacity-100"}`}
            />
            <video
              ref={videoRef}
              src={videoSrc.startsWith("/") ? videoSrc : `/${videoSrc}`}
              className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 ${playing ? "opacity-100" : "opacity-0"}`}
              muted
            />
            {!playing && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/40 transition">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 2v20l18-10L4 2z" />
                  </svg>
                </div>
              </div>
            )}
          </>
        )}
        {!videoSrc && imgLink && (
          <img src={imgLink} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        )}

        {/* Gradient overlay & title */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white drop-shadow-lg">{title}</h3>
      </div>

      {/* Card content */}
      <div className="p-4 flex flex-col gap-2">
        <p className="text-sm text-gray-300">{about}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {tech.map((t, idx) => (
            <span key={idx} className="bg-cyan-400/20 text-cyan-300 px-2 py-1 rounded-full text-xs font-semibold">
              {t}
            </span>
          ))}
        </div>

        <div className="w-full flex justify-between">

          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              className="mt-3 inline-flex items-center justify-center gap-1 text-sm text-amber-200 hover:text-white font-semibold transition-colors"
            >
              <span>Live link</span>
              <GoLinkExternal className="w-4 h-4" />
            </a>

          )}

          {githubRepoLink && (
            <a href={githubRepoLink} target="_blank" className="mt-3 text-sm text-slate-950
             hover:text-slate-800 font-semibold ">
              <FaGithub className="h-[1.5em] w-[1.5em]" />
            </a>
          )}
        </div>

      </div>
    </div>
  );
}
