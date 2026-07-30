import { FlickeringGrid } from "@/components/ui/flickering-grid"

export default function BackgroundGrid({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={className ?? "fixed inset-0 z-0 h-[100dvh] w-screen pointer-events-none"}>
      <FlickeringGrid
        className="absolute inset-0 z-0 size-full opacity-10 motion-reduce:hidden"
        squareSize={25}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.12}
        flickerChance={0.08}
      />
      <div className="absolute inset-0 hidden opacity-10 motion-reduce:block [background-image:radial-gradient(circle,var(--muted-foreground)_1px,transparent_1px)] [background-size:31px_31px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/10" />
    </div>
  )
}
