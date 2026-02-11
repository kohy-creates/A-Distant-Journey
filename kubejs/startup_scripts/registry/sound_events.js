StartupEvents.registry('sound_event', event => {
	let soundsJson = JsonIO.read('kubejs/assets/adj/sounds.json')
	for (let key of Object.keys(soundsJson)) {
		let id = `adj:${key}`;
		console.log(`Registering sound event ${id}`)
		event.create(id);
	}
})
