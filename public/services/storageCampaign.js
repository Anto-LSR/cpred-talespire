// storageCampaign.js
const STORAGE_VERSION = 1;

async function readCampaignStore() {
  try {
    const raw = await TS.localStorage.campaign.getBlob(); // renvoie une string ou vide [11]
    if (!raw) return { version: STORAGE_VERSION, sheetsByCreatureId: {} };
    const data = JSON.parse(raw);
    // migration simple
    if (!data.version) data.version = STORAGE_VERSION;
    if (!data.sheetsByCreatureId) data.sheetsByCreatureId = {};
    return data;
  } catch {
    return { version: STORAGE_VERSION, sheetsByCreatureId: {} };
  }
}

export async function loadCPRSheetFor(creatureId) {
  const store = await readCampaignStore();
  return store.sheetsByCreatureId[creatureId] || null; // null si non défini [11]
}

export async function saveCPRSheetFor(creatureId, sheet) {
  const store = await readCampaignStore();
  store.sheetsByCreatureId[creatureId] = sheet;
  await TS.localStorage.campaign.setBlob(JSON.stringify(store)); // persistant [11]
}
