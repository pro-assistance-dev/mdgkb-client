<template>
  <div class="flex-column">
    <el-card>
      <el-button @click="init">Инициализировать</el-button>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AdminAppointmentsConstructor',
  components: {},
  setup() {
    // const router = useRouter();
    // const doctors = computed(() => store.getters['doctors/items']);
    //
    // onBeforeMount(async () => {
    //
    //   store.commit('admin/setHeaderParams', { title: 'Врачи', buttons: [{ text: 'Добавить врача', type: 'primary', action: create }] });
    //   store.commit('pagination/setCurPage', 1);
    // });
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
$margin: 20px 0;

.flex-column {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.flex-row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: $margin;
}

.flex-row-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: $margin;
}

.tag-link {
  margin: 2px;
  transition: all 0.2s;
  color: blue;
  border-color: blue;
  border-radius: 20px;
  &:hover {
    background-color: blue;
    color: white;
    cursor: pointer;
  }
}
</style>
