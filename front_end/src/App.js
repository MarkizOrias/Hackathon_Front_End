import { DAppProvider, Goerli, Mainnet } from "@usedapp/core";
import { getDefaultProvider } from 'ethers'
import "./App.css";

import Wallet from './components/Wallet';
import UserForm from './components/UserForm';

function App() {

  const config = {
    networks: [Goerli],
    readOnlyChainId: Goerli.chainId,
    readOnlyUrls: {
      [Mainnet.chainId]: getDefaultProvider('mainnet'),
      [Goerli.chainId]: `https://goerli.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`
    },
    notifications: {
      expirationPeriod: 1000, //milliseconds
      checkInterval: 1000, // milliseconds
    }
  }

  return (

    <DAppProvider config={config}>
      <div className="App">
        <header>
          <div class="App-header App-wallet">
            <Wallet />
          </div>
        </header>
        <body className="App-body">
          <UserForm />
        </body>
      </div>
    </DAppProvider>
  );
}

export default App;
