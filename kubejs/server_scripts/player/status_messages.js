function commandAtEntity(entity, command) {
	return '/execute in ' + entity.level.getDimension() + ' positioned ' + entity.x + ' ' + entity.y + ' ' + entity.z + ' run ' + command.replace(/\//g, '');
}

function commandInWorld(world, command) {
	return '/execute in ' + world + ' run ' + command.replace(/\//g, '');
}

const nightmareStalkerMsgs = [
	"Something is following you...",
	"You're not alone...  Stay alert...",
	"A distant roar can be heard...",
	"A nightmare has materialized nearby..."
];

EntityEvents.spawned(event => {
	const entity = event.getEntity();

	if (entity.getType() === 'born_in_chaos_v1:nightmare_stalker') {
		if (event.success) {
			const randomMsg = nightmareStalkerMsgs[Math.floor(Math.random() * nightmareStalkerMsgs.length)];
			event.getServer().runCommandSilent(
				commandAtEntity(entity, `/immersivemessages sendcustom @p[] {anchor:0,y:100,shake:1,obfuscate:1,color:"#c50000",slideoutright:1,slideleft:1,wave:1} 6 ${randomMsg}`)
			)
			event.getServer().runCommandSilent(
				commandAtEntity(entity, '/playsound born_in_chaos_v1:stalker_roar_distant hostile @p[] ~ ~ ~ 0 0.5 0.2')
			)
		}
	}
	if (global.bossMobs.includes(entity.getType()) && !entity.tags.toArray().includes('adj.announced_spawn')) {
		global.broadcast(
			global.announcementMessage(`${entity.getDisplayName().getString()} has awoken!`, global.messageColors.bossSpawned, true)
		)
		entity.addTag('adj.announced_spawn');
	}
})

EntityEvents.death(event => {
	const entity = event.getEntity();
	if (global.bossMobs.includes(entity.getType())) {
		global.broadcast(
			global.announcementMessage(`${entity.getDisplayName().getString()} has been defeated!`, global.messageColors.bossDefeated, true)
		)
	}
})

const $EnhancedCelestials = Java.loadClass('dev.corgitaco.enhancedcelestials.EnhancedCelestials');
const $Registry = Java.loadClass("net.minecraft.core.Registry");
const $LunarEventClass = Java.loadClass("dev.corgitaco.enhancedcelestials.api.lunarevent.LunarEvent");
const $ResourceLocation = Java.loadClass("net.minecraft.resources.ResourceLocation");
const $Registries = Java.loadClass("net.minecraft.core.registries.Registries");
const $EnhancedCelestialsRegistry = Java.loadClass("dev.corgitaco.enhancedcelestials.api.EnhancedCelestialsRegistry")

let messageCount = 0;
let CurrentLunarEvent;

function isInBetween(num, var1, var2) {
	return (num >= var1 && num <= var2);
}

function brighten(hex, p) {
	return '#' + [0, 2, 4]
		.map(i => {
			const v = parseInt(hex.slice(1 + i, 3 + i), 16);
			return Math.round(v + (255 - v) * p).toString(16).padStart(2, '0');
		}).join('');
}

const moonEventMessages = {
	'enhancedcelestials:harvest_moon': {
		color: '#ffd500',
		texts: {
			start: [
				'The Harvest Moon is rising...',
				'Your crops seem invigorated by the moonlight'
			],
			end: [
				'The Harvest Moon sets...',
				"Your crops aren't as enthusiastic to grow anymore"
			]
		}
	},
	'enhancedcelestials:blood_moon': {
		color: '#ff1e1e',
		texts: {
			start: [
				'The Blood Moon is rising...',
				'The undead scream in the distance, hungry for blood',
				'If I were you, I\'d seek shelter'
			],
			end: [
				'The Blood Moon sets...',
				'The undead scream, burning in the sun as it rises above the horizon'
			]
		}
	},
	'enhancedcelestials:blue_moon': {
		color: '#1eaaff',
		texts: {
			start: [
				'The Blue Moon is rising...',
				'What a rare celestial phenomenon!',
				'You know, they say that it happens, like',
				'Once in a *blue moon*, hehe'
			],
			end: [
				'The Blue Moon sets...',
				"Odds are you will never see it again",
				'Then still, quite cool you managed to!'
			]
		}
	},
	'adj:slimy_moon': {
		color: '#21e621',
		texts: {
			start: [
				'The Slimy Moon is rising...',
				'Are we serious? Is this an actual event??',
				'Oh whatever... Slimes wobble everywhere'
			],
			end: [
				'The Slimy Moon sets...',
				'Slimes start to dissolve into the ground',
				'What a weird event...'
			]
		}
	},
	'adj:ender_moon': {
		color: '#E055FF',
		texts: {
			start: [
				'The Ender Moon is rising...',
				'Otherwordly noises can be heard around you... '
			],
			end: [
				'The Ender Moon sets...',
				'The unstable beings start to fall apart in the sunlight'
			]
		}
	},
	'adj:tutorial_moon': {
		color: '#EEEEEE',
		texts: {
			start: [
				'This is going to be a very calm night...',
				'Monsters are\'t going to be as aggressive this time',
				'You should be safe to keep on gathering materials and exploring nearby areas'
			],
			end: [
				'The moon slowly sets...',
				'Next night is not going to be as forgiving though...',
				'Monsters will only get more and more aggressive',
			]
		}
	}
};


const witherStormMessages = {
	color: '#d39dff',
	texts: {
		2: [
			'This is not going to be a calm night. Far from it',
			'But it is going to be alright',
			'It has to be'
		],
		3: [
			'The Wither Storm is getting stronger with each passing moment',
			'You still have time to prepare your escape route',
			"It knows where you are, but it's not strong enough to follow you yet",
			'Start planning. Now. There is no time to be wasted'
		],
		4: [
			'The Wither Storm can sense where you are. It is following you',
			"Keep moving. It's slow but it will surely find you at some point",
			'Run. Stay away from your base. Or hide underground'
		],
		6: [
			'Even if you hide underground, eventually it will make it to Bedrock',
			'It started mutating Zombies into Withered Symbionts',
			'Killing them will be valuable towards defeating it',
			'Stay safe. I wish you best of luck'
		],
		7: [
			"It's been a long time",
			// 'The Wither Storm destroyed anything in its path',
			'But sooner or later it will be over'
		]
	}
}

ServerEvents.tick(event => {
	const server = event.getServer();
	const dayTime = server.overworld().dayTime() % 24000;

	function sendMessage(options) {
		const text = options.text || '';
		const y = options.y !== undefined ? options.y : 100;
		const color = options.color || '#EEEEEE';
		const duration = options.duration !== undefined ? options.duration : 6;
		const slide = options.slide || 'single';

		let slideArgs = '';

		switch (slide) {
			case 'single':
				slideArgs = 'slideup:1,slideoutdown:1';
				break;
			case 'intro':
				slideArgs = 'slideup:1,slideoutright:1';
				break;
			case 'next':
				slideArgs = 'slideleft:1,slideoutright:1';
				break;
			case 'outro':
				slideArgs = 'slideleft:1,slideoutdown:1';
				break;
			case 'none':
			case null:
			case undefined:
				slideArgs = '';
				break;
			default:
				console.warn('Unknown slide type: ' + slide);
				break;
		}

		const command = '/immersivemessages sendcustom @a[distance=0..] {anchor:0,y:' + y + ',color:"' + color + '"' + (slideArgs ? ',' + slideArgs : '') + '} ' + duration + ' ' + text;

		server.runCommand(
			commandInWorld("minecraft:overworld", command)
		);
	}

	function sendEventMessages(isWitherStorm, moonEventOrPhase, isStart) {
		let color, texts;
		let duration = 5;
		if (isWitherStorm) {
			duration = 7;
			color = witherStormMessages.color;
			for (let i = moonEventOrPhase; i < 7; i++) {
				if (!witherStormMessages.texts[i]) {
					continue;
				}
				texts = witherStormMessages.texts[i];
			}
		}
		else {
			color = moonEventMessages[moonEventOrPhase].color;
			if (!isStart) color = brighten(color, 0.3333333334);
			texts = moonEventMessages[moonEventOrPhase].texts[(isStart) ? 'start' : 'end'];
		}
		for (let i = 0; i < texts.length; i++) {
			let anim = 'single';
			if (texts.length > 1) {
				anim = 'next';
				if (i == texts.length - 1) {
					anim = 'outro';
				}
				else if (i == 0) {
					anim = 'intro'
				}
			}
			sendMessage({ text: texts[i], color: color, slide: anim, duration: duration })
		}
	}

	if (isInBetween(dayTime, 12000, 12599) && messageCount === 0) {

		// Night is falling
		sendMessage({ text: 'Night is falling upon this world...', slide: 'single' });
		messageCount = 1;

	}
	else if (isInBetween(dayTime, 12545, 13450) && messageCount === 1) {

		if (!server.persistentData.tutorialNight) {
			server.persistentData.tutorialNight = true;

			if (!server.isHardcore()) {
				server.runCommandSilent('/enhancedcelestials setLunarEvent adj:tutorial_moon')
			}
		}

		// Get current lunar forecast
		let optional = $EnhancedCelestials.lunarForecastWorldData(server.overworld());
		let id = null;
		if (optional.isPresent()) {
			let data = optional.get();
			let currentEvent = data.currentLunarEvent();
			let registryAccess = server.getOverworld().registryAccess();
			let lunarRegistry = registryAccess.registryOrThrow($EnhancedCelestialsRegistry.LUNAR_EVENT_KEY);
			id = lunarRegistry.getKey(currentEvent);
			server.persistentData.lunarEvent = id.toString();
		}

		if (server.persistentData.lunarEvent === 'enhancedcelestials:default') {
			if (server.persistentData.witherStormActive == true) {
				if (!server.isHardcore()) {
					let phase = Number(server.persistentData.witherStormPhase);
					sendEventMessages(true, phase);
				}
				else {
					sendMessage({ text: 'This really doesn\'t feel like a calm night', color: '	', slide: 'single' })
				}
			}
			else {
				sendMessage({ text: 'This is going to be a calm night', slide: 'single' });
			}
		}
		else {
			sendEventMessages(false, server.persistentData.lunarEvent, true)
		}
		messageCount = 2;
	}
	else if (isInBetween(dayTime, 13500, 22999) && messageCount === 2) {
		messageCount = 0;
	}
	else if (isInBetween(dayTime, 23000, 24000) && messageCount === 0) {

		let moonEvent = server.persistentData.lunarEvent;

		// Moon sets message
		if (moonEvent === 'enhancedcelestials:default') {
			sendMessage({ text: 'The moon slowly sets, monsters crawl back into the shadows', slide: 'single' });
		}
		else {
			sendEventMessages(false, moonEvent, false)
		}
		messageCount = 1;
	}
});
