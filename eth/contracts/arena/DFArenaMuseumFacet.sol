// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

// Contract imports
import {Diamond} from "../vendor/Diamond.sol";
import {DFStartFacet} from "../facets/DFStartFacet.sol";

// Interface imports
import {IDiamondCut} from "../vendor/interfaces/IDiamondCut.sol";
import {IDiamondLoupe} from "../vendor/interfaces/IDiamondLoupe.sol";
import {IERC173} from "../vendor/interfaces/IERC173.sol";

// Storage imports
import {WithStorage} from "../libraries/LibStorage.sol";
import {WithArenaStorage} from "../libraries/LibArenaStorage.sol";

// Types
import {InitArgs} from "../DFTypes.sol";
import {console} from "hardhat/console.sol";

contract DFArenaMuseumFacet is WithStorage, WithArenaStorage {
    event LobbyCreated(address creatorAddress, address lobbyAddress);

    function createLobby(address initAddress, bytes calldata initData) public {
        address diamondAddress = gs().diamondAddress;
        console.log("diamondAddress: %s", diamondAddress);
        console.log("address this: %s", address(this));
        address diamondCutAddress = IDiamondLoupe(diamondAddress).facetAddress(
            IDiamondCut.diamondCut.selector
        );
        Diamond lobby = new Diamond(diamondAddress, diamondCutAddress);

        IDiamondLoupe.Facet[] memory facets = IDiamondLoupe(diamondAddress).facets();

        IDiamondCut.FacetCut[] memory facetCut = new IDiamondCut.FacetCut[](facets.length - 1);
        uint256 cutIdx = 0;
        for (uint256 i = 0; i < facets.length; i++) {
            if (facets[i].facetAddress != diamondCutAddress) {
                facetCut[cutIdx] = IDiamondCut.FacetCut({
                    facetAddress: facets[i].facetAddress,
                    action: IDiamondCut.FacetCutAction.Add,
                    functionSelectors: facets[i].functionSelectors
                });
                cutIdx++;
            }
        }
        // Try setting value of arena constants on lobby 
        // DFStartFacet(address(lobby)).setParentAddress(address(this));

        IDiamondCut(address(lobby)).diamondCut(facetCut, initAddress, initData);
        
        if (IERC173(address(lobby)).owner() == diamondAddress) {
            IERC173(address(lobby)).transferOwnership(msg.sender);
        }

        console.log("DADDY LOBBY ADDRESS: %s", address(this));
        console.log("NEW LOBBY ADDRESS: %s", address(lobby));
        emit LobbyCreated(msg.sender, address(lobby));

        // Allow new arena to update parent Museum contract
        museumStorage().allowedAdmins[address(lobby)] = true;
        museumStorage().arenas.push(address(lobby));
    }

    function addConfig(bytes32 newHash) public {
        console.log('MSG SENDER UPDATOOR', msg.sender);
        if(museumStorage().allowedAdmins[msg.sender]) {
            // Only add the address if doesn't already exist
            if(museumStorage().configHashToArenaAddress[newHash] == address(0)) {
                museumStorage().configHashToArenaAddress[newHash] = msg.sender;
                museumStorage().configHashes.push(newHash);
                console.log("Loggin new hash");
                console.logBytes32(newHash);
            }
        }
        else {
            revert("Not allowed to update config hash");
        }
 
    }
}
