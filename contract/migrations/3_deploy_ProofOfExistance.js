var ProofOfExistence = artifacts.require("./ProofOfExistence.sol");
var ProofOfExistence2 = artifacts.require("./ProofOfExistence2.sol");
var ProofOfExistence3 = artifacts.require("./ProofOfExistence3.sol");
module.exports = function(deployer) {
  deployer.deploy(ProofOfExistence);
  deployer.deploy(ProofOfExistence2);
  deployer.deploy(ProofOfExistence3);
};