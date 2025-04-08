# sBTC Options Contract: User Journey Map

## Introduction

Below is a detailed User Journey Map for the sBTC Options Contract dApp, designed for the Bitcoin Vegas Hackathon's Stacks Track. This map captures the complete user experience for a primary persona interacting with the dApp, structured according to your requested parameters. I'll define the context, persona, and journey, then break it down into phases, steps, and supporting analyses.

## Context

- **Product/Feature**: The sBTC Options Contract is a decentralized application (dApp) on the Stacks blockchain that allows users to create, buy, and exercise call options for sBTC (a 1:1 Bitcoin-backed asset). Sellers lock 0.1 sBTC, buyers pay a 50 STX premium for the right to buy it at 100 STX within 500 blocks (~3.5 days), leveraging sBTC's Bitcoin finality and Clarity smart contracts.

- **Primary User Persona**: "Crypto Trader Tom" – A tech-savvy Bitcoin enthusiast exploring DeFi opportunities.

- **User Goals**:

  - Buy an sBTC call option to profit from price movements.
  - Use sBTC securely in a decentralized DeFi app.
  - Understand and complete the process quickly.

- **Timeline/Scope**: From discovering the dApp to completing an option purchase and exercise (or expiration), spanning ~1 hour for initial use and ~3.5 days for the full option lifecycle (500 Stacks blocks).

## 1. User Persona Details

### Crypto Trader Tom

#### Demographics

- Age: 28
- Gender: Male
- Location: Urban USA
- Occupation: Freelance developer and crypto trader

#### Goals and Motivations

- Maximize returns by leveraging Bitcoin in DeFi.
- Explore innovative Bitcoin L2 solutions like sBTC.
- Gain confidence in using Stacks and Clarity-based apps.

#### Pain Points and Frustrations

- Unfamiliarity with Stacks wallet setup (e.g., Hiro Wallet).
- Fear of losing funds due to contract errors or hacks.
- Confusion over blockchain delays (e.g., block times).

#### Technical Proficiency

Intermediate to advanced; familiar with Bitcoin, Ethereum DeFi (e.g., Uniswap), and wallet management, but new to Stacks and sBTC.

#### Usage Context

- **Device**: Desktop (Windows/Mac) with Chrome browser.
- **Environment**: Home office, quiet, focused time.
- **Time**: Evening, 1-2 hours available.
- **Key Responsibilities**: Managing crypto portfolio, researching new protocols, executing trades.

## 2. Journey Phases

### Phase 1: Discovery & Setup

- **Duration**: 15-20 minutes
- **User Goals**: Learn about the dApp and set up prerequisites.
- **Expectations**: Clear instructions, quick onboarding.
- **Entry Points**: Hackathon tweet, Stacks website, or friend's referral.
- **Exit Points**: Wallet connected, ready to interact with dApp.
- **Required Actions/Decisions**: Install Hiro Wallet, fund with STX/sBTC, visit dApp URL.
- **Dependencies**: Internet, Chrome browser, Testnet STX/sBTC (faucet).

### Phase 2: Buying the Option

- **Duration**: 10-15 minutes
- **User Goals**: Purchase an sBTC call option securely.
- **Expectations**: Simple process, transparent costs.
- **Entry Points**: Dashboard with active option available.
- **Exit Points**: Option bought, premium paid.
- **Required Actions/Decisions**: Connect wallet, click "Buy Option," approve transaction.
- **Dependencies**: Active option in contract, 50 STX balance.

### Phase 3: Exercising or Waiting

- **Duration**: Variable (~3.5 days max, 500 blocks)
- **User Goals**: Exercise option for profit or let it expire.
- **Expectations**: Clear expiry info, easy exercise process.
- **Entry Points**: Dashboard showing owned option.
- **Exit Points**: sBTC received (exercise) or option expires.
- **Required Actions/Decisions**: Monitor expiry, decide to exercise, approve strike price payment.
- **Dependencies**: 100 STX balance, block height < expiry.

## 3. Journey Steps

### Phase 1: Discovery & Setup

#### Step 1: Find the dApp

- **User Actions**: Reads hackathon tweet, clicks dApp URL (e.g., sbtc-options.vercel.app).
- **Thinking**: "What's this sBTC thing? Can I trust it?"
- **Feeling**: Curious, cautious.
- **Pain Points**: Unclear if dApp is legit or scam.
- **Opportunities**: Add "Built on Stacks" badge, link to docs.
- **Touchpoints**: Twitter, dApp website.
- **Success Metrics**: Page visit (analytics).
- **Time**: 2-3 minutes.
- **Device**: Desktop browser.

