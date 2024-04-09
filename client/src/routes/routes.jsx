import Wallet from "../pages/Wallet";
import Home from "../pages/Home";
import Navbar from "../components/Navbar/Navbar";
import {createBrowserRouter} from "react-router-dom";

export const routes = createBrowserRouter([
    {
        path:"/",element:<Wallet/>
    },
    {  
       
        path:"/home",element:(
            <div>
              <Navbar/>
              <Home/>
            </div>
        )
      
    }

])