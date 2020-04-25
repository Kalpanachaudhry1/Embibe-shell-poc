import { createContext } from 'react';
import Broadcaster from 'services/broadcaster';

const BroadcasterContext = createContext<Broadcaster|null>(null);

export default BroadcasterContext;
