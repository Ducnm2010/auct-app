import { defineStore } from 'pinia'
import { ethers } from 'ethers'
import { contractABIAuction, contractAddressAuction } from '../utils/constant.js'
import { message } from 'ant-design-vue'
import { ref } from 'vue'

const { ethereum } = window;

export const useContracts = defineStore('smartContractStore', () => {
    const currentAccount = ref(null)
    const setCurrentAccount = newVal => { currentAccount.value = newVal }

    const getEthereumContract = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const auctionContract = new ethers.Contract(contractAddressAuction, contractABIAuction, signer.value)
        console.log('auctionContract', auctionContract)
        return {
            auctionContract, provider, signer
        }
    }

    const isWalletConnected = async () => {
        try {
            if (!ethereum) return message.error('Metamask is not ready')
            const accounts = await ethereum.request({ method: 'eth_accounts' })
            if (accounts.length) {
                setCurrentAccount(accounts[0])
            } else {
                console.log('No account found!')
            }
            console.log('List accounts', accounts)
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object...");
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask!");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setCurrentAccount(accounts[0]);
            message.success('Your wallet is connected')
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object...");
        }
    }

    const getWalletAdress = () => {

    }

    isWalletConnected()

    return {
        currentAccount,
        getEthereumContract,
        connectWallet
    }
})