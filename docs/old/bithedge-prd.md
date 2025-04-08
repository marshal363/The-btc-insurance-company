# BitHedge: Product Requirements Document (PRD)

## Introduction

I'm thrilled you're excited about BitHedge! Below is an extremely detailed and well-redacted Product Requirements Document (PRD) for the BitHedge project—a decentralized application (dApp) built on the Stacks blockchain. BitHedge enables users to hedge Bitcoin volatility using sBTC call options, designed specifically for the Bitcoin Vegas Hackathon's Stacks Track. This PRD outlines a functional Minimum Viable Product (MVP) tailored to the needs of "Risk-Averse Rachel," a persona representing users who want to protect their Bitcoin portfolios during significant price drops. It includes the project's vision, features, technical requirements, UI/UX design, and more, ensuring a comprehensive yet actionable plan.

## Document Information

- **Version**: 1.0
- **Date**: November 10, 2024
- **Author**: [Your Name], Product Designer & Marketer
- **Project**: BitHedge – sBTC Options for Hedging Bitcoin Volatility
- **Hackathon**: Bitcoin Vegas Hackathon, Stacks Track

## 1. Executive Summary

BitHedge is a decentralized application (dApp) on the Stacks blockchain that allows users to hedge Bitcoin volatility by purchasing call options for sBTC, a 1:1 Bitcoin-backed asset. Leveraging Clarity smart contracts and Stacks' Bitcoin-secured finality, BitHedge offers a secure, trustless platform for users to safeguard their Bitcoin portfolios against price drops. The MVP provides a user-friendly dashboard where users can buy, monitor, and exercise sBTC call options, emphasizing simplicity, control, and emotional reassurance for risk-averse individuals.

## 2. Vision & Objectives

### Vision

To empower Bitcoin holders with decentralized, Bitcoin-secured hedging tools that mitigate volatility risks while upholding the principles of trustlessness and censorship resistance.

### Objectives

- **Primary**: Enable users to hedge Bitcoin volatility through sBTC call options.
- **Secondary**: Deliver an intuitive dashboard for option management, designed for risk-averse users.
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

- Bitcoin enthusiasts exploring decentralized finance.
- Stacks developers experimenting with sBTC use cases.
- Hackathon judges and mentors evaluating project innovation.

## 4. Key Features & Functionality

### MVP Features

#### Clarity Smart Contract:

- Supports creating, buying, exercising, and expiring sBTC call options.
- Example parameters: Locks 0.1 sBTC, premium of 50 STX, strike price of 100 STX, expires in 500 blocks.

#### Dashboard UI:

- **Option Overview**: Displays option status, details, and expiry countdown.
- **P&L Visualization**: Shows a mock price vs. gain/loss graph.
- **Hedging Calculator**: Allows users to input portfolio size and hedge percentage to determine options needed.
- **Straddle View Table**: Presents mock call/put options as a market proxy.
- **Action Panel**: Includes buttons for buying, exercising, and refreshing data.

#### Wallet Integration:

- Connects to Hiro Wallet (Stacks-compatible).
- Facilitates STX and sBTC transactions.

#### Real-Time Feedback:

- Updates block height dynamically.
- Confirms transactions with status notifications.

### Future Features (Post-MVP)

- Integration of live BTC/STX price feeds.
- Support for sBTC put options.
- Batch purchasing of multiple options.
- Mobile-responsive interface.

## 5. User Stories

### As Risk-Averse Rachel, I want to:

#### Set Up Easily:

- Install Hiro Wallet and fund it with Testnet STX/sBTC.
- Connect my wallet to BitHedge with a single click.

#### Understand My Hedge:

- View my portfolio's hedging status (e.g., "12% Hedged").
- See a P&L graph illustrating protection against BTC price drops.

#### Calculate My Needs:

- Input my BTC holdings and desired hedge percentage.
- Receive a recommendation for the number of options to purchase.

#### Buy an Option:

- Browse available call options in a table (strike price, premium).
- Click "Buy" and sign the STX premium payment.

#### Monitor My Option:

- Track expiry with a countdown timer and progress bar.
- Receive alerts if BTC experiences a significant drop.

#### Exercise or Wait:

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
- **Components**:
  - Wallet Connect Button: Initiates Hiro Wallet connection.
  - Option Overview Card: Displays option details.
  - P&L Line Graph: Uses Chart.js with mock data.
  - Hedging Calculator: Accepts inputs and displays outputs.
  - Straddle View Table: Shows mock option data.
  - Action Buttons: Context-sensitive (e.g., "Buy" or "Exercise").
- **Real-Time Data**: Polls get-block-info? every 10 seconds for block height.

### Blockchain Integration

