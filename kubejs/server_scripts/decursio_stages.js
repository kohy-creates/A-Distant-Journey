const DecursioStages = {
	CURRENT_STAGE: 'current_stage',
	STAGE_TO_SET: 'next_stage',
	STAGES: [
		'chapter_0',
		'chapter_1',
		'chapter_2',
		'chapter_3',
		'chapter_4',
		'chapter_5'
	],
	GAMERULES: {
		'chapter_0': {
			'artifacts.crystalHeart.healthBonus': '20',
			'artifacts.aquaDashers.enabled': false,
			'artifacts.cloudInABottle.enabled': false,
			'naughtinessMechanics': false,
			'generationofInfectedDiamonds': false,
			'reducedDebugInfo': true,
			'seasonalEvents': false,
			'halloweenEvent': false,
			'hungerLimitsSaturation': false,
			'maxSaturation': '20',
			// those few never change

			'theappearanceoftheNightmareStalker': false,
			'corpseFishSpawn': false,
			'darkVortexSpawn': false,
			'bonescallerSpawn': false,
			'doPatrolSpawning': false,
			'corpseFlySpawn': true,

			'fallenChaosKnightSpawn': false,
			'spiritOfChaosSpawn': false,
			'zombieClownSpawn': false,
			'doInsomnia': false,

			'motherSpiderSpawn': false,
			'krampusSpawn': false,
			'gluttonFishSpawn': false,
			'bloodyGadflySpawn': false,

			'missionarySpawn': false,
			'lifestealerSpawn': false,
		},
		'chapter_1': {
			'theappearanceoftheNightmareStalker': true,
			'corpseFishSpawn': true,
			'darkVortexSpawn': true,
			'bonescallerSpawn': true,
			'doPatrolSpawning': true,
			'doInsomnia': true,
		},
		'chapter_2': {
			'fallenChaosKnightSpawn': true,
			'spiritOfChaosSpawn': true,
			'zombieClownSpawn': true,
		},
		'chapter_3': {
			'motherSpiderSpawn': true,
			'krampusSpawn': true,
			'gluttonFishSpawn': true,
			'bloodyGadflySpawn': true,
			'corpseFlySpawn': false,
		}
	},
	/**
	 * Takes gamerules from a map and applies them
	 * @param {Internal.MinecraftServer} server
	 * @param {string} stage 
	 */
	changeGamerules: function (server, stage) {
		const rulesToApply = DecursioStages.GAMERULES[stage];

		if (!rulesToApply) return;

		for (const [gamerule, value] of Object.entries(rulesToApply)) {
			server.gameRules.set(gamerule, value)
		}
	},
	chapterMessages: {
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
			global.announcementMsg('Two legendary ores bless other dimensions', global.messageColors.newOre)
		],
		'chapter_4': [
			global.announcementMsg('The boundary between dreams and nigthmares lessens...', global.messageColors.difficultyIncrease),
			global.announcementMsg('Awakened Ender Pearls start to twitch...', global.messageColors.newDimension),
			global.announcementMsg('Prometheum mineralizes in Underground Jungle and Lush Caves', global.messageColors.newOre)
		],
		'chapter_5': [
			global.announcementMsg('A withered growl can be heard across all realms...', global.messageColors.difficultyIncrease),
			global.announcementMsg('A metal defying reality manifests deep underground', global.messageColors.newOre)
		]
	},
	/**
	 * Broadcasts all chat announcements for a given chapter
	 * @param {Internal.MinecraftServer} server
	 * @param {string} stage 
	 */
	sendChapterAnnouncements: function (server, stage) {
		console.log(stage)
		DecursioStages.chapterMessages[stage].forEach(msg => {
			global.broadcast(server, msg);
		})
	},
	cache: {
		ticker: 0,
		interval: 100,
		currentChapter: 0,
		chapterCached: null,
		bannedItems: new Set([typeof String]),
		shouldHide: function (id) {
			return this.bannedItems.has(String(id));
		}
	},
}

ServerEvents.tick(event => {
	DecursioStages.cache.ticker++;
	if (DecursioStages.cache.ticker == DecursioStages.cache.interval) {
		DecursioStages.cache.ticker = 0;

		DecursioStages.cache.currentChapter = global.getCurrentChapter(event.getServer());
		if (DecursioStages.cache.chapterCached == null || DecursioStages.cache.chapterCached != DecursioStages.cache.currentChapter) {

			Utils.runAsync(() => {
				console.log('Generating undiscovered item cache...', 'This is running async btw!')
				DecursioStages.cache.bannedItems = new Set([typeof String]);
				Item.getTypeList().toArray().forEach(/** @param {Internal.Item} item*/ item => {
					const tags = Item.of(item).getTags().toArray();

					let maxChapter = null;
					let maxException = null;

					for (let tag of tags) {
						let str = tag.toString();

						if (!str.includes('chapter_')) continue;

						let chapter = str.slice(-2, -1);

						if (str.includes('exceptions') && (!maxException || chapter > maxException)) {
							maxException = chapter;
						}
						else if (!maxChapter || chapter > maxChapter) {
							maxChapter = chapter;
						}
					}

					if (maxChapter && (!maxException || maxChapter != maxException) && DecursioStages.cache.currentChapter < maxChapter) {
						DecursioStages.cache.bannedItems.add(String(item));
					}
				});
				console.log(
					`Finished generating undiscovered item cache for chapter ${DecursioStages.cache.currentChapter} (server-side)`,
					`Cached list size: ${DecursioStages.cache.bannedItems.size}`
				);
				DecursioStages.cache.chapterCached = DecursioStages.cache.currentChapter;
			});
		}
	}
});

