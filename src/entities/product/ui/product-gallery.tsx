"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/shared/utils/cn";
import { ChevronUp, ChevronDown } from "lucide-react";

export function ProductGallery({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const mainRef = React.useRef<HTMLDivElement | null>(null);

  const VISIBLE = 5;
  const GAP = 8; // px
  const PADDING_Y = 8; // px (top/bottom trong viewport)
  const X_BLEED = 14; // px: cho ring/scale/shadow tràn ra không bị cắt

  const hasMany = images.length > VISIBLE;

  const [mainHeight, setMainHeight] = React.useState<number>(450);
  const [offsetY, setOffsetY] = React.useState(0);

  React.useLayoutEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const update = () => {
      const h = el.getBoundingClientRect().height;
      if (h > 0) setMainHeight(h);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // thumbSize = (mainHeight - paddingTopBottom - 4*gap) / 5
  const usableHeight = Math.max(
    0,
    mainHeight - 2 * PADDING_Y - (VISIBLE - 1) * GAP
  );
  const thumbSizeRaw = usableHeight / VISIBLE;
  const thumbSize = Math.max(56, Math.floor(thumbSizeRaw));

  const activeSrc = images[activeIndex] ?? images[0];

  React.useEffect(() => {
    if (activeIndex >= images.length) setActiveIndex(0);
  }, [images.length, activeIndex]);

  const contentHeight =
    images.length * thumbSize +
    Math.max(0, images.length - 1) * GAP +
    2 * PADDING_Y;

  const maxOffset = Math.max(0, contentHeight - mainHeight);

  const clamp = (v: number) => Math.max(0, Math.min(v, maxOffset));

  const scrollBy = (delta: number) => setOffsetY((o) => clamp(o + delta));

  const ensureVisible = (index: number) => {
    const itemTop = PADDING_Y + index * (thumbSize + GAP);
    const itemBottom = itemTop + thumbSize;

    setOffsetY((o) => {
      const viewTop = o;
      const viewBottom = o + mainHeight;

      if (itemTop < viewTop) return clamp(itemTop);
      if (itemBottom > viewBottom) return clamp(itemBottom - mainHeight);
      return o;
    });
  };

  return (
    <div className="flex flex-row gap-4">
      {/* Thumbs column */}
      <div className="relative" style={{ width: thumbSize }}>
        {hasMany && (
          <button
            type="button"
            onClick={() => scrollBy(-(thumbSize + GAP) * 2)}
            className="absolute -top-2 left-1/2 z-10 -translate-x-1/2 rounded-full border bg-white p-1 shadow hover:bg-gray-50"
            aria-label="Scroll up thumbnails"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
        )}

        <div
          className="relative"
          style={
            hasMany
              ? {
                  height: mainHeight,
                  paddingTop: PADDING_Y,
                  paddingBottom: PADDING_Y,
                  clipPath: `inset(0px -${X_BLEED}px 0px -${X_BLEED}px)`,
                  WebkitClipPath: `inset(0px -${X_BLEED}px 0px -${X_BLEED}px)`,
                }
              : { paddingTop: PADDING_Y, paddingBottom: PADDING_Y }
          }
        >
          <div
            className="flex flex-col"
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
                  onClick={() => {
                    setActiveIndex(i);
                    if (hasMany) ensureVisible(i);
                  }}
                  className={cn(
                    "group relative block rounded-2xl",
                    "focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  )}
                  style={{ width: thumbSize }}
                >
                  <Image
                    src={img}
                    alt={`thumb-${i + 1}`}
                    width={thumbSize}
                    height={thumbSize}
                    className={cn(
                      "rounded-2xl bg-gray-50 object-contain shadow-md",
                      "transition-transform duration-150 origin-left group-hover:scale-[1.02]",
                      isActive
                        ? "ring-2 ring-emerald-600"
                        : "ring-1 ring-transparent group-hover:ring-gray-300"
                    )}
                    style={{ width: thumbSize, height: thumbSize }}
                    unoptimized={img.startsWith("http://localhost")}
                  />

                  {isActive ? (
                    <span className="pointer-events-none absolute inset-0 rounded-2xl bg-emerald-500/5" />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        {hasMany && (
          <button
            type="button"
            onClick={() => scrollBy((thumbSize + GAP) * 2)}
            className="absolute -bottom-2 left-1/2 z-10 -translate-x-1/2 rounded-full border bg-white p-1 shadow hover:bg-gray-50"
            aria-label="Scroll down thumbnails"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Main image */}
      <div ref={mainRef} className="flex-1 h-fit">
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
