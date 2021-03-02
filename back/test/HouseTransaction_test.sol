// SPDX-License-Identifier: GPL-3.0
    
pragma solidity >=0.4.22 <0.8.0;
import "remix_tests.sol"; // this import is automatically injected by Remix.
import "remix_accounts.sol";
import "../5block/HouseTransaction.sol";

// File name has to end with '_test.sol', this file can contain more than one testSuite contracts
contract HouseTransactionTest is HouseTransaction {
    address acc0;
    address acc1;
    
    uint houseId = 0;
    
    function beforeAll() public {
        acc0 = TestsAccounts.getAccount(0); 
        acc1 = TestsAccounts.getAccount(1);
    }
    
    /// Test if value is set as expected
    function createHouseTest() public returns (bool) {
        createHouse(
            "houseName",
            "houseDescription",
            "houseAddress",
            false,
            10,
            4,
            50
        );
        
        return Assert.equal(houses.length, 1, "no house created");
    }
    
    function createHouseTest2() public returns (bool) {
        createHouse(
            "houseName2",
            "houseDescription",
            "houseAddress",
            false,
            10,
            4,
            50
        );
        
        return Assert.equal(houses.length, 2, "no house created");
    }
    
    function getBalanceOfAcc0() public returns (bool) {
        return Assert.equal(balanceOf(acc0), 2, "balanceOf problem");
    }
    
    function getBalanceOfAcc1() public returns (bool) {
        return Assert.equal(balanceOf(acc1), 0, "balanceOf problem");
    }
    
    function checkCurrUser() public returns (bool) {
        return Assert.equal(msg.sender, acc0, "balanceOf problem");
    }
    
    function setOnSaleTest() public returns (bool) {
        setOnSale(houseId, true);
        return Assert.equal(houses[houseId].onSale, true, "setOnSale not working");
    }
    
    /// #value: 2000000000000000
    /// #sender: account-1
    function testTransfer() public returns (bool) {
        safeTransferFrom(acc0, acc1, houseId);
        
        return Assert.equal(balanceOf(acc1), 1, 'value should be 100');
    } 

}
