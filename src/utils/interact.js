const ethers = require("ethers");

const getABI = async () => {
  const response = await fetch('./CoinFlip.json');
  if (!response.ok) {
    throw new Error('Failed to load ABI');
  }
  const data = await response.json();
  return data; // Access the 'abi' property
};

export const flipCoin = async (signer, contractAddress, side, amount) => {
  try {
    const ABI = await getABI(); // Fetch the ABI
    console.log(ABI, "inside function");
    const contract = new ethers.Contract(contractAddress, ABI.abi, signer);
    const tx = await contract.flipCoin(side, ethers.utils.parseEther(amount));
    await tx.wait();
    return tx;
  } catch (error) {
    console.error('Error flipping coin:', error);
    throw error;
  }
};

export const formatEtherValue = (weiValue) => {
  return ethers.utils.formatEther(weiValue);
};

export const parseEtherValue = (etherValue) => {
  return ethers.utils.parseEther(etherValue);
};
