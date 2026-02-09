global.mobs = []

global.WitherStormFlyingSpeed = 0.005;

EntityJSEvents.attributes(event => {

	global.mobs = event.getAllTypes();

	event.modify('player', attributes => {
		attributes.add('generic.max_health', 100);
		attributes.add('generic.attack_damage', 1.0);
		attributes.add('combatroll:count', 0.0);
		attributes.add('attributeslib:crit_chance', 0.0)
		attributes.add('attributeslib:crit_damage', 2.0);
		// attributes.add('attributeslib:draw_speed', 0.85);
		attributes.add('generic.attack_speed', 2.0)
	})

	event.modify('witherstormmod:wither_storm', attributes => {
		attributes.add('witherstormmod:slow_flying_speed', global.WitherStormFlyingSpeed);
		attributes.add('witherstormmod:target_stationary_flying_speed', global.WitherStormFlyingSpeed);
	})

})

EntityJSEvents.modifyEntity(event => {

	const dontTargetPlayers = context => {
		const { entity, target } = context;
		if (!target) return true
		return !target.isPlayer()
	}

	event.modify('born_in_chaos_v1:maggot', entity => {
		entity.canAttack(dontTargetPlayers)
		entity.canCollideWith(context => false)
	})

	event.modify('upgrade_aquatic:thrasher', entity => {
		entity.canAttack(dontTargetPlayers)
	})

	event.modify('upgrade_aquatic:great_thrasher', entity => {
		entity.canAttack(dontTargetPlayers)
	})
})
