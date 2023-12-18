import { FAUCET_ADDRESS } from '@darkforest_eth/contracts';
import faucetContractAbi from '@darkforest_eth/contracts/abis/DFArenaFaucet.json' assert { type: 'json' };
import 'dotenv/config';
import { ethers } from 'ethers';
import { getNetwork, pKey } from './utils.js';

if (!pKey) throw new Error('Private key not found');

const provider = new ethers.providers.JsonRpcProvider(getNetwork().httpRpc);

const wallet = new ethers.Wallet(pKey, provider);
const faucet = new ethers.Contract(FAUCET_ADDRESS, faucetContractAbi, wallet);

export { wallet, faucet, provider }