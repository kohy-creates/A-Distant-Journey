const genericSetBonusUUID = '645bb590-a4ab-4c0c-bf19-653b14934698';
global.genericSetBonusUUID = genericSetBonusUUID;

global.bonusOverrides = {
	// 'minecraft:iron': [
	// 	['minecraft:iron', 'minecraft:iron', 'minecraft:iron', 'minecraft:golden'], // 3 iron + 1 gold
	// 	['minecraft:iron', 'minecraft:iron', 'minecraft:iron', 'minecraft:air'] // just 3 iron
	// ],
	// 'minecraft:golden': [
	// 	['minecraft:golden', 'minecraft:golden', 'minecraft:golden', 'minecraft:air'] // 3 gold
	// ]
	'minecraft:netherite': [
		['minecraft:netherite', 'minecraft:netherite', 'minecraft:netherite', 'cataclysm:monstrous']
	]
}

global.armorSuffixes = {
	head: ['_helmet', '_helm', '_hood', '_skull'],
	chest: ['_chestplate', '_tunic', '_robes'],
	legs: ['_leggings', '_pants'],
	feet: ['_boots']
};

global.setBonusMap = {
	'minecraft:iron': {
		description: [
			'2 extra defense',
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
			},
			{
				type: 'attribute',
				value: {
					id: 'generic.armor',
					value: 2,
					operation: 0
				}
			}
		]
	},
	'additionaladditions:rose_gold': {
		description: [
			'2 defense',
			'Incoming damage reduced by 5%'
		],
		effects: [
			{
				type: 'attribute',
				value: {
					id: 'generic.armor',
					value: 2,
					operation: 0
				}
			},
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
			}
		]
	},
	'minecraft:netherite': {
		description: [
			'Incoming damage reduced by 7%',
			'5% increased crit chance',
			'Become immune to fire'
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
	'mythicmetals:adamantite': {
		description: [
			'Press \'R\' to perform a rapid dash',
			'Well-timed dash can dodge damage',
			'10% increased movement speed'
		],
		effects: [
			{
				type: 'attribute',
				value: {
					id: 'combatroll:count',
					value: 1,
					operation: 0
				}
			},
			{
				type: 'attribute',
				value: {
					id: 'combatroll:recharge',
					value: 0.15,
					operation: 1
				}
			},
			{
				type: 'attribute',
				value: {
					id: 'combatroll:distance',
					value: 4,
					operation: 0
				}
			},
			{
				type: 'attribute',
				value: {
					id: 'generic.movement_speed',
					value: 0.1,
					operation: 1
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
	'mythicmetals:metallurgium': {
		description: [
			'Incoming damage reduced by 15%',
			'15% increased crit chance',
			'Become immune to fire',
		],
		effects: [
			{
				type: 'attribute',
				value: {
					id: 'adjcore:generic.damage_reduction',
					value: 0.15,
					operation: 0
				}
			},
			{
				type: 'attribute',
				value: {
					id: 'attributeslib:crit_chance',
					value: 0.15,
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
	'minecraft:leather': {
		description: [
			'Press \'R\' to perform a rapid dash',
			'Well-timed dash can dodge damage'
		],
		effects: [
			{
				type: 'attribute',
				value: {
					id: 'combatroll:count',
					value: 1,
					operation: 0
				}
			},
			// {
			// 	type: 'attribute',
			// 	value: {
			// 		id: 'combatroll:distance',
			// 		value: 1,
			// 		operation: 0
			// 	}
			// }
		]
	},
	'galosphere:sterling': {
		description: [
			'Press \'R\' to perform a rapid dash',
			'Grants 2 max dash charges',
			'2 extra defense'
		],
		effects: [
			{
				type: 'attribute',
				value: {
					id: 'combatroll:count',
					value: 2,
					operation: 0
				}
			},
			{
				type: 'attribute',
				value: {
					id: 'generic.armor',
					value: 2,
					operation: 0
				}
			}
		]
	},
	'mythicmetals:osmium_chainmail': {
		description: [
			'Reduces incoming damage by 10%',
			'Reduces incoming projectile damage by further 10%'
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
					id: 'adjcore:generic.damage_reduction',
					value: 0.1,
					operation: 0
				}
			},
		]
	},
	'minecraft:chainmail': {
		description: [
			'Reduces incoming projectile damage by extra 10%'
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
			'Reduces incoming projectile damage by extra 10%',
			'Press \'R\' to perform a rapid dash',
			'Well-timed dash can dodge damage',
			'Increased dash distance compared to that',
			'of the Leather armor set bonus'
		],
		effects: [
			{
				type: 'attribute',
				value: {
					id: 'combatroll:count',
					value: 1,
					operation: 0
				}
			},
			{
				type: 'attribute',
				value: {
					id: 'combatroll:distance',
					value: 1.5,
					operation: 0
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
			'Gained Experience increased by 30%',
			'2 extra defense'
		],
		effects: [
			{
				type: 'attribute',
				value: {
					id: 'attributeslib:experience_gained',
					value: 0.3,
					operation: 0
				}
			},
			{
				type: 'attribute',
				value: {
					id: 'generic.armor',
					value: 2,
					operation: 0
				}
			}
		]
	},
	'mythicmetals:runite': {
		description: [
			'Increases max mana by 20'
		],
		effects: [
			{
				type: 'attribute',
				value: {
					id: 'ars_nouveau:ars_nouveau.perk.max_mana',
					value: 20,
					operation: 0
				}
			}
		]
	},
	'create:cardboard': {
		description: [
			'Sneak to disguise as a cardboard box',
			'Ask yourself if this bonus made all ',
			'the effort to craft it worth it',
			'The answer is probably no',
			'Just so that you are not left with nothing,',
			'I will grant you 1 extra defense'
		],
		effects: [
			{
				type: 'attribute',
				value: {
					id: 'generic.armor',
					value: 1,
					operation: 0
				}
			}
		]
	},
	'rediscovered:plate': {
		description: [
			'5 defense',
		],
		effects: [
			{
				type: 'attribute',
				value: {
					id: 'generic.armor',
					value: 5,
					operation: 0
				}
			}
		]
	},
	'ars_nouveau:arcanist_0': {
		description: [
			"Increases all spell damage by 4"
		],
		effects: [
			{
				type: "attribute",
				value: {
					id: "ars_nouveau:ars_nouveau.perk.spell_damage",
					value: 4,
					operation: 0
				}
			}
		]
	},
	'ars_nouveau:arcanist_1': {
		description: [
			"Increases all spell damage by 6",
			'Press \'R\' to perform a short dash',
		],
		effects: [
			{
				type: "attribute",
				value: {
					id: "ars_nouveau:ars_nouveau.perk.spell_damage",
					value: 6,
					operation: 0
				}
			},
			{
				type: "attribute",
				value: {
					id: "combatroll:count",
					value: 1,
					operation: 0
				}
			},
			{
				type: "attribute",
				value: {
					id: "combatroll:distance",
					value: -0.5,
					operation: 0
				}
			}
		]
	},
	'ars_nouveau:arcanist_2': {
		description: [
			"Increases all spell damage by 12",
			'Press \'R\' to perform a rapid dash',
		],
		effects: [
			{
				type: "attribute",
				value: {
					id: "ars_nouveau:ars_nouveau.perk.spell_damage",
					value: 12,
					operation: 0
				}
			},
			{
				type: "attribute",
				value: {
					id: "combatroll:count",
					value: 1,
					operation: 0
				}
			},
			{
				type: "attribute",
				value: {
					id: "combatroll:distance",
					value: 1.5,
					operation: 0
				}
			}
		]
	},
	'ars_elemental:fire': {
		description: [
			"Increases all spell damage by 16",
			'Press \'R\' to perform a rapid dash',
			'Transforms some of the received',
			'fire damage into Mana',
			'Can\'t be set on fire'
		],
		effects: [
			{
				type: "attribute",
				value: {
					id: "ars_nouveau:ars_nouveau.perk.spell_damage",
					value: 16,
					operation: 0
				}
			},
			{
				type: "attribute",
				value: {
					id: "combatroll:count",
					value: 1,
					operation: 0
				}
			},
			{
				type: "attribute",
				value: {
					id: "combatroll:distance",
					value: 3.0,
					operation: 0
				}
			}
		]
	},
	'ars_elemental:fire': {
		description: [
			"Increases all spell damage by 16",
			'Press \'R\' to perform a rapid dash',
			'Transforms some of the received',
			'fire-type damage into Mana',
			'Can\'t be set on fire'
		],
		effects: [
			{
				type: "attribute",
				value: {
					id: "ars_nouveau:ars_nouveau.perk.spell_damage",
					value: 16,
					operation: 0
				}
			},
			{
				type: "attribute",
				value: {
					id: "combatroll:count",
					value: 1,
					operation: 0
				}
			},
			{
				type: "attribute",
				value: {
					id: "combatroll:distance",
					value: 3.0,
					operation: 0
				}
			}
		]
	},
	'ars_elemental:air': {
		description: [
			"Increases all spell damage by 16",
			'Press \'R\' to perform a rapid dash',
			'Transforms some of the received',
			'air-type damage (idk either) into Mana',
			'Greatly reduces fall damage'
		],
		effects: [
			{
				type: "attribute",
				value: {
					id: "ars_nouveau:ars_nouveau.perk.spell_damage",
					value: 16,
					operation: 0
				}
			},
			{
				type: "attribute",
				value: {
					id: "combatroll:count",
					value: 1,
					operation: 0
				}
			},
			{
				type: "attribute",
				value: {
					id: "combatroll:distance",
					value: 3.0,
					operation: 0
				}
			}
		]
	},
	'ars_elemental:earth': {
		description: [
			"Increases all spell damage by 16",
			'Press \'R\' to perform a rapid dash',
			'Transforms some of the received',
			'earth-type damage into Mana',
			'Replenishes hunger underground if starving'
		],
		effects: [
			{
				type: "attribute",
				value: {
					id: "ars_nouveau:ars_nouveau.perk.spell_damage",
					value: 16,
					operation: 0
				}
			},
			{
				type: "attribute",
				value: {
					id: "combatroll:count",
					value: 1,
					operation: 0
				}
			},
			{
				type: "attribute",
				value: {
					id: "combatroll:distance",
					value: 3.0,
					operation: 0
				}
			}
		]
	},
	'ars_elemental:earth': {
		description: [
			"Increases all spell damage by 16",
			'Press \'R\' to perform a rapid dash',
			'Transforms some of the received',
			'water-type damage into Mana',
			'Replenishes your breath if about to drown'
		],
		effects: [
			{
				type: "attribute",
				value: {
					id: "ars_nouveau:ars_nouveau.perk.spell_damage",
					value: 16,
					operation: 0
				}
			},
			{
				type: "attribute",
				value: {
					id: "combatroll:count",
					value: 1,
					operation: 0
				}
			},
			{
				type: "attribute",
				value: {
					id: "combatroll:distance",
					value: 3.0,
					operation: 0
				}
			}
		]
	},
	'mythicmetals:bronze': {
		description: [
			"Increases dealt damage by flat 5",
			"1 defense"
		],
		effects: [
			{
				type: "attribute",
				value: {
					id: "generic.attack_damage",
					value: 5,
					operation: 0
				}
			},
			{
				type: "attribute",
				value: {
					id: "generic.armor",
					value: 1,
					operation: 0
				}
			}
		]
	},
	'mythicmetals:steel': {
		description: [
			"Reduces incoming damage by 5%",
			"Become immune to knockback"
		],
		effects: [
			{
				type: "attribute",
				value: {
					id: "adjcore:generic.damage_reduction",
					value: 0.05,
					operation: 0
				}
			},
			{
				type: "attribute",
				value: {
					id: "generic.knockback_resistance",
					value: 21.37,
					operation: 0
				}
			}
		]
	},
	'mythicmetals:kyber': {
		description: [
			"Attackers also take damage"
		],
		effects: []
	},
	'mythicmetals:midas_gold': {
		description: [
			"COMING SOON"
		],
		effects: []
	},
	'mythicmetals:palladium': {
		description: [
			"Become immune to fire",
			"Become immune to knockback"
		],
		effects: [
			{
				type: 'effect',
				value: {
					id: 'minecraft:fire_resistance',
					amplifier: 0,
				}
			},
			{
				type: "attribute",
				value: {
					id: "generic.knockback_resistance",
					value: 21.37,
					operation: 0
				}
			}
		]
	},
	'mythicmetals:prometheum': {
		description: [
			"COMING SOON"
		],
		effects: []
	},
	'botania:manasteel': {
		description: [
			"10% reduced mana cost on",
			"Mana Tools and Rods",
			'3 defense'
		],
		effects: [
			{
				type: 'attribute',
				value: {
					id: 'generic.armor',
					value: 3,
					operation: 0
				}
			}
		]
	},
	'botania:terrasteel': {
		description: [
			"20% reduced mana cost on",
			"Mana Tools and Rods",
			"Passive Mana generation on Mana Tablets",
			'10% reduced damage'
		],
		effects: [
			{
				type: 'attribute',
				value: {
					id: 'adjcore:generic.damage_reduction',
					value: 0.1,
					operation: 0
				}
			}
		]
	},
	'botania:manaweave': {
		description: [
			"40% reduced mana cost on",
			"Mana Tools and Rods",
			"Increased profficiency with Rods",
			'25% increased movement speed'
		],
		effects: [
			{
				type: 'attribute',
				value: {
					id: 'generic.movement_speed',
					value: 0.25,
					operation: 1
				}
			}
		]
	},
	'mythicmetals:tidesinger': {
		description: [
			"Greatly improved underwater visibility"
		],
		effects: [
			{
				type: 'attribute',
				value: {
					id: 'additionalentityattributes:player.water_visibility',
					value: 0.8,
					operation: 1
				}
			}
		]
	},
	'mythicmetals:tidesinger': {
		description: [
			"Greatly improved underwater visibility"
		],
		effects: [
			{
				type: 'attribute',
				value: {
					id: 'additionalentityattributes:player.water_visibility',
					value: 1.6,
					operation: 1
				}
			}
		]
	},
	'mythicmetals:aquarium': {
		description: [
			"Improved underwater visibility"
		],
		effects: [
			{
				type: 'attribute',
				value: {
					id: 'additionalentityattributes:player.water_visibility',
					value: 0.7,
					operation: 1
				}
			}
		]
	},
	'cataclysm:ignitium': {
		description: [
			'Incoming damage reduced by 10%',
			'Attacks deal extra fire damage',
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
					id: 'attributeslib:fire_damage',
					value: 5,
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
	'cataclysm:cursium': {
		description: [
			'Incoming damage reduced by 10%',
			'20 extra armor penetration',
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
					id: 'attributeslib:armor_pierce',
					value: 20,
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
	'aether:zanite': {
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
	'aether:gravitite': {
		description: [
			'Incoming damage reduced by 5%',
			'Massively increased jump strength',
			'Immunity to fall damage',
			'Automatically walk up 1 block without having to jump'
		],
		effects: [
			{
				type: 'attribute',
				value: {
					id: 'adjcore:generic.damage_reduction',
					value: 0.05,
					operation: 0
				}
			},
			{
				type: 'attribute',
				value: {
					id: 'forge:step_height_addition',
					value: 0.6,
					operation: 0
				}
			}
		]
	},
	'aether:neptune': {
		description: [
			'Increases movement speed in water'
		],
		effects: []
	},
	'aether:valkyrie': {
		description: [
			'Grants short distance flight'
		],
		effects: []
	},
	'aether:phoenix': {
		description: [
			'Become completely immune to fire'
		],
		effects: []
	},
	'attributeslib:crit_chance': {
		description: [
			'Increases effectiveness of',
			'dark magic weapons and items',
			'Increases spell damage by 8'
		],
		effects: [
			{
				type: "attribute",
				value: {
					id: "ars_nouveau:ars_nouveau.perk.spell_damage",
					value: 8,
					operation: 0
				}
			},
		]
	},
	'born_in_chaos_v1:dark_metal_armor': {
		description: [
			'Enter rampage when on low health',
			'Become immune to Wither effect'
		],
		effects: [
			{
				type: "attribute",
				value: {
					id: "ars_nouveau:ars_nouveau.perk.spell_damage",
					value: 8,
					operation: 0
				}
			},
		]
	},
}
