function chance(p) {
	if (Math.random() * 100 <= p) {
		return true;
	}
	return false;
}

/**
 * @type {Record<Special.EntityType, Special.EntityType>}
 */
const mutantMap = {
	'minecraft:zombie': 'mutantmonsters:mutant_zombie',
	'born_in_chaos_v1:decaying_zombie': 'mutantmonsters:mutant_zombie',
	'born_in_chaos_v1:barrel_zombie': 'mutantmonsters:mutant_zombie',
	'born_in_chaos_v1:zombie_fisherman': 'mutantmonsters:mutant_zombie',
	'born_in_chaos_v1:zombie_lumberjack': 'mutantmonsters:mutant_zombie',
	'minecraft:skeleton': 'mutantmonsters:mutant_skeleton',
	'born_in_chaos_v1:skeleton_thrasher': 'mutantmonsters:mutant_skeleton',
	'minecraft:enderman': 'mutantmonsters:mutant_enderman',
	'minecraft:creeper': 'mutantmonsters:mutant_creeper',
	'born_in_chaos_v1:phantom_creeper': 'mutantmonsters:mutant_creeper',
}

EntityEvents.checkSpawn(event => {
	const entity = event.getEntity();
	const type = entity.getType();
	if (event.getType().toString() == 'NATURAL' && mutantMap[type]) {
		let server = event.getServer();
		let chapter = parseInt(String(server.persistentData.chapters.current_stage).replace('chapter_', ''));
		if (chapter >= 2) {
			if ((server.isHardcore()) ? chance(1.5) : chance(1)) {
				let level = event.getLevel();
				let pos = entity.blockPosition(); // BlockPos

				// Check a 3x3x4 area to see if blocks are all air
				let clear = true;
				for (let dx = -1; dx <= 1; dx++) {
					for (let dz = -1; dz <= 1; dz++) {
						for (let dy = 0; dy < 4; dy++) {
							let checkPos = pos.offset(dx, dy, dz);
							let block = level.getBlock(checkPos);
							if (!block.id.includes("air")) {
								clear = false;
								break;
							}
						}
						if (!clear) break;
					}
					if (!clear) break;
				}

				// Only spawn if area is clear
				// to prevent suffocating
				if (clear) {
					server.runCommandSilent(
						`summon ${mutantMap[type]} ${event.x} ${event.y} ${event.z}`
					);
					server.scheduleInTicks(1, () => entity.remove("discarded"));
					event.cancel();
				}
			}
		}
	}
})
