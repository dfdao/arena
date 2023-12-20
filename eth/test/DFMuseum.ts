// We import Chai to use its asserting functions here.
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { loadFixture } from 'ethereum-waffle';
import { DFMuseum } from '@darkforest_eth/contracts/typechain';
import * as hre from 'hardhat';

const fixture = async function () {
  await hre.network.provider.send('evm_setAutomine', [true]);

  const MuseumFactory = await ethers.getContractFactory('DFMuseum');
  var museum = await MuseumFactory.deploy();
  museum = await museum.deployed();
  return museum;
};

describe.only('DFMuseum ', function () {
  let museum: DFMuseum;
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let nonOwnerMuseum: DFMuseum;

  describe('Getters', function () {
    beforeEach('deploy contract', async function () {
      museum = await loadFixture(fixture);
      [owner, nonOwner] = await ethers.getSigners();
    });

    it('default params are correct', async function () {
      expect(await museum.contractOwner()).to.be.equal(owner.address);
    });
  });

  describe('basic functionality', async function () {
    beforeEach('deploy contract', async function () {
      museum = await loadFixture(fixture);
      [owner, nonOwner] = await ethers.getSigners();
      nonOwnerMuseum = await museum.connect(nonOwner);
    });

    it('new admin can be added', async function () {
      const admins = await museum.getAllAdmins();
      console.log(admins);
      expect(!admins.map((a) => a.toLowerCase()).includes(nonOwner.address.toLowerCase())).to.be
        .true;
      await museum.setAdmin(nonOwner.address, true);
      const newAdmins = await museum.getAllAdmins();
      console.log(newAdmins);
      expect(newAdmins.map((a) => a.toLowerCase()).includes(nonOwner.address.toLowerCase())).to.be
        .true;
    });
  });
});
