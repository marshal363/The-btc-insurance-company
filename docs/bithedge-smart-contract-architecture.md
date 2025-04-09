# BitHedge: Smart Contract Architecture

## 1. Executive Summary

This document provides a detailed exploration of the smart contract architecture for BitHedge, a decentralized options trading platform built on the Stacks blockchain. While the high-level architecture document outlines the entire system, this document focuses specifically on the smart contract components, their interactions, and the detailed implementation considerations necessary to create a robust, secure, and functional options trading platform.

The smart contract architecture is designed to be modular, secure, and extensible, providing all necessary functionality for options creation, trading, exercising, and settlement, while maintaining the trustless and transparent nature of a fully decentralized platform.

## 2. Core Smart Contract Components

### 2.1 Contract Hierarchy

The BitHedge smart contract system consists of the following interrelated contracts:

```
┌─────────────────────┐
│                     │
│ BitHedge Registry   │◄───────────────────────┐
│                     │                        │
└─────────┬───────────┘                        │
          │                                    │
          │ manages                            │ references
          ▼                                    │
┌─────────────────────┐     ┌─────────────────────┐
│                     │     │                     │
│ Options Factory     │────►│ Option Instance     │
│                     │creates│                     │
└─────────┬───────────┘     └─────────┬───────────┘
          │                          │
          │ uses                     │ uses
          ▼                          ▼
┌─────────────────────┐     ┌─────────────────────┐
│                     │     │                     │
│ Price Oracle        │     │ sBTC Interface      │
│                     │     │                     │
└─────────────────────┘     └─────────────────────┘
```

### 2.2 Core Contracts Description

#### 2.2.1 BitHedge Registry

The Registry serves as the central hub and entry point for the BitHedge platform.

**Responsibilities**:

- Maintain a registry of all created options
- Track platform statistics and metrics
- Enforce platform-wide parameters and constraints
- Manage access control for admin functions
- Provide discovery mechanisms for frontend interfaces

**Key Functions**:

- `register-option`: Records new option instances when created
- `get-active-options`: Returns currently active options
- `get-option-by-id`: Retrieves specific option details
- `update-platform-parameters`: Admin function to adjust parameters
- `get-platform-stats`: Returns aggregate platform statistics

**Data Structures**:

```clarity
;; Main registry of options
(define-map options
  { option-id: uint }
  {
    contract-address: principal,
    option-type: (string-ascii 4),
    creation-block: uint,
    status: (string-ascii 10)
  }
)

;; Platform parameters
(define-data-var min-expiry-blocks uint u100)
(define-data-var max-expiry-blocks uint u10000)
(define-data-var platform-fee-rate uint u500) ;; 0.5% represented as basis points
```

#### 2.2.2 Options Factory

The Factory contract serves as the creation mechanism for new option instances.

**Responsibilities**:

- Create new option contracts with specified parameters
- Validate option parameters against platform rules
- Handle initial fee collection
- Register new options with the BitHedge Registry
- Provide templates for different option types

**Key Functions**:

- `create-call-option`: Creates a new call option with specified parameters
- `create-put-option`: Creates a new put option with specified parameters
- `get-creation-cost`: Calculates fees for creating a new option
- `get-option-templates`: Returns available option templates

**Data Structures**:

```clarity
;; Option type templates
(define-map option-templates
  { template-id: uint }
  {
    name: (string-ascii 20),
    description: (string-ascii 100),
    option-type: (string-ascii 4),
    collateral-type: (string-ascii 10),
    enabled: bool
  }
)

;; Option counter for generating IDs
(define-data-var next-option-id uint u1)
```

#### 2.2.3 Option Instance

Each created option exists as a separate contract instance with its own state and logic.

**Responsibilities**:

- Maintain the complete state for a single option
- Enforce option-specific rules and constraints
- Handle collateral locking and release
- Process option purchases
- Manage option exercise and expiration
- Calculate payouts based on price feeds

**Key Functions**:

