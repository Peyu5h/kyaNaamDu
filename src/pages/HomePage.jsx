import { useAtom } from "jotai";
import Navbar from "../components/Navbar";
import { addressAtom, signerAtom, walletAtom } from "../../atom";
import Complaint from "../../blockchain/Complaint.json";
import { ethers } from "ethers";
import { useState } from "react";

const HomePage = () => {
  const [address, setAddress] = useAtom(addressAtom);
  const [signer, setSigner] = useAtom(signerAtom);
  const [isWalletConnected, setIsWalletConnected] = useAtom(walletAtom);

  const [complaints, setComplaints] = useState("");
  const [complaintId, setComplaintId] = useState("");

  const RPC = "https://sepolia.infura.io/v3/8aa2c217a4ef48c6b5cec09847df853b";
  const contractAddress = "0x66D9e1e0A142b32279a15792B776c4a870987d11";
  const contractABI = Complaint.abi;

  const provider = new ethers.providers.JsonRpcProvider(RPC);

  const fetchComplaints = async () => {
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    const complaints = await contract.complaints(complaintId);
    setComplaints(complaints);
  };

  return (
    <div>
      <div className="main text-black   ">
        <input
          type="text"
          placeholder="Enter complaint id"
          onChange={(e) => setComplaintId(e.target.value)}
        />
        <button
          className="bg-teal-500 px-2 py-1 ml-1 rounded-sm"
          onClick={fetchComplaints}
        >
          Show
        </button>
      </div>
      {complaints.title == "" ? (
        <h1>Enter a valid complaint id</h1>
      ) : (
        <>
          <h1>{complaints.title}</h1>
          <p>{complaints.description}</p>
          <p>{complaints.status}</p>
        </>
      )}
    </div>
  );
};

export default HomePage;
