# BitHedge: System Architecture Diagrams

## Introduction

This document provides a comprehensive set of architecture diagrams for BitHedge, a decentralized options trading platform built on the Stacks blockchain. These diagrams illustrate the various layers, components, and interactions within the system to provide a clear understanding of the overall architecture.

## Context

- **Project Name**: BitHedge
- **System Type**: Web-based dApp (Decentralized Application)
- **Scale**: Initial MVP targeted for hackathon with potential to scale to thousands of users
- **Infrastructure**: Cloud-hosted frontend with Stacks blockchain backend
- **Key Requirements**:
  - Enable users to create and trade sBTC call options
  - Provide intuitive UI for both beginner and advanced users
  - Ensure secure handling of sBTC and STX transactions
  - Facilitate market overview and analytics
  - Support Bitcoin finality through Stacks blockchain

## 1. System Context Diagram

```mermaid
graph TB
    User["User (Trader/Hedger)"]
    BitHedge["BitHedge Platform"]
    Stacks["Stacks Blockchain"]
    Bitcoin["Bitcoin Network"]
    HiroWallet["Hiro Wallet"]
    CexApi["External Price Feed APIs"]

    User -- "Interacts with" --> BitHedge
    User -- "Authenticates via" --> HiroWallet
    BitHedge -- "Deploys & Calls Contracts" --> Stacks
    BitHedge -- "Retrieves Price Data" --> CexApi
    HiroWallet -- "Signs Transactions" --> Stacks
    Stacks -- "Anchors to" --> Bitcoin

    classDef primary fill:#1E90FF,stroke:#333,stroke-width:2px,color:white;
    classDef secondary fill:#32CD32,stroke:#333,stroke-width:2px,color:white;
    classDef external fill:#FF4500,stroke:#333,stroke-width:2px,color:white;

    class BitHedge primary;
    class Stacks,HiroWallet secondary;
    class Bitcoin,CexApi external;
```

**Description**:

The System Context Diagram illustrates BitHedge's position within the broader ecosystem. Users interact with the BitHedge platform using Hiro Wallet for authentication and transaction signing. BitHedge communicates with the Stacks blockchain to deploy and call smart contracts while retrieving market data from external price feed APIs. The Stacks blockchain anchors to the Bitcoin network to leverage Bitcoin's security and finality.

## 2. Container Diagram

```mermaid
graph TB
    User["User (Trader/Hedger)"]

    subgraph "BitHedge Platform"
        FrontEnd["Frontend Application<br/>(React, Stacks.js)"]

        subgraph "Frontend Views"
            LandingPage["Landing Page"]
            HomeView["Home View"]
            EasyOptionView["Easy Option View"]
            OptionDataView["Option Data View"]
        end

        DataLayer["Data Layer<br/>(API Client, State Management)"]
    end

    subgraph "Blockchain Infrastructure"
        HiroWallet["Hiro Wallet"]
        StacksAPI["Stacks API"]

        subgraph "Stacks Blockchain"
            OptionsContract["sBTC Options Contract<br/>(Clarity)"]
            sbtcContract["sBTC Token Contract"]
        end

        subgraph "Bitcoin Network"
            BTC["Bitcoin Blockchain"]
        end
    end

    ExternalAPI["External Price Feeds"]

    User -- "Accesses" --> FrontEnd
    User -- "Authorizes via" --> HiroWallet

    FrontEnd -- "Navigates between" --> LandingPage & HomeView & EasyOptionView & OptionDataView
    FrontEnd -- "Reads/Updates" --> DataLayer
    DataLayer -- "Queries" --> StacksAPI
    DataLayer -- "Fetches prices" --> ExternalAPI
    DataLayer -- "Initiates transactions" --> HiroWallet

    HiroWallet -- "Signs & submits" --> StacksAPI
    StacksAPI -- "Interacts with" --> OptionsContract & sbtcContract
    OptionsContract -- "Calls" --> sbtcContract
    Stacks -- "Anchors to" --> BTC

    classDef user fill:#F5F5F5,stroke:#333,stroke-width:1px;
    classDef frontend fill:#1E90FF,stroke:#333,stroke-width:1px,color:white;
    classDef data fill:#32CD32,stroke:#333,stroke-width:1px,color:white;
    classDef wallet fill:#FF4500,stroke:#333,stroke-width:1px,color:white;
    classDef contract fill:#9932CC,stroke:#333,stroke-width:1px,color:white;
    classDef external fill:#FFD700,stroke:#333,stroke-width:1px;

    class User user;
    class FrontEnd,LandingPage,HomeView,EasyOptionView,OptionDataView frontend;
    class DataLayer data;
    class HiroWallet,StacksAPI wallet;
    class OptionsContract,sbtcContract contract;
    class ExternalAPI,BTC external;
```

