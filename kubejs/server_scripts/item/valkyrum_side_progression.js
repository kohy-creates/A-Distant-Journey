EntityEvents.death('aether:valkyrie_queen', event => {
	const server = event.getServer();
	if (!server.persistentData.valkyrumUnlocked) {
		server.persistentData.valkyrumUnlocked = true;
		global.broadcast(server, global.announcementMsg('The depths of The Aether have been blessed with Valkyrum', global.messageColors.newOre))
	}
})
