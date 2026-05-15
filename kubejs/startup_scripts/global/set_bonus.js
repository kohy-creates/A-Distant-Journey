const genericSetBonusUUID = '645bb590-a4ab-4c0c-bf19-653b14934698';
global.genericSetBonusUUID = genericSetBonusUUID;

global.bonusOverrides = {
	'minecraft:netherite': [
		['minecraft:netherite', 'minecraft:netherite', 'minecraft:netherite', 'cataclysm:monstrous']
	]
}

global.setBonusMap = {
	'minecraft:iron': {
		description: [
			'2 extra defense',
		],
		effects: [
			{ type: 'attribute', value: { id: 'generic.armor', value: 2 } }
		]
	},
	'additionaladditions:rose_gold': {
		description: [
			'2 defense',
			'5% increased melee damage'
		],
		effects: [
			{ type: 'attribute', value: { id: 'generic.armor', value: 2 } },
			{ type: 'attribute', value: { id: 'generic.attack_damage', value: 0.05, operation: 'multiply_base' } }
		]
	},
	'minecraft:diamond': {
		description: [
			'Incoming damage reduced by 3%',
			'5% increased critical strike chance'
		],
		effects: [
			{ type: 'attribute', value: { id: 'adjcore:generic.damage_reduction', value: 0.03 } },
			{ type: 'attribute', value: { id: 'attributeslib:crit_chance', value: 0.05 } }
		]
	},
	'minecraft:netherite': {
		description: [
			'Incoming damage reduced by 5%',
			'5% increased critical strike chance',
		],
		effects: [
			{ type: 'attribute', value: { id: 'adjcore:generic.damage_reduction', value: 0.05 } },
			{ type: 'attribute', value: { id: 'attributeslib:crit_chance', value: 0.05 } }
		]
	},
	'mythicmetals:adamantite': {
		description: [
			'Press \'T\' to perform a rapid dash',
			'Well-timed dash can dodge damage',
			'10% increased movement speed'
		],
		effects: [
			{ type: 'attribute', value: { id: 'combatroll:count', value: 1 } },
			{ type: 'attribute', value: { id: 'combatroll:recharge', value: 0.2, operation: 'multiply_base' } },
			{ type: 'attribute', value: { id: 'combatroll:distance', value: 4 } },
			{ type: 'attribute', value: { id: 'generic.movement_speed', value: 0.1, operation: 'multiply_base' } }
		]
	},
	'majruszsdifficulty:enderium': {
		description: [
			'Incoming damage reduced by 8%',
			'8% increased critical strike chance',
			'You will be saved if you fall into the void'
		],
		effects: [
			{ type: 'attribute', value: { id: 'adjcore:generic.damage_reduction', value: 0.08 } },
			{ type: 'attribute', value: { id: 'attributeslib:crit_chance', value: 0.08 } }
		]
	},
	'mythicmetals:metallurgium': {
		description: [
			'Incoming damage reduced by 10%',
			'8% increased critical strike chance',
		],
		effects: [
			{ type: 'attribute', value: { id: 'adjcore:generic.damage_reduction', value: 0.1 } },
			{ type: 'attribute', value: { id: 'attributeslib:crit_chance', value: 0.08 } }
		]
	},
	'minecraft:leather': {
		description: [
			'Press \'T\' to perform a rapid dash',
			'Well-timed dash can dodge damage'
		],
		effects: [
			{ type: 'attribute', value: { id: 'combatroll:count', value: 1 } }
		]
	},
	'galosphere:sterling': {
		description: [
			'Press \'T\' to perform a rapid dash',
			'Grants 2 max dash charges',
			'2 extra defense'
		],
		effects: [
			{ type: 'attribute', value: { id: 'combatroll:count', value: 2 } },
			{ type: 'attribute', value: { id: 'generic.armor', value: 2 } }
		]
	},
	'mythicmetals:osmium_chainmail': {
		description: [
			'Reduces incoming damage by 5%',
			'Reduces incoming projectile damage by further 10%'
		],
		effects: [
			{ type: 'attribute', value: { id: 'adjcore:generic.projectile_damage_reduction', value: 0.1 } },
			{ type: 'attribute', value: { id: 'adjcore:generic.damage_reduction', value: 0.05 } },
		]
	},
	'minecraft:chainmail': {
		description: [
			'Reduces incoming projectile damage by 10%'
		],
		effects: [
			{ type: 'attribute', value: { id: 'adjcore:generic.projectile_damage_reduction', value: 0.1 } }
		]
	},
	'rediscovered:studded': {
		description: [
			'Reduces incoming projectile damage by extra 10%',
			'Press \'T\' to perform a rapid dash with increased dash distance',
			'Well-timed dash can dodge damage',
		],
		effects: [
			{ type: 'attribute', value: { id: 'combatroll:count', value: 1 } },
			{ type: 'attribute', value: { id: 'combatroll:distance', value: 1.5 } },
			{ type: 'attribute', value: { id: 'adjcore:generic.projectile_damage_reduction', value: 0.1 } }
		]
	},
	'minecraft:golden': {
		description: [
			'Gained Experience increased by 20%',
			'2 extra defense'
		],
		effects: [
			{ type: 'attribute', value: { id: 'attributeslib:experience_gained', value: 0.2 } },
			{ type: 'attribute', value: { id: 'generic.armor', value: 2 } }
		]
	},
	'mythicmetals:runite': {
		description: [
			'Reduces mana cost of spells by 12%'
		],
		effects: [
			{ type: 'attribute', value: { id: 'adjcore:player.mana_cost_reduction', value: 0.12 } }
		]
	},
	'create:cardboard': {
		description: [
			'Sneak to disguise as a cardboard box',
			'Gain 1 defense for completely no reason tbh'
		],
		effects: [
			{ type: 'attribute', value: { id: 'generic.armor', value: 1 } }
		]
	},
	'rediscovered:plate': {
		description: [
			'7 defense',
		],
		effects: [
			{ type: 'attribute', value: { id: 'generic.armor', value: 7 } }
		]
	},
	'ars_nouveau:arcanist_0': {
		description: [
			"12% increased magic damage",
			"6% reduced mana cost"
		],
		effects: [
			{ type: "attribute", value: { id: "ars_nouveau:ars_nouveau.perk.spell_damage", value: 12 } },
			{ type: "attribute", value: { id: 'adjcore:player.mana_cost_reduction', value: 0.06 } }
		]
	},
	'ars_nouveau:arcanist_1': {
		description: [
			"14% increased magic damage",
			"8% reduced mana cost",
			'Press \'T\' to perform a short dash',
		],
		effects: [
			{ type: "attribute", value: { id: "ars_nouveau:ars_nouveau.perk.spell_damage", value: 14 } },
			{ type: "attribute", value: { id: 'adjcore:player.mana_cost_reduction', value: 0.08 } },
			{ type: "attribute", value: { id: "combatroll:count", value: 1 } },
			{ type: "attribute", value: { id: "combatroll:distance", value: -0.5 } }
		]
	},
	'ars_nouveau:arcanist_2': {
		description: [
			"22% increased magic damage",
			"8% reduced mana cost",
			'Press \'T\' to perform a rapid dash',
		],
		effects: [
			{ type: "attribute", value: { id: "ars_nouveau:ars_nouveau.perk.spell_damage", value: 22 } },
			{ type: "attribute", value: { id: 'adjcore:player.mana_cost_reduction', value: 0.08 } },
			{ type: "attribute", value: { id: "combatroll:count", value: 1 } },
			{ type: "attribute", value: { id: "combatroll:distance", value: 1.5 } }
		]
	},
	'ars_elemental:fire': {
		description: [
			"15% reduced mana cost",
			'Press \'T\' to perform a rapid dash',
			'Transforms some of the received',
			'fire-type damage into Mana',
			'Can\'t be set on fire'
		],
		effects: [
			{ type: "attribute", value: { id: 'adjcore:player.mana_cost_reduction', value: 0.15 } },
			{ type: "attribute", value: { id: "combatroll:count", value: 1 } },
			{ type: "attribute", value: { id: "combatroll:distance", value: 3.0 } }
		]
	},
	'ars_elemental:air': {
		description: [
			"15% reduced mana cost",
			'Press \'T\' to perform a rapid dash',
			'Transforms some of the received',
			'air-type damage (idk either) into Mana',
			'Greatly reduces fall damage'
		],
		effects: [
			{ type: "attribute", value: { id: 'adjcore:player.mana_cost_reduction', value: 0.15 } },
			{ type: "attribute", value: { id: "combatroll:count", value: 1 } },
			{ type: "attribute", value: { id: "combatroll:distance", value: 3.0 } }
		]
	},
	'ars_elemental:earth': {
		description: [
			"15% reduced mana cost",
			'Press \'T\' to perform a rapid dash',
			'Transforms some of the received',
			'earth-type damage into Mana',
			'Replenishes hunger underground if starving'
		],
		effects: [
			{ type: "attribute", value: { id: 'adjcore:player.mana_cost_reduction', value: 0.15 } },
			{ type: "attribute", value: { id: "combatroll:count", value: 1 } },
			{ type: "attribute", value: { id: "combatroll:distance", value: 3.0 } }
		]
	},
	'ars_elemental:earth': {
		description: [
			"15% reduced mana cost",
			'Press \'T\' to perform a rapid dash',
			'Transforms some of the received',
			'water-type damage into Mana',
			'Replenishes your breath if about to drown'
		],
		effects: [
			{ type: "attribute", value: { id: 'adjcore:player.mana_cost_reduction', value: 0.15 } },
			{ type: "attribute", value: { id: "combatroll:count", value: 1 } },
			{ type: "attribute", value: { id: "combatroll:distance", value: 3.0 } }
		]
	},
	'mythicmetals:bronze': {
		description: [
			"Increases dealt damage by 2"
		],
		effects: [
			{ type: "attribute", value: { id: "generic.attack_damage", value: 2 } }
		]
	},
	'mythicmetals:steel': {
		description: [
			"Reduces incoming damage by 8%",
			"Become immune to knockback"
		],
		effects: [
			{ type: "attribute", value: { id: "adjcore:generic.damage_reduction", value: 0.08 } },
			{ type: "attribute", value: { id: "generic.knockback_resistance", value: 21.37 } }
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
			"Attacks increase life regeneration"
		],
		effects: [
			{
				type: 'effect',
				value: {
					id: 'minecraft:fire_resistance',
					amplifier: 0,
				}
			}
		]
	},
	'mythicmetals:prometheum': {
		description: [
			"Standing in direct sunlight regenerates health"
		],
		effects: []
	},
	'botania:manasteel': {
		description: [
			"10% reduced energy cost on Mana Tools and Rods",
			"15% reduced mana cost on spells",
			'3 defense'
		],
		effects: [
			{ type: 'attribute', value: { id: 'generic.armor', value: 3 } },
			{ type: 'attribute', value: { id: 'adjcore:player.mana_cost_reduction', value: 0.15 } }
		]
	},
	'botania:terrasteel': {
		description: [
			"20% reduced energy cost on Mana Tools and Rods",
			"Passive energy generation on Mana Tablets",
			"20% reduced mana cost on spells",
			'8% reduced damage'
		],
		effects: [
			{ type: 'attribute', value: { id: 'adjcore:generic.damage_reduction', value: 0.08 } },
			{ type: 'attribute', value: { id: 'adjcore:player.mana_cost_reduction', value: 0.2 } }
		]
	},
	'botania:manaweave': {
		description: [
			"40% reduced energy cost on Mana Tools and Rods",
			"30% reduced mana cost on spells",
			"Increased profficiency with Rods",
			'25% increased movement speed'
		],
		effects: [
			{ type: 'attribute', value: { id: 'generic.movement_speed', value: 0.25, operation: 'multiply_base' } },
			{ type: 'attribute', value: { id: 'adjcore:player.mana_cost_reduction', value: 0.3 } }
		]
	},
	'mythicmetals:tidesinger': {
		description: [
			"Greatly improved underwater visibility"
		],
		effects: [
			{ type: 'attribute', value: { id: 'additionalentityattributes:player.water_visibility', value: 1.6, operation: 'multiply_base' } }
		]
	},
	'mythicmetals:aquarium': {
		description: [
			"Improved underwater visibility"
		],
		effects: [
			{ type: 'attribute', value: { id: 'additionalentityattributes:player.water_visibility', value: 0.7, operation: 'multiply_base' } }
		]
	},
	'cataclysm:ignitium': {
		description: [
			'Incoming damage reduced by 10%',
			'Attacks deal extra fire damage',
			'Become immune to fire'
		],
		effects: [
			{ type: 'attribute', value: { id: 'adjcore:generic.damage_reduction', value: 0.1 } },
			{ type: 'attribute', value: { id: 'attributeslib:fire_damage', value: 5 } },
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
			'20 extra armor penetration'
		],
		effects: [
			{ type: 'attribute', value: { id: 'adjcore:generic.damage_reduction', value: 0.1 } },
			{ type: 'attribute', value: { id: 'attributeslib:armor_pierce', value: 20 } }
		]
	},
	'aether:zanite': {
		description: [
			'Incoming damage reduced by 5%'
		],
		effects: [
			{ type: 'attribute', value: { id: 'adjcore:generic.damage_reduction', value: 0.05 } }
		]
	},
	'aether:gravitite': {
		description: [
			'Incoming damage reduced by 5%',
			'Immunity to fall damage',
		],
		effects: [
			{ type: 'attribute', value: { id: 'adjcore:generic.damage_reduction', value: 0.05 } },
			{ type: 'attribute', value: { id: 'forge:step_height_addition', value: 0.6 } }
		]
	},
	'aether:neptune': {
		description: [
			'Increases movement speed in water'
		],
		effects: []
	},
	'ancient_aether:valkyrum': {
		description: [
			'Grants short distance flight',
			'(comes with bundled immunity to fall damage)'
		],
		effects: []
	},
	'aether:phoenix': {
		description: [
			'Become completely immune to fire',
			'The Phoenix will bless you whenever your health is low'
		],
		effects: []
	},
	'aether:obsidian': {
		description: [
			'Sneak to activate an even more defensive stance'
		],
		effects: []
	},
	'born_in_chaos_v1:nightmare_mantleofthe_night': {
		description: [
			'Increases effectiveness of dark magic weapons and items',
			'12% increased magic damage',
			'Increases spell armor penetration by 15'
		],
		effects: [
			{ type: "attribute", value: { id: "ars_nouveau:ars_nouveau.perk.spell_damage", value: 12 } },
			{ type: "attribute", value: { id: "attributeslib:armor_pierce", value: 15 } },
		]
	},
	'born_in_chaos_v1:dark_metal_armor': {
		description: [
			'Enter rampage when on low health',
			'Immunity to Wither'
		],
		effects: []
	},
	'mythicmetals:stormyx': {
		description: [
			'Increases movement speed by 10%',
			'Grants a short dash'
		],
		effects: [
			{ type: 'attribute', value: { id: 'generic.movement_speed', value: 0.1, operation: 'multiply_base' } },
			{ type: 'attribute', value: { id: 'combatroll:count', value: 1 } }
		]
	},
	'kubejs:wooden': {
		description: [
			'1 defense'
		],
		effects: [
			{ type: 'attribute', value: { id: 'generic.armor', value: 1 } }
		]
	},
	'twilightforest:ironwood': {
		description: [
			'Ores will sometimes drop more items'
		],
		effects: [
			{ type: 'attribute', value: { id: 'adjcore:player.extra_fortune_level', value: 1 } }
		]
	},
	'mythicmetals:mythril': {
		description: [
			'Ores will sometimes drop more items',
			'Immunity to Mining Fatigue'
		],
		effects: [
			{ type: 'attribute', value: { id: 'adjcore:player.extra_fortune_level', value: 1 } }
		]
	},
	'twilightforest:knightmetal': {
		description: [
			'Reduces incoming damage by 10%'
		],
		effects: [
			{ type: 'attribute', value: { id: 'adjcore:generic.damage_reduction', value: 0 } }
		]
	},
}
