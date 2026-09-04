NativeEvents.onEvent('highest', true, $LivingHurtEvent, event => {
	console.log(event.isCanceled());
});
