import React, { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Sun, ChevronDown, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface HeroProps {
  videoSrc?: string;
  mobileVideoSrc?: string;
}

export const Hero: React.FC<HeroProps> = ({
  videoSrc = '/assets/videos/solar-hero-optimized.mp4',
  mobileVideoSrc = '/assets/videos/solar-hero-optimized.mp4',
}) => {
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const stickyWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Text overlay refs for GSAP opacity animation
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);
  const phase3Ref = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle video metadata loading and initial frame setup
  const handleLoadedMetadata = () => {
    setIsVideoLoaded(true);
    if (videoRef.current) {
      // Ensure video is paused and set to initial frame
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    ScrollTrigger.refresh();
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video remains strictly paused (no autoplay)
    video.pause();

    // Force video to start loading if not already
    video.load();

    // Additional event listener for debugging
    const handleCanPlay = () => {
      // Video is ready to play
    };

    video.addEventListener('canplay', handleCanPlay);

    // NOTE: Scroll-controlled video scrubbing is NOT disabled for reduced motion
    // because the user has full control via scroll (not autoplay/decorative animation)

    let isSeeking = false;
    let pendingTime: number | null = null;

    // Helper to safely set currentTime without overloading decoder seeking queue
    const seekVideoTo = (targetTime: number) => {
      if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;

      const clampedTime = Math.min(video.duration - 0.05, Math.max(0, targetTime));

      // Skip micro-adjustments (reduce jitter)
      if (Math.abs(video.currentTime - clampedTime) < 0.016) return; // ~1 frame at 60fps

      // Smooth interpolation instead of instant seeking
      if (!isSeeking) {
        isSeeking = true;
        video.currentTime = clampedTime;
      } else {
        pendingTime = clampedTime;
      }
    };

    const handleSeeked = () => {
      isSeeking = false;
      if (pendingTime !== null) {
        const nextTime = pendingTime;
        pendingTime = null;
        seekVideoTo(nextTime);
      }
    };

    video.addEventListener('seeked', handleSeeked);

    // Create GSAP ScrollTrigger tied to hero container
    const ctx = gsap.context(() => {
      if (!heroContainerRef.current) return;

      ScrollTrigger.create({
        trigger: heroContainerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5, // Increased from 0.1 for smoother interpolated seeking
        onUpdate: (self) => {
          const p = self.progress;
          setScrollProgress(p);

          // 1. DIRECT SCROLL-POSITION DRIVEN VIDEO SCRUBBING
          if (video && Number.isFinite(video.duration) && video.duration > 0) {
            const targetTime = p * video.duration;
            seekVideoTo(targetTime);
          }

          // 2. STORYTELLING PHASE OPACITY TRANSITIONS
          // Phase 1: 0% to ~25%
          if (phase1Ref.current) {
            const opacity1 = gsap.utils.clamp(0, 1, 1 - p * 4);
            gsap.set(phase1Ref.current, { opacity: opacity1, y: -p * 60 });
          }

          // Scroll Indicator: Fades out by 10%
          if (scrollIndicatorRef.current) {
            gsap.set(scrollIndicatorRef.current, { opacity: Math.max(0, 1 - p * 8) });
          }

          // Phase 2: ~25% to ~68%
          if (phase2Ref.current) {
            let opacity2 = 0;
            if (p >= 0.22 && p <= 0.70) {
              if (p < 0.35) opacity2 = (p - 0.22) / 0.13;
              else if (p > 0.58) opacity2 = (0.70 - p) / 0.12;
              else opacity2 = 1;
            }
            gsap.set(phase2Ref.current, { opacity: opacity2 });
          }

          // Phase 3: ~68% to 100%
          if (phase3Ref.current) {
            const opacity3 = p >= 0.65 ? Math.min(1, (p - 0.65) / 0.25) : 0;
            gsap.set(phase3Ref.current, { opacity: opacity3, y: (1 - opacity3) * 30 });
          }

          // Progress Bar Fill
          if (progressBarRef.current) {
            gsap.set(progressBarRef.current, { width: `${p * 100}%` });
          }
        },
      });
    }, heroContainerRef);

    return () => {
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('canplay', handleCanPlay);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={heroContainerRef}
      className="relative w-full h-[320vh] md:h-[360vh] bg-surface-dark"
    >
      {/* Sticky Fullscreen Hero Viewport */}
      <div
        ref={stickyWrapperRef}
        className="sticky top-0 w-full h-screen h-[100dvh] overflow-hidden flex flex-col justify-between"
      >
        {/* HTML5 Video Layer */}
        <div className="absolute inset-0 z-0 bg-surface-dark">
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={handleLoadedMetadata}
            onError={() => {
              console.error('Video error:', videoRef.current?.error);
              setHasError(true);
            }}
            style={{
              transform: 'translateZ(0)',
              willChange: 'auto'
            }}
            className={cn(
              'w-full h-full object-cover object-center transition-opacity duration-700',
              'scale-[1.02]', // Slight scale to reduce edge artifacts
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            )}
          >
            <source src={videoSrc} type="video/mp4" />
            <source src={mobileVideoSrc} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>

          {/* Vignette & Localized Contrast Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-transparent to-black/60 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-dark/80 via-transparent to-surface-dark/40 pointer-events-none" />
        </div>

        {/* Minimal Initial Video Loading State */}
        {!isVideoLoaded && !hasError && (
          <div className="absolute inset-0 z-10 bg-surface-dark flex flex-col items-center justify-center gap-4 text-white">
            <div className="w-12 h-12 rounded-2xl bg-brand-green flex items-center justify-center text-brand-gold animate-pulse shadow-gold-glow">
              <Sun className="w-7 h-7" />
            </div>
            <span className="font-heading font-bold text-lg text-white tracking-tight">
              SAHAJA SOLAR
            </span>
            <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-brand-gold animate-pulse w-2/3 rounded-full" />
            </div>
          </div>
        )}

        {/* Video Fallback Image / Error Handler */}
        {hasError && (
          <div className="absolute inset-0 z-10 bg-gradient-to-br from-brand-green-dark via-surface-dark to-black flex items-center justify-center text-white p-6">
            <div className="text-center max-w-md">
              <Sun className="w-12 h-12 text-brand-gold mx-auto mb-4" />
              <h2 className="h3 text-white mb-2">Solar Energy for India</h2>
              <p className="small-text text-slate-300">
                Interactive video preview unavailable. Experience our clean energy solutions below.
              </p>
            </div>
          </div>
        )}

        {/* Storytelling Overlays Container */}
        <div className="relative z-10 flex-grow flex items-center pt-20 pb-24 md:pb-32">
          <Container className="w-full h-full flex items-center">
            <div className="relative w-full">
            {/* PHASE 1: Scroll 0% - ~25% */}
            <div
              ref={phase1Ref}
              className="max-w-3xl transition-opacity duration-300 pointer-events-auto"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-green/80 backdrop-blur-md border border-brand-green-light/20 text-brand-gold text-xs font-semibold tracking-wider uppercase mb-6 shadow-subtle">
                <Sparkles className="w-3.5 h-3.5" />
                SOLAR • EPC • CLEAN ENERGY
              </div>

              <h1 className="display-heading text-white mb-6 drop-shadow-md">
                POWER YOUR FUTURE <br />
                WITH THE <span className="text-brand-gold">SUN.</span>
              </h1>

              <p className="body-large text-slate-200 mb-8 max-w-xl drop-shadow">
                Smarter, high-efficiency solar solutions engineered for residential & commercial customers in Andhra Pradesh.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button
                  variant="solar"
                  size="lg"
                  showArrow
                  onClick={() => {
                    const target = document.querySelector('#quote');
                    if (target) target.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Get Free Solar Consultation
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="text-white border-white/40 hover:bg-white/10 hover:border-white"
                  onClick={() => {
                    const target = document.querySelector('#solutions');
                    if (target) target.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Explore Solutions
                </Button>
              </div>
            </div>

            {/* PHASE 2: Scroll ~28% - ~68% */}
            <div
              ref={phase2Ref}
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none opacity-0 px-4"
            >
              <div className="glass-panel-dark px-6 md:px-8 py-4 md:py-5 rounded-card border border-brand-gold/30 text-center max-w-lg shadow-2xl backdrop-blur-xl">
                <span className="label-tag text-brand-gold block mb-1">Precision Engineering</span>
                <h2 className="h2 text-white font-heading font-extrabold tracking-tight">
                  ENGINEERED FOR <br />
                  <span className="text-brand-gold">EVERY RAY.</span>
                </h2>
              </div>
            </div>

            {/* PHASE 3: Scroll ~70% - 100% */}
            <div
              ref={phase3Ref}
              className="absolute inset-0 flex items-center pointer-events-none opacity-0"
            >
              <div className="max-w-2xl transition-opacity duration-300 pointer-events-auto">
              <span className="label-tag text-brand-gold mb-3 block">Energy Independence</span>
              <h2 className="display-heading text-white mb-4 drop-shadow-lg">
                THE SUN DOESN'T <br />
                SEND YOU A <span className="text-brand-gold">BILL.</span>
              </h2>
              <p className="body-large text-slate-200 mb-8 max-w-lg">
                Make the permanent switch to clean, sustainable solar power with guaranteed savings and long-term reliability.
              </p>
              <Button
                variant="solar"
                size="lg"
                showArrow
                onClick={() => {
                  const target = document.querySelector('#about');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Discover Sahaja Solar
              </Button>
              </div>
            </div>
            </div>
          </Container>
        </div>

        {/* Hero Footer Controls (Scroll Indicator & Phase Progress Bar) */}
        <div className="relative z-10 pb-8">
          <Container className="flex items-center justify-between">
            {/* Scroll Indicator */}
            <div
              ref={scrollIndicatorRef}
              className="flex items-center gap-2 text-slate-300 text-xs font-semibold tracking-wider uppercase"
            >
              <span>Scroll to explore</span>
              <ChevronDown className="w-4 h-4 animate-bounce text-brand-gold" />
            </div>

            {/* Subtle Progress Bar */}
            <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
              <span className={cn(scrollProgress < 0.3 ? 'text-brand-gold font-bold' : '')}>01</span>
              <div className="w-24 md:w-36 h-1 bg-white/20 rounded-full overflow-hidden">
                <div ref={progressBarRef} className="h-full bg-brand-gold rounded-full w-0" />
              </div>
              <span className={cn(scrollProgress > 0.7 ? 'text-brand-gold font-bold' : '')}>03</span>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};
