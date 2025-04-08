# BitHedge: Updated Comprehensive Screen Flow Diagram

## Overview

This document outlines the detailed screen flow for BitHedge, a decentralized application built on the Stacks blockchain that enables users to hedge Bitcoin volatility using sBTC call options. The updated flow incorporates a multi-view architecture to better serve diverse user needs.

### Context

- **Product**: BitHedge - sBTC Options for Hedging Bitcoin Volatility
- **User Types**:
  - Risk-Averse Hedgers (primary persona: "Risk-Averse Rachel")
  - Experienced Traders (seeking market analytics)
  - Option Sellers (providing liquidity)
  - Speculators (secondary users)
- **Primary Goals**:
  - Enable users to hedge Bitcoin volatility through sBTC call options
  - Provide intuitive, specialized views for different user needs
  - Facilitate market exploration, trading, and analysis
- **Platform**: Web application
- **Design System**: Clean, card-based UI with blue/green/red color coding for clarity

## 1. Screen Inventory

### Main Views

1. **Landing Page** (ID: LP-01)
2. **Home View** (ID: HV-01)
3. **Easy Option View** (ID: EO-01)
4. **Option Data View** (ID: OD-01)
5. **Transaction History** (ID: TH-01)

### Modals & Overlays

1. **Wallet Connection** (ID: WC-01)
2. **Buy Option Confirmation** (ID: BC-01)
3. **Exercise Option Confirmation** (ID: EC-01)
4. **Expire Option Confirmation** (ID: XC-01)
5. **Transaction Status** (ID: TS-01)
6. **Hedging Calculator Expanded** (ID: HC-01)
7. **Quick Guide Expanded** (ID: QG-01)
8. **Option Detail Modal** (ID: ODM-01)

### Notifications

1. **Volatility Alert Banner** (ID: VA-01)
2. **Transaction Confirmation Toast** (ID: TC-01)
3. **Option Expiry Warning** (ID: OE-01)
4. **Insufficient Balance Warning** (ID: IB-01)

### States

1. **Loading State** (ID: LS-01)
2. **Network Error State** (ID: NE-01)
3. **Contract Error State** (ID: CE-01)
4. **Empty Portfolio State** (ID: EP-01)
5. **Option Expired State** (ID: OX-01)
6. **Offline State** (ID: OF-01)

## 2. View Details

### Landing Page (LP-01)

- **Purpose**: Introduce BitHedge and its value proposition for hedging Bitcoin volatility
- **Entry Points**: Direct URL
- **Exit Points**:
  - Launch App button → Home View
  - Learn More → Educational content
- **Required Data**: None
- **User Permissions**: None
- **State Dependencies**: None
- **Components**:
  - Header with logo
  - Hero section with tagline: "Hedge Smart, Stay Bitcoin"
  - Value proposition
  - Launch App button
  - Footer with Testnet disclaimer

### Home View (HV-01)

- **Purpose**: Central hub providing market overview, portfolio status, and navigation to specialized views
- **Entry Points**:
  - Landing Page (via Launch App button)
  - Direct URL
  - Navigation from other views
- **Exit Points**:
  - Easy Option View (via navigation or Buy Option button)
  - Option Data View (via navigation or Market Overview interactions)
  - Transaction History
  - Disconnect wallet
- **Required Data**:
  - Market overview data (option availability, BTC price)
  - Wallet connection status
  - Portfolio data (if connected)
  - Featured options data
- **User Permissions**: None (public market data) / Connected wallet (portfolio data)
- **Components**:

  1. **Navigation Header**:

     - Logo/Title: "BitHedge"
     - Main navigation: Home, Option Data, Easy Trade
     - Wallet Status: Connected address or Connect button
     - Network Indicator: "Testnet" badge

  2. **Welcome Hero** (when not connected):

     - Headline and subheadline
     - Key benefits bullets
     - CTA to connect wallet
     - Preview image

  3. **Market Overview Panel**:

     - Available options statistics
     - BTC price and trend
     - Volume data
     - Quick filter tabs

  4. **Portfolio Summary** (when connected):

     - STX/sBTC balances
     - Portfolio value estimation
     - Hedging status
     - Quick stats (options owned, P&L, next expiry)

  5. **Featured Options Grid**:

     - Type (Call/Put)
     - Strike price
     - Premium
     - Expiry
     - Quick action button

  6. **P&L Visualization** (simplified):

     - Toggle between portfolio and per-option views
     - Expandable for more detail

  7. **Quick Action Cards**:

     - Create Option (seller)
     - Buy Option (buyer)
     - Calculate Hedge
     - View Your Options

  8. **Education & Guidance Section**:
     - "New to Options?" resources
     - "How BitHedge Works" guides
     - Risk disclaimer

