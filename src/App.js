import React, { useState } from "react";
import Header from "./Components/Header";
import CoinFlip from "./Components/CoinFlip";
import Result from "./Components/Result";

function App() {
  const [result, setResult] = useState(null);
  const [amount, setAmount] = useState("0");
  const [side, setSide] = useState(true); // true for heads, false for tails
  const contractAddress = "0xd5DA891E310F8395C1497A22e7B728943F6D6F5F";

  return (
    <div className="App">
      <Header />
      <CoinFlip
        contractAddress={contractAddress}
        setResult={setResult}
        setAmount={setAmount}
        setSide={setSide}
      />
      <Result result={result} amount={amount} side={side} />
    </div>
  );
}

export default App;
