const $ForgeRegistries = Java.loadClass('net.minecraftforge.registries.ForgeRegistries');

ItemEvents.rightClicked('minecraft:stick', event => {

	const enabled = false;
	if (!enabled) return;

	/** @type {Internal.Enchantment_[]} */
	const allEnchants = $ForgeRegistries.ENCHANTMENTS.getValues().toArray();

	// console.log(allEnchants)

	allEnchants.forEach(enchant => {
		console.log(enchant.getDescriptionId())
	})


})
