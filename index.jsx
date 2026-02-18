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
