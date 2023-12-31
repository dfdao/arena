// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract DFArenaFaucet {
    uint256 public waitTime = 24 hours;
    address public _owner;
    uint256 public maxDrip = 0.05 ether;

    /** Used on creation of burner wallet */
    mapping(address => bool) public receivedFirstDrip;

    /** Used on subsequent drip requests */
    mapping(address => uint256) public nextAccessTime;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event DripChanged(uint256 oldDrip, uint256 newDrip);
    event WaitTimeChanged(uint256 oldTime, uint256 newTime);

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(_owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    constructor() {
        _owner = msg.sender;
    }

    /*******************************Admin Controls *************************************/

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    function _transferOwnership(address newOwner) private {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }

    function changeDrip(uint256 newDrip) public onlyOwner {
        require(newDrip != 0, "New drip is zero");
        uint256 oldDrip = maxDrip;
        maxDrip = newDrip;
        emit DripChanged(oldDrip, maxDrip);
    }

    function changeWaitTime(uint256 waitTimeSeconds) public onlyOwner {
        require(waitTimeSeconds != 0, "New wait time cannot be zero");
        uint256 oldTime = waitTime;
        waitTime = waitTimeSeconds;
        emit WaitTimeChanged(oldTime, waitTimeSeconds);
    }

    /*******************************Functionality *************************************/

    function canWithdraw(address _address) public view returns (bool) {
        bool isOwner = _address == _owner;
        bool isBurner = !receivedFirstDrip[_address];
        bool isAllowed = nextAccessTime[_address] == 0 || block.timestamp >= nextAccessTime[_address];
        return (isOwner || isBurner || isAllowed);
    }

    function drip(address _recipient, uint256 dripAmount) public onlyOwner {
        require(canWithdraw(_recipient), "you can't withdraw yet");
        require(dripAmount < address(this).balance, "faucet out of funds");
        require(dripAmount <= maxDrip, "drip amount too high");
        
        // If first drip, mark receivedFirstDrip to true
        if(!receivedFirstDrip[_recipient]) {
            receivedFirstDrip[_recipient] = true;
        }
        // If second drip, update next access time
        else {
            nextAccessTime[_recipient] = block.timestamp + waitTime;
        }

        bool success = payable(_recipient).send(dripAmount);
        require(success, "eth transfer failed");
    }

    function withdraw(address _address) public onlyOwner {
        bool success = payable(_address).send(getBalance());
        require(success, "withdraw failed");
    }

    /***********************************Getters*************************************** */

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getOwner() public view returns (address) {
        return _owner;
    }

    function getWaitTime() public view returns (uint256) {
        return waitTime;
    }

    function getMaxDripAmount() public view returns (uint256) {
        return maxDrip;
    }

    function getNextAccessTime(address _recipient) public view returns (uint256) {
        return nextAccessTime[_recipient];
    }

    function getReceivedFirstDrip(address _recipient) public view returns (bool) {
        return receivedFirstDrip[_recipient];
    }

    function getTimeUntilDrip(address _recipient) public view returns (uint256) {
        require(nextAccessTime[_recipient] != 0);
        return nextAccessTime[_recipient] - block.timestamp;
    }

    receive() external payable {}
}