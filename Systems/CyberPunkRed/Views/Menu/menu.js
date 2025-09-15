/**
 * Crée un header à onglets: Personnage, Inventaire, Equipement, MJ.
 * Monte le HTML et gère l'activation des onglets via classes.
 * @param {HTMLElement} mount - Élément dans lequel insérer le header.
 * @returns {{root:HTMLElement, activate:(id:string)=>void}}
 */
export function createSimpleTabsHeader(mount) {
    const tabs = [
        { id: 'personnage', label: 'Personnage' },
        { id: 'inventaire', label: 'Inventaire' },
        { id: 'equipement', label: 'Equipement' },
        { id: 'mj',         label: 'MJ' }
    ];

    const root = document.createElement('header');
    root.className = 'tabs';

    const tabbar = document.createElement('div');
    tabbar.className = 'tabs-bar';
    root.appendChild(tabbar);

    const panels = document.createElement('div');
    panels.className = 'tabs-panels';
    root.appendChild(panels);

    const refs = {};
    tabs.forEach(({ id, label }, i) => {
        const btn = document.createElement('button');
        btn.className = 'tab';
        btn.dataset.id = id;
        btn.textContent = label;
        tabbar.appendChild(btn);

        const panel = document.createElement('section');
        panel.className = 'tab-panel';
        panel.dataset.id = id;
        panel.innerHTML = `<h2>${label}</h2><div>Contenu ${label}</div>`;
        panels.appendChild(panel);

        refs[id] = { btn, panel };
        if (i === 0) {
            btn.classList.add('active');
            panel.classList.add('active');
        }
    });

    tabbar.addEventListener('click', (e) => {
        const btn = e.target.closest('.tab');
        if (!btn) return;
        const id = btn.dataset.id;
        activate(id);
    });

    function activate(id) {
        Object.values(refs).forEach(({ btn, panel }) => {
            btn.classList.remove('active');
            panel.classList.remove('active');
        });
        if (refs[id]) {
            refs[id].btn.classList.add('active');
            refs[id].panel.classList.add('active');
        }
    }

    mount.appendChild(root);
    return { root, activate };
}
