# UI/UX Design Approach: Option Management Dashboard

## Introduction

As a UI/UX-experienced product designer, I'll craft a dashboard design approach for the sBTC Options Contract dApp, specifically tailored for "Risk-Averse Rachel," whose goal is to hedge Bitcoin volatility during significant price drops. The dashboard will focus on option management, providing clear, actionable insights with a Profit & Loss (P&L) visualization (price vs. gain/loss) as a key component. The design will prioritize usability, clarity, and emotional reassurance, aligning with Rachel's cautious mindset and the hackathon's emphasis on a functional MVP.

## Design Goals

- **Clarity**: Make option status, costs, and hedging outcomes instantly understandable.
- **Actionability**: Enable quick decisions (e.g., exercise or monitor) with minimal friction.
- **Reassurance**: Visually reinforce security and control to ease anxiety.
- **Focus**: Highlight P&L to help Rachel assess her hedge against BTC volatility.
- **Simplicity**: Keep it MVP-ready—functional, not overbuilt.

## Visual Components & Layout

### Layout Structure

- **Single-Page Dashboard**: A clean, card-based layout with a top-down flow.
- **Sections**:
  - Header: Branding, wallet status, and connectivity.
  - Option Overview: Key details (status, expiry, costs).
  - P&L Visualization: Price vs. gain/loss graph.
  - Action Panel: Buttons for user actions.
  - Status Bar: Real-time updates (block height, tx status).

### Color Palette

