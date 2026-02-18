StartupEvents.registry('item', registry => {
	// Misc items
	registry.create('enchanters_guide', 'basic')
		.unstackable()
		.texture('kubejs:item/enchanters_guide')
		.displayName('Enchanter\'s Guide')
		.rarity('uncommon')
		.tooltip('§7You don\'t understand a single word inside')
		.tooltip('§7Used to craft an Enchanting Table')

	registry.create('manasteel_sheet', 'basic')
		.maxStackSize(64)
		.texture('kubejs:item/manasteel_sheet')
		.displayName('Manasteel Sheet')
		.tooltip('§7Used to craft Manasteel Armor')

	registry.create('skull_fragment', 'basic')
		.maxStackSize(64)
		.texture('kubejs:item/skull_fragment')
		.displayName('Skull Fragment')

	registry.create('diamond_upgrade', 'smithing_template')
		.helmetIcon().chestplateIcon().leggingsIcon().bootsIcon()
		.pickaxeIcon().axeIcon().swordIcon().shovelIcon().hoeIcon().swordIcon()
		.diamondIcon()
		.appliesTo('Rose Gold Armor and Tools')
		.ingredients('Another Diamond')
		.texture('kubejs:item/diamond_upgrade')

	registry.create('wooden_helmet', 'helmet')
		.unstackable()
		.maxDamage(110)
		.displayName('Wooden Helmet')
		.tier('wooden')
	registry.create('wooden_chestplate', 'chestplate')
		.unstackable()
		.maxDamage(110)
		.displayName('Wooden Chestplate')
		.tier('wooden')
	registry.create('wooden_leggings', 'leggings')
		.unstackable()
		.maxDamage(110)
		.displayName('Wooden Leggings')
		.tier('wooden')
	registry.create('wooden_boots', 'boots')
		.unstackable()
		.maxDamage(110)
		.displayName('Wooden Boots')
		.tier('wooden')

	registry.create('map_atlas')
		.unstackable()
		.displayName('Map Atlas')
		.rarity('epic')

	// 	registry.create('map_atlas_waypoints')
	// 		.unstackable()
	// 		.displayName('Map Atlas')
	// 		.rarity('epic')
	// 		.tooltip('§6Waypoints Upgrade')
})

ItemEvents.armorTierRegistry(event => {
	event.add('wooden', tier => {
		tier.durabilityMultiplier = 4
		tier.slotProtections = [0, 1, 1, 1]
		tier.enchantmentValue = 5
		tier.equipSound = 'minecraft:item.armor.equip_turtle'
		tier.repairIngredient = '#planks'
		tier.toughness = 0
		tier.knockbackResistance = 0
	})
})
