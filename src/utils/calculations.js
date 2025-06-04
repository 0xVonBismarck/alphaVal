const BLOCKS_PER_DAY = 7200

export const calculateSupplyProjections = (inputs) => {
  const {
    s0,
    sigma,
    beta_m,
    br: Br_day,
    bx: Bx_day,
    delta_tau: deltaTauInit,
    alpha_launch_date: launchDateStr,
    halving_date: halvingDateStr,
    horizon_date: horizonDateStr,
  } = inputs

  const launchDate = new Date(launchDateStr)
  const halvingDate = new Date(halvingDateStr)
  const horizonDate = new Date(horizonDateStr)
  const startDate = new Date()
  startDate.setHours(0, 0, 0, 0)

  // Convert daily burns to per-block for equations
  const Br = Br_day / BLOCKS_PER_DAY
  const Bx = Bx_day / BLOCKS_PER_DAY

  // Calculate historical burn ratio
  const historicalBurnRatio = calculateHistoricalBurnRatio(
    launchDate, 
    startDate, 
    s0, 
    sigma, 
    deltaTauInit, 
    halvingDate
  )

  // Data containers for charting
  const labels = []
  const forecastData = []
  const maxData = []
  const minData = []
  const currentInflationData = []

  // Working variables
  let supplyForecast = s0
  let supplyMax = s0
  let supplyMin = s0
  let supplyCurrentInflation = s0

  let deltaTauCurrent = deltaTauInit
  let nextHalvingDate = new Date(halvingDate) // copy to mutate

  // ------------------------------------------------------------------
  // Dynamic Alpha-cap halving schedule (Bitcoin-style)
  // Thresholds: 10.5 M, 15.75 M, 18.375 M, 19.6875 M, …
  //   threshold_k = TOTAL_CAP * (1 - 1 / 2^k)
  // Each time the circulating supply crosses a threshold, alphaCap → alphaCap / 2.
  // ------------------------------------------------------------------

  const TOTAL_CAP = 21_000_000 // asymptotic cap in tokens (21 M)
  const BASE_CAP = 1.0 // α / block before first halving (tokens)

  // Determine how many halvings have already happened at start
  const initialHalvingLevel = (() => {
    if (s0 <= 0) return 0
    // Solve for n where s0 ≥ TOTAL_CAP * (1 - 1/2^n)
    let n = 0
    while (s0 >= TOTAL_CAP * (1 - 1 / Math.pow(2, n + 1))) {
      n += 1
      // Safety guard: break after 30 iterations
      if (n > 60) break // prevent pathological loop
    }
    return n
  })()

  let halvingLevel = initialHalvingLevel
  let alphaCap = BASE_CAP / Math.pow(2, halvingLevel)

  // Next supply threshold for future halving
  const nextThreshold = (level) => TOTAL_CAP * (1 - 1 / Math.pow(2, level + 1))

  let upcomingThreshold = nextThreshold(halvingLevel)

  for (let cursor = new Date(startDate); cursor <= horizonDate; cursor.setDate(cursor.getDate() + 1)) {
    // Handle TAO halvings (every 4 years after initial halvingDate)
    if (cursor >= nextHalvingDate) {
      deltaTauCurrent /= 2
      nextHalvingDate.setFullYear(nextHalvingDate.getFullYear() + 4)
    }

    // Alpha cap halving each time supply crosses the next threshold
    let safetyCounter = 0
    while (supplyForecast >= upcomingThreshold) {
      halvingLevel += 1
      alphaCap = BASE_CAP / Math.pow(2, halvingLevel)
      upcomingThreshold = nextThreshold(halvingLevel)

      if (++safetyCounter > 60) {
        console.warn('Halving loop safety break')
        break
      }
    }

    // Per-block issuance limits
    const delta1 = deltaTauCurrent / sigma
    const delta = Math.min(delta1, alphaCap)

    // Per-block net issuance under different scenarios
    const perBlockForecast = 2 * delta - (beta_m * 0.41 * delta + Br + Bx)
    const perBlockMax = 2 * delta // no burns
    const perBlockMin = 2 * delta - (1 * 0.41 * delta + Br + Bx) // 100% miner burn
    const perBlockCurrentInflation = (2 * delta) * (1 - historicalBurnRatio) // apply historical burn ratio

    // Convert to per-day minted / burned
    const dailyForecast = perBlockForecast * BLOCKS_PER_DAY
    const dailyMax = perBlockMax * BLOCKS_PER_DAY
    const dailyMin = perBlockMin * BLOCKS_PER_DAY
    const dailyCurrentInflation = perBlockCurrentInflation * BLOCKS_PER_DAY

    supplyForecast += dailyForecast
    supplyMax += dailyMax
    supplyMin += dailyMin
    supplyCurrentInflation += dailyCurrentInflation

    // Supply cannot fall below zero
    supplyForecast = Math.max(0, supplyForecast)
    supplyMin = Math.max(0, supplyMin)
    supplyCurrentInflation = Math.max(0, supplyCurrentInflation)

    // Push data for chart
    labels.push(cursor.toISOString().slice(0, 10))
    forecastData.push(parseFloat(supplyForecast.toFixed(4)))
    maxData.push(parseFloat(supplyMax.toFixed(4)))
    minData.push(parseFloat(supplyMin.toFixed(4)))
    currentInflationData.push(parseFloat(supplyCurrentInflation.toFixed(4)))
  }

  return {
    labels,
    forecastData,
    maxData,
    minData,
    currentInflationData,
  }
}

