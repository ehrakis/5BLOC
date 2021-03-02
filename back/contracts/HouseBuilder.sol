pragma solidity >=0.7.0 <0.8.0;

import "./SafeMath.sol";
import "./Ownable.sol";
import "./SafeMath8.sol";
import "./SafeMath16.sol";
import "./SafeMath64.sol";

contract HouseBuilder is Ownable{
    
    using SafeMath for uint256;
    using SafeMath64 for uint64;
    using SafeMath16 for uint16;
    using SafeMath8 for uint8;
    
    struct House {
       string name;
       string description;
       string houseAddress;
       string image;
       bool onSale;
       uint64 price;
       uint16 nbRoom;
       uint16 meterSquarre;
    }
    
    event NewHouse(uint houseId, string name, uint64 price);
    
    mapping (uint => address) public housesToOwner;
    mapping (address => uint) ownerHousesCount;
    
    House[] public houses;
    
    modifier onlyOwnerOf(uint _houseId) {
        require(msg.sender == housesToOwner[_houseId]);
        _;
    }
    
    function createHouse(
        string memory _name,
        string memory _description,
        string memory _houseAddress,
        string memory _image,
        bool _onSale,
        uint64 _price,
        uint16 _nbRoom,
        uint16 _meterSquarre
    ) public {
        
        houses.push(House(
            _name,
            _description,
            _houseAddress,
            _image,
            _onSale,
            _price,
            _nbRoom,
            _meterSquarre
        ));
        
        uint id = houses.length - 1;
        
        housesToOwner[id] = msg.sender;
        ownerHousesCount[msg.sender] = ownerHousesCount[msg.sender].add(1);
        emit NewHouse(id, _name, _price); //TODO voir avec Clément pour les events
        
    }
    
    function getHouseIds(address _owner) public view returns (uint[] memory){
        uint[] memory housesId = new uint[](ownerHousesCount[_owner]);
        uint count = 0;
        for(uint i = 0; i < houses.length; i = i.add(1)){
            if(housesToOwner[i] == _owner){
                housesId[count] = i;
                count.add(1);
            }
        }
        
        return housesId;
    }

    function getHouseById(uint _houseId) public view returns (
        uint,
        string memory,
        string memory,
        string memory,
        string memory,
        bool,
        uint64,
        uint16,
        uint16
    ){
        House memory house = houses[_houseId];
        return (_houseId,
        house.name,
        house.description,
        house.houseAddress,
        house.image,
        house.onSale,
        house.price,
        house.nbRoom,
        house.meterSquarre);
    }

    function getHousesLength() public view returns (uint){
        return houses.length;
    }
}