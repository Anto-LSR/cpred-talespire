import { clearApp, cloneTpl, mount } from "./dom.js";
import { setCurrent } from "../state.js";
import { renderSheet } from "./sheetView.js";

// Affiche la liste des créatures
export function renderCreatureList(creatures) {
  clearApp();
  const frag = cloneTpl("tpl-list");
  const container = frag.querySelector("#creature-cards");

  creatures.forEach((c) => {
    const card = cloneTpl("tpl-card");
    const btn = card.querySelector(".card");
    btn.dataset.id = c.id;
    card.querySelector(".card-title").textContent = c.name || c.id;
    btn.addEventListener("click", () => openSheet(c));
    container.appendChild(card);
  });

  mount(frag);
}

function openSheet(creature) {
  setCurrent(creature);
  renderSheet(creature);
}
