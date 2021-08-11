<template>
  <div class="footer-top">
    <div class="container">
      <el-row>
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          <div class="image">
            <img src="@/assets/img/partners/zdrav_mos.png" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          <div class="image">
            <img src="@/assets/img/partners/dolgolet.png" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          <div class="image">
            <img src="@/assets/img/partners/mos.png" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          <div class="image">
            <img src="@/assets/img/partners/rayon.png" />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'FooterTop',

  setup() {
    const store = useStore();
    const banners = computed(() => store.getters['banners/banners']);

    return { banners };
  },
});
</script>
