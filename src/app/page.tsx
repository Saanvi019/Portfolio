"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Mail } from "lucide-react";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isNameHovered, setIsNameHovered] = useState(false);
  const [isRoleHovered, setIsRoleHovered] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const blackOverlayOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 1]);
  const elementOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const orbitScale = useTransform(scrollYProgress, [0, 0.4], [1, 6]);
  const astroScale = useTransform(scrollYProgress, [0.25, 0.75], [1, 0.1]);
  const astroOpacity = useTransform(scrollYProgress, [0.25, 0.75], [1, 0]);
  const astroYScroll = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-full bg-black text-black font-sans">
      {/* Scroll Timeline Container */}
      <div ref={containerRef} className="relative h-[150vh] w-full">
        {/* Sticky Hero Viewport */}
        <motion.div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex flex-col bg-[#f4f4f5]">
          <motion.div style={{ opacity: blackOverlayOpacity }} className="absolute inset-0 bg-black pointer-events-none z-50" />
          {/* Header / Nav */}
          <motion.header style={{ opacity: elementOpacity }} className="absolute top-0 w-full flex justify-between items-center p-8 sm:p-12 z-30 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-xs sm:text-sm font-[700] uppercase text-black tracking-widest"
            >
              SAANVI
            </motion.div>

            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="hidden sm:flex items-center gap-6 text-[10px] sm:text-xs font-[500] uppercase text-black tracking-widest"
            >
              {["HOME", "ABOUT", "MISSIONS", "EXPERIENCE", "SYSTEMS", "CONTACT"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="hover:opacity-50 transition-opacity">
                  {item}
                </a>
              ))}
            </motion.nav>
          </motion.header>

          {/* Main Content */}
          <main className="relative flex-1 flex items-center justify-center z-10 w-full h-full">

            {/* Orbital System (SVG) */}
            <motion.div
              style={{ scale: orbitScale, opacity: elementOpacity }}
              className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none"
            >
              <motion.div
                className="absolute flex items-center justify-center pointer-events-none w-[95vw] h-[95vw] sm:w-[85vw] sm:h-[85vw] max-w-[1000px] max-h-[1000px] z-0"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{
                  rotate: mousePosition.x * 0.02,
                }}
              >
                <svg viewBox="0 0 1000 1000" className="w-full h-full" overflow="visible">
                  <defs>
                    {/* Inner Orbit Path for Text - Left Arc (bottom to top-right) - Desktop */}
                    <path
                      id="inner-left-arc"
                      d="M 500, 830 A 330 330 0 1 1 830, 500"
                      fill="transparent"
                    />
                    {/* Inner Orbit Path for Text - Left Arc - Mobile */}
                    <path
                      id="inner-left-arc-mobile"
                      d="M 500, 880 A 380 380 0 1 1 880, 500"
                      fill="transparent"
                    />
                    {/* Outer Orbit Path for Text - Right Arc (top to bottom-left) - Clockwise for Desktop */}
                    <path
                      id="outer-right-arc"
                      d="M 500, 0 A 500 500 0 1 1 0, 500"
                      fill="transparent"
                    />
                    {/* Outer Orbit Path for Text - Mobile (bottom-left to top) - Anti-Clockwise for Mobile */}
                    <path
                      id="outer-right-arc-mobile"
                      d="M -150, 500 A 650 650 0 1 0 500, -150"
                      fill="transparent"
                    />
                  </defs>

                  {/* Exactly 2 Circles */}
                  {/* Inner Circle (DESKTOP) */}
                  <circle cx="500" cy="500" r="330" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1" className="hidden sm:block" />

                  {/* Inner Circle (MOBILE) */}
                  <circle cx="500" cy="500" r="380" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1" className="block sm:hidden" />

                  {/* Outer Circle (DESKTOP) */}
                  <circle cx="500" cy="500" r="500" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1" className="hidden sm:block" />

                  {/* Outer Circle (MOBILE) */}
                  <circle cx="500" cy="500" r="650" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1" className="block sm:hidden" />

                  {/* Typography: Inner Left Arc (DESKTOP) */}
                  <g className="hidden sm:block">
                    <text
                      fill="transparent"
                      fontSize="80"
                      fontWeight="800"
                      letterSpacing="0.1em"
                      dominantBaseline="middle"
                      className="uppercase font-sans cursor-pointer pointer-events-auto"
                      onMouseEnter={() => setIsNameHovered(true)}
                      onMouseLeave={() => setIsNameHovered(false)}
                    >
                      <textPath href="#inner-left-arc" startOffset="37%" textAnchor="middle">
                        SAANVI SHARMA
                      </textPath>
                    </text>

                    <text fill="black" fontSize="80" fontWeight="800" letterSpacing="0.1em" dominantBaseline="middle" className="uppercase font-sans pointer-events-none">
                      <motion.textPath
                        href="#inner-left-arc"
                        animate={{ startOffset: isNameHovered ? "42%" : "37%" }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        textAnchor="middle"
                      >
                        SAANVI SHARMA
                      </motion.textPath>
                    </text>
                  </g>

                  {/* Typography: Inner Left Arc (MOBILE) */}
                  <g className="block sm:hidden">
                    <text
                      fill="transparent"
                      fontSize="80"
                      fontWeight="800"
                      letterSpacing="0.1em"
                      dominantBaseline="middle"
                      className="uppercase font-sans cursor-pointer pointer-events-auto"
                      onMouseEnter={() => setIsNameHovered(true)}
                      onMouseLeave={() => setIsNameHovered(false)}
                    >
                      <textPath href="#inner-left-arc-mobile" startOffset="37%" textAnchor="middle">
                        SAANVI SHARMA
                      </textPath>
                    </text>

                    <text fill="black" fontSize="80" fontWeight="800" letterSpacing="0.1em" dominantBaseline="middle" className="uppercase font-sans pointer-events-none">
                      <motion.textPath
                        href="#inner-left-arc-mobile"
                        animate={{ startOffset: isNameHovered ? "42%" : "37%" }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        textAnchor="middle"
                      >
                        SAANVI SHARMA
                      </motion.textPath>
                    </text>
                  </g>

                  {/* Typography: Outer Right Arc (DESKTOP) */}
                  <g className="hidden sm:block">
                    {/* Ghost Text for stable hover detection */}
                    <text
                      fill="transparent"
                      fontSize="50"
                      fontWeight="800"
                      letterSpacing="0.05em"
                      dominantBaseline="middle"
                      className="uppercase font-sans cursor-pointer pointer-events-auto"
                      onMouseEnter={() => setIsRoleHovered(true)}
                      onMouseLeave={() => setIsRoleHovered(false)}
                    >
                      <textPath href="#outer-right-arc" startOffset="40%" textAnchor="middle">
                        WEB DEVELOPER
                      </textPath>
                    </text>

                    {/* Actual Animated Text */}
                    <text fill="black" fontSize="50" fontWeight="800" letterSpacing="0.05em" dominantBaseline="middle" className="uppercase font-sans pointer-events-none">
                      <motion.textPath
                        href="#outer-right-arc"
                        animate={{ startOffset: isRoleHovered ? "35%" : "40%" }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        textAnchor="middle"
                      >
                        WEB DEVELOPER
                      </motion.textPath>
                    </text>
                  </g>

                  {/* Typography: Outer Right Arc (MOBILE) */}
                  <g className="block sm:hidden">
                    {/* Ghost Text for stable hover detection */}
                    <text
                      fill="transparent"
                      fontSize="50"
                      fontWeight="800"
                      letterSpacing="0.05em"
                      dominantBaseline="middle"
                      className="uppercase font-sans cursor-pointer pointer-events-auto"
                      onMouseEnter={() => setIsRoleHovered(true)}
                      onMouseLeave={() => setIsRoleHovered(false)}
                    >
                      <textPath href="#outer-right-arc-mobile" startOffset="42%" textAnchor="middle">
                        WEB DEVELOPER
                      </textPath>
                    </text>

                    {/* Actual Animated Text */}
                    <text fill="black" fontSize="50" fontWeight="800" letterSpacing="0.05em" dominantBaseline="middle" className="uppercase font-sans pointer-events-none">
                      <motion.textPath
                        href="#outer-right-arc-mobile"
                        animate={{ startOffset: isRoleHovered ? "47%" : "42%" }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        textAnchor="middle"
                      >
                        WEB DEVELOPER
                      </motion.textPath>
                    </text>
                  </g>

                  {/* Annotations */}
                  {/* Outer Orbit Left Annotation (CSE//2027) */}
                  <g className="hidden sm:block" transform="translate(8, 587)">
                    <circle cx="0" cy="0" r="4" fill="black" />
                    <text x="14" y="4" fill="black" fontSize="13" fontWeight="500" className="uppercase tracking-widest">
                      CSE//2027
                    </text>
                  </g>
                  {/* Mobile Outer Annotation (r=650 -> angle=170 -> 500+650*cos(170)=-140, 500+650*sin(170)=612) */}
                  <g className="block sm:hidden" transform="translate(-140, 612)">
                    <circle cx="0" cy="0" r="4" fill="black" />
                    <text x="14" y="4" fill="black" fontSize="13" fontWeight="500" className="uppercase tracking-widest">
                      CSE//2027
                    </text>
                  </g>

                  {/* Inner Orbit Lower Annotation (22, INDIA) */}
                  <g className="hidden sm:block" transform="translate(665, 786)">
                    <circle cx="0" cy="0" r="4" fill="black" />
                    <text x="14" y="4" fill="black" fontSize="13" fontWeight="500" className="uppercase tracking-widest">
                      22, INDIA
                    </text>
                  </g>
                  <g className="block sm:hidden" transform="translate(690, 829)">
                    <circle cx="0" cy="0" r="4" fill="black" />
                    <text x="14" y="4" fill="black" fontSize="13" fontWeight="500" className="uppercase tracking-widest">
                      22, INDIA
                    </text>
                  </g>

                  {/* Inner Orbit Lower Right Annotation (CONTACT ME) */}
                  <g className="hidden sm:block" transform="translate(799, 361)">
                    <a href="#contact" className="pointer-events-auto cursor-pointer group">
                      <circle cx="0" cy="0" r="12" fill="black" className="group-hover:scale-150 transition-transform" />
                      <text x="24" y="5" fill="black" fontSize="14" fontWeight="600" className="uppercase tracking-widest group-hover:opacity-70">
                        CONTACT ME
                      </text>
                    </a>
                  </g>
                  <g className="block sm:hidden" transform="translate(844, 339)">
                    <a href="#contact" className="pointer-events-auto cursor-pointer group">
                      <circle cx="0" cy="0" r="12" fill="black" className="group-hover:scale-150 transition-transform" />
                      <text x="24" y="5" fill="black" fontSize="14" fontWeight="600" className="uppercase tracking-widest group-hover:opacity-70">
                        CONTACT ME
                      </text>
                    </a>
                  </g>
                </svg>
              </motion.div>
            </motion.div>

            {/* Astronaut Hero Image */}
            <motion.div
              style={{ scale: astroScale, opacity: astroOpacity, y: astroYScroll }}
              className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            >
              <motion.div
                className="relative z-20 h-[75vw] sm:h-[85vh] aspect-[3/4] max-h-[1000px] pointer-events-none mt-[10vw] sm:mt-[12vh]"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  x: mousePosition.x * -0.5,
                  y: mousePosition.y * -0.5,
                }}
              >
                <Image
                  src="/astro-2.png"
                  alt="Astronaut"
                  fill
                  className="object-contain object-center drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                  priority
                />
              </motion.div>
            </motion.div>

            {/* Bottom Left Status Indicator */}
            <motion.div style={{ opacity: elementOpacity }} className="absolute bottom-6 left-6 sm:bottom-12 sm:left-12 z-50 flex items-center gap-3 sm:gap-4">
              <div className="relative flex h-2 w-2 sm:h-3 sm:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-3 sm:w-3 bg-green-500"></span>
              </div>
              <span className="text-[10px] sm:text-sm font-bold tracking-[0.25em] uppercase text-black">
                Active
              </span>
            </motion.div>

            {/* Bottom Right Social Links */}
            <motion.div style={{ opacity: elementOpacity }} className="absolute bottom-6 right-6 sm:bottom-12 sm:right-12 z-50 flex gap-4 sm:gap-6 items-baseline">
              <a
                href="https://github.com/Saanvi019"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                title="GitHub"
                className="text-black hover:-translate-y-1 hover:opacity-60 transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
              </a>
              <a
                href="https://www.linkedin.com/in/saanvi-sharma-468202215"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                title="LinkedIn"
                className="text-black hover:-translate-y-1 hover:opacity-60 transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
              <a
                href="mailto:saanvi.s019@gmail.com"
                aria-label="Send Email"
                title="Email"
                className="text-black hover:-translate-y-1 hover:opacity-60 transition-all duration-300"
              >
                <Mail className="w-5 h-5" strokeWidth={1.5} />
              </a>
            </motion.div>

          </main>
        </motion.div>
      </div>

      {/* Deep Space Profile Section */}
      <section className="relative w-full min-h-screen bg-black text-white flex flex-col items-center z-10 pb-0 overflow-hidden" id="about">

        {/* Dotted Grid Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 mt-4">
          <div className="w-[120vw] h-[120vw] sm:w-[80vw] sm:h-[80vw] max-w-[800px] max-h-[800px] rounded-full"
            style={{
              backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              WebkitMaskImage: "radial-gradient(circle, black 20%, transparent 60%)",
              maskImage: "radial-gradient(circle, black 20%, transparent 60%)"
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-4xl px-4 sm:px-8 py-16 flex flex-col items-center border border-dashed border-zinc-700 mt-16 sm:mt-24 mb-16 bg-black/50 backdrop-blur-sm">

          {/* ABOUT ME in Center of Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative flex flex-col items-center text-center mb-32 sm:mb-48"
          >
            {/* Metadata Elements */}
            <div className="absolute -top-12 flex items-center gap-3 text-[10px] text-zinc-500 tracking-[0.3em]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,1)]"></span>
              </span>
              ACTIVE
            </div>

            <h2 className="text-xl md:text-3xl font-[800] tracking-[0.2em] text-zinc-300 mb-12 uppercase text-center">
              ABOUT ME
            </h2>
            <div className="max-w-xl text-sm md:text-base text-zinc-300 leading-relaxed tracking-wider font-[400] space-y-6">
              <p>
                I like solving problems that developers face every day. Having experienced those problems myself, I believe technology should remove friction rather than create more of it.
              </p>
              <p className="leading-relaxed">
                <motion.span
                  initial={{ backgroundSize: "0% 100%", color: "#d4d4d8" }}
                  whileInView={{ backgroundSize: "100% 100%", color: "#000000" }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="inline box-decoration-clone px-1 py-[2px]"
                  style={{
                    backgroundImage: "linear-gradient(to right, white 0%, white 100%)",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "0 0",
                    WebkitBoxDecorationBreak: "clone",
                    boxDecorationBreak: "clone",
                  }}
                >
                  I'm a Full Stack Developer who likes understanding how things work, figuring out why they don't, and building a simpler way forward.
                </motion.span>
              </p>
              <p className="text-xs tracking-[0.2em] text-zinc-500 uppercase mt-8 leading-loose">
                Web is my current orbit. AI is a new one I'm exploring. And building is how I navigate between them.
              </p>
              <p className="text-xs tracking-[0.2em] font-bold text-white uppercase mt-4">
                There’s still a lot of space left to explore.
              </p>
            </div>
          </motion.div>

          {/* SYSTEMS (Tech Stack) */}
          <motion.div
            id="systems"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full flex flex-col mb-24 sm:mb-32"
          >
            <h3 className="text-xl md:text-3xl font-[800] tracking-[0.2em] text-zinc-300 mb-12 uppercase text-center">
              Systems
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12 text-center sm:text-left mx-auto">
              <TechCategory title="FRONTEND" items="React · Next.js · TypeScript · Tailwind" />
              <TechCategory title="BACKEND" items="Node.js · Express · REST APIs" />
              <TechCategory title="DATABASE" items="PostgreSQL · MongoDB · Firebase" />
              <TechCategory title="AI" items="Gemini · Hugging Face · Generative AI" />
              <TechCategory title="TOOLS" items="Git · GitHub · Docker · Postman" />
            </div>
          </motion.div>

          {/* FLIGHT LOG (Experience) */}
          <motion.div
            id="experience"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full flex flex-col items-center mb-24 sm:mb-32"
          >
            <h3 className="text-xl md:text-3xl font-[800] tracking-[0.2em] text-zinc-300 mb-16 uppercase text-center">
              Flight Log
            </h3>

            <div className="relative flex flex-col items-center w-full max-w-2xl">
              {/* Vertical Line */}
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                viewport={{ once: true }}
                className="absolute left-0 sm:left-[40%] top-0 w-[1px] bg-zinc-800 -translate-x-1/2"
              />

              <FlightLogItem
                year="2026"
                role="FULL STACK DEVELOPER INTERN"
                company="PINGIFF LLP"
                description="Developed and maintained the company's product website. Built production management dashboard for managing products, QR codes, vehicles, articles, and other application data. Designed production-ready QR keychains and stickers for commercial use."
              />
              <FlightLogItem
                year="2025"
                role="SUMMER INTERN"
                company="EMBEDDED CONTROL SYSTEMS"
                description="Built a real-time video calling and chat application with authentication and call history, delivering a seamless full-stack communication experience."
              />
            </div>
          </motion.div>

          {/* MISSION ACCORDION */}
          <MissionAccordion />

          {/* MISSION ACTIONS (Buttons) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="w-full max-w-md flex flex-col gap-6"
          >
            <a href="/resume.pdf" target="_blank" className="w-full border border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900 transition-colors text-center py-6 uppercase text-[10px] tracking-[0.3em] font-[500] text-zinc-300 hover:text-white">
              View Resume ↗
            </a>
          </motion.div>

        </div>
      </section>

      {/* CONTACT ME SECTION */}
      <footer className="w-full flex justify-center pt-0 pb-24 sm:pt-4 sm:pb-32 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="w-full max-w-4xl px-8 flex flex-col items-center justify-center gap-12 text-center"
        >
          {/* Top Text */}
          <span className="text-[10px] text-zinc-600 tracking-[0.3em] uppercase">Let's Connect</span>

          {/* Centered Image with Button Overlay */}
          <div className="relative w-full max-w-[400px] flex justify-center items-center">
            <Image
              src="/reachme.png"
              alt="Contact Me"
              width={600}
              height={600}
              className="w-full h-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            />

            {/* Edge Fade Overlays */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black to-transparent pointer-events-none" />

            {/* Center Button */}
            <div className="absolute z-10 translate-y-16 flex justify-center items-center">
              <motion.a
                href="mailto:hello@example.com"
                className="border border-green-400/80 bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-xs tracking-[0.3em] font-[600] px-6 sm:px-8 py-4 rounded-full uppercase cursor-pointer shadow-[0_0_50px_rgba(34,197,94,0.8)] transition-all duration-300"
                whileHover={{
                  scale: 1.15,
                  boxShadow: "0px 0px 100px rgba(34,197,94,1), inset 0px 0px 20px rgba(34,197,94,0.5)",
                  borderColor: "rgba(74, 222, 128, 1)",
                  transition: { duration: 0.2 }
                }}
              >
                Send a signal
              </motion.a>
            </div>
          </div>
        </motion.div>
      </footer>
    </div>

  );
}

function TechCategory({ title, items }: { title: string, items: string }) {
  return (
    <div className="flex flex-col mb-4">
      <span className="text-[10px] text-zinc-600 tracking-[0.3em] mb-3">{title}</span>
      <span className="text-xs sm:text-sm text-zinc-300 tracking-widest font-[400] leading-relaxed hover:text-white transition-colors">{items}</span>
    </div>
  )
}

function FlightLogItem({ year, role, company, description }: { year: string, role: string, company: string, description: string }) {
  return (
    <div className="relative w-full flex flex-col sm:flex-row items-start sm:items-center justify-between mb-20 pl-8 sm:pl-0">
      <div className="absolute left-0 sm:left-[40%] w-2 h-2 rounded-full bg-black border border-zinc-600 -translate-x-1/2 mt-1.5 sm:mt-0 z-10" />

      <div className="sm:w-[40%] sm:pr-16 text-left sm:text-right mb-4 sm:mb-0 flex flex-col">
        <span className="text-[10px] text-zinc-600 tracking-[0.3em]">{year}</span>
      </div>
      <div className="sm:w-[60%] sm:pl-16 text-left flex flex-col">
        <span className="text-xs sm:text-sm font-[600] tracking-widest mb-2 text-zinc-200">{role}</span>
        <span className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase mb-4">{company}</span>
        <span className="text-xs text-zinc-400 tracking-widest leading-relaxed max-w-xs">{description}</span>
      </div>
    </div>
  )
}

const PROJECTS = [
  {
    id: "01",
    name: "BridgePR",
    subtitle: "GitHub App for PR Impact Detection",
    desc: "BridgePR analyzes backend API changes in pull requests and warns when frontend code depends on them, before they reach production.",
    tech: "Node.js · GitHub API · React",
    status: "DEPLOYED",
    image: "/bridgepr/BP-hero.png",
    collapsedStyle: "bg-gradient-to-r from-[#141205] via-[#1a1707] to-[#0d0c03]"
  },
  {
    id: "02",
    name: "CommitAI",
    desc: "Meet the CLI tool that analyzes your staged changes, automates commit generation, and keeps you in the flow.",
    tech: "Python · OpenAI · Git",
    status: "DEPLOYED",
    image: "/commitAI/CA-hero.png",
    collapsedStyle: "bg-gradient-to-r from-[#071206] via-[#0a1a08] to-[#050d04]"
  },
  {
    id: "03",
    name: "Veylox",
    desc: "Your secrets deserve better than scattered .env files. Stay secure while your projects scale. Built for developers who care about control and security.",
    tech: "Next.js · Postgres · Security",
    status: "DEPLOYED",
    image: "/veylox/veylox-hero.png",
    collapsedStyle: "bg-gradient-to-r from-[#050914] via-[#070e1c] to-[#03060d]"
  }
];

function MissionAccordion() {
  const [active, setActive] = useState(1);

  return (
    <div className="w-full flex flex-col mb-24 mt-0 px-0 sm:px-8">
      <h3 className="text-xl md:text-3xl font-[800] tracking-[0.2em] text-zinc-300 mb-12 uppercase text-center w-full">Missions</h3>

      <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto">
        {PROJECTS.map((project, i) => {
          const isActive = active === i;

          return (
            <motion.div
              key={project.id}
              layout
              onClick={() => setActive(i)}
              className={`relative overflow-hidden cursor-pointer transition-shadow duration-300 flex flex-col shadow-2xl mx-auto ${isActive ? "w-full rounded-2xl aspect-[3/4] sm:aspect-[1502/716] h-auto min-h-[350px] sm:min-h-0 shadow-black/80 bg-[#050505]" : `w-[94%] rounded-full h-14 sm:h-16 aspect-auto shadow-black/40 hover:shadow-black/60 ${project.collapsedStyle || "bg-[#050505]"}`
                }`}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* COLLAPSED CONTENT */}
              <motion.div
                className="absolute inset-0 flex items-center justify-between px-6 sm:px-10 w-full h-14 sm:h-16 pointer-events-none"
                animate={{ opacity: isActive ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-[10px] sm:text-xs tracking-[0.3em] text-zinc-500 uppercase w-1/3">
                  MISSION // {project.id}
                </span>
                <span className="text-xs sm:text-sm font-[600] tracking-widest text-zinc-300 uppercase w-1/3 text-center">
                  {project.name}
                </span>
                <span className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase w-1/3 text-right hidden sm:block">
                  {project.status}
                </span>
                <span className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase w-1/3 text-right block sm:hidden">
                  +
                </span>
              </motion.div>

              {/* EXPANDED CONTENT */}
              <motion.div
                className="absolute inset-0 w-full h-full pointer-events-none"
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.4, delay: isActive ? 0.2 : 0 }}
              >
                {/* Background Image */}
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                ) : (
                  <div className="absolute inset-0 bg-zinc-900" />
                )}

                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between pt-6 px-6 pb-2 sm:pt-8 sm:px-10 sm:pb-4 z-10">
                  {/* Top Bar */}
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] tracking-[0.3em] text-white/70 uppercase bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">MISSION // {project.id}</span>
                    <span className="text-[10px] tracking-[0.3em] text-white/70 uppercase bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">{project.status}</span>
                  </div>

                  {/* Bottom Content */}
                  <div className="flex justify-between items-end w-full">
                    <div className="flex flex-col text-left max-w-[85%] sm:max-w-[80%] pr-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                      <h2 className="text-2xl sm:text-4xl font-[800] tracking-widest text-white mb-1 sm:mb-2 leading-tight">{project.name}</h2>
                      {project.subtitle && <h3 className="text-[10px] sm:text-sm font-[600] tracking-widest text-zinc-300 mb-2 uppercase">{project.subtitle}</h3>}
                      <p className="text-[10px] sm:text-sm text-zinc-300 font-[400] leading-relaxed max-w-md hidden sm:block">{project.desc}</p>
                    </div>

                    {/* Arrow Button */}
                    <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center pointer-events-auto hover:bg-white/20 transition-colors shrink-0 mb-2 mr-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>

            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
