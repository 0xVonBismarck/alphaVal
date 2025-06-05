import React from 'react'

const InputForm = ({ inputs, onInputChange }) => {
  const handleChange = (e) => {
    const { name, value, type } = e.target
    const newInputs = {
      ...inputs,
      [name]: type === 'number' || type === 'range' ? parseFloat(value) || 0 : value
    }
    onInputChange(newInputs)
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
          <label htmlFor="sigma">Average Σ = ∑ prices: {inputs.sigma}</label>
          <input
            type="range"
            name="sigma"
            min="0"
            max="5"
            step="0.1"
            value={inputs.sigma}
            onChange={handleChange}
          />
        </div>
        
        <div className="field">
          <label htmlFor="beta_m">Miner burn fraction βₘ: {inputs.beta_m}</label>
          <input
            type="range"
            name="beta_m"
            min="0"
            max="1"
            step="0.01"
            value={inputs.beta_m}
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
      </div>
    </section>
  )
}

export default InputForm 