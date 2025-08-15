const spawnEggs = /.*spawn_egg$/

JEIEvents.hideItems(event => {

	event.hide([
		spawnEggs,
		global.rediscoveredFurniture,
	])

})


JEIEvents.addItems(event => {

	event.add(Ingredient.of('bundle'))

})
