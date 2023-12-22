// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

// Contract imports
import {Diamond} from "../vendor/Diamond.sol";

// Interface imports
import {IDiamondCut} from "../vendor/interfaces/IDiamondCut.sol";
import {IDiamondLoupe} from "../vendor/interfaces/IDiamondLoupe.sol";
import {IERC173} from "../vendor/interfaces/IERC173.sol";

// Storage imports
import {WithStorage} from "../libraries/LibStorage.sol";
import {WithArenaStorage} from "../libraries/LibArenaStorage.sol";

// Types
import {InitArgs, ArenaPlayer} from "../DFTypes.sol";

contract DFArenaMuseumFacet is WithStorage, WithArenaStorage {
    event LobbyCreated(address creatorAddress, address lobbyAddress);

    function createLobby(address initAddress, bytes calldata initData) public {
        address diamondAddress = gs().diamondAddress;
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

        IDiamondCut(address(lobby)).diamondCut(facetCut, initAddress, initData);
        
        if (IERC173(address(lobby)).owner() == diamondAddress) {
            IERC173(address(lobby)).transferOwnership(msg.sender);
        }

        emit LobbyCreated(msg.sender, address(lobby));

        // Allow new arena to update parent Museum contract
        museumStorage().allowedAdmins[address(lobby)] = true;
        museumStorage().arenas.push(address(lobby));

        // Add creator to list of all creators
        if(!museumStorage().allCreatorLookup[msg.sender]) {
            museumStorage().allCreatorLookup[msg.sender] = true;
            museumStorage().allCreators.push(msg.sender);
        }
    }

    // Only callable by a child Arena contract
    function addConfig(bytes32 newHash) public {
        if(museumStorage().allowedAdmins[msg.sender]) {
            // Add the config and it's associated arena 
            if(museumStorage().configHashToArena[newHash] == address(0)) {
                museumStorage().configHashToArena[newHash] = msg.sender;
                museumStorage().configHashes.push(newHash);
            }
            // Always add arena to list of arenas for this config
            museumStorage().configHashToArenas[newHash].push(msg.sender);
        }
        else {
            revert("Not allowed to update config hash");
        }
 
    }

    function addNewPlayer(bytes32 configHash, address player) public {
        if(museumStorage().allowedAdmins[msg.sender]) {
            // Update arenasStartedByConfigHashAndPlayer
            museumStorage().arenasStartedByConfigHashAndPlayer[configHash][player].push(msg.sender);
            // Update playersByConfigHash 
            museumStorage().playersByConfigHash[configHash].push(player);
        }
        else {
            revert("Not allowed to update config hash");
        }
 
    }

    function addFinishedArenaPlayer(ArenaPlayer memory arenaPlayer) public {
        if(museumStorage().allowedAdmins[msg.sender]) {
            // Verify that msg.sender is the arenaPlayer.arena
            if(arenaPlayer.arena != msg.sender) {
                revert("Not allowed to add arena player");
            }
            museumStorage().arenasFinishedByConfigHash[arenaPlayer.configHash].push(arenaPlayer);
            // Need consistent util for this hash lol.
            // Config hash, player addres, arena address
            bytes32 arenaPlayerHash = keccak256(abi.encode(arenaPlayer.configHash, arenaPlayer.player, msg.sender));
            museumStorage().arenaPlayerLookup[arenaPlayerHash] = arenaPlayer;
        }
        else {
            revert("Not allowed to add arena player");
        }
 
    }
}
