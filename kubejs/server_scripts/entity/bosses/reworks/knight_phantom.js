BlockEvents.broken(event => {
	const level = event.getLevel();
	if (level.dimension.toString() === 'twilightforest:twilight_forest') {
		const block = event.getBlock();
		if (block.getId() === 'minecraft:iron_bars') return;

		const kuLevel = new Ku.Level(level);
		const player = event.getPlayer();

		if (!player.isAdvancementDone('adj:twilight_forest/part_2_75')
			&& kuLevel.isStructureAtLocation(block.pos, 'twilightforest:knight_stronghold')
			&& block.pos.y <= 1) {
			player.displayClientMessage(Text.red('Strong magic aura prevents this block from breaking'), true);
			event.cancel();
		}
	}
});
