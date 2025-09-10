const eyeDrops = {
	'minecraft:wither': 'cinders',
	'lost_aether_content:aerwhale_king': 'angels',
	'rediscovered:red_dragon': 'dreams',
	'catacylsm:ender_guardian': 'desolation'
}

const chapterMap = {
	'cinders': 2,
	'angels': 3,
	'dreams': 4,
	'desolation': 5
}

EntityEvents.death(event => {
	const entity = event.getEntity()
	const entityType = entity.getType()
	if (Object.keys(eyeDrops).includes(entityType)) {
		const eye = eyeDrops[entityType];
		const server = event.getServer();
		const pData = server.persistentData;
		if (!pData.eyes) {
			pData.eyes = {};
		}
		let chance = (server.isHardcore) ? 0.33 : 0.2;
		if (!pData.eyes[eye]) {
			pData.eyes[eye] = true;
			chance = 1;
		}
		if (Math.random() <= chance) {
			server.runCommandSilent(`/execute in ${entity.level.dimension} run summon marker ${entity.x} ${entity.y + (entity.eyeHeight / 2)} ${entity.z} {Tags:["adj.eye_marker", "adj.eye_of_${eye}"]}`)

			const name =
				eye.charAt(0).toUpperCase()
				+ eye.slice(1)

			console.log(`Spawning Eye of ${name} at ${entity.x} ${entity.y} ${entity.z}`)
		}
	}
})

ItemEvents.pickedUp(/kubejs:eye_of_.*/, event => {
	for (const [entity, eye] of Object.entries(eyeDrops)) {
		if (eye == event.getItem().getId().toString().replace('kubejs:eye_of_', '')) {
			let pDataChapters = event.getServer().persistentData.chapters;
			let currentChapter = parseInt((pDataChapters.current_stage.toString()).replace('chapter_', ''));
			let newChapter = chapterMap[eye];

			if (newChapter > currentChapter && ((eye === 'cinders')
				? (newChapter - currentChapter === 1 || newChapter - currentChapter === 2)
				: (newChapter - currentChapter === 1))
			) {
				pDataChapters.next_stage = `chapter_${newChapter}`;
				event.getServer().runCommandSilent(
					`/execute as ${event.getPlayer().username} at @s run function adj:eye/pickup`
				)
			}
		}
	}
})
