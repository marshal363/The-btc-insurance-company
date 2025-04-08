As a UI/UX-experienced product designer, I’ll propose a **Straddle View Table** component for the **sBTC Options Contract** dashboard, tailored to "Risk-Averse Rachel" and her goal of hedging Bitcoin volatility during significant price drops. This table will display option information—call and put strikes—acting as a market proxy for Bitcoin options on the Stacks blockchain using sBTC. It’ll provide Rachel with a broader view of hedging opportunities, enhancing her ability to manage risk effectively. Here’s the approach:

---

# UI/UX Design Approach: Straddle View Table Component

## Design Goals

- **Comprehensive Insight**: Show call and put options to reflect market sentiment and hedging options.
- **Hedging Relevance**: Highlight strikes relevant to Rachel’s BTC portfolio and volatility concerns.
- **Clarity**: Present complex data (calls, puts, strikes) in an intuitive, scannable format.
- **Actionability**: Enable quick decisions to buy or monitor options.
- **MVP Fit**: Simplify for hackathon scope with mock data.

## Component Overview

### Purpose

The **Straddle View Table** displays a range of sBTC options (calls and puts) with their strike prices, premiums, and statuses, mimicking a straddle view (simultaneous call/put perspective) to proxy Bitcoin market dynamics. It helps Rachel assess:

- **Calls**: Hedge against drops by locking in sBTC at a fixed STX price.
- **Puts**: (Future potential) Sell sBTC at a fixed price if BTC plummets.
- **Market Proxy**: Approximate BTC option pricing via STX/sBTC strikes.

### Placement

- **Dashboard Integration**: Below the “P&L Visualization” and above the “Action Panel,” as a scrollable table card.
- **Label**: “sBTC Options Market” (with a tooltip: “View available calls and puts”).

### Visual Design

