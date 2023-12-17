import { Network, hardhat, networks } from '@darkforest_eth/constants';
import { NETWORK } from '@darkforest_eth/contracts';
import { utils } from 'ethers';
import 'dotenv/config';
import fs, { promises } from 'fs';

export interface User {
  discordUsername: string;
  discordId: string;
}
export interface Drip {
  address: string;
  user: User;
  amount: number;
  timestamp: number;
}

export interface DBSchema {
  discords: { [key: string]: User };
  discordToDripTime: { [key: string]: Drip[] }; // key: discord username: value: drip times
}

export function verifySignature(sig: string, sender: string, message: string): boolean {
  const recovered = utils.verifyMessage(message, sig);
  return recovered.toLowerCase().trim() === sender.toLowerCase().trim();
}

export const isProdNetwork = NETWORK.toString() !== 'localhost' && NETWORK.toString() !== 'hardhat';

export const BURNER_DRIP = 0.25;
export const VERIFY_DRIP = 0.01;
export const CAPTCHA_VERIFIED_ROLE = 'verified';

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

const defaultDB: DBSchema = {
  discords: {},
  discordToDripTime: {},
};

export const readDb = async (): Promise<DBSchema> => {
  if (!fs.existsSync(DB_PATH)) {
    await promises.writeFile(DB_PATH, JSON.stringify({ ...defaultDB }));
  }
  const db: DBSchema = JSON.parse(await promises.readFile(DB_PATH, 'utf-8'));
  return db;
};

export const writeDb = async (db: DBSchema): Promise<void> => {
  try {
    await promises.writeFile(DB_PATH, JSON.stringify(db));
  } catch (error) {
    console.log(`[ERROR] writeDb`, error);
  }
};

export const findWalletsByDiscordId = async (discordId: string) => {
  const db = await readDb();
  const usersWithDiscordId = Object.entries(db.discords)
    .filter(([address, user]) => user.discordId === discordId)
    .map(([address, user]) => {
      return {
        ...user,
        address,
      };
    });
  return usersWithDiscordId;
};
