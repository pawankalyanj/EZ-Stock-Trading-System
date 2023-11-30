import React, { useState, useEffect } from "react";
import "../styles/StockPrediction.css";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import ReactApexChart from "react-apexcharts";

function StockPrediction() {
  const [stock_symbol, setStockSymbol] = useState("");
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  //   const [stock_symbol, setStockSymbol] = useState('');
  const [stockData, setStockData] = useState([]);
  //   const [errorMessage, setErrorMessage] = useState('');

  const getStockPrediction = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/get_stock_prediction/${stock_symbol}`
      );
      console.log("Response:", response);

      if (response.data && response.data.result !== undefined) {
        // Extract the numerical value from the string and convert it to a number
        const predictedPriceNumber = parseFloat(response.data.result);

        // Check if the conversion is successful
        if (!isNaN(predictedPriceNumber)) {
          setPredictedPrice(predictedPriceNumber);
          setErrorMessage(""); // Clear any previous error message
        } else {
          setPredictedPrice(null); // Reset predictedPrice if conversion fails
          setErrorMessage("Invalid predictedPrice format");
        }
      } else {
        setPredictedPrice(null); // Reset predictedPrice if response is invalid
        setErrorMessage("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching stock prediction:", error);
      setPredictedPrice(null); // Reset predictedPrice in case of an error
      setErrorMessage("Error fetching stock prediction");
    }
  };

  //   getStockData = async () => {
  //     try{
  //         const response = await axios.get(`${BASE_URL}/get_stock_data/${stock_symbol}`);
  //         console.log("Response:", response);

  //         if(response.data && response.data.result !== undefined){
  //             // Extract the numerical value from the string and convert it to a number
  //             const predictedPriceNumber = parseFloat(response.data.result);

  //         }
  //     }

  //     };

  const getStockData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/get_stock_data/${stock_symbol}`
      );
      console.log("Response:", response.data);
      setStockData(response.data);
      setErrorMessage("");
    } catch (error) {
      console.log("Error fetching stock data:", error);
      setStockData([]);
      setErrorMessage("Error fetching stock data");
    }
  };

  const chartState = {
    series: [
      {
        data: stockData.map((item) => ({
          x: new Date(item.Date).getTime(),
          y: item.Price,
        })),
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: true,
          autoScaleYaxis: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      title: {
        text: "Current Stock Trend",
        align: "left",
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return val.toFixed(2);
          },
        },
        title: {
          text: "Price",
        },
      },
      xaxis: {
        title: {
          text: "Date",
        },
        type: "datetime",
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy",
        },
        y: {
          formatter: function (val) {
            return val.toFixed(2);
          },
        },
      },
    },
  };

  // const getStockPrediction = async () => {
  //     try {
  //         const response = await axios.get(`${BASE_URL}/get_stock_prediction/${stock_symbol}`);

  //         setPredictedPrice(response.data.predictedPrice);
  //     } catch (error) {
  //         console.error('Error fetching stock prediction:', error);
  //         setErrorMessage('Error fetching stock prediction');
  //     }
  // };

  const handleStockSymbolChange = (e) => {
    setStockSymbol(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await getStockPrediction();
    await getStockData();
  };

  return (
    <div className="App">
      <h1>Stock Projections</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Stock Symbol:
          <input
            type="text"
            value={stock_symbol}
            onChange={handleStockSymbolChange}
          />
        </label>
        <button onClick={handleSubmit}>Get Stock Prediction</button>
      </form>

      {predictedPrice !== null && (
        <div>
          <section>
            <h3 style={{ color: predictedPrice >= 0 ? "green" : "red" }}>
              Predicted Price: {predictedPrice}
            </h3>
          </section>
          {/* <p>{predictedPrice}</p> */}
          {/* <h3>Current Stock Trend:</h3> */}
          <div id="chart">
            <ReactApexChart
              options={chartState.options}
              series={chartState.series}
              type="area"
              height={350}
            />
          </div>
        </div>
      )}

      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
}

export default StockPrediction;

// import React, { useState, useEffect } from "react";
// import "../styles/StockPrediction.css";
// import axios from "axios";
// import { BASE_URL } from "../utils/config";
// import ReactApexChart from "react-apexcharts";
// import getStockData from "./path-to-getStockData"; // Adjust the path accordingly

// function StockPrediction() {
//   const [stock_symbol, setStockSymbol] = useState("");
//   const [predictedPrice, setPredictedPrice] = useState(null);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [historicalData, setHistoricalData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getStockData(stock_symbol);
//         setHistoricalData(data);
//       } catch (error) {
//         setHistoricalData([]);
//         setErrorMessage("Error fetching stock data");
//       }
//     };

//     if (stock_symbol) {
//       fetchData();
//     }
//   }, [stock_symbol]);

//   const getStockPrediction = async () => {
//     try {
//       const response = await axios.get(
//         `${BASE_URL}/get_stock_prediction/${stock_symbol}`
//       );
//       console.log("Response:", response);

//       if (response.data && response.data.result !== undefined) {
//         const predictedPriceNumber = parseFloat(response.data.result);

//         if (!isNaN(predictedPriceNumber)) {
//           setPredictedPrice(predictedPriceNumber);
//           setErrorMessage(""); // Clear any previous error message
//         } else {
//           setPredictedPrice(null); // Reset predictedPrice if conversion fails
//           setErrorMessage("Invalid predictedPrice format");
//         }
//       } else {
//         setPredictedPrice(null);
//         setErrorMessage("Invalid response format");
//       }
//     } catch (error) {
//       console.error("Error fetching stock prediction:", error);
//       setPredictedPrice(null);
//       setErrorMessage("Error fetching stock prediction");
//     }
//   };

//   const chartState = {
//     series: [
//       {
//         data: historicalData.map((item) => ({
//           x: new Date(item.Date).getTime(),
//           y: item.Price,
//         })),
//       },
//     ],
//     options: {
//       // ... (unchanged options)
//     },
//   };

//   const handleStockSymbolChange = (e) => {
//     setStockSymbol(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await getStockPrediction();
//   };

//   return (
//     <div className="App">
//       <h1>Stock Prediction</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Stock Symbol:
//           <input
//             type="text"
//             value={stock_symbol}
//             onChange={handleStockSymbolChange}
//           />
//         </label>
//         <button type="submit">Get Stock Prediction</button>
//       </form>

//       {predictedPrice !== null && (
//         <div>
//           <h2>Predicted Stock Price: {predictedPrice}</h2>
//           <div id="chart">
//             <ReactApexChart
//               options={chartState.options}
//               series={chartState.series}
//               type="area"
//               height={350}
//             />
//           </div>
//         </div>
//       )}

//       {errorMessage && <p className="error">{errorMessage}</p>}
//     </div>
//   );
// }

// export default StockPrediction;
