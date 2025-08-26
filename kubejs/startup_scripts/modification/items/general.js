ItemEvents.modification(event => {

	/** @type {InputItem_}*/
	const fireImmuneItems = [
		'structure_gel:building_tool',
		/adamantite/,
		/netherite/,
		/metallurgium/,
		/celestium/,
		/cursium/,
		/enderium/,
		/dark_metal/,
	]

	event.modify(fireImmuneItems, item => {
		item.setFireResistant(true);
	})

	event.modify(/stardew_fishing\:.*bobber/, item => {
		item.setMaxDamage(0);
	})

	event.modify('supplementaries:quiver', item => {
		item.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute(
					'attributeslib:arrow_damage',
					'd24514f1-276b-4732-a92e-de1e47bd6996',
					0.1,
					"addition"
				)
				.addAttribute(
					'attributeslib:arrow_velocity',
					'd24514f1-276b-4732-a92e-de1e47bd6996',
					0.4,
					"addition"
				)
		)
	})
})