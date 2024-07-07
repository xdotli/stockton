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
  console.log(data.length);
  const maxValue = Math.max(...data.map((item) => item[dataKey]));

  const barCount = data.length;
  const barWidth = 3; // Minimum width of each bar

  return (
    <div className="relative h-96 w-full overflow-x-auto py-12">
      <div
        className="flex h-full w-full items-end space-x-[1px]"
        style={{ width: `${barCount * barWidth}px` }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            className="group flex h-full flex-grow flex-col justify-end"
            style={{ width: `${barWidth}px` }}
          >
            <div
              className="origin-bottom bg-blue-500 transition-all duration-200 ease-in-out group-hover:scale-110 group-hover:bg-blue-600"
              style={{
                height: `${(item[dataKey] / maxValue) * 100}%`,
              }}
            >
              <div className="pointer-events-none absolute bottom-full left-1/2 z-10 -translate-x-1/2 transform whitespace-nowrap rounded bg-black p-2 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {item.date}: {item[dataKey]}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;
