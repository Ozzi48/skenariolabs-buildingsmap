import { render } from 'react-dom'
import App from './App'
import { createStore, compose } from 'redux'
import reportWebVitals from './reportWebVitals'
import { rootReducer } from './redux/rootReducer'
import { Provider } from 'react-redux'

const store = createStore(rootReducer, compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)
render(
  app,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();