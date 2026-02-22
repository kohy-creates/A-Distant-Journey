ServerEvents.recipes((event) => {

	function flattenedID(text) {
		text = text.toString();
		if (text.includes(' ')) {
			text = text.split(' ')[1];
		}
		return text.replace(':', '_').replace('#', '');
	}

	/** @type {Internal.InputItem[]}*/
	const disabledItemRecipes = [
		global.rediscoveredFurniture(),
		global.blacklistedItems,
		'naturescompass:naturescompass',
		'enchantinginfuser:enchanting_infuser',
		'tiab:time_in_a_bottle',
		'beacon',
		'rediscovered:nether_reactor_core',
		'recovery_compass',
		'supplementaries:slice_map',
		'map',
		'netherexp:soul_candle',
		'netherexp:soul_skeleton_skull_candle',
		'additionaladditions:rose_gold_alloy',
		'farmersdelight:safety_net',
		'botania:star_sword',
		'botania:thunder_sword',
		'lead',
		'redidscovered:gear',
		/alloy_forgery/,
		'quark:deepslate_furnace',
		'rediscovered:ruby_eye',
		'rediscovered:gear',
		'ars_nouveau:novice_spell_book',
		'mythicmetals:durasteel_engine',
		'witherstormmod:super_beacon',
		'witherstormmod:super_support_beacon',
		'supplementaries:rope',
		'ars_nouveau:arcanist_boots',
		'ars_nouveau:arcanist_hood',
		'ars_nouveau:arcanist_leggings',
		'ars_nouveau:arcanist_robes',
		/ars_elemental:.*_boots/,
		/ars_elemental:.*_robes/,
		/ars_elemental:.*_leggings/,
		/ars_elemental:.*_hat/,
		'ars_nouveau:worn_notebook',
		'quark:pipe',
		'quark:encased_pipe',
		'@functionalstorage',
		'experienceobelisk:cognitive_flux',
		'botania:redstone_root',
		'minecraft:chest',
		'farmersdelight:dough',
		'mythicmetals:orichalcum_hammer',
		'botania:terra_sword',
		'minecraft:lodestone',
		'botania:mana_pylon',
		'botania:natura_pylon',
		'botania:gaia_pylon',
		'botania:spark',
		'enchantinginfuser:advanced_enchanting_infuser',
		'twilightforest:uncrafting_table',
		'ars_elemental:mark_of_mastery',
		'just_blahaj:creeperhaj',
		'window_box:chthonic_yew_sapling',
		'window_box:alfthorne_sapling',
		'architects_palette:unobtanium_block',
		'architects_palette:esoterrack',
		'architects_palette:nebulite',
		'architects_palette:moonshale',
		'architects_palette:craterstone',
		'architects_palette:moonshale_bricks',
		'architects_palette:plating_block',
		/twilightforest:.*chest$/,
		'twilightforest:raw_ironwood',
		/twilightforest:.*banner_pattern$/,
		'ars_nouveau:source_jar',
		'ars_additions:ender_source_jar',
		'@nameless_trinkets',
		'@ftbquests',
		'simplyswords:tainted_relic',
		'ars_nouveau:ring_of_lesser_discount',
		'ars_nouveau:ring_of_greater_discount',
		'ars_nouveau:ring_of_potential',
		'neapolitan:milk_bottle',
		'botania:alfheim_portal',
		'vinery:grapevine_stem',
		'nethervinery:obsidian_stem',
		'accents:sewing_kit',
		/itemfilters/,
		/.*aether.*\:.*cape/,
		/constructionwand/,
		/twilightforest:.*_cloud/,
		/toms_storage:ts\..*_terminal/,
		'toms_storage:ts.inventory_connector',
		/toms_storage:ts\..*_filter/,
	]
	disabledItemRecipes.forEach(item => {
		event.remove({ output: item })
	})

	/** @type {Special.RecipeId[]} */
	const removeRecipeByID = [
		'rediscovered:studded_boots_from_iron',
		'rediscovered:studded_helmet_from_iron',
		'rediscovered:studded_leggings_from_iron',
		'rediscovered:studded_chestplate_from_iron',
		'moresnifferflowers:netherite_scrap_from_part_recycling',
		'create_ultimate_factory:crushing_netherite',
		'mythicmetals:alloy_forge/alloy_celestium_from_ingots',
		'mythicmetals:alloy_forge/alloy_celestium_from_ingots_alt',
		'mythicmetals:alloy_forge/alloy_celestium_from_ores',
		'mythicmetals:alloy_forge/alloy_celestium_from_raw_ores',
		'mythicmetals:alloy_forge/alloy_metallurgium_from_ingots',
		'mythicmetals:alloy_forge/alloy_metallurgium_from_ingots_alt',
		'mythicmetals:alloy_forge/alloy_metallurgium_from_ores',
		'mythicmetals:alloy_forge/alloy_metallurgium_from_raw_ores',
		'create:crafting/materials/copper_nugget',
		'create:crafting/materials/copper_ingot',
		'suppsquared:copper_lantern',
		'suppsquared:copper_lantern_2',
		'ars_nouveau:unbreaking_2',
		'ars_nouveau:unbreaking_3',
		'ars_nouveau:protection_5',
		'ars_nouveau:projectile_protection_5',
		'ars_nouveau:fire_protection_5',
		'ars_nouveau:sharpness_5',
		'ars_nouveau:looting_2',
		'ars_nouveau:looting_3',
		'ars_nouveau:fortune_2',
		'ars_nouveau:fortune_3',
		'ars_nouveau:efficiency_4',
		'ars_nouveau:efficiency_5',
		'ars_nouveau:power_4',
		'ars_nouveau:power_5',
		'create:mixing/andesite_alloy',
		'create:mixing/andesite_alloy_from_zinc',
		'create:crafting/materials/andesite_alloy',
		'create:crafting/materials/andesite_alloy_from_zinc',
		'farmersdelight:pie_crust',
		'delightful:food/pie_crust_from_fat',
		'experienceobelisk:cognitive_alloy',
		'experienceobelisk:metamorpher/cognitive_alloy_metamorphosis',
		'sortilege:experience_bottle',
		'sortilege:cauldron/turtle_master',
		'sortilege:cauldron/slow_falling',
		'sortilege:cauldron/poison',
		'sortilege:cauldron/leaping',
		'minecraft:candle',
		'delightful:candle_from_animal_fat',
		'quark:tweaks/crafting/utility/bent/bread',
		'create:crafting/appliances/dough',
		'create:mixing/dough_by_mixing',
		'mythicmetals:alloy_forge/alloy_steel_from_ingots',
		'mythicmetals:alloy_forge/alloy_steel_from_ores',
		'mythicmetals:alloy_forge/alloy_steel_from_raw_ores',
		'mythicmetals:blasting/blast_stormyx_ingot_from_raw_ore',
		'mythicmetals:blasting/blast_stormyx_ingot_from_ores',
		'mythicmetals:alloy_forge/forge_stormyx_ingot_from_ores',
		'mythicmetals:alloy_forge/forge_stormyx_ingot_from_raw_ore',
		'minecraft:bread',
		'botania:flighttiara_0',
		/ars_additions:locate_structure/,
		'mythicmetals:blasting/blast_adamantite_ingot_from_ores',
		'mythicmetals:blasting/blast_adamantite_ingot_from_raw_ore',
		'mythicmetals:blasting/blast_adamantite_nugget_from_equipment',
		/alloy_forgery:compat/,
		/alloy_forgery:.*_block/,
		/mythicmetals:alloy_forge\/blast_adamantite_ingot/,
		/mythicmetals:alloy_forge\/forge_mythril_ingot/,
		/mythicmetals:alloy_forge\/forge_orichalcum_ingot/,
		/mythicmetals:blasting\/blast_orichalcum_ingot/,
		/mythicmetals:blasting\/blast_mythril_ingot/,
		'unusualend:pearly_ingot_recipe',
		'minecraft:netherite_ingot',
		'alloy_forgery:netherite_from_gold_and_scrap',
		'experienceobelisk:metamorpher/netherite_ingot_metamorphosis',
		'mythicmetals:blasting/blast_mythril_ingot_from_ores',
		'mythicmetals:blasting/blast_mythril_ingot_from_raw_ore',
		'mythicmetals:blasting/blast_mythril_nugget_from_equipment',
		'alloy_forgery:compat/silver_ingot_from_raw_ores',
		'alloy_forgery:compat/silver_ingot_from_ores',
		'create:smoking/bread',
		'netherexp:nether_quartz_from_quartz_block',
		'create:mixing/brass_ingot',
		'minecraft:ender_eye',
		'netherdepthsupgrade:ender_eye',
		/botania:mana_infusion\/.*_leaves_dupe/,
		'alexscaves:seeking_arrow',
		'cataclysm:void_scatter_arrow',
		'minecraft:spectral_arrow',
		'naturalist:spectral_arrow_from_glow_goop',
		'rediscovered:purple_arrow',
		'quark:tools/crafting/torch_arrow',
		'tide:deep_aqua_arrow',
		'netherexp:phasmo_arrow',
		'createutilities:mixing/void_steel_ingot',
		/create:crushing\/raw_.*/,
		'create_things_and_misc:diluted_bonemeal_craft',
		'twilightforest:material/blasted_ironwood_ingot',
		'twilightforest:material/smelted_ironwood_ingot',
		'create_ultimate_factory:crushing_coral',
		'create_ultimate_factory:crushing_blackstone',
		'create_ultimate_factory:crushing_endstone',
		/create:crushing\/.*_recycling/,
		'ars_nouveau:sourcestone',
		'ars_nouveau:imbuement_lapis',
		'ars_nouveau:imbuement_amethyst',
		'ars_nouveau:imbuement_amethyst_block',
		/ars_nouveau:crush_.*$/,
		/ars_elemental:.*_crush$/,
		'ars_nouveau:spell_bow',
		'ars_nouveau:spell_crossbow',
		'ars_nouveau:enchanters_mirror',
		'ars_nouveau:enchanters_shield',
		'ars_nouveau:enchanters_sword',
		'create:crafting/materials/experience_nugget_from_block',
		'create:crafting/materials/experience_block',
		'botania:spawner_claw',
		'botania:spawner_mover',
		'ars_nouveau:fire_essence_to_magma_block',
		'ancient_aether:valkyrum',
		'aether_redux:valkyrum_enchanting_from_raw_ore',
		'mythicmetals:alloy_forge/alloy_hallowed_from_ingots',
		'mythicmetals:alloy_forge/alloy_hallowed_from_ores',
		'mythicmetals:alloy_forge/alloy_hallowed_from_raw_ores',
		/cutting\/.*trophy/,
		'etcetera:white_sweater',
		'etcetera:white_hat',
		/handcrafted:.*_sheet/,
		/handcrafted:.*_cushion/,
		'twilightdelight:cutting/ice_bow',
		'mynethersdelight:crafting/tnt_alt',
		'zenith:zenith',
		'majruszsdifficulty:enderium_ingot_horizontal',
		'majruszsdifficulty:enderium_ingot_vertical',
		'neapolitan:chocolate/chocolate_bar',
		'neapolitan:chocolate/chocolate_bar_from_chocolate_block',
		'neapolitan:chocolate/chocolate_block',
		'neapolitan:milk/milk_bottles_from_bucket',
		/minecraft\:dye_.*_wool/,
		'endersdelight:cutting/ender_shard',
		'evilcraft:crafting/weather_container',
		'terra_curio:obsidian_skull',
		'terra_curio:ice_skates',
		'terra_curio:blizzard_in_a_bottle',
		'terra_curio:rocket_boots',
		'create_ultimate_factory:haunting_apple',
		'evilcraft:special/vengeance_pickaxe',
		'evilcraft:special/vein_sword',
		'evilcraft:special/minecraft_dead_bush',
		/mythicmetals:.*\/forge_adamantite_ingot/,
		'minecraft:hopper',
		'quark:tweaks/crafting/utility/misc/easy_hopper',
		'create:crafting/kinetics/speedometer',
		'minecraft:cake',
		'neapolitan:cake'
	]
	removeRecipeByID.forEach(recipe => {
		event.remove({ id: recipe })
	})

	const removeRecipeByType = [
		'aether:repairing',
		'botania:pure_daisy',
		'vinery:wine_fermentation',
		'vinery:apple_mashing',
		'vinery:apple_fermenting',
		'oreberriesreplanted:vat_recipe',
		/oreberriesreplanted/,
		'twilightforest:crumble_horn',
		'twilightforest:uncrafting',
		'jumbofurnace:jumbo_smelting',
		'morered:soldering'
	]
	removeRecipeByType.forEach(recipeType => {
		event.remove({ type: recipeType })
	})

	const removeRecipeByInput = [
		'create:crushed_raw_iron',
		'create:crushed_raw_gold',
		'create:crushed_raw_copper',
		'create:crushed_raw_zinc',
		/oreberriesreplanted/
	]
	removeRecipeByInput.forEach(item => {
		event.remove({ input: item })
	})

	// Unification and replacement map
	const unificationMap = {
		input: {
			'farmersdelight:wheat_dough': 'create:dough',
			'#forge:dough/wheat': 'create:dough',
			'croptopia:dough': 'create:dough',
			'minecraft:chest': '#forge:chests/wooden',
			'minecraft:shield': 'shieldexp:iron_shield',
			'#c:ender_pearls': 'ender_pearl',
			'create:copper_nugget': 'mythicmetals:copper_nugget',
			'aether:skyroot_stick': 'stick',
			'minecraft:clock': '#adj:clock',
			'farmersdelight:rope': 'supplementaries:rope',
			'architects_palette:withered_bone_block': 'netherexp:wither_bone_block',
			'architects_palette:withered_bone': 'netherexp:fossil_fuel',
			'twilightforest:raw_ironwood': 'twilightforest:ironwood_ingot',
			"minecraft:totem_of_undying": "twilightforest:charm_of_life_2",
			'botania:mana_string': 'ars_nouveau:magebloom_fiber',
			'botania:mana_diamond': 'ars_nouveau:source_gem',
			'botania:mana_diamond_block': 'ars_nouveau:source_gem_block',
			'botania:manaweave_cloth': 'ars_nouveau:magebloom_block',
			'ars_nouveau:wilden_wing': 'miners_delight:bat_wing',
			'alexscaves:banana': 'neapolitan:banana',
			'neapolitan:milk_bottle': 'farmersdelight:milk_bottle',
			'create:experience_nugget': 'ars_nouveau:experience_gem',
			'croptopia:cherry': 'vinery:cherry',
			'croptopia:flour': 'create:wheat_flour',
			'#forge:salts': 'galosphere:pink_salt_shard',
			'#forge:milks': '#c:milk',
			'#forge:milk_bottles': 'farmersdelight:milk_bottle',
			'#forge:wines': 'vinery:red_wine',
			'#botania:mana_diamond_gems': 'ars_nouveau:source_gem',
			'#architects_palette:withered_bones': 'netherexp:fossil_fuel',
			'#c:cinnamon': 'croptopia:cinnamon',
			'twilightforest:fallen_leaves': '#leaves',
			'croptopia:salt': 'galosphere:pink_salt_shard',
			'croptopia:walnut': 'ecologics:walnut',
			'croptopia:food_press': 'minecraft:air',
			'croptopia_additions:carbonation_machine': 'minecraft:air',
			'morered:stone_plate': 'smooth_stone_slab',
			'create:bar_of_chocolate': 'neapolitan:chocolate_bar',
			'croptopia:chocolate': 'neapolitan:chocolate_bar',
			'upgrade_aquatic:thrasher_tooth': 'alexsmobs:shark_tooth'
		},
		output: {
			'create:experience_nugget': 'ars_nouveau:experience_gem',
			'create:crushed_raw_iron': 'raw_iron',
			'create:crushed_raw_gold': 'raw_gold',
			'create:crushed_raw_copper': 'raw_copper',
			'create:crushed_raw_zinc': 'create:raw_zinc',
			'farmersdelight:wheat_dough': 'create:dough',
			'create:copper_nugget': 'mythicmetals:copper_nugget',
			'farmersdelight:rope': 'supplementaries:rope',
			"minecraft:totem_of_undying": "twilightforest:charm_of_life_1",
			'create:bar_of_chocolate': 'neapolitan:chocolate_bar'
		}
	}
	for (const [input, replacement] of Object.entries(unificationMap.input)) {
		event.replaceInput({ input: input },
			input,
			replacement
		)
	}
	for (const [output, replacement] of Object.entries(unificationMap.output)) {
		event.replaceInput({ output: output },
			output,
			replacement
		)
	}

	event.shaped(
		'minecraft:hopper',
		[
			'ICI',
			' I '
		],
		{
			C: '#c:chests',
			I: 'iron_ingot'
		}
	).id('minecraft:hopper')

	event.shaped(
		'minecraft:hopper',
		[
			' L ',
			'ILI',
			' I '
		],
		{
			L: '#logs',
			I: 'iron_ingot'
		}
	).id('adj:easy_hopper')

	event.recipes.farmersdelight.cutting(
		'#adj:salt',
		'#minecraft:pickaxes',
		[
			'2x galosphere:pink_salt_shard',
			Item.of('galosphere:pink_salt_shard', 1).withChance(0.35)
		],
	).id('adj:pink_salt_shard')


	event.shapeless(
		'8x magma_block',
		[
			'ars_nouveau:fire_essence',
			'#forge:stone',
			'#forge:stone',
			'#forge:stone',
			'#forge:stone',
			'#forge:stone',
			'#forge:stone',
			'#forge:stone',
			'#forge:stone'
		]
	).id('adj:magma_block_from_fire_essence')

	// Create Experience Block <-> Experience Gem
	event.shaped(
		'create:experience_block',
		[
			'GG',
			'GG',
		],
		{
			G: 'ars_nouveau:greater_experience_gem'
		}
	).id('adj:experience_block')

	event.shapeless(
		'4x ars_nouveau:greater_experience_gem',
		[
			'create:experience_block',
		]
	).id('adj:experience_gem_from_block')

	// Wooden Armor
	event.shaped(
		'kubejs:wooden_helmet',
		[
			'WWW',
			'W W'
		],
		{
			W: '#logs'
		}
	).id('adj:wooden_helmet')

	event.shaped(
		'kubejs:wooden_chestplate',
		[
			'W W',
			'WWW',
			'WWW'
		],
		{
			W: '#logs'
		}
	).id('adj:wooden_chestplate')

	event.shaped(
		'kubejs:wooden_leggings',
		[
			'WWW',
			'W W',
			'W W'
		],
		{
			W: '#logs'
		}
	).id('adj:wooden_leggings')

	event.shaped(
		'kubejs:wooden_boots',
		[
			'W W',
			'W W'
		],
		{
			W: '#logs'
		}
	).id('adj:wooden_boots')

	event.shaped(
		Item.of('enchantinginfuser:enchanting_infuser', 1),
		[
			' B ',
			'AOA',
			'OCO'
		],
		{
			B: 'kubejs:enchanters_guide',
			A: 'minecraft:amethyst_shard',
			O: 'minecraft:obsidian',
			C: 'minecraft:crying_obsidian'
		}
	).id('adj:enchanting_table')

	// Recovery compass has Soulbound on by default
	event.shaped(
		Item.of('minecraft:recovery_compass').enchant('sortilege:soulbound', 1),
		[
			' E ',
			'ECE',
			' E '
		],
		{
			E: 'minecraft:echo_shard',
			C: 'minecraft:compass'
		}
	).id('minecraft:recovery_compass')

	// Cheaper Lodestones
	event.shaped(
		'lodestone',
		[
			'CCC',
			'CIC',
			'CCC'
		],
		{
			C: 'smooth_stone',
			I: 'ars_nouveau:source_gem'
		}
	).id('adj:lodestone')

	// Dyed blocks consistency and tweaks
	Color.DYE.forEach(color => {

		event.shapeless(
			`8x minecraft:${color}_terracotta`,
			[
				`minecraft:${color}_dye`,
				'minecraft:terracotta',
				'minecraft:terracotta',
				'minecraft:terracotta',
				'minecraft:terracotta',
				'minecraft:terracotta',
				'minecraft:terracotta',
				'minecraft:terracotta',
				'minecraft:terracotta'
			]
		).id(`minecraft:${color}_terracotta`)

		event.shaped(
			`4x hearth_and_home:${color}_terracotta_bricks`,
			[
				'TT',
				'TT'
			],
			{
				T: `minecraft:${color}_terracotta`
			}
		).id(`adj:${color}_terracotta_bricks`)

		event.shapeless(
			`8x hearth_and_home:${color}_terracotta_bricks`,
			[
				`minecraft:${color}_dye`,
				'hearth_and_home:terracotta_bricks',
				'hearth_and_home:terracotta_bricks',
				'hearth_and_home:terracotta_bricks',
				'hearth_and_home:terracotta_bricks',
				'hearth_and_home:terracotta_bricks',
				'hearth_and_home:terracotta_bricks',
				'hearth_and_home:terracotta_bricks',
				'hearth_and_home:terracotta_bricks'
			]
		).id(`hearth_and_home:${color}_terracotta_bricks`)
	})

	event.recipes.botania.mana_infusion('naturescompass:naturescompass', 'minecraft:compass').mana(1000000).id('adj:nature_compass')

	function itemsOnGround(ingredients, output, id, inBlock, comment) {
		let recipe = {
			"type": "lychee:item_inside",
			"item_in": [],
			"blocks_in": (inBlock) ? inBlock : "*",
			"post": [
				{
					"type": "drop_item",
					"item": (Array.isArray(output)) ? output[0] : output,
					"count": (Array.isArray(output)) ? output[1] : 1,
				}
			],
			"comment": (comment) ? comment : "Toss those items anywhere on the ground,\nclose together, to combine them into the result item!"
		}

		ingredients.forEach(i => {
			if (Array.isArray(i)) {
				for (let j = 0; j < i[1]; j++) {
					recipe.item_in.push({
						"item": i[0]
					})
				}
			}
			else {
				recipe.item_in.push({
					"item": i
				})
			}
		})

		event.custom(recipe).id((id) ? id : `adj:${flattenedID((Array.isArray(output)) ? output[0] : output)}`)
	}


	// from Architect's Palette
	function warping(item, output, dimension, id) {
		let ingr = {};
		if (item.startsWith('#')) {
			ingr["tag"] = item.substring(1);
		}
		else {
			ingr["item"] = item
		}

		let dim = (!dimension || dimension == null) ? 'minecraft:the_nether' : dimension;

		event.custom({
			type: "architects_palette:warping",
			dimension: dim,
			ingredient: [
				ingr
			],
			result: {
				"item": output
			}
		}).id((id) ? id : `adj:warping/${flattenedID(dim)}/${flattenedID(output)}_from_${flattenedID(item)}`)
	}
	function aetherWarping(item, output, id) {
		warping(item, output, 'aether:the_aether', id)
	}
	function skylandsWarping(item, output, id) {
		warping(item, output, 'rediscovered:skylands', id)
	}

	aetherWarping('andesite', 'architects_palette:esoterrack')
	aetherWarping('diorite', 'architects_palette:nebulite')
	aetherWarping('stone', 'architects_palette:moonshale')
	aetherWarping('cobblestone', 'architects_palette:craterstone')
	aetherWarping('stone_bricks', 'architects_palette:moonshale_bricks')

	skylandsWarping('cherry_sapling', 'rediscovered:ancient_cherry_sapling')
	skylandsWarping('cherry_leaves', 'rediscovered:ancient_cherry_leaves')

	event.shaped(
		'50x architects_palette:unobtanium_block',
		[
			'UT',
			'TU'
		],
		{
			U: 'mythicmetals:unobtainium',
			T: 'supplementaries:stone_tile'
		}
	).id('adj:missing_tiles')

	event.shaped(
		'20x architects_palette:plating_block',
		[
			'PP',
			'PP'
		],
		{
			P: 'create:iron_sheet'
		}
	).id('adj:plating_block')

	/**
	 * Registers a BotanicAdds Gaia Plate recipe
	 *
	 * @param {Internal.InputItem_[]} inputs - List of items or tags (prefix with # for tags)
	 * @param {Internal.OutputItem_} output - The resulting item ID
	 * @param {number} mana - Mana cost
	 */
	function gaiaPlateRecipe(inputs, output, mana) {
		const ingredients = inputs.map(id => {
			if (typeof id === "string") {
				return id.startsWith("#") ? { tag: id.slice(1) } : { item: id }
			}
			if (id && id.toJson) {
				return id.toJson()
			}

			return id
		})


		event.custom({
			type: "botanicadds:gaia_plate",
			ingredients: ingredients,
			result: { item: output },
			mana: mana
		}).id(`adj:gaia_plate/${flattenedID(output)}`);
	}

	function terraPlateAndGaiaPlate(inputs, output, mana) {
		event.recipes.botania.terra_plate(output, inputs).mana(mana).id(`adj:terra_plate/${flattenedID(output)}`)
		gaiaPlateRecipe(inputs, output, Math.round(mana * 0.6))
	}

	// Time in a Bottle
	gaiaPlateRecipe(
		[
			"#adj:clock",
			"glass_bottle",
			"mythicmetals:runite_ingot",
			"mythicmetals:runite_ingot",
			"mythicmetals:hallowed_ingot",
			"mythicmetals:hallowed_ingot",
			"nether_star"
		],
		"tiab:time_in_a_bottle",
		500000
	);

	// Beacon
	terraPlateAndGaiaPlate(
		[
			"nether_star",
			"crying_obsidian",
			"crying_obsidian",
			"crying_obsidian",
			"mythicmetals:palladium_block",
			"#c:glass_blocks",
			"#c:glass_blocks",
			"#c:glass_blocks"
		],
		"minecraft:beacon",
		1000000
	);

	// Super Beacon
	gaiaPlateRecipe(
		[
			"witherstormmod:withered_nether_star",
			"witherstormmod:tainted_glass",
			"witherstormmod:tainted_glass",
			"witherstormmod:tainted_glass",
			"witherstormmod:tainted_glass",
			"witherstormmod:tainted_glass",
			"witherstormmod:tainted_flesh_block",
			"witherstormmod:tainted_flesh_block",
			"witherstormmod:amulet",
			"beacon"
		],
		"witherstormmod:super_beacon",
		1000000
	);

	// Super Support Beacon
	gaiaPlateRecipe(
		[
			"nether_star",
			"witherstormmod:tainted_glass",
			"witherstormmod:tainted_glass",
			"witherstormmod:tainted_glass",
			"witherstormmod:tainted_glass",
			"witherstormmod:tainted_glass",
			"witherstormmod:tainted_flesh_block",
			"witherstormmod:tainted_flesh_block"
		],
		"witherstormmod:super_support_beacon",
		500000
	);

	// Nether Reactor Core
	terraPlateAndGaiaPlate(
		[
			"nether_star",
			"iron_block",
			"iron_block",
			"iron_block",
			"diamond_block",
			"diamond_block"
		],
		"rediscovered:nether_reactor_core",
		1000000
	);

	function alloyForgeRecipe(inputs, output, minTier, fuelPerTick, tierOverrides) {

		let recipe = {
			type: 'alloy_forgery:forging',
			inputs: [],
			output: {},
			overrides: {},
			min_forge_tier: minTier,
			fuel_per_tick: fuelPerTick
		}

		inputs.forEach(entry => {
			let input = entry[0];
			const count = (entry[1]) ? entry[1] : 1;

			let type = 'item';

			if (input.indexOf('#') === 0) {
				type = 'tag';
				input = input.substring(1);
			}

			let object = {};
			object[type] = input;
			object['count'] = count;

			recipe.inputs.push(object)
		})

		let object = {};

		let count, outputItem
		if (Array.isArray(output)) {
			outputItem = output[0];
			count = output[1];
		}
		else {
			outputItem = output;
			count = 1;
		}

		object['id'] = outputItem;
		object['count'] = count;

		recipe.output = object;

		if (tierOverrides) {
			tierOverrides.forEach(override => {

				recipe.overrides[override[0]] = {
					id: (override[1] === 'output') ? outputItem : override[1],
					count: override[2],
				}
			})
		}

		event.custom(recipe)
			.id(`adj:alloying/${flattenedID((Array.isArray(output)) ? output[0] : (output.includes(' ')) ? output.split(' ')[1] : output)}_from_${flattenedID(inputs[0][0])}`);
	}

	alloyForgeRecipe(
		[
			['minecraft:copper_ingot', 1],
			['minecraft:redstone', 5]
		],
		['morered:red_alloy_ingot', 1],
		1,
		5,
		[
			['3+', 'output', 2],
			['4+', 'output', 3],
		]
	)
	alloyForgeRecipe(
		[
			['minecraft:raw_copper', 1],
			['minecraft:redstone', 5]
		],
		['morered:red_alloy_ingot', 2],
		1,
		5,
		[
			['3+', 'output', 3],
			['4+', 'output', 4],
		]
	)

	alloyForgeRecipe(
		[
			['minecraft:gold_ingot', 2],
			['minecraft:copper_ingot', 3]
		],
		'additionaladditions:rose_gold_alloy',
		1,
		5,
		[
			['3+', 'output', 2]
		]
	)

	alloyForgeRecipe(
		[
			['minecraft:raw_gold', 2],
			['minecraft:raw_copper', 3]
		],
		['additionaladditions:rose_gold_alloy', 2],
		1,
		5,
		[
			['3+', 'output', 3]
		]
	)

	alloyForgeRecipe(
		[
			['minecraft:gold_ingot', 4],
			['minecraft:netherite_scrap', 4]
		],
		'minecraft:netherite_ingot',
		3,
		40,
		[
			['4+', 'output', 2]
		]
	)

	function ironArmorRecipe(shape, outputItem) {
		event.remove({ output: outputItem });
		event.shaped(
			Item.of(outputItem),
			shape,
			{
				I: 'iron_ingot',
				S: 'create:iron_sheet'
			}
		).id(`adj:${flattenedID(outputItem)}`)
	};
	ironArmorRecipe(['SIS', 'I I'], 'minecraft:iron_helmet');
	ironArmorRecipe(['I I', 'SIS', 'SIS'], 'minecraft:iron_chestplate');
	ironArmorRecipe(['SIS', 'I I', 'I I'], 'minecraft:iron_leggings');
	ironArmorRecipe(['I I', 'S S'], 'minecraft:iron_boots');

	function kyberArmorRecipe(shape, outputItem) {
		event.remove({ output: outputItem });
		event.shaped(
			Item.of(outputItem),
			shape,
			{
				I: 'mythicmetals:kyber_ingot',
				S: 'amethyst_shard'
			}
		).id(`adj:${flattenedID(outputItem)}`)
	};
	kyberArmorRecipe(['SIS', 'I I'], 'mythicmetals:kyber_helmet');
	kyberArmorRecipe(['I I', 'SIS', 'SIS'], 'mythicmetals:kyber_chestplate');
	kyberArmorRecipe(['SIS', 'I I', 'I I'], 'mythicmetals:kyber_leggings');
	kyberArmorRecipe(['I I', 'S S'], 'mythicmetals:kyber_boots');

	function manasteelArmorRecipe(shape, outputItem) {
		event.remove({ output: outputItem });
		event.shaped(
			Item.of(outputItem),
			shape,
			{
				I: 'botania:manasteel_ingot',
				S: 'kubejs:manasteel_sheet'
			}
		).id(`adj:${flattenedID(outputItem)}`)
	};
	manasteelArmorRecipe(['SIS', 'I I'], 'botania:manasteel_helmet');
	manasteelArmorRecipe(['I I', 'SIS', 'SIS'], 'botania:manasteel_chestplate');
	manasteelArmorRecipe(['SIS', 'I I', 'I I'], 'botania:manasteel_leggings');
	manasteelArmorRecipe(['I I', 'S S'], 'botania:manasteel_boots');

	function terrasteelArmorRecipe(rune, input, output) {
		event.remove({ output: output });
		event.shaped(
			output,
			[
				'TRT',
				'SIS',
				'DHD'
			],
			{
				T: 'botania:livingwood_twig',
				S: 'botania:terrasteel_ingot',
				H: 'mythicmetals:hallowed_ingot',
				D: 'botania:dragonstone',
				I: input,
				R: rune
			}
		).id(`adj:${flattenedID(output)}`)
	}
	terrasteelArmorRecipe(rune('spring'), 'botania:manasteel_helmet', 'botania:terrasteel_helmet');
	terrasteelArmorRecipe(rune('summer'), 'botania:manasteel_chestplate', 'botania:terrasteel_chestplate');
	terrasteelArmorRecipe(rune('autumn'), 'botania:manasteel_leggings', 'botania:terrasteel_leggings');
	terrasteelArmorRecipe(rune('winter'), 'botania:manasteel_boots', 'botania:terrasteel_boots');

	event.custom({
		'type': 'create:pressing',
		'ingredients': [
			{
				'item': 'botania:manasteel_ingot'
			}
		],
		'results': [
			{
				'item': 'kubejs:manasteel_sheet'
			}
		]
	}).id('adj:manasteel_sheet_from_pressing')
	event.recipes.botania.mana_infusion('kubejs:manasteel_sheet', 'create:iron_sheet').mana(3000).id('adj:manasteel_sheet_from_infusion')

	event.shaped(
		'kubejs:diamond_upgrade',
		[
			' D ',
			'DID',
			' D '
		],
		{
			D: 'diamond',
			I: 'create:iron_sheet'
		}
	).id('adj:diamond_upgrade')
	const diamondItems = [
		'pickaxe',
		'axe',
		'sword',
		'shovel',
		'hoe',
		'helmet',
		'chestplate',
		'leggings',
		'boots'
	]
	diamondItems.forEach((item) => {
		event.remove({ output: `minecraft:diamond_${item}` })
		event.smithing(
			`minecraft:diamond_${item}`,
			'kubejs:diamond_upgrade',
			`additionaladditions:rose_gold_${item}`,
			'diamond'
		).id(`minecraft:diamond_${item}`)
	})

	event.shaped(
		'mythicmetals:orichalcum_hammer',
		[
			' OA',
			' SO',
			'S  '
		],
		{
			S: "stick",
			O: 'mythicmetals:orichalcum_block',
			A: 'mythicmetals:adamantite_block'
		}
	).id('adj:orichalcum_hammer')

	// Furnaces require a piece of Coal
	/**
	 * @param {Internal.InputItem_} material 
	 * @param {Internal.OutputItem_} outputItem 
	 */
	function furnaceRecipe(material, outputItem) {
		event.remove({ output: outputItem });
		event.shaped(
			Item.of(outputItem),
			[
				'BBB',
				'BCB',
				'BBB'
			],
			{
				B: material,
				C: '#c:coal'
			}
		).id(`adj:${outputItem.split(':')[1]}`)
	};
	furnaceRecipe('minecraft:cobblestone', 'minecraft:furnace')
	furnaceRecipe('minecraft:cobbled_deepslate', 'quark:deepslate_furnace')
	furnaceRecipe('minecraft:blackstone', 'quark:blackstone_furnace')

	// Cheaper templates
	const otherTemplates = [
		'additionaladditions:rose_gold_upgrade',
		'born_in_chaos_v1:dark_upgrade',
		'quark:smithing_template_rune'
	]
	event.forEachRecipe({ type: 'minecraft:crafting_shaped' }, (recipe) => {
		let output = recipe.getOriginalRecipeResult();
		if (output.id.indexOf('_smithing_template') === -1) {
			if (!otherTemplates.includes(output.id)) return
		};

		let ingredients = recipe.getOriginalRecipeIngredients().toArray();
		let material = ingredients[4];
		let material2 = ingredients[0];

		event.remove({ output: output.id });
		event.shapeless(Item.of(output.id, 2), [
			output.id,
			material,
			material2,
			material2
		]).id(`adj:smithing_template_copy_${output.id.replace(':', '_')}`);
	})

	/**
	 * @param {Internal.OutputItem_} outputItem 
	 * @param {Internal.InputItem_} input1 
	 * @param {Internal.InputItem_} input2 
	 * @param {Internal.InputItem_} center 
	 */
	// Some templates can also be crafted normally
	function templateRecipe(outputItem, input1, input2, center) {
		event.shaped(
			Item.of(outputItem),
			[
				'iIi',
				'ICI',
				'iIi'
			],
			{
				i: input1,
				I: input2,
				C: center
			}
		).id(`adj:${flattenedID(outputItem)}`);
	};
	templateRecipe('born_in_chaos_v1:dark_upgrade', 'born_in_chaos_v1:dark_metal_nugget', 'born_in_chaos_v1:dark_metal_ingot', 'born_in_chaos_v1:seedof_chaos');
	templateRecipe('additionaladditions:rose_gold_upgrade', 'iron_ingot', 'cobblestone', 'additionaladditions:rose_gold_alloy');
	templateRecipe('galosphere:silver_upgrade_smithing_template', 'galosphere:silver_ingot', '#minecraft:planks', 'iron_ingot');
	templateRecipe('mythicmetals:osmium_chainmail_smithing_template', 'mythicmetals:osmium_nugget', 'andesite', 'mythicmetals:osmium_ingot')

	// Pottery Sherd copying
	Item.list.toArray().forEach(/** @param {Internal.Item} item*/ item => {
		if (item.id.includes('_sherd')) {
			event.shapeless(
				Item.of(item, 2),
				[
					item,
					'brick',
					'brick',
					'brick',
					'brick'
				]
			).id(`adj:sherd_copying/${flattenedID(item.id)}`)
		}
	})

	// Limitite
	event.recipes.ars_nouveau.enchanting_apparatus(
		[
			'ars_nouveau:source_gem_block',
			'ars_nouveau:source_gem_block',
			'minecraft:lapis_block',
			'minecraft:lapis_block'
		],
		'minecraft:amethyst_shard',
		'sortilege:limitite',
		1500
	).id('adj:limitite');

	// Crying Obsidian
	event.recipes.ars_nouveau.imbuement(
		'minecraft:obsidian',
		'minecraft:crying_obsidian',
		600,
		[]
	).id('adj:crying_obsidian')

	event.shaped(
		Item.of('minecraft:bundle'),
		[
			' S ',
			'L L',
			' L '
		],
		{
			S: 'minecraft:string',
			L: 'minecraft:leather'
		}
	).id('minecraft:bundle')

	// Lychee
	// Item in block
	/**
	 * @param {Internal.InputItem_} item 
	 * @param {Internal.Block_} block 
	 * @param {Internal.OutputItem_} output 
	 */
	function lycheeItemInBlock(item, block, output) {
		event.custom({
			'type': 'lychee:item_inside',
			'ghost': false,
			'hide_in_viewer': false,
			'item_in': [
				{
					'item': `${item}`
				}
			],
			'block_in': `${block}`,
			'post': [
				{
					'type': 'drop_item',
					'item': `${output}`
				}
			]
		}).id(`adj:item_in_block/${output.replace('#', '').replace(':', '_')}_from_${item.replace('#', '').replace(':', '_')}_in_${block.replace('#', '').replace(':', '_')}`)
	}

	/** @type {Internal.Block_} */
	const ectoplasm = 'netherexp:ectoplasm';
	function ectoplasmTransform(from, to) {
		lycheeItemInBlock(from, ectoplasm, to);
	}

	ectoplasmTransform('minecraft:magma_block', 'netherexp:soul_magma_block');
	ectoplasmTransform('minecraft:soul_sand', 'netherexp:ecto_soul_sand');
	ectoplasmTransform('minecraft:blackstone', 'netherexp:soul_slate');
	ectoplasmTransform('minecraft:torchflower', 'netherexp:soul_torchflower');
	ectoplasmTransform('minecraft:coal', 'netherexp:fossil_fuel');
	ectoplasmTransform('minecraft:rib_armor_trim_smithing_template', 'netherexp:valor_armor_trim_smithing_template');
	ectoplasmTransform('minecraft:shroomlight', 'netherexp:shroomnight');

	// Helper getter for the next few things
	let copperItems = []
	const pattern1 = /^(minecraft|create):copper_/
	let rustyItems = []
	const pattern2 = /netherexp:rusty_/
	Item.getList().forEach(item => {
		let id = item.id.toString();
		if (pattern1.test(id)) {
			copperItems.push(insertIntoID(id, 'MODIF_'))
		} else if (pattern2.test(id)) {
			rustyItems.push(id)
		}
	})

	// Copper weathering in Ectoplasm
	function insertIntoID(original, toInsert) {
		let parts = original.split(':');
		return parts[0] + ':' + toInsert + parts[1];
	}

	const transformations = [
		{ 'base': 'exposed' },
		{ 'exposed': 'weathered' },
		{ 'weathered': 'oxidized' }
	]
	copperItems.forEach(item => {
		let input, output;
		for (let i = 0; i < 3; i++) {
			let [left, right] = Object.entries(transformations[i])[0];
			let itemToTransform = item.replace('_block', '')
			if (left == 'base') {
				input = item.replace('MODIF_', '').replace('_MODIF', '');
			} else {
				input = itemToTransform.replace('MODIF', left)
			}
			output = itemToTransform.replace('MODIF', right)
			if (Item.exists(output)) lycheeItemInBlock(input, ectoplasm, output);
		}
	})

	// Item used on block
	function lycheeItemOnBlockTransform(item, block, toPlace, commands) {
		event.custom({
			type: 'lychee:block_interacting',
			item_in: item.startsWith('#')
				? { tag: item.slice(1) }
				: { item: item },
			block_in: block,
			post: (function () {
				let base = [
					{ type: 'place', block: toPlace },
					{ type: 'damage_item' }
				];
				if (Array.isArray(commands)) {
					for (let cmd of commands) {
						base.push({
							type: 'execute',
							command: 'execute align xyz positioned ~.5 ~.5 ~.5 run ' + cmd,
							hide: true
						});
					}
				}
				return base;
			})()
		}).id(`adj:item_on_block/${flattenedID(toPlace)}_from_${flattenedID(item)}_on_${flattenedID(block)}`);
	}

	// Derustifying items
	rustyItems.forEach(item => {
		lycheeItemOnBlockTransform('#minecraft:axes', item, item.replace('rusty_', ''), ['particle minecraft:wax_off ~ ~ ~ 0.5 0.5 0.5 1 15', 'playsound minecraft:item.axe.scrape block @a[distance=0..] ~ ~ ~ 1 1'])
		// And also rusting them in Ectoplasm
		lycheeItemInBlock(item.replace('rusty_', ''), ectoplasm, item);
	})

	event.custom({
		'type': 'lychee:item_inside',
		'contextual': [
			{
				'type': 'location',
				'offsetY': -1,
				'predicate': {
					'block': {
						'tag': 'minecraft:campfires',
						'state': {
							'lit': 'true'
						}
					}
				}
			}
		],
		'post': [
			{
				'type': 'execute',
				'command': 'execute align xyz run playsound minecraft:block.brewing_stand.brew block @a[distance=0..] ~.5 ~.5 ~.5 1 1.3',
				'hide': true
			},
			{
				'type': 'execute',
				'command': 'execute align xyz run playsound minecraft:entity.fishing_bobber.splash block @a[distance=0..] ~.5 ~.5 ~.5 0.5 1.2',
				'hide': true
			},
			{
				'type': 'place',
				'block': 'cauldron'
			},
			{
				'type': 'drop_item',
				'item': 'majruszsdifficulty:recall_potion',
				'count': 2
			}
		],
		'item_in': [
			{
				'item': 'tide:glowfish'
			},
			{
				'item': 'spelunker:amethyst_dust'
			},
			{
				'item': 'spelunker:amethyst_dust'
			},
			{
				'item': 'spelunker:amethyst_dust'
			},
			{
				'item': 'minecraft:glass_bottle'
			},
			{
				'item': 'minecraft:glass_bottle'
			}
		],
		'block_in': {
			'blocks': [
				'minecraft:water_cauldron'
			],
			'state': {
				'level': '3'
			}
		}
	}).id('adj:recall_potion')



	event.recipes.create.milling([Item.of('spelunker:amethyst_dust'), Item.of('spelunker:amethyst_dust').withChance(0.25)], 'amethyst_shard', 60).id('adj:amethyst_dust_crushing')

	event.shaped(
		Item.of('supplementaries:quiver'),
		[
			'L L',
			'SLL',
			'SLL'
		],
		{
			S: 'string',
			L: 'leather',
		}
	).id('adj:quiver')

	// Weapons
	event.shaped(
		Item.of('botania:thunder_sword'),
		[
			' S ',
			'GSG',
			' T '
		],
		{
			S: 'mythicmetals:stormyx_ingot',
			T: 'botania:livingwood_twig',
			G: 'botanicadds:gaiasteel_ingot'
		}
	).id('botania:thunder_sword')

	event.custom({
		'type': 'sortilege:cauldron_brewing',
		'input': {
			'item': 'minecraft:iron_ingot'
		},
		'output': 'kubejs:endurance'
	}).id('adj:cauldron_brewing/endurance_potion')

	// Food can only be cooked in a Smoker and a Campfire
	event.remove({
		'type': 'smelting', 'output': [
			'baked_potato',
			/\:baked\_/,
			/boiled/,
			'#forge:foods/meat/cooked',
			/cooked_/,
			'#alexscaves:gelatins',
			// 'bread',
			'farmersdelight:fried_egg',
			/roasted/,
			'delightful:cactus_steak',
			'artifacts:eternal_steak',
			'unusualend:end_blob_jelly',
			'berry_good:sweet_berry_meatballs',
			'mynethersdelight:toasts',
			'ecologics:crab_meat',
			'mynethersdelight:bread_loaf',
			'dried_kelp'
		]
	})

	event.shaped(
		Item.of('wither_skeleton_skull'),
		[
			'FFF',
			'FFF',
			'FFF'
		],
		{
			F: 'kubejs:skull_fragment'
		}
	).id('adj:wither_skeleton_skull')

	event.shaped(
		Item.of('create_power_loader:andesite_chunk_loader'),
		[
			'GGG',
			'GAG',
			'CSC'
		],
		{
			G: '#c:glass_blocks',
			A: 'minecraft:amethyst_block',
			C: 'create:andesite_casing',
			S: 'create:shaft'
		}
	).id('adj:andesite_chunk_loader')
	event.recipes.create.mechanical_crafting(
		Item.of('create_power_loader:brass_chunk_loader'),
		[
			'GGGGG',
			'G   G',
			'G A G',
			'CPPPC',
			'CCSCC'
		],
		{
			G: '#c:glass_blocks',
			A: 'minecraft:amethyst_block',
			C: 'create:brass_casing',
			S: 'create:shaft',
			P: 'create:precision_mechanism'
		}
	).id('adj:brass_chunk_loader')

	// Unify ropes
	event.shaped(
		Item.of('farmersdelight:safety_net'),
		[
			'RR',
			'RR'
		],
		{
			R: 'supplementaries:rope'
		}
	).id('adj:safety_net')
	event.shaped(
		Item.of('supplementaries:rope', 20),
		[
			'F',
			'F',
			'F'
		],
		{
			F: 'supplementaries:flax'
		}
	).id('adj:rope')

	// Unify Silver
	alloyForgeRecipe(
		[
			['#c:raw_silver_ores', 2],
		],
		['galosphere:silver_ingot', 3],
		1,
		5,
		[
			['2+', 'output', 4]
		]
	)
	alloyForgeRecipe(
		[
			['#c:silver_ores', 1],
		],
		['galosphere:silver_ingot', 2],
		1,
		5,
		[
			['2+', 'output', 3],
			['3+', 'output', 4]
		]
	)

	// Remove unused MythicMetals recipes
	event.remove({ input: /manganese/ });
	event.remove({ input: /quadrillum/ });

	// Harder Bread
	event.replaceInput({ output: '#forge:dough' },
		'wheat',
		'create:wheat_flour'
	)
	event.shapeless(
		Item.of('create:dough', 2),
		[
			'create:wheat_flour',
			'create:wheat_flour',
			'#forge:water'
		]
	).id('adj:dough_manual_only')

	event.shapeless(
		Item.of('create:dough', 4),
		[
			'create:wheat_flour',
			'create:wheat_flour',
			'create:wheat_flour',
			'#forge:eggs'
		]
	).id('adj:dough_from_eggs')

	// Map stuff
	event.remove({ type: 'crafting_special_mapextending' })
	event.remove({ type: 'crafting_special_mapcloning' })
	// Readd recipe for the Slice Map but using the Depth Meter the modpack uses
	event.shapeless(
		Item.of('supplementaries:slice_map', 8),
		[
			Item.of('map'),
			Item.of('map'),
			Item.of('map'),
			Item.of('map'),
			Item.of('map'),
			Item.of('map'),
			Item.of('map'),
			Item.of('map'),
			Item.of('additionaladditions:depth_meter')
		]
	).id('adj:slice_map')
	// Cheaper Maps
	event.shaped(
		Item.of('map'),
		[
			'PP',
			'PP'
		],
		{
			P: 'paper'
		}
	).id('minecraft:map')

	// Harder Waystones
	let waystonesRemove = [
		'#waystones:waystones',
		'waystones:portstone',
		'waystones:sharestone',
		'waystones:warp_plate',
		'waystones:warp_stone',
		'waystones:warp_dust',
	]
	waystonesRemove.forEach(item => {
		event.remove({ output: item })
	});

	event.recipes.create.pressing('2x endersdelight:ender_shard', 'ender_pearl').id('adj:ender_shard')

	event.shapeless(
		'waystones:warp_dust',
		[
			Item.of('endersdelight:ender_shard'),
			Item.of('spelunker:amethyst_dust'),
			Item.of('spelunker:amethyst_dust')
		]
	).id('adj:warp_dust')
	event.recipes.ars_nouveau.enchanting_apparatus(
		[
			'waystones:warp_dust',
			'waystones:warp_dust',
			'waystones:warp_dust',
			'waystones:warp_dust',
			'botanicadds:rune_tp',
			'evilcraft:dark_gem',
			'evilcraft:dark_gem',
			'evilcraft:dark_gem'
		],
		'aether:zanite_gemstone',
		'waystones:warp_stone',
		7000
	).id('adj:waystones/warp_stone');
	function waystoneRecipe(waystone, material) {
		event.recipes.create.mechanical_crafting(
			waystone,
			[
				'BBBBB',
				'BSASB',
				' BSB ',
				' OWO ',
				' BSB ',
				'BSASB',
				'BBBBB'
			],
			{
				O: 'obsidian',
				W: 'waystones:warp_stone',
				A: 'mythicmetals:adamantite_ingot',
				S: 'mythicmetals:stormyx_ingot',
				B: material
			}
		).id(`adj:waystones/${waystone.split(':')[1]}`)
	}
	waystoneRecipe('waystones:waystone', 'polished_andesite');
	waystoneRecipe('waystones:sandy_waystone', 'sandstone');
	waystoneRecipe('waystones:mossy_waystone', 'mossy_cobblestone');
	waystoneRecipe('waystones:deepslate_waystone', 'polished_deepslate');
	waystoneRecipe('waystones:blackstone_waystone', 'blackstone');
	waystoneRecipe('waystones:end_stone_waystone', 'end_stone_bricks');
	event.recipes.ars_nouveau.enchanting_apparatus(
		[
			'waystones:warp_dust',
			'waystones:warp_dust',
			'waystones:warp_dust',
			'waystones:warp_dust',
			'aether:zanite_gemstone',
			'aether:zanite_gemstone',
			'aether:zanite_gemstone',
			'aether:zanite_gemstone'
		],
		'waystones:waystone',
		'waystones:sharestone',
		1000
	).id('adj:waystones/sharestone');
	event.recipes.ars_nouveau.enchanting_apparatus(
		[
			'waystones:warp_dust',
			'waystones:warp_dust',
			'waystones:warp_dust',
			'waystones:warp_dust',
		],
		'waystones:waystone',
		'waystones:portstone',
		1000
	).id('adj:waystones/portstone');
	event.shaped(
		Item.of('waystones:warp_plate'),
		[
			' D ',
			'SWS',
			' D '
		],
		{
			D: 'waystones:warp_dust',
			S: 'stone_brick_slab',
			W: 'waystones:waystone'
		}
	).id('adj:waystones/warp_plate')

	// Better rail crafting
	event.forEachRecipe({ type: 'crafting_shaped', output: [/rail/, /create_hypertube\:/] }, (recipe) => {
		const original = recipe.getOriginalRecipeResult();
		if (original.id == 'botania:ghost_rail') return;
		const ingredients = recipe.getOriginalRecipeIngredients()
		event.remove({ id: recipe.getMod() + ':' + recipe.getPath() });

		event.shaped(
			Item.of(original, Math.max(5, Math.ceil((original.count * 2.5) / 5) * 5)),
			[
				'ABC',
				'DEF',
				'GHI'
			],
			{
				A: ingredients[0],
				B: ingredients[1],
				C: ingredients[2],
				D: ingredients[3],
				E: ingredients[4],
				F: ingredients[5],
				G: ingredients[6],
				H: ingredients[7],
				I: ingredients[8]
			}
		).id(recipe.getId())
	})


	function leadRecipe(amount, material) {
		event.shaped(
			Item.of('lead', amount),
			[
				'SS ',
				'SS ',
				'  S'
			],
			{
				S: material
			}
		).id(`adj:lead_from_${material.replace('#', '').replace(':', '_')}`)
	}
	leadRecipe(2, '#forge:string');
	leadRecipe(1, 'farmersdelight:straw');

	function gearRecipe(amount, material) {
		event.shaped(
			Item.of('rediscovered:gear', amount),
			[
				' I ',
				'IRI',
				' I '
			],
			{
				I: material,
				R: 'redstone'
			}
		).id(`adj:gear_from_${material.replace('#', '').replace(':', '_')}`)
	}
	gearRecipe(2, 'iron_nugget');

	alloyForgeRecipe(
		[
			['#c:copper_ingots', 1],
			['create:zinc_ingot', 1]
		],
		['create:brass_ingot', 2],
		1,
		5,
		[
			['3+', 'output', 3],
		]
	)
	alloyForgeRecipe(
		[
			['minecraft:raw_copper', 1],
			['create:raw_zinc', 1]
		],
		['create:brass_ingot', 2],
		1,
		5,
		[
			['3+', 'output', 3],
		]
	)
	alloyForgeRecipe(
		[
			['minecraft:copper_block', 1],
			['create:zinc_block', 1]
		],
		['create:brass_block', 2],
		2,
		45,
		[
			['3+', 'output', 3],
		]
	)
	event.recipes.ars_nouveau.imbuement(
		'ender_pearl',
		'ender_eye',
		1000,
		[
			'blaze_powder',
			'blaze_powder',
			'blaze_powder'
		]
	).id('minecraft:ender_eye')

	event.replaceInput({ input: 'minecraft:popped_chorus_fruit', type: 'ars_nouveau:enchanting_apparatus' },
		"popped_chorus_fruit",
		"waystones:warp_dust"
	)

	event.shaped(
		Item.of('alexscaves:desolate_dagger'),
		[
			'  D',
			'TO ',
			'BT '
		],
		{
			D: 'born_in_chaos_v1:dark_metal_ingot',
			O: 'alexscaves:occult_gem',
			B: 'alexscaves:dark_tatters',
			T: 'alexscaves:thornwood_branch'
		}
	).id('adj:desolate_dagger')

	// Alloy Forges
	function simpleForgeRecipe(input, output, furnace) {
		event.shaped(
			Item.of(output),
			[
				'III',
				'IFI',
				'III'
			],
			{
				F: (furnace) ? furnace : 'blast_furnace',
				I: Item.of(input)
			}
		).id(`adj:alloy_forge/${input}_from_${(furnace) ? furnace.split(':')[1] : 'blast_furnace'}`)
	}
	simpleForgeRecipe('stone_bricks', 'alloy_forgery:cracked_stone_bricks_forge_controller')
	simpleForgeRecipe('deepslate_bricks', 'alloy_forgery:cracked_deepslate_bricks_forge_controller')
	simpleForgeRecipe('nether_bricks', 'alloy_forgery:nether_bricks_forge_controller', 'alloy_forgery:cracked_stone_bricks_forge_controller')
	simpleForgeRecipe('nether_bricks', 'alloy_forgery:nether_bricks_forge_controller', 'alloy_forgery:cracked_deepslate_bricks_forge_controller')

	event.shaped(
		'alloy_forgery:adamantite_forge_casing_forge_controller',
		[
			'ICI',
			'CFC',
			'ICI'
		],
		{
			F: 'alloy_forgery:nether_bricks_forge_controller',
			C: 'adj:adamantite_forge_casing',
			I: 'iron_block'
		}
	).id(`adj:alloy_forge/adamantite`)

	event.shaped(
		'alloy_forgery:ender_forge_casing_forge_controller',
		[
			'ICI',
			'CFC',
			'ICI'
		],
		{
			F: 'alloy_forgery:adamantite_forge_casing_forge_controller',
			C: 'adj:ender_forge_casing',
			I: 'unusualend:pearlescent_ingot'
		}
	).id(`adj:alloy_forge/ender`)

	function casingRecipe(material1, material2, output) {
		event.shaped(
			Item.of(output, 4),
			[
				' M ',
				'MNM',
				' M '
			],
			{
				M: Item.of(material1),
				N: Item.of(material2)
			}
		).id(`adj:alloy_forge/casing/${output.split(':')[1]}`)
	}
	casingRecipe('born_in_chaos_v1:dark_metal_ingot', 'mythicmetals:adamantite_ingot', 'adj:adamantite_forge_casing')
	casingRecipe('purpur_block', 'end_stone_bricks', 'adj:ender_forge_casing')

	// Extra Dye recipes
	const dyeMap = {
		1: {
			result: 'brown',
			combos: [
				['blue', 'orange'],
				['black', 'orange'],
				['red', 'green'],
				['yellow', 'purple']
			]
		},
		2: {
			result: 'green',
			combos: [
				['blue', 'yellow']
			]
		},
		3: {
			result: 'black',
			combos: [
				['yellow', 'cyan', 'magenta'],
				['yellow', 'blue', 'green', 'magenta'],
				['yellow', 'blue', 'yellow', 'blue', 'magenta'],
				['yellow', 'blue', 'yellow', 'blue', 'purple', 'pink'],
				['yellow', 'blue', 'yellow', 'blue', 'red', 'blue', 'pink'],
				['yellow', 'blue', 'yellow', 'blue', 'red', 'blue', 'red', 'white']
			]
		},
		4: {
			result: 'lime',
			combos: [
				['cyan', 'yellow'],
				['white', 'blue', 'yellow']
			]
		},
		5: {
			result: 'red',
			combos: [
				['magenta', 'yellow'],
				['pink', 'purple', 'yellow']
			]
		},
		6: {
			result: 'blue',
			combos: [
				['magenta', 'cyan']
			]
		}
	}

	function dye(color) {
		return `${color}_dye`;
	}

	for (const [k, v] of Object.entries(dyeMap)) {
		let map = dyeMap[k];
		let result = dye(map.result);
		let i = 0;
		for (let combo of map.combos) {
			let dyes = [];
			combo.forEach(d => {
				dyes.push(dye(d));
			})
			event.shapeless(
				Item.of(result, combo.length),
				dyes.sort()
			).id(`adj:${result}_${i}`)
			i++;
		}
	}


	// Awakened Ender Pearls
	event.forEachRecipe({ type: 'crafting_shaped', output: /cataclysm\:.*eye/ }, recipe => {
		const result = recipe.getOriginalRecipeResult();

		if (!result || !result.id) return;

		const id = result.id;

		// // Check if id matches any pattern in awakenedEyes
		// const matches = awakenedEyes.some(pattern => {
		// 	if (pattern instanceof RegExp) {
		// 		return pattern.test(id);
		// 	} else if (typeof pattern === 'string') {
		// 		return id === pattern;
		// 	}
		// 	return false;
		// });

		// if (matches) {
		let originalIngredients = recipe.getOriginalRecipeIngredients(),
			ingredients = [];
		originalIngredients.forEach(ingredient => {
			let isAir = ingredient.getItemIds().some(i => i == 'minecraft:air');
			let isEnderEye = ingredient.getItemIds().some(i => i == 'minecraft:ender_eye');

			if (!isAir && !isEnderEye) {
				ingredients.push(ingredient);
			}
		})
		event.remove({ id: recipe.getId() })
		event.recipes.ars_nouveau.enchanting_apparatus(
			ingredients.sort(),
			'minecraft:ender_eye',
			result,
			0
		).id(`adj:awakened_pearls/${result.getId().split(':')[1]}`)
		// }
	});
	event.recipes.ars_nouveau.enchanting_apparatus(
		[
			'rediscovered:ruby',
			'rediscovered:ruby',
			'rediscovered:ruby',
			'rediscovered:ruby',
			'rediscovered:ruby',
			'rediscovered:ruby',
			'rediscovered:ruby'
		],
		'minecraft:ender_eye',
		'rediscovered:ruby_eye',
		0
	).id(`adj:awakened_pearls/ruby_ender_pearl`)

	// End game Architect's Prism recipes
	event.custom({
		"type": "witherstormmod:item_craft_super_beacon",
		"condition": "all_supports",
		"ingredients": [
			{
				"item": "kubejs:eye_of_cinders"
			},
			{
				"item": "kubejs:eye_of_dreams"
			},
			{
				"item": "kubejs:eye_of_ethercraft"
			},
			{
				"item": "kubejs:eye_of_angels"
			},
			{
				"item": "kubejs:eye_of_desolation"
			},
			{
				"item": "kubejs:eye_of_verdant_bloom"
			},
			{
				"item": "kubejs:eye_of_arcanum"
			},
			{
				"item": "witherstormmod:command_block_book"
			}/*,
			{
				"item": "constructionwands:infinity_wand"
			}
				*/
		],
		"result": {
			"item": "structure_gel:building_tool"
		}
	}).id('adj:prism')

	// Ars Nouveau re-progression
	event.remove({ type: 'ars_nouveau:book_upgrade' })
	event.recipes.ars_nouveau.enchanting_apparatus(
		[
			'ars_nouveau:source_gem_block',
			'ars_nouveau:source_gem_block',
			'ars_nouveau:source_gem_block',
			'ars_nouveau:source_gem_block',
		],
		'writable_book',
		'ars_nouveau:novice_spell_book'
	).id('ars_nouveau:novice_spell_book')
	event.custom({
		"type": "ars_nouveau:book_upgrade",
		"pattern": [
			"   ",
			" y ",
			"   "
		],
		"key": {
			"y": {
				"item": "ars_nouveau:novice_spell_book"
			}
		},
		"ingredients": [
			{
				"item": "ars_nouveau:novice_spell_book"
			},
			{
				"item": "mythicmetals:palladium_ingot"
			},
			{
				"item": "mythicmetals:palladium_ingot"
			},
			{
				"item": "aether_redux:gravitite_ingot"
			},
			{
				"item": "aether_redux:gravitite_ingot"
			}
		],
		"result": {
			"item": "ars_nouveau:apprentice_spell_book"
		}
	}).id('ars_nouveau:apprentice_spell_book')
	event.custom({
		"type": "ars_nouveau:book_upgrade",
		"pattern":
			[
				"   ",
				" y ",
				"   "
			],
		"key": {
			"y": {
				"item": "ars_nouveau:apprentice_spell_book"
			}
		},
		"ingredients": [
			{
				"item": "ars_nouveau:apprentice_spell_book"
			},
			{
				"item": "mythicmetals:star_platinum"
			},
			{
				"item": "mythicmetals:star_platinum"
			},
			{
				"item": "unusualend:pearlescent_ingot"
			},
			{
				"item": "unusualend:pearlescent_ingot"
			},
			{
				"item": "ars_nouveau:wilden_tribute"
			},
		],
		"result": {
			"item": "ars_nouveau:archmage_spell_book"
		}
	}).id('ars_nouveau:archmage_spell_book')

	event.shaped(
		'ars_nouveau:ring_of_potential',
		[
			'NNN',
			'N N',
			'NNN'
		],
		{
			N: 'iron_nugget'
		}
	).id('adj:ring_of_potential')

	workshopRecipe(
		[
			'ars_nouveau:ring_of_potential',
			'ars_nouveau:manasteel_ingot'
		],
		'ars_nouveau:ring_of_lesser_discount'
	)

	workshopRecipe(
		[
			'ars_nouveau:ring_of_lesser_discount',
			'diamond',
			'diamond',
			'aether:zanite_gemstone',
			'aether:zanite_gemstone'
		],
		'ars_nouveau:ring_of_greater_discount'
	)

	event.shaped(
		'ars_nouveau:spell_bow',
		[
			' GS',
			'TDS',
			' GS'
		],
		{
			D: 'botania:dragonstone',
			G: 'botanicadds:gaiasteel_ingot',
			T: 'botania:terrasteel_ingot',
			S: 'ars_nouveau:magebloom_fiber'
		}
	).id('adj:spell_bow')

	event.shaped(
		'ars_nouveau:enchanters_sword',
		[
			' T ',
			'DTD',
			' G '
		],
		{
			D: 'botania:dragonstone',
			G: 'botanicadds:gaiasteel_ingot',
			T: 'botania:terrasteel_ingot',
		}
	).id('adj:enchanters_sword')

	event.shaped(
		'ars_nouveau:enchanters_shield',
		[
			'DGD',
			'GTG',
			'DGD'
		],
		{
			D: 'botania:dragonstone',
			G: 'botanicadds:gaiasteel_ingot',
			T: 'botania:terrasteel_ingot',
		}
	).id('adj:enchanters_shield')

	event.shaped(
		'ars_nouveau:enchanters_mirror',
		[
			'IDI',
			'ITI',
			' G '
		],
		{
			D: 'botania:dragonstone',
			I: 'gold_ingot',
			G: 'botanicadds:gaiasteel_ingot',
			T: 'botania:terrasteel_ingot',
		}
	).id('adj:enchanters_mirror')

	/**
	 * @type {Record<InputItem_, Internal.InputItem_>}
	 */
	const runiteToArcanist = {
		'mythicmetals:runite_helmet': 'ars_nouveau:arcanist_hood',
		'mythicmetals:runite_chestplate': 'ars_nouveau:arcanist_robes',
		'mythicmetals:runite_leggings': 'ars_nouveau:arcanist_leggings',
		'mythicmetals:runite_boots': 'ars_nouveau:arcanist_boots',
	}

	for (const [runite, arcanist] of Object.entries(runiteToArcanist)) {
		event.recipes.ars_nouveau.enchanting_apparatus(
			[
				'ars_nouveau:magebloom_fiber',
				'ars_nouveau:magebloom_fiber',
				'ars_nouveau:magebloom_fiber',
				'ars_nouveau:magebloom_fiber',
			],
			runite,
			arcanist
		).id(`adj:${arcanist.split(':')[1]}`)
	}

	event.remove({ type: 'ars_nouveau:armor_upgrade' })
	event.custom({
		"type": "ars_nouveau:armor_upgrade",
		"pedestalItems": [
			{
				"item": {
					"item": "aether:zanite_gemstone"
				}
			},
			{
				"item": {
					"item": "aether:zanite_gemstone"
				}
			},
			{
				"item": {
					"item": "mythicmetals:orichalcum_ingot"
				}
			},
			{
				"item": {
					"item": "botania:dragonstone"
				}
			},
			{
				"item": {
					"item": "ars_nouveau:magebloom_fiber"
				}
			},
			{
				"item": {
					"item": "ars_nouveau:magebloom_fiber"
				}
			}
		],
		"sourceCost": 2500,
		"tier": 1
	}).id(`adj:arcanist_upgrade_1`)

	event.custom({
		"type": "ars_nouveau:armor_upgrade",
		"pedestalItems": [
			{
				"item": {
					"item": "spelunker:crushed_amethyst"
				}
			},
			{
				"item": {
					"item": "spelunker:crushed_amethyst"
				}
			},
			{
				"item": {
					"item": "botania:rune_mana"
				}
			},
			{
				"item": {
					"item": "botania:rune_mana"
				}
			},
			{
				"item": {
					"item": "mythicmetals:adamantite_ingot"
				}
			},
			{
				"item": {
					"item": "mythicmetals:adamantite_ingot"
				}
			},
			{
				"item": {
					"item": "ars_nouveau:magebloom_fiber"
				}
			},
			{
				"item": {
					"item": "ars_nouveau:magebloom_fiber"
				}
			}
		],
		"sourceCost": 5000,
		"tier": 2
	}).id(`adj:arcanist_upgrade_2`)


	event.remove({ type: 'ars_elemental:armor_upgrade' })

	/**
	 * 
	 * @param {string} element 
	 * @param {Internal.InputItem_} essence 
	 */
	function elementalUpgradeRecipe(element, essence) {
		let armorPieces = [
			'boots',
			'robes',
			'leggings',
			'hat'
		]
		let armorTags = [
			'ars_nouveau:boot',
			'ars_nouveau:robe',
			'ars_nouveau:legs',
			'ars_nouveau:hood'

		]
		let i = 0;
		armorPieces.forEach(itemType => {
			event.custom({
				"type": "ars_elemental:armor_upgrade",
				"output": {
					"item": `ars_elemental:${element}_${itemType}`
				},
				"pedestalItems": [
					{
						"item": {
							"item": "ars_elemental:mark_of_mastery"
						}
					},
					{
						"item": {
							"item": "mythicmetals:celestium_ingot"
						}
					},
					{
						"item": {
							"item": essence
						}
					},
					{
						"item": {
							"item": essence
						}
					}
				],
				"reagent": [
					{
						"tag": armorTags[i]
					}
				],
				"sourceCost": 7000,
				"tier": 3
			}).id(`adj:${element}_${itemType}`)
			i++;
		})
	}
	elementalUpgradeRecipe('air', 'botania:rune_air');
	elementalUpgradeRecipe('fire', 'botania:rune_fire');
	elementalUpgradeRecipe('earth', 'botania:rune_earth');
	elementalUpgradeRecipe('aqua', 'botania:rune_water');

	// Cheaper/Different materials and stations
	event.replaceInput({ id: 'botania:mana_infusion/manasteel' },
		'minecraft:iron_ingot',
		[
			'minecraft:iron_ingot',
			'minecraft:gold_ingot'
		]
	)

	const manaGemCost = 900;
	event.recipes.botania.mana_infusion('ars_nouveau:source_gem', ['minecraft:amethyst_shard', 'minecraft:lapis_lazuli'])
		.mana(manaGemCost)
		.id('adj:mana_gem')

	event.recipes.botania.mana_infusion('ars_nouveau:source_gem_block', 'minecraft:amethyst_block')
		.mana(manaGemCost * 4)
		.id('adj:mana_gem_block')

	event.recipes.botania.mana_infusion('ars_nouveau:source_gem_block', 'minecraft:lapis_block')
		.mana(manaGemCost * 9)
		.id('adj:mana_gem_block_from_lapis')

	event.recipes.ars_nouveau.imbuement(
		'lapis_lazuli',
		Item.of('botanicadds:mana_lapis', 1),
		500,
		[]
	).id(`adj:mana_lapis`)

	event.recipes.ars_nouveau.imbuement(
		'lapis_block',
		Item.of('botanicadds:mana_lapis_block', 1),
		4500,
		[]
	).id(`adj:mana_lapis_block`)

	event.recipes.botania.mana_infusion('ars_nouveau:sourcestone', '#forge:stone')
		.mana(600)
		.id('adj:sourcestone')

	event.shaped(
		'ars_nouveau:source_jar',
		[
			'SSS',
			'G G',
			'SMS'
		],
		{
			S: 'ars_nouveau:archwood_slab',
			G: '#c:glass_blocks',
			M: 'botania:manasteel_ingot'
		}
	).id('adj:mana_jar');

	event.shaped(
		'ars_additions:ender_source_jar',
		[
			'SES',
			'B B',
			'OTO'
		],
		{
			S: 'ars_nouveau:archwood_slab',
			O: 'obsidian',
			E: 'ender_eye',
			B: 'botania:bifrost_perm',
			T: 'botania:terrasteel_ingot'
		}
	).id('adj:ender_mana_jar');

	// Crushing recipes for Crush glyph
	event.forEachRecipe({ type: 'create:milling' }, recipe => {

		const json = recipe.json;

		let outputs = [];
		let quit = false;
		json.get('results').getAsJsonArray().forEach(jsonObject => {
			const count = jsonObject.get('count');
			const item = jsonObject.get('item');
			const chance = jsonObject.get('chance');

			if (!item) {
				quit = true;
				return;
			}

			outputs.push({
				maxRange: 1,
				count: (count) ? count.getAsInt() : 1,
				item: item.getAsString(),
				chance: (chance) ? chance.getAsFloat() : 1.0
			})
		})
		if (quit) return;

		const ingr = json.get('ingredients').getAsJsonArray().get(0).getAsJsonObject();
		let ingredient = ingr.get('item');
		if (!ingredient) {
			ingredient = ingr.get('tag');
			if (!ingredient) return;
			else ingredient = "#" + ingredient.getAsString();
		}
		else ingredient = ingredient.getAsString();

		let input = {};
		if (ingredient.startsWith('#')) {
			input['tag'] = ingredient.substring(1);
		}
		else {
			input['item'] = ingredient;
		}

		event.custom({
			type: 'ars_nouveau:crush',
			input: input,
			output: outputs,
			skip_block_place: false
		}).id(recipe.getId() + '_ars_crush')
	})

	// Glyphs rework
	/**
	 * @type {Record<Internal.OutputItem_, Internal.InputItem_[]}
	 */
	const glyphsMap = {
		'ars_nouveau:glyph_amplify': [
			'blaze_powder',
			'botania:manasteel_ingot'
		],
		'ars_elemental:glyph_arc_projectile': [
			'spectral_arrow',
			'slime_ball',
			'arrow',
			'botania:manasteel_ingot'
		],
		'ars_nouveau:glyph_randomize': [
			'mythicmetals:runite_ingot',
			'quark:redstone_randomizer',
		],
		'ars_nouveau:glyph_sensitive': [
			'poppy',
			'ars_nouveau:source_gem_block',
			'botania:mana_pearl',
			'dandelion'
		],
		'ars_nouveau:glyph_aoe': [
			'gunpowder',
			'bone_meal'
		],
		'ars_nouveau:glyph_accelerate': [
			'sugar',
			'honeycomb',
			'botania:rune_air'
		],
		'ars_nouveau:glyph_dampen': [
			'#forge:wool',
			'#forge:wool',
			'#forge:wool',
			'#forge:wool',
		],
		'ars_nouveau:glyph_decelerate': [
			'cobweb',
			'cobweb',
			'cobweb',
			'#adj:clock'
		],
		'ars_nouveau:glyph_extract': [
			'botania:glass_pickaxe',
		],
		'ars_nouveau:glyph_break': [
			'mythicmetals:copper_pickaxe',
			'mythicmetals:copper_axe',
			'mythicmetals:copper_shovel',
			'mythicmetals:copper_hoe'
		],
		'ars_nouveau:glyph_light': [
			'lantern',
			'botania:rune_fire'
		],
		'ars_nouveau:glyph_craft': [
			'botania:assembly_halo',

		],
		'ars_nouveau:glyph_pull': [
			'#c:tools/fishing_rod',
			'ars_nouveau:magebloom_fiber',
			'ars_nouveau:magebloom_fiber'
		],
		'ars_nouveau:glyph_summon_steed': [
			'ars_elemental:anima_essence',
			'saddle',
			'lead',
			'hay_block',
			'golden_carrot'
		],
		'ars_nouveau:glyph_ender_inventory': [
			'botanicadds:rune_tp',
			'createutilities:void_casing',
			'createutilities:void_casing',
			'createutilities:void_casing'
		],
		'ars_elemental:glyph_spark': [
			'botania:rune_air',
			'botania:rune_water',
			'copper_ingot'
		],
		'ars_nouveau:glyph_explosion': [
			'botania:rune_fire',
			'tnt',
			'mythicmetals:morkite_block',
			'mythicmetals:morkite_block',
		],
		'ars_nouveau:glyph_firework': [
			'botania:rune_fire',
			'paper',
			'gunpowder',
			'gunpowder',
			'#c:dyes',
			'#c:dyes',
			'#c:dyes',
			'#c:dyes'
		],
		'ars_nouveau:glyph_invisibility': [
			'botania:rune_mana',
			'ars_nouveau:magebloom_block',
			'golden_carrot',
			'nether_wart_block'
		],
		'ars_nouveau:glyph_wind_shear': [
			'botania:rune_air',
			'botania:rune_air',
			'botania:rune_air',
			'botania:rune_air',
		],
		'ars_nouveau:glyph_blink': [
			'botanicadds:rune_tp',
			'botania:rune_mana',
			'waystones:warp_dust',
			'waystones:warp_dust',
			'waystones:warp_dust',
			'waystones:warp_dust',
		],
		'ars_nouveau:glyph_wither': [
			'botania:rune_mana',
			'netherexp:wither_bone_block',
			'netherexp:wither_bone_block',
			'netherexp:wither_bone_block',
			'wither_skeleton_skull',
			'soul_sand',
			'soul_sand'
		],
		'ars_nouveau:glyph_rune': [
			'ars_nouveau:runic_chalk',
			'botania:rune_spring',
			'botania:rune_summer',
			'botania:rune_autumn',
			'botania:rune_winter',
		],
		'ars_nouveau:glyph_animate_block': [
			'botanicadds:rune_energy',
			'botania:rune_wrath',
			'botania:rune_earth',
			'#forge:obsidian',
			'#forge:obsidian',
		],
		'ars_nouveau:glyph_bounce': [
			'botania:rune_mana',
			'slime_block',
			'slime_block',
			'slime_block',
			'slime_block',
		],
		'ars_nouveau:glyph_burst': [
			'botania:rune_summer',
			'botania:rune_wrath',
			'firework_star'
		],
		'ars_nouveau:glyph_cold_snap': [
			'botania:rune_winter',
			'botania:rune_water',
			'ice'
		],
		'ars_nouveau:glyph_conjure_water': [
			'botania:rune_water',
			'botania:rune_water',
			'botania:rune_water',
			'#c:buckets/water'
		],
		'ars_nouveau:glyph_crush': [
			'botania:rune_spring',
			'botania:rune_earth',
			'create:andesite_alloy',
			'create:andesite_alloy',
			'create:andesite_alloy',
			'smooth_stone',
			'smooth_stone',
			'smooth_stone',
		],
		'ars_nouveau:glyph_cut': [
			'botania:elementium_shears',
		],
		'ars_nouveau:glyph_delay': [
			'quartz_block',
			'clock'
		],
		'ars_nouveau:glyph_dispel': [
			'botania:rune_mana',
			'milk_bucket',
		],
		'ars_nouveau:glyph_duration_down': [
			'clock',
			'glowstone_dust'
		],
		'ars_nouveau:glyph_evaporate': [
			'botania:rune_summer',
			'sponge',
			'sponge',
			'sponge'
		],
		'ars_nouveau:glyph_exchange': [
			'botanicadds:rune_tp',
			'emerald_block',
			'waystones:warp_dust',
			'waystones:warp_dust'
		],
		'ars_nouveau:glyph_fangs': [
			'botanicadds:rune_energy',
			'prismarine_shard',
			'prismarine_shard',
			'twilightforest:charm_of_life_2'
		],
		'ars_nouveau:glyph_fell': [
			'botania:rune_earth',
			'#c:axes'
		],
		'ars_nouveau:glyph_flare': [
			'botania:rune_fire',
			'flint_and_steel',
			'fire_charge',
			'fire_charge'
		],
		'ars_nouveau:glyph_fortune': [
			'rabbit_foot',
			'aether_redux:golden_clover'
		],
		'ars_nouveau:glyph_freeze': [
			'botania:rune_winter',
			'snow_block',
			'snow_block'
		],
		'ars_nouveau:glyph_glide': [
			'botania:rune_greed',
			'botania:rune_envy',
			'botania:rune_air',
			'elytra',
			'botania:dragonstone',
			'botania:dragonstone',
			'mythicmetals:unobtainium'
		],
		'ars_nouveau:glyph_gravity': [
			'botanicadds:rune_mana',
			'anvil',
		],
		'ars_nouveau:glyph_grow': [
			'botania:rune_earth',
			'botania:fertilizer',
			'botania:fertilizer',
			'create:tree_fertilizer',
			'create:tree_fertilizer',
			'create:tree_fertilizer',
			'#forge:seeds',
			'#forge:seeds',
			'#forge:seeds'
		],
		'ars_nouveau:glyph_gust': [
			'botania:rune_air',
			'piston',
			'piston',
			'piston'
		],
		'ars_nouveau:glyph_harm': [
			'golden_sword',
			'mythicmetals:copper_sword',
			'wooden_sword'
		],
		'ars_nouveau:glyph_harvest': [
			'botania:rune_earth',
			'iron_hoe'
		],
		'ars_nouveau:glyph_heal': [
			'botania:rune_spring',
			'majruszsdifficulty:bandage',
			'majruszsdifficulty:bandage',
			'majruszsdifficulty:bandage',
			'majruszsdifficulty:bandage',
			'heart_crystals:heart_crystal'
		],
		'ars_nouveau:glyph_hex': [
			'botania:rune_gluttony',
			'botania:rune_lust',
			'botania:rune_greed',
			'botania:rune_wrath',
			'botania:rune_sloth',
			'botania:rune_envy',
			'botania:rune_pride',
		],
		'ars_nouveau:glyph_ignite': [
			'flint_and_steel',
			'#minecraft:coals',
			'#minecraft:coals',
			'#minecraft:coals'
		],
		'ars_nouveau:glyph_infuse': [
			'botania:rune_mana',
			'glass_bottle',
			'#forge:rods/blaze'
		],
		'ars_nouveau:glyph_intangible': [
			'botanicadds:rune_tp',
			'phantom_membrane',
			'phantom_membrane',
			'phantom_membrane',
			'waystones:warp_dust',
			'waystones:warp_dust'
		],
		'ars_nouveau:glyph_interact': [
			'lever',
			'#minecraft:wooden_pressure_plates',
			'#minecraft:buttons'
		],
		'ars_nouveau:glyph_launch': [
			'botania:rune_air',
			'leather',
			'leather',
			'leather',
			'rabbit_foot',
		],
		'ars_nouveau:glyph_leap': [
			'botania:rune_air',
			'miners_delight:bat_wing',
			'miners_delight:bat_wing',
			'miners_delight:bat_wing'
		],
		'ars_nouveau:glyph_lightning': [
			'botania:rune_air',
			'botania:rune_water',
			'lightning_rod',
			'heart_of_the_sea'
		],
		'ars_nouveau:glyph_linger': [
			'botanicadds:rune_tp',
			'dragon_breath',
			'#forge:storage_blocks/diamond',
			'#forge:rods/blaze',
			'#forge:rods/blaze'
		],
		'ars_nouveau:glyph_name': [
			'name_tag',
			'ars_nouveau:magebloom_fiber'
		],
		'ars_nouveau:glyph_orbit': [
			'botania:rune_autumn',
			'aether:gravitite_ingot',
			'aether:gravitite_ingot',
			'aether:gravitite_ingot'
		],
		'ars_nouveau:glyph_phantom_block': [
			'#forge:glass',
			'#forge:glass',
			'#forge:glass',
			'#forge:glass',
			'#forge:glass',
			'#forge:glass',
			'#forge:glass',
			'#forge:glass'
		],
		'ars_nouveau:glyph_pickup': [
			'botania:hopperhock',
			'botania:rune_tp'
		],
		'ars_nouveau:glyph_pierce': [
			'arrow',
			'mythicmetals:runite_arrow',
			'ars_nouveau:wilden_spike'
		],
		'ars_nouveau:glyph_place_block': [
			'botanicadds:rune_tp',
			'dispenser'
		],
		'ars_nouveau:glyph_projectile': [
			'botania:livingwood_bow',
		],
		'ars_nouveau:glyph_redstone_signal': [
			'#forge:storage_blocks/redstone',
			'#forge:storage_blocks/redstone',
			'#forge:storage_blocks/redstone'
		],
		'ars_nouveau:reset': [
			'target'
		],
		'ars_nouveau:glyph_rotate': [
			'botanicadds:rune_tp'
		],
		'ars_nouveau:glyph_self': [
			'#minecraft:wooden_pressure_plates',
			'iron_chestplate'
		],
		'ars_nouveau:glyph_sense_magic': [
			'botania:rune_mana',
			'ars_nouveau:dowsing_rod',
			'ars_nouveau:starbuncle_shards'
		],
		'ars_nouveau:glyph_slowfall': [
			'botania:rune_air',
			'miners_delight:bat_wing',
			'feather',
			'feather',
			'feather',
			'#forge:rods/blaze',
			'#forge:crops/nether_wart'
		],
		'ars_nouveau:glyph_smelt': [
			'botania:rune_fire',
			'alloy_forgery:cracked_stone_bricks_forge_controller',
			'coal_block'
		],
		'ars_nouveau:glyph_snare': [
			'botania:rune_earth',
			'cobweb',
			'cobweb',
			'cobweb',
			'cobweb'
		],
		'ars_nouveau:glyph_split': [
			'ars_nouveau:relay_splitter',
			'ars_nouveau:sourcestone',
			'ars_nouveau:sourcestone',
			'ars_nouveau:sourcestone',
			'ars_nouveau:sourcestone'
		],
		'ars_nouveau:glyph_summon_decoy': [
			'botanicadds:rune_energy',
			'ars_elemental:anima_essence',
			'armor_stand',
			'armor_stand',
			'armor_stand',
			'armor_stand'
		],
		'ars_nouveau:glyph_summon_undead': [
			'botanicadds:rune_energy',
			'ars_elemental:anima_essence',
			'netherexp:wither_bone_block',
			'skeleton_skull',
			'architects_palette:rotten_flesh_block',
			'architects_palette:rotten_flesh_block'
		],
		'ars_nouveau:glyph_summon_vex': [
			'botanicadds:rune_energy',
			'ars_elemental:anima_essence',
			'twilightforest:charm_of_life_2'
		],
		'ars_nouveau:glyph_summon_wolves': [
			'botanicadds:rune_energy',
			'ars_elemental:anima_essence',
			'bone',
			'bone',
			'bone',
			'miners_delight:bat_wing',
		],
		'ars_nouveau:glyph_toss': [
			'botania:rune_air',
			'dropper'
		],
		'ars_nouveau:glyph_touch': [
			'#minecraft:buttons'
		],
		'ars_nouveau:glyph_underfoot': [
			'iron_boots',
			'#minecraft:wooden_pressure_plates'
		],
		'ars_nouveau:glyph_wall': [
			'botanicadds:rune_tp',
			'dragon_breath',
			'quark:myalite_bricks',
			'rediscovered:large_bricks',
			'mud_bricks',
			'unusualend:shiny_crystal_bricks'
		],
		'ars_nouveau:wololo': [
			'red_wool',
			'red_wool',
			'red_wool',
			'red_wool',
			'blue_wool',
			'blue_wool',
			'blue_wool',
			'blue_wool'
		]
	}

	// Glyphs are more expensive to craft experience-wise
	// and some have changed recipes
	event.forEachRecipe({ type: 'ars_nouveau:glyph' }, recipe => {

		const id = recipe.getOriginalRecipeResult().id;
		const expCost = Math.ceil(recipe.json.get('exp') * 1.25);

		// const recipeId = recipe.id;
		// console.log(recipeId)

		const glyphOverride = glyphsMap[id];
		if (glyphOverride) {
			event.remove({ output: id });
			event.recipes.ars_nouveau.glyph(
				id,
				glyphOverride,
				expCost
			).id(recipe.getId())
		}
		else {
			event.custom({
				count: 1,
				output: id,
				type: "ars_nouveau:glyph",
				exp: expCost,
				inputItems: recipe.json.get('inputItems')
			}).id(recipe.getId())
		}
	})

	// Eyes
	gaiaPlateRecipe([
		'botanicadds:gaiasteel_block',
		// 'botania:terrasteel_block',
		'botania:dragonstone_block',
		'botania:dragonstone_block',
		'botania:dragonstone_block',
		'botania:dragonstone_block',
		'minecraft:ender_eye',
		'botania:rune_sloth',
		'botania:rune_pride',
		'botania:rune_gluttony',
		'botania:rune_envy',
		'botania:rune_wrath',
		'botania:rune_lust',
		'botania:rune_greed',
	], 'kubejs:eye_of_verdant_bloom', 2000000)

	let inter = Item.of('minecraft:ender_eye');
	event.recipes.create.sequenced_assembly(
		Item.of('kubejs:eye_of_ethercraft'),
		'ender_eye',
		[
			event.recipes.create.deploying(inter, [inter, Item.of('create:precision_mechanism')]),
			event.recipes.create.filling(inter, [inter, Fluid.lava()]),
			event.recipes.create.deploying(inter, [inter, Item.of('createutilities:void_casing')]),
			event.recipes.create.deploying(inter, [inter, Item.of('create:brass_block')]),
			event.recipes.create.deploying(inter, [inter, Item.of('create:cogwheel')]),
			// event.recipes.create.filling(inter, [inter, Fluid.of('evilcraft:blood', 1000)]),
		]
	).transitionalItem(inter).loops(24).id('adj:eyes/ethercraft')



	event.shaped(
		Item.of('mythicmetals:durasteel_engine'),
		[
			'IHI',
			'SAS',
			'BIB'
		],
		{
			I: 'mythicmetals:steel_ingot',
			H: 'hopper',
			S: 'gunpowder',
			B: 'mythicmetals:steel_block',
			A: 'netherite_ingot'
		}
	).id('adj:durasteel_engine')

	const cookingTimeOverrides = {
		'artifacts:eternal_steak': 60 * 15, // in seconds btw
		'born_in_chaos_v1:smoked_monster_flesh': 15,
		'born_in_chaos_v1:smoked_fish': 10,
		'alexscaves:cooked_dinosaur_chop': 25,
	}
	/**
	 * 
	 * @param {*} type 
	 * @param {Internal.RecipeJS_} recipe 
	 * @returns 
	 */
	function overrideCooking(type, recipe) {
		const output = recipe.getOriginalRecipeResult();
		const input = recipe.getOriginalRecipeIngredients();

		const id = output.getId();
		if (id === 'minecraft:air') return;

		const JSON = recipe.json;
		const time = (cookingTimeOverrides[id]) ? (cookingTimeOverrides[id] * 20 * ((type == 'campfire') ? 6 : 1)) : JSON.get('cookingtime') * 2;
		const exp = JSON.get('experience');

		event.remove({ id: recipe.getId() });
		if (type == 'smoking') {
			event.smoking(output, input, exp * 2, time).id(`adj:smoking/${flattenedID(output)}_from_${flattenedID(input[0].getItemIds()[0])}`);
		}
		else if (type == 'campfire') {
			event.campfireCooking(output, input, exp, time).id(`adj:campfire_cooking/${flattenedID(output)}_from_${flattenedID(input[0].getItemIds()[0])}`);
		}
	}
	event.forEachRecipe({ type: 'smoking' }, recipe => {
		overrideCooking('smoking', recipe)
	})
	event.forEachRecipe({ type: 'campfire_cooking' }, recipe => {
		overrideCooking('campfire', recipe)
	})

	// Chainmail recipes
	/**
	 * @param {Internal.OutputItem_} output 
	 * @param {*} shape 
	 */
	function chainmailRecipe(output, shape) {
		event.shaped(
			output,
			shape,
			{
				N: Item.of('iron_nugget'),
				I: Item.of('iron_ingot')
			}
		).id(`adj:${output}`)
	}
	chainmailRecipe('chainmail_helmet', [
		'INI',
		'N N'
	])
	chainmailRecipe('chainmail_chestplate', [
		'I I',
		'NIN',
		'NNN'
	])
	chainmailRecipe('chainmail_leggings', [
		'INI',
		'N N',
		'N N'
	])
	chainmailRecipe('chainmail_boots', [
		'N N',
		'I I'
	])

	// Different alloy recipes
	// Harder Celestium and Metallurgium
	alloyForgeRecipe(
		[
			['mythicmetals:star_platinum', 1],
			['botania:elementium_ingot', 1],
			['ancient_aether:valkyrum', 1],
			['unusualend:pearlescent_ingot', 1],
			['mythicmetals:unobtainium', 2]
		],
		['mythicmetals:celestium_ingot', 1],
		4,
		100
	)

	alloyForgeRecipe(
		[
			['mythicmetals:hallowed_ingot', 1],
			['mythicmetals:palladium_ingot', 1],
			['botania:terrasteel_ingot', 1],
			['born_in_chaos_v1:dark_metal_ingot', 1],
			['mythicmetals:unobtainium', 2]
		],
		['mythicmetals:metallurgium_ingot', 1],
		4,
		100
	)

	// Stormyx
	alloyForgeRecipe(
		[
			['mythicmetals:raw_stormyx', 1],
			['aether:zanite_gemstone', 1],
			['spelunker:amethyst_dust', 3],
		],
		['mythicmetals:stormyx_ingot', 1],
		2,
		5,
		[
			[
				'3+', 'output', 2
			]
		]
	)
	alloyForgeRecipe(
		[
			['#forge:ores/stormyx', 1],
			['aether:zanite_gemstone', 1],
			['spelunker:amethyst_dust', 3],
		],
		['mythicmetals:stormyx_ingot', 1],
		2,
		5,
		[
			[
				'3+', 'output', 2
			]
		]
	)

	// Valkyrum
	alloyForgeRecipe(
		[
			['aether_redux:raw_valkyrum', 1],
			['aether_redux:gravitite_ingot', 1],
		],
		['ancient_aether:valkyrum', 2],
		2,
		10,
		[
			[
				'3+', 'output', 3
			]
		]
	)
	alloyForgeRecipe(
		[
			['ancient_aether:valkyrum_ore', 1],
			['aether_redux:gravitite_ingot', 1],
		],
		['ancient_aether:valkyrum', 2],
		2,
		10,
		[
			[
				'3+', 'output', 3
			]
		]
	)


	// Move Steel to chapter 1
	alloyForgeRecipe(
		[
			['iron_ingot', 1],
			['#c:coal', 1],
			['blaze_powder', 1],
		],
		['mythicmetals:steel_ingot', 1],
		2,
		5
	)
	alloyForgeRecipe(
		[
			['raw_iron', 1],
			['#c:coal', 1],
			['blaze_powder', 1],
		],
		['mythicmetals:steel_ingot', 1],
		2,
		5
	)

	// Enderium is now made in an Alloy Forge
	alloyForgeRecipe(
		[
			['majruszsdifficulty:enderium_shard', 6],
			['ender_eye', 1],
		],
		['majruszsdifficulty:enderium_ingot', 1],
		4,
		30
	)


	// Void Steel
	alloyForgeRecipe(
		[
			['mythicmetals:steel_ingot', 1],
			['ender_pearl', 1],
			['amethyst_shard', 2]
		],
		['createutilities:void_steel_ingot', 1],
		2,
		10,
		[
			[
				'2+', 'output', 2
			],
			[
				'3+', 'output', 3
			],
			[
				'4+', 'output', 4
			]
		]
	)

	// Slightly harder Mythril, Orichalcum and Hallowed Alloy
	alloyForgeRecipe(
		[
			['mythicmetals:raw_mythril', 2],
			['botania:elementium_ingot', 1]
		],
		['mythicmetals:mythril_ingot', 2],
		2,
		10,
		[
			['3+', 'output', 3]
		]
	)
	alloyForgeRecipe(
		[
			['#c:mythril_ores', 1],
			['botania:elementium_ingot', 1]
		],
		['mythicmetals:mythril_ingot', 2],
		2,
		10,
		[
			['3+', 'output', 3]
		]
	)

	alloyForgeRecipe(
		[
			['mythicmetals:raw_orichalcum', 2],
			['botania:elementium_ingot', 1]
		],
		['mythicmetals:orichalcum_ingot', 2],
		2,
		10,
		[
			['3+', 'output', 3]
		]
	)
	alloyForgeRecipe(
		[
			['#c:orichalcum_ores', 1],
			['botania:elementium_ingot', 1]
		],
		['mythicmetals:orichalcum_ingot', 2],
		2,
		10,
		[
			['3+', 'output', 3]
		]
	)

	alloyForgeRecipe(
		[
			['mythicmetals:mythril_ingot', 1],
			['mythicmetals:orichalcum_ingot', 1],
			['mythicmetals:adamantite_ingot', 1],
			['botania:pixie_dust', 1]
		],
		['mythicmetals:hallowed_ingot', 2],
		3,
		20,
		[
			['4+', 'output', 3]
		]
	)
	alloyForgeRecipe(
		[
			['mythicmetals:raw_mythril', 1],
			['mythicmetals:raw_orichalcum', 1],
			['mythicmetals:raw_adamantite', 1],
			['botania:pixie_dust', 1]
		],
		['mythicmetals:hallowed_ingot', 3],
		3,
		20,
		[
			['4+', 'output', 4]
		]
	)
	alloyForgeRecipe(
		[
			['#c:mythril_ores', 1],
			['#c:orichalcum_ores', 1],
			['#c:adamantite_ores', 1],
			['botania:pixie_dust', 1]
		],
		['mythicmetals:hallowed_ingot', 3],
		3,
		20,
		[
			['4+', 'output', 4]
		]
	)

	// Adamantite from tier 2 forge
	alloyForgeRecipe(
		[
			['mythicmetals:raw_adamantite', 1],
		],
		['mythicmetals:adamantite_ingot', 1],
		2,
		20,
		[
			[
				'4+', 'output', 2
			]
		]
	)
	alloyForgeRecipe(
		[
			['#c:adamantite_ores', 1],
		],
		['mythicmetals:adamantite_ingot', 1],
		2,
		20,
		[
			[
				'4+', 'output', 2
			]
		]
	)

	// Pearlescent Ingot
	alloyForgeRecipe(
		[
			['minecraft:iron_ingot', 2],
			['unusualend:shiny_crystal', 1],
			['unusualend:citrine_chunk', 1],
			['unusualend:prismalite_gem', 1],
			['unusualend:enderling_scrap', 1],
		],
		['unusualend:pearlescent_ingot', 2],
		3,
		20,
		[
			[
				'4+', 'output', 3
			]
		]
	)
	alloyForgeRecipe(
		[
			['raw_iron', 2],
			['unusualend:shiny_crystal', 1],
			['unusualend:citrine_chunk', 1],
			['unusualend:prismalite_gem', 1],
			['unusualend:enderling_scrap', 1],
		],
		['unusualend:pearlescent_ingot', 2],
		3,
		20,
		[
			[
				'4+', 'output', 3
			]
		]
	)

	// Change Metallurgium and Celestium gear recipes
	event.forEachRecipe([{ type: 'minecraft:smithing_transform', output: /celestium/ }, { type: 'minecraft:smithing_transform', output: /metallurgium/ }], recipe => {

		const JSON = recipe.json;

		event.remove({ id: recipe.getId() });
		event.smithing(
			JSON.getAsJsonObject("result").get("item").getAsString(),
			"mythicmetals:unobtainium_smithing_template",
			JSON.getAsJsonObject("base").get("item").getAsString()
				.toString()
				.replace('minecraft:diamond_', 'majruszsdifficulty:enderium_')
				.replace('minecraft:netherite_', 'majruszsdifficulty:enderium_'),
			JSON.getAsJsonObject("addition").get("item").getAsString(),
		).id(recipe.getId())
	})

	event.shaped(
		'3x scaffolding',
		[
			'STS',
			'S S',
			'S S'
		],
		{
			T: 'string',
			S: 'stick'
		}
	)

	event.shaped(
		'suppsquared:copper_lantern',
		[
			'NNN',
			'NTN',
			'NNN'
		],
		{
			N: 'mythicmetals:copper_nugget',
			T: 'torch'
		}
	).id('adj:scaffolding')

	// More nuggets from gear
	/**
	 * @type {Internal.InputItem_[]}
	 */
	const nuggetsBlacklist = [
		'create:experience_nugget',
		'alexscaves:dinosaur_nugget',
		'alexscaves:cave_painting_dino_nuggets',
		'born_in_chaos_v1:dark_metal_nugget'
	]
	event.forEachRecipe([{ type: 'smelting' }, { type: 'blasting' }], recipe => {
		const output = recipe.getOriginalRecipeResult();
		const input = recipe.getOriginalRecipeIngredients();
		if (output.getId().includes('nugget') && !nuggetsBlacklist.includes(output.getId())) {
			event.remove({ id: recipe.getId() });
			if (recipe.getType().toString() == 'minecraft:blasting') {
				event.blasting(
					Item.of(output, 5),
					input[0],
					0.1,
					15 * 20
				).id(recipe.getId())
			}
		}
	})

	event.recipes.ars_nouveau.enchanting_apparatus(
		[
			"minecraft:copper_block",
			"minecraft:redstone_block",
			"minecraft:soul_sand",
			"minecraft:soul_sand",
			"mythicmetals:star_platinum"
		],
		"compass",
		Item.of('minecraft:compass', '{LodestoneDimension:"minecraft:overworld",LodestonePos:{X:3440,Y:64,Z:3200},LodestoneTracked:0b,display:{Name:\'{"text":"Command Block Compass","italic":false}\'},"quark:compass_calculated":1b,"quark:compass_in_nether":0b}'),
		0
	).id('adj:wither_storm_compass')

	event.shapeless(
		'ars_nouveau:worn_notebook',
		[
			'#forge:logs/archwood',
			'#forge:logs/archwood',
			'#forge:logs/archwood',
			'book'
		]
	).id('ars_nouveau:worn_notebook')

	event.remove({ type: 'xercapaint:crafting_special_palette_crafting' });
	event.shaped(
		Item.of('xercapaint:item_palette'),
		[
			'P ',
			'PP'
		],
		{
			P: '#minecraft:planks'
		}
	).id('adj:item_palette')

	// Quark Pipes
	event.shaped(
		Item.of('quark:pipe', 12),
		[
			'I',
			'G',
			'I'
		],
		{
			I: 'create:brass_ingot',
			G: '#forge:glass'
		}
	).id('adj:pipes')

	event.shapeless(
		Item.of('quark:encased_pipe'),
		[
			'quark:pipe',
			'#forge:glass'
		]
	).id('adj:pipes_encasing')
	event.shapeless(
		Item.of('quark:pipe'),
		[
			'quark:encased_pipe'
		]
	).id('adj:pipes_from_encased')

	// Cheaper Andesite Alloy
	/**
	 * @type {Internal.InputItem_}
	 */
	const alloyNuggets = [
		'minecraft:iron_nugget',
		'create:zinc_nugget'
	]
	event.shaped(
		Item.of('create:andesite_alloy', 2),
		[
			'NA',
			'AN'
		],
		{
			N: alloyNuggets,
			A: 'andesite'
		}
	).id(`adj:andesite_alloy_1_manual_only`)
	event.shaped(
		Item.of('create:andesite_alloy', 2),
		[
			'AN',
			'NA'
		],
		{
			N: alloyNuggets,
			A: 'andesite'
		}
	).id(`adj:andesite_alloy_2_manual_only`)
	event.recipes.create.mixing(Item.of('create:andesite_alloy', 2), ['andesite', alloyNuggets])
		.id(`adj:andesite_alloy_mixing`)

	// FunctionalStorage
	event.shaped(
		Item.of('functionalstorage:oak_1'),
		[
			'AAA',
			' V ',
			'AAA'
		],
		{
			A: 'create:andesite_casing',
			V: 'create:item_vault'
		}
	).id('adj:storage_drawer_1x')

	event.shaped(
		Item.of('functionalstorage:oak_2', 2),
		[
			'AVA',
			'AAA',
			'AVA'
		],
		{
			A: 'create:andesite_casing',
			V: 'create:item_vault'
		}
	).id('adj:storage_drawer_2x')

	event.shaped(
		Item.of('functionalstorage:oak_4', 4),
		[
			'VAV',
			'AAA',
			'VAV'
		],
		{
			A: 'create:andesite_casing',
			V: 'create:item_vault'
		}
	).id('adj:storage_drawer_4x')

	event.shaped(
		Item.of('functionalstorage:compacting_drawer', 1),
		[
			'RBR',
			'CVC',
			'RBR'
		],
		{
			R: 'redstone',
			C: 'create:cogwheel',
			V: 'create:item_vault',
			B: 'create:brass_casing'
		}
	).id('adj:compacting_drawer')

	event.shaped(
		Item.of('functionalstorage:storage_controller', 1),
		[
			'D',
			'B',
			'V'
		],
		{
			D: 'create:electron_tube',
			V: 'create:item_vault',
			B: 'create:brass_casing'
		}
	).id('adj:storage_controller')

	event.shaped(
		Item.of('functionalstorage:controller_extension', 1),
		[
			'D',
			'B',
			'V'
		],
		{
			D: 'create:redstone_link',
			V: 'create:item_vault',
			B: 'create:brass_casing'
		}
	).id('adj:controller_extension')

	event.shaped(
		Item.of('functionalstorage:linking_tool', 1),
		[
			' E ',
			'SVS'
		],
		{
			E: 'create:electron_tube',
			V: 'create:item_vault',
			S: 'create:iron_sheet'
		}
	).id('adj:linking_tool')

	event.shaped(
		Item.of('functionalstorage:configuration_tool', 1),
		[
			' E ',
			'SVS'
		],
		{
			E: 'create:electron_tube',
			V: 'minecraft:emerald',
			S: 'create:iron_sheet'
		}
	).id('adj:configuration_tool')

	event.recipes.create.sequenced_assembly([
		Item.of('functionalstorage:copper_upgrade')
	], 'create:copper_sheet', [
		event.recipes.create.deploying('create:copper_sheet', ['create:copper_sheet', 'create:zinc_block']),
		event.recipes.create.deploying('create:copper_sheet', ['create:copper_sheet', 'create:brass_ingot']),
		event.recipes.create.deploying('create:copper_sheet', ['create:copper_sheet', 'botania:rune_greed']),
		event.recipes.create.filling(inter, [inter, Fluid.of('minecraft:lava', 1000)]),
	]).transitionalItem('create:copper_sheet').loops(2).id('adj:storage_upgrade')

	/**
	 * @param {Internal.InputItem_} input 
	 * @param {Internal.OutputItem_} result 
	 */
	function FSUpgradeRecipe(input, result) {
		event.recipes.create.sequenced_assembly([
			result
		], 'create:iron_sheet', [
			event.recipes.create.deploying('create:iron_sheet', ['create:iron_sheet', 'create:zinc_block']),
			event.recipes.create.deploying('create:iron_sheet', ['create:iron_sheet', 'create:brass_ingot']),
			event.recipes.create.deploying('create:iron_sheet', ['create:iron_sheet', input]),
			event.recipes.create.filling(inter, [inter, Fluid.of('minecraft:lava', 250)]),
		]).transitionalItem('create:iron_sheet').loops(2).id(`adj:${result.split(':')[1]}_from_${input.replace(':', '_')}`)
	}
	FSUpgradeRecipe('botania:hopperhock', 'functionalstorage:collector_upgrade')
	FSUpgradeRecipe('alexscaves:azure_neodymium_ingot', 'functionalstorage:pusher_upgrade')
	FSUpgradeRecipe('alexscaves:scarlet_neodymium_ingot', 'functionalstorage:puller_upgrade')
	FSUpgradeRecipe('redstone_torch', 'functionalstorage:redstone_upgrade')

	terraPlateAndGaiaPlate([
		'botanicadds:rune_tp',
		'obsidian',
		'obsidian',
		'obsidian',
		'obsidian',
		'ender_eye',
		'create:item_vault',
		'botania:corporea_spark'
	], 'functionalstorage:ender_drawer', 200000)

	terraPlateAndGaiaPlate([
		'botania:rune_gluttony',
		'ender_eye',
		'obsidian',
		'obsidian',
		'obsidian',
		'create:iron_sheet'
	], 'functionalstorage:void_upgrade', 50000)

	const tidesingerInputs = [
		'helmet',
		'chestplate',
		'leggings',
		'boots',
		'sword',
		'pickaxe',
		'shovel',
		'axe'
	]
	tidesingerInputs.forEach(type => {
		event.remove({ output: `mythicmetals:tidesinger_${type}` })
		event.smithing(
			`mythicmetals:tidesinger_${type}`,
			'mythicmetals:tidesinger_smithing_template',
			`mythicmetals:aquarium_${type}`,
			'#adj:tidesinger_upgrade_coral'
		).id(`mythicmetals:tidesinger_${type}`)
	})

	// Slightly different early-game recipes
	const earlyGameReworkItems = [
		'minecraft:arrow',
		'minecraft:campfire',
		'minecraft:soul_campfire',
		'minecraft:torch',
		'minecraft:soul_torch',
		'netherexp:ancient_torch',
		'minecraft:redstone_torch',
		'witherstormmod:tainted_torch',
		'alexscaves:bioluminescent_torch',
		'tide:jelly_torch',
		'netherexp:ancient_campfire',
		'ancient_aether:ambrosium_campfire',
		'aether:ambrosium_torch',
		'architects_palette:nether_brass_torch',
		'minecraft:copper_torch'
	]
	earlyGameReworkItems.forEach(item => {
		event.remove({ type: 'crafting_shaped', output: item })
	})

	function torchRecipe(input, amount) {
		event.shaped(
			Item.of('torch', amount),
			[
				'I',
				'S'
			],
			{
				I: input,
				S: 'stick'
			}
		).id(`adj:torch_from_${input.replace('#', '').replace(':', '_')}`)
	}
	function torchTransform(input, output, amount) {
		let ingredients = [input];
		for (let i = 0; i < amount; i++) {
			ingredients.push('torch')
		}
		event.shapeless(
			Item.of(output, amount),
			ingredients
		).id(`adj:torch_transform_${flattenedID(output)}_from_${(Array.isArray(input) ? flattenedID(input[0]) : flattenedID(input))}`)
	}
	torchRecipe('#c:coal', 8)
	torchRecipe('slime_ball', 3)
	torchRecipe('flint', 4)
	torchRecipe('blaze_powder', 12)
	torchRecipe('born_in_chaos_v1:fire_dust', 8)

	torchTransform('#soul_fire_base_blocks', 'soul_torch', 3)
	torchTransform('netherexp:ancient_wax', 'netherexp:ancient_torch', 6)
	torchTransform('redstone', 'redstone_torch', 1)
	torchTransform(['tide:luminescent_jellyfish', 'tide:sun_emblem'], 'tide:jelly_torch', 8)
	torchTransform('witherstormmod:tainted_dust', 'witherstormmod:tainted_torch', 2)
	torchTransform('alexscaves:bioluminesscence', 'alexscaves:bioluminescent_torch', 3)
	torchTransform('aether:ambrosium_shard', 'aether:ambrosium_torch', 5)
	torchTransform('architects_palette:nether_brass_nugget', 'architects_palette:nether_brass_torch', 3)
	torchTransform('mythicmetals:copper_nugget', 'copper_torch', 3)

	function campfireRecipe(torchInput, baseInput, output) {
		event.shaped(
			output,
			[
				' S ',
				'STS',
				'LBL'
			],
			{
				S: 'stick',
				T: torchInput,
				L: '#logs_that_burn',
				B: baseInput
			}
		).id(`adj:campfire/${flattenedID(output)}`)
	}
	campfireRecipe('torch', '#logs_that_burn', 'campfire')
	campfireRecipe('soul_torch', '#soul_fire_base_blocks', 'soul_campfire')
	campfireRecipe('netherexp:ancient_torch', 'magma_block', 'netherexp:ancient_campfire')
	campfireRecipe('aether:ambrosium_torch', '#logs_that_burn', 'ancient_aether:ambrosium_campfire')

	function arrowRecipe(input, outputAmount, output) {
		let outputArrow = (output) ? output : 'arrow';
		event.remove({ type: 'crafting_shaped', output: outputArrow })
		event.shaped(
			Item.of(outputArrow, outputAmount),
			[
				'I',
				'S',
				'F'
			],
			{
				I: input,
				S: 'stick',
				F: 'feather'
			}
		).id(`adj:arrow_from_${flattenedID(input)}`)
	}
	arrowRecipe('iron_nugget', 10);
	arrowRecipe('flint', 25);
	arrowRecipe('ars_nouveau:wilden_spike', 40);

	arrowRecipe('mythicmetals:star_platinum', 50, 'mythicmetals:star_platinum_arrow');
	arrowRecipe('mythicmetals:runite_ingot', 40, 'mythicmetals:runite_arrow');
	arrowRecipe('heart_crystals:heart_crystal_shard', 10, 'heart_crystals:cupids_arrow');

	itemsOnGround([['arrow', 25], 'alexscaves:scarlet_neodymium_ingot'], ['alexscaves:seeking_arrow', 25]);
	itemsOnGround([['arrow', 20], 'phantom_membrane'], ['rediscovered:purple_arrow', 20]);
	itemsOnGround([['spectral_arrow', 10], 'cataclysm:void_jaw'], ['cataclysm:void_scatter_arrow', 20]);
	itemsOnGround([['arrow', 5], ['naturalist:glow_goop', 2]], ['spectral_arrow', 5], 'adj:spectral_arrow_goop');
	itemsOnGround([['arrow', 10], ['glowstone_dust', 1]], ['spectral_arrow', 10], 'adj:spectral_arrow_glowstone_dust');
	itemsOnGround([['arrow', 4], 'torch'], ['quark:torch_arrow', 4]);
	itemsOnGround([['arrow', 20], 'tide:deep_aqua_crystal'], ['tide:deep_aqua_arrow', 20]);
	itemsOnGround([['arrow', 10], 'netherexp:phasmo_shard'], ['netherexp:phasmo_arrow', 10]);

	event.campfireCooking('minecraft:torch', 'minecraft:stick', 0, 30).id('adj:torch_from_campfire');
	event.campfireCooking('minecraft:charcoal', '#logs_that_burn', 0.15, 1200).id('adj:charcoal_from_campfire');
	event.campfireCooking('minecraft:leather', 'rotten_flesh', 0.02, 12000).id('adj:rotten_flesh_to_leather_10_minutes');

	// Items to Farmer's Delight Stew recipes
	const stewIDs = [
		'aquamirae:sea_stew',
		'witherstormmod:golden_apple_stew',
		'alexsmobs:mosquito_repellent_stew',
		'unusal_end:ender_stew_recipe',
		'alexscaves:vesper_stew',
		'alexscaves:seething_stew',
		'unusualend:warped_stew_recipe',
		'aquamirae:poseidons_breakfast',
		'unusualend:blob_stew_recipe',
		'alexscaves:primordial_soup',
		'mynethersdelight:crafting/rock_soup',
		'croptopia_additions:ramen',
		'croptopia_additions:green_bean_casserole',
		'croptopia:chicken_and_rice',
		'croptopia:cashew_chicken',
		'croptopia:crema',
		'croptopia:beef_stew',
		'croptopia:nether_wart_stew',
		'croptopia:potato_soup',
		'croptopia:ajvar',
		'croptopia:steamed_broccoli',
		'croptopia:steamed_green_beans',
		'croptopia:salsa',
		'croptopia:artichoke_dip',
		'neapolitan:adzuki_stew',
		'neapolitan:adzuki_curry'
	];

	event.forEachRecipe([{ type: 'crafting_shaped' }, { type: 'crafting_shapeless' }], recipe => {
		if (!stewIDs.includes(recipe.getId())) return;

		let ingredients = recipe.getOriginalRecipeIngredients();
		const result = recipe.getOriginalRecipeResult();

		let baseItem;
		switch (recipe.getId()) {
			case 'witherstormmod:golden_apple_stew':
				baseItem = 'minecraft:suspicious_stew';
				break;
			case 'aquamirae:poseidons_breakfast':
				baseItem = 'aquamirae:sea_stew';
				break;
			default:
				baseItem = 'minecraft:bowl';
				break;
		}

		// Filter out ingredients that contain the base item
		ingredients = ingredients.filter(ingredient => !ingredient.getItemIds().toString().includes(baseItem));

		// console.log(ingredients)
		event.remove({ id: recipe.getId() });

		event.recipes.farmersdelight.cooking(
			ingredients,
			result,
			1,
			300,
			baseItem
		).id(recipe.getId());
	});


	// Funnier Boat crafting
	function lycheeBoat(boat, block, isChestRecipe) {

		const id = boat.split(':')
		const mod = id[0];
		const type = id[1].replace('_boat', '').replace('_raft', '');
		// console.log(id)
		// console.log(type)
		const boatType = `${(mod == 'upgrade_aquatic' || mod == 'enhanced_mushrooms') ? 'blueprint' : mod}:${(mod === 'aether' || mod === 'aether_redux') ? `${type}_` : ((mod == 'moresnifferflowers') ? `mod_${type}_` : '')}${isChestRecipe ? 'chest_' : ''}boat`

		function plankShapeChecks(xzAxis) {
			let checks;
			if (xzAxis == "x") {
				checks = {
					"type": "and",
					"contextual": [
						{ "type": "execute", "command": `execute if block ~1 ~1 ~ ${block}`, "hide": true },
						{ "type": "execute", "command": `execute if block ~-1 ~1 ~ ${block}`, "hide": true },
						{ "type": "execute", "command": `execute if block ~1 ~ ~ ${block}`, "hide": true },
						{ "type": "execute", "command": `execute if block ~-1 ~ ~ ${block}`, "hide": true },
					],
					"hide": true
				}
			} else {
				checks = {
					"type": "and",
					"contextual": [
						{ "type": "execute", "command": `execute if block ~ ~1 ~1 ${block}` },
						{ "type": "execute", "command": `execute if block ~ ~1 ~-1 ${block}` },
						{ "type": "execute", "command": `execute if block ~ ~ ~1 ${block}` },
						{ "type": "execute", "command": `execute if block ~ ~ ~-1 ${block}` },
					]
				}
			}
			checks.contextual.push({ "type": "not", "contextual": { "type": "execute", "command": `execute if block ~ ~1 ~ ${block}` } })
			if (isChestRecipe) {
				checks.contextual.push({ "type": "execute", "command": `execute if block ~ ~1 ~ chest`, "hide": true })
			}
			else {
				checks.contextual.push({ "type": "not", "contextual": { "type": "execute", "command": `execute if block ~ ~1 ~ chest`, "hide": true } })
			}
			return checks;
		}

		function clearResult(axis) {
			const typeNBT = (mod === 'aether' || mod === 'aether_redux') ? '' : `${(mod == 'alexscaves') ? 'ACBoatType' : 'Type'}: "${(boatType.includes('blueprint') ? `${mod}:${type}` : type)}"`;
			return [
				{
					"type": "execute",
					"command": `execute align xyz run summon ${boatType} ~0.5 ~0.05 ~0.5 {Rotation:[${(axis == "x") ? '90f' : '0f'},0f],${typeNBT}}`,
					"hide": true
				},
				(axis == "x") ?
					{
						"type": "execute",
						"command": `fill ~1 ~1 ~ ~-1 ~ ~ minecraft:air replace ${block}`,
						"hide": true
					} :
					{
						"type": "execute",
						"command": `fill ~ ~1 ~1 ~ ~ ~-1 minecraft:air replace ${block}`,
						"hide": true
					},
				{
					"type": "execute",
					"command": `fill ~ ~1 ~ ~ ~1 ~ minecraft:air replace chest`,
					"hide": true
				},
				{
					"type": "execute",
					"command": "playsound minecraft:block.anvil.use block @a ~ ~ ~",
					"hide": true
				}
			]
		}

		function axisedRecipe(axis) {
			event.custom({
				"type": "lychee:block_interacting",
				"hide_in_viewer": true,
				"item_in": {
					"item": "minecraft:wooden_shovel"
				},
				"block_in": block,
				"contextual": {
					"type": "and",
					"contextual": plankShapeChecks(axis),
					"hide": true
				},
				"post": clearResult(axis)
			})
		}

		axisedRecipe("x", isChestRecipe);
		axisedRecipe("z", isChestRecipe);

		if (!isChestRecipe) {
			// REI/JEI display
			let text = [
				'Place 5 planks as shown:',
				'⬛  ⬛  < top layer',
				'⬛⬜⬛  < bottom layer',
				'',
				'Interact with ⬜',
				'Consumes the Planks',
				' and creates the Boat',
				'If you want to make a Chest Boat instead,',
				' put a Chest in the empty spot above the ⬜'
			]
			event.custom({
				"type": "lychee:block_interacting",
				"ghost": true,
				"comment": text.join('\n'),
				"item_in": {
					"item": "minecraft:wooden_shovel"
				},
				"block_in": block,
				"post": [
					{
						"type": "drop_item",
						"item": boat
					}
				]
			}).id(`adj:boat/${mod}_${type}`);
		}
	}

	event.forEachRecipe({ output: /(boat|.*_raft$)/, type: 'crafting_shaped' }, recipe => {
		const result = recipe.getOriginalRecipeResult();
		event.remove({ id: recipe.getId() });

		if (result.id.includes('chest')) return;

		const plankType = recipe.getOriginalRecipeIngredients().toArray()[0].getItemIds()[0];
		lycheeBoat(result.id, plankType, true);
		lycheeBoat(result.id, plankType, false);
	});


	// Trapdoor, Stairs, Fence and Fence Gates recipes yield more
	event.forEachRecipe({ output: /trapdoor/, type: 'crafting_shaped' }, recipe => {
		const ingredients = recipe.getOriginalRecipeIngredients().toArray();
		if (ingredients.length === 6) {
			const output = recipe.getOriginalRecipeResult().getId();

			event.remove({ id: recipe.getId() })
			event.shaped(
				Item.of(output, 6),
				[
					'PPP',
					'PPP'
				],
				{
					P: ingredients[0]
				}
			).id(recipe.getId())
		}
		else if (ingredients.length === 4) {
			const output = recipe.getOriginalRecipeResult().getId();

			event.remove({ id: recipe.getId() })
			event.shaped(
				Item.of(output, 3),
				[
					'PP',
					'PP'
				],
				{
					P: ((output === 'upgrade_aquatic:tooth_trapdoor') ? 'alexsmobs:shark_tooth' : ingredients[0])
				}
			).id(recipe.getId())
		}
	})

	event.forEachRecipe({ output: /stairs/, type: 'crafting_shaped' }, recipe => {
		const ingredients = recipe.getOriginalRecipeIngredients().toArray();
		const output = recipe.getOriginalRecipeResult().getId();

		event.remove({ id: recipe.getId() })

		event.shaped(
			Item.of(output, 6),
			[
				'P  ',
				'PP ',
				'PPP'
			],
			{
				P: ingredients[0]
			}
		).id(recipe.getId())
	})

	event.forEachRecipe({ output: /^(?=.*fence)(?!.*gate).*/, type: 'crafting_shaped' }, recipe => {
		const ingredients = recipe.getOriginalRecipeIngredients().toArray();
		const output = recipe.getOriginalRecipeResult().getId();

		event.remove({ id: recipe.getId() })

		let slotToUse = (output == 'supplementaries:wicker_fence') ? 1 : 0;
		event.shaped(
			Item.of(output, 6),
			(output == 'supplementaries:wicker_fence') ?
				[
					'SPS',
					'SPS',
				] :
				[
					'PSP',
					'PSP',
				],
			{
				P: ingredients[slotToUse],
				S: (ingredients[Math.abs(slotToUse - 1)].getItemIds().toArray().includes('minecraft:stick')
					|| ingredients[Math.abs(slotToUse - 1)].getItemIds().toArray().includes('aether:skyroot_stick')) ? 'stick' : ingredients[Math.abs(slotToUse - 1)]
			}
		).id(recipe.getId())
	})

	event.forEachRecipe({ output: /fence_gate/, type: 'crafting_shaped' }, recipe => {
		const ingredients = recipe.getOriginalRecipeIngredients().toArray();
		const output = recipe.getOriginalRecipeResult().getId();

		event.remove({ id: recipe.getId() })

		event.shaped(
			Item.of(output, 3),
			[
				'SPS',
				'SPS',
			],
			{
				P: ingredients[1],
				S: (ingredients[0].getItemIds().toArray().includes('minecraft:stick'))
					|| (ingredients[0].getItemIds().toArray().includes('aether:skyroot_stick')) ? 'stick' : ingredients[0]
			}
		).id(recipe.getId())
	})

	event.forEachRecipe({ output: /ladder/, type: 'crafting_shaped' }, recipe => {
		const ingredients = recipe.getOriginalRecipeIngredients().toArray();
		const output = recipe.getOriginalRecipeResult().getId();

		event.remove({ id: recipe.getId() })

		event.shaped(
			Item.of(output, (output == 'quark:iron_ladder') ? 8 : 12),
			[
				'S S',
				'SPS',
				'S S'
			],
			{
				P: ingredients[4],
				S: ingredients[0]
			}
		).id(recipe.getId())
	})

	event.shaped(
		Item.of('upgrade_aquatic:driftwood_ladder', 12),
		[
			'S S',
			'SPS',
			'S S'
		],
		{
			P: 'upgrade_aquatic:driftwood_planks',
			S: 'stick'
		}
	).id('adj:ladder/upgrade_aquatic_driftwood_ladder')

	event.shaped(
		Item.of('upgrade_aquatic:river_ladder', 12),
		[
			'S S',
			'SPS',
			'S S'
		],
		{
			P: 'upgrade_aquatic:river_planks',
			S: 'stick'
		}
	).id('adj:ladder/upgrade_aquatic_river_ladder')

	event.shaped(
		Item.of('upgrade_aquatic:driftwood_bookshelf', 1),
		[
			'PPP',
			'BBB',
			'PPP'
		],
		{
			P: 'upgrade_aquatic:driftwood_planks',
			B: 'book'
		}
	).id('adj:driftwood_bookshelf')

	event.shaped(
		Item.of('upgrade_aquatic:river_bookshelf', 1),
		[
			'PPP',
			'BBB',
			'PPP'
		],
		{
			P: 'upgrade_aquatic:river_planks',
			B: 'book'
		}
	).id('adj:river_bookshelf')

	event.forEachRecipe({ output: /^(?=.*_sign)(?!.*hanging)(?!.*post).*/, type: 'crafting_shaped' }, recipe => {

		const ingredients = recipe.getOriginalRecipeIngredients().toArray();
		const output = recipe.getOriginalRecipeResult().getId();

		if (!ingredients[7]) return;

		event.remove({ id: recipe.getId() })

		event.shaped(
			Item.of(output, 6),
			[
				'ABC',
				'DEF',
				' G '
			],
			{
				A: ingredients[0],
				B: ingredients[1],
				C: ingredients[2],
				D: ingredients[3],
				E: ingredients[4],
				F: ingredients[5],
				G: (ingredients[7].getItemIds().toArray().includes('minecraft:stick')) ? 'stick' : ingredients[7],
			}
		).id(recipe.getId())
	})

	alloyForgeRecipe(
		[
			['experienceobelisk:cognitive_amalgam', 3],
			['create:zinc_ingot', 2]
		],
		'experienceobelisk:cognitive_alloy',
		1,
		10,
		[
			['2+', 'output', 2],
			['3+', 'output', 3],
			['4+', 'output', 4]
		]
	)

	event.recipes.create.mixing('experienceobelisk:cognitive_flux', [
		'2x quartz',
		[
			'soul_sand',
			'soul_soil',
		],
		'botania:mana_powder',
	]).id('adj:cognitive_flux')

	event.custom({
		"type": "experienceobelisk:molecular_metamorphosis",
		"ingredient1": {
			"item": "experienceobelisk:cognitive_flux"
		},
		"count1": 2,
		"ingredient2": {
			"item": "create:zinc_ingot"
		},
		"count2": 1,
		"ingredient3": [],
		"count3": 0,
		"result": {
			"item": "experienceobelisk:cognitive_alloy",
			"count": 1
		},
		"cost": 27,
		"processTime": 400
	}).id('adj:cognitive_alloy')

	event.forEachRecipe({ type: 'experienceobelisk:molecular_metamorphosis' }, recipe => {
		const json = recipe.json.deepCopy()

		let object = {}

		json.keySet().forEach(entry => {
			object[entry] = json.get(entry)
		})

		object['processTime'] = Math.ceil(object['processTime'] * 10)

		event.remove({ id: recipe.getId() })

		event.custom(object).id(recipe.getId())
	})

	event.shaped(
		'4x candle',
		[
			'S',
			'H'
		],
		{
			S: 'string',
			H: 'honeycomb'
		}
	).id('minecraft:candle')

	event.shaped(
		'2x candle',
		[
			'S',
			'H',
			'H'
		],
		{
			S: 'string',
			H: 'delightful:animal_fat'
		}
	).id('adj:candle_from_animal_fat')

	// Reworking Botania
	// Runes
	function rune(name) {
		return (Item.exists(`botania:rune_${name}`)) ? `botania:rune_${name}` : `botanicadds:rune_${name}`
	}
	const manaAmounts = [
		5200,
		8000,
		12000
	]
	const runeCraftingMap = {
		'water': {
			tier: 1,
			items: [
				'botania:mana_powder',
				'botania:mana_powder',
				'ars_nouveau:water_essence'
			]
		},
		'fire': {
			tier: 1,
			items: [
				'botania:mana_powder',
				'botania:mana_powder',
				'ars_nouveau:fire_essence'
			]
		},
		'air': {
			tier: 1,
			items: [
				'botania:mana_powder',
				'botania:mana_powder',
				'ars_nouveau:air_essence'
			]
		},
		'earth': {
			tier: 1,
			items: [
				'botania:mana_powder',
				'botania:mana_powder',
				'ars_nouveau:earth_essence'
			]
		},
		'mana': {
			tier: 1,
			items: [
				'botania:mana_powder',
				'botania:mana_powder',
				'ars_nouveau:abjuration_essence',
			]
		},
		'spring': {
			tier: 2,
			items: [
				rune('water'),
				rune('fire'),
				'#minecraft:flowers',
				'#minecraft:flowers',
				'#minecraft:flowers',
				'#minecraft:leaves'
			]
		},
		'summer': {
			tier: 2,
			items: [
				rune('air'),
				rune('earth'),
				'#minecraft:sand',
				'#minecraft:sand',
				'water_bucket',
				'minecraft:dead_bush'
			]
		},
		'autumn': {
			tier: 2,
			items: [
				rune('fire'),
				rune('air'),
				'wheat',
				'carrot',
				'potato',
				'farmersdelight:onion'
			]
		},
		'winter': {
			tier: 2,
			items: [
				rune('earth'),
				rune('water'),
				'snow_block',
				'snow_block',
				'leather',
				'#wool'
			]
		},
		'tp': {
			tier: 1,
			items: [
				'botania:mana_powder',
				'botania:mana_powder',
				'ars_nouveau:manipulation_essence',
			]
		},
		'energy': {
			tier: 1,
			items: [
				'botania:mana_powder',
				'botania:mana_powder',
				'ars_nouveau:conjuration_essence',
			]
		}
	}

	for (const [runeName, entry] of Object.entries(runeCraftingMap)) {
		let targetRune = rune(runeName);

		event.remove({ type: 'botania:runic_altar', output: targetRune });

		event.recipes.botania.runic_altar(
			Item.of(targetRune, (entry.tier == 1) ? 2 : 1),
			entry.items,
			manaAmounts[entry.tier - 1]
		).id('botania:runic_altar/' + runeName)
	}

	const essenceToRuneMap = {
		'ars_nouveau:fire_essence': 'botania:rune_fire',
		'ars_nouveau:air_essence': 'botania:rune_air',
		'ars_nouveau:water_essence': 'botania:rune_water',
		'ars_nouveau:earth_essence': 'botania:rune_earth',

		'ars_nouveau:manipulation_essence': 'botanicadds:rune_tp',
		'ars_nouveau:abjuration_essence': 'botania:rune_mana',
		'ars_nouveau:conjuration_essence': 'botania:rune_energy',
	}

	for (const [essence, rune] of Object.entries(essenceToRuneMap)) {
		event.replaceInput({ not: { type: 'crafting_shapeless' } },
			essence,
			rune
		)
	}

	event.recipes.ars_nouveau.enchanting_apparatus(
		[
			'botania:ender_air_bottle',
			'botania:ender_air_bottle',
			'botania:life_essence',
			'botania:life_essence',
			'botania:life_essence',
			'botania:life_essence',
			'botania:elementium_ingot',
			'botania:elementium_ingot'
		],
		'evilcraft:dark_power_gem',
		'botania:spawner_mover',
		10000
	).id('adj:spawner_mover')

	event.recipes.ars_nouveau.enchanting_apparatus(
		[
			'botania:ender_air_bottle',
			'botania:elementium_ingot',
			'botania:elementium_ingot',
			'mythicmetals:stormyx_ingot',
			'mythicmetals:stormyx_ingot',
			'mythicmetals:stormyx_ingot',
		],
		'evilcraft:dark_power_gem',
		'botania:spawner_claw',
		3500
	).id('adj:spawner_claw')

	// All Leaves support Conjuration Catalyst
	Item.list.toArray().forEach(/** @param {Internal.Item} item*/ item => {
		if (item.id.includes('_leaves') && item.id !== 'botania:horn_leaves') {
			event.recipes.botania.mana_infusion(Item.of(item, 2), item)
				.mana(2000)
				.catalyst('botania:conjuration_catalyst')
				.id(`botania:mana_infusion/${(item.id.split(':')[0] != 'minecraft') ? item.id.split(':')[0] + '_' : ''}${item.id.split(':')[1]}_dupe`)
		}
	})

	// Pure Daisy transforms (all default ones have been removed completely)
	const pureDaisyMap = {
		'stone': 'botania:livingrock',
		'botania:blaze_block': 'minecraft:obsidian',
		'water': 'minecraft:snow_block',
		'#logs': 'botania:livingwood_log',
		'netherrack': 'create:scoria',
		'end_stone': 'quark:myalite',
		'diorite': 'create:limestone',
		'granite': 'create:ochrum',
		'tuff': 'create:veridium',
		'calcite': 'create:asurine',
		'create:limestone': 'create:crimsite',
		'ars_nouveau:source_gem_block': 'minecraft:amethyst_block',

		'witherstormmod:tainted_stone': 'minecraft:stone',
		'witherstormmod:tainted_stone_stairs': 'minecraft:stone_stairs',
		'witherstormmod:tainted_stone_slab': 'minecraft:stone_slab',
		'witherstormmod:tainted_stone_button': 'minecraft:stone_button',
		'witherstormmod:tainted_stone_pressure_plate': 'minecraft:stone_pressure_plate',
		'witherstormmod:tainted_cobblestone': 'minecraft:cobblestone',
		'witherstormmod:tainted_cobblestone_stairs': 'minecraft:cobblestone_stairs',
		'witherstormmod:tainted_cobblestone_slab': 'minecraft:cobblestone_slab',
		'witherstormmod:tainted_cobblestone_wall': 'minecraft:cobblestone_wall',
		'witherstormmod:tainted_dirt': 'minecraft:dirt',
		'witherstormmod:tainted_sand': 'minecraft:sand',
		'witherstormmod:tainted_sandstone': 'minecraft:sandstone',
		'witherstormmod:tainted_sandstone_slab': 'minecraft:sandstone_slab',
		'witherstormmod:tainted_sandstone_stairs': 'minecraft:sandstone_stairs',
		'witherstormmod:tainted_sandstone_wall': 'minecraft:sandstone_wall',
		'witherstormmod:tainted_cut_sandstone': 'minecraft:cut_sandstone',
		'witherstormmod:tainted_cut_sandstone_slab': 'minecraft:cut_sandstone_slab',
		'witherstormmod:tainted_chiseled_sandstone': 'minecraft:chiseled_sandstone',
		'witherstormmod:tainted_smooth_sandstone': 'minecraft:smooth_sandstone',
		'witherstormmod:tainted_smooth_sandstone_stairs': 'minecraft:smooth_sandstone_stairs',
		'witherstormmod:tainted_smooth_sandstone_slab': 'minecraft:smooth_sandstone_slab',
		// 'witherstormmod:tainted_smooth_sandstone_wall': 'minecraft:smooth_sandstone_wall', // no vanilla block!
		'witherstormmod:tainted_glass': 'minecraft:glass',
		'witherstormmod:tainted_glass_pane': 'minecraft:glass_pane',
		'witherstormmod:tainted_planks': 'minecraft:oak_planks',
		'witherstormmod:tainted_log': 'minecraft:oak_log',
		'witherstormmod:tainted_wood': 'minecraft:oak_wood',
		'witherstormmod:tainted_leaves': 'minecraft:oak_leaves',
		'witherstormmod:tainted_door': 'minecraft:oak_door',
		'witherstormmod:tainted_sign': 'minecraft:oak_sign',
		'witherstormmod:tainted_trapdoor': 'minecraft:oak_trapdoor',
		'witherstormmod:tainted_button': 'minecraft:oak_button',
		'witherstormmod:tainted_pressure_plate': 'minecraft:oak_pressure_plate',
		'witherstormmod:tainted_stairs': 'minecraft:oak_stairs',
		'witherstormmod:tainted_slab': 'minecraft:oak_slab',
		'witherstormmod:tainted_fence': 'minecraft:oak_fence',
		'witherstormmod:tainted_fence_gate': 'minecraft:oak_fence_gate',
		'witherstormmod:tainted_torch': 'minecraft:torch',
		'witherstormmod:tainted_mushroom': 'minecraft:brown_mushroom',
		'witherstormmod:tainted_pumpkin': 'minecraft:pumpkin',
		'witherstormmod:tainted_carved_pumpkin': 'minecraft:carved_pumpkin',
		'witherstormmod:tainted_jack_o_lantern': 'minecraft:jack_o_lantern',
	}

	for (const [block, into] of Object.entries(pureDaisyMap)) {
		event.recipes.botania.pure_daisy(into, block)
			.id(`botania:pure_daisy/${(into == 'botania:livingwood_log') ? 'livingwood' : into.split(':')[1]}`);
	}

	// Orechid transforms
	const orechidMap = {
		'stone': [
			['mythicmetals:tin_ore', 21000],
			['overworld_quartz:overworld_quartz_ore', 9500],
			['create:zinc_ore', 19000],
			['mythicmetals:morkite_ore', 6000],
			['mythicmetals:runite_ore', 4550],
			['rediscovered:ruby_ore', 5200],
			['galosphere:silver_ore', 19000],
			['mythicmetals:kyber_ore', 4000],
			['mythicmetals:prometheum_ore', 3500],
			['mythicmetals:mythril_ore', 65],
			['mythicmetals:orichalcum_ore', 65]
		],
		'deepslate': [
			['overworld_quartz:deepslate_quartz_ore', 800],
			['mythicmetals:deepslate_morkite_ore', 250],
			['mythicmetals:deepslate_prometheum_ore', 190],
			['mythicmetals:deepslate_orichalcum_ore', 25],
			['mythicmetals:deepslate_myhtril_ore', 25],
			['create:deepslate_zinc_ore', 400],
			['mythicmetals:deepslate_adamantite_ore', 1],
		],
		'aether:holystone': [
			['aether_ores:holystone_coal_ore', 10500],
			['aether_ores:holystone_iron_ore', 8000],
			['aether_ores:holystone_gold_ore', 5000],
			['aether_ores:holystone_emerald_ore', 900],
			['aether_ores:holystone_redstone_ore', 2500],
			['aether_ores:holystone_lapis_ore', 2500],
			['aether_ores:holystone_diamond_ore', 300],
			['ancient_aether:valkyrum_ore', 150],
			['ancient_aether:aether_quartz_ore', 5000],
			['aether:ambrosium_ore', 19500],
			['aether:zanite_ore', 7000],
			['aether:gravitite_ore', 250],
			['aether_redux:veridium_ore', 700],

		]
	}
	const orechdIgnemMap = {
		'netherrack': [
			['mythicmetals:midas_gold_ore', 5000],
			['mythicmetals:stormyx_ore', 2500],
			['mythicmetals:palladium_ore', 440]
		],
		'blackstone': [
			['minecraft:gilded_blackstone', 29000],
			['mythicmetals:blackstone_stormyx_ore', 1000]
		]
	}

	for (const [block, entries] of Object.entries(orechidMap)) {
		entries.forEach(entry => {
			event.recipes.botania.orechid(entry[0], block, entry[1])
		})
	}
	for (const [block, entries] of Object.entries(orechdIgnemMap)) {
		entries.forEach(entry => {
			event.recipes.botania.orechid_ignem(entry[0], block, entry[1])
		})
	}

	event.shapeless(
		'botania:redstone_root',
		[
			'redstone',
			'stick',
			'stick'
		]
	).id('botania:redstone_root')

	event.replaceInput({ output: /botania:.*_floating_flower/ },
		'minecraft:dirt',
		'#minecraft:dirt'
	)

	// Misc Blocks
	event.shaped(
		'botania:mana_pylon',
		[
			' G ',
			'IDI',
			' G '
		],
		{
			G: 'mythicmetals:midas_gold_block',
			I: 'botania:manasteel_ingot',
			D: 'ars_nouveau:source_gem'
		}
	).id('botania:mana_pylon')

	event.shaped(
		'botania:natura_pylon',
		[
			'TLT',
			'TPT',
			' E '
		],
		{
			T: 'botania:terrasteel_nugget',
			P: 'botania:mana_pylon',
			E: 'ender_eye',
			L: '#botania:livingwood_logs'
		}
	).id('botania:natura_pylon')

	event.shaped(
		'botania:gaia_pylon',
		[
			'DED',
			'APA',
			'DED'
		],
		{
			A: 'mythicmetals:adamantite_ingot',
			P: 'botania:mana_pylon',
			E: 'botania:elementium_ingot',
			D: 'botania:pixie_dust'
		}
	).id('botania:gaia_pylon')

	event.shapeless(
		'botania:spark',
		[
			'#botania:petals',
			'mythicmetals:midas_gold_nugget',
			'blaze_powder'
		]
	).id('botania:spark')

	// Botania flowers
	const constIngredients = {
		redstoneRoot: 'botania:redstone_root',
		gaiaSpirit: 'botania:gaia_spirit',
		sculkPetal: 'botanicadds:sculk_petal',
		essence: {
			abjuration: 'ars_nouveau:abjuration_essence',
			conjuration: 'ars_nouveau:conjuration_essence',
			manipulation: 'ars_nouveau:manipulation_essence',
			anima: 'ars_elemental:anima_essence'
		},
		terrasteelNugget: 'botania:terrasteel_nugget',
		limitite: 'sortilege:limitite',
		pixieDust: 'botania:pixie_dust'
	}
	function flower(name) {
		return (Item.exists(`botania:${name}`)) ? `botania:${name}` : `botanicadds:flowers/${name}`
	}
	function petals(color) {
		return `#botania:petals/${color}`
	}
	const flowerRecipeMap = {
		'endoflame': [
			petals('red'),
			petals('light_gray'),
			petals('brown'),
			petals('brown'),
			'#c:coal'
		],
		'thermalily': [
			rune('earth'),
			rune('fire'),
			petals('orange'),
			petals('orange'),
			petals('red'),
			'magma_block'
		],
		'rosa_arcana': [
			petals('purple'),
			petals('purple'),
			petals('lime'),
			petals('pink'),
			petals('pink'),
			'#adj:archwood_leaves'
		],
		'spectrolus': [
			rune('winter'),
			rune('air'),
			petals('red'),
			petals('orange'),
			petals('yellow'),
			petals('lime'),
			petals('green'),
			petals('light_blue'),
			petals('magenta')
		],
		'spectranthemum': [
			rune('tp'),
			rune('envy'),
			petals('white'),
			petals('white'),
			petals('white'),
			petals('white'),
			constIngredients.redstoneRoot,
			constIngredients.pixieDust
		],
		'narslimmus': [
			rune('summer'),
			rune('water'),
			petals('black'),
			petals('green'),
			petals('green'),
			petals('lime'),
			petals('lime'),
			petals('black'),
			'slime_block'
		],
		'bergamute': [
			constIngredients.redstoneRoot,
			petals('purple'),
			petals('magenta'),
			petals('magenta')
		],
		'exoflame': [
			rune('fire'),
			rune('summer'),
			petals('red'),
			petals('red'),
			petals('orange'),
			petals('brown'),
			'magma_cream',
		],
		'fallen_kanade': [
			rune('spring'),
			petals('white'),
			petals('white'),
			petals('white'),
			petals('lime'),
			'glistering_melon_slice'
		],
		'hopperhock': [
			rune('air'),
			constIngredients.redstoneRoot,
			petals('light_gray'),
			petals('gray'),
			petals('gray'),
			'hopper'
		],
		'agricarnation': [
			'bone_block',
			rune('spring'),
			rune('earth'),
			petals('lime'),
			petals('lime'),
			petals('green'),
			petals('yellow'),
			'botania:fertilizer'
		]
	}

	for (const [flowerName, items] of Object.entries(flowerRecipeMap)) {
		let flw = flower(flowerName);
		event.remove({ type: 'botania:petal_apothecary', output: flw })
		event.recipes.botania.petal_apothecary(flw, items).id(`botania:petal_apothecary/${flowerName}`)
	}

	const ritualOverrides = {
		types: {
			blue: 'ars_nouveau:blue_archwood_log'
		},
		rituals: {
			// 'ars_nouveau:ritual_cloudshaping': {
			// 	type: 'blue',
			// 	ingredients: [
			// 		'ars_nouveau:source_gem_block',
			// 		'feather',
			// 	]
			// }
		}
	}
	event.forEachRecipe({ type: 'crafting_shapeless' }, recipe => {
		const output = recipe.getOriginalRecipeResult();
		if (!(output.getId().includes('ars') && output.getId().includes('ritual_'))) return;

		const ingredients = recipe.getOriginalRecipeIngredients();

		if (ingredients[0].getItemIds().stream().anyMatch(id => id.toString().includes('archwood'))) {

			let ingr = [];
			if (Object.keys(ritualOverrides.rituals).includes(output.id)) {
				ingr.push(ritualOverrides.types[ritualOverrides.rituals[output.id].type]);
				ritualOverrides.rituals[output.id].ingredients.forEach(i => {
					ingr.push(i);
				})
			}
			else {
				for (let i = 0; i < ingredients.size(); i++) {
					let essence = ingredients[i].getItemIds().toArray()[0];
					if (essence.includes('_essence')) {
						ingr.push(Ingredient.of(essenceToRuneMap[essence]))
					}
					else ingr.push(ingredients[i]);
				}
			}

			event.remove({ id: recipe.getId() })

			event.recipes.botania.runic_altar(
				output,
				ingr,
				5000
			).id(recipe.getId())
		}
	})

	// Window Box Chthonic Yew and Alfthorne
	event.recipes.botania.petal_apothecary('window_box:alfthorne_sapling', [
		'botania:terrasteel_nugget',
		'botania:terrasteel_nugget',
		'botania:terrasteel_nugget',
		'#botania:glimmering_livingwood_logs',
		'botania:livingwood_twig',
		'botania:livingwood_twig',
		'botania:livingwood_twig',
		'botania:redstone_root'
	]).id(`adj:alfthorne_sapling`)
	warping('window_box:alfthorne_sapling', 'window_box:chthonic_yew_sapling')


	// Workshop recipes
	function workshopRecipe(ingredients, output, id) {

		let iMap = [];
		ingredients.forEach(i => {
			iMap.push(i instanceof Item ? i : Item.of(i))
		})

		if (id) {
			event.custom({
				"type": "terra_curio:workshop",
				"ingredients": iMap,
				"result": (output instanceof Item) ? output : Item.of(output)
			}).id(id)
		}
		else {
			event.custom({
				"type": "terra_curio:workshop",
				"ingredients": iMap,
				"result": (output instanceof Item) ? output : Item.of(output)
			}).id(`adj:workshop/${flattenedID(output)}`)
		}
	}

	workshopRecipe([
		'book',
		'map',
		'ink_sac',
		'feather',
		'compass',
		'additionaladditions:depth_meter'
	], Item.of('map_atlas'))

	const curioToWorkshopList = [
		'botania:mana_ring',
		'botania:mana_ring_greater',
		'botania:aura_ring',
		'botania:aura_ring_greater',
		'botania:magnet_ring',
		'botania:magnet_ring_greater',
		'botania:water_ring',
		'botania:swap_ring',
		'botania:dodge_ring',
		'botania:mining_ring',
		'botania:pixie_ring',
		'botania:reach_ring',
		'botania:travel_belt',
		'botania:super_travel_belt',
		'botania:speed_up_belt',
		'botania:knockback_belt',
		'botania:ice_pendant',
		'botania:lava_pendant',
		'botania:super_lava_pendant',
		'botania:cloud_pendant',
		'botania:super_cloud_pendant',
		'botania:inbisibility_cloak',
		'botania:holy_cloak',
		'botania:unholy_cloak',
		'botania:balance_cloak',
		'botania:third_eye',
		'botania:monocle',
		'botania:tiny_planet',
		'botania:goddes_charm',
		'botania:diva_charm',
		'botania:blood_pendant',
		'cataclysm:sticky_gloves',
		'ars_nouveau:mundane_belt',
		'ars_nouveau:dull_trinket',
		'botanicadds:aura_ring_gaia',
		'botanicadds:mana_ring_gaia',
		'create:googles',
		'botania:invisibility_cloak',
	]
	const curioToWorkshopRegex = [
		/botania:cosmetic.*/,
		/aether:.*gloves/,
		/umbral_skies:.*gloves/,
	]
	const curioToWorkshopBlacklist = [
		'aether:netherite_gloves'
	]
	event.forEachRecipe({}, recipe => {
		if (recipe.getId().includes('_repair')) return;

		const output = recipe.getOriginalRecipeResult();
		const id = output.getId();

		let regexed = curioToWorkshopRegex.some(rx => rx.test(id));
		if (curioToWorkshopBlacklist.includes(id)) regexed = false;

		if (curioToWorkshopList.includes(id) || regexed) {
			let ingredients = recipe.getOriginalRecipeIngredients();

			let counts = {};

			ingredients.forEach(i => {
				const ids = i.asIngredient().getItemIds();
				if (!ids.length) return;

				let id = ids[0];

				if (id === 'botania:mana_string') id = 'ars_nouveau:magebloom_fiber'
				counts[id] = (counts[id] || 0) + 1;
			});

			let newIngredients = Object.entries(counts).map(([id, count]) => {
				return `${count}x ${id}`;
			});

			event.remove({ id: recipe.getId() });

			workshopRecipe(newIngredients, output, recipe.getId())

		}
	})

	// Binding Wayfinders
	function locateStructureRitual(structure, ingredients) {

		let parsedIngredients = [];

		ingredients.forEach(i => {
			let map = {};
			map[(i.startsWith('#')) ? "tag" : "key"] = (i.startsWith('#')) ? i.substring(1) : i;
			parsedIngredients.push(map);
		})

		let parsedStructure = {};
		parsedStructure[(structure.startsWith('#')) ? "tag" : "key"] = (structure.startsWith('#')) ? structure.substring(1) : structure;

		event.custom({
			"type": "ars_additions:locate_structure",
			"augments": parsedIngredients,
			"id": `ars_additions:${structure.split(":")[1]}`,
			"structure": parsedStructure
		}).id(`adj:locate_structure/${flattenedID(structure)}`)
	}

	locateStructureRitual('#ars_nouveau:wilden_den', ['ars_nouveau:source_gem', 'ars_nouveau:source_gem', 'ars_nouveau:source_gem', rune('wrath')]);
	locateStructureRitual('betterfortresses:fortress', ['nether_bricks', 'nether_bricks', 'nether_bricks', 'quark:soul_bead']);
	locateStructureRitual('minecraft:pillager_outpost', ['emerald_block', 'galosphere:silver_block', rune('greed')]);
	locateStructureRitual('betteroceanmonuments:ocean_monument', ['prismarine', 'prismarine', 'prismarine', 'prismarine', rune('water')]);
	locateStructureRitual('minecraft:trail_ruins', ['rediscovered:ruby', 'rediscovered:ruby', 'rediscovered:ruby']);
	locateStructureRitual('minecraft:end_city', ['ender_eye', 'purpur_block', 'purpur_block', 'purpur_block', rune('envy')]);
	locateStructureRitual('minecraft:ancient_city', ['minecraft:deepslate_bricks', 'minecraft:deepslate_bricks', 'minecraft:deepslate_bricks', 'echo_shard', 'echo_shard']);
	locateStructureRitual('aether:bronze_dungeon', ['mythicmetals:bronze_ingot', 'aether:zanite_gemstone', 'aether:zanite_gemstone', 'aether:ambrosium_shard', 'aether:ambrosium_shard', 'aether:ambrosium_shard']);
	locateStructureRitual('aether:silver_dungeon', ['galosphere:silver_ingot', 'aether:zanite_gemstone', 'aether:zanite_gemstone', 'aether:ambrosium_shard', 'aether:ambrosium_shard', 'aether:ambrosium_shard']);
	locateStructureRitual('aether:gold_dungeon', ['gold_ingot', 'aether:zanite_gemstone', 'aether:zanite_gemstone', 'aether:ambrosium_shard', 'aether:ambrosium_shard', 'aether:ambrosium_shard']);
	locateStructureRitual('lost_aether_content:platinum_dungeon', ['mythicmetals:platinum_ingot', 'aether:zanite_gemstone', 'aether:zanite_gemstone', 'aether:ambrosium_shard', 'aether:ambrosium_shard', 'aether:ambrosium_shard']);

	// Aether repairing
	Item.list.toArray().forEach(/** @param {Internal.Item} item*/ item => {
		const maxDamage = item.maxDamage;
		if (maxDamage > 0) {
			event.custom({
				"type": "aether:repairing",
				"ingredient": {
					"item": item.getId()
				},
				"repairTime": Math.ceil((1.75 * Math.sqrt(maxDamage)) * 20)
			}).id(`adj:repairing/${flattenedID(item.getId())}`)
		}
	})

	// Summoning Rituals
	function toSeconds(time) {
		return time * 20
	}
	event.recipes.summoningrituals.altar('botania:elementium_block')
		.itemOutput('botania:flight_tiara')
		.input(
			'4x botania:life_essence',
			'4x botanicadds:gaiasteel_ingot',
			'16x feather',
			'4x botania:ender_air_bottle'
		)
		.recipeTime(toSeconds(30))
		.id('botania:flight_tiara_0')

	event.recipes.summoningrituals.altar('ars_nouveau:wilden_tribute')
		.itemOutput('5x ars_elemental:mark_of_mastery')
		.input(
			'botania:rune_wrath',
			'botania:rune_envy',
			'botania:rune_pride',
			'botania:rune_greed',
			'botania:rune_gluttony',
			'botania:rune_lust',
			'botania:rune_sloth',
			'ars_elemental:anima_essence',
		)
		.recipeTime(toSeconds(20))
		.id('adj:mark_of_mastery')

	event.recipes.summoningrituals.altar('enchantinginfuser:enchanting_infuser')
		.itemOutput('enchantinginfuser:advanced_enchanting_infuser')
		.input(
			'4x #c:bookshelves',
			'20x crying_obsidian',
			'2x netherite_ingot'
		)
		.recipeTime(toSeconds(10))
		.id('adj:advanced_enchanting_table')

	event.recipes.summoningrituals.altar('ender_eye')
		.itemOutput('kubejs:eye_of_arcanum')
		.input(
			'ars_elemental:mark_of_mastery',
			'12x aether_redux:gravitite_block',
			'24x mythicmetals:midas_gold_block',
			'64x ars_nouveau:source_gem_block',
			'10x evilcraft:garmonbozia'
		)
		.recipeTime(toSeconds(45))
		.id('adj:eyes/arcanum')

	event.recipes.summoningrituals.altar('mythicmetals:hallowed_ingot')
		.itemOutput('botania:terra_sword')
		.input(
			'mythicmetals:stormyx_sword',
			'mcdw:sword_sinister',
			'mythicmetals:star_platinum_sword',
			'mythicmetals:orichalcum_sword',
			'ancient_aether:valkyrum_sword',
			'unusualend:pearlescent_sword',
			'mythicmetals:palladium_sword',
			'botania:elementium_sword'
		)
		.recipeTime(toSeconds(25))
		.id('botania:terra_sword')

	// Zenith
	const swords = [
		{
			item: 'witherstormmod:command_block_book'
		},
		{
			item: 'mythicmetals:unobtainium_block'
		},
		{
			item: 'mythicmetals:unobtainium_block'
		}
	];
	global.zenithSwords.forEach(obj => {
		if (obj.ingredient) {
			swords.push({
				item: obj.item
			})
		}
	})
	event.custom({
		"type": "witherstormmod:item_craft_super_beacon",
		"condition": "all_supports",
		"ingredients": swords,
		"result": {
			"item": "zenith:zenith"
		}
	}).id('adj:zenith')

	// EvilCraft rework
	function bloodInfuserRecipe(input, result, bloodAmount, tier, duration, exp, id) {
		event.custom({
			"type": "evilcraft:blood_infuser",
			"item": input,
			"fluid": {
				"fluid": "evilcraft:blood",
				"amount": bloodAmount * 1000
			},
			"result": (result instanceof Item) ? result : Item.of(result),
			"duration": duration * 20,
			"xp": (exp) ? exp : 3,
			"tier": tier
		}).id(`evilcraft:blood_infuser/${id}`)
	}

	const EvilCraftNewRecipes = [
		'promise_acceptor_iron',
		'promise_acceptor_gold',
		'promise_acceptor_diamond',
		'promise_tier_1',
		'promise_tier_2',
		'promise_tier_3',
		'promise_speed_0',
		'promise_efficiency_0',
		'potentia_sphere',
		'inverted_potentia',
		'dull_dust',
		'vengeance_ring',
		'box_of_eternal_closure',
		'piercing_vengeance_focus',
		'spirit_reanimator',
		'vengeance_essence_materialized',
		'blood_pearl_of_teleportation',
		'bucket_eternal_water',
		'spirit_furnace',
		'blood_infuser',
		'blood_chest',
		'sanguinary_environmental_accumulator'
	]
	EvilCraftNewRecipes.forEach(r => {
		event.remove({ output: `evilcraft:${r}` })
	})

	event.shaped(
		'evilcraft:blood_infuser',
		[
			'NNN',
			'NCN',
			'CCC'
		],
		{
			C: [
				'cobblestone',
				'cobbled_deepslate',
				'blackstone'
			],
			N: 'netherrack',
			C: 'evilcraft:blood_infusion_core'
		}
	).id('adj:blood_infuser')

	event.shaped(
		'evilcraft:blood_chest',
		[
			'PPP',
			'PCP',
			'PPP'
		],
		{
			P: 'evilcraft:undead_planks',
			C: 'evilcraft:blood_infusion_core'
		}
	).id('adj:blood_chest')

	event.shapeless(
		'evilcraft:blood_chest',
		[
			'everycomp:q/evilcraft/undead_chest',
			'evilcraft:blood_infusion_core'
		],
	).id('adj:blood_chest_from_undead_chest')

	gaiaPlateRecipe([
		'evilcraft:garmonbozia',
		'evilcraft:blood_infusion_core',
		'evilcraft:blood_infuser',
		'netherrack',
		'netherrack',
		'netherrack',
		'mythicmetals:hallowed_ingot',
		'mythicmetals:hallowed_ingot'
	], 'evilcraft:spirit_reanimator', 1000000)

	terraPlateAndGaiaPlate([
		'evilcraft:garmonbozia',
		'evilcraft:blood_infusion_core',
		'evilcraft:environmental_accumulation_core',
		'netherrack',
		'netherrack',
		'netherrack',
		'mythicmetals:steel_block',
		'mythicmetals:steel_block',
	], 'evilcraft:sanguinary_environmental_accumulator', 750000)

	event.recipes.create.mechanical_crafting(
		'evilcraft:spirit_furnace',
		[
			'BBBBB',
			'B M B',
			'BMCMB',
			'SSSSS',
		],
		{
			B: 'evilcraft:dark_blood_brick',
			S: 'smooth_stone',
			M: 'magma_block',
			C: 'evilcraft:blood_infusion_core'
		}
	).id('adj:spirit_furnace')

	bloodInfuserRecipe('ars_nouveau:source_gem_block', 'evilcraft:promise_acceptor_iron', 10, 0, 25, 5, 'core/promise_acceptor_iron')
	bloodInfuserRecipe('mythicmetals:midas_gold_block', 'evilcraft:promise_acceptor_gold', 40, 1, 100, 8, 'core/promise_acceptor_gold')
	bloodInfuserRecipe('aether_redux:veridium_block', 'evilcraft:promise_acceptor_diamond', 160, 2, 250, 10, 'core/promise_acceptor_diamond')

	event.recipes.create.mixing('evilcraft:potentia_sphere', [
		'slime_ball',
		'glowstone_dust',
		'glowstone_dust',
		'glowstone_dust',
		'redstone',
		'redstone',
		'lapis_lazuli'
	], 120).id('adj:potentia_sphere');

	event.recipes.ars_nouveau.imbuement(
		'evilcraft:potentia_sphere',
		'evilcraft:inverted_potentia',
		300,
		[
			'evilcraft:dark_gem',
			'evilcraft:dark_gem',
			'evilcraft:dark_gem'
		]
	).id('adj:inverted_potentia');

	event.shapeless(
		'evilcraft:dull_dust',
		[
			'supplementaries:ash',
			'sugar'
		]
	).id('adj:dull_dust_manual_only');
	event.recipes.create.mixing('2x evilcraft:dull_dust', [
		'supplementaries:ash',
		'sugar'
	], 50).id('adj:dull_dust_mixing');

	event.recipes.create.milling('evilcraft:dark_gem_crushed', 'evilcraft:dark_gem').id('adj:dark_gem_crushed');

	event.replaceInput({ id: 'minecraft:tinted_glass' },
		'amethyst_shard',
		[
			'amethyst_shard',
			'evilcraft:dark_gem'
		]
	);

	event.shapeless(
		'evilcraft:weather_container',
		[
			'glass_bottle',
			'evilcraft:dark_gem',
			'evilcraft:dull_dust'
		]
	);

	workshopRecipe([
		Item.of('evilcraft:dark_gem_crushed', 8),
		'botania:manasteel_ingot'
	], 'evilcraft:vengeance_ring', 'adj:vengeance_ring');

	event.shaped(
		'evilcraft:box_of_eternal_closure',
		[
			'DDD',
			'ICI',
			'DDD'
		],
		{
			D: 'evilcraft:dark_gem',
			I: 'iron_ingot',
			C: '#forge:chests/wooden'
		}
	).id('adj:box_of_eternal_closure');

	workshopRecipe([
		'evilcraft:vengeance_ring',
		'diamond',
		Item.of('ars_nouveau:source_gem', 4)
	], 'evilcraft:vengeance_focus', 'adj:vengeance_focus');

	event.recipes.ars_nouveau.enchanting_apparatus(
		[
			'evilcraft:blood_orb_filled',
			'evilcraft:blood_orb_filled',
			'evilcraft:blood_orb_filled',
			'evilcraft:blood_orb_filled',
			'minecraft:end_crystal',
			'minecraft:end_crystal',
			'botania:rune_wrath',
			'botania:rune_mana'
		],
		'evilcraft:vengeance_focus',
		'evilcraft:piercing_vengeance_focus',
		8000
	).id('adj:piercing_vengeance_focus');

	terraPlateAndGaiaPlate([
		'evilcraft:bucket_eternal_water',
		'#forge:glass',
		'#forge:glass',
		'#forge:glass',
		'#forge:glass',
		'mythicmetals:aquarium_block'
	], 'evilcraft:eternal_water', 350000);

	gaiaPlateRecipe([
		'#forge:ender_pearls',
		'evilcraft:dark_power_gem',
		'evilcraft:dark_power_gem',
		'evilcraft:dark_power_gem',
		'evilcraft:dark_power_gem',
		'botania:rune_mana',
		'botanicadds:rune_tp'
	], 'evilcraft:blood_pearl_of_teleportation', 700000);

	bloodInfuserRecipe('botania:open_bucket', 'evilcraft:bucket_eternal_water', 12000, 1, 600, 3, 'bucket_eternal_water');

	event.replaceOutput({ id: 'evilcraft:dark_brick' },
		'evilcraft:dark_brick',
		Item.of('evilcraft:dark_brick', 8)
	)

	event.recipes.create.haunting('evilcraft:vengeance_essence_materialized', 'evilcraft:vengeance_essence').id('adj:vengeance_essence_materialized')

	event.recipes.ars_nouveau.enchanting_apparatus(
		[
			'evilcraft:bowl_of_promises_tier0',
			'spider_eye',
			'evilcraft:dark_gem',
			'evilcraft:dark_gem'
		],
		'evilcraft:promise_acceptor_iron',
		'evilcraft:promise_tier_1',
		0
	).id('adj:promise_of_tenacity_1')

	event.recipes.ars_nouveau.enchanting_apparatus(
		[
			'evilcraft:bowl_of_promises_tier1',
			'spider_eye',
			'evilcraft:dark_gem',
			'evilcraft:dark_gem'
		],
		'evilcraft:promise_acceptor_gold',
		'evilcraft:promise_tier_2',
		0
	).id('adj:promise_of_tenacity_2')

	event.recipes.ars_nouveau.enchanting_apparatus(
		[
			'evilcraft:bowl_of_promises_tier2',
			'spider_eye',
			'evilcraft:dark_gem',
			'evilcraft:dark_gem'
		],
		'evilcraft:promise_acceptor_diamond',
		'evilcraft:promise_tier_3',
		0
	).id('adj:promise_of_tenacity_3')

	event.recipes.ars_nouveau.enchanting_apparatus(
		[
			'evilcraft:bowl_of_promises_tier1',
			'rediscovered:ruby_block',
			'evilcraft:dark_gem',
			'evilcraft:dark_gem'
		],
		'evilcraft:promise_acceptor_iron',
		'evilcraft:promise_speed_0',
		0
	).id('adj:promise_speed_0')

	event.recipes.ars_nouveau.enchanting_apparatus(
		[
			'evilcraft:bowl_of_promises_tier1',
			'lapis_block',
			'evilcraft:dark_gem',
			'evilcraft:dark_gem'
		],
		'evilcraft:promise_acceptor_iron',
		'evilcraft:promise_efficiency_0',
		0
	).id('adj:promise_efficiency_0')


	// Blahaj recipes
	Color.DYE.forEach(color => {
		const blahaj = `just_blahaj:${(color) == 'light_blue' ? '' : `${color}_`}blahaj`;


		event.remove({ output: blahaj })
		event.shapeless(
			blahaj,
			[
				'#adj:blahaj/recolorable',
				dye(color)
			]
		).id(`adj:blahaj/${color}`)
	})

	const specialBlahaj = {
		'palestine': [
			'red',
			'white',
			'black',
			'green'
		],
		'trans': [
			'light_blue',
			'pink',
			'white',
			'pink',
			'light_blue',
		],
		'pride': [
			'red',
			'orange',
			'yellow',
			'lime',
			'light_blue',
			'magenta',
			'purple'
		],
		'intersex': [
			'yellow',
			'yellow',
			'magenta'
		],
		'bi': [
			'magenta',
			'purple',
			'blue'
		],
		'pan': [
			'magenta',
			'yellow',
			'light_blue'
		],
		'lesbian': [
			'red',
			'orange',
			'pink',
			'magenta',
			'purple'
		],
		'gay': [
			'green',
			'lime',
			'white',
			'light_blue',
			'blue'
		],
		'enby': [
			'yellow',
			'white',
			'purple',
			'black'
		],
		'gender_fluid': [
			'pink',
			'white',
			'magenta',
			'black',
			'blue'
		],
		'ace': [
			'magenta',
			'white',
			'black'
		],
		'aromantic': [
			'green',
			'lime',
			'magenta',
			'white',
			'gray'
		],
		'aroace': [
			'orange',
			'yellow',
			'white',
			'light_blue',
			'blue'
		]
	}
	for (let [type, /** @param {$InputItem_[]} wool */ wool] of Object.entries(specialBlahaj)) {
		let blahaj = `just_blahaj:${(type) == 'pan' ? 'panhaj' : `${type}_blahaj`}`;
		event.remove({ output: blahaj });
		let ingredients = ['just_blahaj:blahaj'];
		wool.forEach(w => {
			ingredients.push(`minecraft:${w}_wool`)
		})
		event.shapeless(
			blahaj,
			ingredients
		).id(`adj:blahaj/${type}`)
	}

	event.recipes.botania.mana_infusion('just_blahaj:creeperhaj', 'minecraft:creeper_head').mana(50000).id('adj:blahaj/creeperhaj')

	// Missing Chest recipes
	const tfChests = [
		'twilightforest:mining', 'twilightforest:canopy', 'twilightforest:twilight_oak',
		'twilightforest:dark', 'twilightforest:transformation', 'twilightforest:time',
		'upgrade_aquatic:river', 'upgrade_aquatic:driftwood'
	]
	tfChests.forEach(t => {
		const [namespace, type] = t.split(':');

		const
			chestType = `${namespace}:${type}_chest`,
			planks = `${namespace}:${type}_planks`,
			logs = `#${namespace}:${type}_logs`;

		event.shaped(
			Item.of(chestType, 1),
			[
				'PPP',
				'P P',
				'PPP'
			],
			{
				P: planks
			}
		).id(`adj:chests/${namespace}_${type}_from_planks`)

		event.shaped(
			Item.of(chestType, 4),
			[
				'PPP',
				'P P',
				'PPP'
			],
			{
				P: logs
			}
		).id(`adj:chests/${namespace}_${type}_from_logs`)
	})

	// Craftable Heart Crystals
	event.recipes.ars_nouveau.imbuement(
		'create:polished_rose_quartz',
		Item.of('heart_crystals:heart_crystal_shard', 5),
		1250,
		[]
	).id(`adj:heart_crystal_from_imbuement`)

	// Twilight Forest reworks
	alloyForgeRecipe(
		[
			['iron_ingot', 1],
			['twilightforest:liveroot', 3],
			['gold_ingot', 1]
		],
		['twilightforest:ironwood_ingot', 2],
		1,
		5,
		[
			['3+', 'output', 3],
			['4+', 'output', 4]
		]
	)

	alloyForgeRecipe(
		[
			['raw_iron', 1],
			['twilightforest:liveroot', 3],
			['raw_gold', 1]
		],
		['twilightforest:ironwood_ingot', 3],
		1,
		5,
		[
			['3+', 'output', 4],
			['4+', 'output', 5]
		]
	)

	event.recipes.ars_nouveau.imbuement(
		'aether:cold_aercloud',
		'twilightforest:rainy_cloud',
		50,
		[
			'botania:rune_water',
		]
	).id('adj:rainy_cloud_block')

	event.recipes.ars_nouveau.imbuement(
		'aether:cold_aercloud',
		'twilightforest:snowy_cloud',
		50,
		[
			'botania:rune_winter',
		]
	).id('adj:rainy_snowy_block')

	// Vinery x Brewing and Chewing
	function pouringRecipe(fluid, item, containerItem) {
		event.custom({
			type: "brewinandchewin:keg_pouring",
			amount: 250,
			filling: true,
			fluid: fluid,
			output: {
				item: item
			},
			container: {
				item: (containerItem) ? containerItem : 'vinery:wine_bottle'
			},
			strict: false
		}).id(`adj:pouring/${flattenedID(item)}`)
	}

	function fermentingRecipe(basefluid, ingredients, resultFluid, resultItem, containerItem, temperature, experience, fermentingtime) {

		let ingr = [];
		ingredients.forEach(i => {
			if (i.startsWith('#')) {
				ingr.push({
					tag: i.substring(1)
				})
			}
			else {
				ingr.push({
					item: i
				})
			}
		})

		event.custom({
			type: "brewinandchewin:fermenting",
			basefluid: {
				count: 1000,
				fluid: basefluid
			},
			experience: (experience) ? experience : 1.0,
			fermentingtime: (fermentingtime) ? fermentingRecipe : 9600,
			ingredients: ingr,
			recipe_book_tab: "drinks",
			result: {
				count: 1000,
				fluid: resultFluid
			},
			temperature: (temperature) ? temperature : 3
		}).id(`adj:fermenting/${flattenedID(resultFluid)}_from_${flattenedID(basefluid)}`)

		pouringRecipe(resultFluid, resultItem, containerItem)
	}

	fermentingRecipe('kubejs:red_grapejuice', ['sweet_berries'], 'kubejs:noir_wine', 'vinery:noir_wine');
	fermentingRecipe('kubejs:red_grapejuice', ['sugar'], 'kubejs:red_wine', 'vinery:red_wine');
	fermentingRecipe('kubejs:red_grapejuice', ['sugar', 'cocoa_beans'], 'kubejs:strad_wine', 'vinery:strad_wine');
	fermentingRecipe('kubejs:red_grapejuice', ['vinery:cherry'], 'kubejs:cherry_wine', 'vinery:cherry_wine');
	fermentingRecipe('kubejs:red_grapejuice', ['sugar', 'feather', 'blaze_rod'], 'kubejs:cristel_wine', 'vinery:cristel_wine');
	fermentingRecipe('kubejs:red_savanna_grapejuice', ['vinery:cherry', 'honey_bottle'], 'kubejs:lilitu_wine', 'vinery:lilitu_wine');
	fermentingRecipe('kubejs:red_savanna_grapejuice', ['fermented_spider_eye'], 'kubejs:jo_special_mixture', 'vinery:jo_special_mixture');
	fermentingRecipe('kubejs:red_taiga_grapejuice', ['vinery:cherry', 'honey_bottle'], 'kubejs:bolvar_wine', 'vinery:bolvar_wine');
	fermentingRecipe('kubejs:red_taiga_grapejuice', ['chorus_fruit'], 'kubejs:chorus_wine', 'vinery:chorus_wine');
	fermentingRecipe('kubejs:red_jungle_grapejuice', ['iron_ingot'], 'kubejs:magnetic_wine', 'vinery:magnetic_wine');
	fermentingRecipe('kubejs:red_jungle_grapejuice', ['sugar', 'cocoa_beans'], 'kubejs:stall_wine', 'vinery:stall_wine');
	fermentingRecipe('kubejs:red_jungle_grapejuice', ['spider_eye', 'honey_bottle'], 'kubejs:chenet_wine', 'vinery:chenet_wine');
	fermentingRecipe('kubejs:red_wine', ['vinery:cherry', 'honey_bottle'], 'kubejs:bottle_mojang_noir', 'vinery:bottle_mojang_noir');
	fermentingRecipe('kubejs:crimson_grapejuice', ['blaze_powder'], 'kubejs:blazewine_pinot', 'nethervinery:blazewine_pinot');
	fermentingRecipe('kubejs:crimson_grapejuice', ['netherite_scrap'], 'kubejs:netherite_nectar', 'nethervinery:netherite_nectar');
	fermentingRecipe('kubejs:crimson_grapejuice', ['lava_bucket'], 'kubejs:lava_fizz', 'nethervinery:lava_fizz');

	fermentingRecipe('kubejs:apple_juice', ['sugar'], 'kubejs:apple_cider', 'vinery:apple_cider');
	fermentingRecipe('kubejs:apple_juice', ['sugar', 'sugar'], 'kubejs:apple_wine', 'vinery:apple_wine');

	fermentingRecipe('kubejs:white_grapejuice', ['sugar', 'glowstone_dust'], 'kubejs:mellohi_wine', 'vinery:mellohi_wine');
	fermentingRecipe('kubejs:white_grapejuice', ['glow_berries'], 'kubejs:glowing_wine', 'vinery:glowing_wine');
	fermentingRecipe('kubejs:white_grapejuice', ['honey_bottle', 'sweet_berries'], 'kubejs:solaris_wine', 'vinery:solaris_wine');
	fermentingRecipe('kubejs:white_savanna_grapejuice', ['gunpowder'], 'kubejs:creepers_crush', 'vinery:creepers_crush');
	fermentingRecipe('kubejs:white_savanna_grapejuice', ['kelp'], 'kubejs:kelp_cider', 'vinery:kelp_cider');
	fermentingRecipe('kubejs:white_taiga_grapejuice', ['snowball'], 'kubejs:eiswein', 'vinery:eiswein');
	fermentingRecipe('kubejs:white_taiga_grapejuice', ['sugar', 'iron_ingot', 'kelp'], 'kubejs:aegis_wine', 'vinery:aegis_wine');
	fermentingRecipe('kubejs:white_jungle_grapejuice', ['arrow'], 'kubejs:villagers_fright', 'vinery:villagers_fright');
	fermentingRecipe('kubejs:white_jungle_grapejuice', ['sugar'], 'kubejs:clark_wine', 'vinery:clark_wine');

	fermentingRecipe('kubejs:warped_grapejuice', ['ghast_tear'], 'kubejs:ghastly_grenache', 'nethervinery:ghastly_grenache');
	fermentingRecipe('kubejs:warped_grapejuice', ['warped_fungus', 'crimson_fungus'], 'kubejs:nether_fizz', 'nethervinery:nether_fizz');

	pouringRecipe('kubejs:red_grapejuice', 'vinery:red_grapejuice');
	pouringRecipe('kubejs:white_grapejuice', 'vinery:white_grapejuice');
	pouringRecipe('kubejs:red_taiga_grapejuice', 'vinery:red_taiga_grapejuice');
	pouringRecipe('kubejs:white_taiga_grapejuice', 'vinery:white_taiga_grapejuice');
	pouringRecipe('kubejs:red_jungle_grapejuice', 'vinery:red_jungle_grapejuice');
	pouringRecipe('kubejs:white_jungle_grapejuice', 'vinery:white_jungle_grapejuice');
	pouringRecipe('kubejs:red_savanna_grapejuice', 'vinery:red_savanna_grapejuice');
	pouringRecipe('kubejs:white_savanna_grapejuice', 'vinery:white_savanna_grapejuice');
	pouringRecipe('kubejs:crimson_grapejuice', 'nethervinery:crimson_grapejuice');
	pouringRecipe('kubejs:warped_grapejuice', 'nethervinery:warped_grapejuice');
	pouringRecipe('kubejs:apple_juice', 'croptopia:apple_juice', 'glass_bottle');

	event.shaped(
		'2x vinery:grapevine_stem',
		[
			'L',
			'L',
			'L'
		],
		{
			L: '#logs'
		}
	).id('adj:grapevine_stem')

	event.shaped(
		'2x nethervinery:obsidian_stem',
		[
			'L',
			'L',
			'L'
		],
		{
			L: 'obsidian'
		}
	).id('adj:obsidian_stem')

	// Ore Berries
	function oreBerryCrushing(inputType, output) {
		let berry = `oreberriesreplanted:${inputType}_oreberry`;
		event.recipes.create.milling([
			Item.of(output, 3),
			Item.of(output, 2).withChance(0.25),
			Item.of(output, 1).withChance(0.4),
			Item.of('ars_nouveau:experience_gem', 1).withChance(0.15)
		], berry).id(`adj:ore_berry/${flattenedID(berry)}`)
	}

	oreBerryCrushing('iron', 'iron_nugget');
	oreBerryCrushing('gold', 'gold_nugget');
	oreBerryCrushing('copper', 'mythicmetals:copper_nugget');
	oreBerryCrushing('tin', 'mythicmetals:tin_nugget');
	oreBerryCrushing('uranium', 'alexscaves:uranium_shard');
	oreBerryCrushing('osmium', 'mythicmetals:osmium_nugget');
	oreBerryCrushing('zinc', 'create:zinc_nugget');
	oreBerryCrushing('silver', 'galosphere:silver_nugget');

	// Croptopia
	event.forEachRecipe([{ input: 'croptopia:cooking_pot' }, { input: 'croptopia:frying_pan' }], recipe => {
		const ingrOriginal = recipe.getOriginalRecipeIngredients();
		let ingr = [];

		ingrOriginal.forEach(i => {
			for (let id of i.getItemIds().toArray()) {
				if (global.blacklistedItems.includes(id) || id === 'minecraft:bowl') continue;
				ingr.push(i);
			}
		})
		if (ingr.length > 6) return;

		const result = recipe.getOriginalRecipeResult();
		let bowlItem;

		switch (result.getId().replace('croptopia:', '').replace('croptopia_additions:', '')) {
			case 'rum_raisin_ice_cream':
			case 'steamed_rice':
			case 'pecan_ice_cream':
			case 'mango_ice_cream':
			case 'vanilla_ice_cream':
			case 'chicken_and_dumplings':
			case 'pad_thai':
			case 'chicken_curry':
			case 'eggplant_curry':
			case 'chicken_and_noodles':
			case 'chicken_and_dumplings':
			case 'tofu_and_dumplings':
			case 'spaghetti_squash':
			case 'chicken_and_noodles':
			case 'pumpkin_soup': {
				bowlItem = 'minecraft:bowl';
				break;
			}
		}

		if (bowlItem) {
			event.recipes.farmersdelight.cooking(ingr, result, 1.5, 400, bowlItem).id(recipe.getId())
		}
		else {
			event.recipes.farmersdelight.cooking(ingr, result, 1.5, 400).id(recipe.getId())
		}
	})

	// Accents sewing recipes for Vanity items
	function sewingRecipe(input, output, outputCount) {
		event.custom({
			type: "accents:sewing",
			ingredient: {
				"item": input
			},
			result: output,
			count: (outputCount) ? outputCount : 1
		}).id(`adj:sewing/${flattenedID(output)}_from_${flattenedID(input)}`)
	}

	event.shaped(
		Item.of('accents:sewing_kit'),
		[
			'LCC',
			'CCN',
			'CN '
		],
		{
			L: 'leather',
			C: 'etcetera:cotton_flower',
			N: 'iron_nugget'
		}
	)

	Color.DYE.forEach(c => {
		sewingRecipe(`minecraft:${c}_wool`, `handcrafted:${c}_cushion`, 2)
		sewingRecipe(`minecraft:${c}_wool`, `handcrafted:${c}_sheet`)
	})

	sewingRecipe('accents:sewing_kit', 'etcetera:white_sweater')
	sewingRecipe('accents:sewing_kit', 'etcetera:white_hat')

	sewingRecipe('handcrafted:light_blue_cushion', 'just_blahaj:blahaj')

	sewingRecipe('minecraft:white_wool', 'aether:white_cape')
	sewingRecipe('minecraft:red_wool', 'aether:red_cape')
	sewingRecipe('minecraft:yellow_wool', 'aether:yellow_cape')
	sewingRecipe('minecraft:pink_wool', 'ancient_aether:pink_cape')
	sewingRecipe('minecraft:blue_wool', 'aether:blue_cape')

	// MC Dungeons Weapons
	function mcdw(type, item) {
		return `mcdw:${type}_${item}`
	}

	event.shaped(
		mcdw('axe', 'anchor'),
		[
			'IBA',
			' SB',
			'Q I'
		],
		{
			I: 'iron_ingot',
			B: 'iron_block',
			S: 'quark:iron_rod',
			Q: 'mythicmetals:aquarium_ingot',
			A: 'mythicmetals:aquarium_block'
		}
	).id(`adj:mcdw/anchor`)
	event.smithing(
		mcdw('axe', 'encrusted_anchor'),
		'mythicmetals:tidesinger_smithing_template',
		mcdw('axe', 'anchor'),
		'mythicmetals:prometheum_ingot'
	)

	event.shaped(
		mcdw('dagger', 'backstabber'),
		[
			'  S',
			' GS',
			'OPG'
		],
		{
			P: 'unusualend:pearlescent_ingot',
			O: 'obsidian',
			G: 'gold_ingot',
			S: 'phantasm:void_crystal_shard'
		}
	).id(`adj:mcdw/backstabber`)

	terraPlateAndGaiaPlate(
		[
			'mythicmetals:hallowed_ingot',
			'diamond',
			'diamond',
			'diamond',
			'botania:rune_air',
			'botania:rune_air',
			'aether:cold_aercloud',
			'aether:cold_aercloud'
		],
		mcdw('dagger', 'resolute_tempest_knife'),
		250000
	)

	event.shaped(
		mcdw('dagger', 'fangs_of_frost'),
		[
			'P',
			'I',
			'L'
		],
		{
			P: 'born_in_chaos_v1:permafrost_shard',
			I: 'iron_ingot',
			L: 'leather'
		}
	).id(`adj:mcdw/fangs_of_frost`)

	gaiaPlateRecipe(
		[
			mcdw('dagger', 'backstabber'),
			'diamond',
			'diamond',
			'alexscaves:pure_darkness',
			'botanicadds:gaiasteel_ingot'
		],
		mcdw('dagger', 'swift_striker'),
		400000
	)

	event.recipes.ars_nouveau.enchanting_apparatus(
		[
			'cataclysm:void_stone',
			'cataclysm:void_stone',
			'cataclysm:void_stone',
			'cataclysm:void_stone',
			'cataclysm:void_stone',
			'mythicmetals:star_platinum'
		],
		'netherite_sword',
		Item.of('mcdw:dagger_void_touched_blade').enchant('kubejs:void_strike', 1)
	).id(`adj:mcdw/void_touched_blade`)

	event.shaped(
		mcdw('glaive', 'venom_glaive'),
		[
			' VP',
			'NSV',
			'SN '
		],
		{
			P: 'mythicmetals:prometheum_ingot',
			S: 'stick',
			N: 'leather',
			V: 'vine'
		}
	).id(`adj:mcdw/venom_glaive`)

	event.shaped(
		mcdw('glaive', 'grave_bane'),
		[
			'  M',
			'NW ',
			'SN '
		],
		{
			M: 'mythicmetals:midas_gold_ingot',
			S: 'stick',
			N: 'mythicmetals:midas_gold_nugget',
			W: 'kubejs:skull_fragment'
		}
	).id(`adj:mcdw/grave_bane`)

	event.shaped(
		mcdw('hammer', 'boneclub'),
		[
			'  B',
			'SB ',
			'RS '
		],
		{
			R: 'born_in_chaos_v1:bone_handle',
			B: 'bone_block',
			S: 'infused_string'
		}
	).id(`adj:mcdw/boneclub`)

	event.smithing(
		mcdw('hammer', 'bone_cudgel'),
		'netherite_upgrade_smithing_template',
		mcdw('hammer', 'boneclub'),
		'netherite_ingot'
	).id(`adj:mcdw/bone_cudgel`)

	// Great Hammers
	event.shaped(
		mcdw('hammer', 'great_hammer'),
		[
			'TBT',
			' S ',
			'LSL'
		],
		{
			T: 'quark:sturdy_stone',
			B: 'mythicmetals:steel_block',
			S: 'stick',
			L: 'leather'
		}
	).id(`adj:mcdw/great_hammer`)

	event.recipes.ars_nouveau.enchanting_apparatus(
		[
			'ars_nouveau:glyph_lightning',
			'lightning_rod',
			'ars_elemental:flashpine_pod',
			'ars_elemental:flashpine_pod',
			'create:brass_block'
		],
		mcdw('hammer', 'great_hammer'),
		mcdw('hammer', 'stormlander'),
		1000
	).id(`stormlander`)

	event.recipes.ars_nouveau.enchanting_apparatus(
		[
			'botanicadds:rune_tp',
			'crying_obsidian',
			'crying_obsidian',
			'crying_obsidian',
			'mythicmetals:star_platinum'
		],
		mcdw('hammer', 'great_hammer'),
		mcdw('hammer', 'gravity'),
		1000
	).id(`adj:mcdw/gravity_hammer`)

	// Sickle and The Last Laugh
	event.shaped(
		mcdw('sickle', 'sickle'),
		[
			' I ',
			'I I',
			'S  '
		],
		{
			I: 'iron_ingot',
			S: 'stick'
		}
	).id(`adj:mcdw/sickle`)

	event.recipes.ars_nouveau.enchanting_apparatus(
		[
			'botania:rune_greed',
			'botania:rune_greed',
			'botania:rune_greed',
			'emerald_block',
			'galosphere:silver_block'
		],
		mcdw('sickle', 'sickle'),
		mcdw('sickle', 'last_laugh_silver')
	).id(`adj:mcdw/last_laugh`)
	ectoplasmTransform(mcdw('sickle', 'last_laugh_silver'), mcdw('sickle', 'last_laugh_gold'));

	// Battlestaff
	event.shaped(
		mcdw('staff', 'battlestaff'),
		[
			'  S',
			' L ',
			'S  '
		],
		{
			S: 'stick',
			L: 'leather'
		}
	).id(`adj:mcdw/battlestaff`)

	// Soul Knives
	event.shaped(
		mcdw('soul_dagger', 'soul_knife'),
		[
			' R ',
			'SIS',
			'LSL'
		],
		{
			R: 'mythicmetals:runite_ingot',
			I: 'mythicmetals:stormyx_ingot',
			L: 'leather',
			S: 'soul_sand'
		}
	).id(`adj:mcdw/soul_knife`)
	event.smithing(
		mcdw('soul_dagger', 'truthseeker'),
		'netherite_upgrade_smithing_template',
		mcdw('soul_dagger', 'soul_knife'),
		'netherite_ingot'
	).id(`adj:mcdw/truthseeker`)
	event.smithing(
		mcdw('soul_dagger', 'eternal_knife'),
		'majruszsdifficulty:enderium_upgrade_smithing_template',
		mcdw('soul_dagger', 'truthseeker'),
		'majruszsdifficulty:enderium_ingot'
	).id(`adj:mcdw/eternal_knife`)

	event.shaped(
		mcdw('scythe', 'skull_scythe'),
		[
			'INS',
			'  C',
			'  T'
		],
		{
			I: 'iron_ingot',
			N: 'netherite_ingot',
			C: mcdw('scythe', 'soul_scythe'),
			T: 'stick',
			S: 'skeleton_skull'
		}
	).id(`adj:mcdw/skull_scythe`)
	event.smithing(
		mcdw('sword', 'sinister'),
		'netherite_upgrade_smithing_template',
		'mythicmetals:adamantite_sword',
		'netherite_ingot'
	).id(`adj:mcdw/sinister_sword`)

	event.shaped(
		mcdw('sword', 'heartstealer'),
		[
			' S ',
			' H ',
			'AIA'
		],
		{
			I: 'iron_sword',
			A: 'mythicmetals:adamantite_ingot',
			H: 'heart_crystals:heart_crystal',
			S: 'mythicmetals:steel_ingot'
		}
	).id(`adj:mcdw/heartstealer`)

	// Bows
	event.shaped(
		mcdw('bow', 'power_bow'),
		[
			'ITS',
			'B S',
			'ITS'
		],
		{
			T: 'stick',
			S: 'string',
			B: 'iron_block',
			I: 'iron_ingot'
		}
	).id(`adj:mcdw/power_bow`)

	event.smithing(
		mcdw('bow', 'elite_power_bow'),
		'mythicmetals:midas_folding_template',
		mcdw('bow', 'power_bow'),
		'mythicmetals:midas_gold_block'
	).id(`adj:mcdw/elite_power_bow`)

	event.shaped(
		mcdw('bow', 'phantom_bow'),
		[
			'EMB',
			'MOS',
			'BSS'
		],
		{
			E: 'emerald',
			M: 'phantom_membrane',
			O: 'bow',
			S: 'ars_nouveau:magebloom_fiber',
			B: 'bone'
		}
	).id(`adj:mcdw/phantom_bow`)

	event.shaped(
		mcdw('bow', 'twisting_vine_bow'),
		[
			' PS',
			'P S',
			' PS'
		],
		{
			P: 'warped_planks',
			S: 'twisting_vines'
		}
	).id(`adj:mcdw/twisting_vine_bow`)
	event.shaped(
		mcdw('bow', 'weeping_vine_bow'),
		[
			' PS',
			'P S',
			' PS'
		],
		{
			P: 'crimson_planks',
			S: 'weeping_vines'
		}
	).id(`adj:mcdw/weeping_vine_bow`)

	terraPlateAndGaiaPlate(
		[
			mcdw('bow', 'elite_power_bow'),
			'botania:rune_wrath',
			'botania:rune_spring',
			'botania:rune_autumn',
			'aether:ambrosium_shard',
			'aether:ambrosium_shard',
			'aether:ambrosium_shard',
			'aether:ambrosium_shard'
		],
		mcdw('bow', 'sabrewing'),
		500000
	)

	event.shaped(
		mcdw('crossbow', 'azure_seeker'),
		[
			' D ',
			'DCD',
			' S '
		],
		{
			D: 'diamond',
			C: 'crossbow',
			S: 'mythicmetals:steel_ingot'
		}
	).id(`adj:mcdw/azure_seeker`)

	event.smithing(
		mcdw('crossbow', 'heavy_crossbow'),
		'netherite_upgrade_smithing_template',
		mcdw('crossbow', 'azure_seeker'),
		'netherite_ingot'
	)

	event.smithing(
		mcdw('crossbow', 'slayer_crossbow'),
		'mythicmetals:unobtainium_smithing_template',
		mcdw('crossbow', 'heavy_crossbow'),
		'mythicmetals:metallurgium_ingot'
	).id(`adj:mcdw/slayer_crossbow`)

	event.recipes.ars_nouveau.enchanting_apparatus(
		[
			'tnt',
			'botania:rune_fire',
			'gunpowder',
			'gunpowder',
			'#sand'
		],
		'crossbow',
		mcdw('crossbow', 'exploding_crossbow')
	).id(`adj:mcdw/exploding_crossbow`)

	event.recipes.ars_nouveau.enchanting_apparatus(
		[
			'botanicadds:rune_tp',
			'botanicadds:rune_tp',
			'chorus_fruit',
			'aether_redux:gravitite_ingot'
		],
		mcdw('crossbow', 'exploding_crossbow'),
		mcdw('crossbow', 'imploding_crossbow')
	).id(`adj:mcdw/imploding_crossbow`)

	event.recipes.ars_nouveau.enchanting_apparatus(
		[
			'botania:rune_fire',
			'botania:rune_summer',
			'fire_charge',
			'mythicmetals:palladium_ingot',
			'mythicmetals:palladium_ingot'
		],
		mcdw('crossbow', 'exploding_crossbow'),
		mcdw('crossbow', 'firebolt_thrower')
	).id(`adj:mcdw/firebolt_thrower`)

	event.recipes.ars_nouveau.imbuement(
		'minecraft:crossbow',
		mcdw('crossbow', 'butterfly_crossbow'),
		2500,
		[
			'naturalist:butterfly',
			'naturalist:butterfly',
			'naturalist:butterfly'
		]
	).id(`adj:mcdw/butterfly_crossbow`)

	// Accessories
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
			'SSS',
			'SPS',
			' S '
		],
		{
			S: 'mythicmetals:steel_ingot',
			P: '#planks'
		}
	).id('adj:heavy_steel_shield')

	workshopRecipe([
		'3x red_wool',
		'slime_ball',
		'2x string',
	], 'terra_curio:shiny_red_balloon')

	workshopRecipe([
		'13x mythicmetals:midas_gold_ingot',
		'iron_ingot',
	], 'terra_curio:lucky_horseshoe')

	bloodInfuserRecipe('terra_curio:sun_stone', 'terra_curio:moon_stone', 35000, 2, 900, 3, 'curio/moon_stone');

	workshopRecipe([
		'2x glass',
		'3x mythicmetals:steel_ingot',
		'spyglass'
	], 'terra_curio:rifle_scope')

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
	).id('adj:cloud_in_a_bottle');

	workshopRecipe([
		'terra_curio:cloud_in_a_bottle',
		'artifacts:whoopee_cushion'
	], 'terra_curio:fart_in_a_jar')

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
		500
	).id('adj:obsidian_rose')

	event.recipes.botania.mana_infusion(
		'terra_curio:paladins_shield',
		'terra_curio:cobalt_shield',
	).mana(500000).id('adj:paladins_shield')

	event.recipes.botania.runic_altar(
		'terra_curio:magma_stone',
		[
			'botania:rune_summer',
			'mythicmetals:palladium_ingot',
			'magma_block',
			'magma_block',
			'magma_block'
		],
		15000
	).id('adj:magma_stone')

	terraPlateAndGaiaPlate(
		[
			'aether:leather_gloves',
			'botania:rune_earth',
			'botania:green_petal',
			'botania:lime_petal'
		],
		'terra_curio:feral_claws',
		100000
	)

	workshopRecipe([
		'aether:diamond_gloves',
		'2x mythicmetals:orichalcum_ingot',
	], 'terra_curio:titan_glove')

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

	inter = Item.of('mythicmetals:steel_boots');
	event.recipes.create.sequenced_assembly(
		'terra_curio:rocket_boots',
		'mythicmetals:steel_boots',
		[
			event.recipes.create.deploying(inter, [inter, Item.of('quark:gunpowder_sack')]),
			event.recipes.create.deploying(inter, [inter, Item.of('iron_ingot')]),
			event.recipes.create.deploying(inter, [inter, Item.of('blaze_powder')]),
		]
	).transitionalItem(inter).loops(3).id('adj:rocket_boots')

	event.recipes.ars_nouveau.enchanting_apparatus(
		[
			'ars_nouveau:source_gem',
			'ars_nouveau:source_gem',
			'ars_nouveau:source_gem',
			'ars_nouveau:source_gem'
		],
		'honeycomb',
		'terra_curio:honey_comb'
	).id('adj:enchanted_comb')

	// Construction Wands
	event.recipes.create.mechanical_crafting(
		'constructionwand:iron_wand',
		[
			' I ',
			'IBI',
			' A ',
			' S ',
			' S '
		],
		{
			I: 'iron_ingot',
			B: 'iron_block',
			S: 'stick',
			A: 'evilcraft:dark_power_gem'
		}
	).id('adj:constructionwands/iron_wand')

	event.recipes.create.mechanical_crafting(
		'constructionwand:diamond_wand',
		[
			' I ',
			'IBI',
			' A ',
			' S ',
			' S '
		],
		{
			I: 'diamond',
			B: 'diamond_block',
			S: 'stick',
			A: 'evilcraft:dark_power_gem'
		}
	).id('adj:constructionwands/diamond_wand')

	event.recipes.summoningrituals.altar('constructionwand:diamond_wand')
		.input(
			'nether_star',
			'botanicadds:gaiasteel_ingot',
			'botanicadds:gaiasteel_ingot',
			'mythicmetals:unobtainium'
		)
		.itemOutput('constructionwand:infinity_wand')
		.recipeTime(toSeconds(25))
		.id('adj:constructionwands/infinity_wand')

	event.recipes.summoningrituals.altar('constructionwand:core_angel')
		.input(
			'botanicadds:gaiasteel_ingot',
			'mythicmetals:unobtainium',
			'botania:rune_gluttony',
		)
		.itemOutput('constructionwand:core_destruction')
		.recipeTime(toSeconds(15))
		.id('adj:constructionwands/core_destruction')

	event.recipes.ars_nouveau.enchanting_apparatus(
		[
			'botania:pixie_dust',
			'botania:pixie_dust',
			'botania:pixie_dust',
			'botania:rune_mana',
			'aether:cold_aercloud',
			'aether:cold_aercloud',
			'aether:cold_aercloud',
			'aether:cold_aercloud'
		],
		'gold_block',
		'constructionwand:core_angel'
	).id('adj:constructionwands/core_angel')

	// Tom's Storage
	event.recipes.create.mechanical_crafting(
		'toms_storage:ts.inventory_connector',
		[
			' R ',
			'PSP',
			'GPG',
			'PSP'
		],
		{
			P: '#planks',
			S: 'create:iron_sheet',
			G: 'rediscovered:gear',
			R: 'create:electron_tube'
		}
	).id('adj:toms_storage/inventory_connector')

	event.recipes.create.mechanical_crafting(
		'toms_storage:ts.storage_terminal',
		[
			'R R',
			'PPP',
			'GDG',
			'PPP'
		],
		{
			P: '#planks',
			D: 'create:display_board',
			G: 'rediscovered:gear',
			R: 'create:electron_tube'
		}
	).id('adj:toms_storage/storage_terminal')

	inter = Item.of('toms_storage:ts.storage_terminal');
	event.recipes.create.sequenced_assembly(
		Item.of('toms_storage:ts.crafting_terminal'),
		'toms_storage:ts.storage_terminal',
		[
			event.recipes.create.deploying(inter, [inter, Item.of('create:precision_mechanism')]),
			event.recipes.create.deploying(inter, [inter, Item.of('crafting_table')]),
			event.recipes.create.deploying(inter, [inter, Item.of('create:brass_sheet')])
		]
	).transitionalItem(inter).loops(2).id('adj:toms_storage/crafting_terminal')

	event.shaped(
		'toms_storage:ts.item_filter',
		[
			' S ',
			'RFR',
			' S '
		],
		{
			S: 'stick',
			R: 'redstone',
			F: 'create:filter'
		}
	).id(`adj:toms_storage/storage_filter`)

	event.shapeless(
		'toms_storage:ts.polymorphic_item_filter',
		[
			'toms_storage:ts.item_filter',
			'comparator'
		],
	).id(`adj:toms_storage/polymorphic_storage_filter`)

	event.shaped(
		'toms_storage:ts.tag_item_filter',
		[
			' S ',
			'RFR',
			' S '
		],
		{
			S: 'stick',
			R: 'redstone',
			F: 'create:attribute_filter'
		}
	).id(`adj:toms_storage/tag_storage_filter`)

	// Create reworks
	const CreateNewRecipes = [
		'wrench',
		/create_connected:copycat_/,
		/create:copycat_/,
		'water_wheel',
		'propeller',
		'chute',
		'basin',
		'millstone',
		'empty_blaze_burner',
		'hand_crank',
		'mechanical_belt',
		'fluid_pipe',
		'mechanical_pump',
		'fluid_tank',
		'steam_engine',
		'track',
		'goggles',
		'depot',
		'encased_chain_drive',
		'gearshift',
		'crushing_wheel',
		'tree_fertilizer'
	]
	CreateNewRecipes.forEach(r => {
		if (r instanceof RegExp || r.includes(':')) {
			event.remove({ output: r })
		}
		else {
			event.remove({ output: `create:${r}` })
		}
	})

	workshopRecipe([
		'2x create:golden_sheet',
		'ars_nouveau:magebloom_fiber',
		'2x #forge:glass'
	], 'create:goggles')

	event.shaped(
		'create:wrench',
		[
			'PPC',
			'IS',
			' S '
		],
		{
			P: 'create:golden_sheet',
			I: 'create:iron_sheet',
			C: 'create:cog',
			S: 'stick'
		}
	).id('adj:wrench')

	event.shaped(
		'create:water_wheel',
		[
			'SSS',
			'SCS',
			'SSS'
		],
		{
			C: 'create:cog',
			S: '#wooden_slabs'
		}
	).id('adj:water_wheel')

	event.shaped(
		'create:propeller',
		[
			' S ',
			'SIS',
			' S '
		],
		{
			I: 'iron_ingot',
			S: 'create:iron_sheet'
		}
	).id('adj:propeller')

	event.shaped(
		'4x create:chute',
		[
			'SHS',
		],
		{
			H: 'hopper',
			S: 'create:iron_sheet'
		}
	).id('adj:chute')

	event.shaped(
		'create:basin',
		[
			'ACA',
			' A '
		],
		{
			C: 'cauldron',
			A: 'create:andesite_alloy'
		}
	).id('adj:basin')

	event.shaped(
		'create:millstone',
		[
			' H ',
			' A ',
			'CSC'
		],
		{
			H: 'hopper',
			A: 'create:andesite_casing',
			C: 'create:cog',
			S: 'smooth_stone'
		}
	).id('adj:millstone')

	event.shaped(
		'create:empty_blaze_burner',
		[
			'BBB',
			'B B',
			'SNS'
		],
		{
			N: 'netherrack',
			B: 'iron_bars',
			S: 'create:iron_sheet'
		}
	).id('adj:empty_blaze_burner')

	event.shaped(
		'create:hand_crank',
		[
			'PPP',
			'  C'
		],
		{
			P: '#planks',
			C: 'cobblestone'
		}
	).id('adj:hand_crank')

	event.shaped(
		'create:mechanical_belt',
		[
			'PPP',
			'PPP'
		],
		{
			P: [
				'dried_kelp',
				'farmersdelight:straw'
			]
		}
	).id('adj:mechanical_belt')

	event.shaped(
		'9x create:mechanical_belt',
		[
			'PPP',
			'PPP'
		],
		{
			P: [
				'dried_kelp_kelp',
				'farmersdelight:straw_bale'
			]
		}
	).id('adj:mechanical_belt_bulk')

	event.shaped(
		'8x create:fluid_pipe',
		[
			'PSP',
			'  ',
			'PSP'
		],
		{
			S: 'create:copper_sheet',
			P: 'copper_ingot'
		}
	).id('adj:fluid_pipe')

	event.shaped(
		'8x create:fluid_pipe',
		[
			'P P',
			'S S',
			'P P'
		],
		{
			S: 'create:copper_sheet',
			P: 'copper_ingot'
		}
	).id('adj:fluid_pipe_vertical')

	event.shapeless(
		'create:mechanical_pump',
		[
			'create:fluid_pipe',
			'create:cog',
			'create:andesite_alloy'
		],
	).id('adj:mechanical_pump')

	event.shaped(
		'create:speedometer',
		[
			' R ',
			'ICI',
			' I '
		],
		{
			R: 'redstone',
			I: 'iron_ingot',
			C: 'create:andesite_casing'
		}
	).id('adj:speedometer')

	event.shaped(
		'create:fluid_tank',
		[
			' S ',
			'GBG',
			' S '
		],
		{
			S: 'create:copper_sheet',
			G: '#c:glass_panes',
			B: 'barrel'
		}
	).id('adj:fluid_tank')

	event.shaped(
		'create:steam_engine',
		[
			' C ',
			'ISI',
			' B '
		],
		{
			B: [
				'copper_block',
				'waxed_copper_block'
			],
			I: 'create:iron_sheet',
			S: 'create:shaft',
			C: 'create:brass_ingot'
		}
	).id('adj:steam_engine')

	event.shaped(
		'create:depot',
		[
			'S',
			'A',
		],
		{
			S: 'stone_slab',
			A: 'create:andesite_casing'
		}
	).id('adj:depot')

	event.shaped(
		'create:encased_chain_drive',
		[
			' S ',
			'CAC',
			' S '
		],
		{
			C: 'chain',
			S: 'create:shaft',
			A: 'create:andesite_casing'
		}
	).id('adj:encased_chain_drive')

	event.shaped(
		'create:gearshift',
		[
			'S',
			'N',
			'A'
		],
		{
			N: 'morered:not_gate',
			S: 'create:shaft',
			A: 'create:andesite_casing'
		}
	).id('adj:gearshift')

	inter = Item.of('create:incomplete_track');
	event.recipes.create.sequenced_assembly(
		'2x create:track',
		'rail',
		[
			event.recipes.create.deploying(inter, [inter, ['create:zinc_nugget', 'iron_nugget']]),
			event.recipes.create.deploying(inter, [inter, ['create:zinc_nugget', 'iron_nugget']]),
			event.recipes.create.pressing(inter, [inter])
		]
	).transitionalItem(inter).id('adj:create_track')

	event.recipes.create.mechanical_crafting(
		'2x create:crushing_wheel',
		[
			' SSS ',
			'SSPSS',
			'SPAPS',
			'SSPSS',
			' SSS ',
		],
		{
			S: '#forge:stone',
			A: 'create:shaft',
			P: '#planks'
		}
	).id('adj:crushing_wheel')

	event.recipes.create.mixing(
		[
			'create:tree_fertilizer',
			Item.of('create:tree_fertilizer').withChance(0.25)
		],
		[
			'bone_meal',
			'supplementaries:ash',
			'#adj:compostable',
			'#adj:compostable',
			'#adj:compostable',
		]
	).id('adj:tree_fertilizer')

	// More logical Copycat Blocks
	// Like BE FR WHY DOES EVERYTHING HAVE TO BOIL DOWN TO A STONECUTTER???
	event.shaped(
		'15x create_connected:copycat_block',
		[
			'INI',
			'NIN',
			'INI'
		],
		{
			I: 'create:zinc_ingot',
			N: 'create:zinc_nugget'
		}
	).id('adj:copycat_block/copycat_block')

	event.stonecutting('2x create_connected:copycat_slab', 'create_connected:copycat_block').id('adj:copycat_block/stonecutting/copycat_slab')
	event.stonecutting('16x create_connected:copycat_board', 'create_connected:copycat_block').id('adj:copycat_block/stonecutting/copycat_board')
	event.stonecutting('6x create:copycat_panel', 'create_connected:copycat_board').id('adj:copycat_block/stonecutting/copycat_panel')
	event.stonecutting('1x create_connected:copycat_stairs', 'create_connected:copycat_block').id('adj:copycat_block/stonecutting/copycat_stairs')
	event.stonecutting('1x create_connected:copycat_fence', 'create_connected:copycat_block').id('adj:copycat_block/stonecutting/copycat_fence')
	event.stonecutting('1x create_connected:copycat_fence_gate', 'create_connected:copycat_block').id('adj:copycat_block/stonecutting/copycat_fence_gate')
	event.stonecutting('1x create_connected:copycat_wall', 'create_connected:copycat_block').id('adj:copycat_block/stonecutting/copycat_wall')
	event.stonecutting('4x create_connected:copycat_vertical_step', 'create_connected:copycat_block').id('adj:copycat_block/stonecutting/copycat_vertical_step')
	event.stonecutting('4x create:copycat_step', 'create_connected:copycat_block').id('adj:copycat_block/stonecutting/copycat_step')
	event.stonecutting('4x create_connected:copycat_beam', 'create_connected:copycat_block').id('adj:copycat_block/stonecutting/copycat_beam')

	event.shaped(
		'1x create_connected:copycat_catwalk',
		[
			'C',
			'C'
		],
		{
			C: 'create_connected:copycat_block',
		}
	).id('adj:copycat_block/copycat_beam')

	event.shaped(
		'create_connected:copycat_box',
		[
			'CC ',
			'C C',
			' CC'
		],
		{
			C: 'create_connected:copycat_board',
		}
	).id('adj:copycat_block/copycat_box')

	event.shaped(
		'create_connected:copycat_catwalk',
		[
			'C C',
			' C '
		],
		{
			C: 'create_connected:copycat_board',
		}
	).id('adj:copycat_block/copycat_catwalk')

	event.shaped(
		'create_connected:copycat_block',
		[
			'CC',
			'CC'
		],
		{
			C: [
				'create_connected:copycat_beam',
				'create:copycat_step',
				'create_connected:copycat_vertical_step'
			],
		}
	).id('adj:copycat_block/copycat_block_from_beams_or_steps')

	event.shaped(
		'6x create_connected:copycat_stairs',
		[
			'  C',
			' CC',
			'CCC'
		],
		{
			C: 'create_connected:copycat_block',
		}
	).id('adj:copycat_block/copycat_stairs')

	event.shaped(
		'8x create_connected:copycat_beam',
		[
			'C',
			'C'
		],
		{
			C: 'create_connected:copycat_block',
		}
	).id('adj:copycat_block/copycat_beam')

	event.shaped(
		'6x create_connected:copycat_wall',
		[
			'CCC',
			'CCC'
		],
		{
			C: 'create_connected:copycat_block',
		}
	).id('adj:copycat_block/copycat_wall')

	event.shaped(
		'8x create_connected:copycat_step',
		[
			'CC'
		],
		{
			C: 'create_connected:copycat_block',
		}
	).id('adj:copycat_block/copycat_step')

	event.shapeless(
		'create_connected:copycat_vertical_step',
		[
			'create:copycat_step'
		]
	).id('adj:copycat_block/copycat_vertical_step_from_normal_step')

	event.shapeless(
		'create_connected:copycat_beam',
		[
			'create_connected:copycat_vertical_step'
		]
	).id('adj:copycat_block/copycat_beam_from_vertical_step')

	event.shapeless(
		'create:copycat_step',
		[
			'create_connected:copycat_beam'
		]
	).id('adj:copycat_block/copycat_step_from_beam')

	event.shaped(
		'6x create_connected:copycat_fence',
		[
			'CSC',
			'CSC'
		],
		{
			C: 'create_connected:copycat_block',
			S: 'stick'
		}
	).id('adj:copycat_block/copycat_fence')

	event.shaped(
		'6x create_connected:copycat_fence_gate',
		[
			'SCS',
			'SCS'
		],
		{
			C: 'create_connected:copycat_block',
			S: 'stick'
		}
	).id('adj:copycat_block/copycat_fence_gate')

	event.shaped(
		'6x create_connected:copycat_slab',
		[
			'CCC'
		],
		{
			C: 'create_connected:copycat_block',
		}
	).id('adj:copycat_block/copycat_slab')

	event.shaped(
		'8x create:copycat_panel',
		[
			'CCC'
		],
		{
			C: 'create_connected:copycat_slab',
		}
	).id('adj:copycat_block/copycat_panel')

	event.shaped(
		'24x create_connected:copycat_board',
		[
			'CCC'
		],
		{
			C: 'create_connected:copycat_slab',
		}
	).id('adj:copycat_block/copycat_board_from_slabs')

	event.shaped(
		'9x create_connected:copycat_board',
		[
			'CCC'
		],
		{
			C: 'create:copycat_panel',
		}
	).id('adj:copycat_block/copycat_board_from_panels')
});
