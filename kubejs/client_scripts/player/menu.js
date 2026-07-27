// KeyBindEvents.keyRelease('adjcore.menu', event => {
// 	if (Client.level) {
// 		RadialMenus.open('adj:player_menu');
// 	}
// });

// /// ---------------------------------------------- ///

// RadialMenuEvents.register(event => {
// 	const ringColors = ['#16a3e4f3', '#1a071bc2'];

// 	try {
// 		Actions.register('press_key', params => global.keyPressAction(params)); // because the built-in one was acting up on me
// 		Actions.register('open_menu', params => global.openMenuAction(params));
// 	}
// 	catch (e) {
// 		console.log(e);
// 	};


// 	/**
// 	 * Just here so that I can autocomplete it
// 	 * @param {Internal.KeyMapping_} keyMapping 
// 	 * @returns 
// 	 */
// 	function getKey(keyMapping) {
// 		return keyMapping;
// 	}

// 	/**
// 	 * 
// 	 * @param {Internal.KeyMapping_} keyMapping 
// 	 */
// 	function getHotkey(keyMapping) {
// 		let mapping = KeyBindUtil.ToKeyMapping(keyMapping);
// 		return mapping.isUnbound() ? 'UNBOUND' : mapping.getDefaultKey().getDisplayName().getString();
// 	}

// 	event.create('adj:player_menu')
// 		.radii(75, 135)
// 		.animationSpeed(0.8)
// 		.ringColors(ringColors)
// 		.slotItem(
// 			'Armor Settings',
// 			'iron_chestplate',
// 			Actions.of('open_menu', { menu: 'adj:armor' }),
// 			Text.of('Equipped Gear...'),
// 			global.menuHighlightColor
// 		)
// 		.slotItem(
// 			'Shaders',
// 			'cherry_sapling',
// 			Actions.of('open_menu', { menu: 'adj:shaders' }),
// 			Text.of('Shaders...'),
// 			global.menuHighlightColor
// 		)
// 		.slotItem(
// 			'World Map',
// 			'kubejs:map_atlas',
// 			Actions.of('press_key', { key: getKey('gui.xaero_open_map') }),
// 			Text.of('Open World Map'),
// 			global.menuHighlightColor
// 		)
// 		.slotItem(
// 			'Voice Chat Settings',
// 			'supplementaries:speaker_block',
// 			Actions.of('press_key', { key: getKey('key.voice_chat') }),
// 			Text.of(`Open Voice Chat Settings (Hotkey: ${getHotkey('key.voice_chat')})`),
// 			global.menuHighlightColor
// 		)
// 		.slotItem(
// 			'Mute Mic',
// 			'note_block',
// 			Actions.of('press_key', { key: getKey('key.mute_microphone') }),
// 			Text.of(`Mute/Unmute Microphone (Hotkey: ${getHotkey('key.mute_microphone')})`),
// 			global.menuHighlightColor
// 		)
// 		.slotItem(
// 			'Toggle First Person Model',
// 			Item.of('player_head', 1, { SkullOwner: `${Client.player.getUsername()}` }),
// 			Actions.of('press_key', { key: getKey('key.firstperson.toggle') }),
// 			Text.of(`Toggle Player Model\n(Hotkey: ${getHotkey('key.firstperson.toggle')})`),
// 			global.menuHighlightColor
// 		)

// 	event.create('adj:shaders')
// 		.radii(55, 100)
// 		.animationSpeed(1.0)
// 		.ringColors(ringColors)
// 		.slotItem(
// 			'Shader Selection',
// 			'filled_map',
// 			Actions.of('press_key', { key: getKey('iris.keybind.shaderPackSelection') }),
// 			Text.of('Open Shaders selection'),
// 			global.menuHighlightColor
// 		)
// 		.slotItem(
// 			'Toggle Shaders',
// 			'lever',
// 			Actions.of('press_key', { key: getKey('iris.keybind.toggleShaders') }),
// 			Text.of('Toggle Shaders'),
// 			global.menuHighlightColor
// 		)
// 		.slotItem(
// 			'Reload Shaders',
// 			'clock',
// 			Actions.of('press_key', { key: getKey('iris.keybind.reload') }),
// 			Text.of('Reload Shaders'),
// 			global.menuHighlightColor
// 		)

