import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function AnimatedPortfolio(){
  return (
    <div className="bg-black text-white font-sans selection:bg-blue-500">
      <HeroSection />
      <SelectedWorks />
      <TechnicalArsenal />
      <footer className="py-20 text-center border-t border-gray-900">
        <h2 className="text-4xl font-bold mb-4">Let's build something together.</h2>
        <p className="text-gray-400 font-mono text-lg">chadhas282@gmail.com</p>
      </footer>
    </div>
  );
}
function HeroSection() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      if (videoRef.current) {
        const duration = videoRef.current.duration || 0;
        videoRef.current.currentTime = latest * duration;
      }
    });
    return () => unsubscribe();
  }, [smoothProgress])};
const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.25], [1, 1, 0]);
const opacity2 = useTransform(scrollYProgress, [0.3, 0.4, 0.55], [0, 1, 0]);
const opacity3 = useTransform(scrollYProgress, [0.6, 0.7, 0.9], [0, 1, 1]);
return (
    <section ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background Video */}
        <video
          ref={videoRef}
          src="/hero-video.mp4" 
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-[0.45]"
        />

        {/* Content Overlays */}
        <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
          <motion.div style={{ opacity: opacity1 }} className="absolute">
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter">Sahil Chadha</h1>
            <p className="text-xl text-blue-400 mt-4 font-mono tracking-widest uppercase">Full Stack Architect</p>
          </motion.div>

          <motion.div style={{ opacity: opacity2 }} className="absolute max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Crafting <span className="text-blue-500">distributed systems</span> and immersive user experiences.
            </h2>
          </motion.div>

          <motion.div style={{ opacity: opacity3 }} className="absolute">
            <h2 className="text-4xl md:text-6xl font-bold">
              Engineering with <span className="text-white border-b-4 border-blue-600">Precision.</span>
            </h2>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
            {[...Array(3)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/40" />)}
        </div>
      </div>
    </section>
  );
function SelectedWorks() {
  const projects = [
    { title: "Samrt Dashboard", category: "Microservices", span: "md:col-span-2" },
    { title: "QR Generator", category: "E-commerce", span: "md:col-span-1" },
    { title: "Calorie Tracker", category: "Storage", span: "md:col-span-1" },
    { title: "Campus Energy Dashboard", category: "Web App", span: "md:col-span-1" },
    { title: "Quiz Generator", category: "Web App", span: "md:col-span-1" },
  ];
return (
    <section className="py-32 px-6 md:px-20 bg-black">
      <h3 className="text-blue-500 font-mono uppercase tracking-widest text-sm mb-4">Case Studies</h3>
      <h2 className="text-5xl font-bold mb-16">Selected Works</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((proj, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -8, borderColor: '#3b82f6' }}
            className={`${proj.span} group relative h-96 bg-[#080808] border border-gray-800 rounded-3xl overflow-hidden p-10 flex flex-col justify-end transition-colors`}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-black/20 to-black/90 z-0" />
            <div className="relative z-10">
               <p className="text-blue-500 text-sm font-mono mb-2">{proj.category}</p>
               <h4 className="text-3xl font-bold tracking-tight">{proj.title}</h4>
            </div>
            <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <div className="w-64 h-64 bg-blue-600 rounded-full blur-[100px]" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
function TechnicalArsenal() {
    const skills = {
        Core: [, "Next.js", "React.js", "Tailwind"],
        Systems: ["Node.js", "MongoDB", "PostgreSQL"],
        DevOps: ["AWS", "Docker", "CI/CD"]
    };
