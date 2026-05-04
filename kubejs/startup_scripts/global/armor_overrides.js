// Percent
function p(num) {
	return num / 100;
}

global.armorOverrides = {
	'create:cardboard': {
		'generic.armor': {
			values: [0, 1, 1, 0],
			operation: 'addition'
		},
	},
	'minecraft:leather': {
		'generic.armor': {
			values: [1, 2, 2, 1],
			operation: 'addition'
		},
	},
	'minecraft:chainmail': {
		'generic.armor': {
			values: [2, 3, 3, 2],
			operation: 'addition'
		},
		'adjcore:generic.projectile_damage_reduction': {
			values: [p(2.5), p(5), p(2.5), 0],
			operation: 'addition'
		},
		'generic.movement_speed': {
			values: [0, 0, 0, p(4)],
			operation: 'multiply_base'
		},
	},
	'rediscovered:studded': {
		'generic.armor': {
			values: [2, 3, 3, 2],
			operation: 'addition'
		},
		'adjcore:generic.projectile_damage_reduction': {
			values: [p(2.5), p(5), p(2.5), 0],
			operation: 'addition'
		},
		'generic.movement_speed': {
			values: [0, 0, 0, p(4)],
			operation: 'multiply_base'
		},

	},
	'mythicmetals:osmium_chainmail': {
		'generic.armor': {
			values: [3, 5, 4, 3],
			operation: 'addition'
		},
		'generic.knockback_resistance': {
			values: [0, p(10), 0, p(5)],
			operation: 'addition'
		},
		'adjcore:generic.projectile_damage_reduction': {
			values: [p(2.5), p(5), p(2.5), 0],
			operation: 'addition'
		},
		'generic.movement_speed': {
			values: [0, 0, 0, p(4)],
			operation: 'multiply_base'
		},
	},
	'rediscovered:plate': {
		'generic.armor': {
			values: [3, 4, 3, 2],
			operation: 'addition'
		},
	},
	'minecraft:iron': {
		'generic.armor': {
			values: [3, 4, 3, 2],
			operation: 'addition'
		},
	},
	'additionaladditions:rose_gold': {
		'generic.armor': {
			values: [3, 5, 4, 3],
			operation: 'addition'
		},
		'generic.knockback_resistance': {
			values: [0, 0.1, 0, 0],
			operation: 'addition'
		},
		'generic.movement_speed': {
			values: [0, 0, 0.03, 0],
			operation: 'multiply_base'
		}
	},
	'minecraft:diamond': {
		'generic.armor': {
			values: [6, 8, 7, 5],
			operation: 'addition'
		},
		'generic.knockback_resistance': {
			values: [0, 0.1, 0, 0.025],
			operation: 'addition'
		},
		'generic.movement_speed': {
			values: [0, 0, 0.03, 0],
			operation: 'multiply_base'
		}
	},
	'cataclysm:monstrous': {
		'generic.armor': {
			values: [9, 0, 0, 0],
			operation: 'addition'
		},
		'adjcore:generic.health_regeneration': {
			values: [0.5, 0, 0, 0],
			operation: 'addition'
		}
	},
	'minecraft:netherite': {
		'generic.armor': {
			values: [9, 12, 11, 8],
			operation: 'addition'
		},
		'generic.knockback_resistance': {
			values: [p(2.5), p(10), p(5), p(2.5)],
			operation: 'addition'
		},
		'generic.movement_speed': {
			values: [0, 0, p(6), 0],
			operation: 'multiply_base'
		}
	},
	'majruszsdifficulty:enderium': {
		'generic.armor': {
			values: [12, 15, 14, 11],
			operation: 'addition'
		},
		'generic.knockback_resistance': {
			values: [0.05, 0.1, 0.1, 0.05],
			operation: 'addition'
		},
		'generic.movement_speed': {
			values: [0, 0, 0.08, 0],
			operation: 'multiply_base'
		}
	},
	'mythicmetals:metallurgium': {
		'generic.armor': {
			values: [16, 19, 18, 15],
			operation: 'addition'
		},
		'generic.knockback_resistance': {
			values: [0.1, 0.1, 0.1, 0.1],
			operation: 'addition'
		},
		'generic.movement_speed': {
			values: [0, 0, 0.1, 0],
			operation: 'multiply_base'
		}
	},
	'mythicmetals:adamantite': {
		'generic.armor': {
			values: [10, 12, 11, 9],
			operation: 'addition'
		},
		'generic.knockback_resistance': {
			values: [0, 0, 0.15, 0],
			operation: 'addition'
		},
		'generic.movement_speed': {
			values: [0, 0, 0, 0.05],
			operation: 'multiply_base'
		}
	},
	'mythicmetals:orichalcum': {
		'generic.armor': {
			values: [4, 6, 5, 3],
			operation: 'addition'
		},
	},
	'mythicmetals:runite': {
		'generic.armor': {
			values: [2, 4, 3, 2],
			operation: 'addition'
		},
		'ars_nouveau:ars_nouveau.perk.max_mana': {
			values: [0, 20, 20, 0],
			operation: 'addition'
		},
		'ars_nouveau:ars_nouveau.perk.mana_regen': {
			values: [1, 1, 0, 0],
			operation: 'addition'
		},
		'ars_nouveau:ars_nouveau.perk.spell_damage': {
			values: [1, 1, 0, 0],
			operation: 'addition'
		},
		'adjcore:player.mana_cost_reduction': {
			values: [0, 0, p(5), 0]
		}
	},
	'ars_nouveau:arcanist_0': {
		'generic.armor': {
			values: [4, 5, 4, 3],
			operation: 'addition'
		},
		'ars_nouveau:ars_nouveau.perk.max_mana': {
			values: [0, 40, 30, 0],
			operation: 'addition'
		},
		'ars_nouveau:ars_nouveau.perk.mana_regen': {
			values: [4, 0, 0, 0],
			operation: 'addition'
		},
		'generic.movement_speed': {
			values: [0, 0, 0, 0.04],
			operation: 'multiply_base'
		},
		'adjcore:player.mana_cost_reduction': {
			values: [0, 0, p(7.5), 0]
		}
	},
	'ars_nouveau:arcanist_1': {
		'generic.armor': {
			values: [5, 7, 6, 4],
			operation: 'addition'
		},
		'ars_nouveau:ars_nouveau.perk.max_mana': {
			values: [0, 60, 40, 10],
			operation: 'addition'
		},
		'ars_nouveau:ars_nouveau.perk.mana_regen': {
			values: [4, 1, 0, 0],
			operation: 'addition'
		},
		'generic.movement_speed': {
			values: [0, 0, 0, 0.04],
			operation: 'multiply_base'
		},
		'adjcore:player.mana_cost_reduction': {
			values: [0, 0, p(10), 0]
		}
	},
	'ars_nouveau:arcanist_2': {
		'generic.armor': {
			values: [8, 10, 9, 7],
			operation: 'addition'
		},
		'ars_nouveau:ars_nouveau.perk.max_mana': {
			values: [20, 60, 40, 20],
			operation: 'addition'
		},
		'ars_nouveau:ars_nouveau.perk.mana_regen': {
			values: [4, 3, 0, 0],
			operation: 'addition'
		},
		'generic.movement_speed': {
			values: [0, 0, 0, 0.08],
			operation: 'multiply_base'
		},
		'adjcore:player.mana_cost_reduction': {
			values: [0, 0, p(12.5), 0]
		}
	},
	'ars_elemental:fire': {
		'generic.armor': {
			values: [13, 16, 14, 13],
			operation: 'addition'
		},
		'ars_nouveau:ars_nouveau.perk.max_mana': {
			values: [30, 70, 50, 30],
			operation: 'addition'
		},
		'ars_nouveau:ars_nouveau.perk.mana_regen': {
			values: [7, 3, 0, 0],
			operation: 'addition'
		},
		'generic.movement_speed': {
			values: [0, 0, 0, 0.12],
			operation: 'multiply_base'
		},
		'attributeslib:crit_chance': {
			values: [0, 0, 0.15, 0],
			operation: 'addition'
		},
		'adjcore:player.mana_cost_reduction': {
			values: [0, 0, p(15), 0]
		}
	},
	'ars_elemental:aqua': {
		'generic.armor': {
			values: [13, 16, 14, 13],
			operation: 'addition'
		},
		'ars_nouveau:ars_nouveau.perk.max_mana': {
			values: [30, 70, 50, 30],
			operation: 'addition'
		},
		'ars_nouveau:ars_nouveau.perk.mana_regen': {
			values: [7, 3, 0, 0],
			operation: 'addition'
		},
		'generic.movement_speed': {
			values: [0, 0, 0, 0.12],
			operation: 'multiply_base'
		},
		'attributeslib:crit_chance': {
			values: [0, 0, 0.15, 0],
			operation: 'addition'
		},
		'adjcore:player.mana_cost_reduction': {
			values: [0, 0, p(15), 0]
		}
	},
	'ars_elemental:earth': {
		'generic.armor': {
			values: [13, 16, 14, 13],
			operation: 'addition'
		},
		'ars_nouveau:ars_nouveau.perk.max_mana': {
			values: [30, 70, 50, 30],
			operation: 'addition'
		},
		'ars_nouveau:ars_nouveau.perk.mana_regen': {
			values: [7, 3, 0, 0],
			operation: 'addition'
		},
		'generic.movement_speed': {
			values: [0, 0, 0, 0.12],
			operation: 'multiply_base'
		},
		'attributeslib:crit_chance': {
			values: [0, 0, 0.15, 0],
			operation: 'addition'
		},
		'adjcore:player.mana_cost_reduction': {
			values: [0, 0, p(15), 0]
		}
	},
	'ars_elemental:air': {
		'generic.armor': {
			values: [13, 16, 14, 13],
			operation: 'addition'
		},
		'ars_nouveau:ars_nouveau.perk.max_mana': {
			values: [30, 70, 50, 30],
			operation: 'addition'
		},
		'ars_nouveau:ars_nouveau.perk.mana_regen': {
			values: [7, 3, 0, 0],
			operation: 'addition'
		},
		'generic.movement_speed': {
			values: [0, 0, 0, 0.12],
			operation: 'multiply_base'
		},
		'attributeslib:crit_chance': {
			values: [0, 0, 0.15, 0],
			operation: 'addition'
		},
		'adjcore:player.mana_cost_reduction': {
			values: [0, 0, p(15), 0]
		}
	},
	'mythicmetals:bronze': {
		'generic.armor': {
			values: [4, 5, 4, 3],
			operation: 'addition'
		}
	},
	'mythicmetals:steel': {
		'generic.armor': {
			values: [6, 8, 7, 5],
			operation: 'addition'
		},
		'generic.movement_speed': {
			values: [0, p(-5), p(-2.5), p(-2.5)],
			operation: 'multiply_base'
		}
	},
	'mythicmetals:kyber': {
		'generic.armor': {
			values: [2, 5, 3, 2],
			operation: 'addition'
		}
	},
	'minecraft:golden': {
		'generic.armor': {
			values: [1, 3, 2, 1],
			operation: 'addition'
		}
	},
	'mythicmetals:midas_gold': {
		'generic.armor': {
			values: [4, 6, 5, 4],
			operation: 'addition'
		},
		'generic.luck': {
			values: [2, 0, 0, 0],
			operation: 'addition'
		},
		'attributeslib:crit_chance': {
			values: [0, 0.05, 0.1, 0],
			operation: 'addition'
		}
	},
	'mythicmetals:palladium': {
		'generic.armor': {
			values: [7, 8, 7, 6],
			operation: 'addition'
		}
	},
	'mythicmetals:prometheum': {
		'generic.armor': {
			values: [4, 6, 6, 4],
			operation: 'addition'
		},
		'attributeslib:life_steal': {
			values: [0, 0.065, 0, 0],
			operation: 'addition'
		}
	},
	'botania:manasteel': {
		'generic.armor': {
			values: [3, 5, 5, 2],
			operation: 'addition'
		},
		'adjcore:player.mana_cost_reduction': {
			values: [0, 0, p(5), p(3)]
		},
		'ars_nouveau:ars_nouveau.perk.max_mana': {
			values: [40, 0, 0, 0],
			operation: 'addition'
		},
		'ars_nouveau:ars_nouveau.perk.mana_regen': {
			values: [0, 0, 0, 3],
			operation: 'addition'
		},
	},
	'botania:manaweave': {
		'generic.armor': {
			values: [2, 3, 2, 1],
			operation: 'addition'
		},
		'ars_nouveau:ars_nouveau.perk.max_mana': {
			values: [40, 40, 0, 0],
			operation: 'addition'
		},
		'ars_nouveau:ars_nouveau.perk.mana_regen': {
			values: [0, 0, 0, 7],
			operation: 'addition'
		},
	},
	'botania:terrasteel': {
		'generic.armor': {
			values: [11, 13, 12, 10],
			operation: 'addition'
		},
		'generic.knockback_resistance': {
			values: [0, 0.1, 0, 0.1],
			operation: 'addition'
		},
		'adjcore:player.mana_cost_reduction': {
			values: [0, 0, p(5), p(3)]
		},
		'ars_nouveau:ars_nouveau.perk.max_mana': {
			values: [40, 60, 0, 0],
			operation: 'addition'
		},
		'ars_nouveau:ars_nouveau.perk.mana_regen': {
			values: [0, 0, 4, 3],
			operation: 'addition'
		},
	},
	'mythicmetals:tidesinger': {
		'generic.armor': {
			values: [5, 8, 7, 5],
			operation: 'addition'
		},
		'forge:swim_speed': {
			values: [0, 0.05, 0.3, 0.35],
			operation: 'multiply_base'
		},
		'additionalentityattributes:player.water_visibility': {
			values: [0.25, 0, 0, 0],
			operation: 'multiply_base'
		},
	},
	'mythicmetals:aquarium': {
		'generic.armor': {
			values: [3, 4, 3, 2],
			operation: 'addition'
		},
		'forge:swim_speed': {
			values: [0, 0.05, 0.1, 0.15],
			operation: 'multiply_base'
		},
		'additionalentityattributes:player.water_visibility': {
			values: [0, 0, 0, 0],
			operation: 'multiply_base'
		},
	},
	'mythicmetals:aquarium': {
		'generic.armor': {
			values: [3, 4, 3, 2],
			operation: 'addition'
		},
		'additionalentityattributes:player.water_visibility': {
			values: [0, 0, 0, 0],
			operation: 'addition'
		},
		'additionalentityattributes:generic.water_speed': {
			values: [0, 0, 0, 0],
			operation: 'addition'
		},
		'forge:swim_speed': {
			values: [0, 0.05, 0.1, 0.15],
			operation: 'multiply_base'
		},
		'additionalentityattributes:player.water_visibility': {
			values: [0, 0, 0, 0],
			operation: 'multiply_base'
		},
	},
	'cataclysm:bone_reptile': {
		'generic.armor': {
			values: [7, 8, 0, 0],
			operation: 'addition'
		},
		'attributeslib:arrow_damage': {
			values: [0, 0.15, 0, 0],
			operation: 'addition'
		},
		'attributeslib:arrow_velocity': {
			values: [0.33, 0, 0, 0],
			operation: 'addition'
		},
		'attributeslib:draw_speed': {
			values: [0, 0.25, 0, 0],
			operation: 'addition'
		}
	},
	'cataclysm:ignitium': {
		'generic.armor': {
			values: [11, 14, 13, 10],
			operation: 'addition'
		},
		'generic.knockback_resistance': {
			values: [0.1, 0.1, 0.1, 0.1],
			operation: 'addition'
		},
		'generic.attack_damage': {
			values: [0, 0.15, 0, 0],
			operation: 'multiply_total'
		},
		'generic.movement_speed': {
			values: [0, 0, 0.06, 0.06],
			operation: 'multiply_base'
		}
	},
	'cataclysm:cursium': {
		'generic.armor': {
			values: [11, 14, 13, 10],
			operation: 'addition'
		},
		'generic.knockback_resistance': {
			values: [0.1, 0.1, 0.1, 0.1],
			operation: 'addition'
		},
		'attributeslib:arrow_damage': {
			values: [0, 0.2, 0, 0],
			operation: 'multiply_base'
		},
		'attributeslib:armor_pierce': {
			values: [5, 0, 0, 0],
			operation: 'addition'
		},
		'generic.movement_speed': {
			values: [0, 0, 0.06, 0.03],
			operation: 'multiply_base'
		}
	},
	'aquamirae:terrible': {
		'generic.armor': {
			values: [5, 7, 6, 5],
			operation: 'addition'
		},
	},
	'aether:zanite': {
		'generic.armor': {
			values: [5, 8, 7, 5],
			operation: 'addition'
		},
	},
	'mythicmetals:stormyx': {
		'generic.armor': {
			values: [6, 8, 7, 6],
			operation: 'addition'
		},
		'generic.movement_speed': {
			values: [0, 0, 0, 0.04],
			operation: 'multiply_base'
		},
	},
	'aether:gravitite': {
		'generic.armor': {
			values: [7, 10, 9, 7],
			operation: 'addition'
		},
	},
	'aether:neptune': {
		'generic.armor': {
			values: [6, 9, 7, 5],
			operation: 'addition'
		},
	},
	'ancient_aether:valkyrum': {
		'generic.armor': {
			values: [7, 10, 9, 7],
			operation: 'addition'
		},
	},
	'aether:phoenix': {
		'generic.armor': {
			values: [7, 9, 8, 7],
			operation: 'addition'
		},
		'attributeslib:fire_damage': {
			values: [0, 2, 1, 0],
			operation: 'addition'
		},
	},
	'aether:obsidian': {
		'generic.armor': {
			values: [7, 9, 8, 7],
			operation: 'addition'
		}
	},
	'born_in_chaos_v1:nightmare_mantleofthe_night': {
		'generic.armor': {
			values: [6, 8, 7, 5],
			operation: 'addition'
		},
		'ars_nouveau:ars_nouveau.perk.max_mana': {
			values: [0, 100, 0, 0],
			operation: 'addition'
		},
		'ars_nouveau:ars_nouveau.perk.mana_regen': {
			values: [0, 0, 2, 4],
			operation: 'addition'
		},
		'attributeslib:crit_chance': {
			values: [0, 0, 0.07, 0],
			operation: 'multiply_base'
		},
		'adjcore:player.mana_cost_reduction': {
			values: [0, p(15), 0, 0]
		}
	},
	'born_in_chaos_v1:dark_metal_armor': {
		'generic.armor': {
			values: [10, 13, 12, 10],
			operation: 'addition'
		},
		'generic.knockback_resistance': {
			values: [0.1, 0.1, 0.1, 0.1],
			operation: 'addition'
		},
		'generic.movement_speed': {
			values: [0, 0, 0.06, 0],
			operation: 'multiply_base'
		}
	},
	'twilightforest:ironwood': {
		'generic.armor': {
			values: [3, 4, 4, 3],
			operation: 'addition'
		},
		'attributeslib:mining_speed': {
			values: [0, 0.12, 0.05, 0],
			operation: 'addition',
		},
		'generic.movement_speed': {
			values: [0, 0, 0, 0.04],
			operation: 'multiply_base'
		}
	},
	'mythicmetals:mythril': {
		'generic.armor': {
			values: [9, 10, 9, 8],
			operation: 'addition'
		},
		'attributeslib:mining_speed': {
			values: [0.04, 0.18, 0.09, 0],
			operation: 'addition',
		},
		'generic.movement_speed': {
			values: [0, 0, 0, 0.06],
			operation: 'multiply_base'
		}
	},
	'twilightforest:knigthmetal': {
		'generic.armor': {
			values: [6, 9, 8, 7],
			operation: 'addition'
		},
		'generic.movement_speed': {
			values: [0, p(-5), p(-4), p(-3)],
			operation: 'multiply_base'
		},
		'adjcore:generic.damage_reduction': {
			values: [0, 0, 0.04, 0],
			operation: 'multiply_base'
		},
		'adjcore:generic.health_regeneration': {
			values: [0, 1, 0, 0],
			operation: 'multiply_base'
		}
	},
	'twilightforest:naga': {
		'generic.armor': {
			values: [0, 5, 4, 0],
			operation: 'addition'
		},
		'generic.movement_speed': {
			values: [0, 0, 0.12, 0],
			operation: 'multiply_base'
		},
		'adjcore:generic.health_regeneration': {
			values: [0, 2.5, 0, 0],
			operation: 'addition'
		}
	}
}
