ItemEvents.modification(event => {
	
	/** @type {InputItem_}*/
	const fireImmuneItems = [
		'structure_gel:building_tool',
		/adamantite/,
		/netherite/,
		/metallurgium/,
		/enderium/,
		/dark_metal/,
	]
	
	event.modify(fireImmuneItems, item => {
		item.setFireResistant(true);
	})
})