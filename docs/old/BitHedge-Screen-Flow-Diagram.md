# BitHedge: Comprehensive Screen Flow Diagram

## Overview

This document outlines the detailed screen flow for BitHedge, a decentralized application built on the Stacks blockchain that enables users to hedge Bitcoin volatility using sBTC call options.

### Context

- **Product**: BitHedge - sBTC Options for Hedging Bitcoin Volatility
- **User Types**:
  - Risk-Averse Hedgers (primary persona: "Risk-Averse Rachel")
  - Option Sellers (providing liquidity)
  - Speculators (secondary users)
- **Primary Goals**:
  - Enable users to hedge Bitcoin volatility through sBTC call options
  - Provide intuitive dashboard for option management
  - Facilitate buying, exercising, and monitoring options
- **Platform**: Web application
- **Design System**: Clean, card-based UI with blue/green/red color coding for clarity

## 1. Screen Inventory

### Main Screens

1. **Landing Page** (ID: LP-01)
2. **BitHedge App** (ID: BA-01)
3. **Dashboard** (ID: DB-01)
4. **Option Details** (ID: OD-01)
5. **Transaction History** (ID: TH-01)

### Modals & Overlays

1. **Wallet Connection** (ID: WC-01)
2. **Buy Option Confirmation** (ID: BC-01)
3. **Exercise Option Confirmation** (ID: EC-01)
4. **Expire Option Confirmation** (ID: XC-01)
5. **Transaction Status** (ID: TS-01)
6. **Hedging Calculator Expanded** (ID: HC-01)
7. **Quick Guide Expanded** (ID: QG-01)

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

## 2. Screen Details

### Landing Page (LP-01)

- **Purpose**: Introduce BitHedge and its value proposition for hedging Bitcoin volatility
- **Entry Points**: Direct URL
- **Exit Points**:
  - Launch App button → BitHedge App
  - Learn More → Educational content
- **Required Data**: None
- **User Permissions**: None
- **State Dependencies**: None
- **Loading Behavior**: Progressive load, hero section first
- **Error Handling**: N/A
- **Offline Status**: Static content available, launch button disabled if server unavailable
- **Responsive Behavior**: Stack sections vertically on mobile
- **Accessibility**: Semantic HTML, keyboard navigation, alt text for images

**Components**:

- Header with logo
- Hero section with tagline: "Hedge Smart, Stay Bitcoin"
- Value proposition
- Launch App button
- Footer with Testnet disclaimer

### BitHedge App (BA-01)

- **Purpose**: Entry point to the application, requiring wallet connection to proceed
- **Entry Points**:
  - Landing Page (via Launch App button)
  - Direct URL
- **Exit Points**:
  - Connect Wallet → Dashboard (after successful connection)
  - Back to Landing Page link
- **Required Data**: None initially (pre-wallet connection)
- **User Permissions**: None initially
- **State Dependencies**: None
- **Loading Behavior**: Quick load, minimal content
- **Error Handling**: Display connection errors
- **Offline Status**: Display offline message, disable Connect Wallet button
- **Responsive Behavior**: Centered content on all screen sizes
- **Accessibility**: High contrast, keyboard accessible buttons

**Components**:

- App header with logo
- Welcome message
- Connect Wallet button
- Brief instructions
- Testnet indicator
- Back to Landing Page link

### Dashboard (DB-01)

- **Purpose**: Central hub for managing options and viewing portfolio
- **Entry Points**:
  - BitHedge App after wallet connection
  - Direct URL with authenticated wallet
- **Exit Points**:
  - Option Details (click on specific option)
  - Transaction History
  - Disconnect wallet
- **Required Data**:
  - Wallet connection
  - STX/sBTC balances
  - Active options data
  - Current block height
