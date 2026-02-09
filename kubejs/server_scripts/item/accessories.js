LootJS.modifiers((event) => {
	event.removeGlobalModifier("@terra_curio");
});

const tags = [
	"curios:aether_ring",
	"curios:aether_cape",
	"curios:charm",
	"curios:aether_pendant",
	"curios:necklace",
	"curios:bundle",
	"curios:back",
	"curios:head",
	"curios:ring",
	"curios:an_focus",
	"curios:feet",
	"curios:curio",
	"curios:aether_shield",
	"curios:aether_accessory",
	"curios:belt",
	"curios:aether_gloves",
	"curios:bracelet",
	"curios:body",
	//"curios:accessory",
	"curios:quiver",
	"curios:hands",
	"curios:trinkets",
]

ServerEvents.tags('item', event => {

	// Every curio goes into the accessory slot
	tags.forEach(tagId => {
		let tag = event.get(tagId);
		tag.getObjectIds().forEach(entry => {
			if (entry.namespace != "backpacked") { // Except for backpacks
				event.add('curios:accessory', entry);
			}
		});
		tag.removeAll();
	});

	event.remove('curios:ring', [
		'botanicadds:aura_ring_gaia',
		'botanicadds:mana_ring_gaia'
	])

	event.add('curios:accessory', [
		'botanicadds:aura_ring_gaia',
		'botanicadds:mana_ring_gaia'
	])

	// Readd this one thingy to the back tag
	event.add('curios:back', 'backpacked:backpack')

	// Exclusions
	event.add('adjtweaks:curio_exclusions/spell_focus', [
		/ars_elemental:.*_focus/,
		/ars_nouveau:.*_focus/,
	])

	event.add('adjtweaks:curio_exclusions/gloves', [
		/aether:.*_gloves/,
		/umbral_skies:.*gloves/,
		'lost_aether_content:power_gloves',
	])

	event.add('adjtweaks:curio_exclusions/quivers', [
		/quiver/
	])
});

