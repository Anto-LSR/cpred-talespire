// Helpers DOM et templates

const app = document.getElementById("app");
const statusEl = document.getElementById("status");

export function setStatus(text) {
  statusEl.textContent = text ?? "";
}

export function clearApp() {
  app.innerHTML = "";
}

export function cloneTpl(id) {
  const tpl = document.getElementById(id);
  return tpl.content.cloneNode(true);
}

export function mount(fragment) {
  app.appendChild(fragment);
}
