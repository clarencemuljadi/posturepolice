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
  const dates = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split("T")[0]);
  }
  return dates;
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
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        navigate("/Login");
      }
    });
    return () => unsubscribe();
  }, []);
  const [chartSize, setChartSize] = useState({ width: 500, height: 300 });
  const dates = [];

  const xLabels = getLastSevenDates();
  xLabels.forEach((date) => {
    const today = getTodaySessions(date);
    let count = 0;
    for (const session of Object.values(today)) {
      count += session.slouchCount || 0;
    }
    dates.push(count);
    console.log(count);
  });

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

  const data = xLabels.map((date, index) => ({
    date,
    triggers: dates[index],
  }));

  useEffect(() => {
    function handleResize() {
      setChartSize({
        width: window.innerWidth * 0.9,
        height: window.innerHeight * 0.5,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
                <LineChart data={data}>
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
