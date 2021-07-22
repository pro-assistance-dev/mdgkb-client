<template>
  <div style="position: relative">
    <HeaderTop></HeaderTop>
    <HeaderBottom></HeaderBottom>
    <div class="container">
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
    </div>
    <div style="position: sticky">
      <FooterTop />
      <FooterBottom />
    </div>
  </div>
</template>

<script lang="ts">
import ParentComponent from '../../components/ParentComponent.vue';
import HeaderTop from '@/views/mainLayout/HeaderTop.vue';
import HeaderBottom from '@/views/mainLayout/HeaderBottom.vue';
import FooterTop from '@/views/mainLayout/FooterTop.vue';
import FooterBottom from '@/views/mainLayout/FooterBottom.vue';
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
