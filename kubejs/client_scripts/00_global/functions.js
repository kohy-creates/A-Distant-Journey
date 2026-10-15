/**
 * Returns the value of a FancyMenu variable, or null if that variable does not exist.
 * @param {*} name 
 * @returns {string | null}
 */
global.getFancyMenuVariables = function (name) {
	return $FMVariableHandler.getVariable(name);
};

/**
 * Returns the x-coordinate of the mouse in the game window.
 * @returns {number}
 */
global.getMouseX = function () {
	return Client.mouseHandler.xpos()
		* Client.getWindow().getGuiScaledWidth()
		/ Client.getWindow().getScreenWidth();
};

/**
 * Returns the y-coordinate of the mouse in the game window.
 * @returns {number}
 */
global.getMouseY = function () {
	return Client.mouseHandler.ypos()
		* Client.getWindow().getGuiScaledHeight()
		/ Client.getWindow().getScreenHeight();
};
