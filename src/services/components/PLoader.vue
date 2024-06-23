<template>
  <div class="blur" />
  <div class="loader-container">
    <div class="loader" style="--b: 20px; width: 200px; --n: 10"></div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import '@/services/assets/style/index.scss';

.blur {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000;
  opacity: 0.3;
  z-index: 1002;
}

.loader-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1003;
}

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
