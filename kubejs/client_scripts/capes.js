CapeJS.addCapes(event => {
	let capeData = JsonIO.read('kubejs/assets/capedb.json');
	if (capeData) {
		for (let capeType in capeData) {
			let uuidList = capeData[capeType];
			uuidList.forEach(uuid => {
				event.register(uuid, capeType);
			});
		}
	}
});
