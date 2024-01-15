import fs, { promises } from 'fs';

async function main() {
  const address = [
    '0x471ba964ae8ef246aadd706c9bf382212f5dd3bd',
    '0x80bB0067229Bec944d4A24AAa0fa06a5AC7EBEAA',
    '0xe0f6c5598ae8787adde19aee9e44421233c58652',
    '0xaA3Ed3392AE5cfBfB438F99FfD9DC242AD2547eB',
    '0x3e03EA5FE0d7510D04Eb105F80cCC14d103FEB32',
    '0x64E4509d0a7A9078D7B1677d092c22cCF11175a6',
    '0x1bF017E8712bD17EA54182779320c67fFc6f92d2',
    '0xD67c34169b372d5B3932c548a940D4Ea74Fe7aF5',
    '0xcf57805bca8979405d3448f3b55ff0c724ddfe24',
    '0x968e3e4bfb4e78efaf860c406187e47f98f4c8b0',
    '0xaa02128e15A2BC6b8BBEfB34128BF92505B386CC',
    '0xe8e5eae3c6b63251b9e199f467115e3a22b63086',
    '0x3cf37362daf6fd31408123d81d969fa3abb74006',
    '0xe84b32418af66dca52cd10a97b8ee3f4ff92333c',
    '0xf49392152cb31da81ecbabacd68dfcdeae5bdcb0',
    '0xf2ec9ff453a4af4e0c977188d5108eb25c834d49',
    '0x46Cac9e4595D82E421437e11E1145Da7Bb899999',
    '0x6fc55665d18da7698e12df7e375a9e687e518e45',
    '0x38BbD375d49d6237984cbfa19719c419af9FE514',
    '0x8de4dc7eea16b445f69f092e2e183615bc3eeff8',
  ];
  const dripped = {};
  const finalAddress = address.map((addr) => (dripped[addr.toLowerCase()] = false));
  const drips = JSON.parse(await promises.readFile('internalTxs.json'));
  drips.forEach((drip) => {
    if (drip.to && drip.to.toLowerCase() in dripped) {
      dripped[drip.to.toLowerCase()] = true;
    }
  });

  console.log(`DRIPPED:`, dripped);
}

main();
