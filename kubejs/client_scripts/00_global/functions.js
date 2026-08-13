/**
 * Returns the value of a FancyMenu variable, or null if that variable does not exist.
 * @param {*} name 
 * @returns {string | null}
 */
global.getFancyMenuVariables = function (name) {
	return $FMVariableHandler.getVariable(name);
};
