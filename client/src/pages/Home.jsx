import { useEffect,useState } from "react";
import GetImage from "../components/Home/GetImage";
import UploadImage from "../components/Home/UploadImage";
import { useWeb3Context } from "../contexts/web3Provider/useContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { web3State } = useWeb3Context();
    const { selectedAccount } = web3State;
    const navigateTo = useNavigate();
    const [reload,setReload]=useState(false)

    const reloadEffect = ()=>{
        setReload(!reload)
    }
    useEffect(() => {
        if (!selectedAccount) {
            navigateTo("/");
        }
    }, [selectedAccount, navigateTo]);
    
    return selectedAccount ? (
        <div>
            <UploadImage reloadEffect={reloadEffect}/>
            <GetImage reload={reload}/>
        </div>
    ) : null;
}

export default Home;
