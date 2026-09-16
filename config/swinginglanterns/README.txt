Swinging Lanterns configuration

Files:
- swinginglanterns.json: main gameplay settings.
- lantern_overrides.json: force-enable or force-disable lantern support.
- raycast_ignored_blocks.json: blocks ignored by wind raycasts.

lantern_overrides.json
- forceEnable: entries to always treat as supported hanging lanterns.
- forceDisable: entries to never treat as supported hanging lanterns.
- defaultsAlreadyOffered: bookkeeping, not a list to edit. It records the default entries
  this file has already been offered, so a default you delete on purpose stays deleted
  when the mod updates, and a new one still reaches you.
- chainForceEnable: entries to treat as chain segments, for modded chains that
  are not vanilla ChainBlocks and are not in #minecraft:chains.
- chainForceDisable: entries to never treat as chain segments.
- attachMode: AUTO (default), REQUIRE_HANGING or ALWAYS. It decides when a
  force-enabled block counts as hanging. AUTO honours the vanilla 'hanging'
  property when the block has one and accepts blocks that do not have it, which
  is what makes chandeliers and MCreator-style lanterns work. REQUIRE_HANGING
  keeps the old behaviour. ALWAYS accepts every state.

- staticLanternMode: MICRO_MODEL (default) or INVISIBLE. It decides how the
  vanilla, non-animated lantern is kept out of sight. MICRO_MODEL shrinks it to
  nothing, which keeps it as a light anchor for path-tracing shaders but has to
  be implemented for every terrain renderer; if yours is not covered you will see
  two lanterns, one still and one swinging. INVISIBLE makes the block decline to
  render at all, which no renderer can get wrong, at the cost of that shader
  anchor. Check your latest.log for a Swinging Lanterns warning naming your
  renderer before switching. Side effect of INVISIBLE: the block no longer
  contributes to the chunk mesh, so vanilla block-break particles for lanterns
  may not appear. The swinging lantern, its chains and the breaking crack overlay
  are unaffected.

Entry syntax (all four lists):
- "modid" applies to every block from that mod.
- "modid:block_id" targets a single block.
- "#modid:tag_id" targets a block tag. Note that datapack tags come from the
  server, so a tag is empty when you join a server without the mod; use plain
  ids for client-side-only setups.
- forceDisable and chainForceDisable win over the matching force-enable list.

raycast_ignored_blocks.json
- ignored: list of block ids or block tags (tags start with '#').
- Example entries: "minecraft:torch" or "#minecraft:leaves".

swinginglanterns.json
- playerPassThroughLanternColliders: on by default. Lets players walk through the
  hanging lantern and chain, which is what makes it possible to hit the swinging
  model rather than being stopped by the vanilla block short of it.
  It needs singleplayer, or a server running this mod. Collision is decided by
  the server, so on a vanilla server you are pushed back out and the setting has
  no effect at all - the in-game toggle says so next to the option when that is
  the case. Everything else the physics does works on any server.

Notes:
- Entries are case-insensitive; spaces are trimmed.
- Restart the game after editing config files.