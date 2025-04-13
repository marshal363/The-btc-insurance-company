# sBTC Options Contract: User Journey Map (Hedging Focus)

## Introduction

Below is a revised User Journey Map for the sBTC Options Contract dApp, tailored to a user whose primary motivation is to hedge Bitcoin volatility, particularly during significant price drops. This version adjusts the context, persona, and journey to reflect this goal, while maintaining the same detailed structure you requested. The dApp remains a Stacks-based call option platform using sBTC and Clarity, but the user's perspective shifts to risk management rather than speculative profit.

## Context

- **Product/Feature**: The sBTC Options Contract is a decentralized application (dApp) on the Stacks blockchain allowing users to create, buy, and exercise call options for sBTC (1:1 Bitcoin-backed asset). Sellers lock 0.1 sBTC, buyers pay a 50 STX premium for the right to buy it at 100 STX within 500 blocks (~3.5 days), leveraging sBTC's Bitcoin finality for secure hedging.

- **Primary User Persona**: "Risk-Averse Rachel" – A cautious Bitcoin holder seeking to protect against price drops.

- **User Goals**:

  - Hedge Bitcoin volatility by securing a low sBTC purchase price.
  - Minimize losses if Bitcoin drops significantly.
  - Use a secure, decentralized tool tied to Bitcoin's stability.

- **Timeline/Scope**: From discovering the dApp to buying and exercising an option during a volatile period, spanning ~1 hour for initial use and ~3.5 days for the option lifecycle (500 blocks).

## 1. User Persona Details

### Risk-Averse Rachel

#### Demographics

- Age: 35
- Gender: Female
- Location: Suburban Canada
- Occupation: Financial analyst and part-time crypto investor

#### Goals and Motivations

- Protect Bitcoin portfolio value during market downturns.
- Use sBTC options as a low-risk hedge against volatility.
- Gain peace of mind with a Bitcoin-secured DeFi tool.

#### Pain Points and Frustrations

- Anxiety over sudden Bitcoin price crashes.
- Distrust of centralized exchanges for hedging (e.g., futures).
- Difficulty understanding complex DeFi mechanics.

#### Technical Proficiency

Intermediate; knows Bitcoin basics and has used centralized exchanges (e.g., Binance), but limited Stacks/sBTC experience.

#### Usage Context

- **Device**: Laptop (MacBook) with Firefox browser.
- **Environment**: Home, during market monitoring sessions.
- **Time**: Late afternoon, 1-2 hours during volatile market news.
- **Key Responsibilities**: Managing family investments, tracking crypto markets, minimizing financial risk.

## 2. Journey Phases

### Phase 1: Discovery & Onboarding

- **Duration**: 20-25 minutes
- **User Goals**: Find a hedging tool and prepare to use it.
- **Expectations**: Trustworthy, easy-to-start solution.
- **Entry Points**: Stacks blog post, crypto forum, or news about Bitcoin drop.
- **Exit Points**: Wallet connected, Home View accessed.
- **Required Actions/Decisions**: Install Hiro Wallet, fund with STX/sBTC, connect wallet.
- **Dependencies**: Internet, Firefox, Testnet faucet access.

### Phase 2: Exploration & Decision Making

- **Duration**: 10-15 minutes
- **User Goals**: Understand available options and select appropriate hedge.
- **Expectations**: Clear information, guided process, understandable metrics.
- **Entry Points**: Home View with market overview.
- **Exit Points**: Option configuration completed in Easy Option View.
- **Required Actions/Decisions**: Browse options, select parameters, review P&L scenarios.
- **Dependencies**: Market data, active options, UI clarity.

### Phase 3: Transaction & Confirmation

- **Duration**: 5-10 minutes
- **User Goals**: Successfully purchase option and confirm hedging position.
- **Expectations**: Smooth transaction flow, clear confirmation.
- **Entry Points**: Easy Option View trade confirmation panel.
- **Exit Points**: Transaction confirmed, Home View with active option.
- **Required Actions/Decisions**: Approve transaction, sign wallet confirmation.
- **Dependencies**: 50 STX balance, Hiro Wallet connectivity.

### Phase 4: Monitoring & Exercising

- **Duration**: Variable (~3.5 days max, 500 blocks)
- **User Goals**: Exercise option if Bitcoin drops or let it expire if stable.
- **Expectations**: Clear signals to act, reliable execution.
- **Entry Points**: Home View portfolio section or Option Data View.
- **Exit Points**: sBTC acquired (exercise) or hedge lapses (expiry).
- **Required Actions/Decisions**: Track Bitcoin price, decide to exercise, pay strike price.
- **Dependencies**: 100 STX balance, market data, notification system.

