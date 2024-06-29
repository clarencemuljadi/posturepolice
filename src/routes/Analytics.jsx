import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import SessionDetailsTable from "../components/analytics/SessionDetailsTable";
import Navbar from "../components/Navbar";
import TodayDetailsTable from "../components/analytics/TodayDetailsTable";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, getTodaySessions } from "../firebase-config";

function getLastSevenDates() {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split("T")[0];
  }).reverse();
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-300 p-2 shadow-md">
        <p className="text-sm">{`Date: ${label}`}</p>
        <p className="text-sm font-semibold">{`Triggers: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export default function Analytics() {
  const [user, setUser] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        navigate("/Login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const dates = getLastSevenDates();
        console.log("Dates to use:", dates);

        // Mock data for the first 6 days
        const mockData = [
          { date: dates[0], triggers: 23 },
          { date: dates[1], triggers: 15 },
          { date: dates[2], triggers: 32 },
          { date: dates[3], triggers: 25 },
          { date: dates[4], triggers: 16 },
          { date: dates[5], triggers: 12 },
        ];

        // Fetch real data for today
        const todaySessions = await getTodaySessions();
        console.log("Today's sessions:", todaySessions);

        let todayCount = 0;
        if (Object.keys(todaySessions).length > 0) {
          for (const session of Object.values(todaySessions)) {
            todayCount += session.slouchCount || 0;
          }
        }

        const data = [...mockData, { date: dates[6], triggers: todayCount }];

        console.log("Final chart data:", data);
        setChartData(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const sessionData = {
    duration: 60,
    badPostureCount: 15,
    badPosturePerMinute: 15 / 60,
  };

  const todayData = {
    duration: 60,
    badPostureCount: 15,
    badPosturePerMinute: 15 / 60,
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="flex-grow flex flex-col items-center p-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mt-4 sm:mt-10 mb-8">
            You&apos;re doing great! Keep it up!
          </h1>
          <div className="w-full max-w-4xl space-y-8">
            <div className="flex flex-col lg:flex-row w-full lg:space-x-8 space-y-8 lg:space-y-0">
              <SessionDetailsTable
                sessionData={sessionData}
                className="flex-1 w-full lg:w-1/2 rounded-lg shadow-md bg-white"
              />
              <TodayDetailsTable
                sessionData={todayData}
                className="flex-1 w-full lg:w-1/2 rounded-lg shadow-md bg-white"
              />
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 w-full">
              <h2 className="text-xl font-bold mb-6">Your 7-Day Summary</h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="triggers" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
