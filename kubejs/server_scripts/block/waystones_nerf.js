BlockEvents.broken(event => {
	let block = event.getBlock();
	if (block.id.toString().includes('waystones:')) {
		let player = event.getPlayer();
		let tool = player.getMainHandItem();
		if (tool.getItem().getTier().getLevel() < 4) event.getServer().scheduleInTicks(1, () => {
			event.getServer().runCommandSilent( // Because of course KJS wouldn't work like it's supposed to
				'/execute in ' + event.getLevel().getDimension() + ' positioned ' + block.pos.x + ' ' + block.pos.y + ' ' + block.pos.z + ' run kill @e[type=item,limit=1,sort=nearest]'
			)
		})
	}
})
