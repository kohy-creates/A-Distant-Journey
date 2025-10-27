LootJS.modifiers((event) => {

	const replaceItemsMap = {
		'create:honey_bucket': 'the_bumblezone:honey_bucket',
		'farmersdelight:wheat_dough': 'create:dough',
		'rediscovered:quiver': 'supplementaries:quiver',
		'create:copper_nugget': 'mythicmetals:copper_nugget',
		'minecraft:chest': 'quark:oak_chest'
	}

	for (const [before, after] of Object.entries(replaceItemsMap)) {
		event.addLootTableModifier(/.*/).modifyLoot(Ingredient.of(before), itemstack => {
			return Ingredient.of(after)
		});
	}

	const removedItems = [
		global.blacklistedItems,
		/quark\:.*_shard/
	]

	event.addLootTableModifier(/.*/).removeLoot(removedItems);

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
			pool.randomChanceWithLooting(0.25, 0.15)
				.addLoot(LootEntry.of('minecraft:feather'))
				.limitCount([0, 2])
				.applyLootingBonus([0, 1]);
		});

	event.addEntityLootModifier('minecraft:skeleton')
		.pool((pool) => {
			pool.rolls(1);
			pool.randomChanceWithLooting(0.02, 0.02)
				.addLoot(LootEntry.of('minecraft:skeleton_skull'));
		});

	event.addEntityLootModifier('alexsmobs:hammerhead_shark')
		.pool((pool) => {
			pool.rolls(1);
			pool.randomChanceWithLooting(0.9, 0.1)
				.addLoot(LootEntry.of('alexsmobs:shark_tooth'))
				.limitCount([1, 2])
				.applyLootingBonus([0, 1]);
		});

	event.addEntityLootModifier('alexsmobs:frilled_shark')
		.pool((pool) => {
			pool.rolls(1);
			pool.randomChanceWithLooting(0.5, 0.1)
				.addLoot(LootEntry.of('alexsmobs:shark_tooth'))
				.limitCount([1, 2])
				.applyLootingBonus([0, 1]);
		});

	event.addEntityLootModifier('born_in_chaos_v1:corpse_fish')
		.pool((pool) => {
			pool.rolls(1);
			pool.randomChanceWithLooting(0.1, 0.05)
				.addLoot(LootEntry.of('alexsmobs:shark_tooth'))
				.applyLootingBonus([0, 1]);
		});

	event.addEntityLootModifier('born_in_chaos_v1:glutton_fish')
		.pool((pool) => {
			pool.rolls(1);
			pool.randomChanceWithLooting(0.333, 0.05)
				.addLoot(LootEntry.of('alexsmobs:shark_tooth'))
				.limitCount([1, 2])
				.applyLootingBonus([0, 1]);
		});

	event.addEntityLootModifier('ars_nouveau:wilden_boss')
		.removeLoot('ars_nouveau:wilden_tribute')

});
