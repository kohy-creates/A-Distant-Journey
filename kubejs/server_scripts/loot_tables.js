LootJS.modifiers((event) => {
	event.addLootTableModifier(/.*/).modifyLoot(Ingredient.of('farmersdelight:wheat_dough'), (itemstack) => {
		return Ingredient.of('create:dough')
	});

	event.addLootTableModifier(/.*/).modifyLoot(Ingredient.of('rediscovered:quiver'), (itemstack) => {
		return Ingredient.of('supplementaries:quiver')
	});

	const skullFragmentDrop = (pool) => {
		pool.rolls(1);
		pool.randomChanceWithLooting(0.2, 0.1)
			.addLoot(LootEntry.of('kubejs:skull_fragment'))
			.limitCount([1, 3])
			.applyLootingBonus([0, 1]);
	}
	event.addEntityLootModifier('minecraft:wither_skeleton')
		.removeLoot('minecraft:wither_skeleton_skull')
		.pool(skullFragmentDrop);
	event.addEntityLootModifier('netherdepthsupgrade:wither_bonefish')
		.removeLoot('minecraft:wither_skeleton_skull')
		.pool(skullFragmentDrop);

	// event.addEntityLootModifier('minecraft:pillager')
	// 	.pool((pool) => {
	// 		pool.rolls(1);
	// 		pool.addLoot(LootEntry.of('minecraft:emerald'))
	// 			.limitCount([0, 2])
	// 			.applyLootingBonus([0, 1]);
	// 	});

	event.addEntityLootModifier('minecraft:zombie')
		.pool((pool) => {
			pool.rolls(1);
			pool.randomChanceWithLooting(0.5, 0.25)
				.addLoot(LootEntry.of('minecraft:feather'))
				.limitCount([0, 2])
				.applyLootingBonus([0, 1]);
		});

	// event.addEntityLootModifier('minecraft:husk')
	// 	.pool((pool) => {
	// 		pool.rolls(1);
	// 		pool.randomChanceWithLooting(0.33, 0.17)
	// 			.addLoot(LootEntry.of('minecraft:sand'))
	// 			.limitCount([0, 2])
	// 			.applyLootingBonus([0, 1]);
	// 	});

	// event.addEntityLootModifier('minecraft:stray')
	// 	.pool((pool) => {
	// 		pool.rolls(1);
	// 		pool.randomChanceWithLooting(0.25, 0.25)
	// 			.addLoot(LootEntry.of('minecraft:ice'))
	// 			.limitCount([0, 2])
	// 			.applyLootingBonus([0, 1]);
	// 	});
});

