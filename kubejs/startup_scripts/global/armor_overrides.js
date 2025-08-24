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
	'mythicmetals:runite': {
		'generic.armor': {
			values: [2, 4, 3, 2],
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
	'minecraft:iron': {
		'generic.armor': {
			values: [3, 5, 4, 3],
			operation: 0
		},
	},
	'minecraft:diamond': {
		'generic.armor': {
			values: [4, 6, 5, 3],
			operation: 0
		},
	},
	'mythicmetals:orichalcum': {
		'generic.armor': {
			values: [4, 6, 5, 3],
			operation: 0
		},
	}
}
