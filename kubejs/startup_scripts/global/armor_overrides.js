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
			values: [5, 7, 6, 4],
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
			values: [5, 6, 6, 4],
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
			values: [5, 6, 6, 4],
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
}
