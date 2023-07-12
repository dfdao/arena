import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { drip, logStats } from './faucet.js';
import { client, discords } from './bot.js';

const app = express();
app.use(cors());
const port = 3000;

app.get('/', async (req, res) => {
  res.send("Welcome to dfdao's server!");
});

app.get('/drip/:address', drip);

app.get('/discords', discords);

app.listen(port, async () => {
  console.log(`dfdao server listening on port ${port}`);
  client.login(process.env.BOT_TOKEN);
  await logStats();
});
