# fair-point-client

## Project setup

```
npm install
```

##Requirements
Currently this dapp requires the user to have metamask installed. A prompt to this effect will be added later, as well as uport functionality once UPORT play's nicely with web3 v1.

## Basic Flow

1.  **User A** uploads a high res original file (that is available for purchase), a lower res preview image, and specifies price for item (in ether. A ZAR convenience exchange rate is provided).
2.  The files are uploaded a to a node server where the original file (primary) is encrypted, a thumbnnail image is generated & the encrypted original, preview and thumbnail are all added to IPFS.
3.  An orbitDB entry is created which stores reference to the various images with some additional info about the primary image. The `_id` key is a bytes32 representation of the primary IPFS hash.
4.  On successful addition to IPFS, the file is added to an ethereum smart contract which holds information pertaining to the actual payment of the file (file creator, buyer, and price).
5.  After files have been added to IPFS and ethereum smart contract, as purchase URL is generated which can be sent to user B (mail fuctionality to be added later).
6.  On navigation to purchase page, **user B** is prompted for payment.
7.  After successful, payment a download button is displayed.
8.  Clicking download button prompts **user B** to sign a message. This signature is sent to backend where the public key is recovered from the signature.
9.  The node app queries the ethereum smart contract and if the user who signed the download message is also registered as the buyer on the contract, the encrypted file is retrieved from IPFs, decrypted and streamed to the client for download.

##contract
To run locally. Install ganache & truffle.
Start ganache.

Run **npm run serve**, but make sure it's running on port 8080. ie. start it before starting the fair point node service, or hot reloads won't work.

1.  Run 'truffle compile' & 'truffle migrate'. Later if changes are made and the contract redeployed, run 'truffle migrate --reset' . Note the deployed contract address and update the contractInstance address. This address also needs to be updated in the fair point server app. TODO - create build script too handle this

2. Web3 instance & contractInstance's are spun up on client launch and before vue
