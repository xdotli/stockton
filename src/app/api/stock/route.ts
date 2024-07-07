import { NextResponse } from "next/server";

interface PolygonDataPoint {
  c: number;
  h: number;
  l: number;
  n: number;
  o: number;
  t: number;
  v: number;
  vw: number;
}

interface FormattedDataPoint {
  date: string;
  price: number;
  volume: number;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol");
  const apiKey = process.env.POLYGON_API_KEY;

  if (!symbol) {
    return NextResponse.json({ error: "Symbol is required" }, { status: 400 });
  }

  const endDate = new Date().toISOString().split("T")[0];
  const startDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000 * 8)
    .toISOString()
    .split("T")[0];

  const url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${startDate}/${endDate}?apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch stock data");
    }
    const data = await response.json();

    if (data.resultsCount === 0) {
      return NextResponse.json(
        { error: "No data available for this symbol" },
        { status: 404 },
      );
    }

    const formattedData: FormattedDataPoint[] = data.results.map(
      (item: PolygonDataPoint) => ({
        date: new Date(item.t).toISOString().split("T")[0],
        price: item.c,
        volume: item.v,
      }),
    );

    // Sort the data by date in ascending order
    formattedData.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    const result = Array.from([
      ...formattedData,
      ...formattedData,
      ...formattedData,
      ...formattedData,
      ...formattedData,
      ...formattedData,
      ...formattedData,
      ...formattedData,
      ...formattedData,
      ...formattedData,
      ...formattedData,
      ...formattedData,
    ]);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return NextResponse.json(
      { error: "Failed to fetch stock data" },
      { status: 500 },
    );
  }
}