#### Step 2: Install Hiro Wallet

- **User Actions**: Downloads Hiro Wallet extension, creates/funds wallet via Testnet faucet.
- **Thinking**: "Do I need this? How long will it take?"
- **Feeling**: Annoyed if slow, excited if fast.
- **Pain Points**: Testnet faucet delays or unclear setup.
- **Opportunities**: Embed wallet setup guide in dApp.
- **Touchpoints**: Hiro Wallet site, Testnet faucet.
- **Success Metrics**: Wallet installed (user connects later).
- **Time**: 10-15 minutes.
- **Device**: Desktop browser.

#### Step 3: Connect Wallet

- **User Actions**: Clicks "Connect Wallet" on dApp, approves Hiro prompt.
- **Thinking**: "Hope this doesn't drain my funds."
- **Feeling**: Nervous, then relieved on success.
- **Pain Points**: Wallet pop-up lag or rejection.
- **Opportunities**: Add "Secure Connection" tooltip.
- **Touchpoints**: dApp UI, Hiro Wallet.
- **Success Metrics**: Successful connection (address shown).
- **Time**: 1-2 minutes.
- **Device**: Desktop browser.

### Phase 2: Buying the Option

#### Step 4: View Option Details

- **User Actions**: Sees dashboard with option (0.1 sBTC, 50 STX premium, 100 STX strike, expiry block).
- **Thinking**: "Is this a good deal? When's it expire?"
- **Feeling**: Analytical, intrigued.
- **Pain Points**: Expiry block confusing (needs time conversion).
- **Opportunities**: Show expiry as "3 days left" countdown.
- **Touchpoints**: dApp dashboard.
- **Success Metrics**: Time on page (>30s).
- **Time**: 2-3 minutes.
- **Device**: Desktop browser.

#### Step 5: Buy Option

- **User Actions**: Clicks "Buy Option," signs 50 STX transfer in Hiro Wallet.
- **Thinking**: "Will this work? Is 50 STX worth it?"
- **Feeling**: Anxious, then satisfied on confirmation.
- **Pain Points**: Slow Testnet confirmation (~10s/block).
- **Opportunities**: Add "Processing…" spinner with ETA.
- **Touchpoints**: dApp UI, Hiro Wallet, Stacks blockchain.
- **Success Metrics**: Transaction confirmed (tx-id logged).
- **Time**: 5-10 minutes.
- **Device**: Desktop browser.

### Phase 3: Exercising or Waiting

#### Step 6: Monitor Option

- **User Actions**: Revisits dashboard, checks expiry countdown and sBTC price.
- **Thinking**: "Should I exercise now or wait?"
- **Feeling**: Tense (price volatility), engaged.
- **Pain Points**: No price feed to compare strike price.
- **Opportunities**: Integrate sBTC/STX price oracle mockup.
- **Touchpoints**: dApp dashboard.
- **Success Metrics**: Repeat visits (analytics).
- **Time**: 5-10 minutes (over days).
- **Device**: Desktop browser.

#### Step 7: Exercise Option

- **User Actions**: Clicks "Exercise Option," signs 100 STX payment.
- **Thinking**: "Sweet, I'll get sBTC cheaper than market!"
- **Feeling**: Excited, confident.
- **Pain Points**: Insufficient STX balance error.
- **Opportunities**: Warn if balance < 100 STX before signing.
- **Touchpoints**: dApp UI, Hiro Wallet, Stacks blockchain.
- **Success Metrics**: sBTC received (balance update).
- **Time**: 5-10 minutes.
- **Device**: Desktop browser.

#### Step 8 (Alternative): Option Expires

- **User Actions**: Ignores option, seller reclaims sBTC post-expiry.
- **Thinking**: "Missed my chance, oh well."
- **Feeling**: Disappointed, neutral.
- **Pain Points**: No reminder before expiry.
- **Opportunities**: Send email/push notification at 50 blocks left.
- **Touchpoints**: dApp dashboard (seller), blockchain.
- **Success Metrics**: Seller reclaims sBTC.
- **Time**: 0 minutes (passive for buyer).
- **Device**: N/A (seller uses desktop).

## 4. Touchpoints Analysis

### Digital Touchpoints

