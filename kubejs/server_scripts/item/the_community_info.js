NetworkEvents.dataReceived('the_community_info', event => {
	const player = event.getPlayer();
	const server = event.getServer();

	const serverData = server.persistentData.killedBosses || {};
	const killed = Object.keys(serverData).length;

	player.sendData('the_community_info', {
		killed: killed,
	});
});
