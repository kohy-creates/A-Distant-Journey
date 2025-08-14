StartupEvents.registry('item', event => {

	const eyeUUID = {
		'cinders': 'aa47a6b3-b780-44c5-8ad8-382cd61840dd',
		'angels': '99143280-7f83-4aab-968b-38c2f2177c01',
		'desolation': '6926843b-39dc-4c4e-a828-c83a85988fca',
		'ethercraft': '79f0121c-85ad-4f93-8b6e-825834e8209c',
		'arcanum': 'c5e3a3ae-75e2-45f2-989e-f4fe2a74840e',
		'verdant_bloom': '2605b4f7-a5f2-4b1a-af24-4a021bdbed8e',
		'dreams': '141fcf6c-5e07-4f96-9c3a-b80c7ae85971'
	}

	event.create('eye_of_cinders')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.curioTick(global.eyeEffects.cindersTick)
				.makesPiglinsNeutral((slotContext, stack) => true)
				.addAttribute(
					'attributeslib:fire_damage',
					eyeUUID['cinders'],
					2,
					'addition'
				)
				.addAttribute(
					'attributeslib:crit_chance',
					eyeUUID['cinders'],
					0.15,
					'addition'
				)
				.addAttribute(
					'minecraft:generic.attack_speed',
					eyeUUID['cinders'],
					-0.25,
					'multiply_total'
				)
		)
		.fireResistant()
		.glow(true)
		.unstackable()
		.texture('minecraft:block/orange_wool')
		.rarity('epic')
		.tooltip('§7Hellish screeches are coming from deep inside')
		.displayName('Eye of Cinders')
		.tag('curios:accessory')
		.tag('adj:eyes')
		.tag('adjcore:curio_exclusions/eyes')


	event.create('eye_of_angels')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.curioTick(global.eyeEffects.angelsTick)
				.canWalkOnPowderedSnow((slotContext, stack) => true)
				.addAttribute(
					'minecraft:generic.max_health',
					eyeUUID['angels'],
					0.25,
					'multiply_total'
				)
				.addAttribute(
					'generic.attack_speed',
					eyeUUID['angels'],
					-0.1,
					'multiply_total'
				)
				.addAttribute(
					'attributeslib:life_steal',
					eyeUUID['angels'],
					0.05,
					'addition'
				)
		)
		.fireResistant()
		.glow(true)
		.unstackable()
		.texture('minecraft:block/yellow_wool')
		.rarity('epic')
		.tooltip('§7Heavenly aura surrounds and emanates from this Eye')
		.displayName('Eye of Angels')
		.tag('curios:accessory')
		.tag('adj:eyes')
		.tag('adjcore:curio_exclusions/eyes')

	event.create('eye_of_desolation')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.curioTick(global.eyeEffects.desolationTick)
				.canWalkOnPowderedSnow((slotContext, stack) => true)
				.addAttribute(
					'minecraft:generic.attack_damage',
					eyeUUID['desolation'],
					0.2,
					'multiply_total'
				)
				.addAttribute(
					'minecraft:generic.attack_speed',
					eyeUUID['desolation'],
					0.15,
					'multiply_total'
				)
				.addAttribute(
					'attributeslib:armor_shred',
					eyeUUID['desolation'],
					8,
					'addition'
				)
		)
		.fireResistant()
		.glow(true)
		.unstackable()
		.texture('minecraft:block/pink_wool')
		.rarity('epic')
		.tooltip('§7Bottomless void can be seen inside of it')
		.displayName('Eye of Desolation')
		.tag('curios:accessory')
		.tag('adj:eyes')
		.tag('adjcore:curio_exclusions/eyes')

	event.create('eye_of_ethercraft')
		// .attachCuriosCapability(
		// 	CuriosJSCapabilityBuilder.create()
		// 		.curioTick(global.eyeEffects.ethercraftTick)
		// )
		.fireResistant()
		.glow(true)
		.unstackable()
		.texture('minecraft:block/white_wool')
		.rarity('epic')
		.tooltip('§7Magic and tech in perfect harmony')
		.tooltip('§7Magical tech if you will')
		.displayName('Eye of Ethercraft')
		// .tag('curios:accessory')
		.tag('adj:eyes')
		// .tag('adjcore:curio_exclusions/eyes')

	event.create('eye_of_dreams')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.curioTick(global.eyeEffects.dreamsTick)
				.canWalkOnPowderedSnow((slotContext, stack) => true)
				.addAttribute(
					'minecraft:generic.movement_speed',
					eyeUUID['dreams'],
					0.1,
					'multiply_total'
				)
				.addAttribute(
					'minecraft:generic.attack_speed',
					eyeUUID['dreams'],
					0.15,
					'addition'
				)
				.addAttribute(
					'attributeslib:armor_shred',
					eyeUUID['dreams'],
					8,
					'addition'
				)
		)
		.fireResistant()
		.glow(true)
		.unstackable()
		.texture('minecraft:block/red_wool')
		.rarity('epic')
		.tooltip('§7Embodiment of nostalgia and fantasy')
		.tooltip('§7you only expierience in your wildest dreams')
		.displayName('Eye of Dreams')
		.tag('curios:accessory')
		.tag('adj:eyes')
		.tag('adjcore:curio_exclusions/eyes')

	event.create('eye_of_arcanum')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.curioTick(global.eyeEffects.arcanumTick)
				.canWalkOnPowderedSnow((slotContext, stack) => true)
				.addAttribute(
					'ars_nouveau:ars_nouveau.perk.mana_regen',
					eyeUUID['arcanum'],
					3,
					'addition'
				)
				.addAttribute(
					'ars_nouveau:ars_nouveau.perk.max_mana',
					eyeUUID['arcanum'],
					40,
					'addition'
				)
				.addAttribute(
					'ars_nouveau:ars_nouveau.perk.spell_damage',
					eyeUUID['arcanum'],
					2,
					'addition'
				)
		)
		.fireResistant()
		.glow(true)
		.unstackable()
		.texture('minecraft:block/purple_wool')
		.rarity('epic')
		.tooltip('§7Forces of magic joined together')
		.tooltip('§7and put inside a vessel')
		.displayName('Eye of Arcanum')
		.tag('curios:accessory')
		.tag('adj:eyes')
		.tag('adjcore:curio_exclusions/eyes')

	event.create('eye_of_verdant_bloom')
		.fireResistant()
		.glow(true)
		.unstackable()
		.texture('minecraft:block/light_blue_wool')
		.rarity('epic')
		.tooltip('§7Mother Nature\'s life-giving power')
		.displayName('Eye of Verdant Bloom')
		.tag('adj:eyes')
		.tag('adjcore:curio_exclusions/eyes')
})