- `initialize`: Sets up initial option parameters (called by factory)
- `buy-option`: Allows buyer to purchase the option by paying premium
- `exercise-option`: Allows option holder to exercise before expiration
- `expire-option`: Settles the option after expiration date
- `get-option-details`: Returns complete option information
- `get-intrinsic-value`: Calculates current option value based on price feed
- `get-time-value`: Estimates remaining time value of option

**Data Structures**:

```clarity
;; Main option data
(define-data-var option-data
  {
    id: uint,
    seller: principal,
    buyer: (optional principal),
    option-type: (string-ascii 4), ;; "CALL" or "PUT"
    underlying-asset: (string-ascii 10), ;; "BTC" for MVP
    underlying-amount: uint,
    strike-price: uint, ;; in STX
    premium: uint, ;; in STX
    creation-block: uint,
    expiry-block: uint,
    is-active: bool,
    is-exercised: bool,
    exercise-price: (optional uint) ;; Price at exercise if exercised
  }
  {
    id: u0,
    seller: tx-sender,
    buyer: none,
    option-type: "CALL",
    underlying-asset: "BTC",
    underlying-amount: u0,
    strike-price: u0,
    premium: u0,
    creation-block: u0,
    expiry-block: u0,
    is-active: false,
    is-exercised: false,
    exercise-price: none
  }
)
```

#### 2.2.4 Price Oracle

The Price Oracle provides reliable price data for calculating option values and settlement.

**Responsibilities**:

- Fetch and provide current price data for BTC/STX
- Maintain historical price records for settlement disputes
- Implement price feed security mechanisms
- Detect and handle anomalous price movements

**Key Functions**:

- `get-current-price`: Returns the latest verified price
- `get-historical-price`: Returns price at a specific block height
- `update-price`: Updates the price data (restricted to authorized feeders)
- `add-price-feeder`: Adds a new authorized price feed source
- `get-price-statistics`: Returns price volatility and other metrics

**Data Structures**:

```clarity
;; Current price data
(define-data-var current-price-data
  {
    price: uint,
    timestamp: uint,
    block-height: uint,
    feeder: principal
  }
  {
    price: u0,
    timestamp: u0,
    block-height: u0,
    feeder: 'ST000000000000000000000000000000000000000
  }
)

;; Historical price map
(define-map historical-prices
  { block-height: uint }
  {
    price: uint,
    timestamp: uint,
    feeder: principal
  }
)

;; Authorized price feeders
(define-map price-feeders
  { address: principal }
  { is-active: bool }
)
```

#### 2.2.5 sBTC Interface

The sBTC Interface manages interactions with the sBTC token for collateral handling.

**Responsibilities**:

- Handle sBTC deposits and withdrawals
- Verify sBTC balances and transfers
- Lock and release collateral based on option lifecycle
- Manage fallback mechanisms for failed transfers

**Key Functions**:

- `deposit-collateral`: Locks sBTC as collateral for an option
- `release-collateral`: Returns sBTC to the seller after expiration
- `transfer-on-exercise`: Transfers sBTC to buyer upon exercise
- `get-collateral-balance`: Checks available collateral for an option
- `verify-sbtc-transaction`: Confirms successful sBTC transfers

**Implementation Notes**:
This contract will interface with the sBTC token contract on the Stacks blockchain, which implements the SIP-10 token standard. For the MVP, a simplified testnet version of sBTC will be used.

## 3. Smart Contract Workflows

### 3.1 Option Creation Workflow

```
┌────────────┐     ┌────────────┐     ┌────────────┐     ┌────────────┐     ┌────────────┐
│            │     │            │     │            │     │            │     │            │
│   Seller   │────►│  Options   │────►│   Option   │────►│   sBTC     │────►│  BitHedge  │
│            │     │  Factory   │     │  Instance  │     │ Interface  │     │  Registry  │
│            │     │            │     │            │     │            │     │            │
└────────────┘     └────────────┘     └────────────┘     └────────────┘     └────────────┘
       │                 │                  │                  │                  │
       │    Request      │                  │                  │                  │
       │    Creation     │                  │                  │                  │
       │────────────────►│                  │                  │                  │
       │                 │                  │                  │                  │
       │                 │  Deploy Contract │                  │                  │
       │                 │─────────────────►│                  │                  │
       │                 │                  │                  │                  │
       │                 │                  │  Lock Collateral │                  │
       │                 │                  │─────────────────►│                  │
       │                 │                  │                  │                  │
       │                 │                  │                  │  Register Option │
       │                 │                  │                  │─────────────────►│
       │                 │                  │                  │                  │
       │                 │                  │     Return       │                  │
       │                 │◄─────────────────┤  Option Details  │                  │
       │                 │                  │                  │                  │
       │  Return Option  │                  │                  │                  │
       │◄────────────────│                  │                  │                  │
       │     Details     │                  │                  │                  │
       │                 │                  │                  │                  │
```