ServerEvents.recipes(event => {
	event.remove({ id: 'terra_curio:obsidian_skull' })
	event.remove({ id: 'terra_curio:ice_skates' })
	event.remove({ id: 'terra_curio:blizzard_in_a_bottle' })
	event.remove({ id: 'terra_curio:rocket_boots' })

	event.shaped(
		'terra_curio:band_of_regeneration',
		[
			' L ',
			'I I',
			' I '
		],
		{
			I: 'iron_ingot',
			L: 'heart_crystals:heart_crystal'
		}
	).id('adj:band_of_regeneration')

	event.shaped(
		'terra_curio:obsidian_skull',
		[
			'OOO',
			'OSO',
			'OOO'
		],
		{
			O: 'obsidian',
			S: 'skeleton_skull'
		}
	).id('adj:obsidian_skull')

	event.shaped(
		'terra_curio:shark_tooth_necklace',
		[
			' S ',
			'T T',
			'TTT'
		],
		{
			T: 'alexsmobs:shark_tooth',
			S: 'string'
		}
	).id('adj:shark_tooth_necklace')

	event.shaped(
		'terra_curio:aglet',
		[
			'BTB',
		],
		{
			T: 'mythicmetals:tin_ingot',
			B: 'mythicmetals:bronze_ingot'
		}
	).id('adj:aglet')

	event.shaped(
		'terra_curio:cobalt_shield',
		[
			'S S',
			'SSS',
			' S '
		],
		{
			S: 'mythicmetals:steel_ingot'
		}
	).id('adj:heavy_steel_shield')

	event.shaped(
		'terra_curio:shiny_red_balloon',
		[
			'RLR',
			'RBR',
			' S '
		],
		{
			S: 'string',
			B: 'slime_ball',
			L: 'leather',
			R: 'red_dye'
		}
	).id('adj:shiny_red_balloon')

	event.shaped(
		'terra_curio:lucky_horseshoe',
		[
			'G G',
			'G G',
			'GGG'
		],
		{
			G: 'mythicmetals:midas_gold_ingot'
		}
	).id('adj:lucky_horseshoe')

	event.shaped(
		'terra_curio:rifle_scope',
		[
			'BSG',
		],
		{
			G: 'glass',
			B: 'mythicmetals:steel_ingot',
			S: 'spyglass'
		}
	).id('adj:rifle_scope')

	event.recipes.ars_nouveau.enchanting_apparatus(
		[
			'aether:cold_aercloud',
			'aether:cold_aercloud',
			'aether:cold_aercloud',
			'aether:cold_aercloud',
			'aether:cold_aercloud',
			'aether:cold_aercloud',
			'aether:cold_aercloud',
			'aether:cold_aercloud'
		],
		'glass_bottle',
		'terra_curio:cloud_in_a_bottle',
		100
	).id('adj:cloud_in_a_bottle')

	// event.recipes.ars_nouveau.enchanting_apparatus(
	// 	[
	// 		'farmersdelight:organic_compost',
	// 		'farmersdelight:organic_compost',
	// 		'farmersdelight:organic_compost',
	// 		'farmersdelight:organic_compost',
	// 		'farmersdelight:organic_compost',
	// 		'farmersdelight:organic_compost',
	// 		'farmersdelight:organic_compost',
	// 		'farmersdelight:organic_compost'
	// 	],
	// 	'terra_curio:cloud_in_a_bottle',
	// 	'terra_curio:fart_in_a_jar',
	// 	300
	// )

	event.custom({
		"type": "terra_curio:workshop",
		"ingredients": [
			{
				"item": "terra_curio:cloud_in_a_bottle"
			},
			{
				"item": "artifacts:whoopee_cushion"
			}
		],
		"result": {
			"item": "terra_curio:fart_in_a_jar"
		}
	}).id('adj:fart_in_a_jar')

	event.recipes.ars_nouveau.enchanting_apparatus(
		[
			'snow_block',
			'snow_block',
			'snow_block',
			'snow_block',
			'snow_block',
			'snow_block',
			'snow_block',
			'snow_block'
		],
		'terra_curio:cloud_in_a_bottle',
		'terra_curio:blizzard_in_a_bottle',
		500
	).id('adj:blizzard_in_a_bottle')


	event.recipes.ars_nouveau.enchanting_apparatus(
		[
			'#sand',
			'#sand',
			'#sand',
			'#sand',
			'#sand',
			'#sand',
			'#sand',
			'#sand'
		],
		'terra_curio:cloud_in_a_bottle',
		'terra_curio:sandstorm_in_a_bottle',
		1000
	).id('adj:sandstorm_in_a_bottle')

	event.recipes.ars_nouveau.enchanting_apparatus(
		[
			'obsidian',
			'obsidian',
			'obsidian'
		],
		'rediscovered:rose',
		'terra_curio:obsidian_rose',
		200
	).id('adj:obsidian_rose')

	event.recipes.botania.mana_infusion(
		'terra_curio:titan_glove',
		'terra_curio:feral_claws',
	).mana(150000).id('adj:titan_glove')

	event.recipes.botania.mana_infusion(
		'terra_curio:paladins_shield',
		'terra_curio:cobalt_shield',
	).mana(750000).id('adj:paladins_shield')

	event.recipes.botania.runic_altar(
		'terra_curio:magma_stone',
		[
			'magma_block',
			'magma_block',
			'magma_block',
			'magma_block',
			'magma_block',
			'mythicmetals:palladium_ingot'
		],
		15000
	).id('adj:magma_stone')

	event.recipes.botania.runic_altar(
		'terra_curio:feral_claws',
		[
			'aether:leather_gloves',
			'botania:rune_earth',
			'botania:green_petal',
			'botania:green_petal',
			'botania:lime_petal',
			'botania:lime_petal'
		],
		15000
	).id('adj:feral_claws')

	event.recipes.botania.petal_apothecary(
		'terra_curio:flower_boots',
		[
			'leather_boots',
			'botania:red_petal',
			'botania:orange_petal',
			'botania:yellow_petal',
			'botania:lime_petal',
			'botania:cyan_petal',
			'botania:light_blue_petal',
			'botania:blue_petal',
			'botania:magenta_petal',
			'botania:purple_petal',
		]
	).id('adj:flower_boots')

	const inter = 'mythicmetals:steel_boots';
	event.recipes.create.sequenced_assembly(
		'terra_curio:rocket_boots',
		'mythicmetals:steel_boots',
		[
			event.recipes.create.deploying(inter, [inter, Item.of('quark:gunpowder_sack')]),
			event.recipes.create.deploying(inter, [inter, Item.of('iron_ingot')]),
			event.recipes.create.deploying(inter, [inter, Item.of('blaze_powder')]),
		]
	).transitionalItem(inter).loops(3).id('adj:rocket_boots')

})

