import React from 'react';
import { render } from '@testing-library/react';
import { App } from './App';

describe('App', function () {
    test('render without crashing', () => {
        const { asFragment } = render(<App />);
    });
});
