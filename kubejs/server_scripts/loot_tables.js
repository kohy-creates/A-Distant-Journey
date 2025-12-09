LootJS.modifiers((event) => {

	const replaceItemsMap = {
		'create:honey_bucket': 'the_bumblezone:honey_bucket',
		'farmersdelight:wheat_dough': 'create:dough',
		'rediscovered:quiver': 'supplementaries:quiver',
		'create:copper_nugget': 'mythicmetals:copper_nugget',
		'minecraft:chest': 'quark:oak_chest',

		"twilightforest:mangrove_log": "minecraft:mangrove_log",
		"twilightforest:stripped_mangrove_log": "minecraft:stripped_mangrove_log",
		"twilightforest:mangrove_wood": "minecraft:mangrove_wood",
		"twilightforest:stripped_mangrove_wood": "minecraft:stripped_mangrove_wood",
		"twilightforest:mangrove_planks": "minecraft:mangrove_planks",
		"twilightforest:mangrove_stairs": "minecraft:mangrove_stairs",
		"twilightforest:mangrove_slab": "minecraft:mangrove_slab",
		"twilightforest:mangrove_fence": "minecraft:mangrove_fence",
		"twilightforest:mangrove_fence_gate": "minecraft:mangrove_fence_gate",
		"twilightforest:mangrove_door": "minecraft:mangrove_door",
		"twilightforest:mangrove_trapdoor": "minecraft:mangrove_trapdoor",
		"twilightforest:mangrove_button": "minecraft:mangrove_button",
		"twilightforest:mangrove_pressure_plate": "minecraft:mangrove_pressure_plate",
		"twilightforest:mangrove_sign": "minecraft:mangrove_sign",
		"twilightforest:mangrove_wall_sign": "minecraft:mangrove_wall_sign",
		"twilightforest:mangrove_hanging_sign": "minecraft:mangrove_hanging_sign",
		"twilightforest:mangrove_wall_hanging_sign": "minecraft:mangrove_wall_hanging_sign",
		"twilightforest:mangrove_boat": "minecraft:mangrove_boat",
		"twilightforest:mangrove_chest_boat": "minecraft:mangrove_chest_boat",
		"twilightforest:mangrove_leaves": "minecraft:mangrove_leaves",
		"twilightforest:mangrove_sapling": "minecraft:mangrove_sapling",
		"twilightdelight:mangrove_cabinet": "farmersdelight:mangrove_cabinet",
	}
	for (const [before, after] of Object.entries(replaceItemsMap)) {
		event.addLootTableModifier(/.*/).modifyLoot(Ingredient.of(before), itemstack => {
			return Ingredient.of(after)
		});
	}

	const removedFromLoot = [
		global.blacklistedItems,
		/quark\:.*_shard/,
		'artifacts:everlasting_beef'
	]
	removedFromLoot.forEach(e => {
		event.addLootTableModifier(/.*/).removeLoot(e)
	})

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

	event.addEntityLootModifier([
		'cow',
		'mooshroom',
		'aether:flying_cow',
		'witherstormmod:sickened_cow',
		'witherstormmod:sickened_mushroom_cow',
		'twilightforest:deer',
		'naturalist:deer'
	])
		.pool(pool => {
			pool.rolls(1);
			pool.randomChanceWithLooting(0.002, 0.0005)
				.addLoot(LootEntry.of('artifacts:everlasting_beef'))
				.limitCount(1)
		})

	event.addEntityLootModifier('ars_nouveau:wilden_boss')
		.removeLoot('ars_nouveau:wilden_tribute')

});
