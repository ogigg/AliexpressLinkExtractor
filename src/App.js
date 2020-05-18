import React, {useEffect} from 'react';
import './App.css';
import { Provider } from 'react-redux'
import store from './store'
import HomePage from './Components/HomePage';
import "antd/dist/antd.css";

const TITLE = 'Aliexpress Link Fixer';


// import {
//   addTodo,
//   toggleTodo,
//   setVisibilityFilter,
//   VisibilityFilters
// } from './actions'

function App() {
// Log the initial state
// console.log(store.getState())

// // Every time the state changes, log it
// // Note that subscribe() returns a function for unregistering the listener
// const unsubscribe = store.subscribe(() => console.log(store.getState()))

// // Dispatch some actions
// store.dispatch(addTodo('Learn about actions'))
// store.dispatch(addTodo('Learn about reducers'))
// store.dispatch(addTodo('Learn about store'))
// store.dispatch(toggleTodo(0))
// store.dispatch(toggleTodo(1))
// store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))

// // Stop listening to state updates
// unsubscribe()

useEffect(() => {
  document.title = TITLE
}, []);




  return (
  <Provider store = {store}>
    <title>{ TITLE }</title>
    <HomePage/>
    
  </Provider>
  );
}

export default App;

