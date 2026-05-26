EntityEvents.spawned(event => {
	const entity = event.getEntity();
	const server = event.getServer();

	const bossesSkipMessages = [
		'witherstormmod:command_block',
		'cataclysm:netherite_monstrosity',
		'aether:slider',
		'aether:valkyrie_queen',
		'aether:sun_spirit',
		'ancient_aether:mutated_aechor_plant',
		'lost_aether_content:aerwhale_king',
		'rediscovered:red_dragon'
	];

	if (global.bossMobs.includes(entity.getType()) && !bossesSkipMessages.includes(entity.getType()) && !entity.tags.toArray().includes('adj.announced_spawn')) {
		global.broadcast(server, global.announcementMsg(`${entity.getDisplayName().getString()} has awoken!`, global.messageColors.bossSpawned, true));
		entity.addTag('adj.announced_spawn');
	}
});

EntityEvents.death(event => {
	const entity = event.getEntity();
	if (global.bossMobs.includes(entity.getType())) {
		const server = event.getServer();
		global.broadcast(server, global.announcementMsg(`${entity.getDisplayName().getString()} has been defeated!`, global.messageColors.bossDefeated, true));
	}
});
