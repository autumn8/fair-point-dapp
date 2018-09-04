const { getWeb3, getContractInstance } = require('./helpers');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // import web3 v1.0 constructor
const provider = ganache.provider();
const web3 = new Web3(provider);
const { abi, bytecode } = require('../build/contracts/FairPoint.json');
const getInstance = getContractInstance(web3);

const fileHash =
	'0xc831f48ff2c0a3ffa70380f2bff05f29f37486d896b306dc98a29bfb66c866fb';

const fileHash2 =
	'0xc831f48fa2c0a3ffa70380f2bff05f29f37486d896b306dc98a29bfb66c87495';
const price = web3.utils.toWei('0.2', 'ether');

let accounts, instance, owner;

beforeEach(async () => {
	accounts = await web3.eth.getAccounts();
	[owner, user] = accounts;
	instance = await new web3.eth.Contract(abi)
		.deploy({ data: bytecode })
		.send({ from: accounts[0], gas: '1000000' });
	//instance.setProvider(provider);
});

contract('FairPoint Test', async accounts => {
	it("file creator hash should have no associated creator before it's been added (default 0x0 address)", async () => {
		const file = await instance.methods.files(fileHash).call({
			from: owner
		});
		const actual = file.creator;
		const expected = '0x0000000000000000000000000000000000000000';
		assert.equal(actual, expected);
	});

	it("user should be able to add a file if one doesn't exist", async () => {
		const tx = await instance.methods.addFile(fileHash, price).send({
			from: owner,
			gas: '1000000'
		});
		const file = await instance.methods.files(fileHash).call({ from: owner });
		const actual = file.creator;
		const expected = owner;
		assert.equal(actual, expected);
	});

	it('user should not be able to add a file if it already exists', async () => {
		await instance.methods.addFile(fileHash, price).send({
			from: owner,
			gas: '1000000'
		});

		const differentPrice = web3.utils.toWei('0.4', 'ether');

		try {
			await instance.methods.addFile(fileHash, differentPrice).send({
				from: user,
				gas: '1000000'
			});
			assert(false);
		} catch (err) {
			assert(err);
		}
	});

	it('user should be able to buy a file if it is not already sold', async () => {
		await instance.methods.addFile(fileHash, price).send({
			from: owner,
			gas: '1000000'
		});

		await instance.methods.purchaseFile(fileHash).send({
			from: user,
			value: price,
			gas: '1000000'
		});

		const file = await instance.methods.files(fileHash).call({ from: owner });

		assert.equal(file.buyer, user);
	});
});

//contractInstance.methods.mymethod(param).send({from: address, value: web3.utils.toWei( value, 'ether')})
