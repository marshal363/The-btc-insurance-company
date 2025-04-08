# BitHedge: Product Requirements Document (PRD) - Updated

## Introduction

I'm thrilled you're excited about BitHedge! Below is an extremely detailed and well-redacted Product Requirements Document (PRD) for the BitHedge project—a decentralized application (dApp) built on the Stacks blockchain. BitHedge enables users to hedge Bitcoin volatility using sBTC call options, designed specifically for the Bitcoin Vegas Hackathon's Stacks Track. This PRD outlines a functional Minimum Viable Product (MVP) tailored to the needs of "Risk-Averse Rachel," a persona representing users who want to protect their Bitcoin portfolios during significant price drops. It includes the project's vision, features, technical requirements, UI/UX design, and more, ensuring a comprehensive yet actionable plan.

## Document Information

- **Version**: 2.0
- **Date**: November 15, 2024
- **Author**: [Your Name], Product Designer & Marketer
- **Project**: BitHedge – sBTC Options for Hedging Bitcoin Volatility
- **Hackathon**: Bitcoin Vegas Hackathon, Stacks Track

## 1. Executive Summary

BitHedge is a decentralized application (dApp) on the Stacks blockchain that allows users to hedge Bitcoin volatility by purchasing call options for sBTC, a 1:1 Bitcoin-backed asset. Leveraging Clarity smart contracts and Stacks' Bitcoin-secured finality, BitHedge offers a secure, trustless platform for users to safeguard their Bitcoin portfolios against price drops. The MVP provides a multi-view interface where users can explore the options market, execute trades through a simplified interface, and analyze market data, emphasizing simplicity, control, and emotional reassurance for risk-averse individuals while also accommodating more advanced users.

## 2. Vision & Objectives

### Vision

To empower Bitcoin holders with decentralized, Bitcoin-secured hedging tools that mitigate volatility risks while upholding the principles of trustlessness and censorship resistance.

### Objectives

- **Primary**: Enable users to hedge Bitcoin volatility through sBTC call options.
- **Secondary**: Deliver an intuitive multi-view interface for options exploration, trading, and market analysis.
- **Hackathon Goal**: Build a functional MVP with a working Clarity smart contract, frontend interface, and demo-ready user flow.

## 3. Target Audience & Persona

### Primary Persona: Risk-Averse Rachel

- **Demographics**: 35-year-old female financial analyst and part-time crypto investor from suburban Canada.
- **Goals**:
  - Protect her Bitcoin portfolio from significant price declines.
  - Utilize decentralized tools anchored to Bitcoin's security.
  - Achieve peace of mind with transparent, predictable outcomes.
- **Pain Points**:
  - Fear of losing funds in overly complex DeFi platforms.
  - Anxiety over hidden fees or expiration risks.
  - Limited knowledge of Stacks and sBTC ecosystems.
- **Technical Proficiency**: Intermediate; familiar with Bitcoin wallets and basic DeFi, but new to Stacks.

### Secondary Audience

- Experienced traders seeking advanced options market data (Option Data View).
- Bitcoin enthusiasts exploring decentralized finance.
- Stacks developers experimenting with sBTC use cases.
- Hackathon judges and mentors evaluating project innovation.

## 4. Key Features & Functionality

### MVP Features

#### Clarity Smart Contract:

- Supports creating, buying, exercising, and expiring sBTC call options.
- Example parameters: Locks 0.1 sBTC, premium of 50 STX, strike price of 100 STX, expires in 500 blocks.

#### Multi-View UI:

- **Home View**: Central hub with market overview, portfolio summary, and navigation to specialized views.
- **Easy Option View**: Simplified, step-by-step interface for buying and managing options.
- **Option Data View**: Advanced market analytics showing option chains, open interest, volume, and implied volatility.

#### Core Components:

- **P&L Visualization**: Shows price vs. gain/loss graphs for option positions.
- **Portfolio Summary**: Displays STX/sBTC balances and hedging status.
- **Options Market Overview**: Presents available options with key metrics.
- **Hedging Calculator**: Allows users to determine options needed based on portfolio size.

#### Wallet Integration:

- Connects to Hiro Wallet (Stacks-compatible).
- Facilitates STX and sBTC transactions.

#### Real-Time Feedback:

- Updates block height dynamically.
- Confirms transactions with status notifications.

### Future Features (Post-MVP)

- Integration of live BTC/STX price feeds.
- Support for sBTC put options.
- Advanced charting tools for technical analysis.
- Portfolio management dashboard.
- Mobile-responsive interface.

## 5. User Stories

### As Risk-Averse Rachel, I want to:

#### Set Up Easily:

- Install Hiro Wallet and fund it with Testnet STX/sBTC.
- Connect my wallet to BitHedge with a single click from any view.

#### Navigate Between Views:

