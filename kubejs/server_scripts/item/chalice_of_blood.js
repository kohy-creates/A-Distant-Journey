const ChaliceOfBlood = {
	getDamage: function (x) {
		return 15 + 8.5 * Math.pow(x, 2);
	},
	RANDOM_BOUNDS: [0.9, 1.25]
};

ItemEvents.rightClicked('kubejs:chalice_of_blood', event => {
	let item = event.getItem();
	let nbt = item.getNbt();
	if (!nbt) {
		nbt = {};
	}
	if (!nbt.adj_chalice_blood_amount) {
		nbt.adj_chalice_blood_amount = 0;
	}
	let lvl = nbt.adj_chalice_blood_amount;
	if (lvl >= 10) return;

	let player = event.getPlayer();
	let server = event.getServer();

	let damage = ChaliceOfBlood.getDamage(lvl);
	let minAmount = Math.ceil(ChaliceOfBlood.RANDOM_BOUNDS[0] * damage);
	let maxAmount = Math.ceil(ChaliceOfBlood.RANDOM_BOUNDS[1] * damage);

	if (!player.isShiftKeyDown()) {
		server.runCommandSilent(`/eta clearqueue ${player.getDisplayName().getString()} chalice1`);
		server.runCommandSilent(`/eta clearqueue ${player.getDisplayName().getString()} chalice2`);
		server.runCommandSilent(
			`/eta queue ${player.getDisplayName().getString()} chalice1 <dur:80><anchor value=BOTTOM_CENTER><fade in=20 out=20><offset y=-90><color col=C44747><wiggle a=0.15 f=2.5><shadow c=6E0C0C>The Chalice will deal between ${minAmount.toString().replace('.0', '')} - ${maxAmount.toString().replace('.0', '')} damage to you`
		);
		server.runCommandSilent(
			`/eta queue ${player.getDisplayName().getString()} chalice2 <dur:80><anchor value=BOTTOM_CENTER><fade in=20 out=20><offset y=-80><color col=AD0E0E><wiggle a=0.15 f=2.5><shadow c=7A0909>Are you sure? Right-click while sneaking if so`
		);
	}
	else {
		damage = global.getRandomInt(minAmount, maxAmount);
		player.attack(global.getDamageSource(player.getLevel(), 'adj:chalice_of_blood', null, player), damage);
		server.scheduleInTicks(1, () => {
			if (player.isAlive()) {
				nbt.adj_chalice_blood_amount++;
				if (nbt.adj_chalice_blood_amount == 10) {
					nbt.CustomModelData = 4;
				}
				else if (nbt.adj_chalice_blood_amount >= 7) {
					nbt.CustomModelData = 3;
				}
				else if (nbt.adj_chalice_blood_amount >= 4) {
					nbt.CustomModelData = 2;
				}
				else if (nbt.adj_chalice_blood_amount >= 1) {
					nbt.CustomModelData = 1;
				}
				item.setNbt(nbt);
			}
		});
	}

});
