function mcdw(type, item) {
	return `mcdw:${type}_${item}`
}

ServerEvents.recipes((event) => {

	//////////////////////////////////////////////
	// Taken from item/recipes.js

	/**
	 * Registers a BotanicAdds Gaia Plate recipe
	 *
	 * @param {Internal.InputItem_[]} inputs - List of items or tags (prefix with # for tags)
	 * @param {Internal.OutputItem_} output - The resulting item ID
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
		})
	}

	/** @type {Internal.Block_} */
	const ectoplasm = 'netherexp:ectoplasm';

	//////////////////////////////////////////////

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
	)
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
	)



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
	)

	// event.shaped(
	// 	mcdw('dagger', 'moon'),
	// 	[
	// 		'  I',
	// 		'WII',
	// 		'MW '
	// 	],
	// 	{
	// 		M: 'mythicmetals:midas_gold_ingot',
	// 		I: 'iron_ingot',
	// 		W: 'ars_nouveau:wilden_wing'
	// 	}
	// )

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
		mcdw('dagger', 'void_touched_blade')
	)

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
	)

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
	)

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
	)

	event.smithing(
		mcdw('hammer', 'bone_cudgel'),
		'netherite_upgrade_smithing_template',
		mcdw('hammer', 'boneclub'),
		'netherite_ingot'
	)

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
	)

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
	)

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
	)

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
	)

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
	)
	lycheeItemInBlock(mcdw('sickle', 'last_laugh_silver'), ectoplasm, mcdw('sickle', 'last_laugh_gold'));

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
	)

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
	)
	event.smithing(
		mcdw('soul_dagger', 'truthseeker'),
		'netherite_upgrade_smithing_template',
		mcdw('soul_dagger', 'soul_knife'),
		'netherite_ingot'
	)
	event.smithing(
		mcdw('soul_dagger', 'eternal_knife'),
		'majruszsdifficulty:enderium_upgrade_smithing_template',
		mcdw('soul_dagger', 'truthseeker'),
		'majruszsdifficulty:enderium_ingot'
	)

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
	)
	event.smithing(
		mcdw('sword', 'sinister'),
		'netherite_upgrade_smithing_template',
		'mythicmetals:adamantite_sword',
		'netherite_ingot'
	)

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
	)

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
			B: 'mythicmetals:steel_block',
			I: 'mythicmetals:steel_ingot'
		}
	)

	event.smithing(
		mcdw('bow', 'elite_power_bow'),
		'mythicmetals:midas_folding_template',
		mcdw('bow', 'power_bow'),
		'mythicmetals:midas_gold_block'
	)

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
			S: 'botania:mana_string',
			B: 'bone'
		}
	)

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
	)
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
	)

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
	)

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
	)

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
	)

	event.recipes.ars_nouveau.enchanting_apparatus(
		[
			'botanicadds:rune_tp',
			'botanicadds:rune_tp',
			'chorus_fruit',
			'aether_redux:gravitite_ingot'
		],
		mcdw('crossbow', 'exploding_crossbow'),
		mcdw('crossbow', 'imploding_crossbow')
	)

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
	)

	event.recipes.ars_nouveau.imbuement(
		'minecraft:crossbow',
		mcdw('crossbow', 'butterfly_crossbow'),
		2500,
		[
			'naturalist:butterfly',
			'naturalist:butterfly',
			'naturalist:butterfly'
		]
	)


})

LootJS.modifiers(event => {
	event.addEntityLootModifier('minecraft:witch')
		.pool((pool) => {
			pool.rolls(1);
			pool.randomChanceWithLooting(0.04, 0.02)
				.addLoot(LootEntry.of(mcdw('glaive', 'cackling_broom')))
		});

	event.addLootTableModifier('chests/end_city_treasure')
		.pool((pool) => {
			pool.rolls(1).randomChance(0.15);
			pool.addLoot(LootEntry.of(mcdw('sword', 'obsidian_claymore')))
		})
		.pool((pool) => {
			pool.rolls(1).randomChance(0.15);
			pool.addLoot(LootEntry.of(mcdw('bow', 'call_of_the_void')))
		})
		.pool((pool) => {
			pool.rolls(1).randomChance(0.15);
			pool.addLoot(LootEntry.of(mcdw('crossbow', 'veiled_crossbow')))
		})

	event.addLootTableModifier('aquamirae:chests/frozen_chest')
		.pool((pool) => {
			pool.rolls(1).randomChance(1);
			pool.addLoot(LootEntry.of(mcdw('bow', 'winters_touch')))
		})
})

EntityEvents.hurt(event => {
	const player = event.getSource().getPlayer();
	if (player) {
		const mainhand = player.getMainHandItem().getId();
		if (mainhand.includes('mcdw:soul_dagger')) {
			player.addEffect(new $MobEffectInstance('ars_nouveau:mana_regen', 2 * 20, (mainhand == mcdw('soul_dagger', 'eternal_knife') ? 1 : 0)));
		}
	}
})