LootJS.modifiers((event) => {
	event.removeGlobalModifier("@confluence");
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
	"curios:hands"
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
	// Readd this one thingy to the back tag
	event.add('curios:back', 'backpacked:backpack')

	// Exclusions
	event.add('adjtweaks:curio_exclusions/spell_focus', [
		/ars_elemental:.*_focus/,
		/ars_nouveau:.*_focus/,
	])

	event.add('adjtweaks:curio_exclusions/gloves', [
		/aether:.*_gloves/,
		'lost_aether_content:power_gloves',
	])

	event.add('adjtweaks:curio_exclusions/quivers', [
		/quiver/
	])
});

ServerEvents.recipes(event => {
	event.remove({ id: 'confluence:obsidian_skull' })
	event.remove({ id: 'confluence:ice_skates' })
	event.remove({ id: 'confluence:blizzard_in_a_bottle' })
	event.remove({ id: 'confluence:rocket_boots' })

	event.shaped(
		'confluence:band_of_regeneration',
		[
			' L ',
			'I I',
			' I '
		],
		{
			I: 'iron_ingot',
			L: 'heart_crystals:heart_crystal'
		}
	)

	event.shaped(
		'confluence:obsidian_skull',
		[
			'OOO',
			'OSO',
			'OOO'
		],
		{
			O: 'obsidian',
			S: 'skeleton_skull'
		}
	)

	event.shaped(
		'confluence:shark_tooth_necklace',
		[
			' S ',
			'T T',
			'TTT'
		],
		{
			T: 'alexsmobs:shark_tooth',
			S: 'string'
		}
	)

	event.shaped(
		'confluence:aglet',
		[
			'BTB',
		],
		{
			T: 'mythicmetals:tin_ingot',
			B: 'mythicmetals:bronze_ingot'
		}
	)

	event.shaped(
		'confluence:cobalt_shield',
		[
			'S S',
			'SSS',
			' S '
		],
		{
			S: 'mythicmetals:steel_ingot'
		}
	)

	event.shaped(
		'confluence:shiny_red_balloon',
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
	)

	event.shaped(
		'confluence:lucky_horseshoe',
		[
			'G G',
			'G G',
			'GGG'
		],
		{
			G: 'mythicmetals:midas_gold_ingot'
		}
	)

	event.shaped(
		'confluence:rifle_scope',
		[
			'BSG',
		],
		{
			G: 'glass',
			B: 'mythicmetals:steel_ingot',
			S: 'spyglass'
		}
	)

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
		'confluence:cloud_in_a_bottle',
		100
	)

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
	// 	'confluence:cloud_in_a_bottle',
	// 	'confluence:fart_in_a_jar',
	// 	300
	// )

	event.custom({
		"type": "confluence:workshop",
		"ingredients": [
			{
				"item": "confluence:cloud_in_a_bottle"
			},
			{
				"item": "artifacts:whoopee_cushion"
			}
		],
		"result": {
			"item": "confluence:fart_in_a_jar"
		}
	})

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
		'confluence:cloud_in_a_bottle',
		'confluence:blizzard_in_a_bottle',
		500
	)


	event.recipes.ars_nouveau.enchanting_apparatus(
		[
			'#c:sands',
			'#c:sands',
			'#c:sands',
			'#c:sands',
			'#c:sands',
			'#c:sands',
			'#c:sands',
			'#c:sands'
		],
		'confluence:cloud_in_a_bottle',
		'confluence:sandstorm_in_a_bottle',
		1000
	)

	event.recipes.ars_nouveau.enchanting_apparatus(
		[
			'obsidian',
			'obsidian',
			'obsidian'
		],
		'rediscovered:rose',
		'confluence:obsidian_rose',
		200
	)

	event.recipes.botania.mana_infusion(
		'confluence:titan_glove',
		'confluence:feral_claws',
	).mana(50000)

	event.recipes.botania.mana_infusion(
		'confluence:paladins_shield',
		'confluence:cobalt_shield',
	).mana(500000)

	event.recipes.botania.runic_altar(
		'confluence:magma_stone',
		[
			'magma_block',
			'magma_block',
			'magma_block',
			'magma_block',
			'magma_block',
			'mythicmetals:palladium_ingot'
		],
		15000
	)

	event.recipes.botania.runic_altar(
		'confluence:feral_claws',
		[
			'aether:leather_gloves',
			'aether:iron_gloves',
			'botania:rune_earth',
			'botania:green_petal',
			'botania:green_petal',
			'botania:lime_petal',
			'botania:lime_petal',
			'mythicmetals:prometheum_ingot'
		],
		15000
	)

	event.recipes.botania.petal_apothecary(
		'confluence:flower_boots',
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
	)

	const inter = 'mythicmetals:steel_boots';
	event.recipes.create.sequenced_assembly(
		'confluence:rocket_boots',
		'mythicmetals:steel_boots',
		[
			event.recipes.create.deploying(inter, [inter, Item.of('quark:gunpowder_sack')]),
			event.recipes.create.deploying(inter, [inter, Item.of('iron_ingot')]),
			event.recipes.create.deploying(inter, [inter, Item.of('blaze_powder')]),
		]
	).transitionalItem(inter).loops(3)

})

