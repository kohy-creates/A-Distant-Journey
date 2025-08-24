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
	event.addLootTableModifier('minecraft:entities/wither_skeleton')
		.removeLoot('minecraft:wither_skeleton_skull')
		.pool(skullFragmentDrop);
	event.addLootTableModifier('netherdepthsupgrade:entities/wither_bonefish')
		.removeLoot('minecraft:wither_skeleton_skull')
		.pool(skullFragmentDrop);

	event.addLootTableModifier('minecraft:entities/zombie')
		.pool((pool) => {
			pool.rolls(1);
			pool.randomChanceWithLooting(0.5, 0.25)
				.addLoot(LootEntry.of('minecraft:feather'))
				.limitCount([0, 2])
				.applyLootingBonus([0, 1]);
		});

	event.addLootTableModifier('minecraft:entities/skeleton')
		.pool((pool) => {
			pool.rolls(1);
			pool.randomChanceWithLooting(0.05, 0.05)
				.addLoot(LootEntry.of('minecraft:skeleton_skull'));
		});

	event.addLootTableModifier('alexsmobs:entities/hammerhead_shark')
		.pool((pool) => {
			pool.rolls(1);
			pool.randomChanceWithLooting(0.9, 0.1)
				.addLoot(LootEntry.of('alexsmobs:shark_tooth'))
				.limitCount([0, 3])
				.applyLootingBonus([0, 1]);
		});

	event.addLootTableModifier('alexsmobs:entities/frilled_shark')
		.pool((pool) => {
			pool.rolls(1);
			pool.randomChanceWithLooting(0.5, 0.1)
				.addLoot(LootEntry.of('alexsmobs:shark_tooth'))
				.limitCount([0, 2])
				.applyLootingBonus([0, 1]);
		});

	event.addLootTableModifier('born_in_chaos_v1:entities/corpse_fish')
		.pool((pool) => {
			pool.rolls(1);
			pool.randomChanceWithLooting(0.1, 0.05)
				.addLoot(LootEntry.of('alexsmobs:shark_tooth'))
				.limitCount([0, 1])
				.applyLootingBonus([0, 1]);
		});

	event.addLootTableModifier('born_in_chaos_v1:entities/glutton_fish')
		.pool((pool) => {
			pool.rolls(1);
			pool.randomChanceWithLooting(0.333, 0.05)
				.addLoot(LootEntry.of('alexsmobs:shark_tooth'))
				.limitCount([0, 2])
				.applyLootingBonus([0, 1]);
		});

	event.addEntityLootModifier('ars_nouveau:wilden_boss')
		.removeLoot('ars_nouveau:wilden_tribute')
});
