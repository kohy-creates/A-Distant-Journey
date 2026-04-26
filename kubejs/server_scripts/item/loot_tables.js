const replaceItemsMap = {
	'farmersdelight:wheat_dough': 'create:dough',
	'rediscovered:quiver': 'supplementaries:quiver',
	'create:copper_nugget': 'mythicmetals:copper_nugget',
	'minecraft:chest': 'quark:oak_chest',

	'minecraft:stone_sword': 'mythicmetals:copper_sword',
	'minecraft:stone_shovel': 'mythicmetals:copper_shovel',
	'minecraft:stone_axe': 'mythicmetals:copper_axe',
	'minecraft:stone_hoe': 'mythicmetals:copper_hoe',
	'minecraft:stone_pickaxe': 'mythicmetals:copper_pickaxe',

	"minecraft:totem_of_undying": "twilightforest:charm_of_life_1",

	'create:crushed_raw_iron': 'raw_iron',
	'create:crushed_raw_gold': 'raw_gold',
	'create:crushed_raw_copper': 'raw_copper',
	'create:crushed_raw_zinc': 'create:raw_zinc',
	'create:experience_nugget': 'ars_nouveau:experience_gem',

	'minecraft:diamond_helmet': 'additionaladditions:rose_gold_helmet',
	'minecraft:diamond_chestplate': 'additionaladditions:rose_gold_chestplate',
	'minecraft:diamond_leggings': 'additionaladditions:rose_gold_leggings',
	'minecraft:diamond_boots': 'additionaladditions:rose_gold_boots',
	'minecraft:diamond_sword': 'additionaladditions:rose_gold_sword',
	'minecraft:diamond_shovel': 'additionaladditions:rose_gold_shovel',
	'minecraft:diamond_axe': 'additionaladditions:rose_gold_axe',
	'minecraft:diamond_hoe': 'additionaladditions:rose_gold_hoe',
	'minecraft:diamond_pickaxe': 'additionaladditions:rose_gold_pickaxe',

	'minecraft:iron_helmet': 'rediscovered:plate_helmet',
	'minecraft:iron_chestplate': 'rediscovered:plate_chestplate',
	'minecraft:iron_leggings': 'rediscovered:plate_leggings',
	'minecraft:iron_boots': 'rediscovered:plate_boots',

	'create:brass_ingot': 'mythicmetals:tin_ingot',
	'create:brass_nugget': 'mythicmetals:tin_nugget',
	'create:brass_block': 'mythicmetals:tin_block',

	'ars_nouveau:wilden_wing': 'miners_delight:bat_wing',

	'minecraft:enchanted_golden_apple': 'quark:ancient_fruit',
	'twilightforest:transformation_powder': 'botania:mana_powder',

	'quark:rope': 'supplementaries:rope',
	'farmersdelight:rope': 'supplementaries:rope',

	'twilightforest:charm_of_keeping_1': 'twilightforest:charm_of_life_1',
	'alexscaves:banana': 'neapolitan:banana',
	'create:bar_of_chocolate': 'neapolitan:chocolate_bar',
	'upgrade_aquatic:thrasher_tooth': 'alexsmobs:shark_tooth',

	'rubinated_nether:ruby': 'rediscovered:ruby',
	'rubinated_nether:ruby_block': 'rediscovered:ruby_block',

	'minecraft:shield': 'shieldexp:iron_shield',
	'twilightforest:raw_venison': 'naturalist:venison',
	'twilightforest:cooked_venison': 'naturalist:cooked_venison',
}