- **User Permissions**: Connected wallet
- **State Dependencies**: Wallet connection status
- **Loading Behavior**: Skeleton UI while fetching contract data
- **Error Handling**: Error cards for contract/network failures
- **Offline Status**: Read-only mode with cached data, action buttons disabled
- **Responsive Behavior**: Single column layout on mobile
- **Accessibility**: High contrast text, keyboard-navigable sections

**Components**:

1. **Header**:

   - Logo/Title: "BitHedge"
   - Wallet Status: Connected address or Connect button
   - Network Indicator: "Testnet" badge

2. **Portfolio Snapshot**:

   - STX/sBTC balances
   - BTC value estimation
   - Hedged percentage
   - Portfolio value graph (optional)

3. **Volatility Alert Banner** (conditional):

   - BTC price change alert
   - Review Hedge button

4. **Option Overview Card**:

   - Status tag (Active/Expired/Available)
   - sBTC amount (0.1)
   - Premium paid (50 STX)
   - Strike price (100 STX)
   - Expiry countdown
   - Hedging context

5. **Option Timeline**:

   - Timeline bar with creation, current, and expiry points
   - Color coding for urgency
   - Block height indicators

6. **Hedge Effectiveness Meter**:

   - Circular gauge (0-100%)
   - Coverage percentage
   - Subtext explanation

7. **Hedging Calculator**:

   - Portfolio size input (BTC)
   - Hedge percentage slider
   - BTC price input
   - Options needed calculation
   - Total premium cost
   - Total strike cost
   - Hedge coverage amount
   - Max loss amount
   - Buy Options button

8. **P&L Visualization**:

   - Line graph of Price vs. Gain/Loss
   - BTC price indicators
   - Breakeven point
   - Gain/loss zones
   - Interactive tooltips

9. **Straddle View Table**:

   - Type column (Call/Put)
   - Strike price column
   - Premium column
   - sBTC amount column
   - Expiry column
   - Status column
   - Action column (Buy button)
   - Sorting/filtering controls

10. **Action Panel**:

    - Buy Option button (context-sensitive)
    - Exercise Option button (context-sensitive)
    - Refresh button
    - Balance warnings

11. **Quick Guide Accordion**:

    - Collapsible help sections
    - sBTC option explanation
    - Exercise instructions
    - Testnet information

12. **Status Bar**:
    - Current block height
    - Transaction status
    - Expiry alerts

### Option Details (OD-01)

- **Purpose**: Detailed view of a specific option
- **Entry Points**: Dashboard (click on option in Straddle View Table)
- **Exit Points**: Back to Dashboard
- **Required Data**: Specific option ID and contract data
- **User Permissions**: Connected wallet
- **State Dependencies**: Option status (active/expired)
- **Loading Behavior**: Spinner while fetching option details
- **Error Handling**: Error message with retry button
- **Offline Status**: Read-only with cached data
- **Responsive Behavior**: Maintain readability on small screens
- **Accessibility**: Descriptive labels, screen reader support

**Components**:

- Back to Dashboard link
- Detailed option information
- Option status timeline
- P&L graph specific to this option
- Related transaction history
- Action buttons (Buy/Exercise/Expire)
- Technical details (contract address, option ID)

### Transaction History (TH-01)

- **Purpose**: View past transactions related to options
- **Entry Points**: Dashboard menu
- **Exit Points**: Back to Dashboard
- **Required Data**: Wallet transaction history filtered for options
- **User Permissions**: Connected wallet
- **State Dependencies**: None
- **Loading Behavior**: Progressive loading with "Load More" button
- **Error Handling**: Error card with retry
- **Offline Status**: Show cached transactions with sync indicator
- **Responsive Behavior**: Simplify table on mobile
- **Accessibility**: Sortable, filterable table with keyboard support

**Components**:

- Transaction table with columns:
  - Date/Time
  - Type (Buy/Exercise/Expire)
  - Option details
  - Amount (STX/sBTC)
  - Status
  - Block height
  - Explorer link
- Filtering controls
- Pagination/infinite scroll

## 3. Modal & Overlay Details

