SummoningRituals.start(event => {
	const dimension = event.getLevel().getDimensionKey().location().toString()
	const pos = event.getPos();
	event.getServer().runCommandSilent(
		`/execute in ${dimension} positioned ${pos.x} ${pos.y} ${pos.z} run function adj:twilight_altar/spawn`
	)
});

SummoningRituals.complete(event => {
	const dimension = event.getLevel().getDimensionKey().location().toString()
	const pos = event.getPos();
	event.getServer().runCommandSilent(
		`/execute in ${dimension} positioned ${pos.x} ${pos.y} ${pos.z} run function adj:twilight_altar/stop`
	)
});
