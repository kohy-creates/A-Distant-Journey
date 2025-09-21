KeyBindEvents.modify(keybinds => {

	/**
	 * @type {Internal.KeyMapping_}
	 */
	const removedKeybinds = [
		"key.smoothCamera",
		"key.spectatorOutlines",
		"key.advancements",
		"key.entityculling.toggle",
		"key.hammerlib.render_item",
		"key.modernfix.config",
		"key.exposure.camera_controls",
		"iris.keybind.reload",
		"iris.keybind.toggleShaders",
		"iris.keybind.shaderPackSelection",
		"key.push_to_talk",
		"key.whisper",
		"key.disable_voice_chat",
		"key.hide_icons",
		"key.voice_chat_settings",
		"key.voice_chat_group",
		"key.voice_chat_toggle_recording",
		"key.voice_chat_adjust_volumes",
		"key.shouldersurfing.toggle_first_person",
		"key.shouldersurfing.toggle_third_person_front",
		"key.shouldersurfing.toggle_third_person_back",
		"key.shouldersurfing.toggle_camera_coupling",
		"key.shouldersurfing.toggle_x_offset_presets",
		"key.shouldersurfing.toggle_y_offset_presets",
		"key.shouldersurfing.toggle_z_offset_presets",
		"key.spelunkers_charm.flashlight_toggle",
		"key.showmeyourskin.open_settings",
		"obscure_tooltips_fix.print_screen",
		"key.map_atlases.open_minimap",
		"key.map_atlases.place_pin",
		"key.map_atlases.increase_slice",
		"key.map_atlases.decrease_slice",
		"key.curios.open.desc",
		"key.veinmining.activate.desc",
		"key.invtweaks_sort_either.desc",
		"keybinds.bettercombat.feint",
		"keybinds.bettercombat.toggle_mine_with_weapons",
		"treechop.key.toggle_chopping",
		"treechop.key.toggle_felling",
		"treechop.key.cycle_sneak_behavior",
		"treechop.key.open_settings_overlay",
		"key.ars_nouveau.qc1",
		"key.ars_nouveau.qc2",
		"key.ars_nouveau.qc3",
		"key.ars_nouveau.qc4",
		"key.ars_nouveau.qc5",
		"key.ars_nouveau.qc6",
		"key.ars_nouveau.qc7",
		"key.ars_nouveau.qc8",
		"key.ars_nouveau.qc9",
		"key.ars_nouveau.qc10",
		"key.ars_nouveau.familiar_toggle",
		"key.ars_additions.open_lectern",
		"artifacts.key.helium_flamingo.activate",
		"artifacts.key.night_vision_goggles.toggle",
		"artifacts.key.universal_attractor.toggle",
		"key.ftbteams.open_gui",
		"ping-wheel.key.open-settings",
		"create.keyinfo.rotate_menu",
		"key.configured.open_mod_list",
		"quark.keybind.autorun",
		"quark.keybind.transfer_insert",
		"quark.keybind.transfer_extract",
		"quark.keybind.shift_lock",
		"quark.emote.no",
		"quark.emote.yes",
		"quark.emote.wave",
		"quark.emote.salute",
		"quark.emote.cheer",
		"quark.emote.clap",
		"quark.emote.think",
		"quark.emote.point",
		"quark.emote.shrug",
		"quark.emote.headbang",
		"quark.emote.weep",
		"quark.emote.facepalm",
		"quark.keybind.patreon_emote.dance",
		"quark.keybind.patreon_emote.tpose",
		"quark.keybind.patreon_emote.dab",
		"quark.keybind.patreon_emote.jet",
		"quark.keybind.patreon_emote.exorcist",
		"quark.keybind.patreon_emote.zombie",
		"quark.keybind.sort_player",
		"quark.keybind.sort_container",
		"quark.keybind.narrator_readout",
		"quark.keybind.narrator_full_readout",
		"key.screenshot_viewer.open_screenshots_screen",
		"key.pickup.item",
		"terrastorage.keybinding.sort_inventory_bind",
	]

	const allKeybinds = KeyBindUtil.getAllKeyName();
	removedKeybinds.forEach(key => {
		for (let i in allKeybinds) {
			if (allKeybinds[i].toString().includes(key)) {
				keybinds.remove(key);
				keybinds.addHideKey(key);
			}
		}
	})

	// Doesn't work
	// const remappedKeys = {
	// 	"key.shouldersurfing.swap_shoulder": GLFW.GLFW_KEY_F7,
	// 	"key.firstperson.toggle": GLFW.GLFW_KEY_F6,
	// 	"key.ftbquests.quests": GLFW.GLFW_KEY_L,
	// 	"key.open_menu": GLFW.GLFW_KEY_M
	// }

	// for (const [key, value] of Object.entries(remappedKeys)) {
	// 	keybinds.modifyKey(key, value)
	// 	keybinds.modifyKey("key.forward", GLFW.GLFW_KEY_0)
	// }
})