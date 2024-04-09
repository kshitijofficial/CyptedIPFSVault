import { useContext } from "react";
import { Web3Context } from "./createContext";
export const useWeb3Context = ()=>{
    return useContext(Web3Context)
}