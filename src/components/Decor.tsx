type PlusGridProps = {
  cols?: number;
  count?: number;
  className?: string;
  size?: "sm" | "md";
};

export function PlusGrid({
  cols = 3,
  count = 12,
  className = "",
  size = "sm",
}: PlusGridProps) {
  const textSize = size === "md" ? "text-[13px]" : "text-[11px]";

  return (
    <div
      aria-hidden
      className={`pointer-events-none grid gap-x-[6px] gap-y-[2px] text-[#0090d0] ${className}`}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={`${textSize} font-bold leading-none opacity-70`}
        >
          +
        </span>
      ))}
    </div>
  );
}

type PlusScatterProps = {
  className?: string;
};

/** Clean aligned accent grid (replaces random scatter) */
export function PlusScatter({ className = "" }: PlusScatterProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none grid grid-cols-4 gap-x-2 gap-y-3 ${className}`}
    >
      {Array.from({ length: 16 }).map((_, i) => (
        <span
          key={i}
          className="flex h-3 w-3 items-center justify-center text-[10px] font-bold leading-none text-[#0090d0]"
          style={{ opacity: 0.25 + (i % 4) * 0.12 }}
        >
          +
        </span>
      ))}
    </div>
  );
}

type AccentBarsProps = {
  className?: string;
};

/** Structured bar graphic for section accents */
export function AccentBars({ className = "" }: AccentBarsProps) {
  const heights = [18, 32, 24, 40, 28, 36, 20, 44, 26, 34];
  return (
    <div
      aria-hidden
      className={`pointer-events-none flex items-end gap-1.5 ${className}`}
    >
      {heights.map((h, i) => (
        <span
          key={i}
          className="w-[3px] rounded-full bg-gradient-to-t from-[#0090d0] via-[#0284c7] to-[#e31e24]"
          style={{ height: h, opacity: 0.35 + (i % 3) * 0.15 }}
        />
      ))}
    </div>
  );
}

type RedDotsProps = {
  className?: string;
};

export function RedDots({ className = "" }: RedDotsProps) {
  return (
    <div
      aria-hidden
      className={`grid grid-cols-4 gap-1.5 ${className}`}
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-[#e31e24]"
          style={{
            opacity: i > 6 ? 0.35 : 1,
            visibility: i === 3 || i === 7 ? "hidden" : "visible",
          }}
        />
      ))}
    </div>
  );
}
