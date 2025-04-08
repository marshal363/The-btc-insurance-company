# Additional Components for sBTC Options Contract Dashboard

## Introduction

As a UI/UX-experienced product designer, I'll propose additional components for the **sBTC Options Contract** dashboard based on the "Risk-Averse Rachel" persona, whose primary motivation is to hedge Bitcoin volatility during significant price drops. These components will enhance the **Option Management Dashboard**, addressing her needs for clarity, control, reassurance, and actionable insights while keeping the design feasible for a hackathon MVP. I'll align each component with Rachel's goals, pain points, and technical context, building on the existing layout (Option Overview, P&L Visualization, Hedging Calculator, Action Panel, Status Bar).

---

## Persona Recap: Risk-Averse Rachel

- **Goals**:
  - Hedge BTC volatility
  - Minimize losses
  - Gain peace of mind
- **Pain Points**:
  - Fear of loss
  - Unclear costs/expiry
  - Limited Stacks familiarity
- **Technical Proficiency**: Intermediate (Bitcoin, basic DeFi)
- **Context**: Laptop, Firefox, home use during volatile markets

## Proposed Components

### 1. Portfolio Snapshot

- **Purpose**: Show Rachel's current STX and sBTC balances alongside her BTC portfolio value, tying her hedge to her overall holdings.
- **Placement**: Top-right card, above Option Overview (compact, glanceable).
- **Elements**:
  - **Balances**: "STX: 200 | sBTC: 0.5" (fetched via Stacks.js)
  - **BTC Value**: "2.5 BTC = $125,000" (mock $50K BTC price)
  - **Hedged %**: "12% Hedged" (based on active options, e.g., 0.3 sBTC / 2.5 BTC)
  - **Tooltip**: "Your wallet and hedging status."
- **UX Benefits**:
  - **Clarity**: Links option (0.1 sBTC) to her total portfolio
  - **Reassurance**: Seeing "200 STX" confirms she can exercise (100 STX needed)
  - **Pain Point Addressed**: Fear of insufficient funds
- **MVP**: Static mock BTC value, real STX/sBTC from wallet
- **Design**: Small card, green text for balances, gray for labels

### 2. Volatility Alert Banner

- **Purpose**: Notify Rachel of significant BTC price movements to prompt timely action (exercise or buy more options).
- **Placement**: Top of dashboard, dismissible banner (below Header).
- **Elements**:
  - **Message**: "BTC Dropped 5% to $47,500!" (red if drop, green if rise)
  - **Action**: "Review Hedge" (button links to Hedging Calculator)
  - **Dismiss**: "X" to close (reappears on next 5% move)
- **UX Benefits**:
  - **Actionability**: Alerts her to act during volatility (e.g., exercise if below $50K)
  - **Reassurance**: Proactively guards against missed opportunities
  - **Pain Point Addressed**: Anxiety over sudden drops
- **MVP**: Mock alert at $47,500 (static, toggleable for demo)
- **Design**: Red/yellow banner, bold 16px text, blue button

### 3. Option Timeline

- **Purpose**: Visualize the option's lifecycle (creation, purchase, expiry) to clarify its duration and urgency.
- **Placement**: Below P&L Visualization, horizontal bar.
- **Elements**:
  - **Timeline Bar**:
    - Start: "Created (Block 11500)"
    - Current: "Now (Block 12000)" (moving marker)
    - End: "Expires (Block 12345)" (3d 12h countdown)
  - **Milestones**: "Bought (Block 11900)" (dot on timeline)
  - **Color Coding**: Green (active), yellow (<50 blocks left), red (expired)
- **UX Benefits**:
  - **Clarity**: Translates block height to time (e.g., "3 days left")
  - **Control**: Helps Rachel plan (exercise before expiry)
  - **Pain Point Addressed**: Confusion over expiry timing
- **MVP**: Static bar with mock blocks, countdown via JS interval
- **Design**: Thin bar, 14px labels, animated marker

### 4. Hedge Effectiveness Meter

- **Purpose**: Quantify how well her current options protect against a BTC drop, boosting confidence in the hedge.
- **Placement**: Right sidebar, below Portfolio Snapshot.
- **Elements**:
  - **Gauge**: Circular meter (0-100%)
  - **Value**: "75% Effective" (mock: 0.3 sBTC hedges $15K of $20K drop)
  - **Subtext**: "Covers 75% of a 20% BTC drop."
  - **Tooltip**: "Based on active options vs. portfolio."
