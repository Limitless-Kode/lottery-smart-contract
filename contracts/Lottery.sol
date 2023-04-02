//SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "./Helper.sol";

contract Lottery {
  address public owner;
  address payable[] public players;
  uint lotteryId;
  mapping(uint => LotteryRecord) history;

  constructor(){
    owner = msg.sender;
    lotteryId = 1;
  }

  struct LotteryRecord {
    address payable winner;
    uint amountWon;
    address payable[] players;
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

  function getWinnerByLotteryId(uint _lotteryId) public view returns (LotteryRecord memory){
    return history[_lotteryId];
  }

  function getLotteryHistory() public view returns (LotteryRecord[] memory){
    LotteryRecord[] memory result = new LotteryRecord[](lotteryId - 1);
    
    for(uint i = 0; i < lotteryId - 1; i++){
      LotteryRecord memory record = history[i+1];
      result[i] = record;
    }
    return result;
  }

  
  function register() public payable {
    require(msg.value > .01 ether);
    players.push(payable(msg.sender));
  }

  function pickWinner() public isOwner{
    uint index = Helper.generateRandomNumber(owner) % players.length;
    uint balance = this.getBalance();
    players[index].transfer(balance);

    // start a new lottery and create history record
    history[lotteryId++] = LotteryRecord(players[index], balance, players);
    // clean up players
    players = new address payable[](0);
    
  }
}