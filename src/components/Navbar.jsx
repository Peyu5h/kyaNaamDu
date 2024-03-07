import { Link } from "react-router-dom";
import HoverUp from "../animations/HoverUp";
import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { ethers } from "ethers";
import { addressAtom, signerAtom, walletAtom } from "../../atom";
import { useAtom } from "jotai";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const [address, setAddress] = useAtom(addressAtom);
  const [signer, setSigner] = useAtom(signerAtom);
  const [isWalletConnected, setIsWalletConnected] = useAtom(walletAtom);

  const metamaskConnect = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setAddress(accounts[0]);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const connectedSigner = provider.getSigner();
        setSigner(connectedSigner);

        setIsWalletConnected(true);
      } else {
        alert("Please install MetaMask!");
      }
    } catch (err) {
      console.error(err);
      setIsWalletConnected(false);
    }
  };

  return (
    <>
      <div className="btn z-50 absolute right-6 top-9" style={{ zIndex: 9 }}>
        <button
          onClick={() => setToggleMenu(!toggleMenu)}
          className={`block hamburger sm:hidden focus:outline-none ${
            toggleMenu ? "open" : ""
          }`}
          type="button"
        >
          <span className="hamburger-top"></span>
          <span className="hamburger-middle"></span>
          <span className="hamburger-bottom"></span>
        </button>
      </div>

      {/* ==================  navitems ================== */}

      <div
        className={`menuSlider fixed inset-0 bg-zinc-900 transition-transform duration-300  ${
          toggleMenu ? "translate-x-0" : "translate-x-full"
        } `}
        style={{ zIndex: 2 }}
      >
        <div className="flex flex-col gap-y-5 text-start items-center font-int uppercase  justify-center h-full">
          <Link to="/adduser">
            <h1 className="flex gap-x-3 text-3xl  font-int font-medium">
              INSERT USER
              <IoAddOutline className="text-4xl my-auto" />
            </h1>
          </Link>
          <Link to="/deleteUser">
            <h1 className="flex gap-x-4 text-3xl font-int font-medium">
              Delete USER
              <FaTrash className="text-2xl my-auto" />
            </h1>
          </Link>

          <h1 className="flex  gap-x-4 text-3xl font-int font-medium cursor-pointer">
            EXPORT CSV
            <FiDownload />
          </h1>
        </div>
      </div>

      <div className="flex nav-container p-8  justify-between">
        <div className="logo-container">
          <h1 className="text-xl uppercase font-bold">CryptoVerse</h1>
        </div>
        <div className="hidden sm:flex items-container  gap-x-4 mt-1">
          <HoverUp text={"Read"} size={"sm"} link={"/"} />
          <HoverUp text={"Write"} size={"sm"} link={"about"} />
          <HoverUp text={"heheh"} size={"sm"} link={"hehehe"} />
        </div>
        <div className="hidden sm:flex btn-container">
          <h1
            onClick={metamaskConnect}
            className="text-md mt-1 bg-transparent border-2 border-teal-400 py-1 rounded-md hover:bg-teal-400 cursor-pointer duration-200 px-3 uppercase font-medium"
          >
            {isWalletConnected ? address : "Connect"}
          </h1>
        </div>
      </div>
    </>
  );
};

export default Navbar;
