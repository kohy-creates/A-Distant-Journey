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

		case 'crittersandcompanions:clam': {
			player.give(global.weightedRandom({
				'air': 30,
				'hybrid_aquatic:pearl': 6,
				'hybrid_aquatic:black_pearl': 3,
				'alexscaves:pearl': 1
			}));
			player.swing(event.getHand(), true);
			player.level.playSound(null, player.x, player.y, player.z, 'minecraft:entity.turtle.egg_crack', 'players', 0.5, Math.random() * 0.2 + 1.05);
			item.shrink(1);
			break;
		}

		// case 'born_in_chaos_v1:sea_terror_stomach': {
		// 	if (player.getCooldowns().isOnCooldown(item.id)) return;
		// 	let amount = global.getRandomInt(2, 4);
		// 	let loot = {
		// 		'air': 20,
		// 		'salmon': 30,
		// 		'cod': 40,
		// 		'kelp': 35,
		// 		'stick': 15,
		// 		'iron_ingot': 10,
		// 		'gold_ingot': 4,
		// 	};
		// 	for (let i = 0; i < amount; i++) {
		// 		player.give(global.weightedRandom(loot));
		// 	}
		// 	event.cancel();
		// }
	}
})
