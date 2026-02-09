const CURRENT_STAGE = 'current_stage'
const STAGE_TO_SET = 'next_stage'

const gamerules = {
	'chapter_0': {
		'artifacts.crystalHeart.healthBonus': '40',
		'artifacts.aquaDashers.enabled': false,
		'artifacts.cloudInABottle.enabled': false,
		'naughtinessMechanics': false,
		'generationofInfectedDiamonds': false,
		'reducedDebugInfo': true,
		'seasonalEvents': false,
		'halloweenEvent': false,
		// those few never change

		'theappearanceoftheNightmareStalker': false,
		'corpseFishSpawn': false,
		'darkVortexSpawn': false,
		'bonescallerSpawn': false,
		'doPatrolSpawning': false,

		'fallenChaosKnightSpawn': false,
		'spiritOfChaosSpawn': false,
		'zombieClownSpawn': false,
		'doInsomnia': false,

		'motherSpiderSpawn': false,
		'krampusSpawn': false,
		'gluttonFishSpawn': false,

		'missionarySpawn': false,
		'lifestealerSpawn': false,
	},
	'chapter_1': {
		'theappearanceoftheNightmareStalker': true,
		'corpseFishSpawn': true,
		'darkVortexSpawn': true,
		'bonescallerSpawn': true,
		'doPatrolSpawning': true,
	},
	'chapter_2': {
		'doInsomnia': true,
		'fallenChaosKnightSpawn': true,
		'spiritOfChaosSpawn': true,
		'zombieClownSpawn': true,
	},
	'chapter_3': {
		'motherSpiderSpawn': true,
		'krampusSpawn': true,
		'gluttonFishSpawn': true,
	}
}

/**
 * Takes gamerules from a map and applies them
 * @param {Internal.MinecraftServer} server
 * @param {string} stage 
 */
function changeGamerules(server, stage) {
	const rulesToApply = gamerules[stage];

	if (!rulesToApply) return;

	for (const [gamerule, value] of Object.entries(rulesToApply)) {
		server.gameRules.set(gamerule, value)
	}
}

const chapterMessages = {
	'chapter_1': [
		global.announcementMsg('The spirits of hell flow into the Overworld...', global.messageColors.difficultyIncrease),
		global.announcementMsg('The caverns have been blessed with Mythril and Orichalcum', global.messageColors.newOre)
	],
	'chapter_2': [
		global.announcementMsg('The ancient spirits of darkness have been released', global.messageColors.difficultyIncrease),
		global.announcementMsg('Heavenly gates open...', global.messageColors.newDimension),
		global.announcementMsg('The hellish depths have been blessed with Palladium', global.messageColors.newOre)
	],
	'chapter_3': [
		global.announcementMsg('The ancient spirits of light have been released', global.messageColors.difficultyIncrease),
		global.announcementMsg('Dreams of a different realm start to materialize...', global.messageColors.newDimension),
		global.announcementMsg('Two legendary ores bless your other dimensions', global.messageColors.newOre)
	],
	'chapter_4': [
		global.announcementMsg('The boundary between dreams and nigthmares lessens...', global.messageColors.difficultyIncrease),
		global.announcementMsg('Awakened Ender Pearls start to twitch', global.messageColors.newDimension)
	],
	'chapter_5': [
		global.announcementMsg('A withered growl can be heard from across the realms...', global.messageColors.difficultyIncrease),
		global.announcementMsg('A metal defying reality manifests deep underground', global.messageColors.newOre)
	]
}

/**
 * Broadcasts all chat announcements for a given chapter
 * @param {Internal.MinecraftServer} server
 * @param {string} stage 
 */
function sendChapterAnnouncements(server, stage) {
	chapterMessages[stage].forEach(msg => {
		global.broadcast(server, msg);
	})
}

ADJServerEvents.recipeLookup(event => {

	const item = event.getItem();

	if (item.getId().includes('valkyrum')) {
		if (!server.persistentData.valkyrumUnlocked) {
			event.cancel();
			return;
		}
	}

	let chapters = [],
		exceptions = [];
	item.getTags().toArray().forEach(tag => {
		const str = tag.toString();
		if (!str.includes('chapter_')) return;
		const match = str.match(/adj:locked_until\/.*[^ ]*?(chapter_\w+)/);
		if (str.includes('exceptions')) {
			exceptions.push(match[1]);
		}
		else {
			chapters.push(match[1]);
		}
	});

	if (chapters.length == 0) return;

	let
		chapter = chapters.sort()[chapters.length - 1],
		exception = exceptions.sort()[exceptions.length - 1];;

	if ((!exception || chapter != exception) && !event.getLevel().getServer().persistentData.chapters[chapter]) {
		event.cancel()
	}
})

ServerEvents.tick(event => {
	const server = event.getServer();
	const persistentData = server.persistentData;
	if (!persistentData.chapters) {
		persistentData.chapters = {};
	}
	if (!persistentData.chapters.current_stage) {
		persistentData.chapters.putString(CURRENT_STAGE, 'chapter_0');
		changeGamerules(server, 'chapter_0');
		return;

	}

	const stageToSet = persistentData.chapters.get(STAGE_TO_SET);
	if (stageToSet) {
		const stageName = stageToSet.toString().replace("\"", "")
		if (!persistentData.chapters.get(stageName)) {
			console.log('Progressing the world to stage \'' + stageName + '\'')
			persistentData.chapters.putString(CURRENT_STAGE, stageName);
			server.runCommandSilent(
				'/gamestate ' + stageName
			);
			persistentData.chapters.put(stageName, true);
			changeGamerules(server, stageName);
			sendChapterAnnouncements(server, stageName);
		}
		else console.log('Attempted to reapply a stage that was already present!')
		persistentData.chapters.remove(STAGE_TO_SET);
	}
})

