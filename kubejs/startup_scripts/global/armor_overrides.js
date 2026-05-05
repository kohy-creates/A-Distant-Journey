// Percent
function p(num) {
	return num / 100;
}

global.armorOverrides = {
	'create:cardboard': {
		'generic.armor': {
			values: [0, 1, 0, 0]
		},
	},
	'minecraft:leather': {
		'generic.armor': {
			values: [1, 2, 2, 1]
		},
	},
	'minecraft:chainmail': {
		'generic.armor': {
			values: [2, 3, 2, 2]
		},
	},
	'rediscovered:studded': {
		'generic.armor': {
			values: [3, 4, 3, 3]
		},
	},
	'mythicmetals:osmium_chainmail': {
		'generic.armor': {
			values: [4, 5, 4, 4]
		},
		'generic.knockback_resistance': {
			values: [0, p(10), 0, p(5)]
		},
	},
	'rediscovered:plate': {
		'generic.armor': {
			values: [3, 4, 3, 2]
		},
		'generic.movement_speed': {
			values: [p(-3.5), p(-3.5), p(-3.5), p(-3.5)],
			operation: 'multiply_base'
		},
		'adjcore:generic.damage_reduction': {
			values: [0, p(5), 0, 0]
		},
	},
	'minecraft:iron': {
		'generic.armor': {
			values: [3, 4, 3, 2]
		},
	},
	'additionaladditions:rose_gold': {
		'generic.armor': {
			values: [3, 5, 4, 3]
		},
		'generic.knockback_resistance': {
			values: [0, 0.05, 0, 0.025]
		},
		'generic.attack_damage': {
			values: [0, p(3), 0, p(3)],
			operation: 'multiply_base'
		}
	},
	'minecraft:diamond': {
		'generic.armor': {
			values: [6, 7, 8, 6]
		},
		'generic.knockback_resistance': {
			values: [0, 0.1, 0, 0.05]
		},
		'generic.attack_damage': {
			values: [0, p(6), 0, p(4)],
			operation: 'multiply_base'
		}
	},
	'cataclysm:monstrous': {
		'generic.armor': {
			values: [12, 0, 0, 0]
		},
		'adjcore:generic.health_regeneration': {
			values: [1.5, 0, 0, 0]
		},
		'kubejs:damage_dealt': {
			values: [p(15), 0, 0, 0],
			operation: 'multiply_base'
		}
	},
	'minecraft:netherite': {
		'generic.armor': {
			values: [10, 13, 12, 9]
		},
		'generic.knockback_resistance': {
			values: [p(2.5), p(12.5), p(5), p(5)]
		},
		'generic.movement_speed': {
			values: [0, 0, 0, p(6)],
			operation: 'multiply_base'
		},
		'generic.attack_damage': {
			values: [p(6), p(12), p(6), 0],
			operation: 'multiply_base'
		},
		'attributeslib:crit_chance': {
			values: [0.04, 0, 0.02, 0]
		}
	},
	'twilightforest:fiery': {
		'generic.armor': {
			values: [9, 10, 10, 8]
		},
		'generic.knockback_resistance': {
			values: [0, 0, p(12.5), 0]
		},
		'adjcore:generic.health_regeneration': {
			values: [1, 1, 0, 0]
		},
		'attributeslib:crit_chance': {
			values: [, 0.04, 0.06, 0]
		}
	},
	'majruszsdifficulty:enderium': {
		'generic.armor': {
			values: [14, 15, 14, 13]
		},
		'generic.knockback_resistance': {
			values: [0.05, 0.1, 0.1, 0.05]
		},
		'generic.movement_speed': {
			values: [0, 0, 0, p(8)],
			operation: 'multiply_base'
		},
		'generic.attack_damage': {
			values: [p(10), p(16), p(10), 0],
			operation: 'multiply_base'
		},
		'attributeslib:crit_chance': {
			values: [0.04, 0, 0.02, 0]
		}
	},
	'mythicmetals:metallurgium': {
		'generic.armor': {
			values: [17, 19, 18, 16]
		},
		'generic.knockback_resistance': {
			values: [0.1, 0.1, 0.1, 0.1]
		},
		'generic.movement_speed': {
			values: [0, 0, 0, p(10)],
			operation: 'multiply_base'
		},
		'generic.attack_damage': {
			values: [p(10), p(20), p(12), p(8)],
			operation: 'multiply_base'
		},
		'attributeslib:crit_chance': {
			values: [0.05, 0, 0.05, 0]
		}
	},
	'mythicmetals:adamantite': {
		'generic.armor': {
			values: [10, 12, 11, 9]
		},
		'generic.knockback_resistance': {
			values: [0, 0, 0.15, 0]
		},
		'generic.movement_speed': {
			values: [0, 0, 0.04, 0.08],
			operation: 'multiply_base'
		},
		'attributeslib:crit_chance': {
			values: [0.08, 0, 0, 0]
		}
	},
	'mythicmetals:orichalcum': {
		'generic.armor': {
			values: [5, 6, 6, 5]
		},
	},
	'mythicmetals:runite': {
		'generic.armor': {
			values: [2, 4, 3, 2]
		},
		'ars_nouveau:ars_nouveau.perk.max_mana': {
			values: [0, 20, 20, 0]
		},
		'ars_nouveau:ars_nouveau.perk.mana_regen': {
			values: [1, 1, 0, 0]
		},
		'ars_nouveau:ars_nouveau.perk.spell_damage': {
			values: [0, 5, 0, 2]
		},
		'adjcore:player.mana_cost_reduction': {
			values: [0, 0, p(5), 0]
		}
	},
	'ars_nouveau:arcanist_0': {
		'generic.armor': {
			values: [4, 5, 4, 3]
		},
		'ars_nouveau:ars_nouveau.perk.max_mana': {
			values: [0, 40, 30, 0]
		},
		'ars_nouveau:ars_nouveau.perk.mana_regen': {
			values: [4, 0, 0, 0]
		},
		'generic.movement_speed': {
			values: [0, 0, 0, 0.04],
			operation: 'multiply_base'
		},
		'adjcore:player.mana_cost_reduction': {
			values: [0, 0, p(7.5), p(2.5)]
		},
		'ars_nouveau:ars_nouveau.perk.spell_damage': {
			values: [0, 7, 0, 5]
		},
	},
	'ars_nouveau:arcanist_1': {
		'generic.armor': {
			values: [5, 7, 6, 4]
		},
		'ars_nouveau:ars_nouveau.perk.max_mana': {
			values: [0, 40, 40, 20]
		},
		'ars_nouveau:ars_nouveau.perk.mana_regen': {
			values: [4, 2, 0, 0]
		},
		'generic.movement_speed': {
			values: [0, 0, 0, 0.06],
			operation: 'multiply_base'
		},
		'adjcore:player.mana_cost_reduction': {
			values: [0, 0, p(10), p(2.5)]
		},
		'ars_nouveau:ars_nouveau.perk.spell_damage': {
			values: [0, 20, 0, 10]
		},
	},
	'ars_nouveau:arcanist_2': {
		'generic.armor': {
			values: [8, 10, 9, 7]
		},
		'ars_nouveau:ars_nouveau.perk.max_mana': {
			values: [20, 60, 40, 20]
		},
		'ars_nouveau:ars_nouveau.perk.mana_regen': {
			values: [4, 3, 0, 0]
		},
		'generic.movement_speed': {
			values: [0, 0, 0, 0.08],
			operation: 'multiply_base'
		},
		'adjcore:player.mana_cost_reduction': {
			values: [0, 0, p(12.5), 0]
		},
		'ars_nouveau:ars_nouveau.perk.spell_damage': {
			values: [40, 50, 20, 20]
		},
	},
	'ars_elemental:fire': {
		'generic.armor': {
			values: [13, 16, 14, 13]
		},
		'ars_nouveau:ars_nouveau.perk.max_mana': {
			values: [30, 70, 50, 30]
		},
		'ars_nouveau:ars_nouveau.perk.mana_regen': {
			values: [7, 3, 0, 0]
		},
		'generic.movement_speed': {
			values: [0, 0, 0, 0.12],
			operation: 'multiply_base'
		},
		'attributeslib:crit_chance': {
			values: [0, 0, 0.15, 0]
		},
		'adjcore:player.mana_cost_reduction': {
			values: [0, 0, p(15), 0]
		},
		'ars_nouveau:ars_nouveau.perk.spell_damage': {
			values: [40, 50, 20, 20]
		},
	},
	'ars_elemental:aqua': {
		'generic.armor': {
			values: [13, 16, 14, 13]
		},
		'ars_nouveau:ars_nouveau.perk.max_mana': {
			values: [30, 70, 50, 30]
		},
		'ars_nouveau:ars_nouveau.perk.mana_regen': {
			values: [7, 3, 0, 0]
		},
		'generic.movement_speed': {
			values: [0, 0, 0, 0.12],
			operation: 'multiply_base'
		},
		'attributeslib:crit_chance': {
			values: [0, 0, 0.15, 0]
		},
		'adjcore:player.mana_cost_reduction': {
			values: [0, 0, p(15), 0]
		},
		'ars_nouveau:ars_nouveau.perk.spell_damage': {
			values: [40, 50, 20, 20]
		},
	},
	'ars_elemental:earth': {
		'generic.armor': {
			values: [13, 16, 14, 13]
		},
		'ars_nouveau:ars_nouveau.perk.max_mana': {
			values: [30, 70, 50, 30]
		},
		'ars_nouveau:ars_nouveau.perk.mana_regen': {
			values: [7, 3, 0, 0]
		},
		'generic.movement_speed': {
			values: [0, 0, 0, 0.12],
			operation: 'multiply_base'
		},
		'attributeslib:crit_chance': {
			values: [0, 0, 0.15, 0]
		},
		'adjcore:player.mana_cost_reduction': {
			values: [0, 0, p(15), 0]
		},
		'ars_nouveau:ars_nouveau.perk.spell_damage': {
			values: [40, 50, 20, 20]
		},
	},
	'ars_elemental:air': {
		'generic.armor': {
			values: [13, 16, 14, 13]
		},
		'ars_nouveau:ars_nouveau.perk.max_mana': {
			values: [30, 70, 50, 30]
		},
		'ars_nouveau:ars_nouveau.perk.mana_regen': {
			values: [7, 3, 0, 0]
		},
		'generic.movement_speed': {
			values: [0, 0, 0, 0.12],
			operation: 'multiply_base'
		},
		'attributeslib:crit_chance': {
			values: [0, 0, 0.15, 0]
		},
		'adjcore:player.mana_cost_reduction': {
			values: [0, 0, p(15), 0]
		},
		'ars_nouveau:ars_nouveau.perk.spell_damage': {
			values: [40, 40, 20, 20]
		},
	},
	'mythicmetals:bronze': {
		'generic.armor': {
			values: [4, 5, 4, 3]
		}
	},
	'mythicmetals:steel': {
		'generic.armor': {
			values: [6, 8, 7, 6]
		},
		'generic.movement_speed': {
			values: [0, p(-5), p(-2.5), p(-2.5)],
			operation: 'multiply_base'
		}
	},
	'mythicmetals:kyber': {
		'generic.armor': {
			values: [2, 5, 3, 2]
		},
		'generic.attack_damage': {
			values: [1, 0, 0, 0]
		}
	},
	'minecraft:golden': {
		'generic.armor': {
			values: [1, 3, 2, 1]
		}
	},
	'mythicmetals:midas_gold': {
		'generic.armor': {
			values: [4, 6, 5, 4]
		},
		'generic.luck': {
			values: [2, 0, 0, 0]
		},
		'attributeslib:crit_chance': {
			values: [0, 0.05, 0.1, 0]
		}
	},
	'mythicmetals:palladium': {
		'generic.armor': {
			values: [7, 8, 7, 6]
		},
		'generic.attack_damage': {
			values: [p(9), p(7), p(5), 0],
			operation: 'multiply_base'
		},
		'generic.movement:speed': {
			values: [0, 0, 0, p(5)],
			operation: 'multiply_base'
		}
	},
	'mythicmetals:prometheum': {
		'generic.armor': {
			values: [17, 18, 18, 16]
		},
		'attributeslib:overheal': {
			values: [0, 0.08, 0, 0]
		},
		'generic.attack_speed': {
			values: [0, -0.2, 0, 0],
			operation: 'multiply_base'
		},
		'generic.movement_speed': {
			values: [p(-4), p(-4), p(-4), p(-4)],
			operation: 'multiply_base'
		},
		'generic.attack_damage': {
			values: [0, -0.3, 0, 0],
			operation: 'multiply_base'
		}
	},
	'botania:manasteel': {
		'generic.armor': {
			values: [4, 6, 5, 3]
		},
		'adjcore:player.mana_cost_reduction': {
			values: [0, 0, p(5), p(3)]
		},
		'ars_nouveau:ars_nouveau.perk.max_mana': {
			values: [40, 20, 0, 0]
		},
		'ars_nouveau:ars_nouveau.perk.mana_regen': {
			values: [0, 0, 0, 7]
		},
		'ars_nouveau:ars_nouveau.perk.spell_damage': {
			values: [0, 12, 0, 0]
		},
	},
	'botania:manaweave': {
		'generic.armor': {
			values: [2, 3, 2, 1]
		},
		'ars_nouveau:ars_nouveau.perk.max_mana': {
			values: [60, 40, 0, 40]
		},
		'ars_nouveau:ars_nouveau.perk.mana_regen': {
			values: [0, 0, 0, 11]
		},
		'ars_nouveau:ars_nouveau.perk.spell_damage': {
			values: [5, 10, 7, 3]
		},
	},
	'botania:terrasteel': {
		'generic.armor': {
			values: [12, 14, 13, 11]
		},
		'generic.knockback_resistance': {
			values: [0, 0.1, 0.1, 0.1]
		},
		'adjcore:player.mana_cost_reduction': {
			values: [p(10), 0, p(5), p(3)]
		},
		'ars_nouveau:ars_nouveau.perk.max_mana': {
			values: [40, 60, 40, 0]
		},
		'ars_nouveau:ars_nouveau.perk.mana_regen': {
			values: [0, 0, 4, 7]
		},
		'ars_nouveau:ars_nouveau.perk.spell_damage': {
			values: [0, 40, 10, 0]
		},
	},
	'mythicmetals:tidesinger': {
		'generic.armor': {
			values: [6, 8, 7, 5]
		},
		'forge:swim_speed': {
			values: [0, 0.05, 0.3, 0.35],
			operation: 'multiply_base'
		},
		'additionalentityattributes:player.water_visibility': {
			values: [0.25, 0, 0, 0],
			operation: 'multiply_base'
		}
	},
	'mythicmetals:aquarium': {
		'generic.armor': {
			values: [3, 4, 3, 2]
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
			values: [0, 0, 0, 0]
		},
		'attributeslib:arrow_damage': {
			values: [0.06, 0.12, 0, 0]
		},
		'attributeslib:arrow_velocity': {
			values: [0.33, 0, 0, 0]
		},
		'attributeslib:draw_speed': {
			values: [0, 0.33, 0, 0]
		}
	},
	'cataclysm:ignitium': {
		'generic.armor': {
			values: [11, 14, 13, 10]
		},
		'generic.knockback_resistance': {
			values: [0.1, 0.1, 0.1, 0.1]
		},
		'kubejs:damage_dealt': {
			values: [0, 0.15, 0, 0],
			operation: 'multiply_total'
		},
		'generic.movement_speed': {
			values: [0, 0, 0.06, 0.08],
			operation: 'multiply_base'
		},
		'combatroll:count': {
			values: [0, 0, 1, 0]
		},
	},
	'cataclysm:cursium': {
		'generic.armor': {
			values: [11, 14, 13, 10]
		},
		'generic.knockback_resistance': {
			values: [0.1, 0.1, 0.1, 0.1]
		},
		'attributeslib:arrow_damage': {
			values: [0, 0.2, 0, 0],
			operation: 'multiply_base'
		},
		'attributeslib:armor_pierce': {
			values: [5, 0, 0, 0]
		},
		'combatroll:count': {
			values: [0, 0, 1, 0]
		},
		'generic.movement_speed': {
			values: [0, 0, 0.06, 0.03],
			operation: 'multiply_base'
		}
	},
	'aquamirae:terrible': {
		'generic.armor': {
			values: [5, 7, 6, 5]
		},
	},
	'aether:zanite': {
		'generic.armor': {
			values: [6, 8, 7, 6]
		},
	},
	'mythicmetals:stormyx': {
		'generic.armor': {
			values: [8, 9, 9, 8]
		},
		'generic.movement_speed': {
			values: [0, 0, 0, 0.12],
			operation: 'multiply_base'
		},
		'forge:step_height_addition': {
			values: [0, 0, 0.5, 0]
		},
		'doublejumpattribute:doublejumpattribute': {
			values: [0, 0, 1, 0]
		}
	},
	'aether:gravitite': {
		'generic.armor': {
			values: [8, 9, 9, 7]
		},
		'forge:entity_gravity': {
			values: [p(-7), p(-7), p(-7), p(-7)],
			operation: 'multiply_base'
		},
	},
	'aether:neptune': {
		'generic.armor': {
			values: [9, 10, 10, 8]
		},
	},
	'ancient_aether:valkyrum': {
		'generic.armor': {
			values: [10, 11, 10, 9]
		},
		'forge:entity_gravity': {
			values: [p(-10), p(-10), p(-10), p(-10)],
			operation: 'multiply_base'
		},
	},
	'aether:phoenix': {
		'generic.armor': {
			values: [9, 11, 10, 9]
		},
		'attributeslib:fire_damage': {
			values: [0, 2, 1, 0]
		},
	},
	'aether:obsidian': {
		'generic.armor': {
			values: [10, 12, 12, 11]
		},
		'adjcore:generic.damage_reduction': {
			values: [p(2.5), p(7), 0, 0]
		},
		'generic.movement_speed': {
			values: [p(-4), p(-4), p(-4), p(-4)],
			operation: 'multiply_base'
		},
	},
	'born_in_chaos_v1:nightmare_mantleofthe_night': {
		'generic.armor': {
			values: [6, 8, 7, 6]
		},
		'ars_nouveau:ars_nouveau.perk.max_mana': {
			values: [0, 120, 0, 0]
		},
		'ars_nouveau:ars_nouveau.perk.mana_regen': {
			values: [0, 0, 2, 4]
		},
		'attributeslib:crit_chance': {
			values: [0, 0, 0.08, 0],
			operation: 'multiply_base'
		},
		'adjcore:player.mana_cost_reduction': {
			values: [0, p(15), 0, 0]
		},
		'ars_nouveau:ars_nouveau.perk.spell_damage': {
			values: [0, 0, 6, 8]
		},
	},
	'born_in_chaos_v1:dark_metal_armor': {
		'generic.armor': {
			values: [10, 13, 12, 10]
		},
		'generic.knockback_resistance': {
			values: [0.1, 0.1, 0.1, 0.1]
		},
		'generic.movement_speed': {
			values: [0, 0, 0, 0.06],
			operation: 'multiply_base'
		}
	},
	'twilightforest:ironwood': {
		'generic.armor': {
			values: [3, 4, 4, 3]
		},
		'attributeslib:mining_speed': {
			values: [0, 0.12, 0.05, 0],
		},
		'generic.movement_speed': {
			values: [0, 0, 0, 0.04],
			operation: 'multiply_base'
		}
	},
	'mythicmetals:mythril': {
		'generic.armor': {
			values: [10, 11, 10, 9]
		},
		'attributeslib:mining_speed': {
			values: [0.04, 0.18, 0.09, 0],
		},
		'generic.movement_speed': {
			values: [0, 0, 0, 0.06],
			operation: 'multiply_base'
		}
	},
	'twilightforest:knightmetal': {
		'generic.armor': {
			values: [6, 9, 8, 7]
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
			values: [0, 5, 4, 0]
		},
		'generic.movement_speed': {
			values: [0, 0, 0.12, 0],
			operation: 'multiply_base'
		},
		'adjcore:generic.health_regeneration': {
			values: [0, 2.5, 0, 0]
		}
	}
}
