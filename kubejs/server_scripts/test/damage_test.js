const enabled = false;

EntityEvents.hurt(event => {
	if (enabled) console.log(event.source.toString())
})
