PlayerEvents.inventoryChanged(event => {
	const id = event.getItem().getItem().getId();

	/**
	 * @type {Array}
	 */
	const tip = global.LCETips[id];
	if (!tip) return;

	const player = event.getPlayer();
	const data = player.persistentData;

	if (!data.hasSeenTipsFor) {
		data.hasSeenTipsFor = {};
	}

	if (!data.hasSeenTipsFor[id]) {
		data.hasSeenTipsFor[id] = true;

		let title, description;
		if (tip.length === 1) {
			title = global.toTitleCase(global.textReplaceAll(id.split(':')[1]), '_', '');
			description = tip[0];
		}
		else {
			title = tip[0];
			description = tip[1]
		}

		if (!description.endsWith('.')) {
			description = description + '.'; // cause I often forget
		}

		player.sendData('lce_tip', {
			item: id,
			title: title,
			description: description, // cause I often forget
			duration: tip[2] ?? 200
		});
	}
});
