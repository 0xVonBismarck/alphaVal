import React, { useState } from 'react'
import InputForm from './components/InputForm'
import SupplyChart from './components/SupplyChart'
import { calculateSupplyProjections } from './utils/calculations'

function App() {
  const [chartData, setChartData] = useState(null)

  const handleCalculate = (inputs) => {
    const projections = calculateSupplyProjections(inputs)
    setChartData(projections)
  }

  return (
    <div className="App">
      <h1>Alpha Token Supply Projection</h1>
      <InputForm onCalculate={handleCalculate} />
      {chartData && <SupplyChart data={chartData} />}
    </div>
  )
}

export default App 