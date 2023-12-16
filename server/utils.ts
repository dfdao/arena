import { Network, hardhat, networks } from '@darkforest_eth/constants';
import { NETWORK } from '@darkforest_eth/contracts';
import { utils } from 'ethers';
import fs, { promises } from 'fs';

export interface Drip {
  address: string;
  discord: string;
  amount: number;
  timestamp: number;
}

export interface DBSchema {
  discords: { [key: string]: string }; // key: address: value: discord username
  discordToDripTime: { [key: string]: Drip[] }; // key: discord username: value: drip times
}

export function verifySignature(sig: string, sender: string, message: string): boolean {
  const recovered = utils.verifyMessage(message, sig);
  console.log(`recovered`, recovered, `sender`, sender);
  return recovered.toLowerCase().trim() === sender.toLowerCase().trim();
}

export const isProdNetwork = NETWORK.toString() !== 'localhost' && NETWORK.toString() !== 'hardhat';

export const BURNER_DRIP = 0.25;
export const VERIFY_DRIP = 1;

export const getNetwork = (): Network => {
  if (isProdNetwork) {
    return networks.find((n) => n.name === NETWORK) || hardhat;
  } else {
    return hardhat;
  }
};

export const pKey =
  NETWORK.toString() == 'localhost' ? process.env.DEV_PRIVATE_KEY : process.env.PROD_PRIVATE_KEY;

export const targetChannelId = '909812397680767006';
export const DB_PATH = './data/data.json';

export const readDb = async (): Promise<DBSchema> => {
  if (!fs.existsSync(DB_PATH)) {
    await promises.writeFile(DB_PATH, JSON.stringify({}));
  }
  const db: DBSchema = JSON.parse(await promises.readFile(DB_PATH, 'utf-8'));
  return db;
};

export const writeDb = async (db: DBSchema): Promise<void> => {
  if (!fs.existsSync(DB_PATH)) {
    await promises.writeFile(DB_PATH, JSON.stringify({}));
  }
  try {
    await promises.writeFile(DB_PATH, JSON.stringify(db));
  } catch (error) {
    console.log(`[ERROR] writeDb`, error);
  }
};
