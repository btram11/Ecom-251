"use client";

import * as React from "react";
import { ORDER_TABS, type OrderTab } from "../model/tabs";

export function OrderTabs({
  value,
  onChange,
}: {
  value: OrderTab;
  onChange: (v: OrderTab) => void;
}) {
  return (
    <div className="bg-gray-200 p-1 rounded-lg flex justify-between mb-8 overflow-x-auto">
      {ORDER_TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all whitespace-nowrap
            ${
              value === tab
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
