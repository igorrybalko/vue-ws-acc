# vue-ws-acc
A simple and lightweight **Vue 3 accordion component** plugin.  
Supports both **global plugin registration** and **local component usage**.

## Installation

```bash
# via npm
npm install vue-ws-acc
```
## Usage

1. Global registration (as a plugin)
```bash
import { createApp } from 'vue';
import App from './App.vue';
import VueWsAcc from 'vue-ws-acc';
import 'vue-ws-acc/dist/vue-ws-acc.css';

const app = createApp(App);
app.use(VueWsAcc);
app.mount('#app');
```


Now the component ```<VueWsAcc />``` is available globally.

2. Local registration (per component)

```bash
<template>
  <VueWsAcc :items="accordionItems" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VueWsAcc from 'vue-ws-acc';
import 'vue-ws-acc/dist/vue-ws-acc.css';

export default defineComponent({
  components: {
    VueWsAcc
  },
  setup() {
    const accordionItems = [
      { title: 'Section 1', content: 'Content for section 1' },
      { title: 'Section 2', content: 'Content for <strong>section</strong> 2' }
    ];
    return { accordionItems };
  }
});
</script>
```
