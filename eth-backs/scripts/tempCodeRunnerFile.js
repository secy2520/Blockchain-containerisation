const Web3 = require("web3");

const hardhatNetworkURL = "ws://192.168.50.12:7556";

const web3 = new Web3(hardhatNetworkURL);

module.exports = {
  web3
};
