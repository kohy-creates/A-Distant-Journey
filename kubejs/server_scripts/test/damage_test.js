const shouldLog = true;

EntityEvents.hurt(event => {
	if (event.getSource().getType() == 'mob' && event.getSource().getActual().getType() == 'minecraft:player') {
	}
})