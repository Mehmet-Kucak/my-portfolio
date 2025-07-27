"use client";
import React, { useState, ReactNode, useRef, useCallback } from "react";

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
  "aria-label"?: string;
}

export default function Tabs({
  items,
  defaultTab,
  className = "",
  "aria-label": ariaLabel = "Tab navigation",
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || items[0]?.id || "");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const enabledTabs = items.filter((item) => !item.disabled);
      const currentEnabledIndex = enabledTabs.findIndex(
        (item) => item.id === activeTab
      );

      switch (event.key) {
        case "ArrowLeft":
        case "ArrowUp":
          event.preventDefault();
          const prevIndex =
            currentEnabledIndex > 0
              ? currentEnabledIndex - 1
              : enabledTabs.length - 1;
          const prevTab = enabledTabs[prevIndex];
          setActiveTab(prevTab.id);
          // Focus the previous tab
          const prevTabIndex = items.findIndex(
            (item) => item.id === prevTab.id
          );
          tabRefs.current[prevTabIndex]?.focus();
          break;

        case "ArrowRight":
        case "ArrowDown":
          event.preventDefault();
          const nextIndex =
            currentEnabledIndex < enabledTabs.length - 1
              ? currentEnabledIndex + 1
              : 0;
          const nextTab = enabledTabs[nextIndex];
          setActiveTab(nextTab.id);
          // Focus the next tab
          const nextTabIndex = items.findIndex(
            (item) => item.id === nextTab.id
          );
          tabRefs.current[nextTabIndex]?.focus();
          break;

        case "Home":
          event.preventDefault();
          const firstTab = enabledTabs[0];
          setActiveTab(firstTab.id);
          const firstTabIndex = items.findIndex(
            (item) => item.id === firstTab.id
          );
          tabRefs.current[firstTabIndex]?.focus();
          break;

        case "End":
          event.preventDefault();
          const lastTab = enabledTabs[enabledTabs.length - 1];
          setActiveTab(lastTab.id);
          const lastTabIndex = items.findIndex(
            (item) => item.id === lastTab.id
          );
          tabRefs.current[lastTabIndex]?.focus();
          break;
      }
    },
    [items, activeTab]
  );

  return (
    <div
      className={`w-full ${className} backdrop-blur-sm border-2 bg-white/5 border-gray-800 rounded-xl`}
    >
      {/* Tab Navigation - Accessible tablist */}
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1 rounded-lg"
      >
        {items.map((item, index) => (
          <button
            key={item.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            role="tab"
            id={`tab-${item.id}`}
            aria-controls={`tabpanel-${item.id}`}
            aria-selected={activeTab === item.id}
            tabIndex={activeTab === item.id ? 0 : -1}
            onClick={() => !item.disabled && setActiveTab(item.id)}
            onKeyDown={(e) => handleKeyDown(e)}
            disabled={item.disabled}
            className={`
              px-2 py-2 sm:px-3 sm:py-2.5 text-xs sm:text-sm font-medium rounded-md transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900
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
            aria-label={`${item.label} tab${
              item.disabled ? " (disabled)" : ""
            }`}
          >
            <span className="block truncate">{item.label}</span>
          </button>
        ))}
      </div>

      <hr className="text-gray-700 mx-1 mb-2 sm:mb-4" />

      {/* Tab Content - Accessible tabpanel */}
      <div className="min-h-[200px] sm:min-h-[250px] md:min-h-[300px]">
        {items.map((item) => (
          <div
            key={item.id}
            role="tabpanel"
            id={`tabpanel-${item.id}`}
            aria-labelledby={`tab-${item.id}`}
            hidden={activeTab !== item.id}
            tabIndex={0}
            className={activeTab === item.id ? "block" : "hidden"}
          >
            {activeTab === item.id && item.content}
          </div>
        ))}
      </div>
    </div>
  );
}
