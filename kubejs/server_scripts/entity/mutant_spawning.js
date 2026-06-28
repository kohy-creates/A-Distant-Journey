const MutantMonsters = {
	mutantMap: {
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
}

EntityEvents.checkSpawn(event => {
	const entity = event.getEntity();
	const type = entity.getType();
	if (event.getType().toString() == 'NATURAL' && MutantMonsters.mutantMap[type]) {
		let server = event.getServer();
		let chapter = parseInt(String(server.persistentData.chapters.current_stage).replace('chapter_', ''));

		let shouldReplaceSpawn;
		if (chapter >= 2) {
			shouldReplaceSpawn = (server.isHardcore()) ? global.ifRandomChance(1.5) : global.ifRandomChance(0.75);
		}
		else if (server.isHardcore()) {
			shouldReplaceSpawn = (chapter == 1) ? global.ifRandomChance(0.75) : global.ifRandomChance(0.25);
		}

		if (shouldReplaceSpawn) {
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
					`execute in ${event.level.dimension.toString()} run summon ${MutantMonsters.mutantMap[type]} ${event.x} ${event.y} ${event.z}`
				);

				let nearestPlayer = event.level.getNearestPlayer(entity, 128);
				if (nearestPlayer && Math.abs(event.y - nearestPlayer.y) <= 10) {
					let spawnMsgs = [
						"A mutant monster has appeared nearby...",
						"A powerful mutant monster has risen nearby...",
						"A champion has appeared..."
					];

					let randomMsg = spawnMsgs[Math.floor(Math.random() * spawnMsgs.length)];
					server.runCommandSilent(
						`/execute in ${event.level.dimension.toString()} run eta queue @a[distance=0..] status_messages "<dur:100><color col=FFEE45><shadow c=C28C29>[fade in=10 out=10]<typewriter speed=14>[anchor value=BOTTOM_CENTER][align value=CENTER>[offset x=0 y=-85]${randomMsg}"`
					);
					server.scheduleInTicks(1, () => entity.remove("discarded"));
					event.cancel();
				}
			}
		}
	}
});

