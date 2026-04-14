EntityEvents.death(event => {
    const id = event.getEntity().getType();
    if (global.bossMobs.includes(id)) {
        const pData = event.getServer().getPersistentData();
        if (!pData.killedBosses) {
            pData.killedBosses = [];
        }
        if (!pData.killedBosses.toArray().includes(id)) {
            pData.killedBosses.push(id);
            console.info(`Internal boss checklist: ${id} completed and marked as so!`);
        }
    }
});
