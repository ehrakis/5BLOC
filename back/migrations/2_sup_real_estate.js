const HouseBuilder = artifacts.require("HouseBuilder.sol");
const HouseTransaction = artifacts.require("HouseTransaction.sol");
const Ownable = artifacts.require("Ownable.sol");
const SafeMath = artifacts.require("SafeMath.sol");
const SafeMath8 = artifacts.require("SafeMath8.sol");
const SafeMath16 = artifacts.require("SafeMath16.sol");
const SafeMath64 = artifacts.require("SafeMath64.sol");

module.exports = function (deployer) {
    deployer.deploy(HouseBuilder);
    deployer.deploy(HouseTransaction);
    deployer.deploy(Ownable);
    deployer.deploy(SafeMath);
    deployer.deploy(SafeMath8);
    deployer.deploy(SafeMath16);
    deployer.deploy(SafeMath64);
};
