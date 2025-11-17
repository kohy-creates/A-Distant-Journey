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
		'halloweenEvent': false, // those few never change

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
		Text.of('The spirits of hell enter the Overworld...').red().italic(),
		Text.of('The caverns have been blessed with Mythril and Orichalcum').italic().green()
	],
	'chapter_2': [
		Text.of('The ancient spirits of darkness have been released').darkRed().italic(),
		Text.of('Heavenly gates open...').yellow().italic(),
		Text.of('The hellish depths have been blessed with Palladium').gold().green()
	],
	'chapter_3': [
		Text.of('The ancient spirits of light have been released').yellow().italic(),
		Text.of('Dreams of a different realm start to materialize...').red().italic(),
		Text.of('Two legendary ores start appearing in other dimensions...').italic().green()
	],
	'chapter_4': [
		Text.of('The boundary between dreams and nigthmares lessens...').red().italic(),
		Text.of('Awakened Ender Pearls start to twitch').lightPurple().italic()
	],
	'chapter_5': [
		Text.of('The reality twists again, one final time...').darkPurple().italic(),
	]
}

/**
 * Broadcasts all chat announcements for a given chapter
 * @param {Internal.MinecraftServer} server
 * @param {string} stage 
 */
function sendChapterAnnouncements(server, stage) {
	chapterMessages[stage].forEach(msg => {
		server.players.forEach(player => {
			player.tell(msg)
		})
	})
}

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
	}
});


