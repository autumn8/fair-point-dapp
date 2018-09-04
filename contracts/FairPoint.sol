pragma solidity 0.4.24;

contract FairPoint {

    struct File {
        uint price;
        address creator;
        address buyer;
    }

    mapping (bytes32 => File) public files;

    event PaymentSent(
        address creator,
        uint amount
    );

    event FilePurchased(
        address buyer,
        bytes32 fileName
    );

    /*
    Not possible to check for fileName by key & since creator is set when file
    is first added, we'll check to see if creator has been set, which
    we can take to mean that the file already exists.
    */
    function addFile(bytes32 fileName, uint price) public {

        File storage file = files[fileName];
        require(file.creator == address(0), 'must be a new file- ie. have no existing creator address');
        require(price != 0, 'must specify a price');
        files[fileName] = File(price, msg.sender, address(0));
    }

    function purchaseFile(bytes32 fileName) public payable {

        File storage file = files[fileName];
        bool isFileAvailable = file.buyer == address(0);
        require(file.creator != address(0), 'must be an existing file- ie. have a creator address');
        require(isFileAvailable, 'file is already sold');
        require(msg.value >= file.price, 'sufficient funds need to be sent to pay for the file');

        file.buyer = msg.sender;
        emit FilePurchased(file.buyer, fileName);
        if (file.creator.send(msg.value)) {
          emit PaymentSent(file.creator, msg.value);
        }
        //else add to withdrawal account & dispatch appropriate event;

    }

}
