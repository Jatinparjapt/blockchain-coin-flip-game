// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CoinFlip {
    address public owner;
    uint256 public fee = 0.01 ether; // Set the fee for simplicity

    event FlipResult(address indexed player, bool win, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function flipCoin(bool _side) external payable returns (bool) {
        require(msg.value >= fee, "Insufficient fee");

        // Simulate coin flip
        bool result = (block.timestamp % 2 == 0);

        if (result == _side) {
            // Player wins
            uint256 winnings = msg.value * 2;
            payable(msg.sender).transfer(winnings);
            emit FlipResult(msg.sender, true, winnings);
            return true;
        } else {
            // Player loses
            emit FlipResult(msg.sender, false, 0);
            return false;
        }
    }

    function withdraw() external {
        require(msg.sender == owner, "Only the owner can withdraw");
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds available to withdraw");
        payable(owner).transfer(balance);
    }
}
