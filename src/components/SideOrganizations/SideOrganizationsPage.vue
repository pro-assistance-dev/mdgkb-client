<template>
  <el-container direction="vertical" align="center">
    <h1>Сведения об организациях в сфере охраны здоровья</h1>
    <el-collapse v-model="activeName" accordion>
      <template v-for="(item, index) in sideOrganizations" :key="item.id">
        <el-collapse-item :name="index + 1">
          <template #title>
            <h3 class="organization-title">{{ item.name }}</h3>
          </template>
          <el-row>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <div class="info-container">
                <div>
                  <h4>Телефон:</h4>
                  <div>
                    <span>{{ item.phone }}</span>
                  </div>
                </div>
                <div v-if="item.address">
                  <h4>Адрес:</h4>
                  <span>{{ item.address }}</span>
                </div>
                <div v-if="item.site">
                  <h4>Сайт:</h4>
                  <span>{{ item.site }}</span>
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <!-- <yandex-map
                :coords="Object.values(item.geolocation)"
                :zoom="15"
                style="min-height: 200px; height: 100%;"
                v-if="allowMap"
              >
                <ymap-marker
                  :coords="Object.values(item.geolocation)"
                  hint-content="some hint"
                  marker-id="123"
                />
              </yandex-map> -->
            </el-col>
          </el-row>
        </el-collapse-item>
      </template>
    </el-collapse>
  </el-container>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, watch, computed } from 'vue';
import { useStore } from 'vuex';
// import { yandexMap, ymapMarker } from 'vue-yandex-maps';

export default defineComponent({
  name: 'SideOrganizationsPage',
  components: {
    // yandexMap,
    // ymapMarker,
  },
  setup() {
    const store = useStore();
    const sideOrganizations = computed(() => store.getters['sideOrganizations/sideOrganizations']);
    const activeName = ref(1);

    const loadSideOrganizations = async (): Promise<void> => {
      await store.dispatch('sideOrganizations/getAll');
    };

    // const allowMap = ref(false);

    // const openedOrganization = () => {
    //   allowMap.value = false;
    //   setTimeout(function () {
    //     allowMap.value = true;
    //   }, 500);
    // };

    // watch(sideOrganizations, openedOrganization);

    onMounted(loadSideOrganizations);

    return {
      sideOrganizations,
      // allowMap,
      activeName,
    };
  },
});
</script>

<style lang="scss" scoped>
$table-border: #f1f1f1;

.info-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.organization-title {
  text-transform: uppercase;
}

.table-shadow {
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 2%); /* Параметры тени */
  border: 1px solid $table-border;
  border-radius: 5px;
}

h3 {
  font-size: 16px;
}

h3,
h4 {
  margin: 0;
  text-align: start;
}

.el-collapse {
  width: 100%;
  border: none;
}
.el-collapse-item {
  background-color: white;
  margin-bottom: 20px;
  padding: 10px 20px;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
}
:deep(.el-collapse-item__header),
:deep(.el-collapse-item__wrap) {
  border: none;
}
</style>
