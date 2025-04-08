# UI/UX Design Approach: Hedging Calculator Component

## Introduction

As a UI/UX-experienced product designer, I'll propose a Hedging Calculator Component for the sBTC Options Contract dashboard. This component will empower "Risk-Averse Rachel" to calculate the amount of premium (STX) or sBTC she needs to buy in call options to hedge her Bitcoin portfolio effectively against significant price drops. It'll integrate seamlessly into the option management dashboard, enhancing its utility for her specific goal of volatility protection. Here's the approach:

## Design Goals

- **Utility**: Help Rachel determine how many options (premium in STX, sBTC locked) to buy based on her BTC portfolio size and desired hedge level.
- **Clarity**: Present inputs and outputs in a simple, digestible format.
- **Reassurance**: Show how the hedge mitigates loss, reducing anxiety.
- **Actionability**: Link results to the "Buy Option" action.
- **MVP Fit**: Keep it lightweight for hackathon implementation.

## Component Overview

### Purpose

The Hedging Calculator lets Rachel input her BTC portfolio size and desired hedge percentage, then calculates:

- Number of sBTC options needed.
- Total STX premium cost.
- Total STX strike cost (if exercised).
- Potential loss protection vs. premium risk.

### Placement

- **Dashboard Integration**: A collapsible card below the "Option Overview" and above the "P&L Visualization."
- **Label**: "Calculate Your Hedge" (with a toggle to expand/collapse).

### Visual Design