**Description**:

The Container Diagram breaks down the BitHedge platform into its main components. The frontend application consists of multiple views (Landing Page, Home View, Easy Option View, and Option Data View) built with React and Stacks.js. The Data Layer handles API interactions, state management, and transaction initiation. On the blockchain side, we have the Hiro Wallet for authentication, the Stacks API for blockchain interaction, and smart contracts (sBTC Options Contract and sBTC Token Contract) deployed on the Stacks blockchain, which anchors to Bitcoin for security.

## 3. Component Diagram

```mermaid
graph TB
    subgraph "Frontend Application"
        Router["Router<br/>(React Router)"]

        subgraph "Core Components"
            NavHeader["Navigation Header"]
            WalletConnector["Wallet Connector"]
            NotificationSystem["Notification System"]
            SharedUI["Shared UI Components"]
        end

        subgraph "View-Specific Components"
            LandingComponents["Landing Page Components"]
            HomeComponents["Home View Components"]
            EasyOptionComponents["Easy Option View Components"]
            DataViewComponents["Option Data View Components"]
        end

        subgraph "Data Visualization"
            PnLVisualizer["P&L Visualizer"]
            MarketCharts["Market Charts"]
            OptionsChain["Options Chain Matrix"]
            HeatMap["Heat Map Visualizer"]
        end

        subgraph "State Management"
            AppState["Application State"]
            WalletState["Wallet State"]
            ContractState["Contract State"]
            MarketDataState["Market Data State"]
        end
    end

    subgraph "Data Services"
        StacksService["Stacks Service"]
        MarketDataService["Market Data Service"]
        ContractService["Contract Service"]
        WalletService["Wallet Service"]
    end

    subgraph "Smart Contracts"
        OptionFunctions["Option Contract Functions"]
        OptionData["Option Data Structure"]
        SBTCInterface["sBTC Interface"]
    end

    Router -- "Routes to" --> LandingComponents & HomeComponents & EasyOptionComponents & DataViewComponents
    NavHeader & WalletConnector & NotificationSystem -- "Used by" --> Router

    LandingComponents & HomeComponents & EasyOptionComponents & DataViewComponents -- "Use" --> SharedUI
    HomeComponents -- "Uses" --> PnLVisualizer
    DataViewComponents -- "Uses" --> MarketCharts & OptionsChain & HeatMap
    EasyOptionComponents -- "Uses" --> PnLVisualizer

    AppState -- "Contains" --> WalletState & ContractState & MarketDataState
    HomeComponents & EasyOptionComponents & DataViewComponents -- "Read/Update" --> AppState

    WalletConnector -- "Uses" --> WalletService
    HomeComponents & EasyOptionComponents -- "Use" --> ContractService
    DataViewComponents -- "Uses" --> MarketDataService

    WalletService & ContractService -- "Use" --> StacksService
    ContractService -- "Calls" --> OptionFunctions
    OptionFunctions -- "Manages" --> OptionData
    OptionFunctions -- "Interacts with" --> SBTCInterface

    classDef routing fill:#1E90FF,stroke:#333,stroke-width:1px,color:white;
    classDef components fill:#32CD32,stroke:#333,stroke-width:1px,color:white;
    classDef services fill:#FF4500,stroke:#333,stroke-width:1px,color:white;
    classDef contracts fill:#9932CC,stroke:#333,stroke-width:1px,color:white;
    classDef state fill:#FFD700,stroke:#333,stroke-width:1px;

    class Router routing;
    class NavHeader,WalletConnector,NotificationSystem,SharedUI,LandingComponents,HomeComponents,EasyOptionComponents,DataViewComponents,PnLVisualizer,MarketCharts,OptionsChain,HeatMap components;
    class StacksService,MarketDataService,ContractService,WalletService services;
    class OptionFunctions,OptionData,SBTCInterface contracts;
    class AppState,WalletState,ContractState,MarketDataState state;
```

