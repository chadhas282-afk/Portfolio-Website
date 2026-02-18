import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// --- MAIN PAGE COMPONENT ---
export default function AnimatedPortfolio() {
  return (
    <div className="bg-black text-white font-sans selection:bg-blue-500">
      {/* 1. HERO SECTION (Video Scrubber) */}
      <HeroSection />

      {/* 2. SELECTED WORKS (Bento Grid) */}
      <SelectedWorks />

      {/* 3. TECHNICAL ARSENAL (Skills) */}
      <TechnicalArsenal />

      {/* 4. FOOTER / CONTACT */}
      <footer className="py-20 text-center border-t border-gray-900">
        <h2 className="text-4xl font-bold mb-4">Let's work together.</h2>
        <p className="text-gray-400">mohammed.fawaz@example.com</p>
      </footer>
    </div>
  );
}

// --- HERO SECTION WITH VIDEO SCROLL ---
function HeroSection() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll progress for the video playback
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      if (videoRef.current) {
        const duration = videoRef.current.duration || 0;
        // Logic: Map 0-1 scroll progress to 0-VideoDuration
        videoRef.current.currentTime = latest * duration;
      }
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  // Text Opacity Transforms
  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.25], [1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.4, 0.55], [0, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.7, 0.9], [0, 1, 1]);

  return (
    <section ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Video Background */}
        <video
          ref={videoRef}
          src="/hero-video.mp4" // Replace with your video path
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />

        {/* Floating Text Overlays */}
        <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
          <motion.div style={{ opacity: opacity1 }} className="absolute">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">Sahil Chadha</h1>
            <p className="text-xl text-gray-300 mt-4">Full Stack Developer</p>
          </motion.div>

          <motion.div style={{ opacity: opacity2 }} className="absolute max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
              Building <span className="text-blue-500">scalable microservices</span> & high-performance web apps.
            </h2>
          </motion.div>

          <motion.div style={{ opacity: opacity3 }} className="absolute">
            <h2 className="text-3xl md:text-5xl font-semibold">
              Expertise in <span className="text-purple-500">Next.js, Node.js & Cloud.</span>
            </h2>
          </motion.div>
        </div>
        
        {/* Scroll Indicator Dot Dots (Static Example) */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
            {[...Array(5)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-white/20" />)}
        </div>
      </div>
    </section>
  );
}

// --- BENTO GRID PROJECTS ---
function SelectedWorks() {
  const projects = [
    { title: "Elite Hotel", category: "Microservices", span: "md:col-span-2" },
    { title: "Netcart", category: "E-commerce", span: "md:col-span-1" },
    { title: "Dropbox Clone", category: "Storage", span: "md:col-span-1" },
    { title: "Blog Platform", category: "Architecture", span: "md:col-span-1" },
    { title: "Bookstore", category: "Web App", span: "md:col-span-1" },
  ];

  return (
    <section className="py-24 px-6 md:px-20 bg-black">
      <h3 className="text-gray-500 uppercase tracking-widest text-sm mb-4">Portfolio</h3>
      <h2 className="text-4xl font-bold mb-12">Selected Works</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((proj, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className={`${proj.span} group relative h-80 bg-[#0f0f0f] border border-gray-800 rounded-3xl overflow-hidden p-8 flex flex-col justify-end`}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/60 z-0" />
            <div className="relative z-10">
               <p className="text-blue-400 text-sm font-mono mb-2">{proj.category}</p>
               <h4 className="text-2xl font-bold">{proj.title}</h4>
            </div>
            {/* Visual placeholder for "Image" */}
            <div className="absolute top-10 right-10 opacity-10 group-hover:opacity-20 transition-opacity">
                <div className="w-32 h-32 bg-white rounded-full blur-3xl" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// --- TECHNICAL ARSENAL SECTION ---
function TechnicalArsenal() {
    const skills = {
        Frontend: ["React", "Next.js", "Tailwind"],
        Backend: ["Node.js", "Express", "PostgreSQL"],
        Cloud: ["AWS", "Docker", "Nginx"]
    };

    return (
        <section className="py-24 px-6 md:px-20 bg-[#050505]">
            <h2 className="text-4xl font-bold mb-4">Technical Arsenal</h2>
            <p className="text-gray-400 mb-12 max-w-xl">A comprehensive stack enabling end-to-end development of scalable applications.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {Object.entries(skills).map(([category, items]) => (
                    <div key={category} className="space-y-4">
                        <h4 className="text-gray-500 font-mono text-sm border-b border-gray-800 pb-2">{category.toUpperCase()}</h4>
                        <div className="flex flex-wrap gap-2">
                            {items.map(item => (
                                <span key={item} className="px-4 py-2 bg-[#111] border border-gray-800 rounded-full text-sm">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}