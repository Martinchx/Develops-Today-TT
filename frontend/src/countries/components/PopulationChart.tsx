import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  LineController,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { CountryDetail } from "..";

Chart.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  LineController
);

interface Props {
  country: CountryDetail;
}

export const PopulationChart = ({ country }: Props) => {
  return (
    <div className="w-full max-w-xl max-h-64">
      <h3 className="text-2xl font-semibold mt-6 mb-4">Population Over Time</h3>
      <Line
        data={{
          labels: country.population.populationCounts.map((p) => p.year),
          datasets: [
            {
              label: "Population",
              data: country.population.populationCounts.map((p) => p.value),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
            },
          ],
        }}
        options={{
          scales: {
            x: {
              type: "category",
              title: { display: true, text: "Year" },
            },
            y: {
              type: "linear",
              title: { display: true, text: "Population" },
            },
          },
          responsive: true,
        }}
      />
    </div>
  );
};
