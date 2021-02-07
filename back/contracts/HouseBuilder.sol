pragma solidity >=0.7.0 <0.8.0;

import "./SafeMath.sol";
import "./Ownable.sol";

contract HouseBuilder is Ownable{
    
    using SafeMath for uint256;
    using SafeMath64 for uint64;
    using SafeMath16 for uint16;
    using SafeMath8 for uint8;
    
    struct House {
       string name;
       string description;
       string houseAddress;
       string powerDiagnosis;
       string gasDiagnosis;
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
        string memory _powerDiagnosis,
        string memory _gasDiagnosis,
        bool _onSale,
        uint64 _price,
        uint16 _nbRoom,
        uint16 _meterSquarre
    ) external {
        
        houses.push(House(
            _name,
            _description,
            _houseAddress,
            _powerDiagnosis,
            _gasDiagnosis,
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
}