"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const loadingSteps = ["Initializing", "Composing interface", "Ready"];

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const timeout = window.setTimeout(
      () => setIsVisible(false),
      prefersReducedMotion ? 650 : 2450
    );

    return () => window.clearTimeout(timeout);
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: "easeOut" } }}
          className="fixed inset-0 z-[5000] isolate grid min-h-[100dvh] place-items-center overflow-hidden bg-[#131320] px-6 text-white"
          role="status"
          aria-live="polite"
          aria-label="Loading Fatiya Quzza portfolio"
        >
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_28%_20%,rgba(114,87,255,0.22),transparent_32%),radial-gradient(circle_at_72%_76%,rgba(97,132,220,0.17),transparent_30%),linear-gradient(135deg,#10101A_0%,#151522_52%,#0B0B12_100%)]"
            aria-hidden="true"
          />
          <motion.div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8D78FF]/15"
            initial={prefersReducedMotion ? false : { scale: 0.82, opacity: 0 }}
            animate={
              prefersReducedMotion
                ? { opacity: 0.42 }
                : { scale: [0.82, 1, 1.08], opacity: [0, 0.42, 0] }
            }
            transition={{ duration: 2.2, ease: "easeOut" }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#6184DC]/20"
            initial={prefersReducedMotion ? false : { scale: 0.72, opacity: 0 }}
            animate={
              prefersReducedMotion
                ? { opacity: 0.48 }
                : { scale: [0.72, 1.04, 1.16], opacity: [0, 0.48, 0] }
            }
            transition={{ duration: 2, delay: 0.16, ease: "easeOut" }}
          />

          <motion.div
            initial={prefersReducedMotion ? false : { y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex w-full max-w-sm flex-col items-center"
          >
            <div className="relative grid h-24 w-56 place-items-center rounded-[28px] border border-white/12 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_24px_80px_rgba(43,7,128,0.32)] backdrop-blur-2xl sm:h-28 sm:w-72 sm:rounded-[32px]">
              <motion.div
                className="absolute inset-2 rounded-[22px] border border-[#8D78FF]/20 sm:rounded-[26px]"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { rotate: [0, 4, -4, 0], scale: [1, 1.03, 1] }
                }
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
              <span className="bg-gradient-to-br from-white via-[#D8D1FF] to-[#7257FF] bg-clip-text text-4xl font-black leading-none tracking-[0.22em] text-transparent sm:text-5xl">
                FATIYA
              </span>
            </div>

            <div className="mt-8 w-full">
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#6184DC] via-[#8D78FF] to-[#D8D1FF]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: prefersReducedMotion ? 0.45 : 2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>
              <div className="mt-4 flex items-center justify-between gap-3 text-[11px] font-medium text-[#B2ADBE]">
                {loadingSteps.map((step, index) => (
                  <motion.span
                    key={step}
                    initial={prefersReducedMotion ? false : { opacity: 0.28 }}
                    animate={{ opacity: [0.32, 1, 0.55] }}
                    transition={{
                      duration: prefersReducedMotion ? 0.01 : 0.85,
                      delay: index * 0.42,
                      ease: "easeOut",
                    }}
                  >
                    {step}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
