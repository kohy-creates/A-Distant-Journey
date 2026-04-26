ServerEvents.loaded(event => {
	const server = event.getServer();

	server.runCommandSilent('scoreboard players set .wither_rework.config.WitherGriefing c.int.0 0');
	server.runCommandSilent(`/scoreboard players set dragonhealth trueEnding_settings ${global.hpModifications['minecraft:ender_dragon'][0]}`);

	server.runCommandSilent('/scoreboard objectives add KJ_WSPhase dummy');
	server.runCommandSilent('/scoreboard objectives add KJ_PlayingDead dummy');
});
