<template>
  <el-dialog v-if="mounted && preparation.selected" v-model="preparation.selected" :title="preparation.name" width="80%"> </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import Preparation from '@/classes/Preparation';
import IPreparation from '@/interfaces/IPreparation';

export default defineComponent({
  name: 'PreparationModal',
  components: {},
  setup() {
    const filter = ref('');
    const store = useStore();
    const mounted = ref(false);
    const preparation: Ref<IPreparation> = computed<IPreparation>(() => store.getters['preparations/item']);

    onBeforeMount(async () => {
      mounted.value = true;
    });

    const close = async () => {
      preparation.value.selected = false;
      preparation.value = new Preparation();
    };

    return {
      mounted,
      close,
      preparation,
      filter,
    };
  },
});
</script>

<style lang="scss" scoped>
.right-button {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
