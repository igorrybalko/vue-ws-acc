import WsAcc from './WsAcc.vue';

import type { App } from 'vue';

WsAcc.install = (app: App) => {
    app.component('VueWsAcc', WsAcc);
};

export default WsAcc;
