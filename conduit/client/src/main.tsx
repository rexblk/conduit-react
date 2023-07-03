import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Router from './router'
import { Provider } from 'react-redux'
import { store } from './store'
import { QueryClientProvider } from 'react-query'
import queryClient from './react-query'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
)
