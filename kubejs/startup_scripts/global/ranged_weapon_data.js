/**
 * @type {Record<InputItem_, number>}
 */
global.bowDamage = {
	'minecraft:bow': 6,
	'ars_nouveau:spell_bow': 10,
	'experienceobelisk:cognitive_bow': 12,
	'botania:livingwood_bow': 9,
	'botania:crystal_bow': 11,
	'minecraft:crossbow': 11,
	'additionaladditions:crossbow_with_spyglass': 11,
	'cataclysm:cursed_bow': 15,
	'aether:phoenix_bow': 29,
	'aether_redux:subzero_crossbow': 35,

	'mcdw:bow_power_bow': 10,
	'mcdw:bow_elite_power_bow': 17,
	'mcdw:bow_sabrewing': 30,
	'mcdw:bow_call_of_the_void': 38,
	'mcdw:crossbow_veiled_crossbow': 51,
	'mcdw:crossbow_azure_seeker': 14,
	'mcdw:crossbow_heavy_crossbow': 35,
	'mcdw:crossbow_slayer_crossbow': 60,
	'mcdw:crossbow_butterfly_crossbow': 14,
	'mcdw:bow_phantom_bow': 15,
	'mcdw:bow_twisting_vine_bow': 8,
	'mcdw:bow_weeping_vine_bow': 8,
	'mcdw:bow_winters_touch': 23,
	'mcdw:crossbow_exploding_crossbow': 15,
	'mcdw:crossbow_imploding_crossbow': 17,
	'mcdw:crossbow_firebolt_thrower': 16,
	'mcdw:bow_bonebow': 13,
	'mcdw:crossbow_pride_of_the_piglins': 16,

}

// Temporary solution. Whenever I overhaul all Bows I'll rewrite their logic too
global.arrowInternalDamageOverride = {
	// 'too_many_bows:vitality_arrow': 4
}

/**
 * @type {Record<Special.EntityType|InputItem_, number>}
 */
global.arrowDamage = {

	'minecraft:arrow': 4,
	'minecraft:tipped_arrow': 4,

	'ars_nouveau:spell_arrow': 5,
	'ars_nouveau:amplify_arrow': 5,
	'ars_nouveau:split_arrow': 5,
	'ars_nouveau:pierce_arrow': 5,

	'quark:torch_arrow': 5,

	'mythicmetals:runite_arrow': 6,
	'mythicmetals:tipped_runite_arrow': 6,

	'cataclysm:phantom_arrow': 5,

	'minecraft:spectral_arrow': 6,
	'rediscovered:purple_arrow': 6,
	'phantasm:choral_arrow': 9,
	'tide:deep_aqua_arrow': 5,
	'cataclysm:void_scatter_arrow': 17,
	'heart_crystals:cupids_arrow': 0,
	'supplementaries:rope_arrow': 0,
	'mythicmetals:star_platinum_arrow': 14,
	'netherexp:phasmo_arrow': 6,
	'alexscaves:seeking_arrow': 5,
	'alexscaves:burrowing_arrow': 4,
	
	'minecraft:trident': 21,
	'cataclysm:ceraunus': 56,
}

global.arrowPierce = {
	'mythicmetals:runite_arrow': 1,
	'mythicmetals:tipped_runite_arrow': 1,
	
	// 'too_many_bows:frostbite_arrow': 2,

	'tide:deep_aqua_arrow': 5
}

/**
 * @type {Record<Special.EntityType, number>}
 */
global.monsterRangedDamageBase = {
	'minecraft:skeleton': 14,
	'minecraft:stray': 12,
	'minecraft:wither_skeleton': 17,
	'minecraft:pillager': 16,
	'minecraft:illusioner': 18,
}

global.monsterRangedDamageMul = {
	'0': 1.0,
	'1': 1.1,
	'2': 1.1,
	'3': 1.5,
	'4': 1.5,
	'5': 2.0
}
