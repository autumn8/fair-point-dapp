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
});

export { node, db };
