const TwilightForestProgression = {
	messages: {
		'naga': 'The force field around Lich\'s Tower weakens...',
		'lich': 'The swamp calms down, and the dark forest let\'s in some light',
		'minoshroom': 'Roars echo from the fiery plains...',
		'knight_phantom': 'Cries echo from the center of the Dark Forest...',
		'hydra': 'Snowflakes twirl in the air in the Twilight Forest...',
		'alpha_yeti': 'The barrier around the frozen castle weakens...',
		'snow_queen': 'Acid rain has passed in the highlands...',
	},

	stagesAndAdvancementsPair: {
		'naga': '1',
		'lich': '2',
		'minoshroom': '2_5',
		'knight_phantom': '2_75',
		'hydra_and_ur_ghast': '3',
		'alpha_yeti': '4',
		'snow_queen': '4_5',
		'giants': '4_75'
	},

	/**
	 * Logic for calling this is handled in decursio_stages.js
	 * It's stored in a const scope like this so that it doesn't litter the global server scope
	 * (so that I can do more onChapterUpdate hooks like this when needed)
	 * @param {Internal.MinecraftServer_} server 
	 * @param {string} newChapter 
	 */
	onChapterUpdate: (server, newChapter) => {
		const persistentData = server.getPersistentData();
		const data = persistentData.tfProgress;

		function isCompletedNotUnlocked(type) {
			if (!data[type]) {
				return false;
			}
			return (data[type].completed && !data[type].unlocked);
		}

		function processEntry(type) {
			if (isCompletedNotUnlocked(type)) {
				data[type].unlocked = true;
				global.broadcast(server, global.announcementMsg(Text.of(TwilightForestProgression.messages[type]), global.messageColors.twilightForestProgress));
			}
		}

		switch (newChapter) {
			case 'chapter_2': {
				processEntry('lich');
				break;
			}
			case 'chapter_3': {
				processEntry('minoshroom');
				processEntry('knight_phantom');
				break;
			}
			case 'chapter_4': {
				if (
					data.tfProgress
					&& data.tfProgress.progressMerge
					&& data.tfProgress.progressMerge.hydra
					&& data.tfProgress.progressMerge.ur_ghast
					&& !data.tfProgress.progressMerge.unlocked
				) {
					data.tfProgress.progressMerge.unlocked = true;
					global.broadcast(server, global.announcementMsg(Text.of(TwilightForestProgression.messages.hydra), global.messageColors.twilightForestProgress));
				}
				break;
			}
		}
	},
}

EntityEvents.death(event => {

	const entity = event.getEntity();
	const server = event.getServer();

	if (!entity.getType().includes('twilightforest')) return;

	const data = server.getPersistentData();
	if (!data.tfProgress) {
		data.tfProgress = {};
	}

	const currentChapter = parseInt(
		data.chapters.current_stage
			.toString()
			.replace('"', '')
			.replace('chapter_', '')
	);

	/**
	 * Processes the kill event. Either ignores it, marks as completed or schedules it.
	 * @param {string} entry 
	 * @param {integer?} chapterRequired
	 */
	function process(entry, chapterRequired) {
		console.log(`Processing progress death for '${entry}'`);
		if (!data.tfProgress[entry]) {
			console.log(`Not present, creating tag...`);
			if (currentChapter >= ((chapterRequired) ? chapterRequired : 0)) {
				data.tfProgress[entry] = {
					completed: true,
					unlocked: true,
				};
				global.broadcast(server, global.announcementMsg(Text.of(TwilightForestProgression.messages[entry]), global.messageColors.twilightForestProgress));
			}
			else {
				data.tfProgress[entry] = {
					completed: true,
					unlocked: false,
				}
			}
		}
	}

	/**
	 * Used for merging progression after killing both Ur-Ghast and Hydra
	 * @param {string} entry 
	 */
	function handleProgressMerge(entry) {
		if (!data.tfProgress.progressMerge) {
			data.tfProgress.progressMerge = {
				hydra: false,
				ur_ghast: false,
				unlocked: false,
			};
		}
		data.tfProgress.progressMerge[entry] = true;
		if (data.tfProgress.progressMerge.hydra && data.tfProgress.progressMerge.ur_ghast && currentChapter >= 3) {
			data.tfProgress.progressMerge.unlocked = true;
			global.broadcast(server, global.announcementMsg(Text.of(TwilightForestProgression.messages.hydra), global.messageColors.twilightForestProgress));
		}
	}

	switch (entity.getType()) {
		case 'twilightforest:naga': {
			process('naga');
			break;
		}
		case 'twilightforest:lich': {
			process('lich', 2);
			break;
		}
		case 'twilightforest:minoshroom': {
			process('minoshroom', 3);
			break;
		}
		case 'twilightforest:knight_phantom': {
			process('knight_phantom', 3);
			break;
		}
		case 'twilightforest:ur_ghast': {
			handleProgressMerge('ur_ghast');
			break;
		}
		case 'twilightforest:hydra': {
			handleProgressMerge('hydra');
			break;
		}
		case 'twilightforest:alpha_yeti': {
			process('alpha_yeti', 4);
			break;
		}
		case 'twilightforest:snow_queen': {
			process('snow_queen', 4);
			break;
		}
	}
});

// If this lags I'll kill myself
PlayerEvents.tick(event => {
	const player = event.getPlayer();
	const server = event.getServer();
	const tfProgressData = server.getPersistentData().tfProgress;
	if (!tfProgressData) return;

	function processStageTypical(type) {
		if (tfProgressData[type] && tfProgressData[type].unlocked && !player.stages.has(`tf_progress.killed_${type}`)) {
			player.stages.add(`tf_progress.killed_${type}`);
			server.runCommand(
				`advancement grant ${player.getName().getString()} only adj:twilight_forest/part_${TwilightForestProgression.stagesAndAdvancementsPair[type]}`
			);
		}
	}

	processStageTypical('naga');
	processStageTypical('lich');
	processStageTypical('knight_phantom');
	processStageTypical('minoshroom');

	if (tfProgressData.progressMerge && tfProgressData.progressMerge.unlocked && !player.stages.has('tf_progress.killed_ur_ghast_and_hydra')) {
		player.stages.add('tf_progress.killed_ur_ghast_and_hydra');
		server.runCommand(
			`advancement grant ${player.getName().getString()} only adj:twilight_forest/part_${TwilightForestProgression.stagesAndAdvancementsPair.hydra_and_ur_ghast}`
		);
	}

	processStageTypical('alpha_yeti');
	processStageTypical('snow_queen');

	if (server.getPersistentData().hasPickedUpLampOfCinders && !player.stages.has('tf_progress.lamp_of_cinders')) {
		player.stages.add('tf_progress.lamp_of_cinders');
		server.runCommand(
			`advancement grant ${player.getName().getString()} only adj:twilight_forest/part_${TwilightForestProgression.stagesAndAdvancementsPair.giants}`
		);
	}
});

PlayerEvents.inventoryChanged('twilightforest:lamp_of_cinders', event => {
	const data = event.getServer().getPersistentData();
	if (!data.hasPickedUpLampOfCinders) {
		data.hasPickedUpLampOfCinders = true;
	}
});
