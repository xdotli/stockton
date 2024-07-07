interface DataPoint {
  date: string;
  price: number;
  volume: number;
}

interface BarChartProps {
  symbol: string;
  dataKey: "price" | "volume";
}

async function getStockData(symbol: string): Promise<DataPoint[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/stock?symbol=${symbol}`,
    { cache: "no-store" },
  );
  if (!response.ok) {
    throw new Error("Failed to fetch stock data");
  }
  return response.json();
}

const BarChart: React.FC<BarChartProps> = async ({ symbol, dataKey }) => {
  const data = await getStockData(symbol);
  const maxValue = Math.max(...data.map((item) => item[dataKey]));

  return (
    <div className="flex h-64 items-end space-x-1">
      {data.map((item, index) => (
        <div
          key={index}
          className="group relative w-4 cursor-pointer bg-blue-500 transition-all duration-200 ease-in-out hover:scale-110 hover:bg-blue-600"
          style={{
            height: `${(item[dataKey] / maxValue) * 100}%`,
            transformOrigin: "bottom",
          }}
        >
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded bg-black p-2 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            {item.date}: {item[dataKey]}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BarChart;
