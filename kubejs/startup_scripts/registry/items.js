// const $QuiverItem = Java.loadClass('net.mehvahdjukaar.supplementaries.common.items.QuiverItem')
const $EyeofEnder = Java.loadClass('net.minecraft.world.entity.projectile.EyeOfEnder')
const $TagKey = Java.loadClass('net.minecraft.tags.TagKey')
const $Registries = Java.loadClass('net.minecraft.core.registries.Registries')

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
		.ingredientsDescription('Another Diamond')
		.texture('kubejs:item/diamond_upgrade')
})