## 3. Journey Steps

### Phase 1: Discovery & Onboarding

#### Step 1: Discover BitHedge

- **User Actions**: Reads Stacks blog about sBTC hedging, clicks dApp link to Landing Page.
- **Thinking**: "Can this protect my BTC if it crashes?"
- **Feeling**: Hopeful, skeptical.
- **Pain Points**: Uncertainty about Stacks' reliability vs. exchanges.
- **Opportunities**: Clear value proposition on Landing Page with "Bitcoin-Secured Hedging" messaging.
- **Touchpoints**: Blog, BitHedge Landing Page.
- **Success Metrics**: Landing Page engagement (time on page > 1 min).
- **Time**: 3-5 minutes.
- **Device**: Laptop browser.

#### Step 2: Learn About the Platform

- **User Actions**: Explores Landing Page sections, reads "How It Works", identifies with hedger persona.
- **Thinking**: "This seems designed for cautious people like me."
- **Feeling**: More confident, increasingly interested.
- **Pain Points**: Concern about technical complexity.
- **Opportunities**: Simple, visual explanations with risk context.
- **Touchpoints**: Value proposition cards, How It Works section, persona paths.
- **Success Metrics**: CTA clicks (Launch App button).
- **Time**: 3-5 minutes.
- **Device**: Laptop browser.

#### Step 3: Set Up Hiro Wallet

- **User Actions**: Installs Hiro Wallet, funds with Testnet STX/sBTC via faucet.
- **Thinking**: "Why another wallet? Is this safe?"
- **Feeling**: Frustrated if slow, reassured if clear.
- **Pain Points**: Testnet faucet complexity or delays.
- **Opportunities**: Add "Quick Setup for Hedging" tutorial.
- **Touchpoints**: Hiro Wallet site, Testnet faucet.
- **Success Metrics**: Wallet funded (STX/sBTC balance).
- **Time**: 15-20 minutes.
- **Device**: Laptop browser.

#### Step 4: Enter Application & Connect Wallet

- **User Actions**: Clicks "Launch App" on Landing Page, arrives at Home View, clicks "Connect Wallet."
- **Thinking**: "Please don't mess up my funds."
- **Feeling**: Anxious, then calm on success.
- **Pain Points**: Wallet connection errors.
- **Opportunities**: Clear connection status and "100% Decentralized" reassurance.
- **Touchpoints**: Home View, Hiro Wallet popup.
- **Success Metrics**: Connection success (address displayed, portfolio section appears).
- **Time**: 2-3 minutes.
- **Device**: Laptop browser.

### Phase 2: Exploration & Decision Making

#### Step 5: Explore Home View

- **User Actions**: Views market overview, featured options, and portfolio summary (now visible).
- **Thinking**: "I want to protect about 25% of my BTC holdings."
- **Feeling**: Curious, investigative.
- **Pain Points**: Unfamiliarity with options terminology.
- **Opportunities**: Contextual help tooltips, "New to Options?" section.
- **Touchpoints**: Home View market overview and portfolio sections.
- **Success Metrics**: Interaction with featured options (clicks).
- **Time**: 3-5 minutes.
- **Device**: Laptop browser.

#### Step 6: Enter Easy Option View

- **User Actions**: Clicks "Buy Option" on Home View, navigates to Easy Option View.
- **Thinking**: "I need something simple to get started."
- **Feeling**: Relieved to see step-by-step approach.
- **Pain Points**: Decision paralysis with too many choices.
- **Opportunities**: Highlight recommended options for beginners.
- **Touchpoints**: Easy Option View with step indicator.
- **Success Metrics**: Progression through steps (>50% completion).
- **Time**: 2-3 minutes.
- **Device**: Laptop browser.

#### Step 7: Configure Option Parameters

- **User Actions**: Selects call option, adjusts strike price slider, chooses expiration.
- **Thinking**: "Will this strike price give me enough protection?"
- **Feeling**: Analytical, cautious.
- **Pain Points**: Understanding relationship between parameters and protection.
- **Opportunities**: Visual P&L scenarios showing outcomes at different BTC prices.
- **Touchpoints**: Strike price selector, expiration selector, P&L visualizer.
- **Success Metrics**: Completes all configuration steps.
- **Time**: 5-7 minutes.
- **Device**: Laptop browser.