// Helper function to calculate historical burn ratio
const calculateHistoricalBurnRatio = (launchDate, currentDate, currentSupply, sigma, deltaTauInit, halvingDate) => {
  // Calculate what the maximum possible supply could be from launch to now
  let maxPossibleSupply = 0
  let deltaTauCurrent = deltaTauInit
  let nextHalvingDate = new Date(halvingDate)
  
  // Go back to find the relevant halving date before launch
  while (nextHalvingDate > launchDate) {
    nextHalvingDate.setFullYear(nextHalvingDate.getFullYear() - 4)
    deltaTauCurrent *= 2 // reverse the halving
  }
  
  // Now move forward from launch date
  nextHalvingDate.setFullYear(nextHalvingDate.getFullYear() + 4)
  deltaTauCurrent /= 2 // apply the halving

  const TOTAL_CAP = 21_000_000
  const BASE_CAP = 1.0
  
  let halvingLevel = 0
  let alphaCap = BASE_CAP / Math.pow(2, halvingLevel)
  const nextThreshold = (level) => TOTAL_CAP * (1 - 1 / Math.pow(2, level + 1))
  let upcomingThreshold = nextThreshold(halvingLevel)

  for (let cursor = new Date(launchDate); cursor <= currentDate; cursor.setDate(cursor.getDate() + 1)) {
    // Handle TAO halvings
    if (cursor >= nextHalvingDate) {
      deltaTauCurrent /= 2
      nextHalvingDate.setFullYear(nextHalvingDate.getFullYear() + 4)
    }

    // Alpha cap halving
    let safetyCounter = 0
    while (maxPossibleSupply >= upcomingThreshold) {
      halvingLevel += 1
      alphaCap = BASE_CAP / Math.pow(2, halvingLevel)
      upcomingThreshold = nextThreshold(halvingLevel)

      if (++safetyCounter > 60) {
        console.warn('Historical calculation halving loop safety break')
        break
      }
    }

    // Maximum possible daily issuance (no burns)
    const delta1 = deltaTauCurrent / sigma
    const delta = Math.min(delta1, alphaCap)
    const dailyMax = 2 * delta * BLOCKS_PER_DAY

    maxPossibleSupply += dailyMax
  }

  // Calculate burn ratio: (max_possible - actual) / max_possible
  if (maxPossibleSupply <= 0) return 0
  const burnRatio = Math.max(0, Math.min(1, (maxPossibleSupply - currentSupply) / maxPossibleSupply))
  
  console.log(`Historical analysis: Max possible supply: ${maxPossibleSupply.toFixed(0)}, Current supply: ${currentSupply}, Burn ratio: ${(burnRatio * 100).toFixed(1)}%`)
  
  return burnRatio
} 