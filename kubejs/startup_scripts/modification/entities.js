global.mobs = [];

global.WitherStormFlyingSpeed = 0.014;

EntityJSEvents.attributes(event => {

	global.mobs = event.getAllTypes();

	event.modify('player', attributes => {
		attributes.add('generic.max_health', 100);
		attributes.add('generic.attack_damage', 1.0);
		attributes.add('combatroll:count', 0.0);
		attributes.add('attributeslib:crit_chance', 0.0);
		attributes.add('attributeslib:crit_damage', 2.0);
		attributes.add('generic.attack_speed', 2.0);
		attributes.add('kubejs:damage_dealt', 1.0);
	});

	event.modify('witherstormmod:wither_storm', attributes => {
		attributes.add('witherstormmod:slow_flying_speed', global.WitherStormFlyingSpeed);
		attributes.add('witherstormmod:target_stationary_flying_speed', global.WitherStormFlyingSpeed * 1.33334);
	});

	event.modify('blaze', attributes => {
		attributes.add('generic.follow_range', 20);
	});

});

EntityJSEvents.modifyEntity(event => {

	const dontTargetPlayers = function (context) {
		const target = context.target;
		if (!target) return true;
		return !target.isPlayer();
	};

	event.modify('born_in_chaos_v1:maggot', entity => {
		entity.canAttack(ctx => dontTargetPlayers(ctx));
		entity.canCollideWith(ctx => false);
	});
});
