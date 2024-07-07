import { Suspense } from "react";
import StockChart from "@/app/_components/stock-chart";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Home({ searchParams }: PageProps) {
  const symbol = (searchParams.symbol as string) || "AAPL";
  const dataKey = (searchParams.dataKey as "price" | "volume") || "price";

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Suspense fallback={<div>Loading...</div>}>
        <StockChart initialStock={symbol} initialDataKey={dataKey} />
      </Suspense>
    </main>
  );
}
