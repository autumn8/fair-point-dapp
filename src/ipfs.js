const IPFS = require('ipfs');
const OrbitDB = require('orbit-db');

const ipfsOptions = {
	EXPERIMENTAL: {
		pubsub: true
	},
	config: {
		Addresses: {
			Swarm: [
				// Use IPFS dev signal server
				// '/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star',
				'/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
				// Use local signal server
				// '/ip4/0.0.0.0/tcp/9090/wss/p2p-webrtc-star',
			]
		}
	}
};

let db;
const dbAddress =
	'/orbitdb/QmXFu7nBDqq8k8sbvxHXuRxqv2CCzBeUpABzW3Jv2ae25h/autumn8.fairpoint';

const node = new IPFS(ipfsOptions);

node.on('ready', async () => {
	console.log('ipfs node ready');

	const nodeID = await node.id();
	console.log(`Node ID: ${nodeID.id}`);
	const orbitdb = new OrbitDB(node);
	db = await orbitdb.docs(dbAddress);
	db.events.on('replicated', () => {
		console.log('replicated');
		const all = db.query(doc => doc._id);
		console.log(all);
	});

	db.events.on('replicate.progress', () => {
		console.log('replicated');
		const all = db.query(doc => doc._id);
		console.log(all);
	});

	// Hook up to the load progress event and render the progress
	let maxTotal = 0,
		loaded = 0;
	db.events.on('load.progress', (address, hash, entry, progress, total) => {
		loaded++;
		maxTotal = Math.max.apply(null, [progress, maxTotal, progress, 0]);
		total = Math.max.apply(null, [progress, maxTotal, total, 0]);
		console.log(`Loading database... ${maxTotal} / ${total}`);
	});

	db.events.on('ready', () => {
		console.log('ready');
		const all = db.query(doc => doc._id);
		console.log(all);
	});
	//const all = db.query(doc => doc._id);
	//console.log(all);
});

export { node, db };