**Description**:

The Component Diagram provides a detailed view of the internal structure of BitHedge's frontend application. It shows how different components interact across the system:

- **Routing**: Manages navigation between different views
- **Core Components**: Shared across all views (navigation, wallet connection, notifications)
- **View-Specific Components**: Specialized for each view's functionality
- **Data Visualization**: Components for visualizing option data and market trends
- **State Management**: Manages application, wallet, contract, and market data states
- **Data Services**: Backend services for interacting with the blockchain and external APIs
- **Smart Contracts**: The structure and functions of the Clarity smart contracts

## 4. Infrastructure Diagram

```mermaid
graph TB
    User["User Browser"]

    subgraph "Cloud Hosting (AWS/Netlify/Vercel)"
        StaticHosting["Static Site Hosting"]
        CDN["Content Delivery Network"]
    end

    subgraph "Stacks Infrastructure"
        StacksAPI["Stacks API Node"]
        StacksBlockchain["Stacks Blockchain"]
    end

    subgraph "Blockchain Networks"
        BitcoinNetwork["Bitcoin Network"]
    end

    subgraph "Development Infrastructure"
        CICDPipeline["CI/CD Pipeline<br/>(GitHub Actions)"]
        DevEnvironment["Development Environment<br/>(Local Clarinet)"]
        TestEnvironment["Test Environment<br/>(Stacks Testnet)"]
    end

    User -- "HTTPS" --> CDN
    CDN -- "Serves static assets" --> StaticHosting
    StaticHosting -- "API Calls" --> StacksAPI
    User -- "Wallet Connections" --> StacksAPI
    StacksAPI -- "Reads/Writes" --> StacksBlockchain
    StacksBlockchain -- "Anchors to" --> BitcoinNetwork

    CICDPipeline -- "Deploys to" --> StaticHosting
    CICDPipeline -- "Deploys contracts to" --> TestEnvironment
    DevEnvironment -- "Simulates" --> StacksBlockchain
    TestEnvironment -- "Mirrors" --> StacksBlockchain

    classDef user fill:#F5F5F5,stroke:#333,stroke-width:1px;
    classDef cloud fill:#1E90FF,stroke:#333,stroke-width:1px,color:white;
    classDef stacks fill:#32CD32,stroke:#333,stroke-width:1px,color:white;
    classDef bitcoin fill:#FF4500,stroke:#333,stroke-width:1px,color:white;
    classDef devops fill:#9932CC,stroke:#333,stroke-width:1px,color:white;

    class User user;
    class StaticHosting,CDN cloud;
    class StacksAPI,StacksBlockchain stacks;
    class BitcoinNetwork bitcoin;
    class CICDPipeline,DevEnvironment,TestEnvironment devops;
```

**Description**:

The Infrastructure Diagram illustrates the hosting and deployment architecture of BitHedge:

- **Cloud Hosting**: Static site hosting with CDN for the frontend application
- **Stacks Infrastructure**: Stacks API nodes and blockchain for smart contract execution
- **Blockchain Networks**: Bitcoin network for anchoring and security
- **Development Infrastructure**: CI/CD pipeline, local development environment with Clarinet, and Stacks Testnet for testing

This infrastructure supports both development and production environments, ensuring reliable and scalable service delivery.

## 5. Data Flow Diagram

