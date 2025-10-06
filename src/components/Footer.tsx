import { FaGithub, FaDiscord } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative z-20 w-full bg-black/80 backdrop-blur-md text-white/70 py-6 px-6 border-t border-white/10">
      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:items-center max-w-7xl mx-auto">

        <div className="text-sm flex items-center gap-1">
          <FaRegCopyright />
          <span>{new Date().getFullYear()}</span>
          <span className="font-bold text-white ml-1">@modestAi.</span>
        </div>


        <div className="flex gap-6">
          <a
            href="https://github.com/modestAi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="hover:text-white transition-colors duration-300 transform hover:scale-110"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://discordapp.com/users/746633892542283848"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord Profile"
            className="hover:text-[#5865F2] transition-colors duration-300 transform hover:scale-110"
          >
            <FaDiscord size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
