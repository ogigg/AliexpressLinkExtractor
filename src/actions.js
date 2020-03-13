export const CHANGE_TBXUPPER = 'CHANGE_TBXUPPER'
export const CHANGE_TBXLOWER = 'CHANGE_TBXLOWER'
export const FIX_IT = 'FIX_IT'


/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action creators
 */

export function textBoxUpperChange(text) {
    return { type: CHANGE_TBXUPPER, text }
  }
export function textBoxLowerChange(text) {
    return { type: CHANGE_TBXLOWER, text }
  }
export function btnClicked() {
    return { type: FIX_IT }
  }

// export function addTodo(text) {
//   return { type: ADD_TODO, text }
// }

// export function toggleTodo(index) {
//   return { type: TOGGLE_TODO, index }
// }

// export function setVisibilityFilter(filter) {
//   return { type: SET_VISIBILITY_FILTER, filter }
// }