import { ethers } from 'ethers'

import { blockchainConfig } from '@src/env'
import contractABI from '@src/contract/LazyMintNFT.json'

export let provider: ethers.providers.JsonRpcProvider;
export let signer: ethers.Wallet;
export let contract: ethers.Contract;


export const createProviders = (): void => {
  provider = new ethers.providers.JsonRpcProvider(blockchainConfig.networksURI)
  signer = new ethers.Wallet(blockchainConfig.contractAccountPK, provider)
  contract = new ethers.Contract(blockchainConfig.contractAccount, contractABI, signer)
}

export const types = {
  NFTVoucher: [
    { name: "minPrice", type: "uint256" },
    { name: "name", type: "string" },
  ]
}

export const domain = {
  name: blockchainConfig.signingDomainName,
  version: blockchainConfig.signingDomainVersion,
  verifyingContract: blockchainConfig.contractAccount,
  chainId: blockchainConfig.chainId
}

