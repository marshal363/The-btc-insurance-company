# sBTC Options Contract: Updated Project Outline

## Introduction

Below is a structured project outline for the sBTC Options Contract dApp, tailored for the Bitcoin Vegas Hackathon's Stacks Track. This outline defines the core idea, essential features, and app flow (pages, navigation, and user actions) to guide development of a functional MVP using sBTC and Clarity on the Stacks blockchain. The updated outline incorporates a multi-view architecture that enhances user experience while maintaining hackathon feasibility, utilizing Next.js App Router and a comprehensive component library based on shadcn/ui.

## Core Idea

The sBTC Options Contract is a decentralized application that enables users to create, buy, and exercise call options for sBTC on the Stacks blockchain. A seller locks 0.1 sBTC into a Clarity smart contract, offering buyers the right to purchase it for 100 STX within 500 blocks (~3.5 days) by paying a 50 STX premium upfront. The app leverages sBTC's Bitcoin finality and trustless peg to bring options trading—a DeFi primitive—to Bitcoin, demonstrating its programmability and security.

## Objectives

- Provide a simple, secure way to trade sBTC call options.
- Highlight sBTC's unique properties (Bitcoin-backed, decentralized).
- Deliver a hackathon-ready MVP with multiple views serving different user needs.
- Balance simplicity for beginners with advanced data for experienced traders.
- Implement a scalable, maintainable component architecture.
- Ensure responsive design and accessibility across all devices.

## Essential Features

These are the must-have components for the MVP, keeping scope tight and aligned with hackathon goals.

### Smart Contract Functionality (Clarity)

- **Create Option**: Seller locks 0.1 sBTC to offer a call option.
- **Buy Option**: Buyer pays 50 STX premium to acquire the option.
- **Exercise Option**: Buyer pays 100 STX strike price to claim sBTC (before expiry).
- **Expire Option**: Seller reclaims sBTC if unexercised after 500 blocks.
- **View Option State**: Read-only function to display contract details.

### Frontend Interface (Next.js App Router Multi-View Web App)

- **Wallet Connection**: Integrate with Hiro Wallet for Stacks authentication across all views.
- **Landing Page**: Entry point with value proposition and user onboarding.
- **Home View**: Central hub with market overview, portfolio summary, and navigation.
- **Easy Option View**: Simplified, step-by-step interface for buying options.
- **Option Data View**: Advanced analytics for market insights and trends.
- **Cross-View Navigation**: Consistent header and seamless transitions between views.

### Core Components

- **P&L Visualization**: Shows potential outcomes across BTC price ranges using Recharts/D3.js.
- **Market Overview**: Displays available options with key metrics.
- **Portfolio Summary**: Shows wallet balances and hedging status when connected.
- **Option Management Tools**: Features for monitoring and exercising owned options.
- **Transaction Feedback**: Display success/failure messages post-action.
- **Responsive Design**: Mobile-first implementation with progressive disclosure.
- **Form Controls**: Accessible, easy-to-use controls built on shadcn/ui.

### Blockchain Integration

- Deploy contract to Stacks Testnet.
- Use Stacks.js with custom React hooks to call contract functions and handle sBTC/STX transfers.
- Implement Zustand stores for blockchain state management.
- Settle transactions with Bitcoin finality via Stacks.

### Demo Readiness

- Functional prototype testable on Testnet.
- 3-5 minute video showing the complete user journey across all views.
- Component documentation in Storybook (if time permits).

## App Flow: Views, Navigation, and User Actions

### Views

The app features a multi-page architecture with specialized views for different user needs, implemented using Next.js App Router:

#### Landing Page (`app/page.tsx`)

**Purpose**: Introduce BitHedge and its value proposition.

**Components**:

- Hero component with tagline and value proposition
- Launch App button
- Educational content about sBTC options
- Testnet disclaimer

#### Home View (`app/(app)/home/page.tsx`)

**Purpose**: Central hub for market overview and portfolio management.

**Components**:

- Market overview panel (available options, BTC price, volume)
- Portfolio summary (when connected)
- Featured options grid
- Quick action cards (Buy, Create, Calculate)
- Simplified P&L visualization
- Educational resources for new users

#### Easy Option View (`app/(app)/easy-option/page.tsx`)

**Purpose**: Simplified, step-by-step interface for option trading.

**Components**:

- StepIndicator (compound component)
- Option type selector (Call/Put)
- StrikeSelector with visual slider
- ExpirySelector with presets
- PremiumCalculator with cost breakdown
- PnLVisualizer
- ConfirmationDialog for trade confirmation
- TransactionFlow for post-purchase management

#### Option Data View (`app/(app)/option-data/page.tsx`)

**Purpose**: Advanced market analytics and visualizations.

**Components**:

- MarketStatistics panel
- Tab navigation (Overview, Open Interest, Implied Volatility)
- OptionsChain matrix
- MarketChart for open interest and volume distribution
- ImpliedVolatilityChart visualization
- OptionTable with filtering capabilities
- HeatMap visualization

#### Transaction History (`app/(app)/transactions/page.tsx`)

**Purpose**: View past option-related transactions.

**Components**:

- TransactionTable with filtering
- TransactionDetail
- Explorer links

### Navigation

- **MainNav**: Present on all main views, highlights current location.
- **Context-Aware CTAs**: "Trade" buttons from any view lead to Easy Option View.
- **Layout Structure**: App layout with persistent navigation using Next.js layout system.
- **Deep Linking**: Direct links to specific views and options using dynamic routes.

### User Actions & Flow

The app supports multiple user journeys across its views:

#### 1. New User Journey

```
Landing Page → Home View → Connect Wallet →
Easy Option View → Configure & Buy →
Home View (with owned option) → Monitor or Exercise
```

