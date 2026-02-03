const titleData = JsonIO.read('kubejs/assets/titledb.json');
const $ADJCore = Java.loadClass('xyz.kohara.adjcore.ADJCore');

ADJClientEvents.playerTitle(event => {
	if (titleData) {
		/** @type {$LocalPlayer_} */
		const player = event.getPlayer();
		for (let [key, map] of Object.entries(titleData)) {
			if (map.players.contains(player.getUuid().toString())) {
				let comp =
					Text.empty()
						.append(Text.of(map.icon.value).color(map.icon.color).bold())
						.append(Text.of(' '))
						.append(Text.of($ADJCore.toSmallUnicode(map.text.value)).color(map.text.color))
				event.setTitle(comp)
				return;
			}
			else continue;
		}
	}
})