**Detailed Steps**:

1. Seller initiates option creation with the Options Factory, providing parameters:

   - Option type (call/put)
   - Underlying amount (amount of sBTC)
   - Strike price (in STX)
   - Premium (in STX)
   - Expiry (in blocks)

2. Options Factory validates the parameters:

   - Checks that expiry is within allowed bounds
   - Verifies the premium meets minimum requirements
   - Ensures the seller has sufficient collateral
   - Calculates and collects any platform fees

3. Options Factory deploys a new Option Instance contract with the specified parameters

4. Option Instance contract initializes its state and calls sBTC Interface to lock collateral

5. sBTC Interface verifies and locks the collateral (sBTC from seller)

6. Option Instance registers itself with the BitHedge Registry

7. Registry adds the option to its database and returns success

8. Factory returns the option ID and address to the seller

### 3.2 Option Purchase Workflow

```
┌────────────┐     ┌────────────┐     ┌────────────┐
│            │     │            │     │            │
│   Buyer    │────►│   Option   │────►│   Seller   │
│            │     │  Instance  │     │            │
│            │     │            │     │            │
└────────────┘     └────────────┘     └────────────┘
       │                 │                  │
       │  Request to Buy │                  │
       │────────────────►│                  │
       │                 │                  │
       │                 │   Verify Option  │
       │                 │    Available     │
       │                 │                  │
       │                 │  Transfer Premium│
       │                 │─────────────────►│
       │                 │                  │
       │                 │ Update Ownership │
       │                 │                  │
       │  Return Status  │                  │
       │◄────────────────│                  │                  │
       │                 │                  │                  │
```

**Detailed Steps**:

1. Buyer identifies an option they want to purchase and calls the buy-option function

2. Option Instance verifies:

   - Option is still active and available (not already purchased)
   - Buyer has sufficient STX for the premium
   - Option has not expired

3. Option Instance transfers the premium from buyer to seller using STX post-conditions

4. Option Instance updates its state to record the buyer as the new owner

5. Option Instance returns success status to the buyer

### 3.3 Option Exercise Workflow

```
┌────────────┐     ┌────────────┐     ┌────────────┐     ┌────────────┐     ┌────────────┐
│            │     │            │     │            │     │            │     │            │
│   Buyer    │────►│   Option   │────►│   Price    │────►│   sBTC     │────►│   Seller   │
│            │     │  Instance  │     │   Oracle   │     │ Interface  │     │            │
│            │     │            │     │            │     │            │     │            │
└────────────┘     └────────────┘     └────────────┘     └────────────┘     └────────────┘
       │                 │                  │                  │                  │
       │  Request to     │                  │                  │                  │
       │  Exercise       │                  │                  │                  │
       │────────────────►│                  │                  │                  │
       │                 │                  │                  │                  │
       │                 │  Request Price   │                  │                  │
       │                 │─────────────────►│                  │                  │
       │                 │                  │                  │                  │
       │                 │  Return Price    │                  │                  │
       │                 │◄─────────────────│                  │                  │
       │                 │                  │                  │                  │
       │                 │  Calculate       │                  │                  │
       │                 │  Intrinsic Value │                  │                  │
       │                 │                  │                  │                  │
       │                 │                  │  Transfer Assets │                  │
       │                 │─────────────────────────────────────────────────────► │
       │                 │                  │                  │                  │
       │                 │                  │  Transfer sBTC   │                  │
       │                 │─────────────────────────────────────►                  │
       │                 │                  │                  │                  │
       │                 │                  │                  │  Transfer STX    │
       │                 │                  │                  │─────────────────►│
       │                 │                  │                  │  (Strike Price)  │
       │                 │                  │                  │                  │
       │  Return Status  │                  │                  │                  │
       │◄────────────────│                  │                  │                  │
       │                 │                  │                  │                  │
```