### Phase 3: Transaction & Confirmation

#### Step 8: Review & Confirm Purchase

- **User Actions**: Reviews option details, premium cost, and potential outcomes before confirming.
- **Thinking**: "50 STX seems reasonable for this protection."
- **Feeling**: Nervous, then committed.
- **Pain Points**: Last-minute doubts about decision.
- **Opportunities**: Comparison to cost of not hedging, clear maximum loss indicator.
- **Touchpoints**: Trade confirmation panel, P&L scenario visualizer.
- **Success Metrics**: Clicks "Confirm Trade" button.
- **Time**: 2-3 minutes.
- **Device**: Laptop browser.

#### Step 9: Sign Transaction

- **User Actions**: Signs 50 STX payment through Hiro Wallet popup.
- **Thinking**: "This better work if BTC tanks."
- **Feeling**: Nervous, then relieved on confirmation.
- **Pain Points**: Slow block confirmation (~10s).
- **Opportunities**: Add "Hedging Active" confirmation message with next steps.
- **Touchpoints**: Hiro Wallet popup, transaction confirmation screen.
- **Success Metrics**: Option bought (tx-id logged).
- **Time**: 1-2 minutes.
- **Device**: Laptop browser.

### Phase 4: Monitoring & Exercising

#### Step 10: View Active Option in Portfolio

- **User Actions**: Returns to Home View, sees newly purchased option in portfolio section.
- **Thinking**: "Good, I can see my hedge is active."
- **Feeling**: Satisfied, protected.
- **Pain Points**: Limited post-purchase information.
- **Opportunities**: Add option health indicator (good/at risk/critical).
- **Touchpoints**: Home View portfolio section.
- **Success Metrics**: Returns to check status (>1 visit per day).
- **Time**: 2-3 minutes.
- **Device**: Laptop browser.

#### Step 11: Explore Option Data View (Optional)

- **User Actions**: Clicks "Option Data" in navigation to view more detailed market analytics.
- **Thinking**: "I wonder what the overall market looks like."
- **Feeling**: Curious, potentially overwhelmed.
- **Pain Points**: Complexity of advanced data visualizations.
- **Opportunities**: Guided tour of Option Data View for beginners.
- **Touchpoints**: Option Data View with charts and tables.
- **Success Metrics**: Engagement with at least one data visualization.
- **Time**: 5-10 minutes (optional).
- **Device**: Laptop browser.

#### Step 12: Monitor Market & Option

- **User Actions**: Checks portfolio section periodically, tracks BTC price movements.
- **Thinking**: "If BTC drops below $45K, I'll exercise."
- **Feeling**: Stressed (volatility), secure (hedge in place).
- **Pain Points**: No integrated BTC price feed requiring external checks.
- **Opportunities**: Add BTC price widget and option exercise threshold indicator.
- **Touchpoints**: Home View portfolio section, external price sites.
- **Success Metrics**: Repeat visits (>2 over 3 days).
- **Time**: 5-15 minutes (over days).
- **Device**: Laptop and mobile browser.

#### Step 13: Exercise Option (BTC Drops)

- **User Actions**: Sees BTC drop, clicks "Exercise" button in portfolio section, signs 100 STX payment.
- **Thinking**: "Good thing I hedged—locking in sBTC now."
- **Feeling**: Relieved, satisfied.
- **Pain Points**: Insufficient STX balance at critical moment.
- **Opportunities**: Alert if STX < 100 before expiry.
- **Touchpoints**: Portfolio section, Hiro Wallet, exercise confirmation screen.
- **Success Metrics**: sBTC received (balance update).
- **Time**: 5-10 minutes.
- **Device**: Laptop or mobile browser.

#### Step 14 (Alternative): Option Expires (BTC Stable)

- **User Actions**: Receives expiry reminder, decides to let option expire as BTC price remains stable.
- **Thinking**: "Didn't need it this time, but good to know."
- **Feeling**: Neutral, slightly disappointed.
- **Pain Points**: No guidance on whether to renew protection.
- **Opportunities**: Offer "Renew Protection" option post-expiry.
- **Touchpoints**: Expiry notification, portfolio section update.
- **Success Metrics**: Views post-expiry summary.
- **Time**: 1-2 minutes (active review).
- **Device**: Laptop or mobile browser.

## 4. Touchpoints Analysis

### Digital Touchpoints

