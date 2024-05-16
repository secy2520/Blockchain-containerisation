const express = require("express");
const router = express.Router();

const logic = require("../../scripts/logic.js");

router.get("/getTransaction/:hash", async (req,res,next) => {
    const hash = req.params.hash;
        const transaction = await logic.abc(hash);
        console.log(transaction);
        res.json(transaction.data);
})

router.get("/getIndex",async(req,res,next) => 
{
    const ab = await logic.getindex();
    res.json(ab);
})

router.post("/setStatus/:index",async(req,res,next) =>
{
    const index = req.params.index;
    const st = await logic.setarrived(index);
    res.json(st.data);
})

router.get("/getStatus/:index",async(req,res,next) => 
{
    const index = req.params.index;
    const ab = await logic.getcurrent(index);
    res.json(ab);
})

// router.post("/", async (req,res, next) => {
//     let message = await logic.setMessage(req.body.message);
//     res.send(message.transactionHash);
// })

module.exports = router;