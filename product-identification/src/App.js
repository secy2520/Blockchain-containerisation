import "./App.css";
import React, { useEffect, useState } from "react";
import VendorForm from "./components/VendorForm";
import { ethers } from "ethers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DistributorForm from "./components/DistributorForm";
import Home from "./components/Home";
import AssetTracker from "./utils/AssetTracker.json";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Products from "./components/TrackProducts";
import Distributors from "./components/Distributors";
import SideBar from "./components/SideBar";
import Authenticate from "./components/Authenticate";
import GetStarted from "./components/getStarted";

library.add(fas);

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [wallet, setWallet] = useState("Please Connect Your Wallet to Proceed");
  const [contract, setContract] = useState(null);

  const fetchData = async () => {
    try {
      const CONTRACT = await axios.get(`http://${process.env.REACT_APP_BACKEND_SERVICE_URL}/get_addr`);
      const CONTRACT_ADDRESS = CONTRACT.data;
      console.log(CONTRACT_ADDRESS);
      return CONTRACT_ADDRESS;
    } catch (error) {
      console.error("Error fetching contract address:", error);
      return null;
    }
  };

  useEffect(() => {
    const initializeApp = async () => {
      const contractAddress = await fetchData();
      if (contractAddress) {
        const { ethereum } = window;

        if (!ethereum) {
          console.log("Make sure you have MetaMask!");
          return;
        }

        const accounts = await ethereum.request({ method: "eth_accounts" });

        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
          setWallet("Connected");
          setCurrentAccount(account);

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            AssetTracker.abi,
            signer
          );
          console.log("Contract initialized:", contract);
          setContract(contract);
        } else {
          console.log("No authorized account found");
        }
      }
    };
    initializeApp();
  }, []);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);

      setWallet("Connected");

      setCurrentAccount(accounts[0]);
      const provider = new ethers.providers.Web3Provider(ethereum);
      console.log(provider);

      const signer = provider.getSigner();
      console.log(signer);
      console.log(contract.address);

      // Ensure contract is initialized before accessing its address
      if (contract) {
        const contractWithSigner = contract.connect(signer);
        console.log("Contract with signer:", contractWithSigner);
      } else {
        console.log("Contract not initialized yet.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {contract ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home account={currentAccount} />}></Route>
            {/* <Route
              path="/vendor"
              element={<SideBar contract={contract} account={currentAccount} />}
            ></Route> */}
            <Route
              path="/vendor"
              element={<GetStarted contract={contract} account={currentAccount} />}
            >
              <Route
                path="products"
                element={<Products contract={contract} account={currentAccount} />}
              ></Route>
              <Route
                path="addproduct"
                element={<VendorForm contract={contract} account={currentAccount} />}
              />
              <Route
                path="available-distributors"
                element={<Distributors contract={contract} account={currentAccount} />}
              />
            </Route>
            <Route
              path="/distributorform"
              element={<DistributorForm contract={contract} account={currentAccount} />}
            ></Route>
            {/* <Route
              path="/vendor/products"
              element={<Products contract={contract} account={currentAccount} />}
            ></Route>
            <Route
              path="/vendor/addproduct"
              element={<VendorForm contract={contract} account={currentAccount} />}
            />
            <Route
              path="/vendor/available-distributors"
              element={<Distributors contract={contract} account={currentAccount} />}
            /> */}
            <Route
              path="/authenticate"
              element={<Authenticate contract={contract} account={currentAccount} />}
            />
          </Routes>
        </BrowserRouter>
      ) : (
        <div>
          <div>
            <div className="connectWalletContainer">
              {wallet === "Please Connect Your Wallet to Proceed" && (
                <button onClick={connectWallet} className="connectWalletBtn">
                  <img
                    src={"https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png"}
                    className="img"
                    alt="Metamask Logo"
                  />{" "}
                  {wallet}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
