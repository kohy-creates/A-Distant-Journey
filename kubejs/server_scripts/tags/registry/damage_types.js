ServerEvents.tags('damage_type', tags => {
	tags.add('adjcore:bypasses_cooldown', [
		'botania:relic_damage',
		'botania:player_attack_armor_piercing',
		'botania:key_explosion',
		'ars_nouveau:spell',
	]);

	tags.remove('adjcore:bypasses_cooldown', [
		/cataclysm/
	]);

	tags.add('adjcore:dot', [
		'majruszsdifficulty:bleeding',
		'ars_elemental:poison',
		'ars_elemental:hellfire'
	]);

	tags.add('adj:magic', [
		'ars_nouveau:spell',
		'ars_nouveau:crush',
		'#minecraft:witch_resistant_to'
	]);

	tags.add('bypasses_invulnerability', [
		'adj:chalice_of_blood'
	]);

	tags.add('bypasses_cooldown', [
		'adj:chalice_of_blood'
	]);
});
