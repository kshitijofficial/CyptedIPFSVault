
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { useWeb3Context } from "../contexts/web3Provider/useContext";
import { connectWallet } from "../utils/connectWallet";
const Wallet = () => {
   // const {walletConnect,web3State}=useWeb3Context()
   const { updateWeb3State,web3State } = useWeb3Context();
    const {selectedAccount}=web3State;
    const navigateTo = useNavigate()
    useEffect(() => {
      if (selectedAccount) {
          navigateTo(`/home`);
      }
  }, [selectedAccount,navigateTo]);

  const walletConnect = async () => {
      try {
          const { selectedAccount, signer, contractInstance } = await connectWallet();
          updateWeb3State({ selectedAccount, signer, contractInstance });
      } catch (error) {
          console.error("Error connecting wallet:", error);
      }
  };
    return ( 
    <div>
      <button onClick={walletConnect}>
         Connect Wallet
      </button>
    </div> );
}
 
export default Wallet;