// import { get } from 'lodash';
// import CLEVERTAP_KEY from 'settings';

declare global {
    interface Window {
        clevertap: object;
    }
}
export function injectClevertap(): void {
    const clevertap = {
        event: [],
        profile: [],
        account: [],
        onUserLogin: [],
        notifications: [],
    };
    // clevertap.account.push({ id: CLEVERTAP_KEY });
    window.clevertap = clevertap;
    (
        (): void => {
        // const wzrk = document.createElement('script');
        // wzrk.type = 'text/javascript';
        // wzrk.async = true;
        // wzrk.src = `${document.location.protocol === 'https:' ? 'https://d2r1yp2w7bby2u.cloudfront.net' : 'http://static.clevertap.com'}/js/a.js`;
        // const s = document.getElementsByTagName('script')[0];
        // const parentNode: { insertBefore: Function } = get(s, 'parentNode', { insertBefore: () => null });
        // parentNode.insertBefore(wzrk, s);
        }
    )();
}

export default injectClevertap;
