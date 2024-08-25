import React, { useState } from "react";
import { connectWallet } from "../utils/connectWallet";
import { flipCoin } from "../utils/interact";

const CoinFlip = ({ contractAddress, setResult, setAmount, setSide }) => {
  const [connected, setConnected] = useState(false);
  const [side, setSideLocal] = useState(true); // true for heads, false for tails
  const [amount, setAmountLocal] = useState("0.01");
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState(null);

  const connect = async () => {
    try {
      const signer = await connectWallet();
      setAddress(signer.account);
      setSigner(signer);
      setConnected(true);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const handleFlip = async () => {
    if (!signer) return;
    try {
      // Ensure side is passed as a boolean value
      const tx = await flipCoin(signer, contractAddress, side, amount);
      const receipt = await tx.wait();
      const result = receipt.events[0].args.win;
      setResult(result);
      setAmount(amount);
      setSide(side);
    } catch (error) {
      console.error("Error flipping coin:", error);
      setResult(false);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col text-xl">
      <div className="md:flex place-content-around md:w-full md:mr-10 my-5">
        <div>
          Wallet: {address ? address : <p>Please Connect With Wallet</p>}
        </div>
        <button
          className="bg-indigo-600 font-semibold border-2 flex justify-end text-slate-100 text-2xl rounded-lg p-2"
          onClick={connect}
        >
          {connected ? "Wallet Connected" : "Connect Wallet"}
        </button>
      </div>
      <div className="flex flex-col">
        <div>
          <label className="text-2xl mx-3 my-2">
            Amount:
            <input
              className="bg-blue-100 p-2 rounded-md"
              type="text"
              value={amount}
              onChange={(e) => setAmountLocal(e.target.value)}
            />
          </label>
          <label>
            Side:
            <select
              value={side}
              onChange={(e) => setSideLocal(e.target.value === "true")}
            >
              <option value={true}>Heads</option>
              <option value={false}>Tails</option>
            </select>
          </label>
        </div>
        <button
          className="text-2xl font-semibold text-slate-100 py-1 bg-blue-500 rounded-xl border-blue-500 mt-5 flex justify-center"
          onClick={handleFlip}
        >
          Flip Coin
        </button>
      </div>
    </div>
  );
};

export default CoinFlip;
