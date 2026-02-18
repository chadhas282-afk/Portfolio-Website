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