### Wallet Connection (WC-01)

- **Purpose**: Connect user's Stacks wallet
- **Trigger**: "Connect Wallet" button
- **Components**:
  - Wallet selection (Hiro Wallet)
  - Connection status
  - Error handling
  - Privacy notice
- **Behavior**: Opens Hiro Wallet popup for authentication
- **Exit Points**:
  - Success → Dashboard
  - Cancel → Stay on current page
  - Error → Display error message, retry option

### Buy Option Confirmation (BC-01)

- **Purpose**: Confirm option purchase details
- **Trigger**: "Buy Option" button
- **Components**:
  - Option details summary
  - Premium amount (STX)
  - Wallet balance check
  - Confirm/Cancel buttons
  - Fee estimation
- **Behavior**: Opens when Buy Option clicked, requires explicit confirmation
- **Exit Points**:
  - Confirm → Trigger wallet transaction → Transaction Status
  - Cancel → Return to Dashboard

### Exercise Option Confirmation (EC-01)

- **Purpose**: Confirm option exercise details
- **Trigger**: "Exercise Option" button
- **Components**:
  - Option exercise summary
  - Strike price amount (STX)
  - sBTC to receive
  - P&L calculation
  - Confirm/Cancel buttons
  - Fee estimation
- **Behavior**: Opens when Exercise Option clicked, requires explicit confirmation
- **Exit Points**:
  - Confirm → Trigger wallet transaction → Transaction Status
  - Cancel → Return to Dashboard

### Expire Option Confirmation (XC-01)

- **Purpose**: Confirm option expiration claim
- **Trigger**: "Expire Option" button (seller only)
- **Components**:
  - Option expiration summary
  - sBTC to reclaim
  - Confirm/Cancel buttons
  - Fee estimation
- **Behavior**: Only available to seller after expiry
- **Exit Points**:
  - Confirm → Trigger wallet transaction → Transaction Status
  - Cancel → Return to Dashboard

### Transaction Status (TS-01)

- **Purpose**: Show real-time transaction status
- **Trigger**: After confirming transaction
- **Components**:
  - Transaction type
  - Status indicator
  - Block confirmation count
  - TX ID with explorer link
  - Close button (appears after confirmation)
- **Behavior**: Updates automatically as transaction progresses
- **Exit Points**:
  - Close button → Return to Dashboard
  - Auto-close after success (optional)

### Hedging Calculator Expanded (HC-01)

- **Purpose**: Full-screen calculator with additional options
- **Trigger**: "Expand" on Hedging Calculator card
- **Components**:
  - Same as Dashboard calculator
  - Additional options:
    - Drop percentage simulation
    - Multiple strike price comparison
    - Save calculation button
- **Behavior**: Expanded view with more detailed inputs/outputs
- **Exit Points**: Close button → Return to Dashboard

### Quick Guide Expanded (QG-01)

- **Purpose**: Detailed educational overlay
- **Trigger**: "Learn More" in Quick Guide accordion
- **Components**:
  - Educational content about options
  - Step-by-step tutorial
  - Visual examples
  - Close button
- **Behavior**: Overlay with scrollable content
- **Exit Points**: Close button → Return to Dashboard

## 4. Notification Details

### Volatility Alert Banner (VA-01)

- **Purpose**: Alert user to significant BTC price movements
- **Trigger**: BTC price change exceeds threshold (e.g., 5%)
- **Components**:
  - Alert message with price change
  - "Review Hedge" button
  - Dismiss button
- **Behavior**: Appears at top of Dashboard, dismissible
- **Position**: Full width below header
- **Persistence**: Until dismissed or next session

### Transaction Confirmation Toast (TC-01)

- **Purpose**: Notify user of successful transaction
- **Trigger**: Transaction confirmed on blockchain
- **Components**:
  - Success message
  - Transaction type
  - Amount
  - View details link
