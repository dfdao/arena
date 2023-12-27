// We import Chai to use its asserting functions here.
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { loadFixture } from 'ethereum-waffle';
import { DFArenaRegistry } from '@darkforest_eth/contracts/typechain';
import * as hre from 'hardhat';
import { World, arenaWorldFixture } from './utils/TestWorld';
import { fixtureLoader } from './utils/TestUtils';

describe('DFArenaRegistry ', function () {
  let registry: DFArenaRegistry;
  let world: World;
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;

  describe('Getters', function () {
    const fixture = async function () {
      await hre.network.provider.send('evm_setAutomine', [true]);

      const RegistryFactory = await ethers.getContractFactory('DFArenaRegistry');
      registry = await RegistryFactory.deploy();
      registry = await registry.deployed();

      world = await fixtureLoader(arenaWorldFixture);
    };

    beforeEach('deploy contract', async function () {
      await loadFixture(fixture);
      [owner, nonOwner] = await ethers.getSigners();
    });

    it('default params are correct', async function () {
      expect(await registry.contractOwner()).to.be.equal(owner.address);
      expect(await world.contract.owner()).to.be.equal(owner.address);
    });
  });
});
