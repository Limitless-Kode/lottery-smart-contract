//SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import './Helper.sol';

contract Lottery {
  address public owner;
  address payable[] public players;

  constructor(){
    owner = msg.sender;
  }

  modifier isOwner(){
    require(msg.sender == owner);
    _;
  }

  function getBalance() view public returns(uint){
    return address(this).balance;
  }

  function getPlayers() view public returns(address payable[] memory){
    return players;
  }
  
  function register() public payable {
    require(msg.value > .01 ether);
    players.push(payable(msg.sender));
  }

  function pickWinner() public isOwner{
    uint index = Helper.generateRandomNumber(owner) % players.length;
    players[index].transfer(this.getBalance());

    // clean up players
    players = new address payable[](0);
  }
}