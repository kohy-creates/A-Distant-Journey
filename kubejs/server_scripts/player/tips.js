PlayerEvents.inventoryChanged(event => {
	const id = event.getItem().getItem().getId();
	const tip = global.LCETips[id];
	if (!tip) return;

	const player = event.getPlayer();
	const data = player.persistentData;

	if (!data.hasSeenTipsFor) {
		data.hasSeenTipsFor = {};
	}

	if (!data.hasSeenTipsFor[id]) {
		data.hasSeenTipsFor[id] = true;

		player.sendData('lce_tip', {
			item: id,
			title: tip[0],
			description: (!tip[1].endsWith('.')) ? tip[1] + '.' : tip[1], // cause I often forget
			duration: tip[2] ?? 200
		});
	}
});
