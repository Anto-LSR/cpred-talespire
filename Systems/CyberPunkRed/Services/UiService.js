import {PlayerService} from "../../../Services/Index.js";

export class UiService {
    constructor() {}

    // createTabsHeader(mount, { characterViewPath, inventoryViewPath, equipmentViewPath, GMViewPath, active } = {})
    createTabsHeader(mount, opts = {}) {
        window.handleSymbioteStateChange = function (evt) {
            if (evt && evt.kind === "hasInitialized") {
                let tabs;
                const playerService = new PlayerService();
                const {
                    characterViewPath = './Character/CharacterView.html',
                    inventoryViewPath = './Inventory/InventoryView.html',
                    equipmentViewPath = './Equipment/EquipmentView.html',
                    GMViewPath       = './GM/GMView.html',
                    active           = null // ex: 'personnage' | 'inventaire' | 'equipement' | 'mj'
                } = opts;


                if(playerService.isGM()){
                    tabs = [
                        { id: 'personnage', label: 'Personnage', href: characterViewPath },
                        { id: 'inventaire', label: 'Inventaire', href: inventoryViewPath },
                        { id: 'equipement', label: 'Equipement', href: equipmentViewPath },
                        { id: 'mj',         label: 'MJ',         href: GMViewPath }
                    ];
                }
                else {
                    tabs = [
                        { id: 'personnage', label: 'Personnage', href: characterViewPath },
                        { id: 'inventaire', label: 'Inventaire', href: inventoryViewPath },
                        { id: 'equipement', label: 'Equipement', href: equipmentViewPath }
                    ];
                }

                const root = document.createElement('header');
                root.className = 'tabs';

                const nav = document.createElement('nav');
                nav.className = 'tabs-bar';
                root.appendChild(nav);

                const refs = {};
                tabs.forEach(({ id, label, href }, i) => {
                    const a = document.createElement('a');
                    a.className = 'tab';
                    a.dataset.id = id;
                    a.href = href || '#';
                    a.textContent = label;
                    // Marquer actif selon le paramètre, sinon le premier
                    if ((active && id === active) || (!active && i === 0)) {
                        a.classList.add('active');
                    }
                    nav.appendChild(a);
                    refs[id] = a;
                });

                // Gestion clic purement visuelle (facultatif si navigation fait recharger la page)
                nav.addEventListener('click', (e) => {
                    const link = e.target.closest('.tab');
                    if (!link) return;
                    // e.preventDefault(); // décommenter si navigation client-side
                    Object.values(refs).forEach(el => el.classList.remove('active'));
                    link.classList.add('active');
                });

                mount.appendChild(root);
                return { root, refs };
            }
        }
    };
}