PlayerEvents.tick(event => {
	const player = event.getPlayer();
	const server = event.getServer();
	const stage = server.persistentData.chapters.get(CURRENT_STAGE);
	if (stage) {
		const stageName = stage.toString().replace("\"", "");
		const currentIndex = Number.parseInt(stageName.replace('chapter_', ''));

		if (!player.stages.has(stageName)) {

			for (let i = 0; i <= currentIndex; i++) {
				let stageToGrant = STAGES[i];
				if (!player.stages.has(stageToGrant)) {
					player.stages.add(stageToGrant);
					server.runCommandSilent(
						'/decstages add ' + player.getUsername() + ' ' + stageToGrant + ' true'
					);
				}
			}

		}

		if (stageName === 'chapter_0' && player.level.dimension === 'minecraft:the_nether') {
			server.persistentData.chapters.putString(STAGE_TO_SET, 'chapter_1');
		}

		// Valkyrum side progression
		if (server.persistentData.valkyrumUnlocked && !player.stages.has('valkyrum_unlocked')) {
			player.stages.add('valkyrum_unlocked');
		}
	}
});


// Restriction tags
ServerEvents.tags('item', restrictions => {

	restrictions.add('adj:locked_until/chapter_1', global.stageRestrictions.chapter_1.list);
	restrictions.add('adj:locked_until/light/chapter_1', global.stageRestrictions.chapter_1.light);
	restrictions.add('adj:locked_until/exceptions/chapter_1', global.stageRestrictions.chapter_1.exceptions);

	restrictions.add('adj:locked_until/chapter_2', global.stageRestrictions.chapter_2.list);
	restrictions.add('adj:locked_until/light/chapter_2', global.stageRestrictions.chapter_2.light);
	restrictions.add('adj:locked_until/exceptions/chapter_2', global.stageRestrictions.chapter_2.exceptions);

	restrictions.add('adj:locked_until/chapter_3', global.stageRestrictions.chapter_3.list);
	restrictions.add('adj:locked_until/light/chapter_3', global.stageRestrictions.chapter_3.light);
	restrictions.add('adj:locked_until/exceptions/chapter_3', global.stageRestrictions.chapter_3.exceptions);

	restrictions.add('adj:locked_until/chapter_4', global.stageRestrictions.chapter_4.list);
	restrictions.add('adj:locked_until/light/chapter_4', global.stageRestrictions.chapter_4.light);
	restrictions.add('adj:locked_until/exceptions/chapter_4', global.stageRestrictions.chapter_4.exceptions);

	restrictions.add('adj:locked_until/chapter_5', global.stageRestrictions.chapter_5.list);
	restrictions.add('adj:locked_until/light/chapter_5', global.stageRestrictions.chapter_5.light);
	restrictions.add('adj:locked_until/exceptions/chapter_5', global.stageRestrictions.chapter_5.exceptions);


})

ItemEvents.rightClicked('ender_eye', event => {
	const player = event.getPlayer();
	if (!player.stages.has('chapter_4')) {
		player.displayClientMessage(Component.literal('It\'s not reacting to anything').red(), true)
		event.cancel();
	}
})

BlockEvents.rightClicked('command_block', event => {
	if (event.getItem().id == 'minecraft:wither_skeleton_skull' && !event.getPlayer().stages.has('chapter_5')) {
		player.displayClientMessage(Component.literal('It pops back off, away from the block').red(), true)
		event.cancel();
	}
})

////////////////////
////////////////////

const RESET_PROGRESS = 'adjresetprogress';
const JUMP_PROGRESS = 'jumpprogress';
const STAGES = [
	'chapter_0',
	'chapter_1',
	'chapter_2',
	'chapter_3',
	'chapter_4',
	'chapter_5'
]
ServerEvents.commandRegistry(event => {

	const { commands: Commands, arguments: Arguments } = event

	event.register(Commands.literal(RESET_PROGRESS)
		.requires(s => s.hasPermission(4))
		.executes(c => resetProgress(c.source.player, c.source.server))
	)
	let resetProgress = (player, server) => {
		let serverData = server.persistentData;
		STAGES.forEach(stage => {
			player.stages.remove(stage)
			serverData.chapters.remove(stage)
			server.runCommandSilent(
				'/decstages remove ' + player.getUsername() + ' ' + stage + ' true'
			)
		})
		serverData.chapters.remove(CURRENT_STAGE)
		server.runCommandSilent(
			'/gamestate normal'
		)
		player.tell(Text.red('Reset all internal progress'))
		changeGamerules(server, 'chapter_0')
		return 1
	}

	event.register(Commands.literal(JUMP_PROGRESS)
		.requires(s => s.hasPermission(4))
		.then(Commands.argument('chapter', Arguments.INTEGER.create(event))
			.executes(c => jumpProgress(c.source.player, c.source.server, Arguments.INTEGER.getResult(c, 'chapter')))
		)
	)
	/**
	 * 
	 * @param {$Player_} player 
	 * @param {$MinecraftServer_} server 
	 * @param {integer} chapter 
	 * @returns 
	 */
	let jumpProgress = (player, server, chapter) => {

		server.persistentData.chapters.put(STAGE_TO_SET, `chapter_${chapter}`)

		player.tell(Text.red('Jumped to chapter ' + chapter))
		return 1
	}
})