- **Style**: Card with a clean, bordered layout (matches dashboard aesthetic).
- **Colors**: Blue (#1E90FF) for inputs/buttons, Green (#32CD32) for positive outcomes, Red (#FF4500) for costs/losses.
- **Font**: Inter, 14px body, 16px labels.

## Component Structure

### Inputs

#### Portfolio Size (BTC):

- **Field**: Number input (e.g., "2.5 BTC").
- **Default**: 1 BTC.
- **Tooltip**: "Your total Bitcoin holdings to hedge."

#### Hedge Percentage (%):

- **Field**: Slider (0-100%, step 5%).
- **Default**: 50%.
- **Tooltip**: "% of portfolio value to protect against a drop."

#### BTC Price (USD):

- **Field**: Number input (e.g., "$50,000").
- **Default**: Mock $50K (Testnet static value).
- **Tooltip**: "Current BTC price (mock data for demo)."

### Outputs

#### Options Needed:

- **Display**: "3 Options" (each 0.1 sBTC).
- **Logic**: (Portfolio BTC × Hedge %) ÷ 0.1 sBTC per option.

#### Total Premium (STX):

- **Display**: "150 STX" (red text).
- **Logic**: Options Needed × 50 STX.

#### Total Strike Cost (STX):

- **Display**: "300 STX" (red text).
- **Logic**: Options Needed × 100 STX.

#### Hedge Coverage (USD):

- **Display**: "$15,000" (green text).
- **Logic**: Options Needed × 0.1 sBTC × BTC Price.

#### Max Loss (USD):

- **Display**: "-$150" (red text).
- **Logic**: Total Premium × STX Price (mock $1/STX).

### Action Button

- **Label**: "Buy [X] Options" (e.g., "Buy 3 Options").
- **Style**: Blue button, disabled if wallet balance < premium.
- **Action**: Triggers "Buy Option" flow for calculated quantity.

## Mockup (Text-Based)

```
| Calculate Your Hedge [Toggle: ▼]                          |
|-----------------------------------------------------------|
| Inputs:                                                   |
| Portfolio Size: [2.5 BTC]                                 |
| Hedge %: [50%] <---------> (slider)                       |
| BTC Price: [$50,000]                                      |
|-----------------------------------------------------------|
| Results:                                                  |
| Options Needed: 3                                         |
| Total Premium: 150 STX (red)                              |
| Total Strike Cost: 300 STX (red)                          |
| Hedge Coverage: $15,000 (green)                           |
| Max Loss: -$150 (red)                                     |
| [Buy 3 Options] (blue button)                             |
```

## Calculation Logic (Example)

### Inputs:

- Portfolio: 2.5 BTC.
- Hedge %: 50%.
- BTC Price: $50,000.

### Steps:

1. Portfolio Value: 2.5 × $50,000 = $125,000.
2. Hedged Value: $125,000 × 50% = $62,500.
3. sBTC Needed: $62,500 ÷ $50,000 = 1.25 sBTC.
4. Options Needed: 1.25 ÷ 0.1 = 12.5 → 13 (rounded up).
5. Premium: 13 × 50 STX = 650 STX.
6. Strike Cost: 13 × 100 STX = 1,300 STX.
7. Coverage: 13 × 0.1 × $50,000 = $65,000.
8. Max Loss: 650 STX × $1 = -$650 (mock STX price).

**Output**: "13 Options, 650 STX Premium, 1,300 STX Strike, $65,000 Coverage, -$650 Max Loss."

_For MVP, simplify to 3 options (0.3 sBTC) to match hackathon scope, adjusting dynamically based on input._

## UI/UX Approach

### Design Principles

- **Intuitive Inputs**: Familiar fields (BTC, %) with defaults to reduce effort.
- **Immediate Feedback**: Results update live as inputs change (React state).
- **Risk Transparency**: Red for costs/losses, green for protection.
- **Action Link**: "Buy X Options" ties calculation to execution.

### User Flow

1. **Step 1**: Rachel expands calculator, enters "2.5 BTC" and "50%."
2. **Step 2**: Sees "3 Options, 150 STX Premium, 300 STX Strike, $15,000 Coverage."
3. **Step 3**: Clicks "Buy 3 Options," signs tx for 150 STX (loops "Buy Option" 3x).
4. **Outcome**: Hedge active, dashboard updates to reflect ownership.

### Emotional Support

- **Reassurance**: "$15,000 Coverage" in green shows protection.
- **Control**: Slider lets her adjust hedge level (e.g., 25% for less cost).
- **Clarity**: "Max Loss: -$150" caps her downside, easing fear.

### Accessibility

- **Labels**: "Portfolio Size (BTC)" readable by screen readers.
- **Contrast**: Green/red text meets WCAG 2.1.
- **Keyboard**: Tab through inputs, Enter to calculate.

### Integration with Dashboard

- **Position**: Below "Option Overview" to contextualize single-option data (0.1 sBTC, 50 STX).
- **Sync**: Updates P&L Visualization—e.g., 3 options shift breakeven to $15,450 ($15,000 + $450 costs).
- **Real-Time**: Fetches wallet STX balance to enable/disable "Buy" button.

## MVP Implementation

### Tech Stack

- **Frontend**: React + Stacks.js.
- **Data**: Mock BTC price ($50K), STX price ($1) for calculations.

### Logic

Simple JS function:

```javascript
const calculateHedge = (btc, hedgePercent, btcPrice) => {
  const hedgedBtc = btc * (hedgePercent / 100);
  const options = Math.ceil(hedgedBtc / 0.1);
  return {
    options,
    premium: options * 50,
    strike: options * 100,
    coverage: options * 0.1 * btcPrice,
    maxLoss: options * 50 * 1, // Mock STX price
  };
};
```

### UI Components

Card with `<input>`, `<input type="range">`, and `<p>` for results.

## Why It Works for Rachel

- **Hedging Precision**: Calculates exact options needed (e.g., 3 for 50% of 0.6 BTC).
- **Risk Clarity**: Shows $150 premium as max loss vs. $15,000 protection.
- **Ease**: Pre-fills mock BTC price, reducing input burden.
- **Actionable**: Direct "Buy" button ties planning to execution.

## Enhancements (Post-MVP)

- **Live Price Feed**: Replace mock $50K with real BTC/STX data.
- **Multi-Option Buy**: Batch tx for multiple options in one click.
- **Loss Threshold**: Input "Max BTC Drop %" to refine hedge.

---

This calculator makes the dashboard a powerful hedging tool, aligning with Rachel's need to protect against BTC drops. Want a Figma mockup, code snippet, or deeper integration details? Let me know!
