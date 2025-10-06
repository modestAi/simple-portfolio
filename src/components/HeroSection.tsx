import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function FirstPart() {
  const string = "I make computer beep boop.";
  const stringArray = string.split("");
  const [displayedLetters, setDisplayedLetters] = useState<string[]>([
    stringArray[0],
  ]);

  const sineColor1 = "rgba(124,125,225,0.5)";
  const sineColor2 = "rgba(75,55,255,0.6)";

  // Typing effect
  useEffect(() => {
    if (displayedLetters.length >= stringArray.length) return;
    const timeout = setTimeout(() => {
      setDisplayedLetters((prev) => [...prev, stringArray[prev.length]]);
    }, 200);
    return () => clearTimeout(timeout);
  }, [displayedLetters, stringArray]);

  const curveCanvas = useRef<HTMLCanvasElement | null>(null);
  const gridCanvas = useRef<HTMLCanvasElement | null>(null);

  // Wave effect

  useEffect(() => {
    if (!curveCanvas.current) return;
    const ctx = curveCanvas.current.getContext("2d");
    if (!ctx) return;

    const amplitude = 50;
    const wavelength = 200;
    const speed = 0.00000004; // you had 0.00000004, probably too small

    let offset = 0;
    let pausedAt = 0;

    // Pause/resume handling
    function handleVisibility() {
      if (document.hidden) {
        pausedAt = performance.now();
      } else {
        offset += performance.now() - pausedAt;
      }
    }
    document.addEventListener("visibilitychange", handleVisibility);

    function draw(timestamp: DOMHighResTimeStamp) {
      if (!ctx || !curveCanvas.current) return;

      const { width, height } = curveCanvas.current;
      ctx.clearRect(0, 0, width, height);

      const phaseShift = Math.PI / 4;
      const centerY = height / 2;
      const simTime = timestamp - offset;
      const timePhase = simTime * speed;

      // First wave
      ctx.lineWidth = 5;
      ctx.strokeStyle = sineColor1;
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const y = yPos(0, "+x", centerY, amplitude, wavelength, simTime, timePhase, x);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Second wave
      ctx.beginPath();
      ctx.strokeStyle = sineColor2;
      for (let x = 0; x < width; x++) {
        const y = yPos(phaseShift, "-x", centerY, amplitude, wavelength, simTime, timePhase, x);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      requestAnimationFrame(draw);
    }

    function resizeCanvas() {
      if (!curveCanvas.current) return;
      curveCanvas.current.width = window.innerWidth;
      curveCanvas.current.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // Grid effect
  useLayoutEffect(() => {

    if (!gridCanvas.current) return;
    const ctx = gridCanvas.current.getContext("2d");
    if (!ctx) return;
    const width = (gridCanvas.current.width = window.innerWidth);
    const height = (gridCanvas.current.height = window.innerHeight);

    function drawGrid() {
      const imageData = ctx!.createImageData(width, height);
      const data = imageData.data;

      for (let y = 0; y < height; y++) {
        const multiplier = (height - y) / height;
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          if (x % 25 === 0 || y % 25 === 0) {
            data[idx] = 155;
            data[idx + 1] = 155;
            data[idx + 2] = 255;
            data[idx + 3] = 90 * multiplier;
          }
        }
      }
      ctx!.putImageData(imageData, 0, 0);
    }

    drawGrid();
    window.addEventListener("resize", drawGrid);
    return () => window.removeEventListener("resize", drawGrid);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-900 via-cyan-950 to-slate-800 overflow-hidden">
      <canvas
        ref={gridCanvas}
        className="absolute top-0 left-0 w-screen h-screen block"
      />
      <canvas
        ref={curveCanvas}
        className="absolute top-0 left-0 w-screen h-screen block"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-evenly z-10 px-4 text-center">
        <p className="text-white/85 text-3xl sm:text-4xl">
          I'm
          <a href="https://github.com/modestAi" target="_blank" className="bg-orange-300/10 mx-2 p-2 text-orange-300/70 hover:text-orange-300/90 transition-colors text-5xl border border-orange-  300/50 font-semibold">
            @modestAi
          </a>
          .
        </p>

        <div className="text-green-500 text-2xl sm:text-3xl md:text-4xl font-mono break-words max-w-full flex flex-wrap justify-center">
          {displayedLetters.map((char, index) => (
            <motion.span
              key={index}
              className="inline-block"
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}

function yPos(
  phaseShift: number,
  dir: "-x" | "+x",
  centerShiftPixelBase: number,
  amplitude: number,
  wavelength: number,
  deltaTime: number,
  timeMultiplier: number,
  xPos: number
) {
  const valInsideSin = (2 * Math.PI * xPos) / wavelength + phaseShift;
  const timePhase = deltaTime * timeMultiplier;
  const sineValue = dir === "+x" ?
    Math.sin(valInsideSin - timePhase) :
    Math.sin(valInsideSin + timePhase);

  return sineValue * amplitude + centerShiftPixelBase;
}
