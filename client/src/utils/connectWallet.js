import {ethers} from "ethers"
import axios from "axios"
import contractAbi from "../constants/abi.json"
export const connectWallet = async()=>{
    try{
      if(!window.ethereum){
        throw new Error("Install Metamask")
      }
      const accounts = await window.ethereum.request({
        method:'eth_requestAccounts'
      })
      const selectedAccount = accounts[0]
      const provider = new ethers.BrowserProvider(window.ethereum) ;
      const signer = await provider.getSigner()

      const message = "Authentication message";
      const signature = await signer.signMessage(message);
      const dataSignature = {
           signature
       }
      const url = `http://localhost:3000/api/authenticate?accountAddress=${selectedAccount}`;
      const response = await axios.post(url, dataSignature,{
        responseType:'json'
      });
 
      if(response.data.message!=="Authentication Successfull!"){
        console.log(response.data.message)
        throw new Error(response.data.message)
      }
      localStorage.setItem('token',response.data.token)
      const contractAddress ="0xe4181460F7D83d49e4517b2Fcf3a05823a4E6683";
      const contractInstance = new ethers.Contract(contractAddress,contractAbi,signer)
      console.log("Authentication successful")
      return {selectedAccount,signer,contractInstance}
    }catch(error){
        console.error(error)
}
}