- Access a Home view that gives me a market overview and my portfolio status.
- Use an Easy Option View for simplified trading when I want to hedge.
- Explore the Option Data View when I'm ready for more advanced analysis.

#### Understand My Hedge:

- View my portfolio's hedging status (e.g., "12% Hedged") on the Home view.
- See a P&L graph illustrating protection against BTC price drops.

#### Calculate My Needs:

- Use the Hedging Calculator to input my BTC holdings and desired hedge percentage.
- Receive a recommendation for the number of options to purchase.

#### Buy an Option Simply:

- Navigate to the Easy Option View for a guided purchase experience.
- Select option parameters through intuitive controls.
- View potential outcomes before confirming my trade.

#### Monitor Market Data:

- Visit the Option Data View to see open interest, volume, and volatility data.
- Identify market trends that might affect my hedging strategy.

#### Exercise or Wait:

- Receive notifications about option expiry and price movements.
- Exercise my option if BTC drops, paying the strike price.
- Let it expire if BTC remains stable, with my maximum loss limited to the premium.

## 6. Technical Requirements

### Smart Contract (Clarity)

- **Language**: Clarity, Stacks' secure smart contract language.
- **Functions**:
  - `create-option`: Locks 0.1 sBTC to create an option.
  - `buy-option`: Transfers 50 STX premium to purchase an option.
  - `exercise-option`: Pays 100 STX strike price to receive 0.1 sBTC.
  - `expire-option`: Reclaims sBTC if unexercised after 500 blocks.
  - `get-option-details`: Retrieves option state (e.g., owner, status).
- **Deployment**: Deployed on Stacks Testnet using Clarinet or Hiro Explorer.

### Frontend (Web App)

- **Framework**: React with Stacks.js for blockchain integration.
- **Page Structure**:
  - Home View (central hub with market overview)
  - Easy Option View (simplified trading interface)
  - Option Data View (advanced market analytics)
- **Components**:
  - Shared Navigation Bar: Consistent across all views.
  - Wallet Connect Button: Present in all views for authentication.
  - P&L Visualization: Adapted for each view's context.
  - Market Overview: Featured on Home and Option Data views.
  - Trading Interface: Focused on Easy Option View.
- **Real-Time Data**: Polls get-block-info? every 10 seconds for block height.

### Blockchain Integration

- **Stacks.js**: Handles authentication, contract calls, and transaction signing.
- **sBTC Token**: Utilizes Testnet sBTC for transfers.
- **Block Height**: Tracks option expiry relative to the current block.

### Development Tools

- **Clarinet**: Local testing environment for Clarity contracts.
- **Hiro Wallet**: Testnet wallet for managing STX and sBTC.
- **Node.js**: Runs the frontend locally during development.
- **Chart.js**: Implements data visualizations across all views.

## 7. UI/UX Components

### Global Elements (All Views)

- **Navigation Header**: Consistent menu with links to all main views.
- **Wallet Connection**: Visible wallet status or connect button.
- **Network Indicator**: Testnet badge for clarity.
- **Footer**: Contains current block height and system status.

### Home View

- **Welcome Hero**: Introduction and value proposition (when not connected).
- **Market Overview Panel**: Shows available options, BTC price, and volume.
- **Portfolio Summary**: Displays STX/sBTC balances and hedging status (when connected).
- **Featured Options Grid**: Highlights key options available in the market.
- **Quick Action Cards**: Direct paths to create, buy, or manage options.
- **Simplified P&L Visualization**: Adapted version of the full graph.
- **Educational Resources**: Introductory materials for new users.

### Easy Option View

- **Step Indicator**: Visual tracker showing progress in the trade flow.
- **Option Type Selector**: Simplified choice between call and put options.
- **Strike Price Selector**: Visual slider with presets and current price indicator.
- **Expiration Selector**: Calendar view with duration presets.
- **Premium Calculator**: Clear display of costs and maximum loss.
- **P&L Scenario Visualizer**: Shows outcomes in different price scenarios.
- **Trade Confirmation Panel**: Final review before execution.
- **Post-Trade Management**: Tools for monitoring and exercising options.

### Option Data View

- **Market Statistics Panel**: Comprehensive data on current market conditions.
- **Tab Navigation**: Organized sections for different data types.
- **Options Chain Matrix**: Grid of premiums across strikes and expirations.
- **Open Interest Chart**: Visualizes market positioning across strikes.
- **Volume Distribution Chart**: Shows trading activity concentration.
- **Implied Volatility Charts**: Displays market's price expectations.
- **Detailed Options Table**: Sortable data with filtering controls.
- **Heat Map Visualization**: Color-coded grid for quick pattern identification.

### Design Principles

- **Clarity**: Uses simple cards, concise text, and consistent color coding.
- **Progressive Disclosure**: Reveals complexity as users navigate from Home to specialized views.
- **Feedback**: Provides real-time updates and confirmations of actions.
- **Trust**: Incorporates Stacks branding and security-focused visual elements.
- **Accessibility**: Ensures high contrast, keyboard navigation, and responsive design.