**Detailed Steps**:

1. Buyer initiates option exercise by calling the exercise-option function

2. Option Instance verifies:

   - Caller is the option owner
   - Option is still active and not expired
   - Option has not been previously exercised

3. Option Instance requests current price from the Price Oracle

4. Price Oracle returns the verified current price

5. Option Instance calculates the intrinsic value based on:

   - For CALL: max(0, current_price - strike_price) \* underlying_amount
   - For PUT: max(0, strike_price - current_price) \* underlying_amount

6. If exercise is profitable (or forced by buyer):

   - For CALL: Buyer sends strike price in STX, receives underlying amount in sBTC
   - For PUT: Buyer sends underlying amount in sBTC, receives strike price in STX

7. Option Instance updates its state to record the exercise

8. Option Instance returns success status to the buyer

### 3.4 Option Expiration Workflow

```
┌────────────┐     ┌────────────┐     ┌────────────┐     ┌────────────┐
│            │     │            │     │            │     │            │
│   Seller   │────►│   Option   │────►│   sBTC     │────►│  BitHedge  │
│            │     │  Instance  │     │ Interface  │     │  Registry  │
│            │     │            │     │            │     │            │
└────────────┘     └────────────┘     └────────────┘     └────────────┘
       │                 │                  │                  │
       │  Request to     │                  │                  │
       │  Expire Option  │                  │                  │
       │────────────────►│                  │                  │
       │                 │                  │                  │
       │                 │  Verify Option   │                  │
       │                 │  Expired         │                  │
       │                 │                  │                  │
       │                 │  Release         │                  │
       │                 │  Collateral      │                  │
       │                 │─────────────────►│                  │
       │                 │                  │                  │
       │                 │                  │  Update Registry │
       │                 │                  │─────────────────►│
       │                 │                  │                  │
       │  Return Status  │                  │                  │
       │◄────────────────│                  │                  │
       │                 │                  │                  │
```

**Detailed Steps**:

1. After option expiry block height, seller (or any party) can call expire-option

2. Option Instance verifies:

   - Option is still active
   - Current block height is greater than expiry block height
   - Option has not been exercised

3. Option Instance calls sBTC Interface to release collateral back to seller

4. Option Instance updates its state to inactive

5. BitHedge Registry is updated to reflect the option's expired status

6. Option Instance returns success status to the caller

## 4. Additional Smart Contract Features

### 4.1 Option Market Operations

#### 4.1.1 Option Pricing Service

While basic option creation allows sellers to set their own premium, a pricing service can help suggest appropriate premiums.

**Key Functions**:

- `calculate-theoretical-premium`: Uses Black-Scholes model to suggest premiums
- `get-historical-premiums`: Returns data on similar options' past premiums
- `calculate-implied-volatility`: Derives implied volatility from market prices

**Implementation Approach**:
Due to Clarity's computational limitations, complex pricing calculations will be primarily performed client-side, with the contract only storing and providing reference data.

#### 4.1.2 Secondary Market Trading

For the MVP, options are non-transferable, but future versions will support secondary market trading.

**Planned Features**:

- Option tokenization as NFTs
- Transfer functions with fee structure
- Bid/ask order book for options
- Price discovery mechanisms

### 4.2 Risk Management Features

#### 4.2.1 Circuit Breakers

To protect against extreme market conditions, circuit breakers can temporarily pause specific operations.

**Key Functions**:

- `pause-option-creation`: Temporarily prevents new option creation
- `pause-option-exercise`: Temporarily prevents option exercise
- `check-circuit-breakers`: Verifies if operations are currently allowed
- `circuit-breaker-status`: Returns the current status of all circuit breakers

