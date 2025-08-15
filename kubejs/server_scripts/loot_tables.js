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

	event.addEntityLootModifier('minecraft:zombie')
		.pool((pool) => {
			pool.rolls(1);
			pool.randomChanceWithLooting(0.5, 0.25)
				.addLoot(LootEntry.of('minecraft:feather'))
				.limitCount([0, 2])
				.applyLootingBonus([0, 1]);
		});
	
	event.addEntityLootModifier('ars_nouveau:wilden_boss')
		.removeLoot('ars_nouveau:wilden_tribute')
});
