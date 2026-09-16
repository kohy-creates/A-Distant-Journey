const $IOModClient = Java.loadClass('cc.cassian.immersiveoverlays.ModClient');
const $RenderGuiOverlayEvent = Java.loadClass('net.minecraftforge.client.event.RenderGuiOverlayEvent');

NativeEvents.onEvent('normal', false, $RenderGuiOverlayEvent, event => {
	if (event.getOverlay().id().toString().equals('minecraft:crosshair')) {
		$IOModClient.registerOverlays(event);
	}
});
