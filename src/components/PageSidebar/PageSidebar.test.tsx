import { render } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router-dom';
import PageSidebar from './PageSidebar.component';
import history from 'utils/misc/history';

describe('PageSidebar', () => {
    it('should have link to candidates page', () => {
        const { getByLabelText } = render(
            <Router history={history}>
                <PageSidebar
                  location='http://localhost/candidates'
                  match={{
                    path: '/candidates',
                    isExact: true,
                    params: {},
                    url: 'http://localhost/candidates',
                }}
                />
            </Router>,
        );

        const linkToCandidates = getByLabelText('link-to-candidates');

        expect(linkToCandidates.getAttribute('href')).toBe('/candidates');
    });
});
