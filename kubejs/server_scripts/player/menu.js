const PlayerMenu = {
	addCreativeSlot: function () {
		RadialMenus.addSlot(
			'adj:player_menu',
			'Creative',
			Item.of('command_block'),
			Actions.of('open_menu', { menu: 'adj:creative' }),
			Text.of('Creative...'),
			highlightColor
		)
	},
	removeCreativeSlot: function () {
		RadialMenus.removeSlotForMenu('adj:player_menu', 'Creative');
	}
}

NativeEvents.onEvent('normal', false, $PlayerChangeGameModeEvent, event => {
	const player = event.getEntity();
	const gamemode = event.getNewGameMode();
	console.log('logged in')
	console.log(gamemode.getId())

	if (gamemode.getId() == 1) {
		PlayerMenu.addCreativeSlot();
	}
	else {
		PlayerMenu.removeCreativeSlot();
	}
});

PlayerEvents.loggedIn(event => {
	if (event.getPlayer().isCreative()) {
		PlayerMenu.addCreativeSlot();
	}
	else {
		PlayerMenu.removeCreativeSlot()
	}
});
