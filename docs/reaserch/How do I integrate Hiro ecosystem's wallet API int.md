<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" class="logo" width="120"/>

# How do I integrate Hiro ecosystem's wallet API into the frontend

To integrate Hiro's wallet API into a frontend application, follow these key steps based on Stacks.js best practices and Hiro ecosystem patterns:

### 1. Install Required Packages

```bash
npm install @stacks/connect @stacks/transactions @stacks/network
```


### 2. Configure Wallet Connection

```tsx
// src/config/auth.ts
import { AppConfig, UserSession } from '@stacks/connect';

export const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSession = new UserSession({ appConfig });
```


### 3. Implement Connect Button Component

```tsx
// src/components/WalletConnect.tsx
import { useConnect } from '@stacks/connect-react';

export const WalletConnect = () =&gt; {
  const { doOpenAuth } = useConnect();
  
  return (
    &lt;button 
      onClick={() =&gt; doOpenAuth({
        appDetails: { name: 'Your DApp', icon: '/logo.png' },
        onFinish: () =&gt; window.location.reload()
      })}
    &gt;
      Connect Hiro Wallet
    &lt;/button&gt;
  );
};
```


### 4. Handle User Session State

```tsx
// src/hooks/useAuth.ts
import { userSession } from '../config/auth';

export const useAuth = () =&gt; {
  const [userData, setUserData] = useState(userSession.loadUserData());

  useEffect(() =&gt; {
    if (userSession.isUserSignedIn() &amp;&amp; !userData) {
      setUserData(userSession.loadUserData());
    }
  }, []);

  return { userData };
};
```


### 5. Transaction Handling Example

```tsx
// src/utils/transactions.ts
import { makeContractCall, broadcastTransaction } from '@stacks/transactions';

export const submitVote = async (contractAddress: string, vote: string) =&gt; {
  const txOptions = {
    contractAddress,
    contractName: 'voting-contract',
    functionName: 'vote',
    functionArgs: [stringUtf8CV(vote)],
    senderAddress: userSession.loadUserData().profile.stxAddress,
    network: 'testnet'
  };

  const transaction = await makeContractCall(txOptions);
  return broadcastTransaction(transaction);
};
```


### Key Integration Points

1. **Network Configuration**
    - Use `network.ts` to handle mainnet/testnet switching
    - Leverage Hiro's API endpoints for blockchain interactions[^5]
2. **Session Persistence**

```tsx
// Auto-reconnect on app load
useEffect(() =&gt; {
  if (userSession.isUserSignedIn() &amp;&amp; !userData) {
    setUserData(userSession.loadUserData());
  }
}, []);
```

3. **Security Practices**
    - Validate STX addresses using regex: `^ST[0-9A-Z]{38}$`[^1]
    - Implement post-conditions for transactions[^1]

### Error Handling Strategy

```tsx
try {
  await submitVote(contractAddress, 'YES');
} catch (error) {
  if (error.message.includes('PostCondition')) {
    showError('Insufficient balance for transaction');
  } else if (error.message.includes('Auth')) {
    triggerWalletReconnect();
  }
}
```


### Recommended Testing Approach

1. **Mock Wallet Interactions**

```tsx
jest.mock('@stacks/connect', () =&gt; ({
  useConnect: () =&gt; ({
    doOpenAuth: jest.fn().mockResolvedValue(true)
  })
}));
```

2. **End-to-End Testing**

```gherkin
Scenario: Successful wallet connection
  Given I visit the application
  When I click "Connect Hiro Wallet"
  And I approve the connection in my wallet
  Then I should see my STX address displayed
```


This implementation follows patterns demonstrated in Hiro's official documentation[^1][^6], Clearness.dev's authentication flow[^2], and GitHub community examples[^3]. For production deployments, consider adding WebSocket listeners for real-time transaction updates as blocks confirm[^3].

<div>⁂</div>

[^1]: https://www.stacks.co/docs/hello-stacks-quickstart

[^2]: https://www.clearness.dev/03-build-the-voting-client/01-setup-web3-application

[^3]: https://github.com/johnkcr/hiro-wallet-connect

[^4]: https://dev.to/stacks/built-on-bitcoin-an-introduction-to-full-stack-web3-development-with-stacks-me9

[^5]: https://www.hiro.so/blog/interact-with-hiro-apis-directly-in-documentation

[^6]: https://www.youtube.com/watch?v=le8oFTgUnLg

[^7]: https://dev.to/mariaverse/developing-a-full-stack-project-on-stacks-with-clarity-smart-contracts-and-stacksjs-part-iii-frontend-heo

[^8]: https://docs.stacks.co/guides-and-tutorials/hello-stacks-quickstart-tutorial

[^9]: https://docs.hiro.so

[^10]: https://docs.hiro.so/stacks/api

[^11]: https://github.com/hirosystems

[^12]: https://www.stacks.co/blog-categories/hiro

[^13]: https://leather.io/developer-docs

[^14]: https://www.linkedin.com/pulse/5-ways-interact-devnet-hiro-platform-hiro-systems-kwayc

[^15]: https://www.quicknode.com/guides/tags/hiro-wallet

[^16]: https://docs.polkadot.com/develop/toolkit/

[^17]: https://hirosystems.github.io/stacks-blockchain-api/

[^18]: https://leather.io

[^19]: https://github.com/hirosystems/platform-template-fundraising-dapp

[^20]: https://github.com/orgs/hirosystems/repositories

[^21]: https://www.youtube.com/watch?v=9s3Z-MvPv2I

[^22]: https://www.hiro.so/blog/how-to-scale-a-blockchain-api

[^23]: https://www.youtube.com/watch?v=nCI4TsZ-V5w

[^24]: https://www.hiro.so/blog/introducing-stacks-js-starters-launch-a-frontend-in-just-a-few-clicks

[^25]: https://www.youtube.com/watch?v=uN_yJHxcBFc

[^26]: https://processwire.com/talk/topic/28828-best-practices-or-guidelines-for-web3-crypto-wallet-connect-functionality-in-processwire-sites/

[^27]: https://www.youtube.com/c/HiroSystems/videos

[^28]: https://www.hiro.so/blog/an-intro-to-web3-wallets-for-web3-founders

[^29]: https://docs.stacks.co/reference/api

[^30]: https://docs.hiro.so/stacks

[^31]: https://codelabs.developers.google.com/add-to-wallet-web

[^32]: https://www.hiro.so/stacks-api

[^33]: https://www.youtube.com/watch?v=oMPCV2yKgiw