#### 4.2.2 Collateral Management

Enhanced collateral features to ensure option solvency.

**Key Functions**:

- `verify-collateral-adequacy`: Checks if collateral is sufficient
- `add-supplementary-collateral`: Allows increasing collateral if needed
- `collateral-health-check`: Returns collateral-to-value ratios

### 4.3 Advanced Option Features

#### 4.3.1 Option Templates

Predefined templates with standardized parameters to improve liquidity and user experience.

**Template Types**:

- Weekly expirations (nearest 4 weeks)
- Monthly expirations (nearest 3 months)
- Quarterly expirations (nearest 4 quarters)
- Standard strike price increments

#### 4.3.2 Option Strategies

Building blocks for more complex option strategies (future extension).

**Strategy Types**:

- Covered Calls
- Protected Puts
- Spreads (vertical, horizontal, diagonal)
- Straddles and Strangles

### 4.4 Governance Features

#### 4.4.1 Parameter Adjustment

Mechanisms for adjusting system parameters as needed.

**Key Functions**:

- `update-fee-structure`: Modifies platform fee rates
- `update-expiry-bounds`: Changes minimum/maximum expiry durations
- `update-min-collateral`: Adjusts minimum collateral requirements

#### 4.4.2 Access Control

Granular access control for different administrative functions.

**Key Functions**:

- `add-admin`: Adds a new administrator
- `remove-admin`: Removes an administrator
- `assign-role`: Assigns specific permission roles
- `check-permission`: Verifies caller has required permissions

### 4.5 Analytics Features

#### 4.5.1 Platform Metrics

Functions to track and analyze platform usage and health.

**Key Functions**:

- `get-total-volume`: Returns total trading volume
- `get-open-interest`: Returns amount of outstanding options
- `get-active-users`: Returns count of unique users
- `get-volume-by-expiry`: Returns volume grouped by expiration dates

#### 4.5.2 Market Analytics

Advanced metrics to understand market behavior.

**Key Functions**:

- `get-put-call-ratio`: Returns ratio of put to call volume
- `get-market-sentiment`: Analyzes options data for market sentiment
- `get-most-active-strikes`: Returns most actively traded strike prices

## 5. Contract Security Considerations

### 5.1 Authorization Controls

All contract functions include rigorous authorization checks to ensure only authorized parties can perform specific actions.

**Examples**:

- Only the option seller can create and expire options
- Only the option buyer can exercise options
- Only authorized price feeders can update price data
- Only platform administrators can adjust system parameters

### 5.2 Reentrancy Protection

Although Clarity's design naturally mitigates many reentrancy risks, additional protections include:

- Explicit state changes before external calls
- Transaction atomicity to prevent partial execution
- State validation before and after external contract calls

### 5.3 Integer Overflow Protection

Clarity prevents many integer overflow issues by design, but additional safeguards include:

- Explicit bounds checking on calculations
- Conservative rounding strategies for financial calculations
- Validation of input parameters against reasonable limits

### 5.4 Temporal Security

Time-based security mechanisms to prevent exploitation of block timing.

**Features**:

- Block height verification for all time-sensitive operations
- Grace periods for critical state transitions
- Expiration buffer zones to prevent last-minute exploitation

### 5.5 Economic Security

Mechanisms to ensure economic security of the platform.

**Features**:

- Minimum collateralization requirements
- Premium floor values to prevent dust attacks
- Fee structures that discourage spam transactions
- Price circuit breakers for extreme volatility

## 6. Testing Strategy

### 6.1 Unit Testing

Comprehensive unit tests for all contract functions using Clarinet.

**Key Test Categories**:

- Function parameter validation
- State transitions
- Authorization enforcement
- Mathematical calculations
- Error handling

### 6.2 Integration Testing

Tests for interactions between contract components.

**Key Test Areas**:

- Contract-to-contract calls
- Multi-step workflows
- Error propagation
- State consistency across contracts

### 6.3 Economic Testing

Simulations of economic behavior to identify potential exploits.

**Test Scenarios**:

