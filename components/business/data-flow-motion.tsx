"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface DataFlowLineProps {
  direction: "horizontal" | "vertical";
  className?: string;
  delay?: number;
  reverse?: boolean;
}

export function DataFlowLine({
  direction,
  className,
  delay = 0,
  reverse = false,
}: DataFlowLineProps) {
  const reduceMotion = useReducedMotion();
  const horizontal = direction === "horizontal";
  const travel = reverse ? ["200%", "-100%"] : ["-100%", "200%"];

  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative block shrink-0 overflow-hidden bg-border",
        horizontal ? "h-px w-10" : "h-8 w-px",
        className
      )}
    >
      <motion.span
        className={cn(
          "absolute block bg-brand shadow-[0_0_8px_var(--color-brand)]",
          horizontal ? "inset-y-0 w-5" : "inset-x-0 h-5"
        )}
        animate={
          reduceMotion
            ? { opacity: 0.65 }
            : horizontal
              ? { x: travel, opacity: [0, 1, 1, 0] }
              : { y: travel, opacity: [0, 1, 1, 0] }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 1.8,
                delay,
                ease: "linear",
                repeat: Infinity,
                repeatDelay: 0.8,
              }
        }
      />
    </span>
  );
}

interface DataFlowPulseProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  accent?: boolean;
}

export function DataFlowPulse({
  children,
  className,
  delay = 0,
  accent = false,
}: DataFlowPulseProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      animate={
        reduceMotion
          ? undefined
          : {
              opacity: [0.88, 1, 0.88],
              y: [0, -2, 0],
              scale: accent ? [1, 1.01, 1] : [1, 1, 1],
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              duration: 2.6,
              delay,
              ease: "easeInOut",
              repeat: Infinity,
            }
      }
    >
      {children}
    </motion.div>
  );
}
