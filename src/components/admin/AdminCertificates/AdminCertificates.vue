<template>
  <el-form v-if="mounted" ref="form" :model="certificatesWithDeleted" label-position="top" :rules="rules">
    <el-card>
      <el-button @click="certificatesWithDeleted.addCertificate()">Добавить сертификат</el-button>
      <div v-for="(certificate, i) in certificatesWithDeleted.certificates" :key="certificate.id">
        <el-form-item label="Название сертификата">
          <el-input v-model="certificate.description" />
        </el-form-item>
        <UploaderSingleScan :crop-ratio="true" :height="297" :width="210" :file-info="certificate.scan" />
        <el-button @click="removeFromClass(i, certificatesWithDeleted.certificates, certificatesWithDeleted.certificatesForDelete)"
          >Удалить сертификат</el-button
        >
      </div>
    </el-card>
  </el-form>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, ref } from 'vue';
import { useStore } from 'vuex';

import UploaderSingleScan from '@/components/UploaderSingleScan.vue';
import ICertificatesWithDeleted from '@/interfaces/ICertificatesWithDeleted';
import removeFromClass from '@/mixins/removeFromClass';
import sort from '@/mixins/sort';

export default defineComponent({
  name: 'AdminCertificates',
  components: { UploaderSingleScan },
  setup() {
    const mounted = ref(false);
    const store = useStore();
    const certificatesWithDeleted: ComputedRef<ICertificatesWithDeleted> = computed(() => store.getters['certificates/items']);

    const save = async () => {
      await store.dispatch('certificates/updateMany');
    };

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('certificates/getAll');
      store.commit('admin/setHeaderParams', {
        title: 'Сертификаты больницы',
        buttons: [{ text: 'Сохранить', type: 'primary', action: save }],
      });
      mounted.value = true;
      store.commit('admin/closeLoading');
    });

    return {
      removeFromClass,
      certificatesWithDeleted,
      sort,
      mounted,
    };
  },
});
</script>

<style lang="scss" scoped>
.groups {
  display: flex;
  flex-wrap: wrap;
}

.menu-show {
  height: 150px;
  width: 120px;
}
.donorRules-flex {
  display: flex;
  flex-wrap: wrap;
}
.menu-card {
  border: black 1px solid;
  margin: 10px;
  padding: 10px;
}
.menu-show {
  border: black 1px solid;
  margin: 10px;
  padding: 10px;

  &-body {
    height: 80%;
  }

  &-footer {
    display: flex;
    height: 20%;
    margin-bottom: 0;
  }

  &:hover {
    border: 2px;
    cursor: pointer;
    background: #7a7a7a;
  }
}

.menu-selected {
  background: #0075b2;
}
</style>
