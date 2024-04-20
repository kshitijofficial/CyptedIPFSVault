import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useWeb3Context } from "../contexts/web3Provider/useContext";
import { connectWallet } from "../utils/connectWallet";
import { toast } from "react-hot-toast";

const Wallet = () => {
  // const {walletConnect,web3State}=useWeb3Context()
  const { updateWeb3State, web3State } = useWeb3Context();
  const { selectedAccount } = web3State;
  const navigateTo = useNavigate();
  useEffect(() => {
    if (selectedAccount) {
      navigateTo(`/home`);
    }
  }, [selectedAccount, navigateTo]);

  const walletConnect = async () => {
    try {
      const { selectedAccount, signer, contractInstance } =
        await connectWallet();
      updateWeb3State({ selectedAccount, signer, contractInstance });
    } catch (error) {
      toast.error("Connection rejected");
      console.error("Error connecting wallet:", error);
    }
  };
  return (
    // grid background with ridial skyblue blur in center
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)] flex flex-col justify-center items-center gap-20">
        <h1 className="font-bold text-[42px] gradient-text md:text-[60px]">
          Crypto Vault
        </h1>
        <button
          className="relative px-12 py-4 text-white bg-sky-400 rounded-md hover:bg-sky-800 font-semibold"
          onClick={walletConnect}
        >
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default Wallet;
