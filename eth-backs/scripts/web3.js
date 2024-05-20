
const {Web3} = require("web3");


const hardhatNetworkURL = "http://ganache:8545";


const web3Network = "gtr";
const web3 = new Web3(hardhatNetworkURL);



module.exports = {
  web3,
  web3Network
};