LootJS.modifiers((event) => {

	for (const [before, after] of Object.entries(replaceItemsMap)) {
		event.addLootTableModifier(/.*/).replaceLoot(before, after, true)
	}

	const removedFromLoot = [
		/travelersbackpack/,
		/quark\:.*_shard/,
		'artifacts:everlasting_beef',
		'twilightforest:raw_ironwood',
		'twilightforest:ironwood_ingot',
		'twilightforest:uncrafting_table',
		'twilightforest:ice_bow',
		'twilightforest:ender_bow',
		'twilightforest:triple_bow',
		'twilightforest:seeker_bow',
		'minecraft:netherite_ingot',

		'aether:zanite_helmet',
		'aether:zanite_chestplate',
		'aether:zanite_leggings',
		'aether:zanite_boots',

		'aether:zanite_sword',
		'aether:zanite_axe',
		'aether:zanite_pickaxe',
		'aether:zanite_shovel',

		'farmersdelight:diamond_knife',
		'delightful:flint_knife',
		'farmersdelight:flint_knife',

	].concat(global.blacklistedItemsArray);
	removedFromLoot.forEach(e => event.addLootTableModifier(/.*/).removeLoot(e));

	const removeModifiersFromMods = [
		'terra_curio',
		'evilcraft',
		'travelersbackpack'
	];
	removeModifiersFromMods.forEach(mod => event.removeGlobalModifier(`@${mod}`));

	const replaceSeedsIn = [
		'grass',
		'fern',
		'tall_grass',
		'large_fern'
	];
	replaceSeedsIn.forEach(block => {
		event.addBlockLootModifier(block)
			.removeLoot('minecraft:wheat_seeds')
			.pool((pool) => {
				pool.rolls(1);
				pool.randomChanceWithEnchantment(
					'minecraft:fortune',
					[
						0.1,
						0.05
					]
				);
				pool.not(c => c.matchMainHand(ForgeItemFilter.canPerformAction('shears_dig')));
				pool.addWeightedLoot([
					LootEntry.of('wheat_seeds').withWeight(350),
					LootEntry.of('beetroot_seeds').withWeight(80),
					LootEntry.of('pumpkin_seeds').withWeight(2),
					LootEntry.of('melon_seeds').withWeight(2),
					LootEntry.of('etcetera:cotton_seeds').withWeight(210),
				]);
			});
	});


	event.addEntityLootModifier('glow_squid')
		.removeLoot('miners_delight:glow_squid')
		.pool(pool => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('miners_delight:glow_squid').when(c => c.randomChance(0.5)));
		});

	event.addEntityLootModifier('squid')
		.removeLoot('miners_delight:squid')
		.pool(pool => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('miners_delight:squid').when(c => c.randomChance(0.5)));
		});

	/**
	 * @param {Internal.GroupedLootBuilder_} pool 
	 */
	const skullFragmentDrop = (pool) => {
		pool.rolls(1);
		pool.addLoot(
			LootEntry.of('kubejs:skull_fragment')
				.when(c => c.randomChanceWithLooting(0.2, 0.1))
				.limitCount([1, 3])
				.applyLootingBonus([0, 1])
		);
	}
	event.addEntityLootModifier('minecraft:wither_skeleton')
		.removeLoot('minecraft:wither_skeleton_skull')
		.pool(skullFragmentDrop)
		.pool((pool) => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('travelersbackpack:wither').when(c => c.randomChanceWithLooting(0.002, 0.001)));
		});
	event.addEntityLootModifier('netherdepthsupgrade:wither_bonefish')
		.removeLoot('minecraft:wither_skeleton_skull')
		.pool(skullFragmentDrop);

	event.addEntityLootModifier('minecraft:blaze')
		.pool((pool) => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('travelersbackpack:blaze').when(c => c.randomChanceWithLooting(0.002, 0.001)));
		});

	event.addEntityLootModifier('minecraft:warden')
		.pool((pool) => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('travelersbackpack:warden'));
		});

	event.addEntityLootModifier('minecraft:enderman')
		.pool((pool) => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('travelersbackpack:enderman').when(c => c.randomChanceWithLooting(0.002, 0.001)));
		});

	event.addEntityLootModifier('minecraft:ghast')
		.pool((pool) => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('travelersbackpack:ghast').when(c => c.randomChanceWithLooting(0.05, 0.025)));
		});

	event.addEntityLootModifier('mutantmonsters:mutant_creeper')
		.pool((pool) => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('travelersbackpack:creeper').when(c => c.randomChanceWithLooting(0.15, 0.075)));
		});

	/**
	 * @param {$GroupedLootBuilder_} pool 
	 */
	const darkGemPool = (pool) => {
		pool.rolls(1);
		pool.randomChanceWithLooting(0.05, 0.02)
			.addAlternativesLoot(
				LootEntry.of('evilcraft:dark_gem').when((c) => c.randomChance(0.25)).applyLootingBonus([0, 1]),
				LootEntry.of('evilcraft:dark_gem_crushed').when(c => c.randomChance(1.0)).limitCount([1, 2]).applyLootingBonus([0, 1])
			)
	};

	event.addEntityLootModifier(
		[
			'zombie',
			'zombie_villager',
			'born_in_chaos_v1:zombie_bruiser',
			'born_in_chaos_v1:zombie_lumberjack',
			'born_in_chaos_v1:zombie_fisherman',
			'born_in_chaos_v1:zombie_clown',
			'witherstormmod:sickened_zombie',
		])
		.pool((pool) => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('minecraft:feather')
				.limitCount([0, 2])
				.applyLootingBonus([0, 1])
				.when(c => c.randomChanceWithLooting(0.25, 0.15))
			);
		})
		.pool((pool) => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('born_in_chaos_v1:pieceofdarkmetal')
				.limitCount([1, 2])
				.applyLootingBonus([0, 1])
				.when(c => c.randomChanceWithLooting(0.05, 0.025))
			)

		})
		.pool(darkGemPool);

	event.addEntityLootModifier('minecraft:skeleton')
		.pool((pool) => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('minecraft:skeleton_skull').when(c => c.randomChanceWithLooting(0.02, 0.02)));
		})
		.pool(darkGemPool)
		.pool((pool) => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('travelersbackpack:skeleton').when(c => c.randomChanceWithLooting(0.002, 0.001)));
		});

	event.addEntityLootModifier('minecraft:stray')
		.pool((pool) => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('born_in_chaos_v1:permafrost_shard').limitCount([1, 2]).applyLootingBonus([0, 1]).when(c => c.randomChanceWithLooting(0.33, 0.17)))
		});

	event.addEntityLootModifier('alexsmobs:hammerhead_shark')
		.pool((pool) => {
			pool.rolls(1);
			pool.addLoot(
				LootEntry.of('alexsmobs:shark_tooth')
					.limitCount([1, 2])
					.applyLootingBonus([0, 1])
					.when(c => c.randomChanceWithLooting(0.9, 0.1))
			);
		});

	event.addEntityLootModifier('alexsmobs:frilled_shark')
		.pool((pool) => {
			pool.rolls(1);
			pool
				.addLoot(
					LootEntry.of('alexsmobs:shark_tooth')
						.limitCount([1, 2])
						.applyLootingBonus([0, 1])
						.when(c => c.randomChanceWithLooting(0.5, 0.1))
				);
		});

	event.addEntityLootModifier('born_in_chaos_v1:corpse_fish')
		.pool((pool) => {
			pool.rolls(1);
			pool
				.addLoot(LootEntry.of('alexsmobs:shark_tooth')
					.applyLootingBonus([0, 1])
					.when(c => c.randomChanceWithLooting(0.1, 0.05)));
		});

	event.addEntityLootModifier('born_in_chaos_v1:glutton_fish')
		.pool((pool) => {
			pool.rolls(1);
			pool
				.addLoot(LootEntry.of('alexsmobs:shark_tooth')
					.limitCount([1, 2])
					.applyLootingBonus([0, 1])
					.when(c => c.randomChanceWithLooting(0.333, 0.05)));
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
			pool.addLoot(LootEntry.of('artifacts:everlasting_beef')
				.when(c => c.randomChanceWithLooting(0.002, 0.0005))
				.limitCount(1)
			)
		})

	event.addEntityLootModifier('ars_nouveau:wilden_boss')
		.removeLoot('ars_nouveau:wilden_tribute')

	event.addEntityLootModifier('guardian')
		.pool((pool) => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('ars_nouveau:wilden_spike')
				.limitCount([0, 2])
				.applyLootingBonus([0, 1])
			);
		});

	event.addEntityLootModifier('elder_guardian')
		.pool((pool) => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('ars_nouveau:wilden_spike')
				.limitCount([0, 7])
				.applyLootingBonus([0, 3])
			);
		})
		.pool((pool) => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('travelersbackpack:sponge').when(c => c.randomChanceWithLooting(0.25, 0.08)));
		});

	function mcdw(type, item) {
		return `mcdw:${type}_${item}`;
	}

	event.addEntityLootModifier('twilightforest:skeleton_druid')
		.pool((pool) => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('twilightforest:steeleaf_ingot')
				.limitCount([1, 2])
				.applyLootingBonus([0, 1])
				.when(c => c.randomChanceWithLooting(0.25, 0.0833))
			);
		})

	event.addEntityLootModifier('minecraft:witch')
		.removeLoot(mcdw('glaive', 'cackling_broom'))
		.pool((pool) => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of(mcdw('glaive', 'cackling_broom')).when(c => c.randomChanceWithLooting(0.05, 0.025)))
		});

	event.addLootTableModifier('chests/end_city_treasure')
		.pool((pool) => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of(mcdw('sword', 'obsidian_claymore')).withChance(0.15))
		})
		.pool((pool) => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of(mcdw('bow', 'call_of_the_void')).withChance(0.15))
		})
		.pool((pool) => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of(mcdw('crossbow', 'veiled_crossbow')).withChance(0.15))
		});

	event.addLootTableModifier('aquamirae:chests/frozen_chest')
		.pool((pool) => {
			pool.rolls(1).randomChance(1);
			pool.addLoot(LootEntry.of('twilightforest:ice_bow'))
		});

	event.addLootTableModifier(/^(?=.*\bvillage\b)(?=.*\bchest\b).*/)
		.pool((pool) => {
			pool.addLoot(LootEntry.of('travelersbackpack:villager').when(c => c.randomChance(0.05)))
		});

	event.addLootTableModifier('minecraft:chests/desert_pyramid')
		.pool((pool) => {
			pool.addLoot(LootEntry.of('travelersbackpack:sandstone').when(c => c.randomChance(0.15)))
		});

	event.addLootTableModifier('minecraft:chests/igloo_chest')
		.pool((pool) => {
			pool.addLoot(LootEntry.of('travelersbackpack:snow').when(c => c.randomChance(0.5)))
		});
});