```mermaid
graph TB
    User["User"]

    subgraph "Frontend"
        UI["User Interface"]
        StateManager["State Manager"]
    end

    subgraph "APIs"
        StacksAPI["Stacks API"]
        PriceAPI["Price Feed API"]
    end

    subgraph "Blockchain"
        OptionContract["Options Contract"]
        SBTCContract["sBTC Contract"]
        STXToken["STX Token"]
    end

    HiroWallet["Hiro Wallet"]

    %% User Flows
    User -- "1. Interacts with" --> UI
    UI -- "2. Updates" --> StateManager
    StateManager -- "3. Queries" --> StacksAPI & PriceAPI

    %% Wallet Connection Flow
    User -- "4. Authorizes" --> HiroWallet
    HiroWallet -- "5. Provides credentials" --> StateManager

    %% Contract Interaction Flows
    StateManager -- "6a. Reads option details" --> StacksAPI
    StacksAPI -- "6b. Queries" --> OptionContract

    %% Transaction Flows
    StateManager -- "7a. Initiates transaction" --> HiroWallet
    HiroWallet -- "7b. Signs transaction" --> StacksAPI
    StacksAPI -- "7c. Submits to" --> OptionContract

    %% Contract Internal Flows
    OptionContract -- "8a. Transfer STX (premium/strike)" --> STXToken
    OptionContract -- "8b. Transfer sBTC" --> SBTCContract

    %% Response Flows
    OptionContract -- "9a. Returns tx status" --> StacksAPI
    StacksAPI -- "9b. Returns tx results" --> StateManager
    StateManager -- "10. Updates UI" --> UI
    UI -- "11. Displays confirmation" --> User

    classDef user fill:#F5F5F5,stroke:#333,stroke-width:1px;
    classDef frontend fill:#1E90FF,stroke:#333,stroke-width:1px,color:white;
    classDef api fill:#32CD32,stroke:#333,stroke-width:1px,color:white;
    classDef wallet fill:#FF4500,stroke:#333,stroke-width:1px,color:white;
    classDef contract fill:#9932CC,stroke:#333,stroke-width:1px,color:white;

    class User user;
    class UI,StateManager frontend;
    class StacksAPI,PriceAPI api;
    class HiroWallet wallet;
    class OptionContract,SBTCContract,STXToken contract;
```

**Description**:

The Data Flow Diagram illustrates how data moves through the BitHedge system:

1. Users interact with the UI, which updates the state manager
2. The state manager queries the Stacks API and Price Feed API
3. Users authorize actions through Hiro Wallet
4. The wallet provides credentials to the state manager
5. The state manager reads option details from the Stacks API, which queries the Options Contract
6. For transactions, the state manager initiates them through the wallet
7. The wallet signs transactions and submits them to the Stacks API
8. The Options Contract manages STX and sBTC transfers
9. Transaction results flow back to the user through the API, state manager, and UI

This flow ensures secure and transparent handling of all user interactions and blockchain transactions.

## 6. Network Architecture Diagram

```mermaid
graph TB
    User["User Browser"]

    subgraph "Frontend Network"
        HTTPS["HTTPS (Port 443)"]
        CDN["CDN Edge Locations"]
        StaticHosting["Static Hosting"]
    end

    subgraph "Stacks Network"
        StacksAPIGateway["Stacks API Gateway"]
        StacksNode["Stacks Node"]
        MinerNetwork["Stacks Miners"]
    end

    subgraph "Bitcoin Network"
        BTCNode["Bitcoin Core Node"]
        BTCMiners["Bitcoin Miners"]
    end

    subgraph "External Services"
        PriceOracle["Price Oracle API"]
        Faucet["Testnet Faucet"]
    end

    User -- "HTTPS" --> HTTPS
    HTTPS -- "Routes to" --> CDN
    CDN -- "Serves assets from" --> StaticHosting

    User -- "API Calls (HTTPS)" --> StacksAPIGateway
    StacksAPIGateway -- "RPC (Port 20443)" --> StacksNode
    StacksNode -- "P2P (Port 20444)" --> MinerNetwork
    MinerNetwork -- "Anchors to" --> BTCNode
    BTCNode -- "P2P (Port 8333)" --> BTCMiners

    User -- "Fetches prices (HTTPS)" --> PriceOracle
    User -- "Requests test tokens (HTTPS)" --> Faucet
    Faucet -- "Sends test tokens" --> StacksNode

    classDef user fill:#F5F5F5,stroke:#333,stroke-width:1px;
    classDef https fill:#1E90FF,stroke:#333,stroke-width:1px,color:white;
    classDef stacks fill:#32CD32,stroke:#333,stroke-width:1px,color:white;
    classDef bitcoin fill:#FF4500,stroke:#333,stroke-width:1px,color:white;
    classDef external fill:#9932CC,stroke:#333,stroke-width:1px,color:white;

    class User user;
    class HTTPS,CDN,StaticHosting https;
    class StacksAPIGateway,StacksNode,MinerNetwork stacks;
    class BTCNode,BTCMiners bitcoin;
    class PriceOracle,Faucet external;
```

