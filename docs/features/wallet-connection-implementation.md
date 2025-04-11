# Wallet Connection Implementation PRD

## Implementation Status

- [x] Setup wallet store with Zustand
- [x] Implement wallet hook (useWallet.ts)
- [x] Create wallet types
- [x] Create WalletConnect component
- [x] Update navbar and homepage components
- [x] Implement error handling with console logs
- [ ] Test connection flow
- [ ] Implement balance fetching
- [ ] Add network switching UI

## Recent Updates

- **Simplified Implementation**: Removed redundant custom wallet selection UI in favor of using the Stacks Connect modal directly
- **Streamlined UX**: Now clicking "Connect Wallet" directly opens the Stacks Connect modal with all available wallet options
- **Improved Code**: Removed unnecessary provider selection logic and simplified the connection flow

## Overview

This document outlines the implementation plan for integrating Hiro's Connect library to enable wallet connection functionality in the BitHedge platform.

## Connection Flow

1. User clicks "Connect Wallet" button
2. Stacks Connect modal opens automatically showing available wallets
3. User selects a wallet provider from the modal
4. If approved, wallet session is stored and UI updates to show connected state
5. If rejected, error state is shown with option to retry

## Goals

1. Implement secure and reliable wallet connection
2. Support multiple wallet providers (Hiro Wallet, Leather, Xverse)
3. Maintain persistent wallet sessions
4. Handle transaction signing and broadcasting
5. Provide clear feedback for all wallet-related actions

## Technical Specifications

### 1. Dependencies

```bash
npm install @stacks/connect @stacks/connect-react @stacks/network @stacks/transactions
```

### 2. Core Components Structure

```typescript
src/
  ├── components/
  │   └── wallet/
  │       ├── WalletConnect.tsx       # Main wallet connect button
  │       ├── WalletInfo.tsx          # Display wallet info when connected
  │       ├── WalletModal.tsx         # Wallet selection modal
  │       └── WalletActions.tsx       # Common wallet actions (disconnect, switch network)
  ├── hooks/
  │   └── wallet/
  │       ├── useWallet.ts            # Main wallet management hook
  │       ├── useNetwork.ts           # Network management
  │       └── useTransaction.ts       # Transaction management
  ├── store/
  │   └── wallet/
  │       ├── wallet-store.ts         # Zustand store for wallet state
  │       └── types.ts               # Wallet-related types
  └── utils/
      └── wallet/
          ├── providers.ts            # Wallet provider configurations
          ├── validation.ts          # Address and transaction validation
          └── errors.ts              # Error handling utilities
```

### 3. State Management (Zustand Store)

```typescript
interface WalletState {
  isConnected: boolean;
  address: string | null;
  network: "mainnet" | "testnet";
  provider: WalletProvider | null;
  balance: {
    stx: number;
    bitcoin: number;
  };
  actions: {
    connect: () => Promise<void>;
    disconnect: () => void;
    switchNetwork: (network: "mainnet" | "testnet") => Promise<void>;
  };
}
```

### 4. Implementation Phases

#### Phase 1: Basic Connection (2 days)

- [ ] Set up wallet store with Zustand
- [ ] Implement WalletConnect component
- [ ] Create wallet provider configuration
- [ ] Add basic error handling
- [ ] Implement session persistence

#### Phase 2: Enhanced Features (2 days)

- [ ] Add multi-wallet support
- [ ] Implement network switching
- [ ] Create transaction signing flow
- [ ] Add balance fetching
- [ ] Implement disconnect functionality

#### Phase 3: UI/UX Polish (1 day)

- [ ] Add loading states
- [ ] Implement error messages
- [ ] Create success notifications
- [ ] Add animation transitions
- [ ] Implement responsive design

### 5. API Specifications

#### Connect Wallet

```typescript
interface ConnectWalletOptions {
  onSuccess?: (address: string) => void;
  onError?: (error: Error) => void;
  provider?: WalletProvider;
}

const connectWallet = async (options: ConnectWalletOptions): Promise<void>;
```

#### Sign Transaction

```typescript
interface TransactionOptions {
  to: string;
  amount: number;
  memo?: string;
  network?: 'mainnet' | 'testnet';
}

const signAndBroadcast = async (options: TransactionOptions): Promise<string>;
```

### 6. Error Handling

| Error Code | Description     | User Message                        | Action                         |
| ---------- | --------------- | ----------------------------------- | ------------------------------ |
| WALLET_001 | No provider     | "Please install a supported wallet" | Show wallet installation guide |
| WALLET_002 | User rejected   | "Connection rejected"               | Allow retry                    |
| WALLET_003 | Network error   | "Network connection failed"         | Auto-retry with backoff        |
| WALLET_004 | Session expired | "Session expired"                   | Auto-reconnect                 |

### 7. Testing Strategy

#### Unit Tests

- Wallet store functionality
- Address validation
- Transaction formatting
- Error handling

#### Integration Tests

- Wallet connection flow
- Transaction signing
- Network switching
- Session persistence

#### E2E Tests

- Complete connection flow
- Transaction flow
- Error scenarios
- Multi-wallet support

### 8. Security Considerations

1. **Session Management**

   - Encrypt wallet session data
   - Implement session timeouts
   - Clear sensitive data on disconnect

2. **Transaction Safety**

   - Validate all transaction parameters
   - Implement transaction confirmation modals
   - Add transaction amount limits

3. **Network Security**
   - Validate network endpoints
   - Implement SSL pinning
   - Add rate limiting for API calls

### 9. Analytics Events

| Event Name             | Trigger               | Data Points          |
| ---------------------- | --------------------- | -------------------- |
| WALLET_CONNECT_START   | User clicks connect   | provider, timestamp  |
| WALLET_CONNECT_SUCCESS | Successful connection | address, provider    |
| WALLET_CONNECT_ERROR   | Connection error      | error_code, provider |
| WALLET_DISCONNECT      | User disconnects      | session_duration     |
| TRANSACTION_SIGN       | Transaction signed    | type, amount         |

## Success Metrics

1. **Technical Metrics**

   - Connection success rate > 95%
   - Average connection time < 3s
   - Transaction success rate > 98%

2. **User Experience Metrics**
   - Zero wallet-related crashes
   - < 1% session expiry rate
   - < 2s average transaction signing time

## Dependencies

1. Hiro Connect library (@stacks/connect)
2. React state management (Zustand)
3. Network library (@stacks/network)
4. Transaction library (@stacks/transactions)

## Timeline

1. **Week 1**

   - Basic wallet connection
   - Session management
   - Error handling

2. **Week 2**
   - Multi-wallet support
   - Transaction signing
   - Testing & documentation

## Future Considerations

1. Support for additional wallet providers
2. Enhanced transaction history
3. Hardware wallet support
4. Advanced security features
5. Performance optimizations
