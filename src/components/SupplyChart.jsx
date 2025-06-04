import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const SupplyChart = ({ data }) => {
  const { labels, forecastData, maxData, minData, currentInflationData } = data

  const chartData = {
    labels,
    datasets: [
      {
        label: "Forecasted circulating supply",
        data: forecastData,
        borderColor: "#0077ff",
        borderWidth: 2,
        fill: false,
        pointRadius: 0,
      },
      {
        label: "Maximum inflation trajectory (no burns)",
        data: maxData,
        borderColor: "#ff4d4d",
        borderWidth: 2,
        borderDash: [6, 6],
        fill: false,
        pointRadius: 0,
      },
      {
        label: "Minimum inflation trajectory (100% miner burns)",
        data: minData,
        borderColor: "#00a878",
        borderWidth: 2,
        borderDash: [6, 6],
        fill: false,
        pointRadius: 0,
      },
      {
        label: "Forecast at current inflation",
        data: currentInflationData,
        borderColor: "#ffd700",
        borderWidth: 2,
        borderDash: [6, 6],
        fill: false,
        pointRadius: 0,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString()} Alpha`,
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Alpha tokens",
        },
        beginAtZero: true,
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
        ticks: {
          maxTicksLimit: 12,
        },
      },
    },
  }

  return (
    <section className="chart-section">
      <div className="chart-container" style={{ height: '480px' }}>
        <Line data={chartData} options={options} />
      </div>
    </section>
  )
}

export default SupplyChart 