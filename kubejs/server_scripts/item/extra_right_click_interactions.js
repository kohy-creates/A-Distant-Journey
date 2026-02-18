ItemEvents.rightClicked(event => {

	const item = event.getItem();
	const id = item.getId();
	const player = event.getPlayer();

	switch (id) {
		case 'ars_nouveau:greater_experience_gem':
		case 'ars_nouveau:experience_gem': {
			if (player.getXpLevel() === 50) {
				event.cancel();
			}
			player.swing(event.getHand(), true)
			player.level.playSound(null, player.getPos(), 'minecraft:block.amethyst_cluster.break', 'neutral');
			break;
		}

		case 'minecraft:glass_bottle': {
			if (global.getBiome(player) === 'minecraft:warped_forest' && !player.isShiftKeyDown()) {

				player.swing("main_hand", true);

				player.give(Item.of('botania:ender_air_bottle'));
				item.shrink(1);

				player.level.playSound(null, player.x, player.y + player.eyeHeight, player.z, 'minecraft:item.bottle.fill_dragonbreath', 'players', 1, 1);
			}
			break;
		}

		case 'evilcraft:vengeance_ring': {
			if (player.isShiftKeyDown()) {
				event.cancel();
			}
			break;
		}
	}
})
