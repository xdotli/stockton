"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface DataKeySelectorProps {
  initialDataKey: "price" | "volume";
}

const DataKeySelector: React.FC<DataKeySelectorProps> = ({
  initialDataKey,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleDataKeyChange = (dataKey: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("dataKey", dataKey);
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${query}`);
  };

  return (
    <div className="mb-4">
      <label htmlFor="data-key-select" className="mr-2">
        Select data:
      </label>
      <select
        id="data-key-select"
        value={
          (searchParams.get("dataKey") as "price" | "volume") || initialDataKey
        }
        onChange={(e) => handleDataKeyChange(e.target.value)}
        className="rounded border border-gray-300 px-2 py-1"
      >
        <option value="price">Price</option>
        <option value="volume">Volume</option>
      </select>
    </div>
  );
};

export default DataKeySelector;
