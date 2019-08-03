import { combineReducers, createStore } from 'redux';

let initialState = []
// reducer
function todoList(state = initialState,action) {
    
  switch (action.type) {
    case 'REMOVE_TODO':
      let list = state.slice(0)
      list.splice(action.index,1)
      return list
    case 'LOAD_TODO':
      return action.data

    default:
      return state
  }
}

let reducer = combineReducers({ todoList })
let store = createStore(reducer)

export default store;