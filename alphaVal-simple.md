# Bittensor Subnet Valuation Framework
*Revised 4 June 2025*

---

## 1 Introduction
This memorandum develops an analytical framework for valuing Bittensor subnets.
The treatment combines

1. hardware operating expenditure,
2. user-generated cash-flows,
3. peer financing benchmarks, and
4. the token-supply mechanics dictated by Dynamic TAO (dTAO).

All monetary figures are stated in United States dollars (USD) unless noted; all present-value calculations employ a **20 percent** discount rate.

---

## 2 Methodological Pillars

| Pillar                     | Captured quantity                                                     | Output symbol |
| -------------------------- | --------------------------------------------------------------------- | ------------- |
| Cost-of-Participation      | Net-present cost of running the required mining + validation set       | NPC_alpha |
| Net-Present Value of Users | Discounted profit stream from end users                                | NPVU_alpha |
| Comparable-Deals Benchmark | Median post-money valuations from 313 decentralised-AI financings      | V_market |
| Inflation Anchoring        | Circulating Alpha at investor horizon T                            | S_max(T), S_min(T) |

Here S_max(T) and S_min(T) denote, respectively, the cumulative Alpha under maximal and minimal issuance. 