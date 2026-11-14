"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { LayoutGroup, motion } from "framer-motion";

import { Check, ChevronDown, ChevronUp } from "lucide-react";

import type {
  ButtonHTMLAttributes,
  ComponentType,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
} from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export type NotchPosition = "top" | "bottom";

export interface NotchItemData {
  id: string;
  label: string;
  icon?: LucideIcon | ComponentType<{ className?: string }>;
  badge?: string;
  disabled?: boolean;
}

export interface NotchWingProps {
  position?: NotchPosition;
  className?: string;
}

export function NotchLeftWing({
  position = "top",
  className,
}: NotchWingProps) {
  const isBottom = position === "bottom";

  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      shapeRendering="geometricPrecision"
      className={cn(
        "pointer-events-none absolute right-full size-2.5 md:size-4 overflow-visible select-none text-zinc-950 transition-colors duration-200 dark:text-zinc-200",
        isBottom ? "bottom-0" : "top-0",
        className
      )}
    >
      <path
        d={
          isBottom
            ? "M 0 20 C 11.046 20 20 11.046 20 0 H 21 V 21 H 0 Z"
            : "M 0 0 C 11.046 0 20 8.954 20 20 H 21 V -1 H 0 Z"
        }
        fill="currentColor"
      />
    </svg>
  );
}

export function NotchRightWing({
  position = "top",
  className,
}: NotchWingProps) {
  const isBottom = position === "bottom";

  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      shapeRendering="geometricPrecision"
      className={cn(
        "pointer-events-none absolute left-full size-2.5 md:size-4 overflow-visible select-none text-zinc-950 transition-colors duration-200 dark:text-zinc-200",
        isBottom ? "bottom-0" : "top-0",
        className
      )}
    >
      <path
        d={
          isBottom
            ? "M 20 20 C 8.954 20 0 11.046 0 0 H -1 V 21 H 20 Z"
            : "M 20 0 C 8.954 0 0 8.954 0 20 H -1 V -1 H 20 Z"
        }
        fill="currentColor"
      />
    </svg>
  );
}

export function NotchCornerLeftWing({
  position = "top",
  className,
}: NotchWingProps) {
  const isBottom = position === "bottom";

  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      shapeRendering="geometricPrecision"
      className={cn(
        "pointer-events-none absolute left-0 size-2.5 md:size-4 overflow-visible select-none text-zinc-950 transition-colors duration-200 dark:text-zinc-200",
        isBottom ? "bottom-full" : "top-full",
        className
      )}
    >
      <path
        d={
          isBottom
            ? "M 0 20 H 20 C 8.954 20 0 11.046 0 0 V 20 Z"
            : "M 0 0 H 20 C 8.954 0 0 8.954 0 20 V 0 Z"
        }
        fill="currentColor"
      />
    </svg>
  );
}

export function NotchCornerRightWing({
  position = "top",
  className,
}: NotchWingProps) {
  const isBottom = position === "bottom";

  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      shapeRendering="geometricPrecision"
      className={cn(
        "pointer-events-none absolute right-0 size-2.5 md:size-4 overflow-visible select-none text-zinc-950 transition-colors duration-200 dark:text-zinc-200",
        isBottom ? "bottom-full" : "top-full",
        className
      )}
    >
      <path
        d={
          isBottom
            ? "M 20 20 H 0 C 11.046 20 20 11.046 20 0 V 20 Z"
            : "M 20 0 H 0 C 11.046 0 20 8.954 20 20 V 0 Z"
        }
        fill="currentColor"
      />
    </svg>
  );
}

export interface NotchItemProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onSelect"> {
  id: string;
  label: string;
  isActive: boolean;
  icon?: LucideIcon | ComponentType<{ className?: string }>;
  badge?: string;
  disabled?: boolean;
  onSelect: (id: string) => void;
}

