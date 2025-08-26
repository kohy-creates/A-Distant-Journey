const enabled = true;

EntityEvents.hurt(event => {
	if (enabled) console.log(event.source.toString())
})