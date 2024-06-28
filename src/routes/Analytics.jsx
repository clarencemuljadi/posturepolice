import { LineChart } from "@mui/x-charts";

const Analytics = () => {
  return (
    <div className="flex flex-col min-h-screen p-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-center mt-4 sm:mt-10">
          Michael Elijah
        </h1>
      </div>
      <div className="flex justify-center items-center flex-grow">
        <div className="w-full max-w-[800px] sm:w-[600px] sm:h-[400px] lg:w-[800px] lg:h-[500px]">
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
