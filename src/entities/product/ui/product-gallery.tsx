"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/shared/utils/cn";
import { ChevronUp, ChevronDown } from "lucide-react";

export function ProductGallery({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const mainRef = React.useRef<HTMLDivElement | null>(null);

  const VISIBLE = 5;
  const GAP = 8;
  const PADDING_Y = 8;
  const X_BLEED = 14;

  const FIXED_MAIN_HEIGHT = 450; 

  const hasMany = images.length > VISIBLE;
  const [offsetY, setOffsetY] = React.useState(0);

  const thumbSize = React.useMemo(() => {
    const usableHeight = Math.max(
      0,
      FIXED_MAIN_HEIGHT - 2 * PADDING_Y - (VISIBLE - 1) * GAP
    );
    const raw = usableHeight / VISIBLE;
    return Math.max(56, Math.floor(raw));
  }, [VISIBLE, GAP, PADDING_Y]);

  const activeSrc = images[activeIndex] ?? images[0];

  React.useEffect(() => {
    if (activeIndex >= images.length) setActiveIndex(0);
  }, [images.length, activeIndex]);

  const contentHeight =
    images.length * thumbSize +
    Math.max(0, images.length - 1) * GAP +
    2 * PADDING_Y;

  const maxOffset = Math.max(0, contentHeight - FIXED_MAIN_HEIGHT);

  const clamp = (v: number) => Math.max(0, Math.min(v, maxOffset));
  const scrollBy = (delta: number) => setOffsetY((o) => clamp(o + delta));

  const ensureVisible = (index: number) => {
    const itemTop = PADDING_Y + index * (thumbSize + GAP);
    const itemBottom = itemTop + thumbSize;

    setOffsetY((o) => {
      const viewTop = o;
      const viewBottom = o + FIXED_MAIN_HEIGHT;

      if (itemTop < viewTop) return clamp(itemTop);
      if (itemBottom > viewBottom) return clamp(itemBottom - FIXED_MAIN_HEIGHT);
      return o;
    });
  };

  const handleSelectImage = (index: number) => {
    if (index === activeIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
        setActiveIndex(index);
        setIsAnimating(false);
    }, 150); 
    
    if (hasMany) ensureVisible(index);
  };

  return (
    // fixed size
    <div className="flex flex-row gap-4 h-[450px]">
      {/* Thumbs column */}
      <div className="relative flex-shrink-0" style={{ width: thumbSize }}>
        {hasMany && (
          <button
            type="button"
            onClick={() => scrollBy(-(thumbSize + GAP) * 2)}
            className="absolute -top-2 left-1/2 z-10 -translate-x-1/2 rounded-full border bg-white p-1 shadow hover:bg-gray-50 transition-colors"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
        )}

        <div
          className="relative overflow-hidden"
          style={{
            height: FIXED_MAIN_HEIGHT,
            paddingTop: PADDING_Y,
            paddingBottom: PADDING_Y,
            clipPath: `inset(0px -${X_BLEED}px 0px -${X_BLEED}px)`, 
          }}
        >
          <div
            className="flex flex-col transition-transform duration-300 ease-out" // transition animation
            style={{
              gap: GAP,
              transform: `translateY(-${offsetY}px)`,
              willChange: "transform",
            }}
          >
            {images.map((img, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={`${img}-${i}`}
                  type="button"
                  onClick={() => handleSelectImage(i)}
                  className={cn(
                    "group relative block rounded-2xl flex-shrink-0",
                    "focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  )}
                  style={{ width: thumbSize, height: thumbSize }}
                >
                  <Image
                    src={img}
                    alt={`thumb-${i + 1}`}
                    fill 
                    sizes={`${thumbSize}px`}
                    className={cn(
                      "rounded-2xl bg-gray-50 object-cover shadow-md", 
                      "transition-all duration-200 origin-center group-hover:scale-[1.02]",
                      isActive
                        ? "ring-2 ring-emerald-600 opacity-100"
                        : "ring-1 ring-transparent group-hover:ring-gray-300 opacity-80 hover:opacity-100"
                    )}
                    style={{ width: thumbSize, height: thumbSize }}
                    unoptimized={img.startsWith("http://localhost")}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {hasMany && (
          <button
            type="button"
            onClick={() => scrollBy((thumbSize + GAP) * 2)}
            className="absolute -bottom-2 left-1/2 z-10 -translate-x-1/2 rounded-full border bg-white p-1 shadow hover:bg-gray-50 transition-colors"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Main image */}
      <div 
        ref={mainRef} 
        className="flex-1 relative rounded-2xl bg-gray-50 shadow-md overflow-hidden"
        style={{ height: FIXED_MAIN_HEIGHT }} 
      >
        <Image
          src={activeSrc}
          alt="product"
          width={800}
          height={450}
          className="w-full max-h-[450px] rounded-2xl bg-gray-50 object-contain shadow-md"
          priority
          unoptimized={activeSrc.startsWith("http://localhost")}
        />
      </div>
    </div>
  );
}