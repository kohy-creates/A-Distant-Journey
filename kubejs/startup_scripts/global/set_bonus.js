const genericSetBonusUUID = '645bb590-a4ab-4c0c-bf19-653b14934698';
global.genericSetBonusUUID = genericSetBonusUUID;

global.setBonusMap = {
	'minecraft:iron': {
		description: [
			'Incoming damage reduced by 5%'
		],
		effects: [
			{
				type: 'attribute',
				value: {
					id: 'adjcore:generic.damage_reduction',
					value: 0.05,
					operation: 0
				}
			}
		]
	},
	'additionaladditions:rose_gold': {
		description: [
			'Incoming damage reduced by 5%'
		],
		effects: [
			{
				type: 'attribute',
				value: {
					id: 'adjcore:generic.damage_reduction',
					value: 0.05,
					operation: 0
				}
			}
		]
	},
	'minecraft:diamond': {
		description: [
			'Incoming damage reduced by 7%',
			'5% increased crit chance'
		],
		effects: [
			{
				type: 'attribute',
				value: {
					id: 'adjcore:generic.damage_reduction',
					value: 0.07,
					operation: 0
				}
			},
			{
				type: 'attribute',
				value: {
					id: 'attributeslib:crit_chance',
					value: 0.05,
					operation: 0
				}
			}
		]
	},
	'minecraft:netherite': {
		description: [
			'Incoming damage reduced by 10%',
			'5% increased crit chance',
			'Become immune to fire'
		],
		effects: [
			{
				type: 'attribute',
				value: {
					id: 'adjcore:generic.damage_reduction',
					value: 0.1,
					operation: 0
				}
			},
			{
				type: 'attribute',
				value: {
					id: 'attributeslib:crit_chance',
					value: 0.05,
					operation: 0
				}
			},
			{
				type: 'effect',
				value: {
					id: 'minecraft:fire_resistance',
					amplifier: 0,
				}
			}
		]
	},
	'majruszsdifficulty:enderium': {
		description: [
			'Incoming damage reduced by 10%',
			'10% increased crit chance',
			'Become immune to fire',
			'You will be saved if you fall into the void'
		],
		effects: [
			{
				type: 'attribute',
				value: {
					id: 'adjcore:generic.damage_reduction',
					value: 0.1,
					operation: 0
				}
			},
			{
				type: 'attribute',
				value: {
					id: 'attributeslib:crit_chance',
					value: 0.1,
					operation: 0
				}
			},
			{
				type: 'effect',
				value: {
					id: 'minecraft:fire_resistance',
					amplifier: 0,
				}
			}
		]
	},
	'minecraft:diamond': {
		description: [
			'Incoming damage reduced by 7%'
		],
		effects: [
			{
				type: 'attribute',
				value: {
					id: 'adjcore:generic.damage_reduction',
					value: 0.07,
					operation: 0
				}
			}
		]
	},
	'minecraft:leather': {
		description: [
			'15% increased movement speed'
		],
		effects: [
			{
				type: 'attribute',
				value: {
					id: 'minecraft:generic.movement_speed',
					value: 0.15,
					operation: 1
				}
			}
		]
	},
	'mythicmetals:osmium_chainmail': {
		description: [
			'Reduces incoming projectile damage by 10%',
			'Immunity to knockback'
		],
		effects: [
			{
				type: 'attribute',
				value: {
					id: 'adjcore:generic.projectile_damage_reduction',
					value: 0.1,
					operation: 0
				}
			},
			{
				type: 'attribute',
				value: {
					id: 'minecraft:generic.knockback_resistance',
					value: 1,
					operation: 0
				}
			}
		]
	},
	'minecraft:chainmail': {
		description: [
			'Reduces incoming projectile damage by 10%'
		],
		effects: [
			{
				type: 'attribute',
				value: {
					id: 'adjcore:generic.projectile_damage_reduction',
					value: 0.1,
					operation: 0
				}
			}
		]
	},
	'rediscovered:studded': {
		description: [
			'15% increased movement speed',
			'Reduces incoming projectile damage by 10%'
		],
		effects: [
			{
				type: 'attribute',
				value: {
					id: 'minecraft:generic.movement_speed',
					value: 0.15,
					operation: 1
				}
			},
			{
				type: 'attribute',
				value: {
					id: 'adjcore:generic.projectile_damage_reduction',
					value: 0.1,
					operation: 0
				}
			}
		]
	},
	'minecraft:golden': {
		description: [
			'Gained §aExperience §rincreased by §a30%'
		],
		effects: [
			{
				type: 'attribute',
				value: {
					id: 'attributeslib:experience_gained',
					value: 0.3,
					operation: 0
				}
			}
		]
	},
	'mythicmetals:runite': {
		description: [
			'Massively increased mana regeneration'
		],
		effects: [
			{
				type: 'attribute',
				value: {
					id: 'ars_nouveau:ars_nouveau.perk.mana_regen',
					value: 6,
					operation: 0
				}
			}
		]
	}
}
