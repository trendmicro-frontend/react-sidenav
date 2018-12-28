import { ADD_HIGHLIGHTED, CLEAR_HIGHLIGHTED, CHANGE_ACTIVE, CLEAR_ACTIVE, SET_SELECTED } from '../actions';

const initialState = {
    highlightedItems: [],
    activeItems: {},
    selected: undefined
};

export function items(state = initialState, action) {
    switch (action.type) {
    case ADD_HIGHLIGHTED:
        return ({
            ...state,
            highlightedItems: [...state.highlightedItems, action.item]
        });
    case CLEAR_HIGHLIGHTED:
        return ({
            ...state,
            highlightedItems: []
        });
    case CHANGE_ACTIVE:
        return ({
            ...state,
            activeItems: { ...Object.keys(state.activeItems).reduce((result, key) => {
                if (key > action.item.level && state.activeItems[action.item.level]) {
                    result[key] = null;
                    return result;
                }
                result[key] = state.activeItems[key];
                return result;
            }, {}),
            [action.item.level]: action.item.eventKey }
        });
    case CLEAR_ACTIVE:
        return ({
            ...state,
            activeItems: {}
        });
    case SET_SELECTED:
        return ({
            ...state,
            selected: action.selected
        });
    default:
        return state;
    }
}
