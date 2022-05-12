import { defineStore } from 'pinia'
import { ethers } from 'ethers'
import { contractABIAuction, contractAddressAuction } from '../utils/constant.js'

export const useContracts = defineStore('smartContractStore', () => {
    const getEthereumContract = async() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", [])
        const signer = provider.getSigner();
        const auctionContract = new ethers.Contract(contractAddressAuction, contractABIAuction, signer.value)

        console.log({ provider, signer, auctionContract });

        return { provider, signer, auctionContract }
    }

    return {
        getEthereumContract
    }
})