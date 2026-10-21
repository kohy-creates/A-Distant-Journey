//priority: 500
global.bowDamage = {
	'minecraft:bow': 10,
	'ars_nouveau:spell_bow': 34,
	'experienceobelisk:cognitive_bow': 14,
	'botania:livingwood_bow': [11, 0.14],
	'botania:crystal_bow': 19,
	'minecraft:crossbow': 16,
	'additionaladditions:crossbow_with_spyglass': [16, 0.14],

	'aether:phoenix_bow': [36, 0.14],
	'aether_redux:subzero_crossbow': 44,

	'mcdw:bow_power_bow': 13,
	'mcdw:bow_elite_power_bow': 22,
	'mcdw:bow_sabrewing': [39, global.baseCritChance, 0.2],
	'mcdw:bow_call_of_the_void': 62,
	'mcdw:crossbow_azure_seeker': [20, 0.06, 0.3],
	'mcdw:crossbow_heavy_crossbow': [60, 0.08, 0.6],
	'mcdw:crossbow_slayer_crossbow': [98, 0.1, 1.2],
	'mcdw:crossbow_butterfly_crossbow': [23, 0.08],
	'mcdw:bow_phantom_bow': 19,
	'mcdw:bow_twisting_vine_bow': 13,
	'mcdw:bow_weeping_vine_bow': 13,
	'mcdw:bow_winters_touch': [43, global.baseCritChance, 0.15],
	'mcdw:crossbow_exploding_crossbow': 24,
	'mcdw:crossbow_imploding_crossbow': 85,
	'mcdw:crossbow_firebolt_thrower': 36,
	'mcdw:bow_bonebow': [14, global.baseCritChance, 0.1],
	'mcdw:crossbow_pride_of_the_piglins': [42, 0.14],
	'mcdw:crossbow_burst_crossbow': 19,
	'mcdw:crossbow_soul_hunter_crossbow': 23,
	'mcdw:crossbow_harp_crossbow': 23,
	'mcdw:crossbow_lightning_harp_crossbow': 36,
	'mcdw:crossbow_auto_crossbow': [70, 0.14, 5.0],
	'mcdw:crossbow_shadow_crossbow': [50, 0.1, 0.2],
	'mcdw:crossbow_veiled_crossbow': [122, 0.14, 5.0],
	'mcdw:crossbow_corrupted_crossbow': [40, 0],
	'mcdw:crossbow_soul_crossbow': 21,
	'mcdw:crossbow_feral_soul_crossbow': 21,
	'mcdw:crossbow_voidcaller_crossbow': 54,
	'mcdw:bow_snow_bow': 19,
	'mcdw:bow_bubble_burster': 29,

	'twilightforest:ice_bow': [67, global.baseCritChance, 0.15],
	'twilightforest:triple_bow': 38,
	'twilightforest:seeker_bow': [40, 0.06],
	'twilightforest:ender_bow': 54,

	'tide:starlight_bow': [28, 0.14, 0.2],

	'kubejs:elsa_crossbow': [188, 0.24],

};

global.bowCooldowns = {
	'mcdw:crossbow_veiled_crossbow': 20,
	'mcdw:crossbow_auto_crossbow': 20,
	'mcdw:crossbow_burst_crossbow': 7,
	'mcdw:crossbow_harp_crossbow': 10,
	'mcdw:crossbow_lightning_harp_crossbow': 10,
	'mcdw:crossbow_exploding_crossbow': 7,
	'mcdw:crossbow_imploding_crossbow': 15,
	'mcdw:crossbow_firebolt_thrower': 7,
	'mcdw:crossbow_heavy_crossbow': 7,
	'mcdw:crossbow_slayer_crossbow': 14,
	'mcdw:crossbow_voidcaller_crossbow': 12
};

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

	'mythicmetals:runite_arrow': 5,
	'mythicmetals:tipped_runite_arrow': 5,

	'cataclysm:phantom_arrow': 5,

	'minecraft:spectral_arrow': 6,
	'rediscovered:purple_arrow': 6,
	'phantasm:choral_arrow': 9,
	'cataclysm:void_scatter_arrow': 14,
	'heart_crystals:cupids_arrow': 0,
	'supplementaries:rope_arrow': 0,
	'mythicmetals:star_platinum_arrow': 12,
	'netherexp:phasmo_arrow': 6,
	'alexscaves:seeking_arrow': 5,
	'alexscaves:burrowing_arrow': 4,

	'savage_and_ravage:mischief_arrow': 2,

	'tide:star_arrow': 0,

	'minecraft:trident': 21,
	'cataclysm:ceraunus': 56,
};

global.arrowPierce = {
	'mythicmetals:runite_arrow': 1,
	'mythicmetals:tipped_runite_arrow': 1,
	'twilightforest:ice_arrow': 1,

	'tide:star_arrow': 9,
};

global.monsterRangedDamageBase = {
	'minecraft:skeleton': 15,
	'minecraft:stray': 13,
	'minecraft:wither_skeleton': 21,
	'minecraft:pillager': 19,
	'minecraft:illusioner': 23,
	'minecraft:piglin': 17,
	'witherstormmod:sickened_skeleton': 55,
	'witherstormmod:sickened_pillager': 62,
}

global.monsterRangedDamageMul = {
	'0': 1.0,
	'1': 1.05,
	'2': 1.05,
	'3': 2.2,
	'4': 2.2,
	'5': 3
}
