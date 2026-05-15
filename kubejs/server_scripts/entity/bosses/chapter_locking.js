BlockEvents.rightClicked('command_block', event => {
	const player = event.getPlayer();
	if (event.getItem().id == 'minecraft:wither_skeleton_skull' && !player.stages.has('chapter_5')) {
		player.displayClientMessage(Component.literal('It pops back off, away from the block...').red(), true);
		event.cancel();
	}
});

EntityEvents.spawned('cataclysm:netherite_monstrosity', event => {
	const chapter = global.getCurrentChapter(event.getServer());
	const entity = event.getEntity();
	let nbt = entity.nbt
	if (chapter >= 3) {
		nbt.NoAI = false;
	}
	else {
		nbt.NoAI = true;
		nbt.is_Awaken = false;
	}
	entity.setNbt(nbt);
});

EntityEvents.hurt('cataclysm:netherite_monstrosity', event => {
	const attacker = event.getSource().getActual();
	if (attacker) {
		if (attacker.isPlayer()) {
			if (!attacker.stages.has('chapter_3')) {
				attacker.displayClientMessage(Component.literal('It doesn\'t seem to be active at all...').red(), true)
				event.cancel();
			}
		}
		else {
			event.cancel()
		}
	}
});