- **UX Benefits**:
  - **Reassurance**: Visual proof her hedge works (75% > 0%)
  - **Clarity**: Ties options to tangible protection
  - **Pain Point Addressed**: Fear hedge won't suffice
- **MVP**: Mock 75% (static), calculated as `(Options × 0.1 sBTC × BTC Price) / (Portfolio × Drop %)`
- **Design**: Green gauge, 16px bold value, gray subtext

### 5. Quick Guide Accordion

- **Purpose**: Provide on-demand help for Stacks novices, reducing onboarding friction.
- **Placement**: Bottom-right, collapsible panel.
- **Elements**:
  - **Sections** (collapsed by default):
    - "What's an sBTC Option?": "A hedge against BTC drops."
    - "How to Exercise": "Pay 100 STX before expiry."
    - "Why Testnet?": "Demo funds, no real risk."
  - **Toggle**: "Help ▼" (expands to show all)
- **UX Benefits**:
  - **Clarity**: Answers "What am I doing?" for Stacks newbies
  - **Control**: Optional, non-intrusive support
  - **Pain Point Addressed**: Limited Stacks familiarity
- **MVP**: Static text, simple expand/collapse JS
- **Design**: Gray card, blue links, 14px body text

## Dashboard Mockup (Text-Based)

```
--------------------------------------------------
| sBTC Options                  Connected: ST1X…ABC [Testnet] |
| [Volatility Alert: BTC Dropped 5% to $47,500!] [Review Hedge] |
--------------------------------------------------
| Portfolio Snapshot     | Option Overview                |
| STX: 200  sBTC: 0.5    | Status: Active (green)         |
| 2.5 BTC = $125,000     | sBTC: 0.1  Premium: 50 STX     |
| 12% Hedged             | Strike: 100 STX  Expiry: 3d    |
|-----------------------|---------------------------------|
| Hedge Effectiveness   | Calculate Your Hedge [▼]        |
| [Gauge: 75%]          | Portfolio: [2.5 BTC]            |
| Covers 75% of 20% drop| Hedge %: [50%] <--------->      |
|-----------------------| Results: 3 Options, 150 STX     |
| P&L Visualization     |---------------------------------|
| [Graph: -$50 to +$200]| Option Timeline                 |
| BTC: $47,500 (dashed) | [Created 11500]--[Now 12000]--[Expires 12345] |
| Breakeven: $5,150     |---------------------------------|
|                       | Actions                         |
|                       | [Buy Option] [Exercise Option] [Refresh] |
| Quick Guide [▼]       |---------------------------------|
| What's an sBTC Option?| Status: Block 12000 | Tx: Confirmed |
--------------------------------------------------
```

## UI/UX Rationale

### Why These Components?

1. **Portfolio Snapshot**: Addresses Rachel's need to see her hedge in context (12% of 2.5 BTC), reducing fund-related anxiety.
2. **Volatility Alert**: Triggers action during drops (her core concern), making the dashboard proactive.
3. **Option Timeline**: Clarifies expiry (a key friction point), giving her control over timing.
4. **Hedge Effectiveness**: Quantifies protection (75% of a 20% drop), boosting trust in the tool.
5. **Quick Guide**: Eases her Stacks learning curve, ensuring she feels supported.

### Design Principles

- **Consistency**: Cards match existing style (blue borders, green highlights)
- **Prioritization**: Critical info (Snapshot, Alerts) up top; support (Guide) below
- **Feedback**: Real-time updates (block height, balances) via Stacks.js
- **Simplicity**: Static mocks for MVP (e.g., 75% effectiveness, $47,500 alert)

### Emotional Impact

- **Reassurance**: Snapshot + Effectiveness show "You're covered."
- **Urgency**: Alert + Timeline prompt "Act now if BTC drops."
- **Confidence**: Calculator + Guide say "You've got this."

## Implementation

### MVP Implementation

- **Tech**: React, Stacks.js, Chart.js (for gauge/timeline)
- **Data**: Mock BTC price ($47,500), real STX/sBTC balances, static calculations
- **Effort**: ~1-2 hours per component (UI + logic), total ~8-10 hours

### Enhancements (Post-MVP)

- **Live Data**: BTC price feed for alerts, effectiveness
- **Customization**: Adjustable drop % in Effectiveness Meter
- **Mobile View**: Stack cards vertically for responsiveness

## Conclusion

### Why It Fits Rachel

- **Hedging Focus**: Snapshot + Effectiveness tie options to her BTC safety
- **Low Friction**: Timeline + Guide reduce Stacks confusion
- **Proactive**: Alerts + Calculator help her act during volatility
