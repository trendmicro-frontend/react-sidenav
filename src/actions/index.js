export const CHANGE_ACTIVE = 'ADD_ACTIVE';
export const CLEAR_ACTIVE = 'CLEAR_ACTIVE';
export const ADD_HIGHLIGHTED = 'ADD_HIGHLIGHTED';
export const CLEAR_HIGHLIGHTED = 'REMOVE_HIGHLIGHTED';
export const SET_SELECTED = 'SET_SELECTED';

export function changeActive(item) {
    return { type: CHANGE_ACTIVE, item };
}

export function clearActive() {
    return { type: CLEAR_ACTIVE };
}

export function addHighlighted(item) {
    return { type: ADD_HIGHLIGHTED, item };
}

export function clearHighlighted(item) {
    return { type: CLEAR_HIGHLIGHTED, item };
}

export function setSelected(selected) {
    return { type: SET_SELECTED, selected };
}