### Easy Option View (EO-01)

- **Purpose**: Provide a simplified, step-by-step interface for buying and managing options
- **Entry Points**:
  - Home View (via navigation or Buy Option button)
  - Direct URL
- **Exit Points**:
  - Home View (via navigation or Back button)
  - Option Data View (via navigation)
  - Transaction History
- **Required Data**:
  - BTC price data
  - Available option parameters
  - Wallet balance (if connected)
- **User Permissions**: None (configuration) / Connected wallet (transactions)
- **Components**:

  1. **Navigation Header**:

     - Consistent with Home View

  2. **Step Indicator**:

     - Visual progress tracker
     - Current stage highlight

  3. **Option Type Selector**:

     - Call/Put toggle
     - Explanations and illustrations
     - Help resources

  4. **Strike Price Selector**:

     - Visual slider
     - Preset buttons
     - Current BTC price indicator
     - Risk/reward visualization

  5. **Expiration Date Selector**:

     - Date picker or duration options
     - Time remaining calculation
     - Risk indicators for time value

  6. **Premium Calculator**:

     - Premium display with USD equivalent
     - Cost breakdown
     - Max loss indicator
     - Wallet balance check

  7. **P&L Scenario Visualizer**:

     - Simplified graph
     - Key scenario outcomes
     - Risk/reward ratios

  8. **Trade Confirmation Panel**:

     - Option summary
     - Total cost calculation
     - Confirmation checkbox
     - Action buttons

  9. **Post-Trade Management** (if option owned):
     - Status and countdown
     - Current value
     - BTC price monitor
     - Action buttons

### Option Data View (OD-01)

- **Purpose**: Provide advanced market analytics and visualizations for option traders
- **Entry Points**:
  - Home View (via navigation)
  - Direct URL
  - Easy Option View (via navigation)
- **Exit Points**:
  - Home View (via navigation)
  - Easy Option View (via Trade button)
  - Transaction History
- **Required Data**:
  - Comprehensive options market data
  - Open interest and volume statistics
  - Implied volatility calculations
  - BTC price data
- **User Permissions**: None (all data is public)
- **Components**:

  1. **Navigation Header**:

     - Consistent with other views

  2. **Market Statistics Panel**:

     - BTC price and change
     - Historical volatility
     - Options volume
     - Put/Call ratio
     - Market sentiment indicator

  3. **Tab Navigation**:

     - Overview (default)
     - Open Interest & Volume
     - Implied Volatility

  4. **Options Chain Matrix**:

     - Strike prices vs. expiration grid
     - Premium data for calls and puts
     - Visual indicators for volume/OI
     - Current price highlighting

  5. **Open Interest Chart**:

     - Distribution across strikes
     - Call vs Put comparison
     - Current price marker

  6. **Volume Distribution Chart**:

     - Trading activity by strike
     - Time period selector
     - Comparison toggles

  7. **Implied Volatility Visualizations**:

     - IV smile/skew across strikes
     - Multi-line expiry comparison
     - Annotations for patterns

  8. **Detailed Options Table**:

     - Comprehensive data columns
     - Sorting and filtering
     - Row actions for details/trade

  9. **Heat Map Visualization**:
     - 2D color coding for quick analysis
     - Metric selection (volume, OI, IV)
     - Interactive filtering

### Transaction History (TH-01)

