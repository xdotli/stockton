import { NextResponse } from "next/server";

interface AlphaVantageResponse {
  "Meta Data": {
    "1. Information": string;
    "2. Symbol": string;
    "3. Last Refreshed": string;
    "4. Output Size": string;
    "5. Time Zone": string;
  };
  "Time Series (Daily)": {
    [date: string]: {
      "1. open": string;
      "2. high": string;
      "3. low": string;
      "4. close": string;
      "5. volume": string;
    };
  };
}

interface FormattedDataPoint {
  date: string;
  price: number;
  volume: number;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol");
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

  if (!symbol) {
    return NextResponse.json({ error: "Symbol is required" }, { status: 400 });
  }

  const response = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`,
  );
  const data: AlphaVantageResponse = await response.json();

  if ("Error Message" in data) {
    return NextResponse.json({ error: data["Error Message"] }, { status: 400 });
  }

  const timeSeries = data["Time Series (Daily)"];
  const formattedData: FormattedDataPoint[] = Object.entries(timeSeries)
    .slice(0, 100)
    .map(([date, values]) => ({
      date,
      price: parseFloat(values["4. close"]),
      volume: parseInt(values["5. volume"]),
    }));

  return NextResponse.json(formattedData);
}
