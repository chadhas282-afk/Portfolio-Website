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
  }, [smoothProgress]);