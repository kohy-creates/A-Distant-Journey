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
			player.level.playSound(null, player.x, player.y, player.z, 'minecraft:entity.turtle.egg_crack', 'players', 0.5, global.getRandomNumber(1.05, 1.25));
			item.shrink(1);
			break;
		}

		case 'kubejs:bandage':
		case 'kubejs:golden_bandage': {
			const player = event.getPlayer();
			const raycastTarget = event.getTarget();
			let healTarget;
			if (raycastTarget && raycastTarget.entity) {
				healTarget = raycastTarget.entity;
			}
			else {
				healTarget = player;
			}
			if (healTarget.getHealth() == healTarget.getMaxHealth()) return;
			healTarget.heal(id == 'kubejs:golden_bandage' ? 5.0 : 2.001);
			healTarget.removeEffect('majruszsdifficulty:bleeding');
			player.addItemCooldown(item.getItem(), 5);
			item.shrink(1);
			break;
		}

		case 'kubejs:chalice_of_blood': {
			function getDamage(x) {
				return 15 + 8.5 * Math.pow(x, 2);
			}
			let RANDOM_BOUNDS = [0.9, 1.25];

			let nbt = item.getNbt();
			if (!nbt) {
				nbt = {};
			}
			if (!nbt.adj_chalice_blood_amount) {
				nbt.adj_chalice_blood_amount = 0;
			}
			let lvl = nbt.adj_chalice_blood_amount;
			if (lvl >= 10) return;

			let server = event.getServer();

			let damage = getDamage(lvl);
			let minAmount = Math.ceil(RANDOM_BOUNDS[0] * damage);
			let maxAmount = Math.ceil(RANDOM_BOUNDS[1] * damage);

			if (!player.isShiftKeyDown()) {
				server.runCommandSilent(`/eta clearqueue ${player.getDisplayName().getString()} chalice1`);
				server.runCommandSilent(`/eta clearqueue ${player.getDisplayName().getString()} chalice2`);
				server.runCommandSilent(
					`/eta queue ${player.getDisplayName().getString()} chalice1 <dur:80>[anchor value=BOTTOM_CENTER][fade in=20 out=20][offset y=-90]<color col=C44747>[vibrate f=6 a=0.8]<shadow c=6E0C0C>The Chalice will deal between ${minAmount.toString().replace('.0', '')} - ${maxAmount.toString().replace('.0', '')} damage to you`
				);
				server.runCommandSilent(
					`/eta queue ${player.getDisplayName().getString()} chalice2 <dur:80>[anchor value=BOTTOM_CENTER][fade in=20 out=20][offset y=-80]<color col=AD0E0E>[vibrate f=6 a=0.8]<shadow c=7A0909>Are you sure? Right-click while sneaking if so`
				);
			}
			else {
				damage = global.getRandomInt(minAmount, maxAmount);
				player.attack(global.getDamageSource(player.getLevel(), 'adj:chalice_of_blood', null, player), damage);
				server.scheduleInTicks(1, () => {
					if (player.isAlive()) {
						nbt.adj_chalice_blood_amount++;
						if (nbt.adj_chalice_blood_amount == 10) {
							nbt.CustomModelData = 4;
						}
						else if (nbt.adj_chalice_blood_amount >= 7) {
							nbt.CustomModelData = 3;
						}
						else if (nbt.adj_chalice_blood_amount >= 4) {
							nbt.CustomModelData = 2;
						}
						else if (nbt.adj_chalice_blood_amount >= 1) {
							nbt.CustomModelData = 1;
						}
						item.setNbt(nbt);
					}
				});
			}
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
