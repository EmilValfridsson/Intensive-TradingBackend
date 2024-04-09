import axios from "axios";
import express from "express";

const app = express();

app.get("/", async (req, res) => {
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

export default app;

//
//
//
//
//
//
//
//
//
//
//

// app.get('/api/data', (req, res) => {
//   const stockSymbol = req.query.data;
//   console.log(stockSymbol);
// });

// class Stock extends React.Component {
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       xValues: [],
//       yValues: [],
//     };
//   }

//   componentDidMount(): void {
//     this.fetchStock();
//   }

//   fetchStock() {
//     const pointerToThis = this;
//     console.log(pointerToThis, "pointer to this");

//     let xValuesFunction = [];
//     let yValuesFunction = [];
//     fetch("http://localhost:9111/api/stocks")
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(res.statusText);
//         }
//         return res.json();
//       })
//       .then(function (data) {
//         console.log(data, "Data");

//         for (var key in data[`Time Series (Daily)`]) {
//           xValuesFunction.push(key);
//           yValuesFunction.push(data[`Time Series (Daily)`][key][`1. open`]);
//         }
//         pointerToThis.setState({
//           xValues: xValuesFunction,
//           yValues: yValuesFunction,
//         });
//       });
//   }
//   render() {
//     return (
//       <div>
//         <h1>Stock</h1>
//         <Plot
//           data={[
//             {
//               x: this.state.xValues,
//               y: this.state.yValues,
//               type: "scatter",
//               mode: "lines+markers",
//               marker: { color: "red" },
//             },
//           ]}
//           layout={{ width: 640, height: 480, title: `AAPL` }}
//         />
//       </div>
//     );
//   }
// }
