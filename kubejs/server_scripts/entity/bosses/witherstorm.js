EntityEvents.spawned('witherstormmod:wither_storm', event => {
	event.getServer().persistentData.witherStormActive = true;
});

EntityEvents.death('witherstormmod:wither_storm', event => {
	event.getServer().persistentData.witherStormActive = false;
	event.getServer().persistentData.remove('witherStormPhase');
});

const WitherStorm = {
	tickCount: 0,
	PHASE_MONITOR_INTERVAL: 100,
	sickenedMap: {
		'minecraft:zombie': 'witherstormmod:sickened_zombie',
		'minecraft:husk': 'witherstormmod:sickened_zombie',
		'minecraft:skeleton': 'witherstormmod:sickened_skeleton',
		'minecraft:stray': 'witherstormmod:sickened_skeleton',
		'minecraft:spider': 'witherstormmod:sickened_spider',
		'minecraft:cave_spider': 'witherstormmod:sickened_spider',
		'minecraft:creeper': 'witherstormmod:sickened_creeper',
		'minecraft:phantom': 'witherstormmod:sickened_phantom',
		'minecraft:chicken': 'witherstormmod:sickened_chicken',
		'minecraft:parrot': 'witherstormmod:sickened_parrot',
		'minecraft:wolf': 'witherstormmod:sickened_wolf',
		'minecraft:cat': 'witherstormmod:sickened_cat',
		'minecraft:bee': 'witherstormmod:sickened_bee',
		'minecraft:cow': 'witherstormmod:sickened_cow',
		'minecraft:mushroom_cow': 'witherstormmod:sickened_mushroom_cow',
		'minecraft:pillager': 'witherstormmod:sickened_pillager',
		'minecraft:vindicator': 'witherstormmod:sickened_vindicator',
		'minecraft:iron_golem': 'witherstormmod:sickened_iron_golem',
		'minecraft:pig': 'witherstormmod:sickened_pig',
		'minecraft:snow_golem': 'witherstormmod:sickened_snow_golem',
	},
	witherStormMessages: {
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
}

ServerEvents.tick(event => {
	const server = event.getServer();

	if (server.persistentData.witherStormActive) {

		WitherStorm.tickCount++;
		if (WitherStorm.tickCount >= WitherStorm.PHASE_MONITOR_INTERVAL) {
			WitherStorm.tickCount = 0;

			server.runCommandSilent('/execute store result score $WS KJ_WSPhase run data get entity @w Phase')
			let phase = server.scoreboard.getOrCreatePlayerScore("$WS", server.scoreboard.getObjective("KJ_WSPhase")).getScore();

			/**
			 * @type {Internal.Entity}
			 */
			let witherStorm, entities = event.getServer().getEntities();
			for (let entity of entities) {
				if (entity.getType().toString() === 'witherstormmod:wither_storm') {
					witherStorm = entity;
					break;
				}
			}
			if ((server.persistentData.witherStormPhase == 0 && !witherStorm)
				|| (server.persistentData.witherStormPhase == 7 && !witherStorm)) {
				server.persistentData.witherStormActive = false;
				server.persistentData.remove('witherStormPhase');
				return;
			}

			if (server.persistentData.witherStormPhase == undefined || server.persistentData.witherStormPhase != phase) {
				server.persistentData.witherStormPhase = phase;
				onWSPhaseChange(phase, server)

			}
		}
	}
})

/**
 * Makes things happen whenever WS changes phases
 * @param {number} newPhase 
 * @param {Internal.MinecraftServer} server;
 */
function onWSPhaseChange(newPhase, server) {
	let text = [];
	switch (newPhase) {
		case 0: {
			text.push('A horror beyond comprehension has awoken');
			text.push('R u n   w h i l e   i t \' s   s t i l l   r e g a i n i n g   s t r e n g t h');
			server.runCommandSilent('/attribute @w witherstormmod:evolution_speed base set 1')
			if (server.isHardcore()) {
				let slowSpeed = global.WitherStormFlyingSpeed * 1.6;
				let fastSpeed = global.WitherStormFlyingSpeed * 3.5;
				server.runCommandSilent(`/attribute @w witherstormmod:slow_flying_speed base set ${slowSpeed}`)
				server.runCommandSilent(`/attribute @w witherstormmod:target_stationary_flying_speed base set ${fastSpeed}`)
				server.runCommandSilent('/attribute @w witherstormmod:evolution_speed base set 1')
			}
			break;
		}
		case 1: {
			text.push('It\'s slowly getting stronger');
			text.push('Sooner or later it will soar the skies again...');
			break;
		}
		case 2: {
			text.push('The Wither Storm grows stronger');
			text.push('I cannot stress this enough - stay away from its beams');
			text.push('If it catches you, shoot the head down');
			text.push('If it pulls you in, you\'re dead');
			break;
		}
		case 3: {
			text.push('The Wither Storm grows stronger');
			text.push('It grew tentacles. Do not let them catch you...');
			server.runCommandSilent('/attribute @w witherstormmod:evolution_speed base set 1.15')
			break;
		}
		case 4: {
			text.push('The Wither Storm grows stronger');
			text.push('It started pursuing you');
			text.push('If you are still in your base, now is the time to leave')
			text.push('It\'s slow, but nothing is going to stop it')
			server.runCommandSilent('/attribute @w witherstormmod:evolution_speed base set 1.1')
			break;
		}
		case 5: {
			text.push('The Wither Storm grows stronger once more');
			text.push('It starts to assimilate Zombies into Withered Symbionts')
			text.push('If you want to have a chance at killing The Beast, you must hunt them down')
			text.push('So if you aren\'t close to The Wither Storm, you need to get so...')
			break;
		}
		case 6: {
			text.push('');
			text.push('The Wither Storm lays dead. The Command Block is exposed, unguarded.');
			text.push('It\'s just playing with you. Pulling the strings, and inviting you to its trap')
			text.push('Approach it and it will reawaken.')
			text.push('It\'s best to leave it for now, it will wake up soon anyway.')
			text.push('You can take this time to gear up, think of an escape route.')
			server.runCommandSilent('/attribute @w witherstormmod:evolution_speed base set 1.1')
			break;
		}
		case 7: {
			text.push('The Wither Storm grows stronger. Again');
			text.push('The Formidibomb affected it greatly though. It struggles to keep itself together...')
			text.push('When you see a large opening in its head, don\'t hestitate')
			text.push('Use an Ender Pearl or anything to get there. Enter The Wither Storm.')
			text.push('It\'s the only way you can defeat it and put an end to this destruction...')
			break;
		}
	}
	if (!server.isHardcore()) {
		text.forEach(line => {
			const command = `/eta queue @a status_messages "<dur:140><color col=#af4bff><shadow c=#540C94><fade in=10 out=10><obfuscate mode=reveal speed=100 direction=random><anchor value=BOTTOM_CENTER><align value=CENTER><offset x=0 y=-85>${line}"`;
			server.runCommandSilent(command);
		});
	}
}

EntityEvents.checkSpawn(event => {
	const server = event.getServer();
	const entity = event.getEntity();
	if (server.persistentData.witherStormActive) {
		let chance = -1;
		switch (server.persistentData.witherStormPhase) {
			case 3: { chance = 0.015; break; }
			case 4: { chance = 0.04; break; }
			case 5: { chance = 0.07; break; }
			case 6: { chance = 0.14; break; }
			case 7: { chance = 0.28; break; }
		}
		if (Math.random() <= chance) {
			let groupSize = global.getRandomInt(1, Math.ceil(server.persistentData.witherStormPhase / 2));
			for (let i = 0; i < groupSize; i++) {
				server.runCommandSilent(
					`summon ${WitherStorm.sickenedMap[entity.type]} ${event.x} ${event.y} ${event.z}`
				);
			}
			server.scheduleInTicks(1, () => entity.remove('discarded'));
			event.cancel();
		}
	}
});
