<template>
  <div class="load-more">
    <PButton skin="profile" type="c_blue" margin="0 auto" @click="$emit('loadMore')" width="130px">
      <div v-if="!loading">{{ text }}</div>
      <div v-if="loading" class="loader" style="--b: 5px; width: 26px; --n: 16"></div>
    </PButton>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  loading: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
});

defineEmits(['loadMore']);
const text = computed(() => (props.loading ? 'Загрузка...' : 'Показать ещё'));
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.loader {
  --b: 10px;
  /* border thickness */
  --n: 10;
  /* number of dashes*/
  --g: 10deg;
  /* gap  between dashes*/
  --c: #ffffff;
  /* the color */

  width: 30px;
  /* size */
  aspect-ratio: 1;
  border-radius: 50%;
  padding: 1px;
  /* get rid of bad outlines */
  background: conic-gradient(#0000, var(--c)) content-box;
  --_m:
    /* we use +/-1deg between colors to avoid jagged edges */ repeating-conic-gradient(
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