- **Behavior**: Appears in bottom right, auto-dismisses after 5 seconds
- **Position**: Floating, above content
- **Persistence**: Temporary (5 seconds)

### Option Expiry Warning (OE-01)

- **Purpose**: Warn about soon-to-expire options
- **Trigger**: Option within 50 blocks of expiry
- **Components**:
  - Warning message
  - Option details
  - "Exercise Now" button
  - Dismiss button
- **Behavior**: Appears in Dashboard status bar, increasingly urgent as expiry approaches
- **Position**: Status bar, highlighted
- **Persistence**: Until expiry or action taken

### Insufficient Balance Warning (IB-01)

- **Purpose**: Warn user about insufficient funds for action
- **Trigger**: Wallet balance < required amount for action
- **Components**:
  - Warning message
  - Current balance
  - Required amount
  - "Fund Wallet" guidance
- **Behavior**: Appears near action buttons when balance insufficient
- **Position**: Inline with action button
- **Persistence**: Until balance sufficient

## 5. State Details

### Loading State (LS-01)

- **Purpose**: Indicate content loading
- **Trigger**: Initial page load, data fetching
- **Components**:
  - Skeleton UI for cards
  - Spinner for buttons/actions
  - Progress indication for long operations
- **Behavior**: Appears during data fetching, maintains layout structure
- **Duration**: Until data loaded or error

### Network Error State (NE-01)

- **Purpose**: Indicate network connectivity issues
- **Trigger**: Failed network requests
- **Components**:
  - Error message
  - Retry button
  - Offline indicator
- **Behavior**: Replaces loading state on failure
- **Recovery**: Automatic retry or manual retry button

### Contract Error State (CE-01)

- **Purpose**: Indicate smart contract errors
- **Trigger**: Failed contract calls
- **Components**:
  - Error message with code
  - Technical details (collapsible)
  - Suggestion for resolution
  - Contact support link
- **Behavior**: Appears in place of expected contract data
- **Recovery**: Action-specific retry options

### Empty Portfolio State (EP-01)

- **Purpose**: Guide new users with no options
- **Trigger**: No options in portfolio
- **Components**:
  - Welcome message
  - Getting started guide
  - "Create First Option" CTA (seller)
  - "Buy First Option" CTA (buyer)
- **Behavior**: Appears in Dashboard when no options exist
- **Recovery**: Disappears when first option created/bought

### Option Expired State (OX-01)

- **Purpose**: Show expired option state
- **Trigger**: Option block height >= expiry block
- **Components**:
  - Expired status indicator
  - Option details (grayed out)
  - "Reclaim sBTC" button (seller only)
  - "View New Options" button
- **Behavior**: Replaces active option display
- **Recovery**: N/A (historical state)

### Offline State (OF-01)

- **Purpose**: Limited functionality when offline
- **Trigger**: Browser offline status
- **Components**:
  - Offline banner
  - Cached data with timestamp
  - Limited read-only functionality
  - Reconnection indicator
- **Behavior**: Disables actions requiring network
- **Recovery**: Auto-reconnect when online

## 6. Navigation Patterns

### Primary Navigation Flows

1. **New User Flow**:

   ```
   Landing Page → Launch App → BitHedge App → Connect Wallet → Dashboard (Empty State) →
   Buy Option Modal → Transaction Status → Dashboard (with Option)
   ```

2. **Returning User Flow (Option Owner)**:

   ```
   Landing Page → Launch App → BitHedge App → Connect Wallet →
   Dashboard → Monitor Option → Exercise Option Modal →
   Transaction Status → Dashboard (Updated)
   ```

3. **Returning User Flow (Option Seller)**:

   ```
   Landing Page → Launch App → BitHedge App → Connect Wallet →
   Dashboard → Create Option Modal → Transaction Status →
   Dashboard (with Option) → Wait for Buyer/Expiry →
   Expire Option Modal → Dashboard (Updated)
   ```

