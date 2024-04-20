import { useWeb3Context } from "../../contexts/web3Provider/useContext";

const ConnectedAccount = () => {
  const { web3State } = useWeb3Context();
  const { selectedAccount } = web3State;
  return (
    <div className="w-full flex flex-col justify-center items-center md:flex-row md:justify-between md:px-10">
      <span className="font-semibold">Connected Account : </span>
      <p className="text-[14px] overflow-hidden whitespace-nowrap max-w-[200px] overflow-ellipsis md:max-w-full">
        {selectedAccount}
      </p>
    </div>
  );
};

export default ConnectedAccount;