// 	event.create('adj:armor')
// 		.radii(55, 100)
// 		.animationSpeed(1.0)
// 		.ringColors(ringColors)
// 		.slotItem(
// 			'Armor Visibility',
// 			'rediscovered:gear',
// 			Actions.of('press_key', { key: getKey('key.showmeyourskin.open_settings') }),
// 			Text.of(`Configure armor visibility`),
// 			global.menuHighlightColor
// 		)
// 		.slotItem(
// 			'Loadout 1',
// 			'leather_chestplate',
// 			Actions.of('press_key', { key: getKey('adjcore.loadout.1') }),
// 			Text.of(`Loadout #1\n(Hotkey: ${getHotkey('adjcore.loadout.1')})`),
// 			global.menuHighlightColor
// 		)
// 		.slotItem(
// 			'Loadout 2',
// 			'golden_chestplate',
// 			Actions.of('press_key', { key: getKey('adjcore.loadout.2') }),
// 			Text.of(`Loadout #2\n(Hotkey: ${getHotkey('adjcore.loadout.2')})`),
// 			global.menuHighlightColor
// 		)
// 		.slotItem(
// 			'Loadout 3',
// 			'diamond_chestplate',
// 			Actions.of('press_key', { key: getKey('adjcore.loadout.3') }),
// 			Text.of(`Loadout #3\n(Hotkey: ${getHotkey('adjcore.loadout.3')})`),
// 			global.menuHighlightColor
// 		)

// 	event.create('adj:creative')
// 		.radii(55, 100)
// 		.animationSpeed(1.0)
// 		.ringColors(ringColors)
// 		.slotItem(
// 			'Time Skip',
// 			'clock',
// 			Actions.of('run_command', { command: '/time add 12000' }),
// 			Text.of('Skip time by 12 hours'),
// 			global.menuHighlightColor
// 		)
// 		.slotItem(
// 			'Gamemode 0',
// 			'oak_planks',
// 			Actions.of('run_command', { command: '/gamemode survival' }),
// 			Text.of('Gamemode: Casual'),
// 			global.menuHighlightColor
// 		)
// 		.slotItem(
// 			'Gamemode 1',
// 			'structure_gel:building_tool',
// 			Actions.of('run_command', { command: '/gamemode creative' }),
// 			Text.of('Gamemode: Journey'),
// 			global.menuHighlightColor
// 		)
// 		.slotItem(
// 			'Gamemode 3',
// 			'quark:cloud',
// 			Actions.of('run_command', { command: '/gamemode spectator' }),
// 			Text.of('Gamemode: Spectator'),
// 			global.menuHighlightColor
// 		)
// });

// /// ---------------------------------------------- ///

// global.openMenuAction = function (params) {
// 	const menu = params.get('menu').asString('');
// 	// console.log('Scheduled opening menu ' + menu);
// 	Client.scheduleInTicks(5, () => {
// 		RadialMenus.open(menu);
// 		// console.log('Opening menu ' + menu);
// 	});
// };

// const $KeyMapping = Java.loadClass('net.minecraft.client.KeyMapping');

// global.keyPressAction = function (params) {
// 	/** @type {Internal.KeyMapping_} */
// 	const keyStr = params.get('key').asString('');
// 	let keyMapping = KeyBindUtil.ToKeyMapping(keyStr);

// 	console.log('Pressing key ' + keyStr);

// 	if (!keyMapping) return;

// 	Client.scheduleInTicks(6, () => {
// 		const inputKey = keyMapping.getKey();

// 		// 1. Simulate discrete click event (increments clickCount so consumeClick() works)
// 		$KeyMapping.click(inputKey);

// 		// 2. Set key state down
// 		keyMapping.setDown(true);
// 		$KeyMapping.set(inputKey, true);
// 		console.log('Press')

// 		// 3. Release the key on the next tick so it doesn't stay stuck down
// 		Client.scheduleInTicks(1, () => {
// 			keyMapping.setDown(false);
// 			$KeyMapping.set(inputKey, false);
// 			console.log('Release')
// 		});
// 	});
// };