export const NotchItem = forwardRef<HTMLButtonElement, NotchItemProps>(
  (
    {
      id,
      label,
      isActive,
      icon: Icon,
      badge,
      disabled,
      className,
      onClick,
      onSelect,
      ...props
    },
    ref
  ) => {
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }

      onSelect(id);
      onClick?.(event);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (!disabled) {
          onSelect(id);
        }
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative flex h-9 cursor-pointer items-center gap-2 rounded-full px-3.5 text-sm font-medium transition-colors outline-none select-none",
          "focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-1 dark:focus-visible:ring-zinc-500",
          isActive
            ? "font-semibold text-zinc-50 dark:text-zinc-950"
            : "text-zinc-400 hover:text-zinc-200 dark:text-zinc-600 dark:hover:text-zinc-900",
          disabled && "cursor-not-allowed pointer-events-none opacity-40",
          className
        )}
        {...props}
      >
        {isActive && (
          <motion.span
            layoutId="notch-active-pill"
            className="absolute inset-0 rounded-full bg-zinc-800 dark:bg-zinc-300"
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
          />
        )}

        <span className="relative z-10 flex items-center gap-2">
          {Icon && (
            <Icon
              className={cn(
                "size-4 shrink-0 transition-colors",
                isActive
                  ? "text-zinc-50 dark:text-zinc-950"
                  : "text-zinc-400 group-hover:text-zinc-200 dark:text-zinc-600 dark:group-hover:text-zinc-900"
              )}
            />
          )}

          <span className="leading-none">{label}</span>

          {badge && (
            <span className="rounded-full bg-zinc-800 px-1.5 py-0.5 text-[10px] font-bold tracking-tight uppercase text-zinc-300 dark:bg-zinc-300 dark:text-zinc-800">
              {badge}
            </span>
          )}
        </span>
      </button>
    );
  }
);

NotchItem.displayName = "NotchItem";

interface NotchDropdownItemProps {
  item: NotchItemData;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

function NotchDropdownItem({
  item,
  isSelected,
  onSelect,
}: NotchDropdownItemProps) {
  const Icon = item.icon;

  const handleClick = () => {
    onSelect(item.id);
  };

  return (
    <button
      type="button"
      role="option"
      aria-selected={isSelected}
      disabled={item.disabled}
      onClick={handleClick}
      className={cn(
        "flex w-full cursor-pointer items-center justify-between gap-2.5 rounded-xl px-3 py-2 text-left text-sm outline-none transition-colors select-none",
        "focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500",
        isSelected
          ? "bg-zinc-800 font-semibold text-zinc-50 dark:bg-zinc-300 dark:text-zinc-950"
          : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 active:bg-zinc-800 dark:text-zinc-600 dark:hover:bg-zinc-300/60 dark:hover:text-zinc-950 dark:active:bg-zinc-300",
        item.disabled && "cursor-not-allowed pointer-events-none opacity-40"
      )}
    >
      <div className="flex items-center gap-2.5">
        {Icon && (
          <Icon
            className={cn(
              "size-4 shrink-0",
              isSelected
                ? "text-zinc-50 dark:text-zinc-950"
                : "text-zinc-400 dark:text-zinc-600"
            )}
          />
        )}

        <span>{item.label}</span>
      </div>

      {isSelected && <Check className="size-3.5 text-zinc-50 dark:text-zinc-950" />}
    </button>
  );
}

export interface NotchNavProps extends HTMLAttributes<HTMLDivElement> {
  items: NotchItemData[];
  activeId?: string;
  defaultActiveId?: string;
  position?: NotchPosition;
  logo?: ReactNode;
  rightContent?: ReactNode;
  showLogo?: boolean;
  showRightContent?: boolean;
  children?: ReactNode;
  onActiveChange?: (id: string) => void;
}

export function NotchNav({
  items,
  activeId: controlledActiveId,
  defaultActiveId,
  position = "top",
  logo,
  rightContent,
  showLogo = true,
  showRightContent = true,
  children,
  onActiveChange,
  className,
  ...props
}: NotchNavProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layoutGroupId = useId();

  const [internalActiveId, setInternalActiveId] = useState<string>(
    defaultActiveId || items[0]?.id || ""
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const isBottom = position === "bottom";

  const activeId = controlledActiveId !== undefined ? controlledActiveId : internalActiveId;

  const activeIndex = useMemo(() => {
    const index = items.findIndex((item) => item.id === activeId);
    return index >= 0 ? index : 0;
  }, [items, activeId]);

  const activeItem = items[activeIndex] || items[0];

  const handleSelect = useCallback(
    (id: string) => {
      if (controlledActiveId === undefined) {
        setInternalActiveId(id);
      }
      setIsDropdownOpen(false);
      onActiveChange?.(id);
    },
    [controlledActiveId, onActiveChange]
  );

  const handleToggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const handleCloseDropdown = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex justify-center bg-transparent p-0 transition-colors duration-200",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "relative flex w-[240px] items-center justify-between gap-2 rounded-full border border-zinc-200/80 bg-zinc-950/90 px-2.5 py-2 text-zinc-50 shadow-[0_8px_30px_rgba(0,0,0,0.18)] backdrop-blur-md transition-colors duration-200 dark:border-zinc-700/80 dark:bg-zinc-200/95 dark:text-zinc-950",
          isBottom ? "translate-y-0" : "translate-y-0"
        )}
      >
        {showLogo && logo && (
          <div className="flex shrink-0 items-center text-zinc-50 dark:text-zinc-950">
            {logo}
          </div>
        )}

