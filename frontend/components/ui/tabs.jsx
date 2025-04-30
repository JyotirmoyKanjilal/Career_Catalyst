"use client";

import { useState, createContext, useContext } from "react";

// Create context for tabs
const TabsContext = createContext(undefined);

// Hook to use tabs context
const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a TabsProvider");
  }
  return context;
}

export function Tabs({ defaultValue, children, className = "" }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={`w-full ${className}`}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className = "" }) {
  return (
    <div role="tablist" className={`flex items-center space-x-1 rounded-md bg-darkTeal p-1 ${className}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, className = "" }) {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      data-state={isActive ? "active" : "inactive"}
      onClick={() => setActiveTab(value)}
      className={`
        px-3 py-1.5 text-sm font-medium rounded-md
        transition-all duration-200 ease-in-out
        data-[state=active]:bg-brightTeal data-[state=active]:text-white
        data-[state=inactive]:bg-transparent data-[state=inactive]:text-white/70
        data-[state=inactive]:hover:bg-mediumTeal data-[state=inactive]:hover:text-white
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className = "" }) {
  const { activeTab } = useTabsContext();
  const isActive = activeTab === value;

  if (!isActive) return null;

  return (
    <div role="tabpanel" data-state={isActive ? "active" : "inactive"} className={`mt-2 animate-fade-in ${className}`}>
      {children}
    </div>
  );
}