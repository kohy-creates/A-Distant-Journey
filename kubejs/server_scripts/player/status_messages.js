function commandAtEntity(entity, command) {
	return '/execute in ' + entity.level.getDimension() + ' positioned ' + entity.x + ' ' + entity.y + ' ' + entity.z + ' run ' + command.replace(/\//g, '');
}

function commandInWorld(world, command) {
	return '/execute in ' + world + ' run ' + command.replace(/\//g, '');
}

let messageCount = 0;
let CurrentLunarEvent;

// I really don't need it but it makes the code a bit more readable for me ^^
function isInBetween(num, var1, var2) {
	return (num >= var1 && num <= var2);
}

// Don't ask me where I got this from, cause I don't remember at all
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

const $EnhancedCelestials = Java.loadClass('dev.corgitaco.enhancedcelestials.EnhancedCelestials');
const $Registry = Java.loadClass("net.minecraft.core.Registry");
const $LunarEventClass = Java.loadClass("dev.corgitaco.enhancedcelestials.api.lunarevent.LunarEvent");
const $ResourceLocation = Java.loadClass("net.minecraft.resources.ResourceLocation");
const $Registries = Java.loadClass("net.minecraft.core.registries.Registries");
const $EnhancedCelestialsRegistry = Java.loadClass("dev.corgitaco.enhancedcelestials.api.EnhancedCelestialsRegistry");

ServerEvents.tick(event => {
	const server = event.getServer();
	const dayTime = server.overworld().dayTime() % 24000;

	function sendMessage(options) {
		const text = options.text || '';
		const color = options.color || '#EEEEEE';
		const duration = (options.duration !== undefined ? options.duration : 6) * 20;

		// const command = '/immersivemessages sendcustom @a[distance=0..] {anchor:0,y:' + y + ',color:"' + color + '"' + (slideArgs ? ',' + slideArgs : '') + '} ' + duration + ' ' + text;
		const command = `/eta queue @a[predicate=adj:in_overworld] status_messages "<dur:${duration}><color col=${color}><shadow c=${brighten(color, -0.66)}><fade in=10 out=10><typewriter speed=45><anchor value=BOTTOM_CENTER><align value=CENTER><offset x=0 y=-85>${text}"`
		server.runCommand(command);
	}

	function sendEventMessages(isWitherStorm, moonEventOrPhase, isStart) {
		let color, texts;
		let duration = 5;
		if (isWitherStorm) {
			duration = 7;
			color = WitherStorm.witherStormMessages.color;
			for (let i = moonEventOrPhase - 1; i < 7; i++) {
				if (!WitherStorm.witherStormMessages.texts[i]) {
					continue;
				}
				texts = WitherStorm.witherStormMessages.texts[i];
			}
		}
		else {
			color = moonEventMessages[moonEventOrPhase].color;
			if (!isStart) color = brighten(color, 0.3333333334);
			texts = moonEventMessages[moonEventOrPhase].texts[(isStart) ? 'start' : 'end'];
		}
		for (let i = 0; i < texts.length; i++) {
			sendMessage({ text: texts[i], color: color, duration: duration })
		}
	}

	if (isInBetween(dayTime, 12000, 12599) && messageCount === 0) {

		// Night is falling
		sendMessage({ text: 'Night is falling upon this world...' });
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
					sendMessage({ text: 'This really doesn\'t feel like a calm night', color: '	' })
				}
			}
			else {
				sendMessage({ text: 'This is going to be a calm night' });
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
			sendMessage({ text: 'The moon slowly sets, monsters crawl back into the shadows' });
		}
		else {
			sendEventMessages(false, moonEvent, false)
		}
		messageCount = 1;
	}
});
