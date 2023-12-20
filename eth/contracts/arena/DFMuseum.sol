// 

// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract DFMuseum {
    address public contractOwner;
    mapping(address => bool) public isAdmin;

    address[] public admins;

    mapping (bytes32 => address) public arenaConfigToAddress;
    bytes32[] public arenaConfigHashes;

    constructor() {
        contractOwner = msg.sender;
        isAdmin[msg.sender] = true;
        admins.push(msg.sender);
    }

    /* Access Control */

    modifier onlyAdmin() {
        require(isAdmin[msg.sender], "Not admin");
        _;
    }

    modifier onlyContractOwner() {
        require(msg.sender == contractOwner, "Not contract owner");
        _;
    }

    function setAdmin(address admin, bool allowed) public onlyContractOwner {
        require(admin != address(0), "Can't add zero address");
        if (allowed) {
            // check if admin is already in admins array
            if (!isAdmin[admin]) {
                admins.push(admin);
            }
        } else {
            for (uint256 i = 0; i < admins.length; i++) {
                if (admins[i] == admin) {
                    delete admins[i];
                    break;
                }
            }
        }
        isAdmin[admin] = allowed;
    }

    function getAllAdmins() public view returns (address[] memory) {
        return admins;
    }

    /* Read */ 
    function getArenaByConfigHash(bytes32 configHash) public view returns (address) {
        return arenaConfigToAddress[configHash];
    }

    /* Write */
    function setContractOwner(address newOwner) public onlyContractOwner {
        require(newOwner != address(0), "Owner cannot be zero address");
        contractOwner = newOwner;
    }

    function setArenaByConfigHash(bytes32 configHash, address arena) public onlyAdmin {
        require(configHash != bytes32(0), "Config hash cannot be zero");
        require(arena != address(0), "Arena cannot be zero address");
        // If configHash already exists, do nothing
        if(arenaConfigToAddress[configHash] != address(0)) {
            return;
        }
        arenaConfigToAddress[configHash] = arena;
        arenaConfigHashes.push(configHash);
    }

    /* Helpers */
}
