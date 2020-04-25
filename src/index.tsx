import React, { StrictMode } from 'react';

import { render } from 'react-dom';
import { registerObserver } from 'react-perf-devtool';
import { Router } from 'react-router-dom';
import BroadcasterContext from 'contexts/broadcaster';
import App from 'pages/App/App.component';
import Broadcaster from 'services/broadcaster';
import serviceWorker from 'serviceWorker';
import history from 'utils/misc/history';

if (process.env.NODE_ENV !== 'production') {
    import('@welldone-software/why-did-you-render').then((whyDidYouUpdate) => whyDidYouUpdate.default(React, {
        trackAllPureComponents: true,
        collapseGroups: true,
    }));
}

const broadcaster = new Broadcaster();

/**
 * String of the application.
 * React strict mode implememnted.
 */
render(
    <Router history={history}>
        <StrictMode>
            <BroadcasterContext.Provider value={broadcaster}>
                <App />
            </BroadcasterContext.Provider>
        </StrictMode>
    </Router>,
    document.getElementById('root'),
);

registerObserver();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker();
