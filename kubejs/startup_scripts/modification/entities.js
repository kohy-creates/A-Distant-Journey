global.mobs = []

global.WitherStormFlyingSpeed = 0.005;

EntityJSEvents.attributes(event => {

	// Disabled if I don't need it for testing so that it doesn't linger in memory
	global.mobs = event.getAllTypes();

	event.modify('player', attributes => {
		attributes.add('generic.max_health', 100);
		attributes.add('generic.attack_damage', 1);
		attributes.add('combatroll:count', 0);
		attributes.add('attributeslib:crit_damage', 2.0);
		attributes.add('attributeslib:draw_speed', 0.85);
	})

	event.modify('witherstormmod:wither_storm', attributes => {
		attributes.add('witherstormmod:slow_flying_speed', global.WitherStormFlyingSpeed);
		attributes.add('witherstormmod:target_stationary_flying_speed', global.WitherStormFlyingSpeed);
	})

})

EntityJSEvents.modifyEntity(event => {
	event.modify('born_in_chaos_v1:maggot', entity => {
		entity.canAttack(context => false)
		entity.canCollideWith(context => false)
	})
})
