import React, { FC, useContext, useEffect } from 'react';
import BroadcasterContext from 'contexts/broadcaster';

const Sandbox: FC<{}> = () => {
  const broadcaster = useContext(BroadcasterContext);

  useEffect(() => {
    broadcaster?.on('MSG', (msg) => {
      console.log(`mf said ${msg}`);
    });
  }, [broadcaster]);

  return (
    <>
      <button type='button' onClick={() => broadcaster?.setCookie('name', 'Kalpana')}>
        Change cookie
      </button>
      <button type='button' onClick={() => broadcaster?.emit('MSG', 'hi')}>
      Two way chit-chat
      </button>
    </>
  );
};

export default Sandbox;
