const EnchantmentDescriptions = {
	'minecraft:protection': {
		base: 'Reduces damage from physical sources (e.g. weapons, arrows) by {}%.',
		args: [
			'2.5 * level'
		]
	},
	'minecraft:feather_falling': {
		base: 'Reduces fall damage by {}%.',
		args: [
			'10 * level'
		]
	},
	'minecraft:blast_protection': {
		base: 'Reduces damage from environmental effects and magic by {}%.',
		args: [
			'10 * level'
		]
	},
	'minecraft:respiration': 'Allows the user to breathe longer underwater.',
	'minecraft:aqua_affinity': 'Increases mining speed while underwater.',
	'minecraft:thorns': {
		base: '50% chance to deal {} damage to enemies in retaliation.',
		args: [
			'7 + (level - 1) * 8'
		]
	},
	'minecraft:sharpness': {
		base: 'Increases dealt damage by {}%.',
		args: [
			'8 + 4 * level',
		]
	},
	'minecraft:smite': {
		base: 'Increases damage against undead mobs by {}%.',
		args: [
			'8 + 4 * level',
		]
	},
	'minecraft:bane_of_arthropods': {
		base: 'Increases damage against lurking creatures, like Spiders, Silverfish, Shulkers or Creepers, by {}%.',
		args: [
			'8 + 4 * level'
		]
	},
	'minecraft:knockback': 'Increases the knockback strength of the weapon.',
	'minecraft:fire_aspect': {
		base: 'Sets the mob on fire for {} seconds, dealing {} damage total over the duration.',
		args: [
			'4 * level',
			'4 * 4 * level'
		]
	},
	'minecraft:looting': 'Mobs will drop more loot when killed and rarer drops are more common.',
	'minecraft:efficiency': 'Increases mining speed.',
	'minecraft:silk_touch': 'Allows fragile blocks to be collected.',
	'minecraft:unbreaking': 'Doubles the item\'s maximum durability.',
	'minecraft:fortune': 'Ore blocks might drop more resources.',
	'minecraft:power': {
		base: 'Increases arrow damage by {}%.',
		args: [
			'8 * level'
		]
	},
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
			'8 * level'
		]
	},
	'minecraft:riptide': 'Using the trident while in rain or water will launch the user forward.',
	'minecraft:channeling': 'Allows the trident to summon lightning bolts during thunderstorms.',
	'minecraft:multishot': {
		base: 'Fires {} arrows total in an even spread.',
		args: [
			'2 + level'
		]
	},
	'minecraft:quick_charge': {
		base: 'Increases the reload speed of crossbows by {}s ({}%).',
		args: [
			'((7 * level - level * level) / 2) / 20',
			'((7 * level - level * level) / 2) / 24 * 100'
		]
	},
	'minecraft:piercing': {
		base: 'Arrows pierce through mobs, dealing damage to {} extra target(s) ({} total).',
		args: [
			'level',
			'level + 1'
		]
	},
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
		base: '20% chance per hit to heal every nearby player for {} HP.',
		args: [
			'3 + (level - 1) * 2'
		]
	},
	'kubejs:echo': {
		base: 'Attacks will deal damage twice every {} seconds. Secondary strikes deal increased damage.',
		args: [
			'9 - level'
		]
	},
	'kubejs:leeching': {
		base: 'Killing mobs heals you {}% of their max health.',
		args: [
			'4 + level'
		]
	},
	'kubejs:prospector': {
		base: 'Small chance to get some Emeralds on kill (up to {}).',
		args: [
			'level + 1'
		]
	},
	'kubejs:rampaging': {
		base: 'Kill mobs to temporarily increase attack speed and damage for {} seconds. Stacks up to {} time(s).',
		args: [
			'7 + (level - 1) * 1.5',
			'level'
		]
	},
	'kubejs:cowardice': {
		base: 'Increases dealt damage by {}% while above 95% health',
		args: [
			'12 + 6 * (level - 1)'
		]
	},
	'kubejs:lucky_explorer': 'Chance to find some Emeralds while running around',
	'kubejs:reckless': {
		base: 'Max health reduced by 40%. Increases damage dealt by {}%',
		args: [
			'60 + (level - 1) *  20'
		]
	},
	'kubejs:rapid_regen': {
		base: 'Increases life regeneration by {} HP/s',
		args: [
			'0.25 + level * 0.5'
		]
	},
	'kubejs:void_strike': {
		base: 'Applies a rising damage multiplier to hit mobs (0% -> {}%).',
		args: [
			'120 * level'
		]
	},
	'kubejs:void_shot': {
		base: 'Applies a rising damage multiplier to shot mobs (0% -> {}%).',
		args: [
			'120 * level'
		]
	},
	'kubejs:committed': {
		base: 'Deal increased damage against already wounded enemies (0% -> {}%).',
		args: [
			'20 * level'
		]
	},
	'kubejs:curse_of_polarity': 'Enchanted weapon either deals 50% more damage or no damage at all.',
	'kubejs:curse_of_anti_entropy': 'Chance to freeze attacking mobs, but also to set you on fire at the same time.',
	'kubejs:deferred_damage': 'Defers a portion of the damage received and transforms it into damage over time.',

	'alexscaves:field_extension': 'Galena Gauntlet can move items further away',
	'alexscaves:crystallization': 'Galena Gauntlet can move items made of crystal, such as diamond tools',
	'alexscaves:ferrous_haste': 'Galena Gauntlet items attack and mine much faster',
	'alexscaves:arrow_inducting': 'Resistor Shield transforms any deflected arrows into seeking arrows',
	'alexscaves:heavy_slam': 'Resistor Shield first slam attack deals additional damage',
	'alexscaves:energy_efficiency': 'Raygun uses up charge at a slower rate',
	'alexscaves:swiftwood': 'Primitive Club can be swung much faster',
	'alexscaves:bonking': 'Primitive Club has a chance to drop heads from slain mobs, as if a charged Creeper killed them',
	'alexscaves:dazing_sweep': 'Primitive Club can inflict the Stunned effect in a larger area',
	'alexscaves:plummeting_flight': 'Extinction Spear Subterranodon attack carries foes higher and for longer',
	'alexscaves:herd_phalanx': 'Extinction Spear Grottoceratops defense summons more armored heads',
	'alexscaves:chomping_spirit': 'Extinction Spear Tremorsaurus attack deals increased damage',
	'alexscaves:solar': 'Raygun recharges over time when user is under direct sunlight',
	'alexscaves:x_ray': 'Raygun beam pierces through walls',
	'alexscaves:gamma_ray': 'Raygun beam inflicts deadly blue Irradiated effect',
	'alexscaves:second_wave': 'Ortholance summons a second, delayed wave after launching the player',
	'alexscaves:flinging': 'Ortholance launch moves the player much further',
	'alexscaves:sea_swing': 'Ortholance swing attack summons a single, forwards-facing wave',
	'alexscaves:tsunami': 'Ortholance launch summons a single, gigantic wave',
	'alexscaves:charting_call': 'Magic Conch summons additional Deep Ones to aide in combat',
	'alexscaves:lasting_morale': 'Deep Ones summoned by Magic Conch will stay around longer',
	'alexscaves:taxing_bellow': 'Using the Magic Conch lowers the opinion held by Deep Ones, but does not decrease durability',
	'alexscaves:enveloping_bubble': 'Sea Staff water bolt can envelop the target in a drowning bubble of water',
	'alexscaves:bouncing_bolt': 'Sea Staff water bolt can bounce to a second target after a direct hit',
	'alexscaves:seapairing': 'Sea Staff can occasionally regain durability when in the inventory of a submerged entity',
	'alexscaves:triple_splash': 'Sea Staff fires two additional water bolts',
	'alexscaves:soak_seeking': 'Sea Staff water bolts now home-in on targets more accurately',
	'alexscaves:detonating_death': 'Mobs possessed by the Totem of Possession will explode before dying in battle',
	'alexscaves:rapid_possession': 'Mobs possessed by the Totem of Possession will move faster',
	'alexscaves:sightless': 'Mobs possessed by the Totem of Possession can be controlled without a direct line of sight',
	'alexscaves:astral_transferring': 'Mobs possessed by the Totem of Possession can swap possessed status with other, healthier mobs they fight',
	'alexscaves:impending_stab': 'Ghostly dagger attack is delayed and deals increased damage',
	'alexscaves:sated_blade': 'Ghostly dagger attack increases the food saturation level of the attacker',
	'alexscaves:double_stab': 'Desolate Dagger attack summons two ghostly blades',
	'alexscaves:precise_volley': 'Dreadbow arrows rain down from the sky to a more central position',
	'alexscaves:dark_nock': 'Dreadbow can fire arrows at a faster rate',
	'alexscaves:relentless_darkness': 'Dreadbow fires arrows directly ahead in a continuous stream',
	'alexscaves:twilight_perfection': 'Dreadbow arrows glow red and deal double damage if fired at the precise bow charge time',
	'alexscaves:shaded_respite': 'Dreadbow will not consume normal arrows or durability if fired in darkness',
	'alexscaves:targeted_ricochet': 'Gumballs will bounce to the nearest target after hitting a wall or entity',
	'alexscaves:triple_split': 'Gumballs split into three additional Gumballs after hitting their first target',
	'alexscaves:bouncy_ball': 'Gumballs bounce an additional two times for each level',
	'alexscaves:explosive_flavor': 'Shotgum fires a single slow, explosive gumball',
	'alexscaves:far_flung': 'Hook launches even further when swung',
	'alexscaves:sharp_cane': 'Hook deals three damage per level when attaching to a target',
	'alexscaves:straight_hook': 'Hook launches directly ahead and is not hindered by gravity',
	'alexscaves:spell_lasting': 'Hexes last an additional three seconds for each level',
	'alexscaves:peppermint_punting': 'Peppermints bounce directly ahead instead of around the attacker',
	'alexscaves:humungous_hex': 'Hexes have an additional full block in width for each level',
	'alexscaves:multiple_mint': 'An additional peppermint is summoned for each level',
	'alexscaves:seekcandy': 'Peppermints created by the staff seek out any entity the attacker looks at',

	'mynethersdelight:poaching': 'Most killed passive mobs will drop additional items but killing certain mobs will have a negative effect',
	'ars_additions:spellweave': 'Adds a thread slot to enchanted armor.'
};
