/**
 * @type {Record<InputItem_, number>}
 */
global.bowDamage = {
	'minecraft:bow': 5,
	'ars_nouveau:spell_bow': 34,
	'experienceobelisk:cognitive_bow': 14,
	'botania:livingwood_bow': [9, 0.14],
	'botania:crystal_bow': 17,
	'minecraft:crossbow': 11,
	'additionaladditions:crossbow_with_spyglass': [11, 0.06, 0.1],
	// 'cataclysm:cursed_bow': 16,
	'aether:phoenix_bow': [26, 0.14],
	'aether_redux:subzero_crossbow': 34,

	'mcdw:bow_power_bow': 11,
	'mcdw:bow_elite_power_bow': 19,
	'mcdw:bow_sabrewing': [29, global.baseCritChance, 0.2],
	'mcdw:bow_call_of_the_void': 38,
	'mcdw:crossbow_veiled_crossbow': [51, global.baseCritChance, 2.5],
	'mcdw:crossbow_azure_seeker': [14, 0.06, 0.3],
	'mcdw:crossbow_heavy_crossbow': [40, 0.08, 0.6],
	'mcdw:crossbow_slayer_crossbow': [70, 0.1, 1.2],
	'mcdw:crossbow_butterfly_crossbow': [16, 0.08],
	'mcdw:bow_phantom_bow': 16,
	'mcdw:bow_twisting_vine_bow': 8,
	'mcdw:bow_weeping_vine_bow': 8,
	'mcdw:bow_winters_touch': [23, global.baseCritChance, 0.15],
	'mcdw:crossbow_exploding_crossbow': 18,
	'mcdw:crossbow_imploding_crossbow': 19,
	'mcdw:crossbow_firebolt_thrower': 18,
	'mcdw:bow_bonebow': [14, global.baseCritChance, 0.1],
	'mcdw:crossbow_pride_of_the_piglins': [19, 0.14],

	'twilightforest:ice_bow': 30,
	'twilightforest:triple_bow': 20,
	'twilightforest:seeker_bow': [18, 0.06],
	'twilightforest:ender_bow': 35,

	'tide:starlight_bow': [30, 0.14, 0.2]

}

/**
 * @type {Record<Special.EntityType|InputItem_, number>}
 */
global.arrowDamage = {

	'minecraft:arrow': 4,
	'minecraft:tipped_arrow': 4,

	'ars_nouveau:spell_arrow': 4,
	'ars_nouveau:amplify_arrow': 4,
	'ars_nouveau:split_arrow': 4,
	'ars_nouveau:pierce_arrow': 4,

	'twilightforest:ice_arrow': 4,
	'twilightforest:seeker_arrow': 5,

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

	'tide:star_arrow': 0,

	'minecraft:trident': 21,
	'cataclysm:ceraunus': 56,
}

global.arrowPierce = {
	'mythicmetals:runite_arrow': 1,
	'mythicmetals:tipped_runite_arrow': 1,
	'twilightforest:ice_arrow': 1,

	'tide:star_arrow': 9,

	// 'too_many_bows:frostbite_arrow': 2,

	'tide:deep_aqua_arrow': 5
}

/**
 * @type {Record<Special.EntityType, number>}
 */
global.monsterRangedDamageBase = {
	'minecraft:skeleton': 13,
	'minecraft:stray': 12,
	'minecraft:wither_skeleton': 19,
	'minecraft:pillager': 17,
	'minecraft:illusioner': 20,
	'minecraft:piglin': 16,
}

global.monsterRangedDamageMul = {
	'0': 1.0,
	'1': 1.1,
	'2': 1.1,
	'3': 2.4,
	'4': 2.4,
	'5': 3.9
}
