ServerEvents.tags('block', tags => {
	const blockNeedsTieredTool = {
		'minecraft:needs_wooden_tool': [
			'minecraft:copper_ore',
			'minecraft:deepslate_copper_ore',
		],
		'minecraft:needs_stone_tool': [
			'-minecraft:copper_ore',
			'-minecraft:deepslate_copper_ore'
		],
		'minecraft:needs_iron_tool': [
			/deepslate/
		],
		'minecraft:needs_diamond_tool': [
			/end_stone/,
			/palladium/,
			/purpur/,
			/orichalcum/,
			/mythril/,
			/myalite/,
			/valkyrum/
		],
		'forge:needs_netherite_tool': [
			/waystones\:/,
			/enderium/,
			/unobtainium/,
			'architects_palette:unobtanium_block'
		],
		'adjcore:needs_tier_5_tool': [
			/metallurgium/,
			/celestium/,
		],
		'adjcore:needs_tier_6_tool': [
			'summoningrituals:altar'
		],
	}

	for (const [tag, entries] of Object.entries(blockNeedsTieredTool)) {
		let map = {
			remove: [],
			add: []
		}

		entries.forEach(block => {
			if (typeof block === "string" && block.startsWith('-')) {
				map.remove.push(block.substring(1))
			} else {
				map.add.push(block)
			}
		})

		tags.remove(tag, map.remove)
		tags.add(tag, map.add)
	}
})