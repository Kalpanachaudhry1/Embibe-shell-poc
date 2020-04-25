import { ApolloProvider } from '@apollo/react-hooks';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import GlobalStyle from './App.style';
import Routes from './Routes.component';
import client from 'utils/graphql/client';

const App: FC<{}> = () => (
    <>
        <GlobalStyle />
        <Helmet
          titleTemplate='CTS - %s'
          defaultTitle='CTS'
        >
            <meta name='description' content='CMS for Aasaanjobs' />
        </Helmet>
        <ApolloProvider client={client}>
            <Routes />
        </ApolloProvider>
    </>
);

export default App;
