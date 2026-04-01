NetworkEvents.dataReceived('elsa_crossbow_draw', event => {
	const player = event.getPlayer();
	const data = event.getData();

	let timeLeft = data.amount;

	if (timeLeft == 1) {
		player.paint(player.paint({ 'elsa_bullet': { remove: true } }));
		player.paint(player.paint({ 'elsa_time_left': { remove: true } }));
	}
	else {

		let x0 = `($screenW / 2)`;
		let y0 = `($screenH / 2)`;

		let map = {};

		function tex() {
			let num = Math.floor(timeLeft / 120);
			return `adj:textures/gui/elsa_crossbow/indicator_${num.replace('.0', '')}.png`
		}

		map['elsa_bullet'] = {
			type: 'rectangle',
			x: `(${x0})`,
			y: `(${y0}) + 20`,
			w: SIZE,
			h: SIZE,
			alignX: 'center',
			texture: tex(1),
			draw: 'ingame'
		};

		map[`elsa_time_left`] = {
			type: 'text',
			x: `(${x0})`,
			y: `(${y0} + 36)`,
			text: `${Math.floor(timeLeft / 20).toString().replace('.0', '')}s`,
			centered: true,
			shadow: false,
			color: '#FFFFFF',
			alignX: 'center',
			scale: 1,
			draw: 'ingame'
		};

		player.paint(map);
	}
});