4. **Option Management Flow**:
   ```
   BitHedge App → Connect Wallet → Dashboard → Option Details →
   Action (Buy/Exercise/Expire) → Transaction Status → Dashboard (Updated)
   ```

### Secondary/Alternative Paths

1. **Hedging Calculation Path**:

   ```
   Dashboard → Hedging Calculator → Adjust Parameters →
   Buy Multiple Options → Transaction Status → Dashboard (Updated)
   ```

2. **Educational Path**:

   ```
   Dashboard → Quick Guide Accordion → Expanded Guide →
   Back to Dashboard
   ```

3. **Price Alert Path**:
   ```
   Dashboard → Volatility Alert → Review Hedge →
   Hedging Calculator → Action → Dashboard (Updated)
   ```

### Back Navigation Behavior

- Browser back button returns to previous screen
- "Back" links in Option Details return to Dashboard
- Modal cancellation returns to triggering screen
- Escape key closes modals

### Deep Linking Possibilities

- Direct links to Dashboard with connected wallet
- Option-specific links with option ID parameter
- Transaction history links with filters

### History Management

- Browser history updated with main screen changes
- Modals don't create history entries
- URL parameters for option IDs and views

### Tab/Window Management

- Session maintained across tabs with localStorage
- Wallet connection shared between tabs
- Transaction notifications synchronized across tabs

### External Link Handling

- Blockchain explorer links open in new tab
- Documentation links open in new tab
- Wallet funding links open in wallet app

### App Switching Contexts

- Hiro Wallet pop-up for transactions
- Return to app after wallet interaction
- Maintain state during app switching

## 7. Interaction Details

### Click/Tap Actions

- **Primary Buttons**: Buy, Exercise, Expire (blue)
- **Secondary Buttons**: Cancel, Close, Refresh (gray)
- **Tertiary Elements**: Links, tabs, accordion toggles
- **Table Rows**: Click for details, sort headers
- **Cards**: Click for expanded view

### Swipe Gestures (Mobile)

- Swipe left/right between tabs
- Pull down to refresh data
- Swipe up on modal to dismiss

### Form Interactions

- **Inputs**: Direct entry with validation
- **Sliders**: Drag for percentage/value selection
- **Toggles**: On/off for features/filters
- **Dropdowns**: Selection menus for filters

### Scroll Behaviors

- Sticky header on Dashboard
- Table headers stick on scroll
- Infinite scroll for transaction history
- Smooth scroll to sections

### Keyboard Shortcuts

- Escape: Close modal/overlay
- Enter: Confirm action
- Tab: Navigate form elements
- Space: Toggle selected element

### Touch Gestures

- Long press for additional option details
- Pinch to zoom on graphs
- Two-finger scroll on tables

## 8. Data Flow Requirements

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

3. **Price Oracle** (Mock for MVP):
   - BTC price feed
   - STX price feed
   - Historical price data

### Local Storage Usage

- Wallet connection status
- User preferences
- Recently viewed options
- Calculator history
- Notification dismissals

### Cache Requirements

- Contract data (30s TTL)
- Options table data (30s TTL)
- Transaction history (5m TTL)
- Block height (10s TTL)

### Offline Capabilities

- Read-only view of cached options
- Offline indication
- Queue actions for reconnection
- Sync on reconnect

### Real-time Updates

- Block height polling (10s)
- Option status updates (30s)
- Transaction confirmations (as they occur)
- BTC price alerts (1m)

### Data Validation Rules

- STX/sBTC amounts (positive numbers)
- BTC portfolio size (positive number)
- Hedge percentage (0-100%)
- Option status validation against contract

### Error Scenarios

- Wallet connection failure
- Insufficient STX balance
- Contract call rejection
- Network timeout
- Blockchain congestion

### Retry Mechanisms

- Automatic retry for read operations (3x)
- Manual retry for transactions
- Exponential backoff for repeated failures
- Circuit breaker for persistent errors

