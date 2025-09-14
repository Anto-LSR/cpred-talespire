// Fonctions d’accès aux créatures et enrichissement

// Retourne une liste enrichie [{ id, name, info? }]
export async function getCreaturesOwnedBy(playerFragmentOrId) {
  // 1) Fragments possédés par le joueur
  const fragments = await TS.creatures.getCreaturesOwnedByPlayer(
    playerFragmentOrId
  );
  if (!fragments?.length) return [];

  // 2) Enrichissement via getMoreInfo (si possible)
  try {
    const infos = await TS.creatures.getMoreInfo(fragments);

    const byId = new Map(infos.map((ci) => [ci.id, ci]));
    return fragments.map((f) => {
      const info = byId.get(f.id);
      return {
        id: f.id,
        name: info?.name || f.name || f.id,
        info,
      };
    });
  } catch (e) {
    console.warn("getMoreInfo failed, returning fragments only", e);
    return fragments.map((f) => ({ id: f.id, name: f.name || f.id }));
  }
}

// Enrichissement optionnel d’une liste partielle déjà connue
export async function enrichCreatures(creaturesList) {
  if (!creaturesList?.length) return creaturesList;
  try {
    const infos = await TS.creatures.getMoreInfo(creaturesList);
    const byId = new Map(infos.map((ci) => [ci.id, ci]));
    return creaturesList.map((c) => ({
      ...c,
      name: byId.get(c.id)?.name || c.name || c.id,
      info: byId.get(c.id) ?? c.info,
    }));
  } catch {
    return creaturesList;
  }
}

export async function enrichCreature(creature) {
  if (!creature) return creature;
  try {
    const infos = await TS.creatures.getMoreInfo(creature);
    console.log(infos[0]);

    return infos;
  } catch (e) {
    console.error(e);

    return creature;
  }
}
