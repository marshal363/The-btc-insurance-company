# UI/UX Design Approach: BitHedge Home Page

## Introduction

As a senior UI/UX designer, I'm proposing a comprehensive Home Page design for BitHedge that combines essential elements from the existing dashboard with new components inspired by the "welcome-view" reference images. This Home Page will serve as the central hub for both new and returning users, providing an overview of the options market while maintaining the hedging focus that's core to BitHedge's value proposition. This design approach is tailored for "Risk-Averse Rachel" while also accommodating more advanced users who want market data at a glance.

## Design Goals

- **Welcoming Entry Point**: Create an intuitive landing area that orients users to the BitHedge platform
- **Market Context**: Provide snapshot of overall options market before diving into specifics
- **User Context**: Display personalized portfolio information when wallet is connected
- **Clear Navigation**: Guide users to specialized views (Option Data and Easy Option Trading)
- **Actionability**: Maintain direct paths to key actions while reducing complexity

## Visual Components & Layout

### Layout Structure

- **Top Navigation**: App header with logo, main navigation, and wallet connection
- **Hero Section**: Welcome banner with key value proposition when not connected
- **Dashboard Grid**: 2-3 column responsive layout with card-based components
- **Market Overview**: Prominent section showing option market status
- **Personal Portfolio**: Wallet-dependent section showing user's options and positions
- **Quick Actions**: Contextual buttons for common tasks

### Color Palette & Typography

