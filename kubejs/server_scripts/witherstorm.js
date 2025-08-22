ServerEvents.loaded(event => {
	event.getServer().runCommandSilent('/scoreboard objectives add KJ_WSPhase dummy')
	event.getServer().runCommandSilent('/scoreboard objectives add KJ_PlayingDead dummy')
})
EntityEvents.spawned(event => {
	const entity = event.getEntity();
	if (entity.getType() === 'witherstormmod:wither_storm') {
		event.getServer().persistentData.witherStormActive = true;
		event.getServer().runCommandSilent('/attribute @w witherstormmod:evolution_speed base set 1.66')
	}
})
EntityEvents.death(event => {
	if (entity.getType() === 'witherstormmod:wither_storm') {
		event.getServer().persistentData.witherStormActive = false;
	}
})

let tickCount = 0;
const phaseMonitorEveryNTicks = 100;
ServerEvents.tick(event => {
	const server = event.getServer()
	if (server.persistentData.witherStormActive) {
		tickCount++;
		if (tickCount >= phaseMonitorEveryNTicks) {
			tickCount = 0;
			server.runCommandSilent('/execute store result score $WSPhase KJ_WSPhase run data get entity @w Phase')
			let phase = server.scoreboard.getOrCreatePlayerScore("$WSPhase", server.scoreboard.getObjective("KJ_WSPhase")).getScore();
			/**
			 * @type {Internal.Entity}
			 */
			let witherStorm
			let entities = event.getServer().getEntities()

			for (let entity of entities) {
				if (entity.getType().toString() === 'witherstormmod:wither_storm') {
					witherStorm = entity;
					break;
				}
			}
			console.log(witherStorm)
			if (phase == 6.0) {
				server.runCommandSilent('/execute store result score $WSPhase KJ_WSPhase run data get entity @w ')
			}
			console.log(phase)
			if (phase == 0) {
				server.persistentData.witherStormActive = false;
			}
		}
	}
})
