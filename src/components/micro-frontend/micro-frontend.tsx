import React, { useEffect, useContext, FC } from 'react';
import { MicroFrontendComponentProps } from './interface';
import BroadcasterContext from 'contexts/broadcaster';

const MicroFrontendComponent: FC<MicroFrontendComponentProps> = ({ name, mf }) => {
    const { url, path } = mf;
    const broadcaster = useContext(BroadcasterContext);

    useEffect(() => {
        const iframe = document.getElementById(name) as HTMLIFrameElement;

        broadcaster?.init(iframe, { url, path });
    }, [broadcaster, name, url, path]);

    return (
        <iframe
          width='100%'
          height='100%'
          title={`${name}-micro-frontend`}
          id={name}
          src={`${url}/index.html`}
          frameBorder='0'
        />
    );
};

export default MicroFrontendComponent;
