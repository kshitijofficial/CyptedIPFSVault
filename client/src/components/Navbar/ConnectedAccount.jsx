import { useWeb3Context } from "../../contexts/web3Provider/useContext";

const ConnectedAccount = () => {
    const {web3State}=useWeb3Context()
    const {selectedAccount}=web3State;
    return ( 
    <div>
       <p>Connected Account: {selectedAccount}</p>
    </div> );
}
 
export default ConnectedAccount;