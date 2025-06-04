import React, { useState } from 'react'

const InputForm = ({ onCalculate }) => {
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

  const handleChange = (e) => {
    const { name, value, type } = e.target
    setInputs(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }))
  }

  const handleSubmit = () => {
    if (!inputs.halving_date || !inputs.horizon_date || !inputs.alpha_launch_date) {
      alert('Please choose the alpha launch date, next TAO halving date, and the projection horizon date.')
      return
    }

    const horizonDate = new Date(inputs.horizon_date)
    const startDate = new Date()
    startDate.setHours(0, 0, 0, 0)

    if (horizonDate <= startDate) {
      alert('Horizon date must be in the future.')
      return
    }

    onCalculate(inputs)
  }

  return (
    <section className="controls">
      <div className="input-form">
        <div className="field">
          <label htmlFor="s0">Today's circulating supply S₀ (Alpha):</label>
          <input
            type="number"
            name="s0"
            step="0.0001"
            value={inputs.s0}
            min="0"
            onChange={handleChange}
          />
        </div>
        
        <div className="field">
          <label htmlFor="sigma">Average Σ = ∑ prices:</label>
          <input
            type="number"
            name="sigma"
            step="0.01"
            value={inputs.sigma}
            min="1"
            max="2"
            onChange={handleChange}
          />
        </div>
        
        <div className="field">
          <label htmlFor="beta_m">Miner burn fraction βₘ (0–1):</label>
          <input
            type="number"
            name="beta_m"
            step="0.01"
            value={inputs.beta_m}
            min="0"
            max="1"
            onChange={handleChange}
          />
        </div>
        
        <div className="field">
          <label htmlFor="br">Registration burn Bᵣ (Alpha / day):</label>
          <input
            type="number"
            name="br"
            step="0.0001"
            value={inputs.br}
            min="0"
            onChange={handleChange}
          />
        </div>
        
        <div className="field">
          <label htmlFor="bx">External burn Bₓ (Alpha / day):</label>
          <input
            type="number"
            name="bx"
            step="0.0001"
            value={inputs.bx}
            min="0"
            onChange={handleChange}
          />
        </div>
        
        <div className="field">
          <label htmlFor="delta_tau">Current Δτ (TAO / block):</label>
          <input
            type="number"
            name="delta_tau"
            step="0.0001"
            value={inputs.delta_tau}
            min="0"
            onChange={handleChange}
          />
        </div>
        
        <div className="field">
          <label htmlFor="alpha_launch_date">Alpha token launch date:</label>
          <input
            type="date"
            name="alpha_launch_date"
            value={inputs.alpha_launch_date}
            onChange={handleChange}
          />
        </div>
        
        <div className="field">
          <label htmlFor="halving_date">Next TAO halving date:</label>
          <input
            type="date"
            name="halving_date"
            value={inputs.halving_date}
            onChange={handleChange}
          />
        </div>
        
        <div className="field">
          <label htmlFor="horizon_date">Projection horizon date:</label>
          <input
            type="date"
            name="horizon_date"
            value={inputs.horizon_date}
            onChange={handleChange}
          />
        </div>
        
        <button type="button" className="calculate-btn" onClick={handleSubmit}>
          Calculate
        </button>
      </div>
    </section>
  )
}

export default InputForm 