import { useEffect, useRef } from "react";
import Card from "./ProjectCard";
import PerlinNoise2D from "../utils/PerlinNoiseHelper";

export default function AnimatedPerlin() {
  const ref = useRef<HTMLCanvasElement | null>(null);


  useEffect(() => {
    if (!ref.current) return;

    const canvas = ref.current;
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scale = 0.02; // noise scale

    function draw() {

      const imageData = ctx!.createImageData(width, height);
      const data = imageData.data;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const value = PerlinNoise2D(x * scale, y * scale);
          const color = Math.floor((value + 1) * 128);

          const idx = (y * width + x) * 4;
          data[idx] = Math.min(255, color);
          data[idx + 1] = Math.min(255, color);
          data[idx + 2] = Math.min(255, color);
          data[idx + 3] = 225;
        }
      }
      ctx!.putImageData(imageData, 0, 0);
    }
    draw();

  }, []);

  return (
    <div className="relative">
      <canvas
        ref={ref}
        className="absolute inset-0 z-0 w-full h-full"
      />
      <div className="absolute inset-0 z-10 gradient-my pointer-events-none" />
      <section className="relative z-20 min-h-screen flex flex-col items-center gap-10 py-6 px-1 text-amber-50 w-full">
        <div className="inline-flex border-[1px] border-pink-700/80 bg-pink-800/40 p-2 items-center gap-2">
          <span
            className="text-2xl md:text-3xl text-white font-bold"
            aria-hidden="true"
          >
            #
          </span>
          <h3 className="text-xl md:text-2xl font-mono tracking-tighter text-pink-200 lowercase">
            recent projects
          </h3>
        </div>
        <div className="grid gap-6 w-full max-w-full [grid-template-columns:repeat(auto-fit,minmax(min(350px,100%),1fr))]">
          <Card
            videoSrc="/demo1.mp4"
            thumbnail="/demo1.png"
            liveLink="https://boids-simulation.netlify.app"
            about="An interactive boids simulation. Features real-time controls for experimenting with flocking behaviors and animation tuning that result naturally from individual factors."
            tech={["canvas API", "typescript", "simulation", "animation"]}
            title="Flocking Boids"
            githubRepoLink="https://github.com/modestAi/boids"
          />

          <Card
            videoSrc="/demo2.mp4"
            thumbnail="/demo2.png"
            liveLink="https://vectorviz.netlify.app"
            about="A 3D vector visualizer. Supports customization, interactive exploration, and point view mode."
            tech={["react", "typescript", "react-three-fiber"]}
            title="VectorViz"
            githubRepoLink="https://github.com/modestAi/VectorViz"
          />
        </div>
      </section>
    </div>
  )
}



