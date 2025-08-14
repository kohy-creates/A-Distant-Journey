EntityJSEvents.attributes(event => {

	// Entity attributes
	event.modify('born_in_chaos_v1:fallen_chaos_knight', attributes => {
		attributes.add('generic.max_health', 24);
		attributes.add('generic.armor', 12);
	})

	event.modify('iron_golem', attributes => {
		attributes.add('generic.max_health', 150);
		attributes.add('generic.armor', 10);
	})

	event.modify('warden', attributes => {
		attributes.add('generic.armor', 20);
		attributes.add('generic.attack_damage', 40);
	})

	event.modify('wither', attributes => {
		attributes.add('generic.armor', 14);
		attributes.add('generic.max_health', 300);
	})

	event.modify('ender_dragon', attributes => {
		attributes.add('generic.armor', 10);
		attributes.add('generic.max_health', 600);
	})

	function setMaxHealth(e, amount) {
		event.modify(e, attributes => {
			attributes.add('generic.max_health', amount);
		})
	}
	setMaxHealth('phantom', 10);
	setMaxHealth('bat', 4);
	setMaxHealth('rabbit', 6);
	setMaxHealth('stray', 16);
	setMaxHealth('husk', 22);
	setMaxHealth('blaze', 16);
	setMaxHealth('phantom', 10);
	setMaxHealth('born_in_chaos_v1:nightmare_stalker', 40);
	setMaxHealth('born_in_chaos_v1:maggot', 1);
})

EntityJSEvents.modifyEntity(event => {
	event.modify('born_in_chaos_v1:maggot', entity => {
		entity.canAttack(context => false)
		entity.canCollideWith(context => false)
	})
})
