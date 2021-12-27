import React, { useEffect, useState } from "react";
import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import {ethers} from "ethers";
import myEpicNft from './utils/MyEpicNFT.json';
import myGHnft from './utils/MyGHNFT.json';

const TWITTER_HANDLE = 'fuller_eth';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = '';
const TOTAL_MINT_COUNT = 50;
const CONTRACT_ADDRESS = "0x7CfadE52F063C51EC50D634C3C20EC65d27de5cd";
const CONTRACT_ADDRESSgh = "0x4ad899171AAbE989eA249355b5FD2de0EB0c3dC8";
const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  
  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account)
      setupghEventListener()
    } else {
      console.log("No authorized account found")
    }
  }
    // Implement your connectWallet method here
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]); 
      setupghEventListener()
    } catch (error) {
      console.log(error)
    }
  }
//Event Listener Initialization
  const setupEventListener = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer);
        connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
          console.log(from, tokenId.toNumber())
          alert(`Your NFT is minted and sent to your wallet. Here's the link on opensea.  https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`)
        });
        console.log("Setup event listener!")
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const askContractToMintNft = async () => {
 

  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer);

      console.log("Going to pop wallet now to pay gas...")
      let nftTxn = await connectedContract.makeAnEpicNFT();

      console.log("Mining...please wait.")
      await nftTxn.wait();
      
      console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);

    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error)
  }
}
  const setupghEventListener = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedghContract = new ethers.Contract(CONTRACT_ADDRESSgh, myGHnft.abi, signer);
        connectedghContract.on("NewGHNFTminted", (from, tokenId) => {
          console.log(from, tokenId.toNumber())
          alert(`Your NFT is minted and sent to your wallet. Here's the link on opensea.  https://testnets.opensea.io/assets/${CONTRACT_ADDRESSgh}/${tokenId.toNumber()}`)
        });
        console.log("Setup event listener!")
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }
const askContractToMintFlag = async () => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedghContract = new ethers.Contract(CONTRACT_ADDRESSgh, myGHnft.abi, signer);

      console.log("Going to pop wallet now to pay gas...")
      let nftTxn = await connectedghContract.forgeGHNFT();

      console.log("Mining...please wait.")
      await nftTxn.wait();
      
      console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);

    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error)
  }
}
useEffect(() => {
    checkIfWalletIsConnected();
  }, [])


  // Render Methods
  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  )
   const renderMintUI = () => (
    <button onClick={askContractToMintNft} className="cta-button connect-wallet-button">
      Mint NFT
    </button>
  )
  const renderFlagUI = () => (
    <button onClick={askContractToMintFlag} className="cta-button connect-wallet-button">
      Mint Flag
    </button>
  )



  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">A Fuller NFT Collection</p>
          <p className="sub-text">
            In Development
            </p>

          {currentAccount === "" ? 
            renderNotConnectedContainer() : renderMintUI()  }          </div>
          br
          
        <div>
         {
            renderFlagUI() 
          }
        </div>
        <div className="footer-container">
        
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />

          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{` @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
/* These dynamic NFTs can leverage the fail-safe engineering of various blockchains, utilizing hard coded SVGs, it operates parallel to the well grounded mainnet of Ethereum and also testnets.*/