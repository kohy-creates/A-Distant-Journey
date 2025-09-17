/**
 * @type {Record<InputItem_, number>}
 */
global.bowDamage = {
	'minecraft:bow': 8,
	'ars_nouveau:spell_bow': 12,
	'experienceobelisk:cognitive_bow': 16,
	'botania:livingwood_bow': 11,
	'botania:crystal_bow': 13,
	'minecraft:crossbow': 14,
	'additionaladditions:crossbow_with_spyglass': 14,
	'cataclysm:cursed_bow': 16,
	'aether:phoenix_bow': 34,
	'aether_redux:subzero_crossbow': 38,

	'mcdw:bow_power_bow': 12,
	'mcdw:bow_elite_power_bow': 19,
	'mcdw:bow_sabrewing': 34,
	'mcdw:bow_call_of_the_void': 42,
	'mcdw:crossbow_veiled_crossbow': 56,
	'mcdw:crossbow_azure_seeker': 19,
	'mcdw:crossbow_heavy_crossbow': 40,
	'mcdw:crossbow_slayer_crossbow': 65,
	'mcdw:crossbow_butterfly_crossbow': 15,
	'mcdw:bow_phantom_bow': 21,
	'mcdw:bow_twisting_vine_bow': 13,
	'mcdw:bow_weeping_vine_bow': 13,
	'mcdw:bow_winters_touch': 25,
	'mcdw:crossbow_exploding_crossbow': 16,
	'mcdw:crossbow_imploding_crossbow': 20,
	'mcdw:crossbow_firebolt_thrower': 18,
	'mcdw:bow_bonebow': 15,
	'mcdw:crossbow_pride_of_the_piglins': 24,
	

}

// Temporary solution. Whenever I overhaul all Bows I'll rewrite their logic too
global.arrowInternalDamageOverride = {
	// 'too_many_bows:vitality_arrow': 4
}

/**
 * @type {Record<Special.EntityType|InputItem_, number>}
 */
global.arrowDamage = {

	'minecraft:arrow': 5,
	'minecraft:tipped_arrow': 5,

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
	
	// 'too_many_bows:frostbite_arrow': 2,

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
