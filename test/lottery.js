// Import necessary packages
const Lottery = artifacts.require("Lottery");

contract("Lottery", async function (accounts) {
  // Declare variables to be used throughout the tests
  let lottery;
  let owner = accounts[0];
  let player1 = accounts[1];
  let player2 = accounts[2];

  beforeEach(async function () {
    // Deploy a new instance of the Lottery contract before each test
    lottery = await Lottery.new();
    // Register two players for the lottery
    await lottery.register({ from: player1, value: web3.utils.toWei("0.02", "ether") });
    await lottery.register({ from: player2, value: web3.utils.toWei("0.02", "ether") });
  });

  it("Lottery.pickWinner", async function () {
    // Ensure that the contract balance is equal to the sum of the registration fees of the players
    let expectedBalance = web3.utils.toWei("0.04", "ether");
    assert.equal(await lottery.getBalance(), expectedBalance, "Contract balance is incorrect");

    // Pick a winner
    await lottery.pickWinner({ from: owner });

    // Ensure that the contract balance is now zero
    assert.equal(await lottery.getBalance(), 0, "Contract balance should be zero");

    // Ensure that the players array is now empty
    assert.equal((await lottery.getPlayers()).length, 0, "Players array should be empty");

    // Ensure that a new lottery record has been created
    let lotteryRecord = await lottery.getWinnerByLotteryId(1);
    assert.include([player1, player2], lotteryRecord.winner, "Winner should be player1");
    assert.equal(lotteryRecord.amountWon, expectedBalance, "Amount won should be correct");
    assert.deepEqual(lotteryRecord.players, [player1, player2], "Players array should be correct");
  });

  it("Lottery.register", async function () {
    await lottery.register({ from: accounts[2], value: web3.utils.toWei("0.02", "ether") });
    const players = await lottery.getPlayers();
    
    assert.equal(players.length, 3, "Contract should have 3 players");
  });

  it("Lottery.getBalance", async function () {
    await lottery.register({ from: accounts[3], value: web3.utils.toWei("0.02", "ether") });
    const balance = await lottery.getBalance();
    assert.equal(balance, web3.utils.toWei("0.06", "ether"), "Contract should have 0.04 ethers balance");
  });

  it("Lottery.getLotteryHistory", async function () {
   it("should return an empty array when no lotteries have been played", async function () {
    const history = await lotteryInstance.getLotteryHistory();
    assert.equal(history.length, 0, "History should be empty when no lotteries have been played");
  });

  it("should return the correct lottery history when multiple lotteries have been played", async function () {
    // Register players and play the first lottery
    await lotteryInstance.register({ from: player1, value: web3.utils.toWei("0.02", "ether") });
    await lotteryInstance.register({ from: player2, value: web3.utils.toWei("0.02", "ether") });
    await lotteryInstance.pickWinner({ from: owner });
    const lottery1History = await lotteryInstance.getLotteryHistory();
    assert.equal(lottery1History.length, 1, "History should have one item after the first lottery");

    // Play a second lottery
    await lotteryInstance.register({ from: player1, value: web3.utils.toWei("0.02", "ether") });
    await lotteryInstance.pickWinner({ from: owner });
    const lottery2History = await lotteryInstance.getLotteryHistory();
    assert.equal(lottery2History.length, 2, "History should have two items after the second lottery");

    // Check that the history contains the correct data for each lottery
    assert.include([player1, player2], lottery1History[0].winner, "History should contain the correct winner of the first lottery");
    assert.equal(lottery1History[0].amountWon, web3.utils.toWei("0.08", "ether"), "History should contain the correct amount won in the first lottery");
    assert.deepEqual(lottery1History[0].players, [player1, player2], "History should contain the correct players for the first lottery");
    assert.equal(lottery2History[0].winner, player1, "History should contain the correct winner of the second lottery");
    assert.equal(lottery2History[0].amountWon, web3.utils.toWei("0.02", "ether"), "History should contain the correct amount won in the second lottery");
    assert.deepEqual(lottery2History[0].players, [player1], "History should contain the correct players for the second lottery");
  });
  });

  it("Lottery.getWinnerByLotteryId", async function () {

    it("Should return the correct winner", async function () { 
      await lottery.pickWinner({ from: owner });
      const record = await lottery.getWinnerByLotteryId(1);
      assert.include([player1, player1], record.winner, "Should return the correct winner");
    });

    it("should return the correct winner record for a valid lottery ID", async () => {
      // Register players and pick a winner
      await lottery.register({ from: accounts[1], value: web3.utils.toWei("0.02", "ether") });
      await lottery.register({ from: accounts[2], value: web3.utils.toWei("0.03", "ether") });
      await lottery.pickWinner({ from: accounts[0] });

      // Get the lottery record for the first lottery
      const lotteryRecord = await lottery.getWinnerByLotteryId(1);

      // Check that the winner address is correct
      assert.equal(lotteryRecord.winner, accounts[3], "Winner address is incorrect");

      // Check that the amount won is correct
      assert.equal(
        lotteryRecord.amountWon.toString(),
        web3.utils.toWei("0.05", "ether"),
        "Amount won is incorrect"
      );

      // Check that the players array contains the correct addresses
      assert.deepEqual(lotteryRecord.players, [accounts[1], accounts[2]], "Players array is incorrect");
    });

    it("should return an empty record for an invalid lottery ID", async () => {
      // Get the lottery record for a non-existent lottery ID
      const lotteryRecord = await lottery.getWinnerByLotteryId(999);

      // Check that the winner address is zero
      assert.equal(lotteryRecord.winner, "0x0000000000000000000000000000000000000000", "Winner address is not zero");

      // Check that the amount won is zero
      assert.equal(lotteryRecord.amountWon.toString(), "0", "Amount won is not zero");

      // Check that the players array is empty
      assert.deepEqual(lotteryRecord.players, [], "Players array is not empty");
    });
  });



});
