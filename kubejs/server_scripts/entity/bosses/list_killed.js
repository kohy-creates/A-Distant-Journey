EntityEvents.death(event => {
    const id = String(event.getEntity().getType());

    if (global.bossMobs.includes(id)) {
        const pData = event.getServer().getPersistentData();

        if (!pData.killedBosses) {
            pData.killedBosses = {};
        }

        /**
         * @type {Internal.CompoundTag_}
         */
        const killedMap = pData.killedBosses;
        if (!killedMap[id]) {
            killedMap.put(id, true);
            console.info(`Internal boss checklist: ${id} completed and marked as so!`);
        }
    }
});
