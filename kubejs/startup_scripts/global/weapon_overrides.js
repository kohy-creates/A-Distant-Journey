function round(number) {
	return Math.round(number);
}

function roundTo1Decimal(num) {
	return round(num * 10) / 10;
}

const toolset = [
	'_sword',
	'_pickaxe',
	'_axe',
	'_shovel',
	'_hoe'
]

const defaultAttackDamage = [1, 0.5, 1.12, 0.4, 0.5]
const defaultAttackSpeed = [1.6, 1.3, 0.9, 1.1, 1.4]

function addToolsetOverride(toolsetName, arg1, arg2, arg3) {
	let i = 0;
	const speed = (arg2) ? arg2 : defaultAttackSpeed;
	const damage = (arg2) ? arg2 : defaultAttackDamage;
	toolset.forEach(tool => {
		const name = toolsetName + tool;
		if (!Item.of(name)) return;
		if (Object.keys(global.weapon_overrides).includes(name)) return;
		if (Array.isArray(arg1)) {
			global.weapon_overrides[name] = [arg1[i], speed[i]];
		}
		else {
			if (arg3) {
				global.weapon_overrides[name] = [round(arg1 * damage[i]), roundTo1Decimal(arg3 * defaultAttackSpeed[i])];
			}
			else {
				global.weapon_overrides[name] = [round(arg1 * damage[i]), defaultAttackSpeed[i]];
			}
		}
		i++;
	});
}

/**
 * @type {{ [key in InputItem_]: number[] }}
 */
global.weapon_overrides = {
	// attack damage, attack speed, crit chance, crit damage, armor penetration
	'mythicmetals:mythril_drill': [round(20 * defaultAttackDamage[1]), defaultAttackSpeed[1]],
	'aether:valkyrie_lance': [36, 1.3],
	'botania:manasteel_pick': [17 * defaultAttackDamage[1], defaultAttackSpeed[1]],
	'botania:elementium_pick': [25 * defaultAttackDamage[1], defaultAttackSpeed[1]],
	'botania:terra_sword': [21, 1.8],
	'botania:thunder_sword': [21, 2.5],
	'botania:star_sword': [52, 1.3],
	'cataclysm:gauntlet_of_guard': [40, 3.1, 0, 0, 15],
	'cataclysm:gauntlet_of_bulwark': [40, 3.1, 0, 0, 15],
	'cataclysm:gauntlet_of_maelstrom': [40, 3.1, 0, 0, 15],
	'cataclysm:tidal_claws': [26, 0.9, 0, 0, 10],

	'mcdw:axe_anchor': [28, 0.6],
	'mcdw:axe_encrusted_anchor': [30, 0.6],
	'mcdw:dagger_backstabber': [43, 2.3],
	'mcdw:dagger_fangs_of_frost': [14, 2.5],
	'mcdw:dagger_resolute_tempest_knife': [39, 1.8],
	'mcdw:dagger_swift_striker': [43, 3.1],
	'mcdw:dagger_void_touched_blade': [40, 2.2],
	'mcdw:glaive_cackling_broom': [17, 1],
	'mcdw:glaive_grave_bane': [25, 1],
	'mcdw:glaive_venom_glaive': [19, 1],
	'mcdw:hammer_boneclub': [23, 0.8],
	'mcdw:hammer_bone_cudgel': [50, 0.8],
	'mcdw:hammer_gravity': [65, 0.8],
	'mcdw:hammer_great_hammer': [23, 0.8],
	'mcdw:hammer_stormlander': [25, 0.8],
	'mcdw:scythe_jailors_scythe': [21, 1.1],
	'mcdw:scythe_skull_scythe': [44, 1.1],
	'mcdw:scythe_soul_scythe': [24, 1.1],
	'mcdw:sickle_sickle': [10, 1.9],
	'mcdw:sickle_the_last_laught_silver': [21, 1.9],
	'mcdw:sickle_the_last_laught_gold': [21, 1.9],
	'mcdw:soul_dagger_soul_knife': [24, 1.2],
	'mcdw:soul_dagger_truthseeker': [39, 1.2],
	'mcdw:soul_dagger_eternal_knife': [50, 1.2],
	'mcdw:staff_battlestaff': [11, 1.4],
	'mcdw:sword_heartstealer': [43, 0.8],
	'mcdw:sword_obsidian_claymore': [64, 0.7],
	'mcdw:sword_sinister': [42, 1.8],

	'minecraft:trident': [21, 1.1, 0.1]


}

addToolsetOverride('minecraft:wooden', 7)
addToolsetOverride('aether:skyroot', 16)
addToolsetOverride('mythicmetals:copper', 9)
addToolsetOverride('aether:holystone', 20)
addToolsetOverride('minecraft:iron', 12)
addToolsetOverride('aether:zanite', 25)
addToolsetOverride('minecraft:gold', 12)
addToolsetOverride('mythicmetals:aquarium', 13)
addToolsetOverride('mythicmetals:tidesinger', 15)
addToolsetOverride('mythicmetals:bronze', 14)
addToolsetOverride('mythicmetals:kyber', 15)
addToolsetOverride('additionaladditions:rose_gold', 16)
addToolsetOverride('minecraft:diamond', 19)
addToolsetOverride('cataclysm:black_steel', 21)
addToolsetOverride('aether:gravitite', 31)
addToolsetOverride('botania:manasteel', 17)
addToolsetOverride('mythicmetals:prometheum', 18)
addToolsetOverride('mythicmetals:steel', 17)
addToolsetOverride('mythicmetals:carmot', 22)
addToolsetOverride('mythicmetals:mythril', 23)
addToolsetOverride('mythicmetals:orichalcum', 23)
addToolsetOverride('experienceobelisk:cognitive', 22)
addToolsetOverride('mythicmetals:stormyx', 22)
addToolsetOverride('botania:elementium', 25)
addToolsetOverride('mythicmetals:palladium', 28)
addToolsetOverride('aether:valkyrie', 36)
addToolsetOverride('lost_aether_content:phoenix', 43)
addToolsetOverride('minecraft:netherite', 40)
addToolsetOverride('mythicmetals:adamantite', 38)
addToolsetOverride('mythicmetals:star_platinum', 48)
addToolsetOverride('unusualend:pearlescent', 46)
addToolsetOverride('phantasm:crystalline', 44)
addToolsetOverride('majruszsdifficulty:enderium', 52)
addToolsetOverride('mythicmetals:celestium', 60)
addToolsetOverride('mythicmetals:metallurgium', 60)
addToolsetOverride('witherstorm:command_block', 51)
