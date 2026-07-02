import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    private echo: any = null;

    constructor() {
        (window as any).Pusher = Pusher;
    }

    getEcho(): any {
        if (!this.echo) {
            this.echo = new Echo({
                broadcaster: 'pusher',
                key: 'itranslate_key',
                wsHost: window.location.hostname,
                wsPort: 6001,
                forceTLS: false,
                disableStats: true,
                enabledTransports: ['ws', 'wss']
            });
        }
        return this.echo;
    }
}
