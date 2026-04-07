"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface TabDef {
  id: string;
  label: string;
}

interface ScrollTabsProps {
  tabs: TabDef[];
}

export function ScrollTabs({ tabs }: ScrollTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? "");
  const isClickScrolling = useRef(false);

  useEffect(() => {
    // Small delay to ensure sections are rendered in the DOM
    const timerId = setTimeout(() => {
      const elements = tabs
        .map((t) => document.getElementById(t.id))
        .filter(Boolean) as HTMLElement[];

      if (elements.length === 0) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (isClickScrolling.current) return;

          // Find the topmost visible section
          let topEntry: IntersectionObserverEntry | null = null;
          for (const entry of entries) {
            if (entry.isIntersecting) {
              if (!topEntry || entry.boundingClientRect.top < topEntry.boundingClientRect.top) {
                topEntry = entry;
              }
            }
          }

          if (topEntry) {
            setActiveTab(topEntry.target.id);
          }
        },
        {
          threshold: [0, 0.1, 0.25, 0.5],
          rootMargin: "-100px 0px -50% 0px",
        }
      );

      for (const el of elements) {
        observer.observe(el);
      }

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timerId);
  }, [tabs]);

  const handleClick = useCallback(
    (id: string) => {
      setActiveTab(id);
      isClickScrolling.current = true;

      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      // Re-enable observer after scroll settles
      setTimeout(() => {
        isClickScrolling.current = false;
      }, 1000);
    },
    []
  );

  return (
    <div className="sticky top-0 z-10 hidden border-b border-[#EDEEED] bg-white lg:block">
      <div className="mx-auto flex w-full max-w-6xl px-8">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleClick(tab.id)}
              className={`flex-1 py-4 text-center text-lg font-semibold transition-colors ${
                isActive
                  ? "border-b-2 border-[#00A068] text-[#00A068]"
                  : "text-[#AEB1AF] hover:text-[#8E9290]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
