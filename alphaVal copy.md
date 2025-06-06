# **Bittensor Subnet Valuation Framework**

---

## 1 Executive summary

This framework combines token‑economic mechanics unique to Bittensor with standard venture heuristics to bracket a fair value range for any early‑stage subnet by identifying the floor valuation, the market upside and the sentiment  anchor while adjusting the valuation by a supply anchor.

---

## 2 Motivation

Under Dynamic TAO every subnet's token supply, reward schedule and burn mechanics differ materially from conventional Web 3 projects. Early‑epoch inflation, hardware intensity and the interplay between Alpha prices and TAO halvings complicate standard venture valuation heuristics. A transparent framework is therefore required to:

* benchmark the economic floor for securing a subnet;
* quantify the upside from prospective user adoption;
* reconcile token‑supply growth with comparable market valuations; and
* provide investors a defensible discount or premium when committing venture capital.

This valuation rubric therefore aims to help:

* **Founders** — justify raises without over‑ or under‑diluting.
* **Investors** — price risk amid moving issuance, burns and hardware costs.

---

## 3 Methodology overview

| Pillar             | What it measures                                             | Output           |
| ------------------ | ------------------------------------------------------------ | ---------------- |
| **(i) CoP**        | Net‑present cost to operate all required miners + validators | Floor valuation  |
| **(ii) NPVU**      | Discounted cash‑flow from end‑users (ARPU × users)           | Market upside    |
| **(iii) Comps**    | Comparable AI/Web3 deal valuations (313‑round dataset)       | Sentiment‑anchor |
| **(iv) Inflation** | Max/min circulating Alpha at investor horizon                | Supply‑anchor    |

### 3.1 Cost‑of‑Participation (CoP) — economic floor

The CoP quantifies the minimum rational valuation at which miners and validators will continue to participate. Should a subnet trade below this level, rational operators will redirect resources to more profitable alternatives.

#### 3.1.1 Daily OPEX examples

| Spec (per node)                                               | Capex \$ day\* | Power \$ day† | **Total \$ day** |
| ------------------------------------------------------------- | ----------------- | --------------- | ------------------ |
| CPU only                                                      | 2.00              | 1.20            | **3.20**           |
| 8 × RTX 4090                                                  | 25.00             | 18.00           | **43.00**          |
| 8 × A100                                                      | 64.00             | 22.00           | **86.00**          |
| 8 × H200                                                      | 90.00             | 25.00           | **115.00**         |

_<sup>*</sup> Five-year straight-line depreciation, 12 % cost of capital._  
_<sup>†</sup> Operating electricity cost._

#### 3.1.2 Formula

Let 

* *$N_{m}$* = miner‑node count, *$N_{v}$* = validator‑node count
* *$M$*, *$V$* = per‑node daily costs from Table 3.1
* *K ≥ 1* = labour‑complexity multiplier (baseline 1.0)
* *P\*\*α* = spot price of the subnet’s Alpha token

Annual burn (USD)

$$
C = 365.25\,K\bigl(N_{m}\,M + N_{v}\,V\bigr) \tag{3.1}
$$

Present value (USD)

$$
\boxed{\text{NPC}_{\text{USD}} = \dfrac{C}{d}} \tag{3.2}
$$

---

### 3.2 Net‑Present Value of Users (NPVU) — demand upside

Given steady‑state users *U* and average revenue per user **ARPU** (USD),

$$
\boxed{\text{NPVU} = \dfrac{U\,\text{ARPU}}{d}} \tag{3.3}
$$

For a finite horizon *T* years

$$
\text{NPVU}_T = U\,\text{ARPU}\,\frac{1 - (1+d)^{-T}}{d} \tag{3.4}
$$

---

### 3.3 Comparable‑deals benchmark

Key VC questions—product‑market fit, go‑to‑market, burn and roadmap—determine where a subnet fits on the deal curve.

| **Round**     | Avg Raise  | Avg Valuation | Q1    | **Median** | Q3    | Deals |
| ------------- | ---------- | ------------- | ----- | ---------- | ----- | ----- |
| **Pre‑Seed**  |  \$ 2.60 M |  \$ 28.6 M    | 10 M  | **20 M**   | 30 M  |  57   |
| **Seed**      |  \$ 5.05 M |  \$ 47.2 M    | 15 M  | **26.8 M** | 50 M  |  156  |
| **Strategic** |  \$ 4.44 M |  \$ 66.0 M    | 26 M  | **50 M**   | 75 M  |  34   |
| **Private**   |  \$ 5.83 M |  \$ 71.4 M    | 21 M  | **44 M**   | 72 M  |  64   |
| **Series A**  |  \$ 4.50 M |  \$ 125 M     | 113 M | **125 M**  | 138 M |  2    |

---

### 3.4 Inflation analysis — supply anchor

#### 3.4.1 Maximum issuance per block

$$
\delta = \min\!\Bigl(\tfrac{\Delta\tau}{\sum_j p_j},\; \overline{\Delta\alpha_i}\Bigr) \tag{3.5}
$$

$$
\boxed{\Delta\alpha_{\max} = 2\,\delta} \tag{3.6}
$$

#### 3.4.2 Minimum net issuance

