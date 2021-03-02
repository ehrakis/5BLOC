pragma solidity >=0.7.0 <0.8.0;

import "./HouseBuilder.sol";

contract HouseTransaction is HouseBuilder {
    
    uint8 commission = 10;
    
    using SafeMath for uint256;
    
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    
    //TODO implementer comission
    function safeTransferFrom(address _from, address _to, uint256 _tokenId) public payable{
        House memory house = houses[_tokenId];
        require (housesToOwner[_tokenId] == msg.sender || house.onSale == true);
        require (msg.value >= house.price);

        payable(_from).transfer((msg.value*(100-commission))/100);
        
        ownerHousesCount[_to] = ownerHousesCount[_to].add(1);
        ownerHousesCount[_from] = ownerHousesCount[msg.sender].sub(1);
        
        housesToOwner[_tokenId] = _to;
        
        emit Transfer(_from, _to, _tokenId);
    }
    
    function balanceOf(address _owner) public view returns (uint256) {
        return ownerHousesCount[_owner];
    }
    
    function ownerOf(uint256 _tokenId) public view returns (address) {
        return housesToOwner[_tokenId];
    }
    
    function setOnSale(uint _houseId, bool _onSale) public onlyOwnerOf(_houseId) {
        houses[_houseId].onSale = _onSale;
    }
    
    function getOnSale(uint _houseId) public view returns (bool) {
        return houses[_houseId].onSale;
    }
    
    function withdraw() public onlyOwner {
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }
}