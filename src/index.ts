import WsAcc from './WsAcc.vue';

import type { App, Plugin } from 'vue';

type SFCWithInstall<T> = T & Plugin;

const VueWsAcc = WsAcc as SFCWithInstall<typeof WsAcc>;

VueWsAcc.install = (app: App) => {
  app.component('VueWsAcc', WsAcc);
};

export default VueWsAcc;