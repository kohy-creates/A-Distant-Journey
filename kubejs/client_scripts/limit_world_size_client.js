const $FMVariableHandler = Java.loadClass('de.keksuccino.fancymenu.customization.variables.VariableHandler');

NetworkEvents.dataReceived('get_world_size_var', event => {
    const variable = $FMVariableHandler.getVariable('world.border_size');
    if (variable) {
        event.getPlayer().sendData('get_world_size_var_server', {
            borderSize: variable.getValue()
        });
    }
});
