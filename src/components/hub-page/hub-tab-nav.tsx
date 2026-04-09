"use client";

import { useEffect, useState } from "react";

interface HubTabNavProps {
  tabs: { id: string; label: string }[];
}

export function HubTabNav({ tabs }: HubTabNavProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? "");

  useEffect(() => {
    const sectionIds = tabs.map((t) => t.id);
    const observers: IntersectionObserver[] = [];

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveTab(id);
          }
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    }

    return () => {
      for (const obs of observers) obs.disconnect();
    };
  }, [tabs]);

  return (
    <nav className="sticky top-0 z-40 border-b border-[#EDEEED] bg-white">
      <div className="flex gap-8">
        {tabs.map((tab) => (
          <a
            key={tab.id}
            href={`#${tab.id}`}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(tab.id);
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
              }
              setActiveTab(tab.id);
            }}
            className={`cursor-pointer border-b-2 pb-3 pt-4 text-lg font-semibold transition-colors ${
              activeTab === tab.id
                ? "border-[#00A068] text-[#00A068]"
                : "border-transparent text-[#AEB1AF] hover:text-[#404644]"
            }`}
          >
            {tab.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
