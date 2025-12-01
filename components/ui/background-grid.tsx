import { FlickeringGrid } from "@/components/ui/flickering-grid"

export default function BackgroundGrid() {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen pointer-events-none z-0">
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