## 9. User Flow Diagrams

### Main User Flows

```
1. OPTION BUYER FLOW

+----------------+     +-----------------+     +------------------+     +------------------+
| Landing Page   |---->| Launch App      |---->| BitHedge App     |---->| Connect Wallet   |
+----------------+     +-----------------+     +------------------+     +------------------+
                                                                                |
                                                                                v
+------------------+     +-----------------+     +------------------+
| Transaction      |<----| Buy Option      |<----| Dashboard        |
| Status           |     | Confirmation    |     | (Empty)          |
+------------------+     +-----------------+     +------------------+
        |
        v
+------------------+     +-----------------+     +------------------+
| Dashboard        |---->| Monitor Price/  |---->| Decision Point   |
| (With Option)    |     | Expiry          |     |                  |
+------------------+     +-----------------+     +------------------+
                                                       |
                     +------------------------+        |
                     |                        |        v
                     v                        v        v
              +-------------+         +--------------+ +--------------+
              | Let Expire  |         | Exercise     | | Buy More     |
              | (Loss)      |         | Option       | | Options      |
              +-------------+         +--------------+ +--------------+
                     |                        |               |
                     v                        v               v
              +------------------+    +------------------+   |
              | Option Expired   |    | sBTC Received    |   |
              | State            |    | Transaction      |   |
              +------------------+    +------------------+   |
                                             |               |
                                             v               v
                                      +---------------------------+
                                      | Updated Dashboard         |
                                      +---------------------------+


2. OPTION SELLER FLOW

+----------------+     +-----------------+     +------------------+     +------------------+
| Landing Page   |---->| Launch App      |---->| BitHedge App     |---->| Connect Wallet   |
+----------------+     +-----------------+     +------------------+     +------------------+
                                                                                |
                                                                                v
+------------------+     +-----------------+     +------------------+
| Transaction      |<----| Create Option   |<----| Dashboard        |
| Status           |     | Confirmation    |     | (Empty)          |
+------------------+     +-----------------+     +------------------+
        |
        v
+------------------+     +-----------------+     +------------------+
| Dashboard        |---->| Monitor Option  |---->| Wait for Buyer/  |
| (Option Listed)  |     | Status          |     | Expiry           |
+------------------+     +-----------------+     +------------------+
                                                       |
                     +------------------------+        |
                     |                        |        v
                     v                        v        v
              +-------------+         +--------------+ +--------------+
              | Option      |         | Option       | | Create New   |
              | Bought      |         | Expired      | | Option       |
              +-------------+         +--------------+ +--------------+
                     |                        |               |
                     v                        v               v
              +------------------+    +------------------+   |
              | Receive Premium  |    | Reclaim sBTC     |   |
              | (50 STX)         |    | Transaction      |   |
              +------------------+    +------------------+   |
                     |                        |               |
                     v                        v               v
              +------------------+    +------------------+   |
              | Wait for         |    | Updated          |   |
              | Exercise/Expiry  |    | Dashboard        |<--+
              +------------------+    +------------------+
                     |
                     v
              +------------------+    +------------------+
              | If Exercised:    |--->| Receive Strike   |
              | Option Exercised |    | (100 STX)        |
              +------------------+    +------------------+
                                             |
                                             v
                                      +------------------+
                                      | Updated          |
                                      | Dashboard        |
                                      +------------------+


3. HEDGING CALCULATION FLOW

+----------------+     +-----------------+     +------------------+     +------------------+
| Landing Page   |---->| Launch App      |---->| BitHedge App     |---->| Connect Wallet   |
+----------------+     +-----------------+     +------------------+     +------------------+
                                                                                |
                                                                                v
+------------------+     +---------------------+     +--------------------+
| Dashboard        |---->| Open Hedging        |---->| Input Portfolio    |
|                  |     | Calculator          |     | Size & Hedge %     |
+------------------+     +---------------------+     +--------------------+
                                                              |
                                                              v
+------------------+     +---------------------+     +--------------------+
| Transaction      |<----| Buy Multiple        |<----| View Calculation   |
| Status           |     | Options Confirmation|     | Results            |
+------------------+     +---------------------+     +--------------------+
        |
        v
+------------------+
| Updated          |
| Dashboard        |
+------------------+
```

