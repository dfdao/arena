import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { dripRequest, logStats } from './actions/faucet.js';
import { client } from './bot/index.js';
import { readDb } from './utils.js';

const app = express();
app.use(cors());
const port = 3000;

app.get('/', async (req, res) => {
  res.send("Welcome to dfdao's server!");
});

// Request a burner drip from the faucet
app.get('/drip/:address', dripRequest);

app.get('/discords', async (req, res) => {
  try {
    const db = await readDb();
    res.json(db.discords);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, async () => {
  console.log(`dfdao server listening on port ${port}`);
  client.login(process.env.BOT_TOKEN);
  await logStats();
});
