"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { AboutTab } from "./about-tab";
import { CompanyTab } from "./company-tab";
import { DocumentsTab } from "./documents-tab";
import type { CardFullFragment } from "@/graphql/generated/graphql";

type Tab = "about" | "company" | "documents";

interface CardTabsProps {
  card: CardFullFragment;
  translations: {
    about: string;
    company: string;
    documents: string;
    skills: string;
    industry: string;
    specialties: string;
    noDocuments: string;
  };
}

export function CardTabs({ card, translations }: CardTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("about");

  const tabs: { key: Tab; label: string }[] = [
    { key: "about", label: translations.about },
    { key: "company", label: translations.company },
    { key: "documents", label: translations.documents },
  ];

  return (
    <div>
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "px-5 py-3 text-sm font-medium transition-colors",
              activeTab === tab.key
                ? "border-b-2 border-[#2AB57E] text-[#2AB57E]"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "about" && (
          <AboutTab card={card} skillsLabel={translations.skills} />
        )}
        {activeTab === "company" && (
          <CompanyTab
            card={card}
            industryLabel={translations.industry}
            specialtiesLabel={translations.specialties}
          />
        )}
        {activeTab === "documents" && <DocumentsTab card={card} noDocumentsLabel={translations.noDocuments} />}
      </div>
    </div>
  );
}
