import axios from "axios";
import express from "express";

const router = express();

// const API_KEY = "K0OBEQ28PEQ0MW7M";
const API_KEY = "demo";
const URL =
  "https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=";

export interface TGLdata {
  last_updated: string;
  top_gainers: [];
  top_losers: [];
}
router.get("/gainers", async (req, res) => {
  const response = await axios.get(URL + API_KEY);

  const newData = filterData(response.data);

  res.send(newData);
});

function filterData(data: TGLdata) {
  const { top_gainers, top_losers: losers, last_updated } = data;
  return top_gainers;
}

export default router;
