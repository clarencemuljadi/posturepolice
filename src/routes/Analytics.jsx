import { LineChart } from "@mui/x-charts/LineChart";

const dates = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];

export default function Analytics() {
  return (
    <div>
      <LineChart
        width={500}
        height={300}
        series={[{ data: dates }]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
      />
    </div>
  );
}
