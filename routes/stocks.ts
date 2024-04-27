import axios from "axios";
import express from "express";

const router = express();

router.get("/", async (req, res) => {
  try {
    const stockSymbol = req.query.data;
    console.log(stockSymbol, "stockSymbol");
    const STOCK_API_KEY = process.env.STOCK_API_KEY;
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&outputsize=compact&apikey=${STOCK_API_KEY}`
    );
    const responseData = response.data;
    res.json(responseData);
  } catch (error) {
    console.error("Error fetching data: ", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

const TGL_URL =
  "https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=";

router.get("/gainers", async (req, res) => {
  const response = await axios.get(TGL_URL + process.env.DEMO_KEY);

  const { top_gainers } = response.data;

  res.send(top_gainers);
});

interface StockInfo {
  Symbol: string;
  Name: string;
  Description: string;
  Exchange: string;
  Currency: string;
  Sector: string;
  Industry: string;
  MarketCapitalization: string;
  EBITDA: string;
  PERatio: string;
  DividendPerShare: string;
  DividendYield: string;
  EPS: string;
  RevenueTTM: string;
  GrossProfitTTM: string;
  QuarterlyEarningsGrowthYOY: string;
  QuarterlyRevenueGrowthYOY: string;
  AnalystTargetPrice: string;
  TrailingPE: string;
  ForwardPE: string;
  PriceToSalesRatioTTM: string;
  PriceToBookRatio: string;
  Beta: string;
  "52WeekHigh": string;
  "52WeekLow": string;
  "50DayMovingAverage": string;
  "200DayMovingAverage": string;
}

router.get("/stats/:id", async (req, res) => {
  const stockSymbol = req.params.id;
  console.log(stockSymbol, "STOCKSYMBOL FOR STATS");

  const response = await axios.get(
    `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockSymbol}&apikey=${process.env.EMIL_API_KEY}`
  );

  const stockData: StockInfo = response.data;

  console.log(stockData, "stockData");
  res.send(stockData);
});

interface StockNews {
  feed: {
    title: string;
    url: string;
  }[];
}

router.get("/news/:id", async (req, res) => {
  const stockSymbol = req.params.id;
  const STOCK_API_KEY = process.env.STOCK_API_KEY;
  const newsUrl = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${stockSymbol}&apikey=${STOCK_API_KEY}`;

  const response = await axios.get(newsUrl);
  const responseData = response.data;

  const filteredNews: StockNews = {
    feed: responseData.feed.map((item: any) => ({
      title: item.title,
      url: item.url,
    })),
  };

  res.send(filteredNews);
});

export default router;