- **dApp Website**: Main interaction hub (dashboard).
- **Hiro Wallet**: Wallet connection, transaction signing.
- **Twitter**: Initial discovery (hackathon post).
- **Testnet Faucet**: Funding wallet with STX/sBTC.

### Physical Touchpoints

None (fully digital).

### Human Touchpoints

- Hackathon mentors (onsite help, if available).

### System Touchpoints

- **Notifications**: Transaction confirmations via Hiro Wallet.
- **Blockchain Events**: Block height updates for expiry.

### Integration Points

- Hiro Wallet ↔ dApp (Stacks.js authentication).
- dApp ↔ Stacks blockchain (contract calls).

## 5. User Experience Factors

| Step            | Emotional State   | Effort (1-5) | Satisfaction | Friction          | Delight Moments     | Decision Complexity | Tech Requirements | Accessibility         |
| --------------- | ----------------- | ------------ | ------------ | ----------------- | ------------------- | ------------------- | ----------------- | --------------------- |
| Find dApp       | Curious           | 1            | Neutral      | Scam fear         | Clear branding      | Low                 | Browser           | Screen reader support |
| Install Wallet  | Annoyed/Excited   | 3            | Medium       | Faucet delay      | Fast setup          | Medium              | Browser extension | Clear instructions    |
| Connect Wallet  | Nervous/Relieved  | 2            | High         | Pop-up lag        | Instant connect     | Low                 | Stacks.js         | Color contrast        |
| View Option     | Intrigued         | 1            | Medium       | Expiry confusion  | Real-time countdown | Medium              | UI refresh        | Text size             |
| Buy Option      | Anxious/Satisfied | 2            | High         | Slow confirmation | Success modal       | Medium              | Blockchain        | Error readability     |
| Monitor Option  | Tense/Engaged     | 2            | Medium       | No price info     | Price feed addition | High                | Periodic refresh  | Mobile compatibility  |
| Exercise Option | Excited/Confident | 2            | High         | Balance error     | sBTC gain           | Medium              | Blockchain        | Button visibility     |
| Option Expires  | Disappointed      | 1            | Low          | No reminder       | Expiry alert        | Low                 | None              | Notification support  |

## 6. Supporting Elements

### Required Resources

- Stacks Testnet access, Hiro Wallet, Chrome browser.

### System Dependencies

- Stacks blockchain (block production), sBTC contract.

### Third-Party Integrations

- Hiro Wallet (authentication), Stacks.js (API).

### Content Requirements

- Dashboard text (option details), modal messages.

### Data Exchange Points

- Wallet → dApp (address), dApp → Blockchain (tx data).

### Security Checkpoints

- Wallet signature verification, contract post-conditions.

### Performance Requirements

- <2s UI load, <10s tx confirmation (Testnet).

## 7. Success Metrics

| Phase              | KPIs                      | Conversion Points | Drop-off Indicators | Time Metrics     | Quality Metrics  | Satisfaction Measures |
| ------------------ | ------------------------- | ----------------- | ------------------- | ---------------- | ---------------- | --------------------- |
| Discovery & Setup  | Wallet installs, connects | Wallet connected  | Faucet abandonment  | <20 min total    | Error-free setup | 80% complete setup    |
| Buying Option      | Options bought            | Tx confirmed      | Failed tx attempts  | <15 min          | Tx success rate  | 90% rate "easy"       |
| Exercising/Waiting | Options exercised         | sBTC received     | Expired options     | <10 min (action) | No fund loss     | 85% rate "clear"      |

## 8. Annotations

### Critical Moments

- **Wallet connection (Step 3)**: First trust hurdle.
- **Buy success (Step 5)**: Builds confidence.
- **Exercise success (Step 7)**: Delivers payoff.

### Personalization Opportunities

- Custom expiry countdown per user's timezone.
- Price alerts based on sBTC/STX trends.

### Confusion Points

- **Expiry block (Step 4)**: Needs human-readable time.
- **Testnet setup (Step 2)**: Unfamiliar to Ethereum users.

### Optimization Areas

- Faster Testnet funding (Step 2).
- Real-time price feed (Step 6).

### Compliance

- Disclaimer: "Testnet only, not financial advice."

### Security

- Audit Clarity contract for fund safety.
- Warn users of Testnet risks (e.g., reset).

---

This journey map provides a detailed blueprint for Tom's experience with the sBTC Options Contract dApp. It's ready to guide development and demo prep for the hackathon. Need a visual mockup, deeper step details, or anything else? Let me know!
