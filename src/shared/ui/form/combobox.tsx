"use client";

import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@shared/utils/cn";
import { Input } from "@shared/ui/input";

export type ComboOption = {
  value: string;
  label: string;
};

function normalizeText(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // bỏ dấu
    .trim();
}

export function Combobox({
  id,
  name,
  value,
  onValueChange,
  options,
  placeholder = "Chọn...",
  disabled,
  invalid,
}: {
  id?: string;
  name?: string; // để submit form
  value?: string;
  onValueChange: (v: string) => void;
  options: ComboOption[];
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const [q, setQ] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);

  const selected = options.find((o) => o.value === value);

  const filtered = React.useMemo(() => {
    if (!q) return options;
    const nq = normalizeText(q);
    return options.filter((o) => normalizeText(o.label).includes(nq));
  }, [options, q]);

  React.useEffect(() => {
    setActiveIndex(0);
  }, [q, open]);

  const pick = (v: string) => {
    onValueChange(v);
    setOpen(false);
    setQ(""); // optional: reset search sau khi chọn
  };

  return (
    <div className="w-full">
      {/* hidden input để form submit */}
      {name ? <input type="hidden" name={name} value={value ?? ""} /> : null}

      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild disabled={disabled}>
          <button
            id={id}
            type="button"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "flex h-10 w-full items-center justify-between rounded-md border  bg-secondary-background px-3 py-2 text-sm",
              "ring-offset-accent focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1",
              "disabled:cursor-not-allowed disabled:opacity-50",
              invalid
                ? "border-destructive focus:ring-destructive"
                : "border-input"
            )}
          >
            <span
              className={cn(!selected && "text-muted-foreground font-normal")}
            >
              {selected?.label ?? placeholder}
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            sideOffset={6}
            className={cn(
              "z-50 w-(--radix-popover-trigger-width) rounded-md border bg-popover p-2 shadow-md"
            )}
          >
            <Input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Nhập để tìm..."
              onKeyDown={(e) => {
                if (!filtered.length) return;

                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
                }
                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActiveIndex((i) => Math.max(i - 1, 0));
                }
                if (e.key === "Enter") {
                  e.preventDefault();
                  const opt = filtered[activeIndex];
                  if (opt) pick(opt.value);
                }
                if (e.key === "Escape") {
                  setOpen(false);
                }
              }}
            />

            <div className="mt-2 max-h-60 overflow-auto">
              {filtered.length === 0 ? (
                <div className="px-2 py-2 text-sm text-muted-foreground">
                  Không tìm thấy.
                </div>
              ) : (
                filtered.map((opt, idx) => {
                  const isSelected = opt.value === value;
                  const isActive = idx === activeIndex;

                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={() => pick(opt.value)}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-sm px-2 py-2 text-left text-sm",
                        isActive && "bg-accent text-accent-foreground"
                      )}
                    >
                      <span className="w-4">
                        {isSelected ? <Check className="h-4 w-4" /> : null}
                      </span>
                      <span>{opt.label}</span>
                    </button>
                  );
                })
              )}
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
