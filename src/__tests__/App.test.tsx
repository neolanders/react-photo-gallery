import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { screen, waitFor, within } from '@testing-library/react'
import { renderWithProviders } from '../test-utils'
import userEvent from '@testing-library/user-event'
import images from '../__mocks__/imageFiles.json'
import '@testing-library/jest-dom'

import { App } from '../App'

// We use msw to intercept the network request during the test,
// and return the response imageList.json after 150ms
// when receiving a get request to the `https://agencyanalytics-api.vercel.app/images.json` endpoint
export const handlers = [
    rest.get(
        'https://agencyanalytics-api.vercel.app/images.json',
        (req, res, ctx) => res(ctx.json(images), ctx.delay(150))
    ),
]

const server = setupServer(...handlers)

describe('text App Gallery', () => {
    // Enable API mocking before tests.
    beforeAll(() => server.listen())

    // Reset any runtime request handlers we may add during the tests.
    afterEach(() => server.resetHandlers())

    // Disable API mocking after the tests are done.
    afterAll(() => server.close())

    test('load the App Gallery properly with images', async () => {
        renderWithProviders(<App />)

        // wait for some data to be fetch
        await waitFor(() =>
            expect(screen.getByText(/so_iceland_keira/i)).toBeInTheDocument()
        )

        // should show a title "Photos"
        expect(screen.getByText(/Photos/i)).toBeInTheDocument()

        // should show proper tabs
        expect(screen.getByText(/Favorited/i)).toBeInTheDocument()

        // "Recently Added" tab should be initialy selected
        const tabRecentlyAdded = screen.getByRole('button', {
            name: /Recently Added/i,
        })
        expect(tabRecentlyAdded).toHaveAttribute('aria-selected', 'true')

        // should match counter of images inside gallery display with data
        const container = screen.getByTestId('image-list-container')
        const images = within(container).getAllByRole('img')
        expect(images).toHaveLength(20)

        // after clicking tab fovorited should update selection and display fovorited images
        const tabFavorited = screen.getByRole('button', {
            name: /Favorited/i,
        })

        await userEvent.click(tabFavorited)

        expect(tabFavorited).toHaveAttribute('aria-selected', 'true')
        expect(tabRecentlyAdded).toHaveAttribute('aria-selected', 'false')
    })
})
