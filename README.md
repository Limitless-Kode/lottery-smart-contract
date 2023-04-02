# Lottery Smart Contract

A smart contract that enables people to enter into a lottery by buying tickets. The contract randomly selects a winner at a predetermined date and time.

## Getting Started

### Prerequisites

- Solidity compiler
- Remix IDE or any other Ethereum development environment

### Installing

1. Clone the repository
`git clone https://github.com/Limitless-Kode/lottery-smart-contract.git`


2. Compile the contract in Remix or with the Solidity compiler

3. Deploy the contract to the Ethereum network

## Usage

### Creating a Lottery

To create a new lottery, call the `constructor` function with the following parameters:

- `_totalTickets`: the total number of tickets available for the lottery
- `_ticketAmount`: the amount of ether required to purchase a ticket
- `_endTime`: the end time of the lottery in seconds from the current time

### Buying a Ticket

To buy a ticket, call the `register` function with the following parameters:

- `msg.value`: the amount of ether sent to purchase the ticket

### Picking a Winner

To pick a winner, call the `pickWinner` function. The contract will randomly select a winner and transfer the total balance of the contract to the winner's address.

### Retrieving Information

- `getBalance`: returns the balance of the contract
- `getPlayers`: returns an array of addresses that have purchased tickets
- `getWinnerByLotteryId`: returns the winner of a specific lottery
- `getLotteryHistory`: returns an array of all lottery winners

## Built With

- Solidity

## Authors

- Peter Claver <limitless.claver@gmail.com>

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
