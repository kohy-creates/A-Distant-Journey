ServerEvents.loaded(event => {
	event.getServer().runCommandSilent('/scoreboard objectives add KJ_WSPhase dummy')
	event.getServer().runCommandSilent('/scoreboard objectives add KJ_PlayingDead dummy')
})
EntityEvents.spawned('witherstormmod:wither_storm', event => {
	event.getServer().persistentData.witherStormActive = true;

})
EntityEvents.death('witherstormmod:wither_storm', event => {
	event.getServer().persistentData.witherStormActive = false;
	event.getServer().persistentData.remove('witherStormPhase');
})

let tickCount = 0;
const phaseMonitorEveryNTicks = 100;
ServerEvents.tick(event => {
	const server = event.getServer();

	if (server.persistentData.witherStormActive) {

		tickCount++;
		if (tickCount >= phaseMonitorEveryNTicks) {
			tickCount = 0;

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
			server.runCommandSilent('/attribute @w witherstormmod:evolution_speed base set 1.5')
			break;
		}
		case 4: {
			text.push('The Wither Storm grows stronger');
			text.push('It started pursuing you');
			text.push('If you are still in your base, now is the time to leave')
			text.push('It\'s slow, but nothing is going to stop it')
			server.runCommandSilent('/attribute @w witherstormmod:evolution_speed base set 0.8')
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
			server.runCommandSilent('/attribute @w witherstormmod:evolution_speed base set 0.8')
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
		let command;
		text.forEach(line => {
			command = `/immersivemessages sendcustom @a {anchor:0,y:120,shake:1,obfuscate:1,color:"#af4bff",slideoutright:1,slideleft:1,wave:1} 7 ${line}`
			server.runCommand(command)
		})
	}
}
