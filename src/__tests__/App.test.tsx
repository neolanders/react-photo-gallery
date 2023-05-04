import React from 'react'
import { render } from '@testing-library/react'
import { App } from '../App'
import { Provider } from 'react-redux'

describe('App', function () {
    test('render without crashing', () => {
        render(<App />)
        // expect(screen.getByRole('heading')).toHaveTextContent('hello there')
    })
})
