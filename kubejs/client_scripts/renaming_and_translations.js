ClientEvents.lang('en_us', event => {

	const extraTranslations = {
		'rarity.alexscaves:demonic.name': 'Demonic',
		'rarity.alexscaves:sweet.name': 'Sweet',
		'rarity.alexscaves:nuclear.name': 'Nuclear',
		'rarity.alexscaves:rainbow.name': 'Special',
		'rarity.integrated_stronghold:antique.name': 'Antique',
		'rarity.artifact.name': 'Artifact',
		'rarity.botanicadditionsgaiasteel.name': 'Gaiasteel',

		'effect.mutantmonsters.chemical_x.description': 'Causes certain mobs to mutate into their way stronger variants; has no effect on players.',
		'effect.adjcore.cozy_campfire.description': 'So warm, so cozy! Slowly regenerates lost life',

		'enchantment.minecraft.bane_of_arthropods': 'Lurkers\'s Bane',

		'potion.potency.6': 'VII',
		'potion.potency.7': 'VIII',
		'potion.potency.8': 'IX',
		'potion.potency.9': 'X',

		'biome.clifftree.bog': 'Bog',
		'biome.clifftree.caves': 'Caves',
		'biome.clifftree.cold_caves': 'Cold Caves',
		'biome.clifftree.cold_river': 'Cold River',
		'biome.clifftree.desert_cliff': 'Desert Cliff',
		'biome.clifftree.diorite_shore': 'Diorite Shore',
		'biome.clifftree.dirt_caves': 'Dirt Caves',
		'biome.clifftree.frozen_caves': 'Frozen Caves',
		'biome.clifftree.glacier_cliff': 'Glacier Cliff',
		'biome.clifftree.glacier_valley': 'Glacier Valley',
		'biome.clifftree.granite_shore': 'Granite Shore',
		'biome.clifftree.gravelly_beach': 'Gravelly Beach',
		'biome.clifftree.inferno': 'Inferno',
		'biome.clifftree.lukewarm_caves': 'Lukewarm Caves',
		'biome.clifftree.mushroom_caves': 'Mushroom Caves',
		'biome.clifftree.oasis': 'Oasis',
		'biome.clifftree.shrubland': 'Shrubland',
		'biome.clifftree.snowy_diorite_shore': 'Snowy Diorite Shore',
		'biome.clifftree.snowy_old_growth_taiga': 'Snowy Old Growth Taiga',
		'biome.clifftree.sparse_forest': 'Sparse Forest',
		'biome.clifftree.stone_ocean': 'Stone Ocean',
		'biome.clifftree.temperate_beach': 'Temperate Beach',
		'biome.clifftree.tropical_river': 'Tropical River',
		'biome.clifftree.tundra': 'Tundra',
		'biome.clifftree.warm_caves': 'Warm Caves',
		'biome.clifftree.warm_river': 'Warm River',
		'biome.ars_elemental.blazing_forest': 'Blazing Forest',
		'biome.ars_elemental.cascading_forest': 'Cascading Forest',
		'biome.ars_elemental.flashing_forest': 'Flashing Forest',
		'biome.ars_elemental.flourishing_forest': 'Flourishing Forest',
		'biome.nullscape.void_barrens': 'Void Barrens',
		'biome.nullscape.crystal_peaks': 'Crystal Peaks',
		'biome.nullscape.shadowlands': 'Shadowlands',
		'biome.netherexp.sorrowsquash_pastures': 'Sorrowsquash Pastures',

		'enchantment.mocurses.curseof_betrayal.desc': 'Shields are no longer 100% reliable',
		'enchantment.mocurses.curseof_disorder.desc': 'Causes your inventory to get messy over time',
		'enchantment.mocurses.curseof_teleportation.desc': 'Causes you to sometimes teleport around at random',
		'enchantment.mocurses.curseof_apnea.desc': 'Causes you to only be able to breathe underwater',
		'enchantment.mocurses.curseof_flammability.desc': 'Burn effect never stops on its own and spread to nearby mobs',
		'enchantment.mocurses.curseof_frost_imprisonment.desc': 'If you go underwater, you won\'t come out',
		'enchantment.mocurses.curseof_disorder.desc': 'Causes your inventory to get messy over time',
		'enchantment.mocurses.curseof_hordes.desc': 'Attracts more mobs of the type when attacking',
		'enchantment.mocurses.curseof_withering.desc': 'Life around you ceases to exist',
		'enchantment.mocurses.curseof_deterioration.desc': 'Item loses durability on its own',
		'enchantment.mocurses.curseof_the_golden_touch.desc': 'Item slowly turns to gold while used',
		'enchantment.mocurses.curseof_the_floating.desc': 'Causes you to always float on water, unable to dive down',
		'enchantment.mocurses.curseof_the_zone.desc': 'Item is bound to the location you found it and refuses to leave it',
		'enchantment.mocurses.curseof_the_voiding.desc': 'Mobs and blocks never drop any items',
		'enchantment.mocurses.curseof_the_movement.desc': 'The faster you move the faster your boots will break',
		'enchantment.mocurses.curseof_notice.desc': 'Mobs notice you from further away',

	}

	/** @type {Record<Internal.Block_, string>} */
	const blockRenames = {
		'netherexp:soul_candle': 'Large Soul Candle',
		'enchantinginfuser:enchanting_infuser': 'Enchanting Table',
		'enchantinginfuser:advanced_enchanting_infuser': 'Advanced Enchanting Table',
		'enderstorage:ender_chest': 'Shared Ender Chest',
		'grass': 'Short Grass',
		'quark:glow_shroom': 'Shimmershroom',
		'quark:glow_shroom_block': 'Shimmershroom Block',
		'quark:glow_shroom_ring': 'Shimmershroom Ring',
		'quark:glow_shroom_stem': 'Shimmershroom Stem',
		'quark:potted_glow_shroom': 'Potted Shimmershroom',
		'ars_nouveau:rune': 'Spell Rune',
		'mythicmetals:hallowed_block': 'Block of Hallowed Alloy'
	}

	/** @type {Record<InputItem_, string>} */
	const itemRenames = {
		'rediscovered:gear': 'Redstone Gear',
		'quartz': 'Quartz',
		'ender_eye': 'Awakened Ender Pearl',
		'rediscovered:ruby_eye': 'Awakened Ender Pearl (Ruby Attunment)',
		'cataclysm:mech_eye': 'Awakened Ender Pearl (Mechanical Attunment)',
		'cataclysm:flame_eye': 'Awakened Ender Pearl (Flame Attunment)',
		'cataclysm:void_eye': 'Awakened Ender Pearl (Void Attunment)',
		'cataclysm:monstrous_eye': 'Awakened Ender Pearl (Monstrous Attunment)',
		'cataclysm:abyss_eye': 'Awakened Ender Pearl (Abyss Attunment)',
		'cataclysm:desert_eye': 'Awakened Ender Pearl (Desert Attunment)',
		'cataclysm:cursed_eye': 'Awakened Ender Pearl (Cursed Attunment)',
		'cataclysm:storm_eye': 'Awakened Ender Pearl (Storm Attunment)',
		'create:dough': 'Wheat Dough',
		'enderstorage:ender_pouch': 'Shared Ender Pouch',
		'structure_gel:building_tool': 'Architect\'s Prism',
		'mythicmetals:durasteel_engine': 'Drill Engine',
		'suspicious_stew': 'Strange Stew',
		'sortilege:lapis_shield': 'Lazuli Buckler',
		'rediscovered:purple_arrow': 'Featherlight Arrow',
		'quark:flamerang': 'Netherite Pickarang',
		'artifacts:everlasting_beef': 'Eternal Beef',
		'tiered:armorers_hammer': 'Reforging Hammer',
		'mythicmetals:hallowed_ingot': 'Hallowed Alloy Ingot'
	}

	for (const [key, value] of Object.entries(extraTranslations)) {
		event.add(key, value);
	}

	for (const [key, value] of Object.entries(blockRenames)) {
		event.renameBlock(key, value);
	}

	for (const [key, value] of Object.entries(itemRenames)) {
		event.renameItem(key, value);
	}

	global.rediscoveredFurniture.forEach(item => {
		let name = item
			.replace('rediscovered:', '')
			.replace('_', ' ')
			.toLowerCase()
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
		event.renameItem(item, 'Ancient ' + name);
	})
})
