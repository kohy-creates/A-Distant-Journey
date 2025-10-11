JEIEvents.hideItems(event => {

	event.hide([
		/.*spawn_egg.*/,
		global.rediscoveredFurniture,
		global.blacklistedItems,
	])
})

JEIEvents.removeCategories(event => {

	event.remove([
		"emi:grinding",
		"emi:world_interaction",
		"aether:block_placement_ban",
		"aether:accessory_freezable",
		"aether:icestone_freezable",
		"aether:item_use_prevention",
		"aether:item_placement_ban",
		"aether:placement_conversion",
		"aether:sweet_ball_conversion",
		"alexscaves:nuclear_furnace_blasting",
		"alexscaves:spelunkery_table",
		"ars_nouveau:budding_conversion",
		"ars_nouveau:scry_ritual",
		"betterarchaeology:identifying",
		"create:mystery_conversion",
		"waystones:warp_plate",
		"ali:trade_loot"
	])

})
