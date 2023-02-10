import React from 'react'
import ReactDOM from 'react-dom/client'
import Products from "./components/Products/Products.Layout"
import { Provider } from 'react-redux'
import { reduxStore } from './redux/store'
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={reduxStore}>
      <Products />
    </Provider>
)