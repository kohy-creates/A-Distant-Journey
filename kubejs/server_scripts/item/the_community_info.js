NetworkEvents.dataReceived('the_community_info', event => {
	event.getPlayer().sendData('the_community_info', {
		killed: global.getKilledBosses(event.getServer(), true),
	});
});
