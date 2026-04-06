const WorldSizeLimit = {
	/**
	 * @param {Internal.MinecraftServer_} server 
	 * @param {number} size 
	 */
	limitSize: function (server, size) {
		const borderSize = WorldSizeLimit.SIZES[size];
		if (borderSize != -1) {
			server.getPersistentData().hasSetBorderLimits = true;
			server.getAllLevels().forEach(level => {
				const blockRatio = level.dimensionType().coordinateScale();

				const border = level.getWorldBorder();
				border.setCenter(0, 0);
				border.setWarningBlocks(0)
				border.setSize(borderSize / blockRatio);
			});
		}
		else {
			console.log('World size chosen is infinite, not shrinking any borders');
		}
	},

	SIZES: {
		'infinite': -1,
		'20k': 20000,
		'10k': 10000,
		'5k': 5000
	},
}

PlayerEvents.loggedIn(event => {
	const server = event.getServer();
	if (server.isSingleplayer() && !server.persistentData.hasSetBorderLimits) {
		console.log('World had not underwent border sets');
		console.log('Checking and setting border sizes in Singleplayer...');
		let player = event.getPlayer();
		console.log('Asking client for world size data...');
		player.sendData('get_world_size_var');
	}
});

NetworkEvents.dataReceived('get_world_size_var_server', event => {
	console.log('Received world size data from client')
	WorldSizeLimit.limitSize(event.getServer(), event.getData().borderSize);
});


ServerEvents.loaded(event => {
	const server = event.getServer();
	if (server.isDedicated()) {
		console.log('Server had not underwent border sets');
		console.log('Checking and setting border sizes in Multiplayer...');
		try {
			let finalSize;
			const worldSize = JsonIO.read('world_size.json').worldSize;
			if (Object.keys(WorldSizeLimit.SIZES).includes(worldSize)) {
				finalSize = WorldSizeLimit.SIZES[worldSize];
			}
			else {
				console.log(`Unusual size, detected (${worldSize}), falling back to 20k x 20k`);
				console.log(`Accepted size types are: ${Object.keys(WorldSizeLimit.SIZES)}`);
				finalSize = WorldSizeLimit.SIZES["20k"];
			}
			WorldSizeLimit.limitSize(server, finalSize);
		}
		catch (e) {
			console.log('File world_size.json not found or could not be read, treating it as infinite');
			console.log('If you believe this is a bug, you can do \'/kubejs persistent_data server merge {hasSetBorderLimits:false}\' and restart the server');
		}
	}
});
