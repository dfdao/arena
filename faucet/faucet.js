import { ethers } from 'ethers';
import { FAUCET_ADDRESS, NETWORK } from '@darkforest_eth/contracts';
import { hardhat } from '@darkforest_eth/constants';
import FAUCET_ABI from './DFArenaFaucet.js';

import 'dotenv/config';
import express from 'express';

import cors from 'cors';

const GNOSIS = 'https://rpc.xdaichain.com/';
const GNOSIS_OPTIMISM = 'https://optimism.gnosischain.com';

const provider =
  NETWORK == 'localhost'
    ? new ethers.providers.JsonRpcProvider(hardhat.httpRpc)
    : new ethers.providers.JsonRpcProvider(GNOSIS_OPTIMISM);

const pKey = NETWORK == 'localhost' ? process.env.DEV_PRIVATE_KEY : process.env.PROD_PRIVATE_KEY;

if (!pKey) throw new Error('Private key not found');

const wallet = new ethers.Wallet(pKey, provider);

const faucet = new ethers.Contract(FAUCET_ADDRESS, FAUCET_ABI, wallet);

const logStats = async function () {
  console.log('server booting up at', new Date().toUTCString());
  console.log('faucet address', FAUCET_ADDRESS);
  console.log(`faucet owner`, await faucet.getOwner());
  const balance = await faucet.getBalance();
  console.log(`faucet balance`, ethers.utils.formatEther(balance));
  console.log(`faucet drip`, ethers.utils.formatEther(await faucet.getDripAmount()));
};
const sendDrip = async function (addresss) {
  const balance = await faucet.getBalance();
  console.log();
  if (balance.lte(1)) {
    const eth = '20';
    throw new Error('balance too low');
  }
  console.log(`${addresss} balance`, ethers.utils.formatEther(await provider.getBalance(addresss)));
  const dripTx = await faucet.drip(addresss);
  await dripTx.wait();
  console.log(
    `${addresss} balance after drip`,
    ethers.utils.formatEther(await provider.getBalance(addresss))
  );
  console.log(`faucet balance after drip`, ethers.utils.formatEther(balance));
};

const app = express();
app.use(cors());
const port = 3000;

app.get('/', async (req, res) => {
  res.send("Welcome to dfdao's faucet!");
});

app.get('/drip/:address', async (req, res) => {
  let address = req.params.address;

  console.log('requesting drip at', new Date().toUTCString());

  if (!ethers.utils.isAddress(req.params.address)) {
    res.status(500).send(`address ${req.params.address} is not valid`);
    console.log(`address ${req.params.address} is not valid`);

    return;
  }
  try {
    await sendDrip(address);
    res.status(200).send();
  } catch (error) {
    console.log('sendDrip error', error);
    if (error.message) {
      res.status(500).send(JSON.stringify(error.message));
    } else {
      res.status(500).send(JSON.stringify(error));
    }
  }
  return;
});

app.listen(port, async () => {
  console.log(`dfdao faucet listening on port ${port}`);
  await logStats();
});