LootJS.modifiers(event => {
	event.addLootTableModifier('artifacts:chests/campsite_chest')
		.pool((pool) => {
			pool.rolls(1)
				.randomChance(1 /* If I ever want to change that */)
			pool.addWeightedLoot([
				LootEntry.of('confluence:band_of_regeneration'),
				LootEntry.of('confluence:cloud_in_a_bottle'),
				LootEntry.of('confluence:climbing_claws'),
				LootEntry.of('confluence:ancient_chisel'),
				LootEntry.of('confluence:hermes_boots'),
			])
		})

	event.addLootTableModifier('alexscaves:chests/underground_cabin')
		.pool((pool) => {
			pool.randomChance(1);
			pool.addWeightedLoot([
				LootEntry.of('confluence:ancient_chisel'),
				LootEntry.of('confluence:climbing_claws'),
				LootEntry.of('confluence:cloud_in_a_bottle'),
				LootEntry.of('confluence:cobalt_shield'),
			])
		});

	event.addLootTableModifier('artifacts:entities/mimic')
		.pool((pool) => {
			pool.randomChance(1);
			pool.addWeightedLoot([
				LootEntry.of('confluence:cross_necklace'),
				LootEntry.of('confluence:putrid_scent'),
				LootEntry.of('confluence:panic_necklace'),
				LootEntry.of('confluence:star_cloak'),
				LootEntry.of('confluence:titan_glove')
			])
		});

	event.addLootTableModifier('minecraft:chests/nether_bridge')
		.pool((pool) => {
			pool.randomChance(0.33333);
			pool.addWeightedLoot([
				LootEntry.of('confluence:magma_stone'),
				LootEntry.of('confluence:lava_charm'),
				LootEntry.of('confluence:obsidian_rose'),
				LootEntry.of('confluence:treasure_magnet'),
			])
		});

	event.addLootTableModifier('minecraft:chests/ruined_portal')
		.pool((pool) => {
			pool.addWeightedLoot([
				LootEntry.of('confluence:obsidian_skull')
			])
		});

	event.addLootTableModifier(/the_bumblezone\:structures\/.*/)
		.pool((pool) => {
			pool.randomChance(0.05)
			pool.addLoot(LootEntry.of('confluence:honey_comb'))
		})

	event.addLootTableModifier(/.*entities\:.*spider.*/)
		.pool((pool) => {
			pool.randomChance(0.03)
			pool.addLoot(LootEntry.of('confluence:bezoar'))
		})

	event.addLootTableModifier('minecraft:entities/wither_skeleton')
		.pool((pool) => {
			pool.randomChance(0.03)
			pool.addLoot(LootEntry.of('confluence:holy_water'))
		})

	event.addLootTableModifier(/.*entities\:.*zombie.*/)
		.pool((pool) => {
			pool.randomChance(0.01)
			pool.addLoot(LootEntry.of('confluence:vitamins'))
		})
		.pool((pool) => {
			pool.randomChance(0.01)
			pool.addLoot(LootEntry.of('confluence:shackle'))
		})

	event.addLootTableModifier('minecraft:entities/husk')
		.pool((pool) => {
			pool.randomChance(0.02)
			pool.addLoot(LootEntry.of('confluence:energy_bar'))
		})

	event.addLootTableModifier('minecraft:entities/phantom')
		.pool((pool) => {
			pool.randomChance(0.1)
			pool.addLoot(LootEntry.of('confluence:energy_bar'))
		})

	event.addLootTableModifier(['minecraft:entities/slime', 'minecraft:entities/stray'])
		.pool((pool) => {
			pool.randomChance(0.02)
			pool.addLoot(LootEntry.of('confluence:fast_clock'))
		})

	event.addLootTableModifier(['minecraft:entities/stray'])
		.pool((pool) => {
			pool.randomChance(0.01)
			pool.addLoot(LootEntry.of('confluence:ice_skates'))
		})
		.pool((pool) => {
			pool.randomChance(0.01)
			pool.addLoot(LootEntry.of('confluence:flurry_boots'))
		})

	event.addLootTableModifier(['minecraft:entities/guardian'])
		.pool((pool) => {
			pool.randomChance(0.05)
			pool.addLoot(LootEntry.of('confluence:hand_drill'))
		})

	event.addLootTableModifier(['minecraft:entities/enderman'])
		.pool((pool) => {
			pool.randomChance(0.1)
			pool.addLoot(LootEntry.of('confluence:trifold_map'))
		})

	event.addLootTableModifier(['minecraft:entities/shulker'])
		.pool((pool) => {
			pool.randomChance(0.12)
			pool.addLoot(LootEntry.of('confluence:shot_put'))
		})

	event.addLootTableModifier(['born_in_chaos_v1:entities/fallen_chaos_knight'])
		.pool((pool) => {
			pool.randomChance(0.15)
			pool.addLoot(LootEntry.of('confluence:black_belt'))
		})

	event.addLootTableModifier(['mutantmonsters:entities/mutant_zombie'])
		.pool((pool) => {
			pool.randomChance(0.33)
			pool.addLoot(LootEntry.of('confluence:flesh_knuckles'))
		})

	event.addLootTableModifier(['entities/warden'])
		.pool((pool) => {
			pool.randomChance(1)
			pool.addLoot(LootEntry.of('confluence:flashlight'))
		})

	event.addLootTableModifier(['minecraft:chests/ancient_city'])
		.pool((pool) => {
			pool.randomChance(0.2)
			pool.addLoot(LootEntry.of('confluence:flashlight'))
		})
})

ItemEvents.rightClicked('confluence:demon_heart', event => {
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
