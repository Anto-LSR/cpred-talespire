export const state = {
  me: null,          // playerFragment
  creatures: null,   // Array<{ id, name, info? }>
  current: null,     // current creature object
};

export function setMe(me) {
  state.me = me;
}

export function setCreatures(list) {
  state.creatures = list;
}

export function setCurrent(creature) {
  state.current = creature;
}