### Error Flow Example

```
+------------------+     +---------------------+     +--------------------+
| Buy Option       |---->| Wallet              |---->| Insufficient       |
| Confirmation     |     | Transaction         |     | Balance Error      |
+------------------+     +---------------------+     +--------------------+
                                                              |
                           +-------------------+              v
                           | Add Funds to      |<-----+------------------+
                           | Wallet            |      | Error Resolution |
                           +-------------------+      | Options          |
                                   |                  +------------------+
                                   v                          |
                           +-------------------+              v
                           | Retry             |<-----+------------------+
                           | Transaction       |      | Return to        |
                           +-------------------+      | Dashboard        |
                                   |                  +------------------+
                                   v
                           +-------------------+
                           | Transaction       |
                           | Success           |
                           +-------------------+
                                   |
                                   v
                           +-------------------+
                           | Updated           |
                           | Dashboard         |
                           +-------------------+
```

## 10. Responsive Design Considerations

### Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

### Layout Adaptation

- **Desktop**: Multi-column layout, side-by-side cards
- **Tablet**: Reduced columns, some cards full width
- **Mobile**: Single column, stacked cards, simplified tables

### Component Adaptations

1. **Straddle View Table**:

   - Desktop: Full table with all columns
   - Tablet: Scrollable horizontally
   - Mobile: Card-based view instead of table

2. **P&L Visualization**:

   - Desktop: Large interactive graph
   - Tablet: Medium graph, tooltips on tap
   - Mobile: Simplified graph, key points only

3. **Hedging Calculator**:

   - Desktop: Side-by-side inputs and results
   - Tablet: Inputs above results
   - Mobile: Collapsed sections, progressive disclosure

4. **Action Panel**:

   - Desktop: Horizontal button row
   - Tablet: Horizontal button row
   - Mobile: Stacked buttons, full width

5. **Portfolio Snapshot**:
   - Desktop: Horizontal card with columns
   - Tablet: Similar to desktop
   - Mobile: Stacked sections, critical info first

## 11. Accessibility Considerations

### General Requirements

- WCAG 2.1 AA compliance
- Screen reader compatibility
- Keyboard navigation support
- Sufficient color contrast (4.5:1 minimum)
- Focus indicators

### Screen-Specific Considerations

1. **Dashboard**:

   - Semantic heading structure
   - ARIA landmarks for main sections
   - Skip links for navigation
   - Table accessibility for Straddle View

2. **Modals**:

   - Focus trap within modal
   - Return focus on close
   - Escape key dismissal
   - ARIA roles and states

3. **Charts & Visualizations**:

   - Text alternatives for graphs
   - Data tables as alternatives
   - Keyboard accessible tooltips
   - Color not sole indicator of meaning

4. **Forms & Controls**:
   - Associated labels
   - Error messages linked to inputs
   - Validation feedback
   - Sufficient touch targets (44px minimum)

## Conclusion

This screen flow diagram provides a comprehensive roadmap for implementing the BitHedge application, covering all aspects from screen inventory to interaction patterns and data requirements. The diagram ensures that all user paths and states are accounted for, creating a cohesive and intuitive experience for users looking to hedge Bitcoin volatility through sBTC options on the Stacks blockchain.

Implementation should follow a phased approach:

1. Core functionality (landing page, app entry, wallet connection, option buying/exercising)
2. Dashboard visualization components (P&L graph, option timeline)
3. Advanced features (hedging calculator, straddle view)
4. Refinements and optimizations

This will allow for a functional MVP for the hackathon while laying the groundwork for future enhancements.
