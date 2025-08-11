StartupEvents.registry('item', event => {
	// Misc items
	event.create('enchanters_guide', 'basic')
		.unstackable()
		.texture('kubejs:item/enchanters_guide')
		.displayName('Enchanter\'s Guide')
		.rarity('uncommon')
		.tooltip('§7You don\'t understand a single word inside')
		.tooltip('§7Used to craft an Enchanting Table')

	event.create('manasteel_sheet', 'basic')
		.maxStackSize(64)
		.texture('kubejs:item/manasteel_sheet')
		.displayName('Manasteel Sheet')
		.tooltip('§7Used to craft Manasteel Armor')

	event.create('skull_fragment', 'basic')
		.maxStackSize(64)
		.texture('kubejs:item/skull_fragment')
		.displayName('Skull Fragment')
})