- **Purpose**: View past transactions related to options
- **Entry Points**: Menu from any main view
- **Exit Points**: Back to previous view
- **Required Data**: Wallet transaction history filtered for options
- **User Permissions**: Connected wallet
- **Components**:
  - Transaction table with filtering
  - Transaction details
  - Explorer links
  - Export options

## 3. Modal & Overlay Details

### Wallet Connection (WC-01)

- **Purpose**: Connect user's Stacks wallet
- **Trigger**: "Connect Wallet" button from any view
- **Components**:
  - Wallet selection (Hiro Wallet)
  - Connection status
  - Error handling
  - Privacy notice
- **Behavior**: Opens Hiro Wallet popup for authentication

### Buy Option Confirmation (BC-01)

- **Purpose**: Confirm option purchase details
- **Trigger**: "Buy Option" button in Easy Option View
- **Components**:
  - Option details summary
  - Premium amount
  - Wallet balance check
  - Confirm/Cancel buttons
  - Fee estimation
- **Behavior**: Requires explicit confirmation before executing trade

### Exercise Option Confirmation (EC-01)

- **Purpose**: Confirm option exercise details
- **Trigger**: "Exercise Option" button
- **Components**:
  - Option exercise summary
  - Strike price amount
  - sBTC to receive
  - P&L calculation
  - Confirm/Cancel buttons
- **Behavior**: Requires explicit confirmation before exercising

### Option Detail Modal (ODM-01)

- **Purpose**: Show comprehensive details about a specific option
- **Trigger**: Clicking on an option in any view
- **Components**:
  - Complete option specifications
  - Status information
  - P&L graph specific to this option
  - Historical data (if available)
  - Action buttons (Buy/Exercise/Monitor)
- **Behavior**: Focused view of a single option with available actions

## 4. Navigation Patterns

### Global Navigation

- **Top Navigation Bar**: Present in all main views, highlights current view
- **Consistent Footer**: Contains block height, transaction status, and app version
- **Back Navigation**: Returns to previous view while maintaining state
- **View Transitions**: Smooth animations between views

### Primary User Journeys

#### 1. New User Journey

```
Landing Page → Home View (Not Connected) → Connect Wallet →
Home View (Connected) → Easy Option View → Configure Option →
Review & Confirm → Transaction Status → Home View (With Options)
```

#### 2. Beginner Hedger Journey (Rachel)

```
Home View → View Portfolio Summary → Quick Calculate →
Easy Option View → Step-by-Step Configuration →
Purchase Option → Monitor Status → Exercise When Favorable
```

#### 3. Advanced Trader Journey

```
Home View → Option Data View → Analyze Market Conditions →
Identify Opportunity → Easy Option View → Configure & Trade →
Monitor via Option Data View Analytics
```

#### 4. Option Seller Journey

```
Home View → Create Option → Option Listed →
Monitor via Option Data View → Receive Premium When Purchased →
Wait for Exercise/Expiry
```

### Cross-View Navigation

- **Option Context Transfer**: Selecting an option in one view and navigating to another view maintains focus on that option
- **Market Data Context**: Filtering in Option Data View can be carried to Home View
- **Trade Initiation**: "Trade" buttons from any view lead to Easy Option View with parameters pre-filled

### Deep Linking

- Direct links to specific views
- Option-specific deep links
- Filter-specific deep links for Option Data View
- Authentication-aware routing (redirect to connect wallet if required)

## 5. Data Flow Requirements

### API Dependencies

1. **Stacks API**:

   - Get block info (current height)
   - Read contract data
   - Call contract functions
   - Submit transactions

2. **Wallet Connection**:

   - Authenticate user
   - Sign transactions
   - Get account balances
   - Permission requests

3. **Market Data** (Mock for MVP):
   - BTC price feed
   - Options chain data
   - Historical market data
   - Open interest and volume

### Real-time Updates

- Block height polling (10s)
- BTC price updates (30s)
- Options availability updates (30s)
- Transaction confirmations (as they occur)
- Market data updates (1m for Option Data View)

### Data Persistence

- User preferences stored in localStorage
- Recently viewed options cached
- Market data cached with appropriate TTL
- Authentication state managed securely

## 6. Responsive Design

### Device Adaptations

