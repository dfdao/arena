import axios from 'axios';
import fs, { promises } from 'fs';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error('API_KEY not found in environment variables');
}

const CONTRACT_ADDRESS = '0x1754653aef244acd24f16a940875e83e4f0e021c';

async function getTransactions(contractAddress) {
  try {
    const url = `https://api.gnosisscan.io/api?module=account&action=txlist&address=${contractAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${API_KEY}`;
    const response = await axios.get(url);
    return response.data.result;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return null;
  }
}

async function getInternalTransactions(txHash) {
  try {
    const url = `https://api.gnosisscan.io/api?module=account&action=txlistinternal&txhash=${txHash}&apikey=${API_KEY}`;
    const response = await axios.get(url);
    console.log(`Response:`, response.data);
    return response.data.result;
  } catch (error) {
    console.error('Error fetching internal transactions:', error);
    return null;
  }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const transactions = await getTransactions(CONTRACT_ADDRESS);
  console.log(`tran `, transactions[0]);
  const internalTxs = [];
  if (transactions) {
    let i = 0;
    for (const tx of transactions) {
      console.log(`TX ${i + 1} of ${transactions.length}`);
      await delay(250);
      const internalTransactions = await getInternalTransactions(tx.hash);
      internalTxs.push(internalTransactions);
      console.log(`Transaction Hash: ${tx.hash}, Internal Transactions:`, internalTransactions);
      i++;
    }
  }
  const final = internalTxs.flat();
  // Write final to file
  await promises.writeFile('internalTxs.json', JSON.stringify(final));
}

main();