// Restriction tags
ServerEvents.tags('item', resctrictions => {

	resctrictions.add('adj:locked_until/chapter_1', [
		/orichalcum/,
		/mythril/,
		/stormyx/,
		/mythicmetals:steel/
	]);
	resctrictions.add('adj:locked_until/light/chapter_1', [
		'botania:ender_air_bottle',
		'botania:spawner_claw',
		'botana:corporea_index',
		'botania:red_string',
		'botania:spawner_mover',
		'botania:black_hole_talisman',
		'botania:corporea_spark',
		'botania:flight_tiara',
		/mynethersdelight/,
		/netherexp/,
		'netherrack',
		'nether_gold_ore',
		'nether_quartz_ore',
		/everycomp\:.*mynethersdelight.*/,
		/everycomp\:.*netherexp.*/,
		/supp.*\:.*mynethersdelight.*/,
		/supp.*\:.*netherexp.*/,
		/nether/,
		/netherdepthsupgrade/,
		'beacon',
		'constructionwand:infinity_wand',
		/enderstorage/,
		/blaze/,
		/crimson/,
		/warped/,
		//'soul_soil',
		'gilded_blackstone',
		'botania:ender_eye_block',
		'ender_chest',
		'quark:ender_watcher',
		'botania:ender_hand',
		'toms_storage:wireless_terminal',
		'end_crystal',
		'botania:natura_pylon',
		'botania:itemfinder',
		'botania:virus_nullodermal',
		'botania:virus_necrodermal',
		'ars_nouveau:scryers_crystal',
		/dreamwood/,
		/elementium/,
		'botanicadds:dreamrock',
		/elvenwood/,
		'botanicadds:dreaming_pool',
		/botanicadds\:elven\_/,
		/gaiasteel/,
		/gaia/,
		'botania:dragonstone',
		'botania:dragonstone_block',
		'botania:pixie_dust',
		'botania:quartz_elven',
		'botania:elf_glass',
		'rediscovered:ruby_eye',
		'kubejs:skull_fragment',
		'kubejs:hellforge'
	]);
	resctrictions.add('adj:locked_until/exceptions/chapter_1', [
		'create:blaze_cake',
		'create:blaze_cake_base',
		'create:empty_blaze_burner',
		'galosphere:warped_anchor',
		'netherexp:soul_soil_layer',
		/treasure_bag/
	]);

	resctrictions.add('adj:locked_until/chapter_2', [
		/palladium/,
		/aether/,
		/aether_redux/,
		/lost_aether_content/,
	]);
	resctrictions.add('adj:locked_until/light/chapter_2', [
		/everycomp\:.*aether.*/, // also covers redux and lost content
		/supp.*\:.*aether.*/,
		/mutantmonsters/,
	]);
	resctrictions.add('adj:locked_until/exceptions/chapter_2', [
		'aether:leather_gloves',
		'aether:chainmail_gloves',
		'aether:iron_gloves',
		'aether:golden_gloves',
		'aether:diamond_gloves',
		/treasure_bag/
	]);

	resctrictions.add('adj:locked_until/chapter_3', [
		/netherite/,
		'quark:flamerang',
		/adamantite/,
		/hallowed/,
		// /cursium/,
		'cataclysm:the_incinerator',
		'botania:terrasteel_helmet',
		'botania:terrasteel_chestplate',
		'botania:terrasteel_leggings',
		'botania:terrasteel_boots',
		'botania:terra_blade'
	]);
	resctrictions.add('adj:locked_until/light/chapter_3', [
		'mythicmetals:aegis_smithing_template',
		'ancient_debris',
		'@rediscovered',
		'suppsquared:heavy_key'
	]);
	resctrictions.add('adj:locked_until/exceptions/chapter_3', [
		/rediscovered\:large\_brick/,
		/rediscovered\:brittle\_/,
		'rediscovered:purple_arrow',
		/rediscovered\:studded/,
		/rediscovered\:plate/,
		/rediscovered\:.*ruby/,
		'rediscovered:gear',
		'rediscovered:rotational_converter',
		'rediscovered:spikes',
		'rediscovered:ancient_crying_obsidian',
		'rediscovered:scarecrow',
		/rediscovered:.*slab/,
		/treasure_bag/

	]);

	resctrictions.add('adj:locked_until/chapter_4', [
		/enderium/,
		/starrite/,
		/star_platinum/,
	]
	);
	resctrictions.add('adj:locked_until/light/chapter_4', [
		/end_stone/,
		/endersdelight/,
		/chorus/,
		/purpur/,
		/unusualend/,
		/phantasm/,
		/everycomp\:.*phantasm.*/,
		/everycomp\:.*unusualend.*/,
		/supp.*\:.*unusualend.*/,
		/supp.*\:.*phantasm.*/,
		/quark\:myalite/,
		/quark\:duskbound/,
		'alloy_forgery:ender_forge_casing_forge_controller',
		'adj:ender_forge_casing',
		'born_in_chaos_v1:transmuting_elixir',
		'end_rod',
		'kubejs:ender_forge',
		'kubejs:ender_forge_casing',
		/shulker/,
		'supplementaries:safe'
	]
	);
	resctrictions.add('adj:locked_until/exceptions/chapter_4', [
		'unusualend:chiseled_glass',
		'unusualend:chiseled_glass_pane',
		'unusualend:phantom_membrane_block',
		/treasure_bag/
	]);

	resctrictions.add('adj:locked_until/chapter_5', [
		/unobtainium/,
		/metallurgium/,
		/celestium/
	]);
	resctrictions.add('adj:locked_until/light/chapter_5', [
		/witherstormmod/
	]);
	resctrictions.add('adj:locked_until/exceptions/chapter_5', [
		'witherstormmod:firework_bundle',
		'witherstormmod:phasometer',
		'witherstormmod:golden_apple_stew',
		'witherstormmod:amulet',
		/treasure_bag/
	]);
})

ItemEvents.rightClicked('ender_eye', event => {
	if (!event.getPlayer().stages.has('chapter_4')) {
		event.cancel();
	}
})

BlockEvents.rightClicked('command_block', event => {
	if (event.getItem().id == 'minecraft:wither_skeleton_skull' && !event.getPlayer().stages.has('chapter_5')) {
		event.cancel();
	}
})

////////////////////
////////////////////

const RESET_PROGRESS = 'adjresetprogress';
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
})
