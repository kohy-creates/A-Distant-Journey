const $RangedAttribute = Java.loadClass("net.minecraft.world.entity.ai.attributes.RangedAttribute")
StartupEvents.registry('attribute', event => {
	event.createCustom('kubejs:harvest_level', () => new $RangedAttribute("Harvest Level", 0, 0, 10).setSyncable(true))
	event.createCustom('kubejs:mining_speed', () => new $RangedAttribute("Base Mining Speed", 0, 0, 10).setSyncable(true))
})
