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

	event.addEntityLootModifier('alexscaves:magnetron')
		.pool(pool => {
			pool.rolls(0);
			pool.addLoot(LootEntry.of('alexscaves:heart_of_iron'));
		})
		.pool(pool => {
			pool.rolls(2);
			pool.addLoot(LootEntry.of('alexscaves:raw_scarlet_neodymium').limitCount([-1, 2]).applyLootingBonus([0, 1]));
			pool.addLoot(LootEntry.of('alexscaves:raw_azure_neodymium').limitCount([-1, 2]).applyLootingBonus([0, 1]));
		});

	event.addEntityLootModifier('alexscaves:boundroid')
		.removeLoot('alexscaves:heavyweight')
		.pool(pool => {
			pool.rolls(1);
			pool.addLoot(LootEntry.of('alexscaves:raw_scarlet_neodymium').limitCount([-1, 3]).applyLootingBonus([0, 1]));
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

	event.addEntityLootModifier([
		'zombie',
		'husk',
		'born_in_chaos_v1:decaying_zombie',
		'variantsandventures:gelid',
		'variantsandventures:thicket',
	])
		.pool(pool => {
			pool.addLoot(
				LootEntry.of('majruszsdifficulty:cloth')
					.when(c => c.randomChanceWithLooting(0.15, 0.05))
			)
		});

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
		'born_in_chaos_v1:baby_spider_controlled',
		'variantsandventures:thicket',
		'variantsandventures:verdant',
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
					.when(c => {
						c.randomChance(0.06);
						c.customCondition(fromChapter(2));
					})
			);
		});

	// Recall Potions and Wormhole Potions in loot tables
	function recallPotRandomDrop(chance, min, max) {
		let amount = [global.getOrDefault(min, 1), global.getOrDefault(max, 1)];
		/**
		 * @param {Internal.GroupedLootBuilder_} pool 
		 */
		let potionPool = (pool) => {
			pool.randomChance(chance).addAlternativesLoot(
				LootEntry.of('wormholepotion:wormhole_potion')
					.limitCount(amount)
					.when(c => {
						c.randomChance(0.5);
						c.customCondition({
							condition: 'adjcore:is_multiplayer'
						});
					}),
				LootEntry.of('majruszsdifficulty:recall_potion')
					.limitCount(amount)
			);
		}
		return potionPool;
	}

	event.addLootTableModifier('minecraft:chests/ancient_city').pool(recallPotRandomDrop(0.66, 2, 4));
	event.addLootTableModifier('minecraft:chests/simple_dungeon').pool(recallPotRandomDrop(0.5, 2, 3));
	event.addLootTableModifier('minecraft:chests/abandoned_mineshaft').pool(recallPotRandomDrop(0.5, 1, 2));
	event.addLootTableModifier('minecraft:chests/jungle_temple').pool(recallPotRandomDrop(0.5, 2, 3));
	event.addLootTableModifier('minecraft:chests/nether_fortress').pool(recallPotRandomDrop(0.35, 1, 3));
	event.addLootTableModifier('minecraft:chests/shipwreck_supply').pool(recallPotRandomDrop(1, 1, 3));
	event.addLootTableModifier('minecraft:chests/buried_treasure').pool(recallPotRandomDrop(1, 2, 5));
	event.addLootTableModifier('minecraft:chests/end_city_treasure').pool(recallPotRandomDrop(0.333, 1, 3));
	event.addLootTableModifier(/minecraft:chests\/.*village.*/).pool(recallPotRandomDrop(0.1, 1, 2));
	event.addLootTableModifier(/.*chests\/.*witch_villa.*/).pool(recallPotRandomDrop(0.1, 1, 2));
	event.addLootTableModifier(/nova_structures:chests\/dungeon.*/).pool(recallPotRandomDrop(0.35, 1, 3));
	event.addLootTableModifier('adjcore:chests/evilcraft_dark_temple').pool(recallPotRandomDrop(0.5, 1, 3));
	event.addLootTableModifier(/veggiesdelight:chests\/vd_wagon.*/).pool(recallPotRandomDrop(1, 1, 2));
	event.addLootTableModifier('twilightforest:chests/hedge_maze').pool(recallPotRandomDrop(0.25, 1, 2));
	event.addLootTableModifier(/twilight_treehouses:chests\/.*/).pool(recallPotRandomDrop(0.25, 1, 3));

	// Fishing + Tide Crates
	event.addLootTableModifier(/tide:chests\/crates\/.*/).pool(recallPotRandomDrop(0.66, 2, 3));

	event.addLootTableModifier('tide:chests/crates/surface_freshwater')
		.pool(pool => {
			pool.rolls([1, 2]);
			pool.randomChance(0.75).addWeightedLoot([
				LootEntry.of('raw_iron').withWeight(7).limitCount([1, 2]),
				LootEntry.of('mythicmetals:raw_tin').withWeight(5).limitCount([1, 2]),
				LootEntry.of('coal').withWeight(8).limitCount([2, 3]),
				LootEntry.of('quartz').withWeight(8).limitCount([3, 7]),
			])
		})
		.pool(pool => {
			pool.randomChance(0.5).addWeightedLoot([
				LootEntry.of('oak_log').withWeight(20).limitCount([2, 8]),
				LootEntry.of('birch_log').withWeight(10).limitCount([2, 8]),
				LootEntry.of('jungle_log').withWeight(4).limitCount([2, 8]),
				LootEntry.of('dark_oak_log').withWeight(6).limitCount([2, 8]),
				LootEntry.of('acacia_log').withWeight(6).limitCount([2, 8]),
				LootEntry.of('spruce_log').withWeight(10).limitCount([2, 8]),
			])
		})
		.pool(pool => {
			pool.randomChance(0.25).addWeightedLoot([
				LootEntry.of('oak_sapling').withWeight(30).limitCount([1, 2]),
				LootEntry.of('birch_sapling').withWeight(20).limitCount([1, 2]),
				LootEntry.of('jungle_sapling').withWeight(4).limitCount([1, 1]),
				LootEntry.of('dark_oak_sapling').withWeight(10).limitCount([1, 3]),
				LootEntry.of('acacia_sapling').withWeight(8).limitCount([1, 2]),
				LootEntry.of('spruce_sapling').withWeight(14).limitCount([1, 2]),
			])
		})
		.pool(pool => {
			pool.randomChance(0.15).addWeightedLoot([
				LootEntry.of('terra_curio:tsunami_in_a_bottle'),
				LootEntry.of('terra_curio:sailfish_boots'),
				LootEntry.of('terra_curio:shoe_spikes'),
			]);
		});

	event.addLootTableModifier('tide:chests/crates/surface_saltwater')
		.pool(pool => {
			pool.rolls([1, 3]);
			pool.randomChance(0.75).addWeightedLoot([
				LootEntry.of('raw_iron').withWeight(7).limitCount([1, 2]),
				LootEntry.of('mythicmetals:raw_aquarium').withWeight(10).limitCount([1, 2]),
				LootEntry.of('coal').withWeight(10).limitCount([2, 3]),
			])
		})
		.pool(pool => {
			pool.addLoot(
				LootEntry.of('upgrade_aquatic:driftwood_log').limitCount([2, 6])
			)
		})
		.pool(pool => {
			pool.randomChance(0.1).addWeightedLoot([
				LootEntry.of('hybrid_aquatic:basking_shark_plushie'),
				LootEntry.of('hybrid_aquatic:bull_shark_plushie'),
				LootEntry.of('hybrid_aquatic:frilled_shark_plushie'),
				LootEntry.of('hybrid_aquatic:great_white_shark_plushie'),
				LootEntry.of('hybrid_aquatic:hammerhead_shark_plushie'),
				LootEntry.of('hybrid_aquatic:thresher_shark_plushie'),
				LootEntry.of('hybrid_aquatic:tiger_shark_plushie'),
				LootEntry.of('hybrid_aquatic:whale_shark_plushie'),
			]);
		})
		.pool(pool => {
			pool.randomChance(0.15).addWeightedLoot([
				LootEntry.of('hybrid_aquatic:manglerfish_fin'),
				LootEntry.of('hybrid_aquatic:manglerfish_lure'),
				LootEntry.of('hybrid_aquatic:eel_scarf'),
				LootEntry.of('hybrid_aquatic:moon_jellyfish_hat'),
			]);
		})
		.pool(pool => {
			pool.randomChance(0.5).addWeightedLoot([
				LootEntry.of('hybrid_aquatic:pink_hatxolotl'),
				LootEntry.of('hybrid_aquatic:cyan_hatxolotl'),
				LootEntry.of('hybrid_aquatic:blue_hatxolotl'),
				LootEntry.of('hybrid_aquatic:brown_hatxolotl'),
				LootEntry.of('hybrid_aquatic:gold_hatxolotl'),

			]);
		})
		.pool(pool => {
			pool.addWeightedLoot([
				LootEntry.of('terra_curio:tsunami_in_a_bottle'),
				LootEntry.of('terra_curio:sailfish_boots'),
				LootEntry.of('terra_curio:flipper'),
				LootEntry.of('terra_curio:water_walking_boots')
			]);
		});

	event.addLootTableModifier('tide:chests/crates/underground')
		.pool(pool => {
			pool.rolls([1, 3]);
			pool.randomChance(0.75).addWeightedLoot([
				LootEntry.of('raw_iron').withWeight(14).limitCount([1, 3]),
				LootEntry.of('raw_gold').withWeight(8).limitCount([1, 2]),
				LootEntry.of('lapis_lazuli').withWeight(8).limitCount([2, 6]),
				LootEntry.of('mythicmetals:raw_tin').withWeight(5).limitCount([1, 2]),
				LootEntry.of('coal').withWeight(4).limitCount([2, 3]),
				LootEntry.of('emerald').withWeight(7).limitCount([1, 3]),
				LootEntry.of('mythicmetals:raw_mythril').withWeight(7).limitCount([1, 2]).when(c => c.customCondition({ condition: 'adjcore:is_chapter', from: 1 })),
				LootEntry.of('mythicmetals:raw_orichalcum').withWeight(7).limitCount([1, 2]).when(c => c.customCondition({ condition: 'adjcore:is_chapter', from: 1 })),
			]);
		})
		.pool(pool => {
			pool.randomChance(0.3).addLoot(
				LootEntry.of('spelunker:amethyst_dust').limitCount([2, 4])
			);
		})
		.pool(pool => {
			pool.randomChance(0.75).addWeightedLoot([
				LootEntry.of('terra_curio:band_of_regeneration'),
				LootEntry.of('terra_curio:hermes_boots'),
				LootEntry.of('terra_curio:cloud_in_a_bottle'),
				LootEntry.of('terra_curio:climbing_claws'),
			]);
		});

	event.addLootTableModifier('tide:chests/crates/deep')
		.pool(pool => {
			pool.rolls([1, 3]);
			pool.randomChance(0.75).addWeightedLoot([
				LootEntry.of('raw_iron').withWeight(14).limitCount([1, 3]),
				LootEntry.of('raw_gold').withWeight(10).limitCount([1, 2]),
				LootEntry.of('redstone').withWeight(8).limitCount([2, 10]),
				LootEntry.of('diamond').withWeight(3).limitCount([1, 3]),
				LootEntry.of('mythicmetals:raw_mythril').withWeight(8).limitCount([1, 3]).when(c => c.customCondition({ condition: 'adjcore:is_chapter', from: 1 })),
				LootEntry.of('mythicmetals:raw_orichalcum').withWeight(8).limitCount([1, 3]).when(c => c.customCondition({ condition: 'adjcore:is_chapter', from: 1 })),
				LootEntry.of('mythicmetals:raw_adamantite').withWeight(5).limitCount([1, 3]).when(c => c.customCondition({ condition: 'adjcore:is_chapter', from: 3 })),
				LootEntry.of('mythicmetals:unobtainium').withWeight(3).limitCount([1, 2]).when(c => c.customCondition({ condition: 'adjcore:is_chapter', from: 5 })),
			]);
		})
		.pool(pool => {
			pool.randomChance(0.6).addLoot(
				LootEntry.of('spelunker:amethyst_dust').limitCount([2, 5])
			);
		})
		.pool(pool => {
			pool.randomChance(0.75).addWeightedLoot([
				LootEntry.of('terra_curio:band_of_regeneration'),
				LootEntry.of('terra_curio:hermes_boots'),
				LootEntry.of('terra_curio:cloud_in_a_bottle'),
				LootEntry.of('terra_curio:climbing_claws'),
			]);
		});

	event.addLootTableModifier('tide:chests/crates/surface_lava')
		.pool(pool => {
			pool.addWeightedLoot([
				LootEntry.of('terra_curio:cross_necklace'),
				LootEntry.of('terra_curio:putrid_scent'),
				LootEntry.of('terra_curio:panic_necklace'),
				LootEntry.of('terra_curio:star_cloak'),
				LootEntry.of('terra_curio:titan_glove'),
			]);
		});

	event.addLootTableModifier('tide:chests/crates/underground_lava')
		.pool(pool => {
			pool.rolls([1, 3]);
			pool.randomChance(0.75).addWeightedLoot([
				LootEntry.of('raw_gold').withWeight(35).limitCount([1, 3]),
				LootEntry.of('redstone').withWeight(23).limitCount([2, 10]),
				LootEntry.of('diamond').withWeight(8).limitCount([1, 3]),
				LootEntry.of('mythicmetals:raw_mythril').withWeight(12).limitCount([1, 3]).when(c => c.customCondition({ condition: 'adjcore:is_chapter', from: 1 })),
				LootEntry.of('mythicmetals:raw_orichalcum').withWeight(12).limitCount([1, 3]).when(c => c.customCondition({ condition: 'adjcore:is_chapter', from: 1 })),
				LootEntry.of('mythicmetals:raw_adamantite').withWeight(7).limitCount([1, 3]).when(c => c.customCondition({ condition: 'adjcore:is_chapter', from: 3 })),
				LootEntry.of('mythicmetals:unobtainium').withWeight(4).limitCount([1, 2]).when(c => c.customCondition({ condition: 'adjcore:is_chapter', from: 5 })),
			]);
		})
		.pool(pool => {
			pool.addWeightedLoot([
				LootEntry.of('terra_curio:cross_necklace'),
				LootEntry.of('terra_curio:putrid_scent'),
				LootEntry.of('terra_curio:panic_necklace'),
				LootEntry.of('terra_curio:star_cloak'),
				LootEntry.of('terra_curio:titan_glove'),
			]);
		});

	event.addLootTableModifier('tide:chests/crates/deep_lava')
		.pool(pool => {
			pool.rolls([1, 3]);
			pool.randomChance(0.75).addWeightedLoot([
				LootEntry.of('raw_gold').withWeight(24).limitCount([1, 3]),
				LootEntry.of('redstone').withWeight(12).limitCount([3, 12]),
				LootEntry.of('diamond').withWeight(8).limitCount([1, 3]),
				LootEntry.of('mythicmetals:raw_mythril').withWeight(12).limitCount([1, 3]).when(c => c.customCondition({ condition: 'adjcore:is_chapter', from: 1 })),
				LootEntry.of('mythicmetals:raw_orichalcum').withWeight(12).limitCount([1, 3]).when(c => c.customCondition({ condition: 'adjcore:is_chapter', from: 1 })),
				LootEntry.of('mythicmetals:raw_adamantite').withWeight(7).limitCount([1, 3]).when(c => c.customCondition({ condition: 'adjcore:is_chapter', from: 3 })),
				LootEntry.of('mythicmetals:unobtainium').withWeight(4).limitCount([1, 2]).when(c => c.customCondition({ condition: 'adjcore:is_chapter', from: 5 })),
			]);
		})
		.pool(pool => {
			pool.addWeightedLoot([
				LootEntry.of('terra_curio:cross_necklace'),
				LootEntry.of('terra_curio:putrid_scent'),
				LootEntry.of('terra_curio:panic_necklace'),
				LootEntry.of('terra_curio:star_cloak'),
				LootEntry.of('terra_curio:titan_glove'),
			]);
		});

	event.addLootTableModifier('tide:chests/crates/nether')
		.pool(pool => {
			pool.rolls([1, 3]);
			pool.randomChance(0.75).addWeightedLoot([
				LootEntry.of('quartz').withWeight(17).limitCount([4, 9]),
				LootEntry.of('raw_gold').withWeight(24).limitCount([1, 3]),
				LootEntry.of('mythicmetals:raw_midas_gold').withWeight(11).limitCount([1, 3]),
				LootEntry.of('mythicmetals:raw_stormyx').withWeight(8).limitCount([1, 2]),
				LootEntry.of('mythicmetals:raw_palladium').withWeight(4).limitCount([1, 2]).when(c => c.customCondition({ condition: 'adjcore:is_chapter', from: 2 })),
				LootEntry.of('ancient_debris').withWeight(2).limitCount([1, 2]).when(c => c.customCondition({ condition: 'adjcore:is_chapter', from: 3 })),
			]);
		})
		.pool(pool => {
			pool.addWeightedLoot([
				LootEntry.of('terra_curio:lava_charm'),
				LootEntry.of('terra_curio:magma_stone'),
				LootEntry.of('terra_curio:obsidian_rose'),
			]);
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

	for (let [entityId, eyeId] of Object.entries(global.eyeDrops)) {
		event.addEntityLootModifier(entityId)
			.pool(pool => {
				pool.rolls(0);
				pool.addLoot(
					LootEntry.of(
						`kubejs:eye_of_${global.eyeDrops[entityId]}`,
						{
							display: {
								Lore: [
									'{"text":"Guaranteed to drop on 1st kill","italic":false,"color":"gold"}',
									'{"text":"20%% chance to drop on every next kill","italic":false,"color":"gold"}',
									'{"text":"(33% in Hardcore mode)","italic":false,"color":"gold"}'
								]
							}
						}
					)
				);
			});
	}

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
