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


})


StartupEvents.registry('entity_type', event => {
	let ItemEntity = Java.loadClass("net.minecraft.world.entity.item.ItemEntity")

	/**
	 * Registers an Attuned Awakened Ender Pearl (AKA Ender Eye for locating structures) 
	 * @param {string} id 
	 * @param {string} name 
	 * @param {Internal.Structure_} structureLocator 
	 * @param {Internal.Dimension_} dimension 
	 */
	function registerEye(id, name, structureLocator, dimension) {
		event.create(id, "minecraft:eye_of_ender")
			.textureLocation(entity => {
				return `kubejs:item/${id}`
			})
			.disableTrailParticles()
			.disableDefaultDeathLogic()
			.tick(entity => {
				entity.level.addParticle('minecraft:end_rod', true, entity.x + 0, entity.y + 0, entity.z + 0, 0, 0, 0)
			})
			// This is to make it so the eye that drops to ground will have the glowing effect -note that this means the eye will drop on the ground every time
			.onRemovedFromWorld(entity => {
				entity.level.playSound(null, entity.x, entity.y, entity.z, 'entity.ender_eye.death', entity.getSoundSource(), 1.0, 1.0)
				let glowingEye = new ItemEntity(entity.level, entity.x, entity.y, entity.z, `kubejs:${id}`)
				glowingEye.setGlowing(true)
				entity.level.addFreshEntity(glowingEye)
			})
			.setSurvivalChance(0)
			.renderOffset(0, 0, 0)
			.renderScale(0.5, 0.5, 0.5)
			.item(/** @param {Internal.ItemBuilder_} item */ item => {
				item.signalTo(context => {
					const { level, player, hand } = context
					// This checks if you're in a different dimension otherwise the swing animation that normally plays when throwing an eye will not play
					if (!player.level.dimension != dimension) return;
					let structureTag = $TagKey.create($Registries.STRUCTURE, $ResourceLocation.parse(structureLocator));
					let foundPos = level.findNearestMapStructure(structureTag, player.blockPosition(), 100, false)
					console.log(foundPos)
					if (foundPos) {
						// Checks to see if you're in creative before removing an item as it can be finnicky in dimensions outside of the overworld
						if (!player.abilities.instabuild) {
							player.getHeldItem(hand).count--
						}
						player.swing()
						level.playSound(null, player.getX(), player.getY(), player.getZ(), 'entity.ender_eye.launch', player.getSoundSource(), 0.5, 0.5)
						return foundPos
					}
				})
				item.rarity("EPIC")
				item.fireResistant(true)
				item.displayName(name)
				item.texture(`kubejs:item/${id}`)
			})
			.getItem(entity => {
				return Item.of(`kubejs:${id}`)
			})
	}
	registerEye('awakened_pearl_holystone', 'Awakened Ender Pearl (Bronze Dungeon)', 'adj:locator/bronze_dungeon', 'aether:the_aether')
	registerEye('awakened_pearl_zanite', 'Awakened Ender Pearl (Silver Dungeon)', 'adj:locator/silver_dungeon', 'aether:the_aether')
	registerEye('awakened_pearl_veridium', 'Awakened Ender Pearl (Gold Dungeon)', 'adj:locator/gold_dungeon', 'aether:the_aether')
	registerEye('awakened_pearl_gravitite', 'Awakened Ender Pearl (Platinum Dungeon)', 'adj:locator/platinum_dungeon', 'aether:the_aether')
	registerEye('awakened_pearl_wither', 'Awakened Ender Pearl (Withering Attunment)', 'adj:locator/witherstorm', 'minecraft:overworld')
})
