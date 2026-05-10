const OnHitDebuffConfig = [
	{
		mobs: [
			'spider'
		],
		id: 'poison',
		duration: [0, null, null, 4, null, 6],
		chance: [0, null, null, 15, null, 25]
	},
	{
		mobs: [
			'phantom',
			'witherstormmod:sickened_phantom'
		],
		id: 'weakness',
		duration: [0, 8, null, 12, null, 16],
		chance: [0, 75, null, null, null, 100]
	},
	{
		mobs: [
			'slime',
			'twilightforest:maze_slime',
			'twilightforest:slime_beetle'
		],
		id: 'slowness',
		duration: [3, 4, null, 7, null, 9],
		chance: [25, null, null, 35, null, 40]
	},
	{
		mobs: [
			/born_in_chaos_v1:skeleton_thrasher/
		],
		id: 'kubejs:armor_shred',
		duration: 28,
		chance: 25
	},
	{
		mobs: [
			'zombie',
			'husk',
			'witherstormmod:sickened_zombie'
		],
		id: 'majruszsdifficulty:bleeding',
		chance: [25, 30, 35, 40, 45, 50],
		duration: [9, 12, 15, 18, 21, 24],
		level: [1, null, 2, 3, null, 4]
	}
];

EntityEvents.hurt('player', event => {
	const player = event.getPlayer();
	const attacker = event.getSource().getActual();
	if (!attacker) return;
	const type = attacker.type;

	let chosenEntry;

	entryIterator: for (let entry of OnHitDebuffConfig) {
		typeChecker: for (let mob of entry.mobs) {
			if (mob instanceof RegExp) {
				if (mob.test(type)) {
					chosenEntry = entry;
					break entryIterator;
				}
				else continue typeChecker;
			}
			else if ((!mob.includes(':') && mob == type.replace('minecraft:', '')) || mob == type) {
				chosenEntry = entry;
				break entryIterator;
			}
			else continue typeChecker;
		}
	}

	if (chosenEntry) {
		let currentStage = global.getCurrentChapter(event.getServer());
		let chance = chosenEntry.chance, amplifier = chosenEntry.level || 1, duration = chosenEntry.duration;
		if (Array.isArray(chance)) chance = EntityModifications._logic.getStageValue(chance, currentStage);
		if (Array.isArray(amplifier)) amplifier = EntityModifications._logic.getStageValue(amplifier, currentStage);
		if (Array.isArray(duration)) duration = EntityModifications._logic.getStageValue(duration, currentStage);

		if (global.ifRandomChance(chance)) {
			player.addEffect(new $MobEffectInstance(chosenEntry.id, Math.ceil(duration * 20), amplifier - 1));
		}
	}
});