- **Style**: Bordered table card, consistent with dashboard (blue headers, gray rows).
- **Colors**:
  - Blue (#1E90FF): Headers, active options.
  - Green (#32CD32): Calls (buy sBTC).
  - Red (#FF4500): Puts (sell sBTC, mock for MVP).
  - Gray (#F5F5F5): Background, expired options.
- **Font**: Inter, 14px body, 16px headers.

---

## Component Structure

### Columns

1. **Type**: “Call” or “Put” (icon: ↑ for call, ↓ for put).
2. **Strike Price (STX)**: Price to buy/sell sBTC (e.g., 100 STX).
3. **Premium (STX)**: Cost to buy the option (e.g., 50 STX).
4. **sBTC Amount**: Locked amount per option (e.g., 0.1 sBTC).
5. **Expiry**: Time/block remaining (e.g., “3d 12h” or “Block 12345”).
6. **Status**: “Active” (blue), “Expired” (gray), “Owned” (green).
7. **Action**: “Buy” button (blue, disabled if owned/expired).

### Rows (Mock Data for MVP)

- Focus on calls (per current contract); puts mocked for future expansion.
- Example:
  | Type | Strike (STX) | Premium (STX) | sBTC | Expiry | Status | Action |
  |-------|--------------|---------------|------|-------------|--------|-------------|
  | Call | 100 | 50 | 0.1 | 3d 12h | Owned | [Disabled] |
  | Call | 120 | 60 | 0.1 | 2d 8h | Active | [Buy] |
  | Call | 80 | 40 | 0.1 | 4d 1h | Active | [Buy] |
  | Put | 90 | 45 | 0.1 | 3d 12h | Active | [Disabled] |
  | Call | 100 | 50 | 0.1 | Expired | Expired| [Disabled] |

### Features

- **Sorting**: Click headers (e.g., Strike, Expiry) to sort ascending/descending.
- **Filter**: Dropdown: “All,” “Calls,” “Puts,” “Active Only” (MVP: static “Calls”).
- **Highlight**: Bold row for Rachel’s owned option (e.g., 100 STX strike).
- **Tooltip**: Hover on strike: “Buy 0.1 sBTC for 100 STX if BTC drops.”

---

## Mockup (Text-Based)

```
--------------------------------------------------
| sBTC Options Market [Filter: Calls ▼]          |
--------------------------------------------------
| Type | Strike | Premium | sBTC | Expiry | Status | Action |
|------|--------|---------|------|--------|--------|--------|
| Call | 100    | 50 STX  | 0.1  | 3d 12h | Owned  | [----] |
| Call | 120    | 60 STX  | 0.1  | 2d 8h  | Active | [Buy]  |
| Call | 80     | 40 STX  | 0.1  | 4d 1h  | Active | [Buy]  |
| Put  | 90     | 45 STX  | 0.1  | 3d 12h | Active | [----] |
| Call | 100    | 50 STX  | 0.1  | Expired| Expired| [----] |
--------------------------------------------------
```

---

## UI/UX Approach

### Design Principles

1. **Scannability**: Table format with concise columns for quick comparison.
2. **Relevance**: Focus on calls (Rachel’s hedge tool), mock puts for context.
3. **Feedback**: Highlight owned option, disable irrelevant actions.
4. **Trust**: Proxy market view builds confidence in sBTC’s utility.

### User Flow Integration

- **Entry**: Rachel sees her 100 STX call as “Owned.”
- **Assessment**: Compares strikes (80, 120 STX) to hedge more/less aggressively.
- **Action**: Clicks “Buy” on 80 STX call if BTC drops further (cheaper hedge).
- **Monitoring**: Checks expiry across options to plan next move.

### Emotional Support

- **Reassurance**: Multiple options show “I have choices to protect my BTC.”
- **Control**: Sorting/filtering lets her focus on relevant strikes.
- **Clarity**: “Owned” row confirms her active hedge.

### Accessibility

- **Contrast**: Blue/green/red text on gray meets WCAG 2.1.
- **Keyboard**: Tab through rows, Enter to “Buy.”
- **Screen Reader**: “Call option, Strike 100 STX, Owned.”

---

## Integration with Dashboard

- **Sync**: Updates with “Portfolio Snapshot” (e.g., 0.3 sBTC hedged across 3 calls).
- **P&L Link**: Selected row’s strike adjusts P&L Visualization (e.g., 80 STX breakeven).
- **Calculator Tie-In**: “Options Needed” from Hedging Calculator highlights matching strikes (e.g., 3 × 100 STX).

## MVP Implementation

- **Tech**: React, Stacks.js, `<table>` with mock data.
- **Data**: 5 static rows (3 calls, 1 put, 1 expired), real “Owned” status from contract.
- **Logic**:
  ```javascript
  const options = [
    {
      type: "Call",
      strike: 100,
      premium: 50,
      sbtc: 0.1,
      expiry: "3d 12h",
      status: "Owned",
    },
    {
      type: "Call",
      strike: 120,
      premium: 60,
      sbtc: 0.1,
      expiry: "2d 8h",
      status: "Active",
    },
    // ...
  ];
  ```
- **Effort**: ~2-3 hours (UI + mock data).

## Why It Works for Rachel

- **Hedging Focus**: Calls at 80-120 STX let her adjust to BTC drops (e.g., $40K-$60K).
- **Market Proxy**: Mimics BTC options (strike ≈ BTC price in STX), showing sBTC’s potential.
- **Low Friction**: Simple table reduces overwhelm vs. complex charts.
- **Actionable**: “Buy” buttons tie to her goal of securing more hedges.

## Enhancements (Post-MVP)

- **Live Options**: Fetch real contract data via Stacks.js.
- **Puts**: Enable put options when sBTC supports selling.
- **Price Proxy**: Convert strikes to BTC USD equivalents (e.g., 100 STX ≈ $5,000).

---

## Updated Dashboard Flow

- **Portfolio Snapshot**: “2.5 BTC, 12% Hedged.”
- **Option Overview**: “0.1 sBTC, 100 STX Strike.”
- **Hedging Calculator**: “3 Options for 50% Hedge.”
- **P&L Visualization**: “-$50 to +$200 at $47,500 BTC.”
- **Straddle View Table**: “Compare 80, 100, 120 STX strikes.”
- **Action Panel**: “Buy” or “Exercise” based on table selection.

This table adds a market lens to Rachel’s hedging toolkit, making the dashboard a one-stop shop for volatility management. Want a wireframe, code snippet, or more components? Let me know!