**Description**:

The Network Architecture Diagram shows how the different networks in the BitHedge ecosystem communicate:

- **Frontend Network**: HTTPS connections to CDN and static hosting
- **Stacks Network**: API Gateway, Nodes, and Miners with specific port configurations
- **Bitcoin Network**: Core nodes and miners that provide the security foundation
- **External Services**: Price oracles and testnet faucets for development and testing

This diagram highlights the network protocols, ports, and security measures implemented across the system.

## 7. Security Architecture Diagram

```mermaid
graph TB
    User["User"]

    subgraph "Frontend Security"
        HTTPS["HTTPS/TLS"]
        CSP["Content Security Policy"]
        CORS["CORS Policy"]
        SRI["Subresource Integrity"]
    end

    subgraph "Authentication & Authorization"
        WalletAuth["Wallet-Based Authentication"]
        PrivateKeys["Private Keys (User-Controlled)"]
        Signatures["Transaction Signatures"]
    end

    subgraph "Smart Contract Security"
        TypeChecking["Clarity Type Checking"]
        PostConditions["Post-Conditions"]
        NoReentrancy["No Reentrancy Risk"]
        ReadOnlyFunctions["Read-Only Functions"]
    end

    subgraph "Blockchain Security"
        POX["Proof of Transfer (PoX)"]
        BTCAnchoring["Bitcoin Anchoring"]
        BTCFinality["Bitcoin Finality"]
    end

    subgraph "Data Security"
        ClientSideEncryption["Client-Side Encryption"]
        NoServerStorage["No Server-Side Storage"]
        TransitEncryption["Data-in-Transit Encryption"]
    end

    User -- "Secure connection" --> HTTPS
    HTTPS -- "Protects" --> CSP & CORS & SRI

    User -- "Controls" --> PrivateKeys
    PrivateKeys -- "Used for" --> WalletAuth & Signatures
    WalletAuth -- "Verifies identity via" --> Signatures

    Signatures -- "Verified by" --> TypeChecking
    TypeChecking -- "Enforces" --> PostConditions & NoReentrancy & ReadOnlyFunctions

    TypeChecking -- "Protected by" --> POX
    POX -- "Enables" --> BTCAnchoring
    BTCAnchoring -- "Provides" --> BTCFinality

    User -- "Data protected by" --> ClientSideEncryption & NoServerStorage & TransitEncryption

    classDef user fill:#F5F5F5,stroke:#333,stroke-width:1px;
    classDef frontend fill:#1E90FF,stroke:#333,stroke-width:1px,color:white;
    classDef auth fill:#32CD32,stroke:#333,stroke-width:1px,color:white;
    classDef contract fill:#FF4500,stroke:#333,stroke-width:1px,color:white;
    classDef blockchain fill:#9932CC,stroke:#333,stroke-width:1px,color:white;
    classDef data fill:#FFD700,stroke:#333,stroke-width:1px;

    class User user;
    class HTTPS,CSP,CORS,SRI frontend;
    class WalletAuth,PrivateKeys,Signatures auth;
    class TypeChecking,PostConditions,NoReentrancy,ReadOnlyFunctions contract;
    class POX,BTCAnchoring,BTCFinality blockchain;
    class ClientSideEncryption,NoServerStorage,TransitEncryption data;
```

**Description**:

The Security Architecture Diagram illustrates the security measures implemented across the BitHedge platform:

