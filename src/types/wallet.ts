// Wallet provider types
export type WalletProvider = 'hiro' | 'leather' | 'xverse';

// User wallet data
export interface WalletData {
  address: string;
  publicKey: string;
}

// Connection options
export interface ConnectOptions {
  onFinish?: () => void;
  onCancel?: () => void;
  provider?: WalletProvider;
  redirectTo?: string;
  appDetails?: {
    name: string;
    icon: string;
  };
}

// Transaction response
export interface TransactionResponse {
  txId: string;
  txStatus: 'pending' | 'success' | 'failed';
}

// Error types
export enum WalletErrorCode {
  NO_PROVIDER = 'WALLET_001',
  USER_REJECTED = 'WALLET_002',
  NETWORK_ERROR = 'WALLET_003',
  SESSION_EXPIRED = 'WALLET_004',
}

export interface WalletError {
  code: WalletErrorCode;
  message: string;
  details?: unknown;
} 