- **Primary**: Blue (#1E90FF) – Trust, stability (Stacks-inspired).
- **Accent**: Green (#32CD32) – Gain/success; Red (#FF4500) – Loss/warning.
- **Neutral**: Gray (#F5F5F5, #333) – Background, text for calm readability.
- **Highlight**: Yellow (#FFD700) – Alerts (e.g., nearing expiry).

### Typography

- **Font**: Inter (clean, modern, legible).
- **Sizes**:
  - H1: 24px (section titles).
  - H2: 18px (card headers).
  - Body: 14px (details).
  - Small: 12px (subtext).

## Key Visual Components

### 1. Header

**Elements**:

- Logo/Title: "sBTC Options" (left, blue, clickable to refresh).
- Wallet Status: "Connected: ST1X…ABC" or "Connect Wallet" button (right, green outline when connected).
- Network Indicator: "Testnet" badge (top-right, gray).

**Purpose**: Establish trust, show connectivity at a glance.

**UX**: One-click wallet reconnect if disconnected.

### 2. Option Overview Card

**Elements**:

- Status Tag: "Active" (green), "Expired" (gray), or "Available" (blue).
- Details Grid:
  - "sBTC Amount: 0.1" (locked by seller).
  - "Premium Paid: 50 STX" (cost to hedge).
  - "Strike Price: 100 STX" (exercise cost).
  - "Expiry: 3d 12h (Block 12345)" (countdown timer).
- Hedging Context: "Protects $5,000 BTC at $50K" (mock BTC price).

**Purpose**: Summarize the option's state and hedging value.

**UX**: Real-time expiry countdown (updates every 10s via Stacks.js).

### 3. P&L Visualization (Price vs. Gain/Loss)

**Component**: Line Graph

- X-Axis: BTC Price ($40K-$60K range, mock data).
- Y-Axis: Gain/Loss in USD (-$1,000 to +$1,000).
- Line: P&L curve based on strike price (100 STX ≈ $100 at mock rate).

**Key Points**:

- Breakeven: $5,150 ($5,000 sBTC + $150 premium/strike in USD).
- Current BTC Price: Vertical dashed line (e.g., $48K, red if below strike).
- Gain Zone: Green fill above breakeven.
- Loss Zone: Red fill below premium cost (-$50).
- Tooltip: Hover shows "At $48K: -$50 (premium lost)" or "+$200 (hedge gain)."

**Purpose**: Visualize hedging effectiveness—shows Rachel her protection level if BTC drops (e.g., locks in sBTC value) vs. loss if it rises (premium cost).

**UX**: Simple, interactive (hover for details), updates with mock BTC price feed.

**MVP Note**: Use static mock data (e.g., BTC at $48K) for hackathon; future integration with a price oracle.

### 4. Action Panel

**Elements**:

- Buttons (context-sensitive):
  - "Buy Option" (blue, disabled if owned/expired).
  - "Exercise Option" (green, disabled if not owned or expired).
  - "Refresh" (gray, reloads contract state).
- Subtext: "100 STX needed to exercise" (warning if balance < 100 STX).

**Purpose**: Drive key actions with clear affordances.

**UX**: Disable irrelevant buttons based on get-option-details (e.g., only buyer sees "Exercise").

### 5. Status Bar

**Elements**:

- Block Height: "Current Block: 12000" (updates every ~10s).
- Transaction Status: "Last Tx: Confirmed (ID: abc123)" (link to Testnet explorer).
- Alert: "Expiry in <50 blocks!" (yellow banner if close).

**Purpose**: Provide real-time feedback and urgency cues.

**UX**: Non-intrusive, bottom-aligned, collapsible if no alerts.

## Dashboard Mockup (Text-Based)

```
| sBTC Options                Connected: ST1X…ABC [Testnet] |
-------------------------------------------------------------
| Option Overview                                           |
| Status: Active (green)                                    |
| sBTC Amount: 0.1            Premium Paid: 50 STX          |
| Strike Price: 100 STX        Expiry: 3d 12h (12345)       |
| Protects $5,000 BTC at $50K                              |
-------------------------------------------------------------
| P&L Visualization                                         |
| [Graph: Line showing -$50 to +$200]                       |
| X: $40K-$60K                 Y: -$1K to +$1K             |
| Current BTC: $48K (dashed)   Breakeven: $5,150           |
-------------------------------------------------------------
| Actions                                                   |
| [Buy Option] [Exercise Option] [Refresh]                  |
| Need 100 STX to exercise (red if <100 STX)                |
-------------------------------------------------------------
| Status: Block 12000          Tx: Confirmed (abc123)       |
| [Alert: Expiry in 48 blocks!]                             |
```

## UI/UX Approach

### Design Principles

- **Simplicity**: Minimal elements, focus on hedging insights.
- **Feedback**: Immediate tx confirmations, real-time expiry.
- **Trust**: Clean design, Bitcoin/Stacks branding for credibility.
- **Guidance**: Tooltips explain P&L ("Why -$50? Premium lost if unused").

### User Flow Integration

- **Entry**: Rachel connects wallet, sees "Active" option.
- **Assessment**: P&L graph shows her hedge protects below $5,150 BTC.
- **Action**: Clicks "Buy Option" (50 STX), later "Exercise" (100 STX) if BTC drops.
- **Monitoring**: Status bar and graph update, alerting her to act or wait.

### P&L Visualization Details

**Why It Works**:

- Shows Rachel her max loss (50 STX premium) vs. potential gain (sBTC value - 100 STX strike) if BTC drops (e.g., to $40K).
- Ties directly to her goal: "I'm safe if BTC crashes."

**MVP Implementation**:

- Static graph with mock BTC at $48K (Testnet lacks live feeds).
- Formula: Gain/Loss = (BTC Price × 0.1 sBTC) - (50 STX + 100 STX converted to USD).
- Example: At $48K, sBTC = $4,800; Loss = $4,800 - ($5,000 + $150) = -$350 (but capped at -$50 if unexercised).

### Accessibility

- **Contrast**: High-contrast text/buttons (WCAG 2.1 compliant).
- **Keyboard Navigation**: Tab through actions (e.g., Buy, Exercise).
- **Screen Reader**: Labels like "P&L Graph: Loss -$50 at $48K BTC."

## Opportunities for Enhancement

- **Real-Time Price Feed**: Integrate a BTC/STX oracle (post-MVP).
- **Alert System**: Pop-up/email at BTC drop thresholds (e.g., 5% below strike).
- **Portfolio View**: Show total STX/sBTC balance alongside P&L.
- **Educational Tooltip**: "How Hedging Works" on hover over graph.

## Prototype Tools

- **Figma**: Mock up dashboard (cards, graph, buttons).
- **React + Chart.js**: Build P&L graph with mock data.
- **Stacks.js**: Fetch contract state for real-time updates.

## Why This Works for Rachel

- **Hedging Focus**: P&L visualizes her protection (e.g., sBTC at $4,800 vs. $5,000 market loss).
- **Low Friction**: Simple layout, clear actions reduce overwhelm.
- **Emotional Support**: Green "Active" status and graph reassure her BTC is safe.

---

This dashboard balances hackathon constraints (MVP focus) with Rachel's need for clarity and control. Want a Figma sketch, code snippet for the graph, or more refinements? Let me know!