- Maintaining the established design system with:
  - **Primary**: Blue (#1E90FF) – Trust, stability
  - **Accent**: Green (#32CD32) – Gain; Red (#FF4500) – Loss
  - **Neutral**: Gray (#F5F5F5, #333) – Background, text
  - **Font**: Inter (clean, modern, legible)

## Key Visual Components

### 1. Navigation Header

**Elements**:

- Logo/Title: "BitHedge" (left)
- Main Navigation:
  - "Home" (active)
  - "Option Data" (link to detailed market view)
  - "Easy Trade" (link to simplified trading interface)
- Wallet Connection: "Connect Wallet" button or connected address
- Network Indicator: "Testnet" badge

**Purpose**: Provide consistent navigation across all views and wallet status

### 2. Welcome Hero (When Not Connected)

**Elements**:

- Headline: "Hedge Bitcoin Volatility with sBTC Options"
- Subheadline: "Protect your Bitcoin portfolio against price drops with decentralized options"
- Key Benefits: 3-4 bullet points highlighting core value props
- CTA Button: "Connect Wallet to Start"
- Preview Image: Screenshot of option interface

**Purpose**: Quickly communicate value proposition to new users

### 3. Market Overview Panel

**Elements**:

- Section Title: "Options Market Overview"
- Market Statistics:
  - Total Options Available
  - Price Trend Indicator (24h)
  - Volume/Open Interest
- Quick Filter: Tabs for "All", "Calls", "Puts"
- Featured Options Grid:
  - Type (Call/Put)
  - Strike (STX)
  - Premium (STX)
  - Expiry
  - Quick Action Button
- Market Graph: Simplified visualization of price trends

**Purpose**: Provide at-a-glance market status and available options

### 4. Portfolio Summary (When Connected)

**Elements**:

- STX/sBTC Balances
- Portfolio Value Estimation
- Hedging Status (% Protected)
- Quick Stats:
  - Options Owned
  - Unrealized P&L
  - Next Expiration
- Alert Banner (conditional): Volatility or expiry warnings

**Purpose**: Give Rachel a quick view of her portfolio and hedging status

### 5. P&L Visualization

**Elements**:

- Adapted from existing dashboard
- Toggle between portfolio-wide and per-option views
- Default to simplified view with option to expand

**Purpose**: Maintain the critical P&L visualization while fitting into home layout

### 6. Quick Action Cards

**Elements**:

- "Create New Option" (seller)
- "Buy Option" (buyer)
- "Calculate Hedge" (opens hedging calculator)
- "View Your Options" (when multiple options owned)

**Purpose**: Provide direct paths to key actions without cluttering interface

### 7. Education & Guidance Section

**Elements**:

- "New to Options?" card with beginner resources
- "How BitHedge Works" expandable guides
- Risk Disclaimer (linked to detail page)
- FAQ Accordion

**Purpose**: Support new users and build confidence through education

## Home Page Mockup (Text-Based)

```
+------------------------------------------------------+
| BitHedge      Home | Option Data | Easy Trade   Connect Wallet [Testnet] |
+------------------------------------------------------+
|                                                      |
| Hedge Bitcoin Volatility with sBTC Options           |
| Protect your portfolio against price drops           |
| [Connect Wallet to Start]                            |
|                                                      |
+------------------------------------------------------+
| Options Market Overview           | Portfolio Summary (if connected)   |
|-----------------------------------|----------------------------------|
| Available: 12 Calls, 8 Puts      | STX: 200  sBTC: 0.5              |
| BTC Price: $48,500 (-2.3%)       | Portfolio Value: $125,000        |
| 24h Volume: 350 STX              | Hedged: 12% (0.3 sBTC)           |
|-----------------------------------|----------------------------------|
| Featured Options:                 | Your Options:                    |
|                                   |                                  |
| Type | Strike | Premium | Expiry  | 1 Call @ 100 STX - 3d 12h left   |
|------|--------|---------|---------|                                  |
| Call | 100    | 50 STX  | 3d 12h  | [View Details] [Exercise]        |
| Call | 120    | 60 STX  | 2d 8h   |                                  |
| Put  | 90     | 45 STX  | 3d 12h  | [Create Option] [Buy Option]     |
+-----------------------------------|----------------------------------+
|                                   |                                  |
| P&L Visualization                 | Quick Calculate                  |
| [Simplified Graph]                | Portfolio: [2.5 BTC]             |
| [Expand]                          | Hedge %: [50%]                   |
|                                   | Need: 3 options (150 STX)        |
+-----------------------------------|----------------------------------+
|                                   |                                  |
| New to Options?                   | Current Block: 12000             |
| [Learn the Basics]                | Last Tx: Confirmed               |
|                                   |                                  |
+------------------------------------------------------+
```

## UI/UX Approach

### Personalization Logic

- **Not Connected**: Focus on education, value proposition, market overview
- **Connected, No Options**: Emphasize "Buy First Option" and hedging calculator
- **Connected, With Options**: Highlight portfolio status and option management
- **Seller View**: Show option creation and management tools prominently

### User Flow Integration

1. **New User**:

   - Lands on Home Page with welcome hero
   - Reviews market overview to understand available options
   - Connects wallet
   - Uses hedging calculator to determine needs
   - Clicks "Buy Option" → Easy Option View

2. **Returning User (Option Owner)**:

   - Lands on Home Page (wallet auto-connects)
   - Sees portfolio summary with owned options
   - Monitors P&L and market trends
   - Takes action on expiring options or buys additional options

3. **Advanced User**:
   - Uses navigation to move between Home, Option Data, and Easy Trade views
   - Leverages market overview to track trends
   - May create options (as seller) or execute complex strategies

### Mobile Responsiveness

- Stack sections vertically on mobile
- Collapse market overview to key statistics with expandable details
- Touch-friendly buttons and controls (min 44px touch targets)
- Swipe navigation between key sections

## Implementation Strategy

### MVP Components

- Basic navigation with placeholder links to Option Data and Easy Trade views
- Welcome hero (non-connected state)
- Simplified market overview with static data
- Portfolio summary (connected state)
- Core P&L visualization from existing dashboard
- Quick action buttons for primary functions

### Progressive Enhancement

- Implement tabbed filtering in market overview
- Add interactive elements to P&L visualization
- Expand educational resources section
- Add personalization based on user history and preferences

## Why This Approach Works for BitHedge

- **Maintains Focus**: Core hedging functionality remains prominent while adding market context
- **Progressive Disclosure**: Complexity increases as users navigate from Home to specialized views
- **Accommodates Multiple Users**: Serves both Risk-Averse Rachel and more advanced traders
- **Scalable Architecture**: Establishes navigation pattern that can accommodate future features
- **Hackathon Viable**: Core components can be implemented quickly for MVP demonstration

This Home Page design serves as a foundation for the multi-page application while preserving the critical hedging functionality that makes BitHedge valuable to Risk-Averse Rachel and similar users.
