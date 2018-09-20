function __(promise) {
	return promise
		.then(data => ({ error: null, data }))
		.catch(error => ({ error, data: null }));
}

// async function runAsync() {
//   const {data, error} = await __(asyncRequest());
//   if (error) return console.error('error:', error);
//   console.log('data:', data);
// }

export { __ };
