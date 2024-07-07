"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const stocks = [
  "AAPL",
  "GOOGL",
  "MSFT",
  "AMZN",
  "META",
  "TSLA",
  "NVDA",
  "JPM",
  "JNJ",
  "V",
  "WMT",
  "UNH",
  "BAC",
  "HD",
  "PYPL",
  "DIS",
  "ADBE",
  "NFLX",
  "CRM",
  "INTC",
];

interface StockSelectorProps {
  initialStock: string;
}

const StockSelector: React.FC<StockSelectorProps> = ({ initialStock }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleStockChange = (stock: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("symbol", stock);
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${query}`);
  };

  return (
    <div className="mb-4">
      <label htmlFor="stock-select" className="mr-2">
        Select a stock:
      </label>
      <select
        id="stock-select"
        value={searchParams.get("symbol") || initialStock}
        onChange={(e) => handleStockChange(e.target.value)}
        className="rounded border border-gray-300 px-2 py-1"
      >
        {stocks.map((stock) => (
          <option key={stock} value={stock}>
            {stock}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StockSelector;