LootJS.modifiers(event => {
	event.addLootTableModifier('artifacts:chests/campsite_chest')
		.pool((pool) => {
			pool.rolls(1)
				.randomChance(1 /* If I ever want to change that */)
			pool.addWeightedLoot([
				LootEntry.of('terra_curio:band_of_regeneration'),
				LootEntry.of('terra_curio:cloud_in_a_bottle'),
				LootEntry.of('terra_curio:climbing_claws'),
				LootEntry.of('terra_curio:ancient_chisel'),
				LootEntry.of('terra_curio:hermes_boots'),
			])
		})

	event.addLootTableModifier('alexscaves:chests/underground_cabin')
		.pool((pool) => {
			pool.randomChance(1);
			pool.addWeightedLoot([
				LootEntry.of('terra_curio:ancient_chisel'),
				LootEntry.of('terra_curio:climbing_claws'),
				LootEntry.of('terra_curio:cloud_in_a_bottle'),
				LootEntry.of('terra_curio:cobalt_shield'),
			])
		});

	event.addLootTableModifier('artifacts:entities/mimic')
		.pool((pool) => {
			pool.randomChance(1);
			pool.addWeightedLoot([
				LootEntry.of('terra_curio:cross_necklace'),
				LootEntry.of('terra_curio:putrid_scent'),
				LootEntry.of('terra_curio:panic_necklace'),
				LootEntry.of('terra_curio:star_cloak'),
				LootEntry.of('terra_curio:titan_glove')
			])
		});

	event.addLootTableModifier('minecraft:chests/nether_bridge')
		.pool((pool) => {
			pool.randomChance(0.33333);
			pool.addWeightedLoot([
				LootEntry.of('terra_curio:magma_stone'),
				LootEntry.of('terra_curio:lava_charm'),
				LootEntry.of('terra_curio:obsidian_rose'),
				LootEntry.of('terra_curio:treasure_magnet'),
			])
		});

	event.addLootTableModifier('minecraft:chests/ruined_portal')
		.pool((pool) => {
			pool.addWeightedLoot([
				LootEntry.of('terra_curio:obsidian_skull')
			])
		});

	event.addLootTableModifier(/the_bumblezone\:structures\/.*/)
		.pool((pool) => {
			pool.randomChance(0.05)
			pool.addLoot(LootEntry.of('terra_curio:honey_comb'))
		})

	event.addEntityLootModifier([
		'spider',
		'cave_spider',
		'born_in_chaos_v1:baby_spider',
		'born_in_chaos_v1:baby_spider_controlled'
	]).pool((pool) => {
		pool.addLoot(LootEntry.of('terra_curio:bezoar').when(c => c.randomChance(0.03)))
	})

	event.addEntityLootModifier('minecraft:wither_skeleton')
		.pool((pool) => {
			pool.addLoot(LootEntry.of('terra_curio:holy_water').when(c => c.randomChance(0.03)))
		})

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
	]).pool((pool) => {
		pool.addLoot(LootEntry.of('terra_curio:holy_water').when(c => c.randomChance(0.01)))
	})

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
		.pool((pool) => {
			pool.addLoot(LootEntry.of('terra_curio:vitamins').when(c => c.randomChance(0.01)))
		}).pool((pool) => {
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
		.pool((pool) => {
			pool.addLoot(LootEntry.of('terra_curio:energy_bar').when(c => c.randomChance(0.015)))
		})

	event.addEntityLootModifier('minecraft:phantom')
		.pool((pool) => {
			pool.addLoot(LootEntry.of('terra_curio:energy_bar').when(c => c.randomChance(0.1)))
		})

	event.addEntityLootModifier(['minecraft:slime', 'minecraft:stray'])
		.pool((pool) => {
			pool.addLoot(LootEntry.of('terra_curio:fast_clock').when(c => c.randomChance(0.02)))
		})

	event.addEntityLootModifier(['minecraft:stray'])
		.pool((pool) => {
			pool.addLoot(LootEntry.of('terra_curio:ice_skates').when(c => c.randomChance(0.01)))
		})
		.pool((pool) => {
			pool.addLoot(LootEntry.of('terra_curio:flurry_boots').when(c => c.randomChance(0.008)))
		})

	event.addEntityLootModifier(['minecraft:guardian'])
		.pool((pool) => {
			pool.addLoot(LootEntry.of('terra_curio:hand_drill').when(c => c.randomChance(0.009)))
		})

	event.addEntityLootModifier(['minecraft:enderman'])
		.pool((pool) => {
			pool.addLoot(LootEntry.of('terra_curio:trifold_map').when(c => c.randomChance(0.05)))
		})

	event.addEntityLootModifier(['minecraft:shulker'])
		.pool((pool) => {
			pool.addLoot(LootEntry.of('terra_curio:shot_put').when(c => c.randomChance(0.12)))
		})

	event.addEntityLootModifier(['born_in_chaos_v1:fallen_chaos_knight'])
		.pool((pool) => {
			pool.addLoot(LootEntry.of('terra_curio:black_belt').when(c => c.randomChance(0.15)))
		})

	event.addEntityLootModifier(['mutantmonsters:mutant_zombie'])
		.pool((pool) => {
			pool.addLoot(LootEntry.of('terra_curio:flesh_knuckles').when(c => c.randomChance(0.33)))
		})

	event.addEntityLootModifier(['minecraft:warden'])
		.pool((pool) => {
			pool.addLoot(LootEntry.of('terra_curio:flashlight').when(c => c.randomChance(1)))
		})

	event.addLootTableModifier(['minecraft:chests/ancient_city'])
		.pool((pool) => {
			pool.addLoot(LootEntry.of('terra_curio:flashlight').when(c => c.randomChance(0.2)))
		})
})

ItemEvents.rightClicked('terra_curio:demon_heart', event => {
	const player = event.getPlayer();
	if (!player.persistentData.usedDemonHeart) {
		player.persistentData.usedDemonHeart = true;
		event.getLevel().playSound(player, player.blockPosition, 'heart_crystals:block.heart_crystal.use', 'players', 1, 1);
		player.swing("main_hand", true);
		event.getItem().shrink(1);
		player.server.runCommandSilent(`/curios add accessory ${player.username} 1`)
	}
	event.cancel()
})

PlayerEvents.loggedIn(event => {
	const server = event.getServer();
	const player = event.getPlayer();
	if (server.hardcore && !player.persistentData.hardcoreInitialized) {
		player.persistentData.hardcoreInitialized = true;
		server.runCommandSilent(`/curios add accessory ${player.username} 1`)
	}
})
