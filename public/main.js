import { setStatus, clearApp } from "./ui/dom.js";
import { state, setMe, setCreatures, setCurrent } from "./state.js";
import { getCurrentPlayer } from "./services/playersService.js";
import {
  getCreaturesOwnedBy,
  enrichCreatures,
  enrichCreature
} from "./services/creaturesService.js";
import { renderCreatureList } from "./ui/listView.js";
import { renderSheet } from "./ui/sheetView.js";

// Boot principal
async function boot() {
  try {
    setStatus("Initialisation…");

    setStatus("Récupération du joueur…");
    const me = await getCurrentPlayer();
    setMe(me);

    setStatus("Récupération de vos créatures…");
    let list = await getCreaturesOwnedBy(me);
    
    list = await enrichCreatures(list);
    setCreatures(list);

    setStatus("");
    const n = list.length;

    if (n === 0) {
      clearApp();
      const div = document.createElement("div");
      div.className = "loader";
      div.innerHTML = `
        <p>Aucune créature trouvée pour ce joueur.</p>
        <button id="retry">Rafraîchir</button>
      `;
      document.getElementById("app").appendChild(div);
      div.querySelector("#retry").addEventListener("click", boot);
      return;
    }

    if (n === 1) {
      setCurrent(list);
      renderSheet(list);
      return;
    }

    renderCreatureList(list);
  } catch (err) {
    console.error(err);
    setStatus("Erreur");
    clearApp();
    const div = document.createElement("div");
    div.className = "loader";
    div.innerHTML = `
      <p>Une erreur est survenue. Vérifier les droits ou réessayer.</p>
      <button id="retry">Réessayer</button>
    `;
    document.getElementById("app").appendChild(div);
    div.querySelector("#retry").addEventListener("click", boot);
  }
}

// Hooks globaux liés au manifest
window.handleSymbioteStateChange = function (evt) {
  if (evt && evt.kind === "hasInitialized") {
    // L’API 0.1 est prête ici
    boot();
  }
};

// Sélection d’une créature depuis TaleSpire
window.handleCreatureSelectionChange = async function (evt) {
  const creature = evt?.payload?.creatures;
  if (!creature) return;

  setCurrent(creature);
  renderSheet( await enrichCreature(creature));
};

