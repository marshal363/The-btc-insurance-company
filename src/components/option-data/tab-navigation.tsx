"use client";

import { useState } from "react";

interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
}

interface TabNavigationProps {
  tabs: TabItem[];
  defaultTabId?: string;
  onChange?: (tabId: string) => void;
  containerClassName?: string;
}

export function TabNavigation({ 
  tabs, 
  defaultTabId, 
  onChange,
  containerClassName = ""
}: TabNavigationProps) {
  const [activeTab, setActiveTab] = useState(defaultTabId || tabs[0]?.id || "");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (onChange) {
      onChange(tabId);
    }
  };

  return (
    <div className={`mb-6 border-b border-gray-200 ${containerClassName}`}>
      <div className="flex overflow-x-auto scrollbar-none space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`
              pb-2 px-4 font-medium text-sm whitespace-nowrap relative
              ${activeTab === tab.id 
                ? 'text-blue-600' 
                : 'text-gray-600 hover:text-gray-900'
              }
              ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
            onClick={() => !tab.disabled && handleTabChange(tab.id)}
            disabled={tab.disabled}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
} 