- Extreme price movements
- Multiple concurrent exercises
- Market stress conditions
- Fee market dynamics

### 6.4 Formal Verification

While full formal verification is beyond the MVP scope, critical functions will be analyzed for correctness.

**Priority Areas**:

- Collateral management
- Option exercise calculations
- Premium transfers
- Authorization logic

## 7. Smart Contract Upgradability

### 7.1 Upgrade Mechanisms

Strategies for upgrading contracts while preserving state.

**Approaches**:

- Registry-based dispatch to new implementations
- State migration utilities
- Versioned interfaces with backwards compatibility
- Phased deprecation of old contracts

### 7.2 Data Persistence

Mechanisms to ensure data persists across upgrades.

**Strategies**:

- Separate data and logic contracts
- Data migration functions
- Archive contracts for historical data
- State snapshots before upgrades

## 8. Implementation Timeline

### 8.1 Phase 1: Core Contracts (2 weeks)

- Basic Registry implementation
- Simple Options Factory
- Minimal Option Instance with essential functions
- Stub Price Oracle with manual price updates
- Basic sBTC Interface

### 8.2 Phase 2: Enhanced Functionality (3 weeks)

- Complete Option lifecycle functions
- Automated Price Oracle with multiple feeds
- Enhanced error handling and recovery
- Basic analytics functions
- Expanded Registry capabilities

### 8.3 Phase 3: Optimization and Security (2 weeks)

- Contract optimization for gas efficiency
- Enhanced security features
- Comprehensive testing suite
- Circuit breakers and failsafes
- Documentation and audit preparation

### 8.4 Phase 4: Advanced Features (3 weeks)

- Option Templates implementation
- Price suggestion mechanisms
- Enhanced analytics
- Governance features
- Preparation for secondary market support

## 9. Conclusion

The BitHedge smart contract architecture provides a comprehensive foundation for a decentralized options trading platform on the Stacks blockchain. By implementing this layered, modular approach, the platform can offer secure, transparent, and flexible options trading while maintaining the decentralized ethos of the Bitcoin and Stacks ecosystems.

The contracts are designed with security as the primary concern, followed by usability and extensibility. The architecture supports the gradual addition of more sophisticated features while maintaining backward compatibility with existing options and interfaces.

Starting with a focused MVP that implements the core option lifecycle, the contract system can expand to support more complex trading strategies, enhanced market features, and additional asset types, ultimately providing a full-featured decentralized options exchange secured by Bitcoin finality.

## 10. Appendix

### 10.1 Example Clarity Contract: Option Instance

The following is a simplified example of the core Option Instance contract:

