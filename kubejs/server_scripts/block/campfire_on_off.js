BlockEvents.rightClicked(event => {

	if (event.getHand().toString() !== 'MAIN_HAND') return;
	const block = event.getBlock();
	if (block.id.includes('campfire')) {

		const props = block.getProperties();
		const isLit = props.lit == 'true';
		const player = event.getPlayer();
		const heldItem = player.getMainHandItem();

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
})
