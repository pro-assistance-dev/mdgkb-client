<template>
  <div v-if="!allLoaded" class="load-more">
    <button class="lm-button" @click="$emit('loadMore')">
      <div v-if="!loading" class="text">{{ text }}</div>
      <div v-if="loading" class="loader" style="--b: 5px; width: 26px; --n: 16"></div>
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'LoadMoreButton',
  props: {
    loading: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: ['loadMore'],
  setup(props) {
    const allLoaded = computed(() => Provider.store.getters[`filter/allLoaded`]);
    const text = computed(() => (props.loading ? 'Загрузка...' : 'Показать ещё'));
    return {
      text,
      allLoaded,
    };
  },
});
</script>

<style scoped lang="scss">
.load-more {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  text-align: center;
}

.lm-button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  border: 1px solid #133dcc;
  border-radius: 30px;
  min-width: 170px;
  background: #ffffff;
  color: #133dcc;
  cursor: pointer;
  height: 40px;
  font-size: 15px;
  letter-spacing: 1.1px;
  transition: 0.2s;
}

.lm-button:hover {
  background: #133dcc;
  color: #ffffff;
}

.lm-button:hover {
  background: #133dcc;
  color: #ffffff;
}

.lm-button:hover > .loader {
  --c: #ffffff; /* the color */
}

.loader {
  --b: 10px; /* border thickness */
  --n: 10; /* number of dashes*/
  --g: 10deg; /* gap  between dashes*/
  --c: #133dcc; /* the color */

  width: 30px; /* size */
  aspect-ratio: 1;
  border-radius: 50%;
  padding: 1px; /* get rid of bad outlines */
  background: conic-gradient(#0000, var(--c)) content-box;
  --_m: /* we use +/-1deg between colors to avoid jagged edges */ repeating-conic-gradient(
      #0000 0deg,
      #000 1deg calc(360deg / var(--n) - var(--g) - 1deg),
      #0000 calc(360deg / var(--n) - var(--g)) calc(360deg / var(--n))
    ),
    radial-gradient(farthest-side, #0000 calc(98% - var(--b)), #000 calc(100% - var(--b)));
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: destination-in;
  mask-composite: intersect;
  animation: load 1s infinite steps(var(--n));
}
@keyframes load {
  to {
    transform: rotate(1turn);
  }
}
</style>
