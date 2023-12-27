// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract DFArenaRegistry {
    event GrandPrixAdded(bytes32 indexed configHash);
    event GrandPrixDeleted(bytes32 indexed configHash);

    struct GrandPrix {
        uint256 startTime;
        uint256 endTime;
        bytes32 configHash;
        uint256 seasonId;
        address diamondAddress;
        bool deleted;
    }

    address[] public admins;
    address public contractOwner;
    mapping(address => bool) public isAdmin;

    // Array to iterate on GrandPrix
    bytes32[] public grandPrixHashes;
    mapping(bytes32 => GrandPrix) public configHashToMetadata;

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

    function setContractOwner(address newOwner) public onlyContractOwner {
        require(newOwner != address(0), "Owner cannot be zero address");
        contractOwner = newOwner;
    }

    /* Getters */

    function getAllAdmins() public view returns (address[] memory) {
        return admins;
    }

    function getAllGrandPrix() public view returns (GrandPrix[] memory) {
        GrandPrix[] memory allGrandPrixs = new GrandPrix[](grandPrixHashes.length);

        for (uint i = 0; i < grandPrixHashes.length; i++) {
            allGrandPrixs[i] = configHashToMetadata[grandPrixHashes[i]];
        }

        return allGrandPrixs;
    }
    /* Grand Prix Registry */
    function addGrandPrix(
        uint256 startTime,
        uint256 endTime,
        bytes32 configHash,
        address diamondAddress,
        uint256 seasonId
    ) public onlyAdmin {
        require(
            _validateGrandPrixTime(startTime, endTime),
            "Invalid start/end time"
        );
        require(
            diamondAddress != address(0),
            "diamond address cannot be zero address"
        );
        configHashToMetadata[configHash] = GrandPrix({
            startTime: startTime,
            endTime: endTime,
            configHash: configHash,
            seasonId: seasonId,
            diamondAddress: diamondAddress,
            deleted: false
        });

        grandPrixHashes.push(configHash);
        emit GrandPrixAdded(configHash);
    }

    function removeGrandPrix(bytes32 _configHash) public onlyAdmin {
        GrandPrix storage gp = configHashToMetadata[_configHash];
        gp.deleted = true;
    }

    function _validateGrandPrixTime(uint256 _startTime, uint256 _endTime)
        internal
        view
        returns (bool)
    {
        bool startBeforeEnd = _startTime < _endTime;
        bool noOverlap = true;
        for (uint256 i = 0; i < grandPrixHashes.length; i++) {
            if (
                configHashToMetadata[grandPrixHashes[i]].startTime < _endTime &&
                configHashToMetadata[grandPrixHashes[i]].endTime > _startTime
            ) {
                noOverlap = false;
                break;
            }
        }
        return startBeforeEnd && noOverlap;
    }
}
