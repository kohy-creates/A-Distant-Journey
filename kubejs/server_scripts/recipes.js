ServerEvents.recipes((event) => {

	/** @type {InputItem_}*/
	const disabledItemRecipes = [
		global.rediscoveredFurniture,
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
	]
	removeRecipeByID.forEach(recipe => {
		event.remove({ id: recipe })
	})

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
	)

	event.replaceInput(
		{ input: 'minecraft:stick' },
		'minecraft:stick',
		'#c:rods/wooden'
	)

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
	)

	// Large Soul Candle
	event.shaped(
		Item.of('netherexp:soul_candle'),
		[
			'C',
			'S'
		],
		{
			C: 'buzzier_bees:soul_candle',
			S: '#minecraft:soul_fire_base_blocks'
		}
	)
	event.shapeless(
		Item.of('netherexp:soul_skeleton_skull_candle'),
		[
			'buzzier_bees:soul_candle',
			'skeleton_skull'
		]
	)

	event.recipes.botania.mana_infusion('naturescompass:naturescompass', 'minecraft:compass').mana(100000)

	/**
	 * Registers a BotanicAdds Gaia Plate recipe
	 *
	 * @param {Internal.RecipesEventJS} event
	 * @param {InputItem_[]} inputs - List of items or tags (prefix with # for tags)
	 * @param {OutputItem_} output - The resulting item ID
	 * @param {number} mana - Mana cost
	 */
	function gaiaPlateRecipe(inputs, output, mana) {
		const ingredients = inputs.map(id =>
			id.startsWith("#") ? { tag: id.slice(1) } : { item: id }
		);

		event.custom({
			type: "botanicadds:gaia_plate",
			ingredients: ingredients,
			result: { item: output },
			mana: mana
		});
	}

	function terraPlateAndGaiaPlate(inputs, output, mana) {
		event.recipes.botania.terra_plate(output, inputs).mana(mana)
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

	event.remove({ id: 'minecraft:netherite_ingot' })
	event.remove({ id: 'alloy_forgery:netherite_from_gold_and_scrap' })
	event.remove({ id: 'experienceobelisk:metamorpher/netherite_ingot_metamorphosis' })
	event.custom({
		"type": "alloy_forgery:forging",
		"inputs": [
			{
				"item": "minecraft:gold_ingot",
				"count": 4
			},
			{
				"item": "minecraft:netherite_scrap",
				"count": 4
			}
		],
		"output": {
			"id": "minecraft:netherite_ingot",
			"count": 1
		},
		'overrides': {
			'3+': {
				'id': 'minecraft:netherite_ingot',
				'count': 2
			}
		},
		"min_forge_tier": 2,
		"fuel_per_tick": 40
	})
	event.custom(
		{
			'type': 'alloy_forgery:forging',
			'inputs': [
				{
					'tag': 'c:copper_ingots'
				},
				{
					'tag': 'c:copper_ingots'
				},
				{
					'tag': 'c:copper_ingots'
				},
				{
					'tag': 'c:gold_ingots'
				},
				{
					'tag': 'c:gold_ingots'
				},
				{
					'tag': 'c:gold_ingots'
				}
			],
			'output': {
				'id': 'additionaladditions:rose_gold_alloy',
				'count': 1
			},
			'overrides': {
				'2+': {
					'id': 'additionaladditions:rose_gold_alloy',
					'count': 2
				}
			},
			'min_forge_tier': 1,
			'fuel_per_tick': 5
		}
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
		)
	};
	ironArmorRecipe(['SIS', 'I I'], 'minecraft:iron_helmet');
	ironArmorRecipe(['I I', 'SIS', 'SIS'], 'minecraft:iron_chestplate');
	ironArmorRecipe(['SIS', 'I I', 'I I'], 'minecraft:iron_leggings');
	ironArmorRecipe(['I I', 'S S'], 'minecraft:iron_boots');

	function manasteelArmorRecipe(shape, outputItem) {
		event.remove({ output: outputItem });
		event.shaped(
			Item.of(outputItem),
			shape,
			{
				I: 'botania:manasteel_ingot',
				S: 'kubejs:manasteel_sheet'
			}
		)
	};
	manasteelArmorRecipe(['SIS', 'I I'], 'botania:manasteel_helmet');
	manasteelArmorRecipe(['I I', 'SIS', 'SIS'], 'botania:manasteel_chestplate');
	manasteelArmorRecipe(['SIS', 'I I', 'I I'], 'botania:manasteel_leggings');
	manasteelArmorRecipe(['I I', 'S S'], 'botania:manasteel_boots');

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
	})
	event.recipes.botania.mana_infusion('kubejs:manasteel_sheet', 'create:iron_sheet').mana(3000)

	function diamondArmorRecipe(shape, inputItem, outputItem) {
		event.remove({ output: outputItem });
		event.shaped(
			Item.of(outputItem),
			shape,
			{
				D: 'diamond',
				R: inputItem
			}
		)
	};
	diamondArmorRecipe(['DDD', 'DRD'], 'additionaladditions:rose_gold_helmet', 'minecraft:diamond_helmet');
	diamondArmorRecipe(['DRD', 'DDD', 'DDD'], 'additionaladditions:rose_gold_chestplate', 'minecraft:diamond_chestplate');
	diamondArmorRecipe(['DDD', 'DRD', 'D D'], 'additionaladditions:rose_gold_leggings', 'minecraft:diamond_leggings');
	diamondArmorRecipe(['DRD', 'D D'], 'additionaladditions:rose_gold_boots', 'minecraft:diamond_boots');

	// Furnaces require a piece of Coal
	/**
	 * @param {InputItem_} material 
	 * @param {OutputItem_} outputItem 
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
		)
	};
	furnaceRecipe('minecraft:cobblestone', 'minecraft:furnace')
	furnaceRecipe('minecraft:deepslate', 'quark:deepslate_furnace')
	furnaceRecipe('minecraft:blackstone', 'quark:blackstone_furnace')

	// Cheaper templates
	const otherTemplates = [
		'additionaladditions:rose_gold_upgrade',
		'born_in_chaos_v1:dark_upgrade',
		'quark:smithing_template_rune'
	]
	const consumer = (recipe) => {
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
		]);
	}
	event.forEachRecipe({ type: 'minecraft:crafting_shaped' }, consumer)

	/**
	 * @param {OutputItem_} outputItem 
	 * @param {InputItem_} input1 
	 * @param {InputItem_} input2 
	 * @param {InputItem_} center 
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
		);
	};
	templateRecipe('born_in_chaos_v1:dark_upgrade', 'born_in_chaos_v1:dark_metal_nugget', 'born_in_chaos_v1:dark_metal_ingot', 'born_in_chaos_v1:seedof_chaos');
	templateRecipe('additionaladditions:rose_gold_upgrade', 'iron_ingot', 'cobblestone', 'additionaladditions:rose_gold_alloy');
	templateRecipe('galosphere:silver_upgrade_smithing_template', 'galosphere:silver_ingot', '#minecraft:planks', 'iron_ingot');
	templateRecipe('mythicmetals:osmium_chainmail_smithing_template', 'mythicmetals:osmium_nugget', 'andesite', 'mythicmetals:osmium_ingot')

	// Pottery Sherd copying
	Item.list.toArray().forEach(item => {
		if (item.id.includes('_sherd')) {
			event.shapeless(
				Item.of(item, 2),
				[
					item,
					'brick',
					'brick'
				]
			)
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
		1000
	);

	// Crying Obsidian
	event.recipes.ars_nouveau.imbuement(
		'minecraft:obsidian',
		'minecraft:crying_obsidian',
		500,
		[]
	)

	event.shaped(
		Item.of('minecraft:bundle'),
		[
			'S',
			'L'
		],
		{
			S: 'minecraft:string',
			L: 'minecraft:leather'
		}
	)

	// Clocks can be replaced with Platinum Watches
	event.replaceInput(
		{ input: 'minecraft:clock' },
		'minecraft:clock',
		'#adj:clock'
	)

	// event.recipes.botania.terra_plate('botania:ender_air_bottle', [
	// 	'ender_pearl',
	// 	'glass_bottle'
	// ], 10000);

	// Lychee
	// Item in block
	/**
	 * @param {InputItem_} item 
	 * @param {Internal.Block_} block 
	 * @param {OutputItem_} output 
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
		})
	}

	/** @type {Internal.Block_} */
	const ectoplasm = 'netherexp:ectoplasm';
	lycheeItemInBlock('minecraft:magma_block', ectoplasm, 'netherexp:soul_magma_block');
	lycheeItemInBlock('minecraft:soul_sand', ectoplasm, 'netherexp:ecto_soul_sand');
	lycheeItemInBlock('minecraft:blackstone', ectoplasm, 'netherexp:soul_slate');
	lycheeItemInBlock('minecraft:torchflower', ectoplasm, 'netherexp:soul_torchflower');
	lycheeItemInBlock('minecraft:coal', ectoplasm, 'netherexp:fossil_fuel');
	lycheeItemInBlock('minecraft:rib_armor_trim_smithing_template', ectoplasm, 'netherexp:valor_armor_trim_smithing_template');
	lycheeItemInBlock('minecraft:shroomlight', ectoplasm, 'netherexp:shroomnight');

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
		});
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
	})

	event.custom({
		'type': 'lychee:block_interacting',
		'post': [
			{
				'type': 'drop_item',
				'contextual': [
					{
						'type': 'execute',
						'command': 'playsound minecraft:block.amethyst_cluster.break block @a[distance=0..] ~ ~ ~ 1 1.65',
						'hide': true
					},
					{
						'type': 'execute',
						'command': 'particle minecraft:item amethyst_shard ~ ~ ~ 0.05 0.05 0.05 0.05 12 force',
						'hide': true
					},
					{
						'type': 'chance',
						'chance': 0.25
					}
				],
				'item': 'spelunker:amethyst_dust'
			}
		],
		'item_in': {
			'item': 'minecraft:amethyst_shard'
		},
		'block_in': {
			'tag': 'adj:stone'
		}
	})

	event.recipes.create.crushing(
		[Item.of('spelunker:amethyst_dust')], 'amethyst_shard', 20
	)

	event.custom({
		'type': 'lychee:block_interacting',
		'contextual': [
			{
				'type': 'location',
				'predicate': {
					'biome': 'minecraft:warped_forest'
				}
			}
		],
		'post': [
			{
				'type': 'drop_item',
				'item': 'botania:ender_air_bottle'
			},
			{
				'type': 'execute',
				'command': 'playsound minecraft:item.bottle.fill_dragonbreath neutral @a[distance=0..] ~ ~ ~ 0.75 1',
				'hide': true
			}
		],
		'item_in': {
			'item': 'minecraft:glass_bottle'
		},
		'block_in': '*'
	})

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
	)

	// Weapons
	event.shaped(
		Item.of('botania:star_sword'),
		[
			' S ',
			'GSG',
			' T '
		],
		{
			S: 'mythicmetals:star_platinum',
			T: 'botania:terra_sword',
			G: 'botanicadds:gaiasteel_ingot'
		}
	);

	event.shaped(
		Item.of('botania:thunder_sword'),
		[
			' S ',
			'GSG',
			' T '
		],
		{
			S: 'mythicmetals:stormyx_ingot',
			T: 'botania:terra_sword',
			G: 'botanicadds:gaiasteel_ingot'
		}
	)

	event.custom({
		'type': 'sortilege:cauldron_brewing',
		'input': {
			'item': 'minecraft:iron_ingot'
		},
		'output': 'kubejs:endurance'
	})

	// Food can only be cooked in a Smoker and a Campfire
	event.remove({
		'type': 'smelting', 'output': [
			'baked_potato',
			/\:baked\_/,
			/boiled/,
			'#forge:foods/meat/cooked',
			/cooked_/,
			'#alexscaves:gelatins',
			'bread',
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
	)

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
	)
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
	)

	// Unify ropes
	event.replaceInput(
		{ output: 'farmersdelight:rope' },
		'farmersdelight:rope',
		'supplementaries:rope'
	)
	event.replaceOutput(
		{ output: 'farmersdelight:rope' },
		'farmersdelight:rope',
		'supplementaries:rope'
	)
	event.shaped(
		Item.of('farmersdelight:safety_net'),
		[
			'RR',
			'RR'
		],
		{
			R: 'supplementaries:rope'
		}
	)
	// Unify Silver
	event.remove({ id: 'alloy_forgery:compat/silver_ingot_from_raw_ores' })
	event.custom({
		"fabric:load_conditions": [
			{
				"condition": "fabric:item_tags_populated",
				"values": [
					"c:raw_silver_ores",
					"c:silver_ingots"
				]
			}
		],
		"type": "alloy_forgery:forging",
		"inputs": [
			{
				"tag": "c:raw_silver_ores",
				"count": 2
			}
		],
		"output": {
			"priority": [
				"galosphere:silver_ingot"
			],
			"default": "c:silver_ingots",
			"count": 3
		},
		"overrides": {
			"2+": {
				"count": 4
			}
		},
		"min_forge_tier": 1,
		"fuel_per_tick": 5
	})
	event.remove({ id: 'alloy_forgery:compat/silver_ingot_from_ores' })
	event.custom({
		"fabric:load_conditions": [
			{
				"condition": "fabric:item_tags_populated",
				"values": [
					"c:silver_ores",
					"c:silver_ingots"
				]
			}
		],
		"type": "alloy_forgery:forging",
		"inputs": [
			{
				"tag": "c:silver_ores"
			}
		],
		"output": {
			"priority": [
				"galosphere:silver_ingot"
			],
			"default": "c:silver_ingots",
			"count": 2
		},
		"overrides": {
			"2": {
				"count": 3
			},
			"3+": {
				"count": 4
			}
		},
		"min_forge_tier": 1,
		"fuel_per_tick": 5
	})
	event.remove({ id: 'alloy_forgery:silver_blocks' })
	event.custom({
		"type": "alloy_forgery:forging",
		"fabric:load_conditions": [
			{
				"condition": "fabric:tags_populated",
				"values": [
					"c:silver_blocks",
					"c:raw_silver_blocks"
				]
			}
		],
		"fuel_per_tick": 45,
		"inputs": [
			{
				"count": 2,
				"tag": "c:raw_silver_blocks"
			}
		],
		"min_forge_tier": 1,
		"output": {
			"count": 3,
			"default": "c:silver_blocks",
			"priority": [
				"galosphere:silver_block"
			]
		},
		"overrides": {
			"2+": {
				"count": 4
			}
		}
	})
	// Unify Wheat Dough
	event.remove({ id: 'create:smoking/bread' })
	event.replaceOutput({ output: 'farmersdelight:wheat_dough' },
		'farmersdelight:wheat_dough',
		'create:dough'
	)
	event.replaceInput({ input: 'farmersdelight:wheat_dough' },
		'farmersdelight:wheat_dough',
		'create:dough'
	)
	event.replaceInput({ input: '#forge:dough/wheat' },
		'#forge:dough/wheat',
		'create:dough'
	)
	// Remove unused MythicMetals recipes
	event.remove({ input: /manganese/ });
	event.remove({ input: /quadrillum/ });

	// Harder Bread
	event.remove({ id: 'minecraft:bread' })
	event.remove({ id: 'quark:tweaks/crafting/utility/bent/bread' })
	event.remove({ type: 'farmersdelight:dough' })
	event.replaceInput({ output: '#forge:dough' },
		'wheat',
		'create:wheat_flour'
	)
	event.shapeless(
		Item.of('create:dough', 3),
		[
			'create:wheat_flour',
			'create:wheat_flour',
			'create:wheat_flour',
			'#forge:eggs'
		]
	)

	// Map stuff
	event.remove({ type: 'crafting_special_mapextending' })
	event.remove({ type: 'crafting_special_mapcloning' })
	// Readd recipe for the Slice Map but using the Depth Meter the modpack uses
	event.shapeless(
		Item.of('supplementaries:slice_map'),
		[
			Item.of('map'),
			Item.of('additionaladditions:depth_meter')
		]
	)
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
	)

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

	event.shapeless(
		'waystones:warp_dust',
		[
			Item.of('wormhole_artifact:ender_nacre'),
			Item.of('spelunker:amethyst_dust')
		]
	)
	event.recipes.ars_nouveau.enchanting_apparatus(
		[
			'waystones:warp_dust',
			'waystones:warp_dust',
			'waystones:warp_dust',
			'waystones:warp_dust',
			'ender_pearl',
			'ender_pearl',
			'ender_pearl',
			'ender_pearl'
		],
		'aether:zanite_gemstone',
		'waystones:warp_stone',
		7000
	);
	function waystoneRecipe(waystone, material) {
		event.recipes.create.mechanical_crafting(
			waystone,
			[
				'BBBBB',
				'BOAOB',
				' BOB ',
				' BWB ',
				' BOB ',
				'BOAOB',
				'BBBBB'
			],
			{
				O: 'obsidian',
				W: 'waystones:warp_stone',
				A: '#mythicmetals:adamantite_nuggets',
				B: material
			}
		)
	}
	waystoneRecipe('waystones:waystone', 'stone_bricks');
	waystoneRecipe('waystones:sandy_waystone', 'sandstone');
	waystoneRecipe('waystones:mossy_waystone', 'mossy_cobblestone');
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
	);
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
	);
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
	)

	event.forEachRecipe({ type: 'minecraft:crafting_shaped', mod: 'constructionwand' }, (recipe) => {
		const output = recipe.getOriginalRecipeResult();
		const ingredients = recipe.getOriginalRecipeIngredients();

		event.remove({ id: recipe.getId() });
		if (output.id.toString().includes('core')) {
			event.recipes.ars_nouveau.enchanting_apparatus(
				[
					// ingredients[0],
					ingredients[1],
					ingredients[2],
					ingredients[3],
					ingredients[5],
					ingredients[6],
					ingredients[7],
					// ingredients[8]
				],
				ingredients[4],
				output
			)
		}
		else {
			event.recipes.ars_nouveau.enchanting_apparatus(
				[
					ingredients[2],
					ingredients[2],
					ingredients[2],
					'ars_nouveau:source_gem_block',
					'ars_nouveau:source_gem_block'
				],
				'stick',
				output
			)
		}
	})

	// Better rail crafting
	event.forEachRecipe({ type: 'crafting_shaped', output: [/rail/, /create_hypertube\:/] }, (recipe) => {
		const original = recipe.getOriginalRecipeResult();
		if (original.id == 'botania:ghost_rail') return;
		const ingredients = recipe.getOriginalRecipeIngredients()
		event.remove({ id: recipe.getMod() + ':' + recipe.getPath() });
		// console.log(original)
		// console.log(recipe.getPath())
		// recipe.replaceOutput(original, Item.of(original, original.count * 2));
		event.shaped(
			Item.of(original, original.count * 2),
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
		)
	})

	event.remove({ id: 'netherexp:nether_quartz_from_quartz_block' })

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
		)
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
				R: 'redstone_dust'
			}
		)
	}
	gearRecipe(2, 'iron_nugget');

	event.remove({ id: 'create:mixing/brass_ingot' })
	event.custom(
		{
			'type': 'alloy_forgery:forging',
			'inputs': [
				{
					'tag': 'c:copper_ingots'
				},
				{
					'item': 'create:zinc_ingot'
				}
			],
			'output': {
				'id': 'create:brass_ingot',
				'count': 2
			},
			'overrides': {
				'3+': {
					'id': 'create:brass_ingot',
					'count': 3
				}
			},
			'min_forge_tier': 1,
			'fuel_per_tick': 5
		}
	)
	event.custom(
		{
			'type': 'alloy_forgery:forging',
			'inputs': [
				{
					'item': 'minecraft:raw_copper'
				},
				{
					'item': 'create:raw_zinc'
				}
			],
			'output': {
				'id': 'create:brass_ingot',
				'count': 2
			},
			'overrides': {
				'3+': {
					'id': 'create:brass_ingot',
					'count': 3
				}
			},
			'min_forge_tier': 1,
			'fuel_per_tick': 5
		}
	)
	event.custom(
		{
			'type': 'alloy_forgery:forging',
			'inputs': [
				{
					'tag': 'c:raw_copper_blocks'
				},
				{
					'item': 'create:raw_zinc_block'
				}
			],
			'output': {
				'id': 'create:brass_block',
				'count': 2
			},
			'overrides': {
				'3+': {
					'id': 'create:brass_block',
					'count': 3
				}
			},
			'min_forge_tier': 2,
			'fuel_per_tick': 5
		}
	)
	event.custom(
		{
			'type': 'alloy_forgery:forging',
			'inputs': [
				{
					'tag': 'c:raw_copper_blocks'
				},
				{
					'item': 'create:raw_zinc_block'
				}
			],
			'output': {
				'id': 'create:brass_block',
				'count': 2
			},
			'overrides': {
				'3+': {
					'id': 'create:brass_block',
					'count': 3
				}
			},
			'min_forge_tier': 2,
			'fuel_per_tick': 45
		}
	)
	event.custom(
		{
			'type': 'alloy_forgery:forging',
			'inputs': [
				{
					'tag': 'c:copper_blocks'
				},
				{
					'item': 'create:zinc_block'
				}
			],
			'output': {
				'id': 'create:brass_block',
				'count': 2
			},
			'overrides': {
				'3+': {
					'id': 'create:brass_block',
					'count': 3
				}
			},
			'min_forge_tier': 2,
			'fuel_per_tick': 45
		}
	)

	event.remove({ id: 'minecraft:ender_eye' });
	event.remove({ id: 'netherdepthsupgrade:ender_eye' });
	event.recipes.ars_nouveau.imbuement(
		'ender_pearl',
		'ender_eye',
		1000,
		[
			'blaze_powder',
			'blaze_powder',
			'blaze_powder'
		]
	)

	event.replaceInput({ input: 'supplementaries:cannon' },
		'supplementaries:cannon',
		'alekiships:cannon'
	)

	event.replaceInput({ input: 'minecraft:popped_chorus_fruit', type: 'ars_nouveau:enchanting_apparatus' },
		"popped_chorus_fruit",
		"waystones:warp_dust"
	)

	event.replaceInput({ input: '#c:ender_pearls' },
		'#c:ender_pearls',
		'ender_pearl'
	)

	// event.shaped(
	// 	Item.of('rediscovered:ruby_eye'),
	// 	[
	// 		' R ',
	// 		'RER',
	// 		' R '
	// 	],
	// 	{
	// 		R: 'rediscovered:ruby',
	// 		E: 'ender_eye'
	// 	}
	// )

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
	)

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
		)
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
	)

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
	)

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
		)
	}
	casingRecipe('born_in_chaos_v1:dark_metal_ingot', 'mythicmetals:adamantite_ingot', 'adj:adamantite_forge_casing')
	casingRecipe('purpur_block', 'end_stone_bricks', 'adj:ender_forge_casing')

	event.shapeless(
		Item.of('brown_dye', 2),
		[
			'blue_dye',
			'orange_dye'
		]
	)
	event.shapeless(
		Item.of('green_dye', 2),
		[
			'blue_dye',
			'yellow_dye'
		]
	)

	event.replaceInput({ output: 'quark:deepslate_furnace' },
		'deepslate',
		'cobbled_deepslate'
	)

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
		)
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
	)

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
			}
		],
		"result": {
			"item": "structure_gel:building_tool"
		}
	}
	)

	const architectsPrism = [
		'structure_gel:building_tool'
	]
	event.recipes.ars_nouveau.imbuement(
		'rediscovered:rotational_converter',
		'create:creative_motor',
		100,
		architectsPrism
	)
	event.recipes.ars_nouveau.imbuement(
		'create:fluid_tank',
		'create:creative_fluid_tank',
		100,
		architectsPrism
	)
	event.recipes.ars_nouveau.imbuement(
		'create:blaze_cake',
		'create:creative_blaze_cake',
		100,
		architectsPrism
	)
	event.recipes.ars_nouveau.imbuement(
		'ars_nouveau:archmage_spell_book',
		'ars_nouveau:creative_spell_book',
		100,
		architectsPrism
	)
	event.recipes.ars_nouveau.imbuement(
		'botanicadds:dreaming_pool',
		'botania:creative_pool',
		100,
		architectsPrism
	)
	event.recipes.ars_nouveau.imbuement(
		'botania:corporea_spark_master',
		'botania:corporea_spark_creative',
		100,
		architectsPrism
	)
	event.recipes.ars_nouveau.imbuement(
		'ars_nouveau:source_jar',
		'ars_nouveau:creative_source_jar',
		100,
		architectsPrism
	)
	function giantPlant(material, type) {
		event.recipes.ars_nouveau.imbuement(
			material,
			'moresnifferflowers:giant_' + (type ? type : material),
			100,
			architectsPrism
		)
	}
	giantPlant('hay_block', 'wheat');
	giantPlant('carrot');
	giantPlant('potato');
	giantPlant('beetroot');
	giantPlant('nether_wart_block', 'netherwart');

	// Ars Nouveau spell books
	event.remove({ type: 'ars_nouveau:book_upgrade' })
	event.shaped(
		Item.of('ars_nouveau:novice_spell_book'),
		[
			' S ',
			'SBS',
			' S '
		],
		{
			S: Item.of('ars_nouveau:source_gem_block'),
			B: Item.of('writable_book')
		}
	)
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
	})
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
	})

	// Eyes
	event.custom({
		'type': 'botanicadds:gaia_plate',
		'ingredients': [
			{
				'item': 'botanicadds:gaiasteel_block'
			},
			{
				'item': 'botania:terrasteel_block'
			},
			{
				'item': 'botania:dragonstone_block'
			},
			{
				'item': 'botania:dragonstone_block'
			},
			{
				'item': 'botania:dragonstone_block'
			},
			{
				'item': 'botania:dragonstone_block'
			},
			{
				'item': 'ender_eye'
			},
			{
				'item': 'botania:rune_spring'
			},
			{
				'item': 'botania:rune_summer'
			},
			{
				'item': 'botania:rune_autumn'
			},
			{
				'item': 'botania:rune_winter'
			}
		],
		'result': {
			'item': 'kubejs:eye_of_verdant_bloom'
		},
		'mana': 2000000
	})

	const inter = Item.of('minecraft:ender_eye');
	event.recipes.create.sequenced_assembly(
		Item.of('kubejs:eye_of_ethercraft'),
		'ender_eye',
		[
			event.recipes.create.deploying(inter, [inter, Item.of('create:precision_mechanism')]),
			event.recipes.create.filling(inter, [inter, Fluid.lava()]),
			event.recipes.create.deploying(inter, [inter, Item.of('ars_nouveau:source_gem_block')]),
			event.recipes.create.deploying(inter, [inter, Item.of('create:large_cogwheel')]),
			event.recipes.create.deploying(inter, [inter, Item.of('create:brass_block')]),
			event.recipes.create.deploying(inter, [inter, Item.of('create:cogwheel')]),
			event.recipes.create.filling(inter, [inter, Fluid.of('the_bumblezone:royal_jelly_fluid_still', 1000)]),
		]
	).transitionalItem(inter).loops(12)

	event.shaped(
		Item.of('mythicmetals:durasteel_engine'),
		[
			'IHI',
			'SBS',
			'III'
		],
		{
			I: Item.of('mythicmetals:steel_ingot'),
			H: Item.of('hopper'),
			S: Item.of('gunpowder'),
			B: Item.of('mythicmetals:steel_block'),
		}
	)

	const cookingTimeOverrides = {
		'artifacts:eternal_steak': 120, // in seconds btw
		'born_in_chaos_v1:smoked_monster_flesh': 15,
		'born_in_chaos_v1:smoked_fish': 10,
		'alexscaves:cooked_dinosaur_chop': 25,
	}
	function overrideCooking(type, recipe) {
		const output = recipe.getOriginalRecipeResult();
		const input = recipe.getOriginalRecipeIngredients();

		const id = output.getId();

		const JSON = recipe.json;
		const time = (cookingTimeOverrides[id]) ? (cookingTimeOverrides[id] * 20 * ((type == 'campfire') ? 6 : 1)) : JSON.get('cookingtime') * 2;
		const exp = JSON.get('experience');

		event.remove({ id: recipe.getId() });
		if (type == 'smoking') {
			event.smoking(output, input, exp * 2, time);
		}
		else if (type == 'campfire') {
			event.campfireCooking(output, input, exp, time);
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
	 * @param {OutputItem_} output 
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
		)
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

	// Harder Celestium and Metallurgium
	event.custom({
		"type": "alloy_forgery:forging",
		"inputs": [
			{
				"item": "mythicmetals:star_platinum"
			},
			{
				"item": "mythicmetals:carmot_ingot"
			},
			{
				"item": "botania:elementium_ingot"
			},
			{
				"item": "aether_redux:gravitite_ingot"
			},
			{
				"item": "unusualend:pearlescent_ingot"
			},
			{
				"item": "mythicmetals:unobtainium"
			}
		],
		"output": {
			"id": "mythicmetals:celestium_ingot",
			"count": 1
		},
		"min_forge_tier": 3,
		"fuel_per_tick": 50
	})

	event.custom({
		"type": "alloy_forgery:forging",
		"inputs": [
			{
				"item": "mythicmetals:hallowed_ingot"
			},
			{
				"item": "mythicmetals:palladium_ingot"
			},
			{
				"item": "mythicmetals:kyber_ingot"
			},
			{
				"item": "botania:terrasteel_ingot"
			},
			{
				"item": "born_in_chaos_v1:dark_metal_ingot"
			},
			{
				"item": "mythicmetals:unobtainium"
			}
		],
		"output": {
			"id": "mythicmetals:metallurgium_ingot",
			"count": 1
		},
		"min_forge_tier": 3,
		"fuel_per_tick": 50
	})
});
