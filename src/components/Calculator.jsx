import React, { useState, useEffect } from 'react'
import InputForm from './InputForm'
import SupplyChart from './SupplyChart'
import { calculateSupplyProjections } from '../utils/calculations'

function Calculator() {
  const [inputs, setInputs] = useState({
    s0: 500000,
    sigma: 1.5,
    beta_m: 0.25,
    br: 0.02,
    bx: 0,
    delta_tau: 1,
    alpha_launch_date: '2025-02-13',
    halving_date: '2026-03-01',
    horizon_date: '2026-12-31',
  })
  
  const [chartData, setChartData] = useState(null)

  // Calculate projections whenever inputs change
  useEffect(() => {
    // Only calculate if we have valid dates
    if (inputs.halving_date && inputs.horizon_date && inputs.alpha_launch_date) {
      const horizonDate = new Date(inputs.horizon_date)
      const startDate = new Date()
      startDate.setHours(0, 0, 0, 0)

      // Only calculate if horizon date is in the future
      if (horizonDate > startDate) {
        try {
          const projections = calculateSupplyProjections(inputs)
          setChartData(projections)
        } catch (error) {
          console.error('Error calculating projections:', error)
        }
      }
    }
  }, [inputs])

  const handleInputChange = (newInputs) => {
    setInputs(newInputs)
  }

  return (
    <div className="calculator">
      <InputForm inputs={inputs} onInputChange={handleInputChange} />
      {chartData && <SupplyChart data={chartData} />}
    </div>
  )
}

export default Calculator 