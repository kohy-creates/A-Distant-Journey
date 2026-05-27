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
	'farmersdelight:canvas': 'xercapaint:item_canvas',

	'aether:skyroot_stick': 'stick',

	'brass_geodes:ruby': 'rediscovered:ruby'
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
		'twilightforest:ice_sword',
		'twilightforest:ice_bomb',

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

		'aether:life_shard',

		'lost_aether_content:phoenix_sword',
		'lost_aether_content:phoenix_pickaxe',
		'lost_aether_content:phoenix_shovel',
		'lost_aether_content:phoenix_hoe',
		'lost_aether_content:phoenix_axe',
		'aether:phoenix_helmet',
		'aether:phoenix_chestplate',
		'aether:phoenix_leggings',
		'aether:phoenix_boots',

		'aether:neptune_helmet',
		'aether:neptune_chestplate',
		'aether:neptune_leggings',
		'aether:neptune_boots',

		'ancient_aether:warrior_pendant',
		'aether:regeneration_stone',

	].concat(global.blacklistedItemsArray);
	removedFromLoot.forEach(e => event.addLootTableModifier(/.*/).removeLoot(e));

	const removeModifiersFromMods = [
		'terra_curio',
		'evilcraft',
		'travelersbackpack'
	];
	removeModifiersFromMods.forEach(mod => event.removeGlobalModifier(`@${mod}`));

	function fromChapter(number) {
		return {
			condition: 'adjcore:is_chapter',
			from: number
		};
	}

	const replaceSeedsIn = [
		'grass',
		'fern',
		'tall_grass',
		'large_fern'
	];
	replaceSeedsIn.forEach(block => {
		event.addBlockLootModifier(block)
			.removeLoot('minecraft:wheat_seeds')
			.pool(pool => {
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
			pool.addLoot(LootEntry.of('miners_delight:glow_squid').when(c => c.randomChanceWithLooting(0.5, 0.5)));
		});

	event.addEntityLootModifier('squid')
		.removeLoot('miners_delight:squid')
		.pool(pool => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('miners_delight:squid').when(c => c.randomChanceWithLooting(0.5, 0.5)));
		});

	/**
	 * @param {Internal.GroupedLootBuilder_} pool 
	 */
	const skullFragmentDrop = pool => {
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
		.pool(pool => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('travelersbackpack:wither').when(c => c.randomChanceWithLooting(0.002, 0.001)));
		})
		.pool(pool => {
			pool.addLoot(LootEntry.of('terra_curio:holy_water').when(c => c.randomChance(0.03)))
		});;
	event.addEntityLootModifier('netherdepthsupgrade:wither_bonefish')
		.removeLoot('minecraft:wither_skeleton_skull')
		.pool(skullFragmentDrop);

	event.addEntityLootModifier('minecraft:blaze')
		.pool(pool => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('travelersbackpack:blaze').when(c => c.randomChanceWithLooting(0.002, 0.001)));
		});

	event.addEntityLootModifier('minecraft:warden')
		.pool(pool => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('travelersbackpack:warden'));
		})
		.pool(pool => {
			pool.addLoot(LootEntry.of('terra_curio:flashlight').when(c => c.randomChance(1)))
		});

	event.addEntityLootModifier('minecraft:enderman')
		.pool(pool => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('travelersbackpack:enderman').when(c => c.randomChanceWithLooting(0.002, 0.001)));
		})
		.pool(pool => {
			pool.addLoot(LootEntry.of('terra_curio:trifold_map').when(c => c.randomChance(0.05)))
		});

	event.addEntityLootModifier('minecraft:ghast')
		.pool(pool => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('travelersbackpack:ghast').when(c => c.randomChanceWithLooting(0.05, 0.025)));
		});

	event.addEntityLootModifier('mutantmonsters:mutant_creeper')
		.pool(pool => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('travelersbackpack:creeper').when(c => c.randomChanceWithLooting(0.15, 0.075)));
		});

	/**
	 * @param {$GroupedLootBuilder_} pool 
	 */
	const darkGemPool = pool => {
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
		.pool(pool => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('minecraft:feather')
				.limitCount([0, 2])
				.applyLootingBonus([0, 1])
				.when(c => c.randomChanceWithLooting(0.25, 0.15))
			);
		})
		.pool(pool => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('born_in_chaos_v1:pieceofdarkmetal')
				.limitCount([1, 2])
				.applyLootingBonus([0, 1])
				.when(c => c.randomChanceWithLooting(0.05, 0.025))
			)
		})
		.pool(darkGemPool);

	event.addEntityLootModifier('minecraft:skeleton')
		.pool(pool => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('minecraft:skeleton_skull').when(c => c.randomChanceWithLooting(0.02, 0.02)));
		})
		.pool(darkGemPool)
		.pool(pool => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('travelersbackpack:skeleton').when(c => c.randomChanceWithLooting(0.002, 0.001)));
		})
		.pool(pool => {
			pool.rolls(1);
			pool.addLoot(
				LootEntry.of('mcdw:bow_bonebow')
					.when(c => {
						c.randomChanceWithLooting(0.025, 0.005);
						c.anyDimension('minecraft:the_nether');
					})
			);
		});

	event.addEntityLootModifier('minecraft:stray')
		.pool(pool => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('born_in_chaos_v1:permafrost_shard').limitCount([1, 2]).applyLootingBonus([0, 1]).when(c => c.randomChanceWithLooting(0.33, 0.17)))
		});

	event.addEntityLootModifier('alexsmobs:hammerhead_shark')
		.pool(pool => {
			pool.rolls(1);
			pool.addLoot(
				LootEntry.of('alexsmobs:shark_tooth')
					.limitCount([1, 2])
					.applyLootingBonus([0, 1])
					.when(c => c.randomChanceWithLooting(0.9, 0.1))
			);
		});

	event.addEntityLootModifier('alexsmobs:frilled_shark')
		.pool(pool => {
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
		.pool(pool => {
			pool.rolls(1);
			pool
				.addLoot(LootEntry.of('alexsmobs:shark_tooth')
					.applyLootingBonus([0, 1])
					.when(c => c.randomChanceWithLooting(0.1, 0.05)));
		});

	event.addEntityLootModifier('born_in_chaos_v1:glutton_fish')
		.pool(pool => {
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
		});

	event.addEntityLootModifier('born_in_chaos_v1:pumpkinhead')
		.removeLoot(ItemFilter.ALWAYS_TRUE);

	event.addLootTableModifier([
		'idas:chests/archmages_tower/archmages_tower_library',
		'idas:chests/archmages_tower/archmages_tower_treasure',
	])
		.removeLoot(ItemFilter.ALWAYS_TRUE);

	event.addEntityLootModifier('born_in_chaos_v1:nightmare_stalker')
		.removeLoot('born_in_chaos_v1:nightmare_stalker_skull')
		.pool(pool => {
			pool.addLoot(
				LootEntry.of('born_in_chaos_v1:nightmare_stalker_skull')
					.when(c => c.randomChanceWithLooting(0.75, 0.25))
			);
		});

	event.addEntityLootModifier('born_in_chaos_v1:lifestealer_true_form')
		.pool(pool => {
			pool.addLoot(
				LootEntry.of('terra_curio:moon_stone')
					.when(c => c.randomChanceWithLooting(0.5, 0.25))
			);
		});

	event.addEntityLootModifier([
		'wolf',
		'witherstormmod:sickened_wolf',
		'born_in_chaos_v1:dread_hound'
	])
		.pool(pool => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('ars_nouveau:wilden_horn')
				.when(c => c.randomChanceWithLooting(0.5, 0.25))
				.applyLootingBonus([0, 1])
			);
		});

	event.addEntityLootModifier('guardian')
		.pool(pool => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('ars_nouveau:wilden_spike')
				.limitCount([0, 2])
				.applyLootingBonus([0, 1])
			);
		})
		.pool(pool => {
			pool.addLoot(LootEntry.of('terra_curio:hand_drill').when(c => c.randomChance(0.009)))
		});

	event.addEntityLootModifier('elder_guardian')
		.pool(pool => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('ars_nouveau:wilden_spike')
				.limitCount([0, 7])
				.applyLootingBonus([0, 3])
			);
		})
		.pool(pool => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('travelersbackpack:sponge').when(c => c.randomChanceWithLooting(0.25, 0.08)));
		})
		.pool(pool => {
			pool.addLoot(LootEntry.of('terra_curio:hand_drill').when(c => c.randomChance(0.25)))
		});

	function mcdw(type, item) {
		return `mcdw:${type}_${item}`;
	}

	event.addEntityLootModifier('twilightforest:skeleton_druid')
		.pool(pool => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('twilightforest:steeleaf_ingot')
				.limitCount([1, 2])
				.applyLootingBonus([0, 1])
				.when(c => c.randomChanceWithLooting(0.25, 0.0833))
			);
		})

	event.addEntityLootModifier('minecraft:witch')
		.removeLoot(mcdw('glaive', 'cackling_broom'))
		.pool(pool => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of(mcdw('glaive', 'cackling_broom')).when(c => c.randomChanceWithLooting(0.05, 0.025)))
		});

	event.addLootTableModifier('chests/end_city_treasure')
		.pool(pool => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of(mcdw('sword', 'obsidian_claymore')).withChance(0.15))
		})
		.pool(pool => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of(mcdw('bow', 'call_of_the_void')).withChance(0.15))
		})
		.pool(pool => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of(mcdw('crossbow', 'veiled_crossbow')).withChance(0.15))
		});

	event.addLootTableModifier('aquamirae:chests/frozen_chest')
		.pool(pool => {
			pool.rolls(1).randomChance(1);
			pool.addLoot(LootEntry.of('twilightforest:ice_bow'))
		});

	event.addLootTableModifier(/^(?=.*\bvillage\b)(?=.*\bchest\b).*/)
		.pool(pool => {
			pool.addLoot(LootEntry.of('travelersbackpack:villager').when(c => c.randomChance(0.05)))
		});

	event.addLootTableModifier('minecraft:chests/desert_pyramid')
		.pool(pool => {
			pool.addLoot(LootEntry.of('travelersbackpack:sandstone').when(c => c.randomChance(0.15)))
		});

	event.addLootTableModifier('minecraft:chests/igloo_chest')
		.pool(pool => {
			pool.addLoot(LootEntry.of('travelersbackpack:snow').when(c => c.randomChance(0.5)))
		});

	event.addEntityLootModifier([
		'witherstormmod:sickened_zombie',
		'witherstormmod:sickened_skeleton',
		'witherstormmod:sickened_spider',
		'witherstormmod:sickened_creeper',
		'witherstormmod:sickened_villager',
		'witherstormmod:sickened_phantom',
		'witherstormmod:sickened_chicken',
		'witherstormmod:sickened_parrot',
		'witherstormmod:sickened_wolf',
		'witherstormmod:sickened_cat',
		'witherstormmod:sickened_bee',
		'witherstormmod:sickened_cow',
		'witherstormmod:sickened_mushroom_cow',
		'witherstormmod:sickened_pillager',
		'witherstormmod:sickened_vindicator',
		'witherstormmod:sickened_iron_golem',
		'witherstormmod:sickened_pig',
		'witherstormmod:sickened_snow_golem',
	])
		.pool(pool => {
			pool.addLoot(LootEntry.of('witherstormmod:tainted_dust')
				.when(c => c.randomChanceWithLooting(0.2, 0.05))
				.limitCount([1, 2])
				.applyLootingBonus([0, 1])
			)
		})
		.pool(pool => {
			pool.addLoot(LootEntry.of('terra_curio:holy_water').when(c => c.randomChance(0.01)))
		});

	event.addLootTableModifier('artifacts:chests/campsite_chest')
		.pool(pool => {
			pool.rolls(1)
				.randomChance(1 /* If I ever want to change that */)
			pool.addWeightedLoot([
				LootEntry.of('terra_curio:band_of_regeneration'),
				LootEntry.of('terra_curio:cloud_in_a_bottle'),
				LootEntry.of('terra_curio:climbing_claws'),
				LootEntry.of('terra_curio:ancient_chisel'),
				LootEntry.of('terra_curio:hermes_boots'),
			])
		});

	event.addLootTableModifier('alexscaves:chests/underground_cabin')
		.pool(pool => {
			pool.randomChance(1);
			pool.addWeightedLoot([
				LootEntry.of('terra_curio:ancient_chisel'),
				LootEntry.of('terra_curio:climbing_claws'),
				LootEntry.of('terra_curio:cloud_in_a_bottle'),
				LootEntry.of('terra_curio:cobalt_shield'),
			])
		});

	event.addLootTableModifier('artifacts:entities/mimic')
		.pool(pool => {
			pool.randomChance(1);
			pool.addWeightedLoot([
				LootEntry.of('terra_curio:putrid_scent'),
				LootEntry.of('terra_curio:panic_necklace'),
				LootEntry.of('terra_curio:star_cloak'),
				LootEntry.of('terra_curio:titan_glove')
			])
		});

	event.addLootTableModifier('minecraft:chests/nether_bridge')
		.pool(pool => {
			pool.randomChance(0.25);
			pool.addWeightedLoot([
				LootEntry.of('terra_curio:magma_stone'),
				LootEntry.of('terra_curio:lava_charm'),
				LootEntry.of('terra_curio:obsidian_rose'),
				LootEntry.of('terra_curio:treasure_magnet'),
			])
		});

	event.addLootTableModifier('minecraft:chests/ruined_portal')
		.pool(pool => {
			pool.addWeightedLoot([
				LootEntry.of('terra_curio:obsidian_skull')
			])
		});

	event.addEntityLootModifier([
		'spider',
		'cave_spider',
		'born_in_chaos_v1:baby_spider',
		'born_in_chaos_v1:baby_spider_controlled'
	]).pool(pool => {
		pool.addLoot(LootEntry.of('terra_curio:bezoar').when(c => c.randomChance(0.03)))
	});

	event.addEntityLootModifier([
		'zombie',
		'zombie_villager',
		'born_in_chaos_v1:zombie_bruiser',
		'born_in_chaos_v1:zombie_lumberjack',
		'born_in_chaos_v1:zombie_fisherman',
		'born_in_chaos_v1:zombie_clown',
		'witherstormmod:sickened_zombie',
		'rediscovered:zombie_pigman',

	])
		.pool(pool => {
			pool.addLoot(LootEntry.of('terra_curio:vitamins').when(c => c.randomChance(0.01)))
		}).pool(pool => {
			pool.addLoot(LootEntry.of('terra_curio:shackle').when(c => c.randomChance(0.015)))
		})

	event.addEntityLootModifier([
		'enderman',
		'phantom'
	])
		.pool(pool => {
			pool.addLoot(LootEntry.of('terra_curio:blindfold').when(c => c.randomChance(0.08)))
		})

	event.addEntityLootModifier('husk')
		.pool(pool => {
			pool.addLoot(LootEntry.of('terra_curio:energy_bar').when(c => c.randomChance(0.015)))
		})

	event.addEntityLootModifier('minecraft:phantom')
		.pool(pool => {
			pool.addLoot(LootEntry.of('terra_curio:energy_bar').when(c => c.randomChance(0.1)))
		})

	event.addEntityLootModifier(['minecraft:slime', 'minecraft:stray'])
		.pool(pool => {
			pool.addLoot(LootEntry.of('terra_curio:fast_clock').when(c => c.randomChance(0.02)))
		})

	event.addEntityLootModifier(['minecraft:stray'])
		.pool(pool => {
			pool.addLoot(LootEntry.of('terra_curio:ice_skates').when(c => c.randomChance(0.01)))
		})
		.pool(pool => {
			pool.addLoot(LootEntry.of('terra_curio:flurry_boots').when(c => c.randomChance(0.008)))
		})


	event.addEntityLootModifier(['minecraft:shulker'])
		.pool(pool => {
			pool.addLoot(LootEntry.of('terra_curio:shot_put').when(c => c.randomChance(0.12)))
		});

	event.addEntityLootModifier(['born_in_chaos_v1:fallen_chaos_knight'])
		.pool(pool => {
			pool.addLoot(LootEntry.of('terra_curio:black_belt').when(c => c.randomChance(0.15)))
		});

	event.addEntityLootModifier(['mutantmonsters:mutant_zombie'])
		.pool(pool => {
			pool.addLoot(
				LootEntry.of('terra_curio:flesh_knuckles')
					.when(c => {
						c.randomChance(0.334);
						c.customCondition(fromChapter(3));
					})
			);
		});

	event.addLootTableModifier(['minecraft:chests/ancient_city'])
		.pool(pool => {
			pool.addLoot(LootEntry.of('terra_curio:flashlight').when(c => c.randomChance(0.2)))
		});

	event.addLootTableModifier(['aether:chests/dungeon/gold/gold_dungeon_reward'])
		.pool(pool => {
			pool.addLoot(LootEntry.of('kubejs:gravitite_hook').when(c => c.randomChance(0.5)))
		});

	event.addEntityLootModifier('born_in_chaos_v1:dread_hound')
		.pool(pool => {
			pool.addLoot(
				LootEntry.of('kubejs:moon_charm')
					.when(c => {
						c.randomChanceWithLooting(0.02, 0.01);
						c.customCondition(fromChapter(3));
					})
			);
		});

	event.addEntityLootModifier('drowned')
		.pool(pool => {
			pool.addLoot(
				LootEntry.of('kubejs:neptunes_shell')
					.when(c => {
						c.randomChanceWithLooting(0.02, 0.01);
						c.customCondition(fromChapter(3));
					})
			);
		});

	event.addLootTableModifier('mythicmetals:gameplay/better_piglin_bartering')
		.pool(pool => {
			pool.addLoot(
				LootEntry.of('kubejs:kiketsu_card').when(c => c.randomChance(0.02))
			);
		});

	event.addEntityLootModifier('twilightforest:raven')
		.removeLoot(ItemFilter.ALWAYS_TRUE);
	event.addEntityLootModifier('alexsmobs:crow')
		.removeLoot('feather')
		.pool(pool => {
			pool.addLoot(
				LootEntry.of('twilightforest:raven_feather').limitCount([0, 1]).applyLootingBonus([0, 1])
			)
		});

	event.addLootTableModifier('minecraft:chests/simple_dungeon')
		.pool(pool => {
			pool.addLoot(
				LootEntry.of('aperture_innovations:portal_gun')
					.when(c => c.randomChance(0.09))
			);
		});

	// Boss-specific changes
	global.bossMobs.forEach(boss => {
		let treasureBag = `kubejs:treasure_bag_${boss.split(':')[1]}`;
		if (!Item.exists(treasureBag)) treasureBag = `majruszsdifficulty:${boss.split(':')[1]}_treasure_bag`;
		if (Item.exists(treasureBag)) {
			event.addEntityLootModifier(boss).pool(pool => {
				pool.addLoot(
					LootEntry.of(
						treasureBag,
						{
							display: {
								Lore: [
									'{"text":"Given to every player who battled the boss","italic":false,"color":"gold"}'
								]
							}
						}
					)
				);
				pool.rolls(0);
			});
		}

		if (
			boss !== 'botania:doppleganger'
			&& boss !== 'witherstormmod:wither_storm'
		) {
			event.addEntityLootModifier(boss)
				.pool(pool => {
					pool.addLoot(
						LootEntry.of('trofers:large_pillar', 1, `{BlockEntityTag:{Trophy:'adj:trophies/${boss.replace(':', '_')}'}}`)
							.when(c => c.randomChance(0.1))
					);
				});
		}
	});

	Object.entries(global.eyeDrops).forEach((entityId, eyeId) => {
		event.addEntityLootModifier(entityId)
			.pool(pool => {
				pool.rolls(0);
				pool.addLoot(
					LootEntry.of(
						`kubejs:eye_of_${eyeId}`,
						{
							display: {
								Lore: [
									'{"text":"Guaranteed to drop on 1st kill","italic":false,"color":"gold"}',
									'{"text":"20% chance to drop on every next kill","italic":false,"color":"gold"}',
									'{"text":"(33% in Hardcore mode)","italic":false,"color":"gold"}'
								]
							}
						}
					)
				);
			});
	});

	event.addLootTableModifier([
		'kubejs:treasure_bag/aether_slider',
		'kubejs:treasure_bag/aether_sun_spirit',
		'kubejs:treasure_bag/aether_valkyrie_queen',
		'kubejs:treasure_bag/alexscaves_luxtructosaurus',
		'kubejs:treasure_bag/ancient_aether_mutated_aechor_plant',
		'kubejs:treasure_bag/aquamirae_captain_cornelia',
		'kubejs:treasure_bag/ars_nouveau_wilden_boss',
		'kubejs:treasure_bag/botania_doppleganger_hardmode',
		'kubejs:treasure_bag/botania_doppleganger',
		'kubejs:treasure_bag/cataclysm_ancient_remnant',
		'kubejs:treasure_bag/cataclysm_ender_guardian',
		'kubejs:treasure_bag/cataclysm_ignis',
		'kubejs:treasure_bag/cataclysm_maledictus',
		'kubejs:treasure_bag/cataclysm_netherite_monstrosity',
		'kubejs:treasure_bag/cataclysm_scylla',
		'kubejs:treasure_bag/cataclysm_the_harbinger',
		'kubejs:treasure_bag/cataclysm_the_leviathan',
		'kubejs:treasure_bag/lost_aether_content_aerwhale_king',
		'kubejs:treasure_bag/rediscovered_red_dragon',
		'kubejs:treasure_bag/twilightforest_alpha_yeti',
		'kubejs:treasure_bag/twilightforest_hydra',
		'kubejs:treasure_bag/twilightforest_knight_phantom',
		'kubejs:treasure_bag/twilightforest_lich',
		'kubejs:treasure_bag/twilightforest_minoshroom',
		'kubejs:treasure_bag/twilightforest_naga',
		'kubejs:treasure_bag/twilightforest_snow_queen',
		'kubejs:treasure_bag/twilightforest_ur_ghast',
		'kubejs:treasure_bag/unusualend_enderblob_queen',
		'kubejs:treasure_bag/unusualend_endstone_golem',
		'majruszsdifficulty:ender_dragon_treasure_bag',
		'majruszsdifficulty:warden_treasure_bag',
		'majruszsdifficulty:wither_treasure_bag',
		'majruszsdifficulty:raid_treasure_bag',
	])
		.pool(pool => {
			pool.rolls(1);
			pool.addLoot(
				LootEntry.of('minecraft:potion', '{Potion:"minecraft:healing"}')
					.limitCount([5, 12])
			)
		});
	event.addEntityLootModifier('aquamirae:captain_cornelia')
		.removeLoot('aquamirae:three_bolt_helmet')
		.removeLoot('aquamirae:treasure_pouch')
		.removeLoot('aquamirae:ship_graveyard_echo')
		.removeLoot('aquamirae:oxygen_tank')
		.removeLoot('aquamirae:music_disc_forsaken_drownage');

	event.addEntityLootModifier('alexscaves:luxtructosaurus')
		.removeLoot('alexscaves:tectonic_shard')
		.pool(pool => {
			pool.addLoot(LootEntry.of('alexscaves:dinosaur_chop').limitCount([5, 12]));
		})
		.pool(pool => {
			pool.addLoot(LootEntry.of('alexscaves:tectonic_shard').limitCount([3, 5]));
		});

	event.addEntityLootModifier('ars_nouveau:wilden_boss')
		.removeLoot('ars_nouveau:wilden_tribute');

	event.addEntityLootModifier('botania:doppleganger')
		.removeLoot('botania:life_essence')
		.pool(pool => {
			pool.addLoot(LootEntry.of('botania:life_essence').limitCount([2, 3]))
		});

	event.addLootTableModifier('botania:gaia_guardian_2')
		.removeLoot('botania:life_essence')
		.pool(pool => {
			pool.addLoot(LootEntry.of('botania:life_essence').limitCount([3, 5]))
		})
		.pool(pool => {
			pool.addLoot(
				LootEntry.of('minecraft:potion', '{Potion:"minecraft:healing"}')
					.limitCount([5, 12])
			)
		});

	event.addEntityLootModifier('cataclysm:ancient_remnant')
		.removeLoot('cataclysm:sandstorm_in_a_bottle')
		.removeLoot('cataclysm:remnant_skull')
		.removeLoot('cataclysm:ancient_metal_block');

	event.addEntityLootModifier('cataclysm:ender_guardian')
		.removeLoot('cataclysm:gauntlet_of_guard');

	event.addEntityLootModifier('cataclysm:ignis')
		.removeLoot('cataclysm:ignitium_ingot');

	event.addEntityLootModifier('cataclysm:maledictus')
		.removeLoot('cataclysm:cursium_ingot');

	event.addEntityLootModifier('cataclysm:netherite_monstrosity')
		.removeLoot('cataclysm:monstrous_horn')
		.removeLoot('cataclysm:lava_power_cell');

	event.addEntityLootModifier('cataclysm:scylla')
		.removeLoot('cataclysm:lacrima')
		.removeLoot('cataclysm:essence_of_the_storm');

	event.addEntityLootModifier('cataclysm:the_harbinger')
		.removeLoot('cataclysm:witherite_block');

	event.addEntityLootModifier('cataclysm:the_leviathan')
		.removeLoot('cataclysm:tidal_claws')
		.removeLoot('cataclysm:abyssal_egg');

	event.addEntityLootModifier('twilightforest:naga')
		.addLoot(pool => {
			pool.addLoot(
				LootEntry.of('twilightforest:hedge')
					.limitCount([12, 28])
			);
		});

	event.addEntityLootModifier('twilightforest:lich')
		.removeLoot('golden_helmet')
		.removeLoot('golden_chestplate')
		.removeLoot('golden_leggings')
		.removeLoot('golden_boots')
		.removeLoot('golden_sword')
		.addLoot(pool => {
			pool.addLoot(
				LootEntry.of('bone')
					.limitCount([4, 8])
			);
		})
		.addLoot(pool => {
			pool.addLoot(
				LootEntry.of('ender_pearl')
					.limitCount([2, 5])
			);
		});

	event.addEntityLootModifier('twilightforest:minoshroom')
		.removeLoot('twilightforest:diamond_minotaur_axe');

	event.addEntityLootModifier('witherstormmod:withered_symbiont')
		.pool(pool => {
			pool.addLoot(
				LootEntry.of('kubejs:tainted_hook').when(c => c.randomChanceWithLooting(0.5, 0.25))
			);
		});

});
