BlockEvents.rightClicked(event => {

	if (event.getHand().toString() !== 'MAIN_HAND') return;

	const block = event.getBlock();
	if (block.id.includes('campfire')) {

		let props = block.getProperties();
		let isLit = props.lit == 'true';
		let player = event.getPlayer();
		let heldItem = player.getMainHandItem();

		if (heldItem.id === 'minecraft:air') {
			let newProps = {};
			for (let key in props) {
				newProps[key] = props[key];
			}
			newProps['lit'] = !isLit;
			block.set(block.id, newProps);
			player.swing('main_hand', true)
		}
	}
	else if (block.id.includes('candle')) {

		let props = block.getProperties();
		let isLit = props.lit == 'true';

		if (isLit) return;

		let player = event.getPlayer();
		let heldItem = player.getMainHandItem();

		if (heldItem.id === 'minecraft:air') {
			let newProps = {};
			for (let key in props) {
				newProps[key] = props[key];
			}
			newProps['lit'] = !isLit;
			event.getServer().scheduleInTicks(1, () => {
				block.set(block.id, newProps);
				if (block.id.includes('super_candle')) {
					let up = block.up;
					if (up.id.includes('super_candle_wick'));
					let propsWick = up.getProperties();
					let newWickProps = {};
					for (let keyWick in propsWick) {
						newWickProps[keyWick] = propsWick[keyWick];
					}
					newWickProps['lit'] = !isLit;
					up.set(up.id, newWickProps);
				}
			})
			player.swing('main_hand', true)
		}
	}
})

// Candles are on by default
BlockEvents.placed(/candle/, event => {
	const block = event.getBlock();
	const props = block.getProperties();
	if (props.lit == 'true') return;
	const newProps = {};
	for (let key in props) {
		newProps[key] = props[key];
	}
	newProps['lit'] = true;
	block.set(block.id, newProps);
	if (block.id.includes('super_candle')) {
		const up = block.up;
		if (up.id.includes('super_candle_wick'));
		const propsWick = up.getProperties();
		const newWickProps = {};
		for (let keyWick in propsWick) {
			newWickProps[keyWick] = propsWick[keyWick];
		}
		newWickProps['lit'] = true;
		up.set(up.id, newWickProps);
	}
})
