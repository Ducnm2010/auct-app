import { defineStore } from 'pinia'
import {
    ethers,
    utils as utilsEthers
} from 'ethers'
import { contractABIAuction, contractAddressAuction } from '../utils/constant.js'
import { message } from 'ant-design-vue'
import { ref } from 'vue'

const { ethereum } = window;

export const useContracts = defineStore('smartContractStore', () => {
    const currentAccount = ref(null)
    const setCurrentAccount = newVal => { currentAccount.value = newVal }

    const balance = ref('')
    const setBalance = newVal => { balance.value = newVal }

    const getEthereumContract = async () => {
        console.log('ethereum', ethereum)
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const auctionContract = new ethers.Contract(contractAddressAuction, contractABIAuction, signer)
        console.log(
            provider,
            signer,
            auctionContract
        )
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

    const getBalance = async () => {
        const { provider } = await getEthereumContract()
        const _balance = await provider.getBalance(currentAccount.value)
        const formattedBalance = utilsEthers.formatUnits(_balance, 18) // balance = _balance * 10^8
        setBalance(formattedBalance)
    }

    isWalletConnected()

    return {
        currentAccount,
        balance,
        getEthereumContract,
        connectWallet,
        getBalance
    }
})