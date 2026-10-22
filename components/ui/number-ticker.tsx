"use client"

import { ComponentPropsWithoutRef, useEffect, useRef } from "react"
import { useInView, useMotionValue, useReducedMotion, useSpring } from "motion/react"

import { cn } from "@/lib/utils"

interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number
  startValue?: number
  direction?: "up" | "down"
  delay?: number
  decimalPlaces?: number
}

function formatTickerNumber(value: number, decimalPlaces: number) {
  return Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(value)
}

export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduceMotion = useReducedMotion()
  const targetValue = direction === "down" ? startValue : value
  const motionValue = useMotionValue(targetValue)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, margin: "0px" })
  const formattedTarget = formatTickerNumber(targetValue, decimalPlaces)

  useEffect(() => {
    if (reduceMotion && ref.current) {
      ref.current.textContent = formattedTarget
      return
    }

    if (isInView) {
      const timer = setTimeout(() => {
        motionValue.set(targetValue)
      }, delay * 1000)
      return () => clearTimeout(timer)
    }
  }, [motionValue, isInView, delay, targetValue, reduceMotion, formattedTarget])

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current && !reduceMotion) {
          ref.current.textContent = formatTickerNumber(
            Number(latest.toFixed(decimalPlaces)),
            decimalPlaces,
          )
        }
      }),
    [springValue, decimalPlaces, reduceMotion]
  )

  if (!Number.isFinite(targetValue) || targetValue <= 0) {
    return null
  }

  return (
    <span
      ref={ref}
      className={cn(
        "inline-block tracking-wider text-black tabular-nums dark:text-white",
        className
      )}
      {...props}
    >
      {formattedTarget}
    </span>
  )
}
