import { clearApp, cloneTpl, mount } from "./dom.js";
import { state } from "../state.js";
import { renderCreatureList } from "./listView.js";
import {
  loadCPRSheetFor,
  saveCPRSheetFor,
} from "../services/storageCampaign.js";

const CPR_FIELDS = [
  "REF",
  "DEX",
  "INT",
  "TECH",
  "COOL",
  "WILL",
  "LUCK",
  "MOVE",
  "BODY",
  "EMP",
];
const SKILL_FIELDS = [
  "HANDGUN",
  "RIFLE",
  "AUTOFIRE",
  "SHOTGUN",
  "HEAVY_WEAPONS",
  "EXOTIC_WEAPONS",
  "SNIPER",
  "MELEE_WEAPONS",
  "BRAWLING",
  "EVASION",
  "ATHLETICS",
  "ENDURANCE",
  "CLIMB",
  "SWIMMING",
  "DRIVING",
  "MOTORCYCLE",
  "PILOT_AIR",
  "PILOT_GROUND",
  "PILOT_SEA",
  "RIDING",
  "PERCEPTION",
  "CONCENTRATION",
  "STEALTH",
  "PICKPOCKET",
  "LOCKPICKING",
  "EDUCATION",
  "STREETWISE",
  "CRIMINOLOGY",
  "LOCAL_EXPERT",
  "TRADING",
  "PERSUASION",
  "INTERROGATION",
  "INTIMIDATION",
  "LANGUAGE_NATIVE",
  "LANGUAGE_OTHER",
  "GAMBLING",
  "PERFORMANCE",
  "CREDIBILITY",
  "PERSONAL_GROOMING",
  "BASIC_TECH",
  "WEAPON_TECH",
  "CYBERTECH",
  "ELECTRONICS_SECURITY",
  "MAKER",
  "PROGRAMMING",
  "INTERFACE",
];

export async function renderSheet(creature) {
  console.log(creature);

  clearApp();
  if (Array.isArray(creature)) creature = creature[0];

  const frag = document.getElementById("tpl-cpr-form")
    ? cloneTpl("tpl-cpr-form")
    : buildFallbackForm();

  // Bouton retour
  const backBtn = frag.querySelector("#back-btn");
  if (state.creatures && state.creatures.length > 1) {
    backBtn.addEventListener("click", () =>
      renderCreatureList(state.creatures)
    );
    backBtn.style.display = "";
  } else {
    backBtn.style.display = "none";
  }

  // Titre
  const title = frag.querySelector(".sheet-title");
  if (title) {
    title.textContent = `Fiche Cyberpunk Red — ${
      creature?.name || creature?.id || "Personnage"
    }`;
  }

  const id = creature?.id || creature?.name || "unknown";
  const form = frag.querySelector("#cpr-form");

  // charger depuis le blob campagne
  const saved = (await loadCPRSheetFor(id)) || {};
  CPR_FIELDS.forEach((k) => {
    const input = form.elements.namedItem(k);
    if (input && saved[k] != null) input.value = saved[k];
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = { stats: {}, skills: {} };
    CPR_FIELDS.forEach(
      (k) => (data.stats[k] = Number(form.elements.namedItem(k)?.value || 0))
    );
    SKILL_FIELDS.forEach(
      (k) => (data.skills[k] = Number(form.elements.namedItem(k)?.value || 0))
    );
    await saveCPRSheetFor(creatureId, data); // même appel de persistance que précédemment
  });

  mount(frag);
}

// Construction minimale si aucun template HTML
// function buildFallbackForm() {
//   const wrapper = document.createElement("div");
//   wrapper.className = "sheet-view";
//   wrapper.innerHTML = `
//     <button class="back-btn" id="back-btn" style="display:none">← Retour</button>
//     <h2 class="sheet-title">Fiche Cyberpunk Red</h2>
//     <form id="cpr-form" class="sheet-body">
//       <div class="grid"></div>
//       <div style="margin-top:12px">
//         <button type="submit" class="back-btn">Enregistrer</button>
//       </div>
//     </form>
//   `;

//   const grid = wrapper.querySelector(".grid");
//   CPR_FIELDS.forEach((k) => {
//     const label = document.createElement("label");
//     label.style.display = "flex";
//     label.style.justifyContent = "space-between";
//     label.style.alignItems = "center";
//     label.style.gap = "8px";
//     label.textContent = k;
//     const input = document.createElement("input");
//     input.type = "number";
//     input.min = "1";
//     input.max = "10";
//     input.name = k;
//     input.required = true;
//     input.style.width = "72px";
//     label.appendChild(input);
//     grid.appendChild(label);
//   });

//   const frag = document.createDocumentFragment();
//   frag.appendChild(wrapper);
//   return frag;
// }
