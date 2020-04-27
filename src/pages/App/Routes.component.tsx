import { Layout } from 'antd';
import React, { FC } from 'react';
import {
    Route,
    Switch,
    RouteComponentProps,
    withRouter,
} from 'react-router-dom';
import MicroFrontendComponent from 'components/micro-frontend/micro-frontend';
import Sidebar from 'components/PageSidebar/PageSidebar.component';
import MFS from 'mfs';
import NotFound from 'pages/NotFoundPage/NotFoundPage.component';
// import Sandbox from 'pages/Sandbox/Sandbox';

const Routes: FC<RouteComponentProps> = ({ location }) => (
    <Layout>
        <Sidebar
          selectedPath={location.pathname}
        />
        <Layout style={{ marginLeft: '80px', height: '100vh' }}>
            <Switch>
                {Object.keys(MFS).map((name) => (
                    <Route key={name} path={MFS[name].path}>
                        <MicroFrontendComponent name={name} mf={MFS[name]} />
                        {/* <Sandbox /> */}
                    </Route>
                ))}
                <Route component={NotFound} />
            </Switch>
        </Layout>
    </Layout>
);

export default withRouter(Routes);
