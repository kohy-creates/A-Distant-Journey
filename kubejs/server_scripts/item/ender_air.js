ItemEvents.rightClicked('glass_bottle', event => {
	const player = event.getPlayer();

	console.log()
	if (global.getBiome(player) === 'minecraft:warped_forest') {
		const stack = event.getItem();

		player.swing("main_hand", true);

		player.give(Item.of('botania:ender_air_bottle'));
		stack.shrink(1);

		player.level.playSound(null, player.block.pos.above(), 'minecraft:item.bottle.fill_dragonbreath', 'players');
	}

})
