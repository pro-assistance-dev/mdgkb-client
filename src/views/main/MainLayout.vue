<template>
  <div id="app">
    <HeaderTop></HeaderTop>
    <HeaderBottom></HeaderBottom>
    <el-row class="container">
      <el-main>
        <div v-if="error">Ошибка</div>
        <Suspense v-else>
          <template #default>
            <slot />
          </template>
          <template #fallback>
            <div>Loading...</div>
          </template>
        </Suspense>
      </el-main>
    </el-row>
    <FooterTop />
    <FooterBottom />
  </div>
</template>

<script lang="ts">
import ParentComponent from '../../components/ParentComponent.vue';
import HeaderTop from '@/views/main-layout/HeaderTop.vue';
import HeaderBottom from '@/views/main-layout/HeaderBottom.vue';
import FooterTop from '@/views/main-layout/FooterTop.vue';
import FooterBottom from '@/views/main-layout/FooterBottom.vue';
import { onErrorCaptured, ref } from 'vue';

export default {
  name: 'MainLayout',
  components: {
    FooterBottom,
    FooterTop,
    HeaderBottom,
    HeaderTop,
  },

  setup() {
    //     const error: Error | undefined= undefined
    //     onErrorCaptured((e : Error) => {
    //         error = e
    //         return true
    //     })
    // return { error }
  },
};
</script>
