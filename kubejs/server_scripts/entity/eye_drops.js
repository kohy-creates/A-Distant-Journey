const eyeDrops = {
	'minecraft:wither': 'cinders',
	'lost_aether_content:aerwhale_king': 'angels',
	'rediscovered:red_dragon': 'dreams',
	'catacylsm:ender_guardian': 'desolation'

}

EntityEvents.death(event => {
	const entityType = event.getEntity().getType()
	if (Object.keys(eyeDrops).includes(entityType)) {
		const eye = eyeDrops[entityType];
		const eyeItem = `eye_of_${entityType}`
	}
})
