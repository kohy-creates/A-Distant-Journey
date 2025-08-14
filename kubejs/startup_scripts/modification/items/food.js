ItemEvents.modification(event => {

	const nourishment = 'farmersdelight:nourishment'

	event.modify('aquamirae:poseidons_breakfast', item => {
		item.setFoodProperties(food => {
			food.removeEffect('obscure_api:fury')
				.removeEffect('obscure_api:rush')
				.effect(nourishment, duration("30:00"), 0, 1);
		})
	})

	event.modify('aquamirae:sea_stew', item => {
		item.setFoodProperties(food => {
			food.removeEffect('obscure_api:fury')
				.removeEffect('minecraft:strength')
				.effect(nourishment, duration("10:00"), 0, 1);
		})
	})

	event.modify('aquamirae:sea_casserole', item => {
		item.setFoodProperties(food => {
			food.removeEffect('obscure_api:rush');
		})
	})

	event.modify('honeycomb', item => {
		item.setFoodProperties(food => {
			food.effect('alexscaves:sugar_rush', duration("00:08"), 0, 0.1);
			food.hunger(2).saturation(0.1);
			food.fastToEat();
			food.alwaysEdible();
		})
	})

	event.modify('rotten_flesh', item => {
		item.setFoodProperties(food => {
			food.removeEffect('born_in_chaos_v1:rotten_smell')
		})
	})

	const fastToEat = [
		'beetroot',
		'delightful:source_berry_cookie',
		'arsdelight:source_berry_cookie',
		'minecraft:cookie',
		'farmersdelight:honey_cookie',
		'farmersdelight:sweet_berry_cookie',
		'delightful:glow_jam_cookie',
		'miners_delight:bat_cookie',
		'fruitsdelight:persimmon_cookie',
		'fruitsdelight:lemon_cookie',
		'fruitsdelight:cranberry_cookie',
		'fruitsdelight:bayberry_cookie',
		'upgrade_aquatic:boiled_pickerelweed'
	]
	fastToEat.forEach(entry => {
		event.modify(entry, item => {
			item.setFoodProperties(food => {
				food.fastToEat();
			})
		})
	})
})

function duration(string, mul) {
	let timeTotal, times = string.split(':');
	if (times.length === 3) {
		timeTotal =
			(parseInt(times[0]) * 60 * 60 * 20) + //Hours
			(parseInt(times[1]) * 60 * 20) + // Minutes
			(parseInt(times[2]) * 20); // Seconds
	} else if (times.length === 2) {
		timeTotal =
			(parseInt(times[0]) * 60 * 20) + // Minutes
			(parseInt(times[1]) * 20); // Seconds
	}
	if (mul) timeTotal *= mul;
	return timeTotal;
}