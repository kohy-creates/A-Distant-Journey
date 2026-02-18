const vengeanceSpiritBanned = [
	global.bossMobs,
	'evilcraft:vengeance_spirit',
	'evilcraft:controlled_zombie',
	'evilcraft:werewolf',
	'window_box:marker',
	'window_box:fake_player'
]

EntityEvents.spawned(event => {
	const entity = event.getEntity();
	switch (entity.type) {
		case 'botania:mana_burst': {
			if (entity.nbt.lensStack.id === 'botania:terra_sword') {
				event.cancel()
			}
			break;
		}
		case 'evilcraft:vengeance_spirit': {
			if (vengeanceSpiritBanned.includes(entity.nbt.innerEntity)) {
				event.cancel()
			}

		}
	}
})
