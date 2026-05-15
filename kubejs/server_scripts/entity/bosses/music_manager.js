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
	let netheriteMonstrosity;
	for (let entity of event.getServer().getLevel('minecraft:the_nether').getAllEntities()) {
		if (entity.type == 'cataclysm:netherite_monstrosity') {
			netheriteMonstrosity = entity;
			break;
		}
	}
	if (netheriteMonstrosity) {
		let isAwoken = netheriteMonstrosity.nbt.is_Awaken;
		if (isAwoken) {
			netheriteMonstrosity.addTag('phase_1')
		}
	}
	let theHarbinger;
	for (let entity of event.getServer().getLevel('minecraft:overworld').getAllEntities()) {
		if (entity.type == 'cataclysm:the_harbinger') {
			theHarbinger = entity;
			break;
		}
	}
	if (theHarbinger) {
		let isAwoken = theHarbinger.nbt.is_act;
		if (isAwoken) {
			theHarbinger.addTag('phase_1')
		}
	}
});
