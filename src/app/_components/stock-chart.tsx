import React from "react";
import BarChart from "@/app/_components/bar-chart";
import StockSelector from "@/app/_components/stock-selector";
import DataKeySelector from "@/app/_components/date-key-selector";

interface StockChartProps {
  initialStock: string;
  initialDataKey: "price" | "volume";
}

const StockChart: React.FC<StockChartProps> = ({
  initialStock,
  initialDataKey,
}) => {
  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Stock Bar Chart</h1>
      <StockSelector initialStock={initialStock} />
      <DataKeySelector initialDataKey={initialDataKey} />
      <BarChart symbol={initialStock} dataKey={initialDataKey} />
    </div>
  );
};

export default StockChart;
