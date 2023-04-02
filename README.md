# Lottery Smart Contract
This is a smart contract for a lottery game written in Solidity. It allows players to register and participate in a lottery by sending a certain amount of ether. The contract's owner can then pick a random winner from the registered players and transfer the prize money to the winner.

The contract consists of two Solidity files:

## Helper.sol
This file defines a library called Helper that provides a function to generate a random number based on the contract owner's address and the current block timestamp. The generateRandomNumber function is defined as follows:

```solidity
function generateRandomNumber(address owner) public view returns (uint){
  return uint(keccak256(abi.encodePacked(owner, block.timestamp)));
}
```
## Lottery.sol
This file defines the Lottery contract, which implements the lottery game. The contract defines the following:

### State Variables
`owner`: The address of the contract owner.
`players`: An array of addresses representing the players who have registered for the lottery.
`lotteryId`: An integer representing the ID of the current lottery.
`history`: A mapping from lottery IDs to LotteryRecord structs representing the history of past lotteries.

## Events
`LogMessage`: A simple event that logs a message.

## Structs
`LotteryRecord`: A struct representing the history of a past lottery. It contains the address of the winner, the amount of ether won, and an array of player addresses.

## Modifiers
`isOwner`: A modifier that checks if the caller is the contract owner.

## Functions
`constructor`: Initializes the contract by setting the contract owner and the current lottery ID.

`getBalance`: Returns the current balance of the contract.

`getPlayers`: Returns an array of addresses representing the registered players.

`getWinnerByLotteryId`: Takes a lottery ID and returns the corresponding LotteryRecord struct from the history mapping.

`getLotteryHistory`: Returns an array of LotteryRecord structs representing the history of past lotteries.

`register`: Allows a player to register for the current lottery by sending a certain amount of ether.

`pickWinner`: Picks a random winner from the registered players and transfers the prize money to the winner. It also creates a new lottery and adds a corresponding LotteryRecord to the history mapping.

## Testing
To test the smart contract, you can use Truffle's testing framework. You can run the tests by running truffle test in the project directory.

Note that this contract is for demonstration purposes only and should not be used for real-world lotteries as it may contain security vulnerabilities.