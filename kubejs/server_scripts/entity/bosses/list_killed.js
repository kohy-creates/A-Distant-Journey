EntityEvents.death(event => {
    const id = String(event.getEntity().getType());
    if (global.bossMobs.includes(id)) {
        /**
         * @type {Internal.CompoundTag_}
         */
        const killedBosses = global.getKilledBosses(event.getServer());
        if (!killedBosses.includes(id)) {
            event.getServer().persistentData.killedBosses.put(id, true);
            console.info(`Internal boss checklist: ${id} was defeated for the first time and marked as so!`);
        }
    }
});