```clarity
;; Option Instance Contract
;; Manages a single option's lifecycle

;; Data Variables
(define-data-var option-data
  {
    id: uint,
    seller: principal,
    buyer: (optional principal),
    option-type: (string-ascii 4),
    underlying-amount: uint,
    strike-price: uint,
    premium: uint,
    creation-block: uint,
    expiry-block: uint,
    is-active: bool,
    is-exercised: bool
  }
  {
    id: u0,
    seller: tx-sender,
    buyer: none,
    option-type: "CALL",
    underlying-amount: u0,
    strike-price: u0,
    premium: u0,
    creation-block: u0,
    expiry-block: u0,
    is-active: false,
    is-exercised: false
  }
)

;; Error Codes
(define-constant ERR-NOT-AUTHORIZED (err u100))
(define-constant ERR-ALREADY-PURCHASED (err u101))
(define-constant ERR-NOT-ACTIVE (err u102))
(define-constant ERR-EXPIRED (err u103))
(define-constant ERR-NOT-EXPIRED (err u104))
(define-constant ERR-ALREADY-EXERCISED (err u105))
(define-constant ERR-TRANSFER-FAILED (err u106))

;; Initialization Function - Called by Factory
(define-public (initialize (option-id uint)
                          (option-seller principal)
                          (option-type (string-ascii 4))
                          (amount uint)
                          (strike uint)
                          (cost uint)
                          (expiry uint))
  (let ((current-block block-height))
    (asserts! (is-eq tx-sender (contract-call? .bithedge-registry get-factory-address)) ERR-NOT-AUTHORIZED)
    (asserts! (not (var-get is-active)) ERR-ALREADY-INITIALIZED)

    (var-set option-data {
      id: option-id,
      seller: option-seller,
      buyer: none,
      option-type: option-type,
      underlying-amount: amount,
      strike-price: strike,
      premium: cost,
      creation-block: current-block,
      expiry-block: (+ current-block expiry),
      is-active: true,
      is-exercised: false
    })

    (ok true)
  )
)

;; Purchase Option
(define-public (buy-option)
  (let ((option (var-get option-data)))
    (asserts! (var-get is-active) ERR-NOT-ACTIVE)
    (asserts! (is-none (get buyer option)) ERR-ALREADY-PURCHASED)
    (asserts! (< block-height (get expiry-block option)) ERR-EXPIRED)

    ;; Transfer premium from buyer to seller
    (try! (stx-transfer? (get premium option) tx-sender (get seller option)))

    ;; Update option state with buyer
    (var-set option-data (merge option { buyer: (some tx-sender) }))

    (ok true)
  )
)

;; Exercise Option
(define-public (exercise-option)
  (let ((option (var-get option-data))
        (current-price (try! (contract-call? .price-oracle get-current-price))))

    (asserts! (var-get is-active) ERR-NOT-ACTIVE)
    (asserts! (is-eq (some tx-sender) (get buyer option)) ERR-NOT-AUTHORIZED)
    (asserts! (< block-height (get expiry-block option)) ERR-EXPIRED)
    (asserts! (not (get is-exercised option)) ERR-ALREADY-EXERCISED)

    ;; Different logic for CALL vs PUT
    (if (is-eq (get option-type option) "CALL")
      ;; CALL option exercise
      (begin
        ;; Buyer pays strike price
        (try! (stx-transfer? (get strike-price option) tx-sender (get seller option)))
        ;; Seller delivers underlying asset
        (try! (contract-call? .sbtc-interface transfer-on-exercise
                             (get underlying-amount option)
                             (get seller option)
                             tx-sender))
      )
      ;; PUT option exercise
      (begin
        ;; Buyer delivers underlying asset
        (try! (contract-call? .sbtc-interface transfer-on-exercise
                             (get underlying-amount option)
                             tx-sender
                             (get seller option)))
        ;; Seller pays strike price
        (try! (stx-transfer? (get strike-price option) (get seller option) tx-sender))
      )
    )

    ;; Update option state to exercised
    (var-set option-data (merge option { is-exercised: true, is-active: false }))

    (ok true)
  )
)

;; Expire Option (after expiry date, if not exercised)
(define-public (expire-option)
  (let ((option (var-get option-data)))
    (asserts! (var-get is-active) ERR-NOT-ACTIVE)
    (asserts! (>= block-height (get expiry-block option)) ERR-NOT-EXPIRED)
    (asserts! (not (get is-exercised option)) ERR-ALREADY-EXERCISED)

    ;; Release collateral back to seller
    (try! (contract-call? .sbtc-interface release-collateral
                         (get underlying-amount option)
                         (get seller option)))

    ;; Update option state to inactive
    (var-set option-data (merge option { is-active: false }))

    (ok true)
  )
)

;; Get Option Details
(define-read-only (get-option-details)
  (ok (var-get option-data))
)

;; Get intrinsic value
(define-read-only (get-intrinsic-value)
  (let ((option (var-get option-data))
        (current-price (unwrap-panic (contract-call? .price-oracle get-current-price))))

    (if (is-eq (get option-type option) "CALL")
      ;; CALL option: max(0, current_price - strike_price) * underlying_amount
      (if (> current-price (get strike-price option))
        (/ (* (- current-price (get strike-price option)) (get underlying-amount option)) u100000000)
        u0)
      ;; PUT option: max(0, strike_price - current_price) * underlying_amount
      (if (< current-price (get strike-price option))
        (/ (* (- (get strike-price option) current-price) (get underlying-amount option)) u100000000)
        u0)
    )
  )
)
```
