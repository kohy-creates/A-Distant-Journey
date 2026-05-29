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

const BossMusicManager = {
	timer: 0,
	interval: 10,
	/**
	 * 
	 * @param {Iterable<Internal.Entity_>} allMobs 
	 * @param {string} bossId 
	 * @param {string} nbtToCheck 
	 */
	addPhase1IfNbt: (allMobs, bossId, nbtToCheck) => {
		for (let entity of allMobs) {
			if (entity.type == bossId) {
				if (entity.nbt[nbtToCheck]) {
					entity.addTag('phase_1');
				}
				else {
					entity.removeTag('phase_1');
				}
			}
		}
	},
	/**
	 * 
	 * @param {Internal.MinecraftServer_} server 
	 * @param {string} dimension 
	 * @returns {Iterable<Internal.Entity_>}
	 */
	getAllMobsIn: (server, dimension) => {
		return server.getLevel(dimension).getAllEntities()
	},
	/**
	 * 
	 * @param {Iterable<Internal.Entity_>} allMobs 
	 * @param {string} id 
	 * @returns {Internal.Entity_[]}
	 */
	getEntitiesWithId: (allMobs, id) => {
		const matches = [];

		for (let entity of allMobs) {
			if (entity.type == id) {
				matches.push(entity);
			}
		}

		return matches;
	}
};

ServerEvents.tick(event => {
	BossMusicManager.timer++;
	if (BossMusicManager.timer == BossMusicManager.interval) {
		BossMusicManager.timer = 0;
		const server = event.getServer();
		if (server.persistentData.witherStormActive) {
			/** @type {Internal.Entity_} */
			let commandBlock;
			for (let entity of BossMusicManager.getAllMobsIn(server, 'witherstormmod:bowels')) {
				if (entity.type == 'witherstormmod:command_block') {
					commandBlock = entity;
					break;
				}
			}
			if (commandBlock) {
				let currentPhase = commandBlock.nbt.BossfightManager.CurrentPhase;
				if (currentPhase >= 1) {
					commandBlock.addTag('phase_1');
				}
			}
		}

		const netherMobs = BossMusicManager.getAllMobsIn(server, 'minecraft:the_nether');
		BossMusicManager.addPhase1IfNbt(netherMobs, 'cataclysm:netherite_monstrosity', 'is_Awaken');

		const overworldMobs = BossMusicManager.getAllMobsIn(server, 'minecraft:overworld');
		BossMusicManager.addPhase1IfNbt(overworldMobs, 'cataclysm:the_harbinger', 'is_act');

		const aetherMobs = BossMusicManager.getAllMobsIn(server, 'aether:the_aether');
		for (let aerwhaleKing of BossMusicManager.getEntitiesWithId(aetherMobs, 'lost_aether_content:aerwhale_king')) {
			if (aerwhaleKing.isBossFight()) {
				aerwhaleKing.addTag('phase_1');
			}
			else {
				aerwhaleKing.removeTag('phase_1');
			}
		}

		const skylandsMobs = BossMusicManager.getAllMobsIn(server, 'rediscovered:skylands');
		for (let redDragon of BossMusicManager.getEntitiesWithId(skylandsMobs, 'rediscovered:red_dragon')) {
			let PylonChargeTime = redDragon.nbt.PylonChargeTime;
			if (PylonChargeTime <= 0) {
				redDragon.addTag('phase_1');
			}
		}
	}
});

const $AetherBossFightStart = Java.loadClass('com.aetherteam.aether.event.BossFightEvent$Start');
NativeEvents.onEvent($AetherBossFightStart, /** @param {Internal.BossFightEvent$Start_} event */ event => event.getEntity().addTag('phase_1'));

const $AetherBossFightStop = Java.loadClass('com.aetherteam.aether.event.BossFightEvent$Stop');
NativeEvents.onEvent($AetherBossFightStop, /** @param {Internal.BossFightEvent$Stop_} event */ event => event.getEntity().removeTag('phase_1'));
