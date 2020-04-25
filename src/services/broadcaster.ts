import Cookie from 'js-cookie';
import { MicroFrontend } from '../mf-contract';
import history from 'utils/misc/history';

interface Mail {
    id: number;
    from: string;
    to: string;
    type: string;
    payload: string;
}

export default class Broadcaster {
    private lastMessageId = 0;

    private mailbox: Mail[] = [];

    private currentFrame: HTMLIFrameElement | null = null;

    private postMessage(type: string, data: any = {}): void {
        if (this.currentFrame && this.currentFrame.contentWindow) {
            this.currentFrame.contentWindow.postMessage(
                {
                    id: Date.now(),
                    type,
                    ...data,
                },
                '*',
            );
        }
    }

    private channelListeners: {
        channel: string;
        cb: (message: any) => void;
    }[] = [];

    setCookie(key: string, value: any): void {
        Cookie.set(key, value);

        this.postMessage('cookie-update', { cookie: document.cookie });
    }

    emit(channel: string, message: any): void {
        this.postMessage('channel', {
            channel,
            message,
        });
    }

    on(channel: string, cb: (message: any) => void): void {
        this.channelListeners.push({
            channel,
            cb,
        });
    }

    removeListener(channel: string, cb: (message: any) => void): void {
        this.channelListeners = this.channelListeners.filter(
            (listener) => listener.channel !== channel && cb !== listener.cb,
        );
    }

    init(iframe: HTMLIFrameElement, mf: MicroFrontend): void {
        this.currentFrame = iframe;

        if (this.currentFrame && this.currentFrame.contentWindow) {
            this.currentFrame.contentWindow.onload = (): void => {
                this.postMessage('init', {
                    basename: mf.url,
                    path: mf.path,
                    cookie: document.cookie,
                });

                history.listen(() => {
                    this.postMessage('history-update');
                });

                window.addEventListener('message', (message) => {
                    const { data } = message;

                    if (data.id !== this.lastMessageId) {
                        switch (data.type) {
                            case 'history-update': {
                                const shellPathname = window.parent.location.pathname;

                                if (shellPathname.startsWith(mf.path)) {
                                    const {
                                        location,
                                    }: { location: Location } = data;

                                    const mfPath = location.pathname;

                                    history.replace(`${mf.path}${mfPath}`);
                                }

                                break;
                            }
                            case 'navigate': {
                                const { pathname }: { pathname: string } = data;

                                if (window.location.pathname !== pathname) {
                                    history.push(pathname);
                                }
                                break;
                            }
                            case 'mail': {
                                const {
                                    message: msg,
                                }: { message: Mail } = data;

                                if (
                                    !this.mailbox.find(
                                        (mail) => mail.from === msg.from
                                            && mail.to === msg.to
                                            && mail.id === msg.id,
                                    )
                                ) {
                                    this.mailbox.push(msg);

                                    this.postMessage('new-mail');
                                }
                                break;
                            }
                            case 'channel': {
                                const {
                                    channel,
                                    message: msg,
                                }: { channel: string; message: any } = data;

                                this.channelListeners.forEach((listener) => {
                                    if (listener.channel === channel) {
                                        listener.cb(msg);
                                    }
                                });

                                break;
                            }
                            case 'read-mail': {
                                const { path }: { path: string } = data;

                                const messages = this.mailbox.filter(
                                    (mail) => mail.to === path,
                                );
                                this.mailbox = this.mailbox.filter(
                                    (mail) => mail.to !== path,
                                );

                                if (messages.length > 0) {
                                    this.postMessage('mail-pop', { messages });
                                }
                                break;
                            }
                            default:
                        }
                    }

                    this.lastMessageId = data.id;
                });
            };
        }
    }
}
