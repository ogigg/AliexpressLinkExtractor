import {  CHANGE_TBXUPPER,  CHANGE_TBXLOWER, FIX_IT } from './actions'




const initialState = {inputUpper : "paste link here", inputLower : ""}

function inputText(state = initialState, action) {
    switch (action.type) {
        case CHANGE_TBXUPPER:
            return Object.assign({}, state, {
                inputUpper: action.text
                })
        case CHANGE_TBXLOWER:
            return Object.assign({}, state, {
                inputLower: action.text
                })
        case FIX_IT:
            return Object.assign({}, state, {
                inputLower: state.inputUpper
                })
        default:
        return state

    // For now, don't handle any actions
    // and just return the state given to us.
    return state
  }
}

export default inputText