const HourglassDusts = {
	tainted: {
		items: ['witherstormmod:tainted_sand'],
		duration: 1011,
		// texture: 'supplementaries:block/sugar',
		// ordering: 1
	},
	dream_sand: {
		items: ['antarchy:dream_sand'],
		duration: 222,
	},
	legacy_sand: {
		items: ['kubejs:legacy/sand'],
		duration: 100,
	}
};

for (let [key, data] of Object.entries(HourglassDusts)) {
	JsonIO.write('kubejs/data/adj/hourglass_dusts/' + key + '.json', data)
}
