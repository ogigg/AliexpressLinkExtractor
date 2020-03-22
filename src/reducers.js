import {  CHANGE_TBXUPPER,  CHANGE_TBXLOWER, FIX_IT, CLEAR } from './actions'




// const initialState = {inputUpper : "paste link here", inputLower : ""}
const initialState = {inputUpper : "https://pl.aliexpress.com/item/32787862558.html?af=3655323&cv=36268018&cn=43q71mdx04jc5bheft2sggk8kuc4c8b7&dp=v5_43q71mdx04jc5bheft2sggk8kuc4c8b7&utm_source=epn&utm_medium=cpa&utm_campaign=3655323&utm_content=36268018&afref=https%3A%2F%2Fali.zacenta.pl%2Fnowe%2F&aff_platform=api&sk=CHRNZDvW&aff_trace_key=76456ce0fbc54606826494c2b12ed8bd-1583953557541-03460-CHRNZDvW&terminal_id=7b9d09c431664beeae9d079a1be37929&aff_request_id=76456ce0fbc54606826494c2b12ed8bd-1583953557541-03460-CH"
, inputLower : ""}

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
        case CLEAR:
            return Object.assign({}, state, {
                inputUpper:"paste link here",
                inputLower: ""
                })
        default:
        return state

    // For now, don't handle any actions
    // and just return the state given to us.
    return state
  }
}

export default inputText