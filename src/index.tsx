import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import store from './redux/store'
import { Provider } from 'react-redux'
import ErrorBoundary from './ErrorBoundary'

const container = document.getElementById('app-root')!
const root = createRoot(container)
root.render(
    <ErrorBoundary>
        <Provider store={store}>
            <App />
        </Provider>
    </ErrorBoundary>
)
