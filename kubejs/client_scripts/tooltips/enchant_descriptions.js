const enchantmentDescriptions = {
	'minecraft:protection': 'Reduces damage from physical sources.',
	'minecraft:feather_falling': 'Reduces fall damage.',
	'minecraft:blast_protection': 'Reduces damage from environmental effects and magic.',
	'minecraft:respiration': 'Allows the user to breathe longer underwater.',
	'minecraft:aqua_affinity': 'Increases mining speed while underwater.',
	'minecraft:thorns': 'Causes damage to enemies when they attack you.',
	'minecraft:sharpness': {
		base: 'Increases dealt damage by {}%.',
		args: [
			'10 + 4 * level',
		]
	},
	'minecraft:smite': {
		base: 'Increases damage against undead mobs by {}%.',
		args: [
			'14 + 7 * level',
		]
	},
	'minecraft:bane_of_arthropods': {
		base: 'Increases damage against lurking creatures, like Spiders, Silverfish, Shulkers or Creepers, by {}%.',
		args: [
			'14 + 7 * level'
		]
	},
	'minecraft:knockback': 'Increases the knockback strength of the weapon.',
	'minecraft:fire_aspect': 'Causes additional fire damage when used to attack a mob.',
	'minecraft:looting': 'Mobs will drop more loot when killed.',
	'minecraft:efficiency': 'Increases mining speed of the tool.',
	'minecraft:silk_touch': 'Allows fragile blocks such as glass to be collected.',
	'minecraft:unbreaking': 'Doubles the item\'s maximum durability.',
	'minecraft:fortune': 'Some blocks like coal and diamond ore may drop additional items.',
	'minecraft:power': 'Increases the damage of arrows fired from the bow.',
	'minecraft:punch': 'Increases the knockback strength of arrows fired by the bow.',
	'minecraft:flame': 'Arrows fired from the bow will deal additional fire damage.',
	'minecraft:infinity': 'Allows the bow to fire normal arrows for free. You must have at least one arrow for this to work.',
	'minecraft:luck_of_the_sea': 'Increases the chance of getting good loot while fishing.',
	'minecraft:lure': 'Decreases the amount of time it takes for a fish to bite the hook.',
	'minecraft:depth_strider': 'Increases movement speed while underwater.',
	'minecraft:frost_walker': 'Water under the user will freeze into frosted ice.',
	'minecraft:mending': 'Repairs the durability of armor and tools with XP.',
	'minecraft:binding_curse': 'Prevents the cursed item from being removed from an armor slot.',
	'minecraft:vanishing_curse': 'Destroys the cursed item if you die with it in your inventory.',
	'minecraft:loyalty': 'Allows the trident to automatically return after being thrown.',
	'minecraft:impaling': {
		base: 'Increases damage dealt to mobs in water or rain by {}%.',
		args: [
			"10 * level"
		]
	},
	'minecraft:riptide': 'Using the trident while in rain or water will launch the user forward.',
	'minecraft:channeling': 'Allows the trident to summon lightning bolts during thunderstorms.',
	'minecraft:multishot': 'Fires additional arrows in similar directions.',
	'minecraft:quick_charge': 'Increases the reload speed of crossbows.',
	'minecraft:piercing': 'Allows projectiles to pierce through mobs.',
	'minecraft:soul_speed': 'Increases movement speed on soul blocks.',
	'minecraft:swift_sneak': 'Increases movement speed while sneaking.',

	'betterarcheology:penetrating_strike': 'Some damage will bypass protection enchantments.',
	'betterarcheology:seas_bounty': 'Allows you to catch more types of treasure.',
	'betterarcheology:soaring_winds': 'Gives the elytra a boost when taking off.',
	'betterarcheology:tunneling': 'Mines the block below the target block as well.',

	'galosphere:rupture': 'Shatters the saltbound tablet\'s pillars into shard projectiles once they break.',
	'galosphere:sustain': 'Extends the duration of the saltbound tablet\'s pillars.',
	'galosphere:enfeeble': 'Inflicts slowness on entities hit by the saltbound tablet\'s pillars.',

	'kubejs:radiance': {
		base: "20% chance per hit to heal every nearby player for {} HP.",
		args: [
			"4 + level * 4"
		]
	},
	'kubejs:echo': {
		base: "Attacks will deal damage twice every {} seconds. Secondary strikes deal increased damage.",
		args: [
			"9 - level"
		]
	},
	'kubejs:leeching': {
		base: "Killing mobs heals you {}% of their max health.",
		args: [
			"4 + 2 * level"
		]
	},
	'kubejs:prospector': {
		base: "Small chance to get some Emeralds on kill (up to {}).",
		args: [
			"level + 1"
		]
	},
	'kubejs:rampaging': {
		base: "Kill mobs to temporarily increase attack speed and damage for {} seconds. Stacks up to {} time(s).",
		args: [
			"7 + (level - 1) * 1.5",
			"level"
		]
	},
	'kubejs:cowardice': {},
	'kubejs:lucky_explorer': {},
	'kubejs:reckless': {},
	'kubejs:rapid_regen': {},
	'kubejs:void_strike': {
		base: "Applies a rising damage multiplier to hit mobs (0% -> {}%).",
		args: [
			"120 * level"
		]
	},
	'kubejs:void_shot': {
		base: "Applies a rising damage multiplier to shot mobs (0% -> {}%).",
		args: [
			"120 * level"
		]
	},
	'kubejs:committed': {
		base: "Deal increased damage against already wounded enemies (0% -> {}%).",
		args: [
			"20 * level"
		]
	},
	'kubejs:curse_of_polarity': 'Enchanted weapon either deals 50% more damage or no damage at all.',
	'kubejs:curse_of_anti_entropy': 'Chance to freeze attacking mobs, but also to set you on fire at the same time.',
	'kubejs:deferred_damage': 'Defers a portion of the damage received and transforms it into damage over time.'
}
ItemEvents.tooltip(event => {

	function parseMath(expr) {
		return Function(`'use strict'; return (${expr})`)()
	}

	event.addAdvanced('minecraft:enchanted_book', (item, advanced, tooltip) => {

		/** @type {any[]} */
		const enchantments = item.nbt.StoredEnchantments;
		if (!enchantments) return;
		const amount = enchantments.length;
		if (amount == 0) return;

		// Prettier entries
		for (let i = 2; i < amount + 2; i++) {
			let line = tooltip[i];
			tooltip.remove(i);
			tooltip.add(i, Text.join([
				Text.gray(' ◇'),
				Text.of(line)
			]));
		}

		// Descriptions
		for (let i = amount + 1; i > 1; i--) {
			let enchant = enchantments[i - 2];
			let id = enchant.id;
			let level = enchant.lvl;

			/**	@type {Internal.MutableComponent_|String} */
			let desc = enchantmentDescriptions[id];
			if (desc) {
				if (desc.base) {
					let base = desc.base;
					let args = desc.args;
					for (let i = 0; i < args.length; i++) {
						let arg = args[i];
						let value = parseMath(arg.replace('level', level));
						base = base.replace('{}', value);
					}
					desc = Text.of(base);
				}
				else {
					desc = Text.of(desc);
				}
			}
			// Fallback logic
			else {
				let idSplit = id.split(':')
				desc = Text.translate(`enchantment.${idSplit[0]}.${idSplit[1]}.desc`);
			}

			tooltip.add(i + 1, Text.join([
				Text.darkGray('   ▷ '),
				desc.darkGray()
			]))
		}

	})

})
