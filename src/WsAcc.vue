<template>
    <div class="vws-acc" :class="{ 'vws-acc--styled': !simple }">
      <div
        class="vws-acc__item"
        v-for="(item, i) in items"
        :key="'pa_' + i"
        :class="{ active: i === active }"
      >
        <div class="vws-acc__title" @click="showHide(i)">
          {{ item.title }}
          <div class="vws-acc__pm"></div>
        </div>
        <div
          class="vws-acc__cont"
          ref="toggleElRef"
          :style="{ height: heights[i] + 'px' }"
        >
          <div class="vws-acc__cont-inner" v-html="item.content"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  interface Props {
    items: {
      title: string;
      content: string;
    }[];
    simple?: boolean;
  }
  
  const active = ref<number | null>(null);
  const heights = ref<number[]>([]);
  
  const toggleElRef = ref<NodeListOf<HTMLDivElement>>();
  
  const props = defineProps<Props>();
  
  function showHide(i: number) {
    if (i === active.value) {
      active.value = null;
      heights.value[i] = 0;
      return;
    }
  
    if (active.value !== null) {
      heights.value[active.value] = 0;
    }
    active.value = i;
  
    if (toggleElRef.value) {
      heights.value[i] = toggleElRef.value[i]?.scrollHeight || 0;
    }
  }
  
  onMounted(() => {
    heights.value = props.items.map(() => 0);
  });
  </script>
  
  <style lang="scss">
  .vws-acc__cont {
    height: 0;
    transition: all 0.5s;
    overflow: hidden;
  }
  
  .vws-acc__title {
    cursor: pointer;
    user-select: none;
  }
  
  .vws-acc--styled {
    .vws-acc__title {
      font-weight: bold;
      padding: 10px;
    }
  
    .vws-acc__cont-inner {
      padding: 5px 10px 10px;
    }
  
    .vws-acc__item {
      border-bottom: 1px solid #d3d3d3;
    }
  }
  </style>
  