$$
\boxed{\Delta\alpha_{\min} = 2\,\delta - \bigl[\beta_{m}(0.41)\,\delta + B_{r} + B_{x}\bigr] \tag{3.7}}
$$

Here $\beta_{m}$ is the miner‑burn fraction, $B_{r}$ the per‑block registration burn, and $B_{x}$ any additional external burn (read revenues).

#### 3.4.3 Cumulative supply up to horizon $T$

Let $t_0$ be subnet genesis; integrate over time $t$:

$$
S_{\max}(T) = \int_{t_0}^{T} \!\! \Delta\alpha_{\max}(t)\,\mathrm{d}t,
\qquad
S_{\min}(T) = \int_{t_0}^{T} \!\! \Delta\alpha_{\min}(t)\,\mathrm{d}t \tag{3.8}
$$

Numerical evaluation is implemented in the companion calculator.


#### 3.4.4 Estimating Future Circulating Supply

To project the circulating Alpha at a future date ($T$) you must specify:

| Required input | Symbol | Comment |
|----------------|--------|---------|
| Existing circulating supply (today) | $S_0$ | as on-chain |
| Average sum-of-prices $\langle\sum p\rangle$ | $\Sigma$ | choose within 1 – 2 |
| Miner-burn fraction | $\beta_m$ | 0 – 1 |
| Registration burn / block | $B_r$ | daily burn / 7,200 |
| External burn / block | $B_x$ | daily burn / 7,200 |
| Next TAO-halving date | $T_h$ | calendar date |

#### 3.4.5 Block-level issuance across a halving boundary  

Let

* $D = T - t_{\text{now}}$ = days until horizon,  
* $D_h$ = days from *now* to the TAO-halving date $T_h$ (clip to 0 if $T \le T_h$),  
* 7 200 blocks per day.

Split the horizon into **Segment 1** (pre-halving, $D_1 = \min(D, D_h)$) and **Segment 2** (post-halving, $D_2 = D - D_1$).

For each segment $k\in\{1,2\}$ set  

$$
\Delta\tau^{(k)} =
\begin{cases}
\Delta\tau_{\text{current}}, & k=1 \\
\frac{1}{2}\,\Delta\tau_{\text{current}}, & k=2
\end{cases}\tag{3.9}
$$

Compute the per-block limit  

$$
\delta^{(k)} = \min\!\Bigl(\tfrac{\Delta\tau^{(k)}}{\Sigma},
                           \overline{\Delta\alpha_{i}}\Bigr)\tag{3.10}
$$

#### 3.4.6 Net Alpha minted in each segment  

Net per block  

$$
\Delta\alpha_{\text{net}}^{(k)} =
  2\,\delta^{(k)} -
  \bigl[\beta_m\,(0.41)\,\delta^{(k)} + B_r + B_x\bigr]\tag{3.11}
$$

Total minted  

$$
M^{(k)} = 7\,200 \times D_k \times \Delta\alpha_{\text{net}}^{(k)}\tag{3.12}
$$

#### 3.4.7 Projected circulating supply at $T$

$$
\boxed{S(T) = S_0 + M^{(1)} + M^{(2)}}\tag{3.13}
$$

> **Worked example**  
> *Inputs:* $S_0 = 2.5$ M Alpha, $\Sigma = 1.5$, $\beta_m = 0.25$,  
> $B_r = 0.02$, $B_x = 0$ Alpha block⁻¹, current $\Delta\tau = 1$,  
> TAO halving in 180 days, horizon $T$ in 540 days.  
>   
> Segment-level calculations yield $M^{(1)} \approx 0.47$ M,  
> $M^{(2)} \approx 0.18$ M, hence $S(T) \approx 3.15$ M Alpha.

---

## 4 Synthesising a valuation range

Combining the above methods allows a price range to be generated, specific assumptions can be refined on the supply scales to narrow the range. 

1. Floor = NPC.
2. Ceiling = NPVU + strategic premium.
3. Scale by forecast supply at horizon *T*.
4. Apply illiquidity discount \$\lambda\$ (20–40 %).

$$
\text{Price range}=\Bigl[\,\tfrac{\text{NPC}}{S_{\max}(T)},\; \tfrac{\text{NPVU}+\text{Premium}}{S_{\min}(T)}\Bigr] (1-\lambda). \tag{4.1}
$$

---

## 5 Caveats & sensitivity levers

Below are the key caveats and sensitivity levers that have not been applied in this simplified model. It is important to mention that the circulating supply estimates should act as a reference but not the absolute truth.

| Factor                 | Base assumption | Stress‑test example          |
| ---------------------- | --------------- | ---------------------------- |
| Σ price path           | Flat            | ±100 % trajectories          |
| TAO halving delay      | None            | Recycling‑driven shift       |
| Token‑holder behaviour | Passive         | Simulated supply shocks      |
| Staking                | Ignored         | Simulated per‑subnet staking |

---

## 6 Conclusion

This framework is intended to serve as a general guide to influence valuation decisions, however, as valuation is more an art than science, this framework does not provide a definitive final answer on valuation, but rather a range of fair values that can be used to influence a final allocation decision. Lastly, it is important to highlight that this valuation methodology only works as a starting point for long term venture investors looking to invest into subnets.