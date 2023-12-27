// We import Chai to use its asserting functions here.
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { loadFixture } from 'ethereum-waffle';
import { DFArenaRegistry } from '@darkforest_eth/contracts/typechain';
import * as hre from 'hardhat';
import { World, arenaWorldFixture } from './utils/TestWorld';
import { fixtureLoader } from './utils/TestUtils';
import { constants, utils } from 'ethers';

describe.only('DFArenaRegistry ', function () {
  let registry: DFArenaRegistry;
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let world: World;

  describe('Access Control', function () {
    const fixture = async function () {
      await hre.network.provider.send('evm_setAutomine', [true]);

      const RegistryFactory = await ethers.getContractFactory('DFArenaRegistry');
      registry = await RegistryFactory.deploy();
      registry = await registry.deployed();
    };

    beforeEach('deploy contract', async function () {
      await loadFixture(fixture);
      [owner, nonOwner] = await ethers.getSigners();
    });

    it('owner is correct', async function () {
      expect(await registry.contractOwner()).to.be.equal(owner.address);
    });

    it('non owner cannot set owner', async function () {
      await expect(
        registry.connect(nonOwner).setContractOwner(nonOwner.address)
      ).to.be.revertedWith('Not contract owner');
    });

    it('owner cannot be zero address', async function () {
      await expect(
        registry.connect(owner).setContractOwner(constants.AddressZero)
      ).to.be.revertedWith('Owner cannot be zero address');
    });

    it('owner is admin', async function () {
      expect(await registry.isAdmin(owner.address)).to.be.true;
    });
  });

  describe('Grand Prixs', function () {
    const fixture = async function () {
      await hre.network.provider.send('evm_setAutomine', [true]);

      const RegistryFactory = await ethers.getContractFactory('DFArenaRegistry');
      registry = await RegistryFactory.deploy();
      registry = await registry.deployed();
    };

    beforeEach('deploy contract', async function () {
      await loadFixture(fixture);
      [owner, nonOwner] = await ethers.getSigners();
      world = await fixtureLoader(arenaWorldFixture);
    });

    it('admin can add grand prix', async function () {
      await registry.connect(owner).addGrandPrix(
        12345,
        12346,
        // Bytes32 ethers
        utils.formatBytes32String('0xdead'),
        world.contract.address,
        1
      );
      const grandPrixs = await registry.getAllGrandPrix();
      expect(grandPrixs[0].configHash).to.be.equal(utils.formatBytes32String('0xdead'));
    });

    it('non admin cannot add grand prix', async function () {
      await expect(
        registry.connect(nonOwner).addGrandPrix(
          12345,
          12346,
          // Bytes32 ethers
          utils.formatBytes32String('0xdead'),
          world.contract.address,
          1
        )
      ).to.be.revertedWith('Not admin');
    });

    it('non admin cannot add grand prix', async function () {
      await expect(
        registry.connect(nonOwner).addGrandPrix(
          12345,
          12346,
          // Bytes32 ethers
          utils.formatBytes32String('0xdead'),
          world.contract.address,
          1
        )
      ).to.be.revertedWith('Not admin');
    });

    it('start time cannot be after end time', async function () {
      await expect(
        registry.connect(owner).addGrandPrix(
          12346,
          12345,
          // Bytes32 ethers
          utils.formatBytes32String('0xdead'),
          world.contract.address,
          1
        )
      ).to.be.revertedWith('Invalid start/end time');
    });

    it('start time cannot overlap with previous grand prix', async function () {
      await registry.connect(owner).addGrandPrix(
        12345,
        12346,
        // Bytes32 ethers
        utils.formatBytes32String('0xdead'),
        world.contract.address,
        1
      );

      await expect(
        registry.connect(owner).addGrandPrix(
          12340,
          12346,
          // Bytes32 ethers
          utils.formatBytes32String('0xdead'),
          world.contract.address,
          1
        )
      ).to.be.revertedWith('Invalid start/end time');
    });
  });
});
