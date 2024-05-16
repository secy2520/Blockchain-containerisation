const fs = require("fs-extra");
const path = require("path");
const solc = require("solc");

console.log("Hi")
const compile = () => {
    console.log("hi");
    try {
        //console.log("hi");
        const buildPath = path.resolve(__dirname, "../build");
        fs.removeSync(buildPath);

        const contractPath = path.resolve(__dirname, "../contracts", "AssetTracker.sol");

        console.log("Reading contract file:", contractPath);
        const source = fs.readFileSync(contractPath, "utf8");

        console.log("Compiling contract...");
        const output = solc.compile(source, 1);

        if (output.errors) {
            console.error("Compilation failed:", output.errors);
            return "Contract compilation failed!";
        }

        const contract = output.contracts[":AssetTracker"];
        if (!contract) {
            console.error("No contract found in compilation output");
            return "No contract found in compilation output";
        }

        fs.ensureDirSync(buildPath);
        const outputPath = path.resolve(buildPath, "AssetTracker.json");
        fs.outputJSONSync(outputPath, contract);

        console.log("Contract compiled successfully!");
        return "Contract compiled successfully!";
    } catch (error) {
        console.error("Error during compilation:", error);
        return error;
    }
};
compile();
module.exports = compile;
