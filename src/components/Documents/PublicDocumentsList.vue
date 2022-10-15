<template>
  <div class="d-block">
    <h2>Документы</h2>
    <el-collapse v-model="activeName" accordion>
      <template v-for="pubDocType in publicDocumentTypes" :key="pubDocType.id">
        <el-collapse-item :id="pubDocType.id" :name="pubDocType.name">
          <template #title>
            <h3 class="collapseHeader">{{ pubDocType.name }}</h3>
          </template>
          <div v-for="docType in pubDocType.documentTypes" :key="docType.id">
            <h4 v-if="pubDocType.documentTypes.length > 1">{{ docType.name }}</h4>
            <el-table
              ref="table"
              :data="docType.documents"
              class="table-shadow"
              header-row-class-name="header-style"
              row-class-name="no-hover"
              :show-header="false"
            >
              <el-table-column width="50" align="center">
                <template #default>
                  <div class="document-icon"><FilePdfOutlined /></div>
                </template>
              </el-table-column>
              <el-table-column prop="name" align="left" min-width="130" resizable>
                <!-- <template #header>
                  <el-input v-model="filters" prefix-icon="el-icon-search" placeholder="Найти документ" size="large" />
                </template> -->
                <template #default="scope"> {{ scope.row.name }} </template>
              </el-table-column>
              <el-table-column width="150" align="center">
                <template #default="scope">
                  <a
                    v-if="scope.row.documentsScans[0].scan"
                    :href="scope.row?.documentsScans[0].scan.getFileUrl()"
                    :download="scope.row?.documentsScans[0]?.scan.originalName"
                    target="_blank"
                    style="margin-right: 10px"
                  >
                    <el-button icon="el-icon-folder-opened" size="mini">Открыть</el-button>
                  </a>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
      </template>
    </el-collapse>
  </div>
</template>

<script lang="ts">
import { FilePdfOutlined } from '@ant-design/icons-vue';
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import IPublicDocumentType from '@/interfaces/IPublicDocumentType';

export default defineComponent({
  name: 'PublicDocumentsList',
  components: { FilePdfOutlined },
  // Запись последнего роута
  // beforeRouteEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  //   localStorage.setItem('lastRoute', from.path.substring(1));
  //   next();
  // },

  setup() {
    const store = useStore();
    const mounted: Ref<boolean> = ref(false);
    const route = useRoute();
    const publicDocumentTypes: ComputedRef<IPublicDocumentType[]> = computed(() => store.getters['publicDocumentTypes/items']);
    const activeName = ref('');

    const getFileUrl = (path: string): string => {
      return `${process.env.VUE_APP_STATIC_URL}/${path}`;
    };

    onBeforeMount(async () => {
      // const lastRoute = localStorage.getItem('lastRoute');
      await store.dispatch('publicDocumentTypes/getAll');
      if (route.query.doc) {
        const publicDocType = publicDocumentTypes.value.find((item: IPublicDocumentType) => item.routeAnchor === route.query.doc);
        if (publicDocType && publicDocType.id) {
          activeName.value = publicDocType.name;
          const el = document.getElementById(publicDocType.id);
          const yOffset = -80;
          let y = 0;
          if (el) {
            y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          }
          if (y) {
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }
      }
      mounted.value = true;
    });

    return {
      mounted,
      publicDocumentTypes,
      activeName,
      getFileUrl,
    };
  },
});
</script>

<style lang="scss" scoped>
.d-block {
  height: 100vh;
  width: 100%;
}

h2 {
  text-align: center;
}

.document-icon {
  font-size: 20px;
}

:deep(.el-collapse-item__wrap) {
  padding: 0 10px;
}

.el-collapse {
  background: #ffffff;
  border-radius: 5px;
  padding: 20px;
}

// @import '@/assets/styles/elements/collapse.scss';
</style>
