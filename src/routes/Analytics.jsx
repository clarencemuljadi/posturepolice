import { useState, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";

function getLastSevenDates() {
  const dates = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i - 1);
    // Format the date as 'YYYY-MM-DD' (ISO format)
    dates.push(date.toISOString().split("T")[0]);
  }
  dates.push("Today");
  return dates;
}

export default function Analytics() {
  const [chartSize, setChartSize] = useState({ width: 500, height: 300 });
  const dates = [45, 26, 50, 34, 23, 21, 39];
  const xLabels = getLastSevenDates();

  useEffect(() => {
    function handleResize() {
      setChartSize({
        width: window.innerWidth * 0.9, // Adjust width to 90% of window width
        height: window.innerHeight * 0.5, // Adjust height to 50% of window height
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial size adjustment

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box className="flex flex-col min-h-screen bg-bground">
      <Navbar />
      <h1 className="text-2xl sm:text-3xl font-bold text-center mt-4 sm:mt-10">
        Your 7-Day Summary
      </h1>
      <Box className="flex-grow flex justify-center items-center p-4">
        <LineChart
          width={chartSize.width}
          height={chartSize.height}
          series={[{ data: dates }]}
          xAxis={[{ scaleType: "point", data: xLabels, label: "Date" }]}
          yAxis={[{ scaleType: "linear", label: "Frequency" }]}
        />
      </Box>
    </Box>
  );
}
