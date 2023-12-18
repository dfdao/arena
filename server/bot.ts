import { verifySignature } from './utils';

// Handle CLI args for signature verification
if (process.argv[2] === 'verify') {
  const sig = process.argv[3];
  const sender = process.argv[4];
  const message = process.argv[5];
  console.log(`sig`, sig, `sender`, sender, `message`, message);
  console.log(`verified`, verifySignature(sig, sender, message));
}