ADJServerEvents.recipeLookup(event => {
	const item = event.getItem().getId();
	if (DecursioStages.cache.shouldHide(item)) {
		event.cancel();
	}
	else if (item.includes('valkyrum') && !server.persistentData.valkyrumUnlocked) {
		event.cancel();
	}
})

ServerEvents.tick(event => {
	const server = event.getServer();
	const persistentData = server.persistentData;
	if (!persistentData.chapters) {
		persistentData.chapters = {};
	}
	if (!persistentData.chapters.current_stage) {
		persistentData.chapters.putString(DecursioStages.CURRENT_STAGE, 'chapter_0');
		DecursioStages.changeGamerules(server, 'chapter_0');
		return;
	}

	const stageToSet = persistentData.chapters.get(DecursioStages.STAGE_TO_SET);
	if (stageToSet) {
		const stageName = stageToSet.toString().replace("\"", "")
		if (!persistentData.chapters.get(stageName)) {
			const currentIndex = Number.parseInt(stageName.replace('chapter_', ''));
			for (let i = 1; i <= currentIndex; i++) {

				let stageToGrant = DecursioStages.STAGES[i];
				if (!persistentData.chapters[stageToGrant]) {
					persistentData.chapters.putString(DecursioStages.CURRENT_STAGE, stageToGrant);
					server.runCommandSilent('/gamestate ' + stageToGrant);

					persistentData.chapters.putBoolean(stageToGrant, true);

					DecursioStages.changeGamerules(server, stageToGrant);
					DecursioStages.sendChapterAnnouncements(server, stageToGrant);

					TwilightForestProgression.onChapterUpdate(server, stageToGrant);
				}
			}
		}
		else console.log('Attempted to jump to a stage that was already present!')
		persistentData.chapters.remove(DecursioStages.STAGE_TO_SET);
	}
});

PlayerEvents.tick(event => {
	const player = event.getPlayer();
	const server = event.getServer();
	const stage = server.persistentData.chapters.get(DecursioStages.CURRENT_STAGE);
	if (stage) {
		const stageName = stage.toString().replace("\"", "");
		const currentIndex = Number.parseInt(stageName.replace('chapter_', ''));

		if (!player.stages.has(stageName)) {

			for (let i = 0; i <= currentIndex; i++) {
				let stageToGrant = DecursioStages.STAGES[i];
				if (!player.stages.has(stageToGrant)) {
					player.stages.add(stageToGrant);
					server.runCommandSilent(
						'/decstages add ' + player.getUsername() + ' ' + stageToGrant + ' true'
					);
				}
			}

		}

		if (stageName === 'chapter_0' && player.level.dimension === 'minecraft:the_nether') {
			server.persistentData.chapters.putString(DecursioStages.STAGE_TO_SET, 'chapter_1');
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
});

const InteractionLimits = {
	'ender_eye': {
		chapter: 4,
		message: 'It\'s not reacting to anything...'
	},
	'aquamirae:shell_horn': {
		chapter: 2,
		message: 'It doesn\'t make any sound...'
	}
};

for (let [item, data] of Object.entries(InteractionLimits)) {
	ItemEvents.rightClicked(item, event => {
		const player = event.getPlayer();
		if (!player.stages.has(`chapter_${data.chapter}`)) {
			player.displayClientMessage(Component.literal(data.message).red(), true);
			// if (data.specialAction) data.specialAction(event);
			event.cancel();
		}
	});
}

////////////////////
////////////////////

ServerEvents.commandRegistry(event => {

	const { commands: Commands, arguments: Arguments } = event;

	event.register(Commands.literal('adjresetprogress')
		.requires(s => s.hasPermission(4))
		.executes(c => resetProgress(c.source.player, c.source.server))
	);
	let resetProgress = (player, server) => {
		let serverData = server.persistentData;
		DecursioStages.STAGES.forEach(stage => {
			player.stages.remove(stage);
			serverData.chapters.remove(stage);
			server.runCommandSilent(
				'/decstages remove ' + player.getUsername() + ' ' + stage + ' true'
			);
		});
		serverData.chapters.remove(DecursioStages.CURRENT_STAGE);
		server.runCommandSilent(
			'/gamestate normal'
		);
		player.tell(Text.red('Reset all internal progress'));
		DecursioStages.changeGamerules(server, 'chapter_0');
		return 1;
	}

	event.register(Commands.literal('jumpprogress')
		.requires(s => s.hasPermission(4))
		.then(Commands.argument('chapter', Arguments.INTEGER.create(event))
			.executes(c => jumpProgress(c.source.player, c.source.server, Arguments.INTEGER.getResult(c, 'chapter')))
		)
	);
	/**
	 * 
	 * @param {$Player_} player 
	 * @param {$MinecraftServer_} server 
	 * @param {integer} chapter 
	 * @returns 
	 */
	let jumpProgress = (player, server, chapter) => {

		server.persistentData.chapters.put(DecursioStages.STAGE_TO_SET, `chapter_${chapter}`);

		player.tell(Text.red('Jumped to chapter ' + chapter));
		return 1;
	}
});
