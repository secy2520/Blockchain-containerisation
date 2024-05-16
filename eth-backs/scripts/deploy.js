const qr = require("qrcode");
const fs = require("fs-extra");
const path = require("path");
const { web3, web3Network } = require("./web3");
const compiledContract = require("../artifacts/contracts/AssetTracker.sol/AssetTracker.json");
const circularJSON = require('circular-json');

const main = async () => {
  try {
    const receiptPath = path.resolve("receipt-" + web3Network + ".json");
    console.log(`---------- receipt path -------- ${receiptPath}`);

    const accounts = await web3.eth.getAccounts();
    console.log(`Attempting to deploy from account , ${accounts[0]}`);

    // Deploying the contract
    console.log("Deploying the contract...");
    const result = await new web3.eth.Contract(

      compiledContract.abi 
    )
      .deploy({ data: compiledContract.bytecode })
      .send({ gas: 3000000, gasPrice:1000000000, from: accounts[0] });


    console.log(`Contract deployed to ${result.options.address}`);

    console.log("hi");
    const serialised = circularJSON.stringify(result.options);

    // Writing the receipt to file
    fs.writeJsonSync(receiptPath, result.options);

    console.log("Receipt saved successfully");
    return serialised;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
