import { ethers } from 'ethers';

export const checkAndConnectMetamask = async () => {
    if (typeof window.ethereum === "undefined") {
        throw new Error("Unable to detect metamask");
    }
    if (!window.ethereum.selectedAddress) {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" })
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export const createProvider = () => new ethers.providers.Web3Provider(window.ethereum)

export const domain = {
    name: process.env.REACT_APP_SIGNING_DOMAIN_NAME,
    version: process.env.REACT_APP_SIGNING_DOMAIN_VERSION,
    verifyingContract: process.env.REACT_APP_VERIFYING_CONTRACT_ADDRESS,
    chainId: process.env.REACT_APP_VERIFYING_CONTRACT_CHAIN_ID
}

export const types = {
    NFTVoucher: [
        { name: "minPrice", type: "uint256" },
        { name: "name", type: "string" },
    ]
}