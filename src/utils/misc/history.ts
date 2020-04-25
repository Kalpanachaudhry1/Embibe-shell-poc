// eslint-disable-next-line
import { createBrowserHistory } from 'history';
// creates browser history ( for back button )
const history = createBrowserHistory({
    basename: process.env.PUBLIC_URL,
});
export default history;