- **Frontend Security**: HTTPS/TLS, Content Security Policy, CORS, and Subresource Integrity
- **Authentication & Authorization**: Wallet-based authentication with user-controlled private keys and transaction signatures
- **Smart Contract Security**: Clarity type checking, post-conditions, no reentrancy risk, and read-only functions
- **Blockchain Security**: Proof of Transfer (PoX), Bitcoin anchoring, and Bitcoin finality
- **Data Security**: Client-side encryption, no server-side storage, and data-in-transit encryption

This multilayered approach ensures the security and integrity of the BitHedge platform at all levels.

## 8. Integration Architecture Diagram

```mermaid
graph TB
    BitHedge["BitHedge Application"]

    subgraph "Wallet Integrations"
        HiroWallet["Hiro Wallet"]
        XverseWallet["Xverse Wallet (Future)"]
        WalletConnect["WalletConnect (Future)"]
    end

    subgraph "Blockchain Integrations"
        StacksJS["Stacks.js"]
        StacksAPI["Stacks API"]
        MicroblockAPI["Microblock API"]
    end

    subgraph "Data Integrations"
        CoinbaseAPI["Coinbase Price API"]
        BinanceAPI["Binance Price API"]
        CoinGeckoAPI["CoinGecko API"]
    end

    subgraph "External Services"
        Nakamoto["Nakamoto Release (Future)"]
        SIP["SIP-X Integration (Future)"]
        Explorer["Stacks Explorer"]
    end

    BitHedge -- "Auth & Tx via" --> HiroWallet
    BitHedge -- "Future wallet support" -.-> XverseWallet & WalletConnect

    BitHedge -- "Core blockchain API" --> StacksJS
    StacksJS -- "Uses" --> StacksAPI
    StacksJS -- "Fast confirmations via" --> MicroblockAPI

    BitHedge -- "Primary price data" --> CoinbaseAPI
    BitHedge -- "Secondary price data" -.-> BinanceAPI
    BitHedge -- "Market cap & trending data" -.-> CoinGeckoAPI

    BitHedge -- "Future upgrade path" -.-> Nakamoto
    BitHedge -- "Future protocol improvements" -.-> SIP
    BitHedge -- "Transaction verification via" --> Explorer

    classDef core fill:#1E90FF,stroke:#333,stroke-width:1px,color:white;
    classDef wallet fill:#32CD32,stroke:#333,stroke-width:1px,color:white;
    classDef blockchain fill:#FF4500,stroke:#333,stroke-width:1px,color:white;
    classDef price fill:#9932CC,stroke:#333,stroke-width:1px,color:white;
    classDef future fill:#FFD700,stroke:#333,stroke-width:1px;

    class BitHedge core;
    class HiroWallet,XverseWallet,WalletConnect wallet;
    class StacksJS,StacksAPI,MicroblockAPI blockchain;
    class CoinbaseAPI,BinanceAPI,CoinGeckoAPI price;
    class Nakamoto,SIP,Explorer future;
```

**Description**:

The Integration Architecture Diagram shows how BitHedge integrates with external systems and services:

- **Wallet Integrations**: Current support for Hiro Wallet with planned future integrations for Xverse Wallet and WalletConnect
- **Blockchain Integrations**: Core integration with Stacks.js, Stacks API, and Microblock API
- **Data Integrations**: Price data from Coinbase, Binance, and CoinGecko
- **External Services**: Future integrations with Nakamoto Release, SIP improvements, and current integration with Stacks Explorer for transaction verification

This diagram highlights both current integrations and future expansion paths for the BitHedge platform.

## Conclusion

These architecture diagrams provide a comprehensive view of the BitHedge platform across different levels of abstraction and from various perspectives. From the high-level system context to detailed component interactions, these diagrams illustrate how BitHedge leverages sBTC and the Stacks blockchain to create a secure, user-friendly options trading platform with a focus on Bitcoin hedging.

The architecture is designed to be modular and extensible, allowing for future enhancements while maintaining a solid foundation. The multi-view frontend approach with progressive disclosure of complexity ensures that both beginners and advanced users can effectively use the platform according to their needs and experience levels.

As the platform evolves, these diagrams will serve as a reference for understanding the system architecture and guide future development efforts.
