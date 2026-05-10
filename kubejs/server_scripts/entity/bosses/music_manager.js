EntityEvents.spawned(event => {
	const entity = event.getEntity();
	const type = entity.type;

	if (global.bossMobs.includes(type)) {
		entity.addTag('phase_0');
		if (type === 'witherstormmod:withered_symbiont' && entity.level.dimension.toString() === 'minecraft:overworld') {
			entity.addTag('phase_1');
		}
	};
});

ServerEvents.tick(event => {
	const server = event.getServer();
	if (server.persistentData.witherStormActive) {
		/** @type {Internal.Entity_} */
		let commandBlock;
		for (let entity of event.getServer().getLevel('witherstormmod:bowels').getAllEntities()) {
			if (entity.type == 'witherstormmod:command_block') {
				commandBlock = entity;
				break;
			}
		}
		if (commandBlock) {
			let currentPhase = commandBlock.nbt.BossfightManager.CurrentPhase;
			if (currentPhase >= 1) {
				commandBlock.addTag('phase_1')
			}
		}
	}
})

EntityEvents.hurt('cataclysm:netherite_monstrosity', event => {
	event.getEntity().addTag('phase_1');
});
