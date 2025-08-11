ItemEvents.modification(event => {
	event.modify('structure_gel:building_tool', item => {
		item.setFireResistant(true);
	})
})