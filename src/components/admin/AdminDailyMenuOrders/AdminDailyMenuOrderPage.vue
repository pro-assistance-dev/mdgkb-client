<template>
  <div v-if="mounted">
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :md="14" :lg="12" :xl="12">
        <el-form ref="form" v-model="dailyMenuOrder" :model="dailyMenuOrder" style="max-width: 700px">
          <AdminFormValue
            :show-additional-files="false"
            :form="dailyMenuOrder.formValue"
            :validate-email="false"
            :active-fields="UserFormFields.CreateWithPhone()"
            :is-edit-mode="isEditMode"
            :check-fields="false"
          />
        </el-form>
      </el-col>
      <el-col :xs="24" :sm="24" :md="10" :lg="12" :xl="12">
        <el-card>
          <template #header>
            <span>Блюда в заказе</span>
          </template>
          <el-table :data="dailyMenuOrder.dailyMenuOrderItems">
            <el-table-column prop="dailyMenuItem.name" label="Блюдо" />

            <el-table-column prop="name" label="Количество">
              <template #default="scope">
                <el-input-number
                  v-if="isEditMode"
                  size="mini"
                  :model-value="scope.row.quantity"
                  placeholder="Название документа"
                  @change="(par, par1) => dailyMenuOrder.changeDailyMenuOrderItemQuantity(par, par1, scope.row.dailyMenuItem)"
                />
                <div v-else>{{ scope.row.quantity }} шт.</div>
              </template>
            </el-table-column>
            <el-table-column prop="" label="Цена">
              <template #default="scope">
                <div>{{ scope.row.dailyMenuItem.price }} Р.</div>
              </template>
            </el-table-column>
            <el-table-column prop="" label="Стоимость">
              <template #default="scope">
                <div>{{ scope.row.getPriceSum() }} Р.</div>
              </template>
            </el-table-column>
            <el-table-column v-if="isEditMode" width="70" align="center">
              <template #default="scope">
                <TableButtonGroup :show-remove-button="true" @remove="dailyMenuOrder.removeDailyMenuOrderItem(scope.row)" />
              </template>
            </el-table-column>
          </el-table>
          <div class="summ">Сумма заказа: {{ dailyMenuOrder.getPriceSum() }} руб.</div>
        </el-card>
        <br />
        <el-card>
          <template #header>
            <span>Меню на сегодня</span>
          </template>
          <div v-for="dishesGroup in dailyMenu.getNotEmptyGroups(true)" :key="dishesGroup.id">
            <h4>{{ dishesGroup.name }}</h4>
            <div v-for="dailyMenuItem in dishesGroup.dailyMenuItems" :key="dailyMenuItem.id" style="margin-bottom: 5px">
              <el-button
                v-if="isEditMode"
                style="margin-right: 10px"
                size="mini"
                type="success"
                icon="el-icon-plus"
                @click="dailyMenuOrder.increaseDailyMenuOrderItem(dailyMenuItem)"
              ></el-button>
              <span>{{ dailyMenuItem.name }}</span> /
              <span>{{ dailyMenuItem.price }} руб.</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, Ref, ref } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

import DailyMenu from '@/classes/DailyMenu';
import DailyMenuOrder from '@/classes/DailyMenuOrder';
import DishesGroup from '@/classes/DishesGroup';
import UserFormFields from '@/classes/UserFormFields';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import AdminFormValue from '@/components/FormConstructor/AdminFormValue.vue';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

export default defineComponent({
  name: 'AdminDailyMenuOrderPage',
  components: {
    TableButtonGroup,
    AdminFormValue,
  },
  setup() {
    const form = ref();
    const isEditMode: Ref<boolean> = ref(false);
    const dailyMenuOrder: Ref<DailyMenuOrder> = computed(() => Provider.store.getters['dailyMenuOrders/item']);
    const todayMenu: Ref<DailyMenu> = computed(() => Provider.store.getters['dailyMenus/todayMenu']);
    const dailyMenu: Ref<DailyMenu> = computed(() => Provider.store.getters['dailyMenus/item']);
    const dishesGroups: Ref<DishesGroup[]> = computed(() => Provider.store.getters['dishesGroups/items']);

    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }
      try {
        await Provider.store.dispatch('dailyMenuOrders/update');
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      next ? next() : await Provider.router.push('/admin/daily-menu-orders');
    };

    const updateNew = async () => {
      if (!dailyMenuOrder.value.formValue.isNew) {
        return;
      }
      dailyMenuOrder.value.formValue.isNew = false;
      await Provider.store.dispatch('dailyMenuOrders/updateWithoutReset');
    };

    const { saveButtonClick, showConfirmModal } = useConfirmLeavePage();

    const load = async () => {
      try {
        await Provider.store.dispatch('dailyMenus/todayMenu');
        dailyMenu.value.actualize(todayMenu.value);
      } catch (e) {
        ElMessage.warning('Нет активных меню на сегодня');
      }
      await Provider.getAll('dishesGroups');
      dailyMenu.value.dishesGroups = dishesGroups.value;
      dailyMenu.value.initGroups();
      await Provider.loadItem();
      await updateNew();

      setInterval(async () => {
        await Provider.store.dispatch('dailyMenus/todayMenu');
        dailyMenu.value.actualize(todayMenu.value);
        dailyMenu.value.dishesGroups = dishesGroups.value;
        dailyMenu.value.initGroups();
      }, 5000);
    };

    const toggleEditMode = () => {
      isEditMode.value = !isEditMode.value;
    };

    Hooks.onBeforeMount(load, {
      adminHeader: {
        title: computed(() => (Provider.route().params['id'] ? dailyMenuOrder.value.getFormattedNumber() : 'Создать заказ')),
        showBackButton: true,
        buttons: [
          {
            action: toggleEditMode,
            text: computed(() => (isEditMode.value ? 'Выйти из редактирования' : 'Редактировать заказ')),
            type: 'primary',
          },
          { action: submit, condition: computed(() => !isEditMode.value) },
        ],
      },
    });
    Hooks.onBeforeRouteLeave();

    return {
      dailyMenu,
      isEditMode,
      UserFormFields,
      dailyMenuOrder,
      submit,
      form,
      mounted: Provider.mounted,
      schema: Provider.schema,
    };
  },
});
</script>

<style lang="scss" scoped>
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

.el-container {
  .el-card {
    margin-bottom: 20px;
  }
}

:deep(.el-dialog) {
  overflow: hidden;
}

.summ {
  padding: 10px 0 0 10px;
}
</style>
