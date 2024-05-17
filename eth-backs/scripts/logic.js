    const fs = require("fs-extra");
    const { web3 } = require("./web3");
    const compileContract = require("../artifacts/contracts/AssetTracker.sol/AssetTracker.json");

    console.log("yo");

    const getContractObject = () => {

        const contractReceipt = require("../receipt-gtr.json");

        // Create a contract object/instance 
        const contractObject = new web3.eth.Contract(
            compileContract.abi,
            contractReceipt.address
        );

        return contractObject;
    };

    const abc = async (transactionHash) => {
        try {
            console.log("in the abc");
            const result = await web3.eth.getTransaction(transactionHash);
            console.log("ready with the result");
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };


    const assetCreate = async () => { 
        const contractObject = getContractObject();
        const accounts = await web3.eth.getAccounts();
    // console.log(contractObject);
    let cds = await contractObject.methods.createAsset(
            "covishield",
            "vaccine",
            0,
            50,
            1,
            "serum",
            "rohit",
            "mumbai",
            "gujrat"

        ).send({gas: 3000000,gasPrice: 10000000, from:accounts[1]}); 

        console.log(cds);
    };

    assetCreate();

    const getindex = async () => {
        try {
            const contractObject = getContractObject();
            let len = await contractObject.methods.getAssetCount().call();
            const s =len-BigInt(1);
            const index =Number(s);
            console.log(len-BigInt(1));
            //const index = BigInt(len);
            //console.log(index);
            return index;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
    getindex();
    const getcurrent = async (index) => {
        try {
            const contractObject = getContractObject();
            let st = await contractObject.methods.check_status(index).call();
            console.log(st);
            return st;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
    //getcurrent(2);

    const setarrived = async (index) => {
        try {
            const contractObject = getContractObject();
            const accounts = await web3.eth.getAccounts();

            const st = await contractObject.methods.Arrived(index).send({gas: 3000000,gasPrice: 1000000,from:accounts[0]});

            //console.log(st);
            return st;
        } catch (error) {
            console.error(error);
            throw error;
        }

    };

    //setarrived(2);
    getcurrent(2);
    getcurrent(3);
    setarrived(3);
    getcurrent(3);



    module.exports = {
        abc,
        getindex,
        getcurrent,
        setarrived
    };
