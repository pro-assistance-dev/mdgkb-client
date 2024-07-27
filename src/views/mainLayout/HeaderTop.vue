<template>
  <div class="theme-test">Theme-test</div>
</template>

<script lang="ts" setup></script>

<style lang="css" scoped>
/* :root[data-theme='dark'] { */
/*   .theme-test { */
/*     width: 200px; */
/*     height: 100px; */
/*     background: #000; */
/*     color: #fff; */
/*   } */
/* } */
/**/
/* :root[data-theme='light'] { */
/*   .theme-test { */
/*     width: 200px; */
/*     height: 100px; */
/*     background: #fff; */
/*     color: #000; */
/*   } */
/* } */
/**/
@import '@/views/mainLayout/theme.css';

.theme-test {
  width: 200px;
  height: 100px;
  background: var(--background);
  color: var(--color);
}
</style>
