NetworkEvents.dataReceived('elsa_crossbow_draw', event => {
	const player = event.getPlayer();
	const data = event.getData();

	let timeLeft = (data) ? data.amount : 0;

	if (timeLeft == 0) {
		player.paint({ 'elsa_bullet': { remove: true } });
		player.paint({ 'elsa_time_left': { remove: true } });
	}
	else {

		let num = Math.floor(timeLeft / 120 * 14);

		let x0 = `(0)`;
		let y0 = `($screenH / 2)`;

		let map = {};

		map['elsa_bullet'] = {
			type: 'rectangle',
			x: `(${x0})`,
			y: `(${y0} + 20)`,
			w: 16,
			h: 16,
			alignX: 'center',
			texture: `adj:textures/gui/elsa_crossbow/indicator_${(Math.min(14, num)).toString().replace('.0', '')}.png`,
			draw: 'ingame'
		};

		map[`elsa_time_left`] = {
			type: 'text',
			x: `(${x0})`,
			y: `(${y0} + 40)`,
			text: `${Math.floor(timeLeft / 20 + 1).toString().replace('.0', '')}s`,
			centered: false,
			shadow: false,
			color: '#FFFFFF',
			alignX: 'center',
			scale: 1,
			draw: 'ingame'
		};

		player.paint(map);
	}
});