#### 2. Beginner Hedger Journey

```
Home View → View Portfolio → Quick Calculate →
Easy Option View → Step-by-Step Configuration →
Purchase Option → Monitor Status
```

#### 3. Advanced Trader Journey

```
Home View → Option Data View → Analyze Market →
Identify Opportunity → Easy Option View →
Configure & Trade → Monitor via Analytics
```

#### 4. Option Seller Journey

```
Home View → Create Option → Option Listed →
Monitor via Option Data View →
Receive Premium → Wait for Exercise/Expiry
```

### Key User Interactions

#### Wallet Connection (All Views)

- User clicks WalletConnect button
- Hiro Wallet popup appears for authentication
- WalletProvider updates state upon successful connection
- UI components react to connected state

#### Option Purchase (Easy Option View)

- User advances through TransactionFlow steps
- Form state managed with React Hook Form + Zod validation
- User reviews premium and potential outcomes via PnLVisualizer
- User confirms purchase, signs STX transfer via WalletProvider
- TransactionStatus displays confirmation
- OptionProvider updates with owned option status

#### Market Analysis (Option Data View)

- User explores data visualizations built with Recharts/D3.js
- Interactive OptionsChain allows parameter exploration
- User identifies attractive strike prices
- UserJourney tracking guides users to next steps
- System transfers context to Easy Option View with pre-filled parameters

#### Option Exercise (Home or Easy Option View)

- User views owned option status in OptionCard
- ExerciseButton triggers ConfirmationDialog
- WalletProvider handles transaction signing
- TransactionStatus shows progress and confirmation
- UserBalance updates with received sBTC

## Implementation Architecture

### Technology Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **UI Component Library**: shadcn/ui + Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Routing**: Next.js App Router
- **API Integration**: Stacks.js + Custom Hooks
- **Data Visualization**: Recharts + D3.js
- **Form Handling**: React Hook Form + Zod
- **Smart Contract**: Clarity deployed on Stacks Testnet

### Component Architecture

Following a three-tier component architecture:

#### Core Components (UI Primitives)

Built on shadcn/ui, these form the foundation of the UI:

- Button, Card, Dialog, Form elements, Typography components

#### Composite Components (Domain-Specific)

Domain-specific components combining UI primitives:

- OptionCard, PriceTag, WalletButton, TransactionStatus, StepIndicator

#### View Components (Page-Level)

High-level components assembled for specific views:

- Landing (Hero, FeatureHighlight)
- Home (MarketOverview, PortfolioSummary)
- EasyOption (StepIndicator, OptionConfigurator)
- OptionData (MarketStatistics, ChartDisplay)

### Project Structure

```
bithedge/
├── app/                         # Next.js App Router structure
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx               # Root layout
│   ├── (app)/                   # App routes (require authentication)
│   │   ├── layout.tsx           # App layout with navigation
│   │   ├── home/                # Home view
│   │   ├── easy-option/         # Easy Option view
│   │   ├── option-data/         # Option Data view
│   │   └── transactions/        # Transaction history
├── components/                  # React components
│   ├── ui/                      # shadcn/ui components
│   ├── landing/                 # Landing page components
│   ├── home/                    # Home view components
│   ├── easy-option/             # Easy Option view components
│   ├── option-data/             # Option Data view components
│   ├── transactions/            # Transaction components
│   └── shared/                  # Shared components
├── hooks/                       # Custom React hooks
│   ├── use-wallet.ts            # Wallet connection hooks
│   ├── use-contract.ts          # Contract interaction hooks
│   └── use-market-data.ts       # Market data hooks
├── lib/                         # Utility functions
│   ├── blockchain/              # Blockchain utilities
│   ├── formatting/              # Data formatting utilities
│   └── validation/              # Validation schemas
├── store/                       # Zustand stores
│   ├── wallet-store.ts          # Wallet state
│   ├── options-store.ts         # Options state
│   └── market-store.ts          # Market data state
├── styles/                      # Global styles
├── types/                       # TypeScript type definitions
└── public/                      # Static assets
```

### Development Phases

1. **Core Infrastructure**:

   - Set up Next.js with App Router
   - Implement shadcn/ui component system
   - Create base layouts and navigation structure
   - Set up Zustand stores for state management

2. **Smart Contract & Integration**:

   - Develop and test Clarity contract
   - Create custom hooks for blockchain interactions
   - Implement wallet connection functionality
   - Deploy contract to Stacks Testnet

3. **View Development**:

   - Landing Page components
   - Home View with market overview
   - Easy Option View with step flow
   - Option Data View with visualizations

4. **Feature Integration**:

   - Connect all views with consistent data flow
   - Implement transaction flows
   - Add responsive behavior across device sizes
   - Optimize performance and accessibility

5. **Polish & Testing**:
   - User journey testing
   - Edge case handling
   - Refinement of animations and transitions
   - Documentation and demo preparation

### Quality Assurance

- **Accessibility**: WCAG 2.1 AA compliance for all components
- **Performance**: Core Web Vitals optimization
- **Testing**: Unit tests with Vitest, component tests with React Testing Library
- **Responsive Design**: Mobile-first implementation with breakpoint testing

---

This updated outline integrates the sophisticated component architecture from the BitHedge Component Library Specification with the modern tech stack recommended in the Technology Stack Recommendations document. The result is a comprehensive blueprint for building a scalable, maintainable, and user-friendly dApp that showcases the power of sBTC options while remaining feasible within hackathon constraints.

The multi-view approach implemented through Next.js App Router provides specialized interfaces for different user needs, while the three-tier component architecture ensures consistency, reusability, and maintainability. The use of shadcn/ui with Tailwind CSS offers a flexible foundation for implementing the design system, and Zustand provides lightweight yet powerful state management across views.
