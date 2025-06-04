# Bittensor Subnet Valuation Framework  
*Revised 4 June 2025*

---

## 1 Introduction
This memorandum develops an analytical framework for valuing Bittensor subnets.  
The treatment combines  

1. hardware operating expenditure,  
2. user-generated cash-flows,  
3. peer financing benchmarks, and  
4. the token-supply mechanics dictated by Dynamic TAO (dTAO).  

All monetary figures are stated in United States dollars (USD) unless noted; all present-value calculations employ a **20 percent** discount rate (denoted $d = 0.20$).

---

## 2 Motivation
Under Dynamic TAO every subnet's token supply, reward schedule and burn mechanics differ materially from conventional Web 3 projects. Early‑epoch inflation, hardware intensity and the interplay between Alpha prices and TAO halvings complicate standard venture valuation heuristics. A transparent framework is therefore required to:

- benchmark the economic floor for securing a subnet;
- quantify the upside from prospective user adoption;
- reconcile token‑supply growth with comparable market valuations; and
- provide investors a defensible discount or premium when committing off‑chain capital.

The sections that follow operationalise these objectives via four complementary lenses.

---

## 3 Methodological Pillars

| Pillar                     | Captured quantity                                                     | Output symbol |
| -------------------------- | --------------------------------------------------------------------- | ------------- |
| Cost-of-Participation      | Net-present cost of running the required mining + validation set       | $NPC_\alpha$ |
| Net-Present Value of Users | Discounted profit stream from end users                                | $NPVU_\alpha$ |
| Comparable-Deals Benchmark | Median post-money valuations from 313 decentralised-AI financings      | $V_{\text{market}}$ |
| Inflation Anchoring        | Circulating Alpha at investor horizon $T$                            | $S_{\max}(T),\,S_{\min}(T)$ |

Here $S_{\max}(T)$ and $S_{\min}(T)$ denote, respectively, the cumulative Alpha under maximal and minimal issuance (derived in Section&nbsp;6).

---

## 4 Cost-of-Participation (CoP)

### 4.1 Per-node operating expenditure  
(The table below assumes a power price of 0.12 USD kWh⁻¹ and PUE = 1.2.)

| Hardware profile | Cap-ex $ day⁻¹ ¹ | Power $ day⁻¹ ² | **Total $ day⁻¹** |
| ---------------- | --------------- | --------------- | ----------------- |
| CPU only         | 2.00            | 1.20            | **3.20** |
| 8 × RTX 4090     | 25.00           | 18.00           | **43.00** |
| 8 × A100         | 64.00           | 22.00           | **86.00** |
| 8 × H200         | 90.00           | 25.00           | **115.00** |

<sup>1</sup> Five-year straight-line depreciation, 12 % cost of capital.  
<sup>2</sup> Operating electricity cost.

### 4.2 Subnet-level expenditure and present value  

Let  

* $N$ = miner-node count, $N_v$ = validator-node count;  
* $M$ and $V$ = per-node daily costs from Table 4.1;  
* $K\ge1$ = labour-complexity multiplier (baseline 1.0);  
* $P_\alpha$ = spot price of the subnet's Alpha token.

Daily burn (USD)  

$$
C = 365.25K(NM + N_vV).
$$

Present value (USD)  

$$
\mathrm{NPC}_{\text{USD}} = \frac{C}{d}.
$$

Converted to Alpha  

$$
\boxed{\mathrm{NPC}_{\alpha} = \frac{C}{d\,P_\alpha}}.
$$

---

## 5 Net-Present Value of User Cash-Flows (NPVU)

Let  

* $U$ = steady-state active user count,  
* $\text{ARPU}$ = average revenue per user per year (USD).

Perpetuity (USD)  

$$
\mathrm{NPVU}_{\text{USD}} = \frac{U\;\text{ARPU}}{d}.
$$

Finite horizon $T$ years  

$$
\mathrm{NPVU}_{T,\text{USD}} = U\,\text{ARPU}\,\frac{1-(1+d)^{-T}}{d}.
$$

After division by $P_\alpha$ the result is $NPVU_\alpha$.

---

## 6 Comparable-Deals Benchmark  

