const { ethers } = require("ethers");

export const connectWallet = async () => {
  try {
    // Check if Ethereum provider is available
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const account = await signer.getAddress();
      return { provider, signer, account };
    } else {
      throw new Error("No Ethereum provider found");
    }
  } catch (error) {
    console.error("Error connecting wallet:", error);
    throw error;
  }
};
