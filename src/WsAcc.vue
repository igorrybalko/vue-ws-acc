<template>
  <div class="vws-acc" :class="{ 'vws-acc--styled': !simple }">
    <div
      class="vws-acc__item"
      v-for="(item, i) in items"
      :key="'pa_' + i"
      :class="{ active: active.includes(i) }"
    >
      <h3 class="vws-acc__title">
        <button
          @click="showHide(i)"
          type="button"
          :aria-expanded="active.includes(i)"
          :aria-controls="'sect' + i + uniq"
          :id="'ac' + i + uniq + 'id'"
        >
          {{ item.title }}
          <div class="vws-acc__pm"></div>
        </button>
      </h3>
      <div
        class="vws-acc__cont"
        ref="toggleElRef"
        :style="{ height: heights[i] + 'px' }"
        role="region"
        :id="'sect' + i + uniq"
        :aria-labelledby="'ac' + i + uniq + 'id'"
        :inert="!active.includes(i)"
      >
        <div class="vws-acc__cont-inner" v-html="item.content"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, useTemplateRef } from 'vue';

interface Props {
  items: {
    title: string;
    content: string;
  }[];
  simple?: boolean;
  multi?: boolean;
}

const active = ref<number[]>([]);
const heights = ref<number[]>([]);

const uniq = computed(() => Math.random().toString(36).slice(2, 6) + 'wa');

const toggleElRef = useTemplateRef<HTMLDivElement[]>('toggleElRef');  

const props = defineProps<Props>();

function resetHeight() {
  heights.value = Array(props.items.length).fill(0);
}

function showHide(i: number) {
  if (active.value.includes(i)) {
    if (props.multi) {
      active.value = active.value.filter((el) => el != i);
    } else {
      active.value = [];
    }
    heights.value[i] = 0;
    return;
  }

  if (props.multi) {
    active.value.push(i);
  } else {
    if (active.value.length) {
      resetHeight();
    }
    active.value = [i];
  }

  if (toggleElRef.value) {
    heights.value[i] = toggleElRef.value[i]?.scrollHeight || 0;
  }
}

onMounted(() => {
  resetHeight();
});
</script>

<style lang="scss">
.vws-acc__cont {
  height: 0;
  transition: all 0.5s;
  overflow: hidden;
}

.vws-acc__title {
  margin: 0;
  button {
    width: 100%;
    cursor: pointer;
    user-select: none;
    border: none;
  }
}

.vws-acc--styled {
  .vws-acc__title {
    button {
      font-weight: bold;
      padding: 10px;
      background: transparent;
      text-align: left;
    }
  }

  .vws-acc__cont-inner {
    padding: 5px 10px 10px;
  }

  .vws-acc__item {
    border-bottom: 1px solid #d3d3d3;
  }
}
</style>
