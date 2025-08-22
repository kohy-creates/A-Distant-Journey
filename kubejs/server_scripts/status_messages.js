function commandAtEntity(entity, command) {
	return '/execute in ' + entity.level.getDimension() + ' positioned ' + entity.x + ' ' + entity.y + ' ' + entity.z + ' run ' + command.replace(/\//g, '');
}

function commandInWorld(world, command) {
	return '/execute in ' + world + ' run ' + command.replace(/\//g, '');
}

EntityEvents.spawned(event => {
	const entity = event.getEntity();

	if (entity.getType() === 'born_in_chaos_v1:nightmare_stalker') {
		if (event.success) {
			event.getServer().runCommandSilent(
				commandAtEntity(entity, '/immersivemessages sendcustom @p[] {anchor:0,y:100,shake:1,obfuscate:1,color:"#c50000",slideoutright:1,slideleft:1,wave:1} 6 Something is following you...')
			)
			event.getServer().runCommandSilent(
				commandAtEntity(entity, '/playsound born_in_chaos_v1:stalker_roar_distant hostile @p[] ~ ~ ~ 0 1 0.2')
			)
		}
	}
	if (global.bossMobs.includes(entity.getType())) {
		event.getServer().runCommandSilent('/tellraw @a[] {"text":"<NAME> has awoken!","color":"#af4bff"}'.replace('<NAME>', entity.getDisplayName().getString()))
	}
})

EntityEvents.death(event => {
	const entity = event.getEntity();
	if (global.bossMobs.includes(entity.getType())) {
		event.getServer().runCommandSilent('/tellraw @a[] {"text":"<NAME> has been defeated!","color":"#af4bff"}'.replace('<NAME>', entity.getDisplayName().getString()))
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
			commandInWorld(server.getOverworld().getDimension(), command)
		);
	}


	//console.log(messageCount)

	if (isInBetween(dayTime, 12000, 12599) && messageCount === 0) {
		sendMessage({ text: 'Night is falling upon this world...', slide: 'single' });
		messageCount = 1;
	}
	else if (isInBetween(dayTime, 12545, 12599) && messageCount === 1) {
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

		switch (server.persistentData.lunarEvent) {
			case 'enhancedcelestials:default':
				sendMessage({ text: 'This is going to be a calm night', slide: 'single' });
				break;
			case 'enhancedcelestials:harvest_moon':
				sendMessage({ text: 'The Harvest Moon is rising...', color: '#ffd500', slide: 'intro', duration: 4 });
				sendMessage({ text: 'Your crops seem invigorated by the moonlight', color: '#ffd500', slide: 'outro' });
				break;
			case 'enhancedcelestials:blood_moon':
				sendMessage({ text: 'The Blood Moon is rising...', color: '#ff1e1e', slide: 'intro', duration: 4 });
				sendMessage({ text: 'The undead scream in the distance', color: '#ff1e1e', slide: 'outro' });
				break;
			case 'enhancedcelestials:blue_moon':
				sendMessage({ text: 'The Blue Moon is rising...', color: '#1eaaff', slide: 'intro', duration: 4 });
				sendMessage({ text: 'What a rare phenomenon!', color: '#1eaaff', slide: 'next', duration: 4 });
				sendMessage({ text: 'You know, they say that it happens, like', color: '#1eaaff', slide: 'next', duration: 5 });
				sendMessage({ text: 'Once in a *blue moon*, hehe', color: '#1eaaff', slide: 'outro', duration: 4 });
				break;
			case 'adj:slimy_moon':
				sendMessage({ text: 'The Slimy Moon is rising...', color: '#21e621', slide: 'intro', duration: 4 });
				sendMessage({ text: 'Are we serious? Is this an actual event??', color: '#21e621', slide: 'next', duration: 4 });
				sendMessage({ text: 'Oh whatever... Slimes wobble everywhere', color: '#21e621', slide: 'outro', duration: 4 });
				break;
		}
		messageCount = 2;
	}
	else if (isInBetween(dayTime, 12600, 22999) && messageCount === 2) {
		messageCount = 0;
	}
	else if (isInBetween(dayTime, 23000, 24000) && messageCount === 0) {
		switch (server.persistentData.lunarEvent) {
			case 'enhancedcelestials:default':
				sendMessage({ text: 'The moon slowly sets, monsters crawl back into the shadows', slide: 'single' });
				break;
			case 'enhancedcelestials:harvest_moon':
				sendMessage({ text: 'The Harvest Moon sets...', color: '#ffe562', slide: 'intro', duration: 4 });
				sendMessage({ text: "Your crops aren't as energetic anymore", color: '#ffe562', slide: 'outro', duration: 6 });
				break;
			case 'enhancedcelestials:blood_moon':
				sendMessage({ text: 'The Blood Moon sets...', color: '#ff5f5f', slide: 'intro', duration: 4 });
				sendMessage({ text: 'The undead scream, burning in the sun as it rises', color: '#ff5f5f', slide: 'outro', duration: 6 });
				break;
			case 'enhancedcelestials:blue_moon':
				sendMessage({ text: 'The Blue Moon sets...', color: '#6ac7ff', slide: 'intro', duration: 4 });
				sendMessage({ text: "Odds are you won't see it again", color: '#6ac7ff', slide: 'next', duration: 6 });
				sendMessage({ text: 'Still, quite cool you managed to!', color: '#6ac7ff', slide: 'outro', duration: 5 });
				break;
			case 'adj:slimy_moon':
				sendMessage({ text: 'The Slimy Moon sets...', color: '#7be47b', slide: 'intro', duration: 4 });
				sendMessage({ text: 'Slimes start to dissolve into the ground', color: '#7be47b', slide: 'next', duration: 6 });
				sendMessage({ text: 'What a weird event...', color: '#7be47b', slide: 'outro', duration: 5 });
				break;
		}
		messageCount = 1;
	}
});