- **Stacks.js**: Handles authentication, contract calls, and transaction signing.
- **sBTC Token**: Utilizes Testnet sBTC for transfers.
- **Block Height**: Tracks option expiry relative to the current block.

### Development Tools

- **Clarinet**: Local testing environment for Clarity contracts.
- **Hiro Wallet**: Testnet wallet for managing STX and sBTC.
- **Node.js**: Runs the frontend locally during development.

## 7. UI/UX Components

### Dashboard Layout

- **Header**: BitHedge logo, wallet status, network indicator (Testnet).
- **Portfolio Snapshot**: Displays STX/sBTC balances, BTC value, and hedged percentage.
- **Option Overview**: Shows option status, details, and expiry countdown.
- **Hedging Calculator**: Inputs (BTC amount, hedge %) and outputs (options, cost).
- **P&L Visualization**: Mock graph of BTC price vs. gain/loss.
- **Straddle View Table**: Mock call/put options with strike and premium.
- **Action Panel**: Buttons for buying, exercising, or refreshing.
- **Status Bar**: Current block height and transaction confirmations.

### Design Principles

- **Clarity**: Uses simple cards, concise text, and green/red color coding for gain/loss.
- **Feedback**: Provides real-time expiry countdowns and transaction modals.
- **Trust**: Incorporates Stacks branding and a "Testnet" badge for safety.
- **Accessibility**: Ensures high contrast and keyboard navigation support.

### Key Interactions

- **Connect Wallet**: Triggers Hiro Wallet pop-up and displays the connected address.
- **Buy Option**: Signs a 50 STX transaction, updates status to "Owned."
- **Exercise Option**: Signs a 100 STX transaction, delivers 0.1 sBTC.
- **Calculate Hedge**: Inputs 2.5 BTC and 50%, outputs "3 Options, 150 STX."

## 8. Success Metrics & KPIs

### Hackathon Metrics

- **Functional MVP**: Fully operational contract, frontend, and user flow.
- **Demo Quality**: 3-5 minute video demonstrating buy, monitor, and exercise actions.
- **Code Quality**: Well-documented Clarity and JavaScript code.
- **Innovation**: Pioneering sBTC options with a hedging focus.

### User-Centric Metrics

- **Setup Time**: Less than 20 minutes to connect and fund a wallet.
- **Task Completion**: 90% of users can buy an option without assistance.
- **Satisfaction**: 85% of users rate the hedging process as "clear" or "very clear."

## 9. Risks & Mitigations

### Risks

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
- Set up React app with Stacks.js integration.

#### Day 2:

- Build dashboard UI (Overview, Calculator, Table).
- Connect frontend to contract functions (buy, exercise).

#### Day 3:

- Implement P&L graph, expiry timeline, and alerts (mock data).
- Test end-to-end flow and record demo video.

#### Day 4:

- Refine UI, resolve bugs, and submit to hackathon.

### Deliverables

- **GitHub Repository**: Contains Clarity contract and React frontend.
- **Deployed Contract**: Live on Stacks Testnet via Hiro Explorer.
- **Demo Video**: 3-5 minutes showcasing the user flow.
- **Documentation**: README with setup instructions, usage guide, and architecture overview.

## 11. Marketing & Branding

### Name

BitHedge: Reflects Bitcoin hedging in a concise, memorable way.

### Tagline

"Hedge Smart, Stay Bitcoin."

### Logo Concept

A green "H" transitioning into the Bitcoin symbol, symbolizing protection and growth.

### Pitch for Hackathon

"BitHedge introduces decentralized options to Bitcoin via sBTC and Stacks, enabling users to hedge volatility without leaving the Bitcoin ecosystem. With clarity and security at its core, it's the ideal tool for risk-averse Bitcoin holders."

## 12. Compliance & Legal Notes

- **Testnet Only**: Operates with no real financial risk.
- **Disclaimer**: "This is a demo. Not financial advice. Use at your own risk."
- **Open Source**: Released under the MIT License.

## 13. Appendices

### Appendix A: User Journey Map

- **Steps**: Discovery → Wallet Setup → Option Purchase → Monitoring → Exercise/Expiry.
- **Emotions**: Curiosity → Confidence → Relief → Control.

### Appendix B: Dashboard Mockup

**Text Layout**:

```
[Header: Logo | Wallet Status | Testnet]
[Portfolio Snapshot: Balances | Hedged %]
[Option Overview: Status | Expiry]
[Hedging Calculator: Inputs | Outputs]
[P&L Graph]
[Straddle Table: Call | Put]
[Action Panel: Buy | Exercise]
[Status Bar: Block Height | Tx Status]
```

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

This PRD provides a detailed roadmap for BitHedge, balancing Rachel's needs with hackathon feasibility. It's ready to guide development and impress judges. Let me know if you'd like to refine any section further!