- **Landing Page**: Introduction and value proposition.
- **Home View**: Central hub with market overview and portfolio management.
- **Easy Option View**: Step-by-step trading interface.
- **Option Data View**: Advanced market analytics.
- **Hiro Wallet**: Authentication and transaction signing.
- **Testnet Faucet**: STX/sBTC funding.

### Physical Touchpoints

None.

### Human Touchpoints

- Hackathon mentors (optional support).

### System Touchpoints

- **Notifications**: Hiro Wallet tx confirmations.
- **Blockchain**: Block height updates for expiry.

### Integration Points

- Hiro Wallet ↔ dApp (Stacks.js).
- dApp ↔ Stacks blockchain (contract calls).

## 5. User Experience Factors

| Step            | Emotional State    | Effort (1-5) | Satisfaction | Friction             | Delight Moments     | Decision Complexity | Tech Requirements | Accessibility       |
| --------------- | ------------------ | ------------ | ------------ | -------------------- | ------------------- | ------------------- | ----------------- | ------------------- |
| Discover dApp   | Hopeful/Skeptical  | 1            | Neutral      | Trust issues         | Hedging focus       | Low                 | Browser           | Clear text          |
| Set Up Wallet   | Frustrated/Calm    | 3            | Medium       | Faucet delays        | Quick funding       | Medium              | Extension         | Step-by-step guide  |
| Connect Wallet  | Anxious/Relieved   | 2            | High         | Connection lag       | Secure link         | Low                 | Stacks.js         | High contrast       |
| Assess Option   | Cautious           | 2            | Medium       | No price context     | Hedge value display | High                | UI refresh        | Readable numbers    |
| Buy Option      | Nervous/Relieved   | 2            | High         | Slow tx              | Hedge confirmed     | Medium              | Blockchain        | Error visibility    |
| Monitor Option  | Stressed/Secure    | 2            | Medium       | External price check | Price integration   | High                | Periodic refresh  | Mobile support      |
| Exercise Option | Relieved/Satisfied | 2            | High         | Balance error        | Hedge pays off      | Medium              | Blockchain        | Button clarity      |
| Option Expires  | Neutral            | 1            | Medium       | No reminder          | Proactive alert     | Low                 | None              | Notification access |

## 6. Supporting Elements

### Required Resources

- Laptop, Firefox, Testnet STX/sBTC.

### System Dependencies

- Stacks blockchain, sBTC contract.

### Third-Party Integrations

- Hiro Wallet, Stacks.js.

### Content Requirements

- **Dashboard**: Option details, hedging explanation.
- **Modal**: "Hedge Activated" messages.

### Data Exchange Points

- Wallet → dApp (address), dApp → Blockchain (tx).

### Security Checkpoints

- Wallet signature, Clarity post-conditions.

### Performance Requirements

- <2s UI load, <10s tx confirmation.

## 7. Success Metrics

| Phase                 | KPIs                    | Conversion Points | Drop-off Indicators | Time Metrics     | Quality Metrics | Satisfaction Measures |
| --------------------- | ----------------------- | ----------------- | ------------------- | ---------------- | --------------- | --------------------- |
| Discovery & Setup     | Wallet setups, connects | Wallet connected  | Faucet abandonment  | <25 min total    | No setup errors | 75% complete setup    |
| Buying Option         | Options bought          | Hedge activated   | Tx failures         | <15 min          | Tx success rate | 85% feel "protected"  |
| Monitoring/Exercising | Options exercised       | sBTC hedged       | Missed expiry       | <10 min (action) | No fund loss    | 80% rate "reliable"   |

## 8. Annotations

### Critical Moments

- **Buy confirmation (Step 5)**: Locks in hedge, reduces anxiety.
- **Exercise success (Step 7)**: Validates hedging strategy.

### Personalization Opportunities

- Alerts for BTC price drops below strike-adjusted threshold.
- Custom expiry reminders based on user's risk tolerance.

### Confusion Points

- **Strike price value (Step 4)**: Needs BTC price context.
- **Testnet vs. real funds (Step 2)**: Risk of misunderstanding.

### Optimization Areas

- Integrate BTC price feed (Step 6).
- Simplify wallet funding (Step 2).

### Compliance

- Note: "Testnet demo, not live trading."

### Security

- Ensure sBTC lock/unlock is bug-free.
- Warn of Testnet reset risks.

---

This journey map reorients the sBTC Options Contract around Rachel's hedging needs, emphasizing security and clarity during volatile markets. It's primed for hackathon execution—focused, user-centric, and sBTC-driven. Want to tweak anything or add visuals? Let me know!
