# Alpha Token Supply Calculator

A React-based calculator for projecting the expected circulating supply of Bittensor alpha tokens, incorporating TAO halving mechanics and various burn mechanisms.

## Features

- **Interactive Supply Projections**: Calculate future alpha token supply based on configurable parameters
- **Multiple Forecast Lines**:
  - Forecasted circulating supply (blue solid line)
  - Maximum inflation trajectory with no burns (red dotted line)
  - Minimum inflation trajectory with 100% miner burns (green dotted line)
  - Forecast at current inflation based on historical burn patterns (yellow dotted line)
- **Dynamic Parameters**:
  - Current circulating supply
  - Average sum of prices (Σ)
  - Miner burn fraction
  - Registration and external burns
  - TAO halving dates
  - Alpha token launch date
- **Real-time Chart Visualization**: Interactive charts powered by Chart.js

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/alpha-token-calculator.git
cd alpha-token-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

1. **Configure Parameters**: Adjust the input parameters in the form:
   - Set the current circulating supply (default: 500,000 Alpha)
   - Configure burn rates and TAO parameters
   - Set the alpha token launch date (default: Feb 13, 2025)
   - Choose TAO halving date (default: Mar 1, 2026)
   - Select projection horizon (default: Dec 31, 2026)

2. **Calculate Projections**: Click the "Calculate" button to generate supply forecasts

3. **Analyze Results**: View the interactive chart showing different supply trajectories

## Technical Details

### Calculation Methodology

The calculator implements a sophisticated model that accounts for:

- **TAO Halving Schedule**: Bitcoin-style halving every 4 years
- **Dynamic Alpha Cap**: Progressive halving based on supply thresholds
- **Burn Mechanisms**: Miner burns, registration burns, and external burns
- **Historical Analysis**: Estimates future supply based on historical burn patterns

### Key Components

- `InputForm.jsx`: User interface for parameter configuration
- `SupplyChart.jsx`: Chart visualization using Chart.js
- `calculations.js`: Core calculation logic and algorithms
- `App.jsx`: Main application component

## Default Values

- **Current Circulating Supply**: 500,000 Alpha tokens
- **Alpha Launch Date**: February 13, 2025
- **TAO Halving Date**: March 1, 2026
- **Projection Horizon**: December 31, 2026
- **Average Σ**: 1.5
- **Miner Burn Fraction**: 0.25
- **Registration Burn**: 0.02 Alpha/day

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Related Documents

This calculator is a companion tool to the "Bittensor Subnet Valuation Framework" document, which provides the theoretical foundation for the calculations performed here.

## Acknowledgments

- Built with React and Vite
- Charts powered by Chart.js
- Mathematical framework based on Bittensor subnet economics 