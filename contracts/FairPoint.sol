pragma solidity 0.5.0;

import "./SafeMath.sol";

contract FairPoint {

    using SafeMath for uint256;

    address public owner;

    struct File {
        uint256 price;
        address creator;
        address buyer;
    }

    mapping (address => uint256) private balances;

    mapping (bytes32 => File) public files;

    event FilePurchased(
        address creator,
        address buyer,
        bytes32 fileName
    );

    constructor() public{
        owner = msg.sender;
    }

    function addFile(bytes32 fileName, uint256 price) public {
        File storage file = files[fileName];
        require(file.creator == address(0), "must be a new file- ie. have no existing creator address");
        require(price != 0, "must specify a price");
        files[fileName] = File(price, msg.sender, address(0));
    }

    function purchaseFile(bytes32 fileName) public payable {
        File storage file = files[fileName];
        require(file.creator != address(0), "must be an existing file- ie. have a creator address");
        require(file.buyer == address(0), "file is already sold");
        require(msg.value >= file.price, "sufficient funds need to be sent to pay for the file");
        balances[file.creator] = balances[file.creator].add(msg.value);
        file.buyer = msg.sender;
        emit FilePurchased(file.creator, file.buyer, fileName);
    }

    function withdrawFunds(uint256 amount) public {
        balances[msg.sender] = balances[msg.sender].sub(amount);
        msg.sender.transfer(amount);
    }

    function getBalance()  public view returns (uint256) {
        return balances[msg.sender];
    }
}
