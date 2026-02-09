/**
 * @type {Internal.Block_}
 */
const drawerBlocks = [
	"functionalstorage:oak_1",
	"functionalstorage:oak_2",
	"functionalstorage:oak_4",
	"functionalstorage:compacting_drawer"
]

// const controllerBlock = "functionalstorage:storage_controller"

BlockEvents.placed(event => {
	const block = event.getBlock();
	const id = block.getId();
	if (id.includes('functionalstorage')) {
		let server = event.getServer();
		let pos = [block.x, block.y, block.z];
		if (drawerBlocks.includes(id)) {
			server.scheduleInTicks(1, () => {
				server.runCommandSilent(
					`data modify block ${pos[0]} ${pos[1]} ${pos[2]} storageUpgrades.Size set value 1`
				);
				server.runCommandSilent(
					`data modify block ${pos[0]} ${pos[1]} ${pos[2]} drawerOptions."Advanced: INDICATOR" set value 1b`
				);
			})
		}
	}
})
