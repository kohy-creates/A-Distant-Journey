const HourglassDusts = {
	tainted: {
		items: ['witherstormmod:tainted_sand'],
		duration: 1011,
		// texture: 'supplementaries:block/sugar',
		// ordering: 1
	}
};

StartupEvents.init(event => {
	for (let [key, data] of Object.entries(HourglassDusts)) {
		JsonIO.write('kubejs/data/adj/hourglass_dusts/' + key + '.json', data)
	}
});