| Stage     | Median valuation (USD M) | Observations | IQR (25–75 %) |
|-----------|--------------------------|--------------|---------------|
| Pre-Seed  | 20   | 57  | 10 – 30 |
| Seed      | 26.8 | 156 | 15 – 50 |
| Strategic | 50   | 34  | 26 – 75 |
| Private   | 44   | 64  | 21 – 72 |
| Series A  | 125  | 2   | 113 – 138 |

---

## 7 Token-Supply Dynamics  

### 7.1 Maximum per-block issuance  

Let  

* $\Delta\tau$ = TAO minted per base-chain block,  
* $\sum_{j}p_{j}$ = cross-subnet price sum (empirically 1–2, baseline 1.5),  
* $\overline{\Delta\alpha_{i}}$ = subnet-specific hard cap on Alpha issuance.

$$
\delta_1 = \frac{\Delta \tau}{\sum_{j} p_{j}},\quad
\delta_2 = \overline{\Delta\alpha_{i}},\quad
\delta   = \min(\delta_1,\delta_2).
$$

Maximum issuance  

$$
\boxed{\Delta\alpha_{\max} = 2\,\delta}.
$$

### 7.2 Minimum net issuance  

Define  

* $\beta_m$ = fraction of miners' reward (0.41 δ) immediately burned,  
* $B_r,\,B_x$ = registration and external burns (Alpha block⁻¹).

$$
\boxed{\Delta\alpha_{\min} =
       2\,\delta -
       \bigl[\beta_m\,(0.41)\,\delta + B_r + B_x\bigr]}.
$$

### 7.3 Cumulative supply up to horizon *T*  

Let $t_0$ be subnet genesis; integrate over time $t$:

$$
S_{\max}(T) = \int_{t_0}^{T} \!\! \Delta\alpha_{\max}(t)\,\mathrm{d}t,
\qquad
S_{\min}(T) = \int_{t_0}^{T} \!\! \Delta\alpha_{\min}(t)\,\mathrm{d}t.
$$

Numerical evaluation is implemented in the companion calculator.

---

## 8 Estimating Future Circulating Supply  

To estimate the circulating Alpha at a future date $T$ the investor specifies:

| Required input | Symbol | Comment |
|----------------|--------|---------|
| Existing circulating supply (today) | $S_0$ | as on-chain |
| Average sum-of-prices $\langle\sum p\rangle$ | $\Sigma$ | choose within 1 – 2 |
| Miner-burn fraction | $\beta_m$ | 0 – 1 |
| Registration burn / block | $B_r$ | Alpha block⁻¹ |
| External burn / block | $B_x$ | Alpha block⁻¹ |
| Next TAO-halving date | $T_h$ | calendar date |

### 8.1 Block-level issuance across a halving boundary  

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
\end{cases}
$$

Compute the per-block limit  

$$
\delta^{(k)} = \min\!\Bigl(\tfrac{\Delta\tau^{(k)}}{\Sigma},
                           \overline{\Delta\alpha_{i}}\Bigr).
$$

### 8.2 Net Alpha minted in each segment  

Net per block  

$$
\Delta\alpha_{\text{net}}^{(k)} =
  2\,\delta^{(k)} -
  \bigl[\beta_m\,(0.41)\,\delta^{(k)} + B_r + B_x\bigr].
$$

Total minted  

$$
M^{(k)} = 7\,200 \times D_k \times \Delta\alpha_{\text{net}}^{(k)}.
$$

### 8.3 Projected circulating supply at $T$

$$
\boxed{S(T) = S_0 + M^{(1)} + M^{(2)}}.
$$

> **Worked example**  
> *Inputs:* $S_0 = 2.5$ M Alpha, $\Sigma = 1.5$, $\beta_m = 0.25$,  
> $B_r = 0.02$, $B_x = 0$ Alpha block⁻¹, current $\Delta\tau = 1$,  
> TAO halving in 180 days, horizon $T$ in 540 days.  
>   
> Segment-level calculations yield $M^{(1)} \approx 0.47$ M,  
> $M^{(2)} \approx 0.18$ M, hence $S(T) \approx 3.15$ M Alpha.

---

## 9 Conclusion
The framework now enables a practitioner to project circulating supply directly from observable burns, price aggregates and halving timing, then embed that projection into cost-, demand- and market-based valuation bounds.  
All variables are defined locally at first use to minimise cross-reference latency; numerical examples are readily reproduced with the associated calculator.