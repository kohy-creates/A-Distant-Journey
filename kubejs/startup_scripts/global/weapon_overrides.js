// Base vanilla toolsets
const toolset = [
	'_sword',
	'_pickaxe',
	'_axe',
	'_shovel',
	'_hoe'
];

const defaultAttackDamage = [1, 0.5, 1.12, 0.4, 0.5];
const defaultAttackSpeed = [1.6, 1.3, 0.9, 1.1, 1.4];

// Simply Swords weapon types
const simplySwordsTypes = [
	'_katana',
	'_spear',
	'_glaive',
	'_warglaive',
	'_chakram',
	'_scythe'
];

// Multipliers for Simply Swords
const simplySwordsAttackDamage = [
	0.85,
	1.0,
	1.2,
	0.7,
	0.75,
	1.35,
];

const simplySwordsAttackSpeed = [
	1.6,
	1.2,
	1.3,
	2.0,
	1.2,
	1.1
];

function addToolsetOverride(toolsetName, arg1, arg2, arg3) {
	let i = 0;

	if (typeof arg2 === 'undefined') arg2 = 1;
	if (typeof arg3 === 'undefined') arg3 = 1;

	toolset.forEach(function (tool) {
		const name = toolsetName + tool;
		if (!Item.of(name)) return;
		if (Object.keys(global.weapon_overrides).includes(name)) return;

		var attackDamage, attackSpeed;

		// Scaled base damage
		attackDamage = Math.ceil(arg1 * defaultAttackDamage[i] * arg3);
		attackSpeed = global.roundToNearest(defaultAttackSpeed[i] * arg2, 0.05);

		global.weapon_overrides[name] = [attackDamage, attackSpeed];
		i++;
	});

	const baseMaterial = toolsetName.split(':')[1];
	const compatPath = 'simplyswords:mythicmetals_compat/' + baseMaterial + '/' + baseMaterial;

	let j = 0;
	simplySwordsTypes.forEach(function (type) {
		const damageMult = simplySwordsAttackDamage[j];
		const speedVal = simplySwordsAttackSpeed[j];

		const vanillaId = 'simplyswords:' + baseMaterial + type;
		const compatId = compatPath + type;

		const testIDs = [vanillaId, compatId];

		testIDs.forEach(function (id) {
			if (!Item.of(id)) return;
			if (Object.keys(global.weapon_overrides).includes(id)) return;

			const attackDamage = Math.ceil(arg1 * damageMult * arg3);
			const attackSpeed = global.roundToNearest(speedVal * arg2, 0.05);

			global.weapon_overrides[id] = [attackDamage, attackSpeed];
		});
		j++;
	});
};

global.weapon_overrides = {
	// attack damage, attack speed, crit chance, crit damage, armor penetration
	'mythicmetals:mythril_drill': [Math.round(32 * defaultAttackDamage[1]), defaultAttackSpeed[1]],
	'ancient_aether:valkyrum_lance': [42, 1.3],
	'botania:manasteel_pick': [15 * defaultAttackDamage[1], defaultAttackSpeed[1]],
	'botania:elementium_pick': [23 * defaultAttackDamage[1], defaultAttackSpeed[1]],
	'botania:terra_sword': [85, 1.8],
	'botania:thunder_sword': [39, 2.5, 0, 0, 15],
	'cataclysm:gauntlet_of_guard': [40, 3.1, 0, 0, 15],
	'cataclysm:gauntlet_of_bulwark': [60, 3.1, 0, 0, 15],
	'cataclysm:gauntlet_of_maelstrom': [60, 3.1, 0, 0, 15],
	'cataclysm:tidal_claws': [26, 0.9, 0, 0, 10],

	'mcdw:axe_anchor': [28, 0.6],
	'mcdw:axe_encrusted_anchor': [30, 0.6],
	'mcdw:dagger_backstabber': [63, 2.3],
	'mcdw:dagger_fangs_of_frost': [14, 2.5],
	'mcdw:dagger_resolute_tempest_knife': [43, 1.8],
	'mcdw:dagger_swift_striker': [63, 3.1],
	'mcdw:dagger_void_touched_blade': [58, 2.2],
	'mcdw:glaive_cackling_broom': [17, 1],
	'mcdw:glaive_grave_bane': [26, 1],
	'mcdw:glaive_venom_glaive': [21, 1],
	'mcdw:hammer_boneclub': [31, 0.8],
	'mcdw:hammer_bone_cudgel': [84, 0.8],
	'mcdw:hammer_gravity': [102, 0.8],
	'mcdw:hammer_great_hammer': [28, 0.8],
	'mcdw:hammer_stormlander': [38, 0.8],
	'mcdw:scythe_jailors_scythe': [22, 1.1],
	'mcdw:scythe_skull_scythe': [64, 1.1],
	'mcdw:scythe_soul_scythe': [30, 1.1],
	'mcdw:sickle_sickle': [10, 1.9],
	'mcdw:sickle_the_last_laught_silver': [19, 1.9],
	'mcdw:sickle_the_last_laught_gold': [19, 1.9],
	'mcdw:soul_dagger_soul_knife': [45, 1.2],
	'mcdw:soul_dagger_truthseeker': [65, 1.2],
	'mcdw:soul_dagger_eternal_knife': [85, 1.2],
	'mcdw:staff_battlestaff': [9, 1.8],
	'mcdw:sword_heartstealer': [53, 0.8],
	'mcdw:sword_obsidian_claymore': [121, 0.7, 0.24],
	'mcdw:sword_sinister': [58, 1.8, 0.14],

	'minecraft:trident': [21, 1.1, 0.08],
	'farmersdelight:skillet': [12, 1],
	'zenith:zenith': [110, 3.5, 0.14]
};

