import { useAtom } from "jotai";
import { addressAtom, signerAtom, walletAtom } from "../../atom";
import { useState } from "react";
import { ethers } from "ethers";
import Complaint from "../../blockchain/Complaint.json";

const About = () => {
  const [address, setAddress] = useAtom(addressAtom);
  const [signer, setSigner] = useAtom(signerAtom);
  const [isWalletConnected, setIsWalletConnected] = useAtom(walletAtom);

  const [complaints, setComplaints] = useState("");
  const [complaintId, setComplaintId] = useState("");

  const RPC = "https://sepolia.infura.io/v3/8aa2c217a4ef48c6b5cec09847df853b";
  const contractAddress = "0x66D9e1e0A142b32279a15792B776c4a870987d11";
  const contractABI = Complaint.abi;

  const provider = new ethers.providers.JsonRpcProvider(RPC);

  const addComplaint = async () => {
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const transactionData = await contract.populateTransaction.submitComplaint(
      "Complaint3",
      "hehedasdasfaheh",
      "bhandup",
      "52436475868978"
    );
    const gasLimit = 200000;

    const transactionParameters = {
      to: contractAddress,
      gasLimit: ethers.utils.hexlify(gasLimit),
      data: transactionData.data,
    };

    const signedTransaction = await signer.sendTransaction(
      transactionParameters
    );
  };

  return (
    <div>
      <div className="">
        <button onClick={addComplaint}>Click</button>
      </div>
    </div>
  );
};

export default About;
