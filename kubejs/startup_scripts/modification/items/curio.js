ItemEvents.modification(event => {

	event.modify('supplementaries:quiver', item => {
		item.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute(
					'attributeslib:arrow_damage',
					'd24514f1-276b-4732-a92e-de1e47bd6996',
					0.1,
					"addition"
				)
				.addAttribute(
					'attributeslib:arrow_velocity',
					'd24514f1-276b-4732-a92e-de1e47bd6996',
					0.4,
					"addition"
				)
		)
	})

	event.modify('confluence:sorcerer_emblem', item => {
		item.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute(
					'ars_nouveau:ars_nouveau.perk.spell_damage',
					'378ef4cf-94c2-4432-95ce-95ee6c74d17a',
					6,
					"addition"
				)
				.addAttribute(
					'ars_nouveau:ars_nouveau.perk.max_mana',
					'378ef4cf-94c2-4432-95ce-95ee6c74d17a',
					20,
					"addition"
				)
		)
	})

	event.modify('confluence:avenger_emblem', item => {
		item.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute(
					'ars_nouveau:ars_nouveau.perk.spell_damage',
					'01737022-40a3-4aba-a062-9be48d052661',
					10,
					"addition"
				)
				.addAttribute(
					'generic.attack_damage',
					'01737022-40a3-4aba-a062-9be48d052661',
					0.12,
					"multiply_base"
				)
				.addAttribute(
					'attributeslib:arrow_damage',
					'01737022-40a3-4aba-a062-9be48d052661',
					0.12,
					"addition"
				)
		)
	})

	event.modify('confluence:destroyer_emblem', item => {
		item.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute(
					'ars_nouveau:ars_nouveau.perk.spell_damage',
					'46118a26-23a3-4653-8312-254c5f975d3e',
					8,
					"addition"
				)
				.addAttribute(
					'attributeslib:crit_chance',
					'46118a26-23a3-4653-8312-254c5f975d3e',
					0.15,
					"addition"
				)
				.addAttribute(
					'generic.attack_damage',
					'46118a26-23a3-4653-8312-254c5f975d3e',
					0.1,
					"multiply_base"
				)
				.addAttribute(
					'attributeslib:arrow_damage',
					'46118a26-23a3-4653-8312-254c5f975d3e',
					0.1,
					"addition"
				)
		)
	})

	event.modify('confluence:celestial_stone', item => {
		item.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute(
					'generic.attack_speed',
					'86695f4b-dd1d-4b4c-a5d0-e029556b5e76',
					0.1,
					"multiply_base"
				)
				.addAttribute(
					'generic.attack_damage',
					'86695f4b-dd1d-4b4c-a5d0-e029556b5e76',
					0.1,
					"multiply_base"
				)
				.addAttribute(
					'generic.armor',
					'86695f4b-dd1d-4b4c-a5d0-e029556b5e76',
					4,
					"addition"
				)
				.addAttribute(
					'attributeslib:crit_chance',
					'86695f4b-dd1d-4b4c-a5d0-e029556b5e76',
					0.02,
					"addition"
				)
				.addAttribute(
					'attributeslib:arrow_damage',
					'86695f4b-dd1d-4b4c-a5d0-e029556b5e76',
					0.1,
					"multiply_base"
				)
				.addAttribute(
					'attributeslib:arrow_damage',
					'86695f4b-dd1d-4b4c-a5d0-e029556b5e76',
					0.1,
					"addition"
				)
				.addAttribute(
					'ars_nouveau:ars_nouveau.perk.spell_damage',
					'86695f4b-dd1d-4b4c-a5d0-e029556b5e76',
					3,
					"addition"
				)
		)
	})

	event.modify('confluence:putrid_scent', item => {
		item.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute(
					'ars_nouveau:ars_nouveau.perk.spell_damage',
					'c34266b0-9edb-4274-9e0a-cac12ab24803',
					2,
					"addition"
				)
				.addAttribute(
					'attributeslib:crit_chance',
					'c34266b0-9edb-4274-9e0a-cac12ab24803',
					0.05,
					"addition"
				)
				.addAttribute(
					'generic.attack_damage',
					'c34266b0-9edb-4274-9e0a-cac12ab24803',
					0.05,
					"multiply_total"
				)
				.addAttribute(
					'attributeslib:arrow_damage',
					'c34266b0-9edb-4274-9e0a-cac12ab24803',
					0.05,
					"addition"
				)
		)
	})

	/**
	 * @type {Record<string, { damage: number, operation: number, extra: { attribute: string, value: number, operation: number }[] }>}
	 */
	const gloves = {
		'aether:iron_gloves': {
			damage: 1,
			operation: 0,
			extra: [
				{
					attribute: 'generic.attack_damage',
					value: 0,
					operation: 1
				}
			]
		},
		'aether:golden_gloves': {
			damage: 1,
			operation: 0,
			extra: [
				{
					attribute: 'generic.attack_damage',
					value: 0,
					operation: 1
				}
			]
		},
		'aether:zanite_gloves': {
			damage: 1,
			operation: 0,
			extra: [
				{
					attribute: 'generic.attack_damage',
					value: 0,
					operation: 1
				}
			]
		},
		'aether:diamond_gloves': {
			damage: 1,
			operation: 0,
			extra: [
				{
					attribute: 'generic.attack_damage',
					value: 0,
					operation: 1
				}
			]
		},
		'aether:leather_gloves': {
			damage: 1,
			operation: 0,
			extra: [
				{
					attribute: 'generic.attack_damage',
					value: 0,
					operation: 1
				}
			]
		},
		'aether:neptune_gloves': {
			damage: 1,
			operation: 0,
			extra: [
				{
					attribute: 'generic.attack_damage',
					value: 0,
					operation: 1
				}
			]
		},
		'aether:phoenix_gloves': {
			damage: 1,
			operation: 0,
			extra: [
				{
					attribute: 'generic.attack_damage',
					value: 0,
					operation: 1
				}
			]
		},
		'aether:obsidian_gloves': {
			damage: 1,
			operation: 0,
			extra: [
				{
					attribute: 'generic.attack_damage',
					value: 0,
					operation: 1
				}
			]
		},
		'aether:valkyrie_gloves': {
			damage: 1,
			operation: 0,
			extra: [
				{
					attribute: 'generic.attack_damage',
					value: 0,
					operation: 1
				}
			]
		},
		'aether:chainmail_gloves': {
			damage: 1,
			operation: 0,
			extra: [
				{
					attribute: 'generic.attack_damage',
					value: 0,
					operation: 1
				}
			]
		},
		'aether:gravitite_gloves': {
			damage: 1,
			operation: 0,
			extra: [
				{
					attribute: 'generic.attack_damage',
					value: 0,
					operation: 1
				}
			]
		},
		'aether:netherite_gloves': {
			damage: 1,
			operation: 0,
			extra: [
				{
					attribute: 'generic.attack_damage',
					value: 0,
					operation: 1
				}
			]
		},
		'lost_aether_content:power_gloves': {
			damage: 1,
			operation: 0,
			extra: [
				{
					attribute: 'generic.attack_damage',
					value: 0,
					operation: 1
				}
			]
		}
	};

	for (const [glove, entry] of Object.entries(gloves)) {
		event.modify(glove, item => {
			const capability = CuriosJSCapabilityBuilder.create();
			if (entry.damage > 0) {
				capability.addAttribute(
					'generic.attack_damage',
					'56a40da3-6e0c-4838-8842-e3b4638dcbb3',
					entry.damage,
					$Operation.fromValue(entry.operation || 0)
				)
			}

			entry.extra.forEach(element => {
				capability.addAttribute(
					element.attribute,
					'56a40da3-6e0c-4838-8842-e3b4638dcbb3',
					element.value,
					$Operation.fromValue(element.operation || 0)
				)
			});

			item.attachCuriosCapability(capability)
		})
	}
})