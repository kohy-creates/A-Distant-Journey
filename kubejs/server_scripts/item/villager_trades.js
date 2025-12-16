const $TieredItem = Java.loadClass('net.minecraft.world.item.TieredItem')
const $ArmorItem = Java.loadClass('net.minecraft.world.item.ArmorItem')
// const $SwordItem = Java.loadClass('net.minecraft.world.item.SwordItem')

MoreJSEvents.updateVillagerOffers(event => {
	const offers = event.getAddedOffers();

	offers.forEach(offer => {

		const output = offer.output;
		const id = output.getId();

		if (output.getItem() instanceof $ArmorItem) {


			let defense = 0;
			output.getAttributeModifiers(output.getItem().getEquipmentSlot()).get($Attributes.ARMOR).forEach(modifier => {
				defense += modifier.getAmount();
			})

			let durability = output.getItem().getMaxDamage();

			offer.setFirstInput(Item.of(offer.getCostA(), Math.round((10.5 + (defense * 1.3)) * Math.min(Math.max(durability / 600, 0.55), 1.75))));
			if (id.includes('diamond')) {
				offer.setSecondInput('kubejs:diamond_upgrade')
			}
		}
		else if (output.getItem() instanceof $TieredItem) {
			if (id.includes('stone')) {
				offer.setOutput(`mythicmetals:copper_${id.replace('minecraft:stone_', '')}`)
				offer.setFirstInput(Item.of(offer.getCostA(), 4))
			}
			if (id.includes('diamond')) {
				offer.setSecondInput('kubejs:diamond_upgrade')
			}
		}
		else if (id.endsWith('_plush')) {
			offer.setFirstInput(Item.of(offer.costA, offer.costA.count * 3))
			offer.setSecondInput(Item.of(offer.costB, offer.costB.count + 3))
		}
	})
})

