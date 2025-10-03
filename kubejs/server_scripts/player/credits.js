ItemEvents.pickedUp(event => {
	if (event.getItem().getId() !== 'structure_gel:building_tool') return;

	const server = event.getServer();

	if (!server.persistentData.hasShownCredits) {
		server.persistentData.hasShownCredits = true;

		const pos = event.getPlayer().getBlock().getPos();

		const x = pos.x;
		const y = pos.y;
		const z = pos.z;

		server.runCommand(
			`/execute in ${event.getLevel().getDimension()} positioned ${x} ${y} ${z} as @a[distance=..24] run credits @s`
		)
	}
})
