import { render, RenderResult } from '@testing-library/react';
import React, { ReactNode } from 'react';
import { Router } from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage.component';
import history from 'utils/misc/history';

const renderWithRouter = (children: ReactNode): RenderResult => render(
    <Router history={history}>
        {children}
    </Router>,
);

describe('NotFoundPage', () => {
    it('should say have the title as `404`', () => {
        const { getByText } = renderWithRouter(<NotFoundPage />);

        expect(getByText('404')).toBeTruthy();
    });

    it('should say have `Sorry, the page you visited does not exist.`', () => {
        const { getByText } = renderWithRouter(<NotFoundPage />);

        expect(getByText('Sorry, the page you visited does not exist.')).toBeTruthy();
    });

    it('should have a link to go back home', () => {
        const { getByText } = renderWithRouter(<NotFoundPage />);
        const btnGoHome = getByText('Ask page');

        expect(btnGoHome).toHaveAttribute('href', '/ask');
    });
});
