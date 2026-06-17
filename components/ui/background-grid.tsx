import { FlickeringGrid } from "@/components/ui/flickering-grid"

export default function BackgroundGrid() {
  return (
    <div className="absolute left-0 top-0 z-0 h-[100dvh] w-screen pointer-events-none">
      <FlickeringGrid
        className="absolute inset-0 z-0 size-full opacity-30"
        squareSize={25}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.3}
        flickerChance={0.5}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </div>
  )
}