addToolsetOverride('minecraft:wooden', 7);
addToolsetOverride('mythicmetals:copper', 9);
addToolsetOverride('minecraft:iron', 12);
addToolsetOverride('minecraft:gold', 12);
addToolsetOverride('mythicmetals:aquarium', 13);
addToolsetOverride('mythicmetals:tidesinger', 15);
addToolsetOverride('mythicmetals:bronze', 14);
addToolsetOverride('mythicmetals:kyber', 16);
addToolsetOverride('additionaladditions:rose_gold', 16);
addToolsetOverride('minecraft:diamond', 23);
addToolsetOverride('cataclysm:black_steel', 23);
addToolsetOverride('botania:manasteel', 15, 1.125);
addToolsetOverride('mythicmetals:steel', 28, 0.775);
addToolsetOverride('mythicmetals:mythril', 15);
addToolsetOverride('mythicmetals:orichalcum', 20, 1.125);
addToolsetOverride('mythicmetals:midas_gold', 18);
addToolsetOverride('mythicmetals:stormyx', 29, 1.125);
addToolsetOverride('botania:elementium', 23);
addToolsetOverride('mythicmetals:palladium', 28);
addToolsetOverride('aether:skyroot', 15);
addToolsetOverride('aether:holystone', 18);
addToolsetOverride('aether:zanite', 28);
addToolsetOverride('aether:gravitite', 35, 0.75);
addToolsetOverride('ancient_aether:valkyrum', 42);
addToolsetOverride('minecraft:netherite', 50);
addToolsetOverride('mythicmetals:adamantite', 48);
addToolsetOverride('mythicmetals:prometheum', 65, 0.6);
addToolsetOverride('mythicmetals:star_platinum', 60);
addToolsetOverride('lost_aether_content:phoenix', 76);
addToolsetOverride('unusualend:pearlescent', 64);
addToolsetOverride('phantasm:crystalline', 55);
addToolsetOverride('majruszsdifficulty:enderium', 72);
addToolsetOverride('mythicmetals:celestium', 80);
addToolsetOverride('mythicmetals:metallurgium', 80);
addToolsetOverride('witherstorm:command_block', 94);

global.toolReachOverrides = {
	'twilightforest:ironwood_pickaxe': 1.5,
	'twilightforest:ironwood_axe': 1.5,
	'twilightforest:ironwood_hoe': 1.5,
	'twilightforest:ironwood_shovel': 1.5,
	'mythicmetals:mythril_pickaxe': 1.5,
	'mythicmetals:mythril_axe': 2,
	'mythicmetals:mythril_hoe': 2,
	'mythicmetals:mythril_shovel': 2,
	'experienceobelisk:cognitive_pickaxe': 3.5,
	'experienceobelisk:cognitive_axe': 3.5,
	'experienceobelisk:cognitive_hoe': 3.5,
	'experienceobelisk:cognitive_shovel': 3.5,
	'experienceobelisk:cognitive_shears': 3.5,
	'experienceobelisk:flint_and_cognitive_alloy': 3.5,
	'ancient_aether:valkyrum_pickaxe': 1,
	'ancient_aether:valkyrum_axe': 1,
	'ancient_aether:valkyrum_hoe': 1,
	'ancient_aether:valkyrum_shovel': 1,
};
