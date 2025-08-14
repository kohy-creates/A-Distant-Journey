const $ForgeTier = Java.loadClass('net.minecraftforge.common.ForgeTier')
const $BlockTags = Java.loadClass('net.minecraft.tags.BlockTags')
const $TierSortingRegistry = Java.loadClass('net.minecraftforge.common.TierSortingRegistry')
const $Tiers = Java.loadClass('net.minecraft.world.item.Tiers')
const $ResourceLocation = Java.loadClass("net.minecraft.resources.ResourceLocation");

const tiers = {
	'adamantite': {
		uses: 3000,
		speed: 9.0,
		attackDamageBonus: 5.0,
		level: 4,
		enchantmentValue: 16,
		repairIngredient: '#c:adamantite_ingots'
	},
	'aquarium': {
		uses: 455,
		speed: 6.0,
		attackDamageBonus: 2.0,
		level: 2,
		enchantmentValue: 12,
		repairIngredient: '#c:aquarium_ingots'
	},
	'bronze': {
		uses: 354,
		speed: 5.5,
		attackDamageBonus: 2.5,
		level: 2,
		enchantmentValue: 14,
		repairIngredient: '#c:bronze_ingots'
	},
	'carmot': {
		uses: 1130,
		speed: 6.0,
		attackDamageBonus: 3.0,
		level: 2,
		enchantmentValue: 20,
		repairIngredient: '#c:carmot_ingots'
	},
	'carmot_staff': {
		uses: 1230,
		speed: 6.0,
		attackDamageBonus: 2.0,
		level: 2,
		enchantmentValue: 20,
		repairIngredient: '#c:carmot_ingots'
	},
	'celestium': {
		uses: 2470,
		speed: 16.0,
		attackDamageBonus: 6.0,
		level: 5,
		enchantmentValue: 26,
		repairIngredient: '#c:celestium_ingots'
	},
	'copper': {
		uses: 187,
		speed: 4.0,
		attackDamageBonus: 1.5,
		level: 1,
		enchantmentValue: 8,
		repairIngredient: '#c:copper_ingots'
	},
	'gilded_midas_gold': {
		uses: 999,
		speed: 13.0,
		attackDamageBonus: 4.0,
		level: 3,
		enchantmentValue: 30,
		repairIngredient: '#c:midas_gold_ingots'
	},
	'hallowed': {
		uses: 1984,
		speed: 12.0,
		attackDamageBonus: 5.0,
		level: 4,
		enchantmentValue: 20,
		repairIngredient: '#c:hallowed_ingots'
	},
	'kyber': {
		uses: 889,
		speed: 6.0,
		attackDamageBonus: 2.5,
		level: 2,
		enchantmentValue: 20,
		repairIngredient: '#c:kyber_ingots'
	},
	'metallurgium': {
		uses: 3000,
		speed: 15.0,
		attackDamageBonus: 8.0,
		level: 5,
		enchantmentValue: 30,
		repairIngredient: '#c:metallurgium_ingots'
	},
	'midas_gold': {
		uses: 300,
		speed: 13.0,
		attackDamageBonus: 3.0,
		level: 3,
		enchantmentValue: 30,
		repairIngredient: '#c:midas_gold_ingots'
	},
	'mythril': {
		uses: 1564,
		speed: 11,
		attackDamageBonus: 3.0,
		level: 3,
		enchantmentValue: 22,
		repairIngredient: '#c:mythril_ingots'
	},
	'mythril_drill': {
		uses: 1764,
		speed: 20,
		attackDamageBonus: 3.0,
		level: 3,
		enchantmentValue: 20,
		repairIngredient: '#c:mythril_ingots'
	},
	'orichalcum': {
		uses: 2048,
		speed: 3.5,
		attackDamageBonus: 2.0,
		level: 3,
		enchantmentValue: 16,
		repairIngredient: '#c:orichalcum_ingots'
	},
	'palladium': {
		uses: 1234,
		speed: 8.0,
		attackDamageBonus: 3.5,
		level: 4,
		enchantmentValue: 16,
		repairIngredient: '#c:palladium_ingots'
	},
	'prometheum': {
		uses: 1472,
		speed: 6.5,
		attackDamageBonus: 4.0,
		level: 3,
		enchantmentValue: 15,
		repairIngredient: '#c:prometheum_ingots'
	},
	'runite': {
		uses: 1337,
		speed: 6.5,
		attackDamageBonus: 3.3,
		level: 2,
		enchantmentValue: 17,
		repairIngredient: '#c:runite_ingots'
	},
	'royal_midas_gold': {
		uses: 2147,
		speed: 21.0,
		attackDamageBonus: 5.0,
		level: 3,
		enchantmentValue: 35,
		repairIngredient: '#c:midas_gold_ingots'
	},
	'star_platinum': {
		uses: 1300,
		speed: 12.0,
		attackDamageBonus: 4.0,
		level: 5,
		enchantmentValue: 18,
		repairIngredient: '#c:star_platinum'
	},
	'steel': {
		uses: 700,
		speed: 6,
		attackDamageBonus: 3.0,
		level: 3,
		enchantmentValue: 11,
		repairIngredient: '#c:steel_ingots'
	},
	'stormyx': {
		uses: 1305,
		speed: 8.5,
		attackDamageBonus: 3.5,
		level: 3,
		enchantmentValue: 20,
		repairIngredient: '#c:stormyx_ingots'
	},
	'tidesinger': {
		uses: 1233,
		speed: 9.0,
		attackDamageBonus: 4.0,
		level: 2,
		enchantmentValue: 18,
		repairIngredient: '#c:aquarium_ingots'
	},
	'enderium': {
		uses: 8000,
		speed: 12,
		attackDamageBonus: 5.0,
		level: 6,
		enchantmentValue: 15,
		repairIngredient: 'majruszsdifficulty:enderium_ingot',
	},
	'netherite': {
		uses: 3000,
		speed: 10,
		attackDamageBonus: 4.0,
		level: 4,
		enchantmentValue: 15,
		repairIngredient: 'diamond',
	}
}