        <div className="hidden flex-1 items-center justify-center xl:flex">
          <LayoutGroup id={layoutGroupId}>
            <div className="flex items-center gap-1">
              {items.map((item) => (
                <NotchItem
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  icon={item.icon}
                  badge={item.badge}
                  disabled={item.disabled}
                  isActive={item.id === activeId}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          </LayoutGroup>
        </div>

        {showRightContent && rightContent && (
          <div className="hidden shrink-0 items-center justify-end text-zinc-50 xl:flex dark:text-zinc-950">
            {rightContent}
          </div>
        )}

        <div
          ref={containerRef}
          className="xl:hidden flex w-full items-center justify-between gap-3"
        >
          {showLogo && logo && (
            <div className="flex shrink-0 items-center text-zinc-50 dark:text-zinc-950">
              {logo}
            </div>
          )}

          <button
            type="button"
            aria-expanded={isDropdownOpen}
            aria-haspopup="listbox"
            aria-label="Toggle navigation menu"
            onClick={handleToggleDropdown}
            className="group flex h-8 w-full cursor-pointer items-center justify-center gap-1.5 rounded-full px-2.5 py-2 text-xs font-semibold text-zinc-50 outline-none transition-colors sm:hover:bg-zinc-800/70 focus-visible:ring-2 focus-visible:ring-zinc-400 dark:text-zinc-950 dark:sm:hover:bg-zinc-300/60 dark:focus-visible:ring-zinc-500"
          >
            {activeItem?.icon && (
              <activeItem.icon className="size-3.5 shrink-0 text-zinc-400 dark:text-zinc-600" />
            )}

            <span className="leading-none">{activeItem?.label}</span>

            {isBottom ? (
              <ChevronUp
                className={cn(
                  "size-3.5 text-zinc-400 transition-transform duration-200 dark:text-zinc-600",
                  isDropdownOpen && "rotate-180"
                )}
              />
            ) : (
              <ChevronDown
                className={cn(
                  "size-3.5 text-zinc-400 transition-transform duration-200 dark:text-zinc-600",
                  isDropdownOpen && "rotate-180"
                )}
              />
            )}
          </button>

          {showRightContent && rightContent && (
            <div className="flex shrink-0 items-center justify-end text-zinc-50 dark:text-zinc-950">
              {rightContent}
            </div>
          )}
        </div>
      </div>

      <div
        aria-hidden="true"
        onClick={handleCloseDropdown}
        className={cn(
          "fixed inset-0 z-40 transition-opacity duration-200 xl:hidden",
          isDropdownOpen
            ? "pointer-events-auto bg-black/20 opacity-100 backdrop-blur-[2px] dark:bg-black/40"
            : "pointer-events-none opacity-0"
        )}
      />

      <div
        role="listbox"
        aria-label="Navigation options"
        className={cn(
          "fixed left-1/2 top-[64px] z-50 w-[240px] -translate-x-1/2 overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-950/95 text-zinc-50 shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-[opacity,transform] duration-200 ease-out xl:hidden dark:border-zinc-700/80 dark:bg-zinc-200/95 dark:text-zinc-950",
          isDropdownOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-2 opacity-0 pointer-events-none"
        )}
      >
        <div className="flex w-full flex-col gap-1 p-2">
          {items.map((item) => (
            <NotchDropdownItem
              key={item.id}
              item={item}
              isSelected={item.id === activeId}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>

      <div className="hidden" aria-hidden="true">
        {children}
      </div>
    </div>
  );
}
