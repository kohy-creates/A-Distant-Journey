const spawnEggs = /.*spawn_egg.*/

JEIEvents.hideItems(event => {

	event.hide([
		spawnEggs,
		global.rediscoveredFurniture,
	])

})