const blockTags = {
	1: 'minecraft:needs_stone_tool',
	2: 'minecraft:needs_iron_tool',
	3: 'minecraft:needs_diamond_tool',
	4: 'forgery:needs_netherite_tool',
	5: 'adjcore:needs_tier_5_tool',
	6: 'adjcore:needs_tier_6_tool',
}

function tierBelow(number) {
	switch (number) {
		case 0:
			return []
		case 1:
			return [$Tiers.WOOD]
		case 2:
			return [$Tiers.STONE]
		case 3:
			return [$Tiers.IRON]
		case 4:
			return [$Tiers.DIAMOND]
		default:
			return [$Tiers.NETHERITE]
	}
}


function tierAbove(number) {
	switch (number) {
		case 0:
			return [$Tiers.STONE]
		case 1:
			return [$Tiers.IRON]
		case 2:
			return [$Tiers.DIAMOND]
		case 3:
			return [$Tiers.NETHERITE]
		default:
			return []
	}
}

StartupEvents.registry('item', event => {
	for (const key in tiers) {
		let tier = tiers[key];
		let repairItem = Ingredient.of(tier.repairIngredient);
		let forgeTier = new $ForgeTier(
			tier.level,
			tier.uses,
			tier.speed,
			tier.attackDamageBonus,
			tier.enchantmentValue,
			$BlockTags.create($ResourceLocation.parse(blockTags[tier.level])),
			() => repairItem
		)
		$TierSortingRegistry.registerTier(forgeTier, 'adj:' + key, tierBelow(tier.level), tierAbove(tier.level));
	}
})

ItemEvents.modification(event => {
	const toolset = [
		'_sword',
		'_pickaxe',
		'_axe',
		'_shovel',
		'_hoe',
	]
	function modifyTier(itemCat, tier) {
		toolset.forEach(tool => {
			const itemId = itemCat + tool;
			event.modify(itemId, item => {
				item.tier = $TierSortingRegistry.byName('adj:' + tier);
			})
		})
	}
	modifyTier('mythicmetals:adamantite', 'adamantite');
	modifyTier('mythicmetals:mythril', 'mythril');
	modifyTier('mythicmetals:runite', 'runite');
	modifyTier('mythicmetals:aquarium', 'aquarium');
	modifyTier('mythicmetals:bronze', 'bronze');
	modifyTier('mythicmetals:palladium', 'palladium');
	modifyTier('mythicmetals:steel', 'steel');
	modifyTier('mythicmetals:tidesinger', 'tidesinger');
	modifyTier('mythicmetals:stormyx', 'stormyx');
	modifyTier('mythicmetals:prometheum', 'prometheum');
	modifyTier('majruszsdifficulty:enderium', 'enderium');
	modifyTier('minecraft:netherite', 'netherite');
	modifyTier('mythicmetals:mythril', 'mythril');

	// event.modify('mythicmetals:orichalcum_hammer', item => {
	// 	item.tier = $TierSortingRegistry.byName('adj:orichalcum');
	// })

	event.modify('mythicmetals:mythril_drill', item => {
		item.tier = $TierSortingRegistry.byName('adj:mythril_drill');
	})

})

