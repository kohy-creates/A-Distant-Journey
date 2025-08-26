/**
 * @type {Record<InputItem_, number>}
 */
global.bowDamage = {
	'minecraft:bow': 8,
	'ars_nouveau:spell_bow': 11,
	'experienceobelisk:cognitive_bow': 15,
	'botania:livingwood_bow': 10,
	'botania:crystal_bow': 10,
	'minecraft:crossbow': 15,
	'additionaladditions:crossbow_with_spyglass': 15,
	'cataclysm:cursed_bow': 12,
	'too_many_bows:ancient_sage_bow': 15,
	'aether:phoenix_bow': 27,
	'aether_redux:subzero_crossbow': 38,
	'too_many_bows:arcane_bow': 13,
	'too_many_bows:frostbite': 21,
	'too_many_bows:verdant_viper': 14,
	'too_many_bows:demons_grasp': 21,
	'too_many_bows:aethers_call': 31,
	'too_many_bows:vitality_weaver': 40,
	'too_many_bows:twin_shadows': 29,
	'too_many_bows:webstring': 11,
	'too_many_bows:flame_bow': 37,

}

// Temporary solution. Whenever I overhaul all Bows I'll rewrite their logic too
global.arrowInternalDamageOverride = {
	'too_many_bows:vitality_arrow': 4
}

/**
 * @type {Record<Special.EntityType|InputItem_, number>}
 */
global.arrowDamage = {

	'minecraft:arrow': 5,
	'minecraft:tipped_arrow': 5,

	'too_many_bows:frostbite_arrow': 0,
	'too_many_bows:venom_arrow': 0,
	'too_many_bows:vitality_arrow': 0,
	'too_many_bows:webstring_arrow': 0,
	'too_many_bows:flame_arrow': 0,

	'ars_nouveau:spell_arrow': 6,
	'ars_nouveau:amplify_arrow': 6,
	'ars_nouveau:split_arrow': 6,
	'ars_nouveau:pierce_arrow': 6,

	'quark:torch_arrow': 6,

	'mythicmetals:runite_arrow': 6,
	'mythicmetals:tipped_runite_arrow': 7,

	'cataclysm:phantom_arrow': 5,

	'minecraft:spectral_arrow': 7,
	'rediscovered:purple_arrow': 7,
	'phantasm:choral_arrow': 10,
	'tide:deep_aqua_arrow': 7,
	'cataclysm:void_scatter_arrow': 19,
	'heart_crystals:cupids_arrow': 0,
	'supplementaries:rope_arrow': 0,
	'mythicmetals:star_platinum_arrow': 14,
	'netherexp:phasmo_arrow': 6,
	'alexscaves:seeking_arrow': 6,
	'alexscaves:burrowing_arrow': 5,
}

global.arrowPierce = {
	'mythicmetals:runite_arrow': 1,
	'mythicmetals:tipped_runite_arrow': 1,
	
	'too_many_bows:frostbite_arrow': 2,

	'tide:deep_aqua_arrow': 5
}

/**
 * @type {Record<Special.EntityType, number>}
 */
global.monsterRangedDamageBase = {
	'minecraft:skeleton': 14
}

global.monsterRangedDamageMul = {
	'0': 1.0,
	'1': 1.1,
	'2': 1.3,
	'3': 1.5,
	'4': 1.85,
	'5': 2.0
}
