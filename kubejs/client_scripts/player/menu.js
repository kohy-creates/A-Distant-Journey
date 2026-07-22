// const PlayerMenu = {
// 	/**
// 	 * Simulates the given keybind being pressed
// 	 * Currently unused, but I kept it cause it might come in handy.
// 	 * @param {Internal.KeyMapping_} keyMapping 
// 	 */
// 	simulateKeyPress: function (keyMapping) {
// 		let keyMapping = KeyBindUtil.ToKeyMapping(keyMapping);
// 		keyMapping.setDown(true);
// 		keyMapping.clickCount = 1;
// 	},
// };

KeyBindEvents.keyRelease('adjcore.menu', event => {
	RadialMenus.open('adj:player_menu');
	console.log('test')
});

/// ---------------------------------------------- ///

RadialMenuEvents.register(event => {
	const ringColors = ['1A071B10', 'D91A6B3A'];
	const highlightColor = '#77FFFFFF';

	/**
	 * Just here so that I can autocomplete it
	 * @param {Internal.KeyMapping_} keyMapping 
	 * @returns 
	 */
	function getKey(keyMapping) {
		return keyMapping
	}

	/**
	 * 
	 * @param {Internal.KeyMapping_} keyMapping 
	 */
	function getHotkey(keyMapping) {
		let mapping = KeyBindUtil.ToKeyMapping(keyMapping);
		return mapping.isUnbound() ? 'UNBOUND' : mapping.getDefaultKey().getDisplayName().getString();
	}

	event.create('adj:player_menu')
		.radii(55, 100)
		.animationSpeed(1.0)
		.ringColors(ringColors)
		.slot(
			'Armor Settings',
			Item.of('iron_chestplate'),
			Actions.of('open_menu', { menu: 'adj:armor' }),
			Text.of('Equipped Gear...'),
			highlightColor
		)
		.slot(
			'Shaders',
			Item.of('cherry_sapling'),
			Actions.of('open_menu', { menu: 'adj:shaders' }),
			Text.of('Shaders...'),
			highlightColor
		)
		.slot(
			'World Map',
			Item.of('kubejs:map_atlas'),
			Actions.of('simulate_key', { key_code: getKey('gui.xaero_open_map') }),
			Text.of('Open World Map'),
			highlightColor
		)
		.slot(
			'World Map',
			Item.of('kubejs:map_atlas'),
			Actions.of('simulate_key', { key_code: getKey('gui.xaero_open_map') }),
			Text.of('Open World Map'),
			highlightColor
		)
		.slot(
			'Voice Chat Settings',
			Item.of('supplementaries:speaker_block'),
			Actions.of('simulate_key', { key_code: getKey('key.voice_chat_settings') }),
			Text.of(`Open Voice Chat Settings (Hotkey:${getHotkey('key.voice_chat_settings')})`),
			highlightColor
		)
		.slot(
			'Mute Mic',
			Item.of('note_block'),
			Actions.of('simulate_key', { key_code: getKey('key.mute_microphone') }),
			Text.of(`Mute/Unmute Microphone (Hotkey:${getHotkey('key.mute_microphone')})`),
			highlightColor
		)

	event.create('adj:shaders')
		.radii(55, 100)
		.animationSpeed(1.0)
		.ringColors(ringColors)
		.slot(
			'Shader Selection',
			Item.of('filled_map'),
			Actions.of('simulate_key', { key_code: getKey('iris.keybind.shaderPackSelection') }),
			Text.of('Open Shaders selection'),
			highlightColor
		)
		.slot(
			'Toggle Shaders',
			Item.of('lever'),
			Actions.of('simulate_key', { key_code: getKey('iris.keybind.toggleShaders') }),
			Text.of('Toggle Shaders'),
			highlightColor
		)
		.slot(
			'Reload Shaders',
			Item.of('clock'),
			Actions.of('simulate_key', { key_code: getKey('iris.keybind.reload') }),
			Text.of('Reload Shaders'),
			highlightColor
		)

	event.create('adj:armor')
		.radii(55, 100)
		.animationSpeed(1.0)
		.ringColors(ringColors)
		.slot(
			'Armor Visibility',
			Item.of('rediscovered:gear'),
			Actions.of('simulate_key', { key_code: getKey('key.showmeyourskin.open_settings') }),
			Text.of(`Configure armor visibility (Hotkey:${getHotkey('key.showmeyourskin.open_settings')})`),
			highlightColor
		)
		.slot(
			'Loadout 1',
			Item.of('leather_chestplate'),
			Actions.of('simulate_key', { key_code: getKey('adjcore.loadout.1') }),
			Text.of(`Switch loadout to Loadout #1 (Hotkey: ${getHotkey('adjcore.loadout.1')})`),
			highlightColor
		)
		.slot(
			'Loadout 2',
			Item.of('gold_chestplate'),
			Actions.of('simulate_key', { key_code: getKey('adjcore.loadout.2') }),
			Text.of(`Switch loadout to Loadout #2 (Hotkey: ${getHotkey('adjcore.loadout.2')})`),
			highlightColor
		)
		.slot(
			'Loadout 3',
			Item.of('diamond_chestplate'),
			Actions.of('simulate_key', { key_code: getKey('adjcore.loadout.3') }),
			Text.of(`Switch loadout to Loadout #3 (Hotkey: ${getHotkey('adjcore.loadout.3')})`),
			highlightColor
		)

	event.create('adj:creative')
		.radii(55, 100)
		.animationSpeed(1.0)
		.ringColors(ringColors)
		.slot(
			'Time Skip',
			Item.of('clock'),
			Actions.of('run_command', { command: '/time add 12000' }),
			Text.of('Skip time by 12 hours'),
			highlightColor
		)
		.slot(
			'Gamemode 0',
			Item.of('oak_planks'),
			Actions.of('run_command', { command: '/gamemode survival' }),
			Text.of('Gamemode: Casual'),
			highlightColor
		)
		.slot(
			'Gamemode 1',
			Item.of('structure_gel:building_tool'),
			Actions.of('run_command', { command: '/gamemode creative' }),
			Text.of('Gamemode: Journey'),
			highlightColor
		)
		.slot(
			'Gamemode 3',
			Item.of('quark:cloud'),
			Actions.of('run_command', { command: '/gamemode spectator' }),
			Text.of('Gamemode: Spectator'),
			highlightColor
		)
});

/// ---------------------------------------------- ///

Actions.register('open_menu', params => {
	const menu = params.get('menu').asString('');
	RadialMenus.open(menu);
});
