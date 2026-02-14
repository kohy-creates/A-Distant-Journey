EntityEvents.spawned(event => {
	const entity = event.getEntity();
	switch (entity.type) {
		case 'adjcore:terra_slash': {
			entity.level.playSound(null, entity.x, entity.y, entity.z, 'adj:item.terra_blade.slash', 'players', 1, 1)
			break;
		}
		case 'botania:falling_star': {
			entity.level.playSound(null, entity.x, entity.y, entity.z, 'adj:item.star_platinum.spawn_star', 'players', 1, 1)
			break;
		}
	}
})