### Key Interactions

- **Connect Wallet**: Triggers Hiro Wallet pop-up and displays the connected address.
- **View Navigation**: Switches between Home, Easy Option, and Option Data views.
- **Option Purchase**: Guided flow through the Easy Option View to purchase.
- **Market Analysis**: Interactive charts and filters in the Option Data View.
- **Portfolio Management**: Monitoring and action tools across all views.

## 8. Success Metrics & KPIs

### Hackathon Metrics

- **Functional MVP**: Fully operational contract, multi-view frontend, and user flow.
- **Demo Quality**: 3-5 minute video demonstrating all views and key interactions.
- **Code Quality**: Well-documented Clarity and JavaScript code.
- **Innovation**: Pioneering sBTC options with a hedging focus and comprehensive UI.

### User-Centric Metrics

- **Setup Time**: Less than 20 minutes to connect and fund a wallet.
- **Task Completion**: 90% of users can buy an option through Easy Option View without assistance.
- **Navigation**: Users can successfully move between all three views.
- **Satisfaction**: 85% of users rate the hedging process as "clear" or "very clear."

## 9. Risks & Mitigations

### Risks

- **UI Complexity**: Multiple views may confuse new users.
  - **Mitigation**: Clear navigation, consistent design language, and guided starting points.
- **Testnet Delays**: Slow block times (~10 seconds) may frustrate users.
  - **Mitigation**: Display "Processing…" spinners and estimated times.
- **Wallet Issues**: Hiro Wallet bugs or funding difficulties.
  - **Mitigation**: Include a troubleshooting guide and mock balance fallback.
- **Contract Errors**: Clarity bugs causing fund loss.
  - **Mitigation**: Conduct thorough Clarinet testing and use post-conditions.
- **User Confusion**: Block-based expiry unclear to non-Stacks users.
  - **Mitigation**: Display time estimates (e.g., "3d 12h") alongside block height.

## 10. Project Timeline & Milestones

### Hackathon Timeline (Example)

#### Day 1:

- Develop Clarity contract and test in Clarinet.
- Set up React app with navigation structure for all three views.

#### Day 2:

- Build Home View with market overview and navigation.
- Implement Easy Option View's core purchase flow.

#### Day 3:

- Develop Option Data View with essential visualizations.
- Connect all views to contract functions (buy, exercise).

#### Day 4:

- Implement P&L visualizations across all views.
- Test end-to-end flow and record demo video.

### Deliverables

- **GitHub Repository**: Contains Clarity contract and React frontend.
- **Deployed Contract**: Live on Stacks Testnet via Hiro Explorer.
- **Demo Video**: 3-5 minutes showcasing all views and key user flows.
- **Documentation**: README with setup instructions, usage guide, and architecture overview.

## 11. Marketing & Branding

### Name

BitHedge: Reflects Bitcoin hedging in a concise, memorable way.

### Tagline

"Hedge Smart, Stay Bitcoin."

### Logo Concept

A green "H" transitioning into the Bitcoin symbol, symbolizing protection and growth.

### Pitch for Hackathon

"BitHedge introduces decentralized options to Bitcoin via sBTC and Stacks, enabling users to hedge volatility without leaving the Bitcoin ecosystem. With a multi-view interface catering to both beginners and advanced users, it combines clarity and security with powerful analytics, making it the ideal tool for risk-averse Bitcoin holders."

## 12. Compliance & Legal Notes

- **Testnet Only**: Operates with no real financial risk.
- **Disclaimer**: "This is a demo. Not financial advice. Use at your own risk."
- **Open Source**: Released under the MIT License.

## 13. Appendices

### Appendix A: User Journey Maps

- **Beginner Journey**: Home → Easy Option View → Purchase → Monitoring
- **Advanced User Journey**: Home → Option Data View → Market Analysis → Trade Decision
- **Emotions**: Curiosity → Confidence → Relief → Control

### Appendix B: View Mockups

Please refer to the following UI/UX design approach documents for detailed mockups:

- ui-ux-design-approach-home-page.md
- ui-ux-design-approach-easy-option-view.md
- ui-ux-design-approach-option-data-view.md

### Appendix C: Smart Contract Draft

**Sample Clarity Code**:

```clarity
(define-public (buy-option (option-id uint))
  (let ((option (unwrap! (map-get? options { id: option-id }) (err u1))))
    (try! (stx-transfer? u50 tx-sender (get seller option)))
    (map-set options { id: option-id } (merge option { owner: tx-sender }))
    (ok true)))
```

---

This updated PRD provides a detailed roadmap for BitHedge's multi-view approach, balancing Rachel's needs with expanded functionality for users at all experience levels. It's ready to guide development and impress hackathon judges with its comprehensive vision and feasible implementation plan.
