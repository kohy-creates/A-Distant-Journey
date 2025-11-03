// Percent
function p(num) {
	return num / 100;
}

global.armorOverrides = {
	'create:cardboard': {
		'generic.armor': {
			values: [0, 1, 1, 0],
			operation: 0
		},
	},
	'minecraft:leather': {
		'generic.armor': {
			values: [1, 2, 2, 1],
			operation: 0
		},
	},
	'minecraft:chainmail': {
		'generic.armor': {
			values: [2, 3, 3, 2],
			operation: 0
		},
		'adjcore:generic.projectile_damage_reduction': {
			values: [p(2.5), p(5), p(2.5), 0],
			operation: 0
		},
		'generic.movement_speed': {
			values: [0, 0, 0, p(4)],
			operation: 1
		},
	},
	'rediscovered:studded': {
		'generic.armor': {
			values: [2, 3, 3, 2],
			operation: 0
		},
		'adjcore:generic.projectile_damage_reduction': {
			values: [p(2.5), p(5), p(2.5), 0],
			operation: 0
		},
		'generic.movement_speed': {
			values: [0, 0, 0, p(4)],
			operation: 1
		},

	},
	'mythicmetals:osmium_chainmail': {
		'generic.armor': {
			values: [3, 5, 4, 3],
			operation: 0
		},
		'generic.knockback_resistance': {
			values: [0, p(10), 0, p(5)],
			operation: 0
		},
		'adjcore:generic.projectile_damage_reduction': {
			values: [p(2.5), p(5), p(2.5), 0],
			operation: 0
		},
		'generic.movement_speed': {
			values: [0, 0, 0, p(4)],
			operation: 1
		},
	},
	'rediscovered:plate': {
		'generic.armor': {
			values: [3, 4, 3, 2],
			operation: 0
		},
	},
	'minecraft:iron': {
		'generic.armor': {
			values: [3, 4, 3, 2],
			operation: 0
		},
	},
	'additionaladditions:rose_gold': {
		'generic.armor': {
			values: [3, 5, 4, 3],
			operation: 0
		},
		'generic.knockback_resistance': {
			values: [0, 0.1, 0, 0],
			operation: 0
		},
		'generic.movement_speed': {
			values: [0, 0, 0.03, 0],
			operation: 1
		}
	},
	'minecraft:diamond': {
		'generic.armor': {
			values: [6, 8, 7, 5],
			operation: 0
		},
		'generic.knockback_resistance': {
			values: [0, 0.1, 0, 0.025],
			operation: 0
		},
		'generic.movement_speed': {
			values: [0, 0, 0.03, 0],
			operation: 1
		}
	},
	'minecraft:netherite': {
		'generic.armor': {
			values: [9, 12, 11, 8],
			operation: 0
		},
		'generic.knockback_resistance': {
			values: [0.025, 0.1, 0.05, 0.025],
			operation: 0
		},
		'generic.movement_speed': {
			values: [0, 0, 0.06, 0],
			operation: 1
		}
	},
	'majruszsdifficulty:enderium': {
		'generic.armor': {
			values: [12, 15, 14, 11],
			operation: 0
		},
		'generic.knockback_resistance': {
			values: [0.05, 0.1, 0.1, 0.05],
			operation: 0
		},
		'generic.movement_speed': {
			values: [0, 0, 0.08, 0],
			operation: 1
		}
	},
	'mythicmetals:metallurgium': {
		'generic.armor': {
			values: [16, 19, 18, 15],
			operation: 0
		},
		'generic.knockback_resistance': {
			values: [0.1, 0.1, 0.1, 0.1],
			operation: 0
		},
		'generic.movement_speed': {
			values: [0, 0, 0.1, 0],
			operation: 1
		}
	},
	'mythicmetals:adamantite': {
		'generic.armor': {
			values: [10, 12, 11, 9],
			operation: 0
		},
		'generic.knockback_resistance': {
			values: [0, 0, 0.15, 0],
			operation: 0
		},
		'generic.movement_speed': {
			values: [0, 0, 0, 0.05],
			operation: 1
		}
	},
	'mythicmetals:orichalcum': {
		'generic.armor': {
			values: [4, 6, 5, 3],
			operation: 0
		},
	},
	'mythicmetals:runite': {
		'generic.armor': {
			values: [2, 4, 3, 2],
			operation: 0
		},
		'ars_nouveau:ars_nouveau.perk.max_mana': {
			values: [0, 10, 10, 0],
			operation: 0
		},
		'ars_nouveau:ars_nouveau.perk.mana_regen': {
			values: [1, 0, 0, 0],
			operation: 0
		}
	},
	'ars_nouveau:arcanist_0': {
		'generic.armor': {
			values: [4, 5, 4, 3],
			operation: 0
		},
		'ars_nouveau:ars_nouveau.perk.max_mana': {
			values: [0, 30, 15, 0],
			operation: 0
		},
		'ars_nouveau:ars_nouveau.perk.mana_regen': {
			values: [3, 0, 0, 0],
			operation: 0
		},
		'generic.movement_speed': {
			values: [0, 0, 0, 0.04],
			operation: 1
		}
	},
	'ars_nouveau:arcanist_1': {
		'generic.armor': {
			values: [5, 7, 6, 4],
			operation: 0
		},
		'ars_nouveau:ars_nouveau.perk.max_mana': {
			values: [0, 30, 20, 10],
			operation: 0
		},
		'ars_nouveau:ars_nouveau.perk.mana_regen': {
			values: [3, 1, 0, 0],
			operation: 0
		},
		'generic.movement_speed': {
			values: [0, 0, 0, 0.04],
			operation: 1
		}
	},
	'ars_nouveau:arcanist_2': {
		'generic.armor': {
			values: [8, 10, 9, 7],
			operation: 0
		},
		'ars_nouveau:ars_nouveau.perk.max_mana': {
			values: [0, 30, 30, 30],
			operation: 0
		},
		'ars_nouveau:ars_nouveau.perk.mana_regen': {
			values: [4, 3, 0, 0],
			operation: 0
		},
		'generic.movement_speed': {
			values: [0, 0, 0, 0.08],
			operation: 1
		}
	},
	'ars_elemental:fire': {
		'generic.armor': {
			values: [13, 16, 14, 13],
			operation: 0
		},
		'ars_nouveau:ars_nouveau.perk.max_mana': {
			values: [0, 60, 30, 30],
			operation: 0
		},
		'ars_nouveau:ars_nouveau.perk.mana_regen': {
			values: [7, 3, 0, 0],
			operation: 0
		},
		'generic.movement_speed': {
			values: [0, 0, 0, 0.12],
			operation: 1
		},
		'attributeslib:crit_chance': {
			values: [0, 0, 0.15, 0],
			operation: 0
		}
	},
	'ars_elemental:aqua': {
		'generic.armor': {
			values: [13, 16, 14, 13],
			operation: 0
		},
		'ars_nouveau:ars_nouveau.perk.max_mana': {
			values: [0, 60, 30, 30],
			operation: 0
		},
		'ars_nouveau:ars_nouveau.perk.mana_regen': {
			values: [7, 3, 0, 0],
			operation: 0
		},
		'generic.movement_speed': {
			values: [0, 0, 0, 0.12],
			operation: 1
		},
		'attributeslib:crit_chance': {
			values: [0, 0, 0.15, 0],
			operation: 0
		}
	},
	'ars_elemental:earth': {
		'generic.armor': {
			values: [13, 16, 14, 13],
			operation: 0
		},
		'ars_nouveau:ars_nouveau.perk.max_mana': {
			values: [0, 60, 30, 30],
			operation: 0
		},
		'ars_nouveau:ars_nouveau.perk.mana_regen': {
			values: [7, 3, 0, 0],
			operation: 0
		},
		'generic.movement_speed': {
			values: [0, 0, 0, 0.12],
			operation: 1
		},
		'attributeslib:crit_chance': {
			values: [0, 0, 0.15, 0],
			operation: 0
		}
	},
	'ars_elemental:air': {
		'generic.armor': {
			values: [13, 16, 14, 13],
			operation: 0
		},
		'ars_nouveau:ars_nouveau.perk.max_mana': {
			values: [0, 60, 30, 30],
			operation: 0
		},
		'ars_nouveau:ars_nouveau.perk.mana_regen': {
			values: [7, 3, 0, 0],
			operation: 0
		},
		'generic.movement_speed': {
			values: [0, 0, 0, 0.12],
			operation: 1
		},
		'attributeslib:crit_chance': {
			values: [0, 0, 0.15, 0],
			operation: 0
		}
	},
	'mythicmetals:bronze': {
		'generic.armor': {
			values: [4, 5, 4, 3],
			operation: 0
		}
	},
	'mythicmetals:steel': {
		'generic.armor': {
			values: [5, 6, 6, 4],
			operation: 0
		}
	},
	'mythicmetals:kyber': {
		'generic.armor': {
			values: [2, 5, 3, 2],
			operation: 0
		}
	},
	'minecraft:golden': {
		'generic.armor': {
			values: [1, 3, 2, 1],
			operation: 0
		}
	},
	'mythicmetals:midas_gold': {
		'generic.armor': {
			values: [4, 6, 5, 4],
			operation: 0
		},
		'generic.luck': {
			values: [2, 0, 0, 0],
			operation: 0
		},
		'attributeslib:crit_chance': {
			values: [0, 0.05, 0.1, 0],
			operation: 0
		}
	},
	'mythicmetals:palladium': {
		'generic.armor': {
			values: [7, 8, 7, 6],
			operation: 0
		}
	},
	'mythicmetals:prometheum': {
		'generic.armor': {
			values: [4, 6, 6, 4],
			operation: 0
		},
		'attributeslib:life_steal': {
			values: [0, 0.065, 0, 0],
			operation: 0
		}
	},
	'botania:manasteel': {
		'generic.armor': {
			values: [3, 5, 5, 2],
			operation: 0
		}
	},
	'botania:manaweave': {
		'generic.armor': {
			values: [2, 3, 2, 1],
			operation: 0
		}
	},
	'botania:terrasteel': {
		'generic.armor': {
			values: [11, 13, 12, 10],
			operation: 0
		},
		'generic.knockback_resistance': {
			values: [0, 0.1, 0, 0.1],
			operation: 0
		}
	},
	'mythicmetals:tidesinger': {
		'generic.armor': {
			values: [5, 8, 7, 5],
			operation: 0
		},
		'forge:swim_speed': {
			values: [0, 0.05, 0.3, 0.35],
			operation: 1
		},
		'additionalentityattributes:player.water_visibility': {
			values: [0.25, 0, 0, 0],
			operation: 1
		},
	},
	'mythicmetals:aquarium': {
		'generic.armor': {
			values: [3, 4, 3, 2],
			operation: 0
		},
		'forge:swim_speed': {
			values: [0, 0.05, 0.1, 0.15],
			operation: 1
		},
		'additionalentityattributes:player.water_visibility': {
			values: [0, 0, 0, 0],
			operation: 1
		},
	},
	'mythicmetals:aquarium': {
		'generic.armor': {
			values: [3, 4, 3, 2],
			operation: 0
		},
		'additionalentityattributes:player.water_visibility': {
			values: [0, 0, 0, 0],
			operation: 0
		},
		'additionalentityattributes:generic.water_speed': {
			values: [0, 0, 0, 0],
			operation: 0
		},
		'forge:swim_speed': {
			values: [0, 0.05, 0.1, 0.15],
			operation: 1
		},
		'additionalentityattributes:player.water_visibility': {
			values: [0, 0, 0, 0],
			operation: 1
		},
	},
	// 'mutantmonsters:mutant_skeleton': {
	// 	'generic.armor': {
	// 		values: [3, 8, 8, 7],
	// 		operation: 0
	// 	},
	// 	'attributeslib:arrow_damage': {
	// 		values: [-0.25, 0, 0, 0],
	// 		operation: 0
	// 	},
	// 	'attributeslib:arrow_velocity': {
	// 		values: [0, 0.3, 0, 0],
	// 		operation: 0
	// 	},
	// 	'attributeslib:draw_speed': {
	// 		values: [0, 0.33, 0, 0],
	// 		operation: 0
	// 	},
	// 	'generic.movement_speed': {
	// 		values: [0, 0, 0, 0.15],
	// 		operation: 2
	// 	},
	// },
	'cataclysm:bone_reptile': {
		'generic.armor': {
			values: [11, 16, 0, 0],
			operation: 0
		},
		'attributeslib:arrow_damage': {
			values: [0, 0.15, 0, 0],
			operation: 0
		},
		'attributeslib:arrow_velocity': {
			values: [0.33, 0, 0, 0],
			operation: 0
		},
		'attributeslib:draw_speed': {
			values: [0, 0.25, 0, 0],
			operation: 0
		}
	},
	'cataclysm:ignitium': {
		'generic.armor': {
			values: [11, 14, 13, 10],
			operation: 0
		},
		'generic.knockback_resistance': {
			values: [0.1, 0.1, 0.1, 0.1],
			operation: 0
		},
		'generic.attack_damage': {
			values: [0, 0.15, 0, 0],
			operation: 2
		},
		'generic.movement_speed': {
			values: [0, 0, 0.06, 0.06],
			operation: 1
		}
	},
	'cataclysm:cursium': {
		'generic.armor': {
			values: [11, 14, 13, 10],
			operation: 0
		},
		'generic.knockback_resistance': {
			values: [0.1, 0.1, 0.1, 0.1],
			operation: 0
		},
		'attributeslib:arrow_damage': {
			values: [0, 0.2, 0, 0],
			operation: 1
		},
		'attributeslib:armor_pierce': {
			values: [5, 0, 0, 0],
			operation: 0
		},
		'generic.movement_speed': {
			values: [0, 0, 0.06, 0.03],
			operation: 1
		}
	},
	'aquamirae:terrible': {
		'generic.armor': {
			values: [5, 7, 6, 5],
			operation: 0
		},
	},
	'aether:zanite': {
		'generic.armor': {
			values: [5, 8, 7, 5],
			operation: 0
		},
	},
	'aether:gravitite': {
		'generic.armor': {
			values: [7, 10, 9, 7],
			operation: 0
		},
	},
	'aether:neptune': {
		'generic.armor': {
			values: [6, 9, 7, 5],
			operation: 0
		},
	},
	'aether:valkyrie': {
		'generic.armor': {
			values: [7, 10, 9, 7],
			operation: 0
		},
	},
	'aether:phoenix': {
		'generic.armor': {
			values: [7, 9, 8, 7],
			operation: 0
		},
		'attributeslib:fire_damage': {
			values: [0, 2, 1, 0],
			operation: 0
		},
	},
	'aether:obsidian': {
		'generic.armor': {
			values: [7, 9, 8, 7],
			operation: 0
		}
	},
	'born_in_chaos_v1:nigthmare_mantleofthe_night': {
		'generic.armor': {
			values: [6, 8, 7, 5],
			operation: 0
		},
		'ars_nouveau:ars_nouveau.perk.max_mana': {
			values: [0, 40, 0, 0],
			operation: 0
		},
		'ars_nouveau:ars_nouveau.perk.mana_regen': {
			values: [0, 0, 0, 3],
			operation: 0
		},
		'attributeslib:crit_chance': {
			values: [0, 0, 0.07, 0],
			operation: 1
		}
	},
	'born_in_chaos_v1:dark_metal_armor': {
		'generic.armor': {
			values: [9, 12, 11, 8],
			operation: 0
		},
		'generic.knockback_resistance': {
			values: [0.1, 0.1, 0.1, 0.1],
			operation: 0
		},
		'generic.movement_speed': {
			values: [0, 0, 0.06, 0],
			operation: 1
		}
	},
}
