NetworkEvents.dataReceived('get_world_size_var', event => {
	const variable = global.getFancyMenuVariables('world.border_size');
	if (variable) {
		event.getPlayer().sendData('get_world_size_var_server', {
			borderSize: variable.getValue()
		});
	}
});
