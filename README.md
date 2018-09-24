# fair-point-client

## Project setup

```
npm install
```

Note: This is a very very early alpha iteration!

## Basics

This is a utility for designers to easily make file available to a clients where payment is required before the files is available for download.

1.  The designer uploads the original high res (primary), a low res preview image and specifies a price for the file.
2.  A purchase URL is generated.
3.  Client visits purchase URL, pays for file (in ether. Sorry no fiat payments) & is immediately able to download the unencrypted file.

## Flow

1.  User A uploads a high res original file (that is available for purchase), a lower res preview image, and specifies price for item (in ether. A ZAR convenience exchange rate is provided).
2.  The files are uploaded a to a node server where the original file (primary) is encrypted, a thumbnnail image is generated & all 3 images are added to IPFS.
3.  An orbitDB entry is created which stores the IPFS primary, preview & thumbnnail hashes. The `_id` key is a bytes32 representation of the primary IPFS hash.
4.  On successful addition to IPFS, the file is added to an ethereum smart contract which maintains information pertaining to the actual payment of the file (file creator, buyer, and price).
5.  After files have been added to IPFS and ethereum smart contract, as purchase URL is generated which can be sent to user B (mail to fuctionality to be added later).
6.  On navigation to purchase page, user B is prompted for payment.
7.  After successful, payment a download button is displayed.
8.  Clicking download button prompts user B to sign a message. This signature is sent to backend where the public key is recovered from the signature.
9.  Backend queries smart contract and if user who signed the download message is also registered as the buyer on the contract,
    the encrypted file is retrieved from IPFs, decrypted and streamed to the client for download.
