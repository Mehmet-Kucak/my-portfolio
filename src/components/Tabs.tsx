"use client";
import React, { useState, ReactNode } from "react";

interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
  className?: string;
}

export default function Tabs({ items, defaultTab, className = "" }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || items[0]?.id || "");
  const activeContent = items.find((item) => item.id === activeTab)?.content;

  return (
    <div
      className={`w-full ${className} backdrop-blur-sm border-2 bg-white/5 border-gray-800 rounded-xl`}
    >
      {/* Tab Navigation - Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1 rounded-lg">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => !item.disabled && setActiveTab(item.id)}
            disabled={item.disabled}
            className={`
              px-2 py-2 sm:px-3 sm:py-2.5 text-xs sm:text-sm font-medium rounded-md transition-all duration-200
              ${
                activeTab === item.id
                  ? "bg-gray-800 text-white shadow-lg shadow-gray-900/25 border border-gray-700"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
              }
              ${
                item.disabled
                  ? "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-gray-400"
                  : "cursor-pointer"
              }
            `}
          >
            <span className="block truncate">{item.label}</span>
          </button>
        ))}
      </div>
      <hr className="text-gray-700 mx-1 mb-2 sm:mb-4" />

      {/* Tab Content - Responsive Container */}
      <div className="min-h-[200px] sm:min-h-[250px] md:min-h-[300px]">
        {activeContent}
      </div>
    </div>
  );
}
