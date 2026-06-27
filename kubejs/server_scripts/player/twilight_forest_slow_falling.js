NativeEvents.onEvent('normal', false, $PlayerChangedDimensionEvent, /** @param {Internal.PlayerChangedDimensionEvent_} event */event => {
	const toDim = event.getTo();
	const key = `${toDim.getNamespace()}:${toDim.getPath()}`;
	if (key === 'twilightforest:twilight_forest') {
		event.getEntity().addEffect(global.newMobEffectInstance('slow_falling', '0:15'));
	}
});
