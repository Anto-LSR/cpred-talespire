// Encapsule les appels Players
export async function getCurrentPlayer() {
  // TS.players.whoAmI renvoie un playerFragment
  const me = await TS.players.whoAmI();
  return me;
}