- **Desktop**: Full-featured interface with multi-column layouts
- **Tablet**: Reduced column layouts, touch-optimized controls
- **Mobile**: Single column layouts, progressive disclosure, simplified views

### View-Specific Adaptations

1. **Home View**:

   - Stack market overview and portfolio sections on mobile
   - Collapse featured options to scrollable cards
   - Hide secondary information in responsive mode

2. **Easy Option View**:

   - Vertical step flow on mobile
   - Larger input controls for touch
   - Simplified P&L visualization

3. **Option Data View**:
   - Tabs become accordion on mobile
   - Simplified charts with key data points
   - Heat map becomes filtered table on small screens

## 7. Implementation Strategy

### Phase 1: Core Structure

- Implement navigation framework
- Build Home View with basic market overview
- Create wallet connection flow
- Implement simplified contract interaction

### Phase 2: Trading Experience

- Develop Easy Option View with step flow
- Implement option configuration and purchase
- Create P&L visualization
- Build transaction status and confirmation

### Phase 3: Market Analytics

- Implement Option Data View with tabs
- Create basic charts and visualizations
- Build options chain matrix
- Implement filters and sorting

### Phase 4: Integration & Refinement

- Connect all views with consistent data flow
- Implement cross-view navigation
- Add responsive design adaptations
- Polish interactions and transitions

## 8. Enhanced User Flow Diagrams

### Main Application Flow

```
+------------------+     +------------------+     +------------------+
| Landing Page     |---->| Home View        |<--->| Option Data View |
+------------------+     +------------------+     +------------------+
                               ^  |  ^               |
                               |  |  |               |
                               |  v  |               v
+------------------+     +------------------+     +------------------+
| Wallet Connection|<--->| Easy Option View |<--->| Transaction      |
+------------------+     +------------------+     | Confirmation     |
                               |                  +------------------+
                               v                          |
                         +------------------+             v
                         | Option Management|      +------------------+
                         | (Post-Purchase)  |      | Transaction      |
                         +------------------+      | History          |
                                                   +------------------+
```

### Easy Option View Flow

```
+------------------+     +------------------+     +------------------+
| Step 1:          |---->| Step 2:          |---->| Step 3:          |
| Choose Option    |     | Configure        |     | Review & Confirm |
| Type             |     | Parameters       |     |                  |
+------------------+     +------------------+     +------------------+
                                                         |
                                                         v
+------------------+     +------------------+     +------------------+
| Option           |<----| Post-Purchase    |<----| Transaction      |
| Management       |     | Status           |     | Processing       |
+------------------+     +------------------+     +------------------+
```

### Option Data View Flow

```
+------------------+     +------------------+     +------------------+
| Overview Tab     |<--->| Open Interest &  |<--->| Implied          |
| (Default)        |     | Volume Tab       |     | Volatility Tab   |
+------------------+     +------------------+     +------------------+
       |  ^                    |  ^                     |  ^
       v  |                    v  |                     v  |
+------------------+     +------------------+     +------------------+
| Options Chain    |     | OI/Volume Charts |     | IV Smile/Surface |
| Matrix           |     |                  |     | Visualizations   |
+------------------+     +------------------+     +------------------+
       |                        |                        |
       v                        v                        v
+------------------+     +------------------+     +------------------+
| Detailed Options |     | Option Detail    |     | Trade Selected   |
| Table            |---->| Modal           |---->| Option            |
+------------------+     +------------------+     +------------------+
```

## Conclusion

This updated screen flow diagram provides a comprehensive roadmap for implementing the BitHedge multi-view application, covering all aspects from view structure to user journeys and data requirements. The new architecture accommodates diverse user needs through specialized views while maintaining a coherent user experience through consistent navigation and design patterns.

The multi-view approach allows BitHedge to serve both "Risk-Averse Rachel" with a simplified Easy Option View and more advanced traders with the data-rich Option Data View, all connected through a central Home View that provides market context and personal portfolio information.

Implementation should follow the phased approach outlined, ensuring that core functionality is prioritized for the hackathon MVP while establishing a solid foundation for future enhancements.
