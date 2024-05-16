const router = express.Router();
//const compile = require("../../Fake-prodcut-identification-smart-contract/scripts/compile");
//const deploy = require("../../scripts/deploy");
const get_addr = require("../../receipt-gtr.json");
const {web3,web3Network} = require("../../scripts/web3.js");
// Compile the contract
/*router.post("/compile", async function(req, res, next) {
    const result = compile();
    res.send(result); 
});

// Deploy the contract
/*router.post("/deploy", async function(req, res, next) {
    const result = await deploy();
    res.send(JSON.parse(result).address); 
});*/
router.get("/get_addr", async function(req,res,next) {
    res.send(get_addr.address);
});
router.get("/acc_addr", async function(req, res, next) {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log(`Attempting to deploy from account: ${accounts[0]}`);
        res.send(accounts[0]);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;

