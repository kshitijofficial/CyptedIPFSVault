import { useState } from "react";
import { Web3Context } from "./createContext";
// import { connectWallet } from "../../utils/connectWallet";

const Web3Provider = ({ children }) => {
    const [web3State, setWeb3State] = useState({
        signer: null,
        contractInstance: null,
        selectedAccount: null,
    });
    const updateWeb3State = (newState) => {
      setWeb3State(prevState => ({
          ...prevState,
          ...newState
      }));
     };

   //  const walletConnect = async () => {
   //      try {
   //          const { selectedAccount, signer, contractInstance } = await connectWallet();
   //          setWeb3State(prevState => ({
   //              ...prevState,
   //              selectedAccount,
   //              signer,
   //              contractInstance
   //          }));
   //      } catch (error) {
   //          console.error("Error connecting wallet:", error);
   //      }
   //  };

    return (
      //   <Web3Context.Provider value={{ walletConnect, web3State }}>
      //       {children}
      //   </Web3Context.Provider>
      <Web3Context.Provider value={{ web3State, updateWeb3State }}>
          {children}
      </Web3Context.Provider>
    );
};

export default Web3Provider;
