<template>
  <div class="container-bufet">
    <div class="header">
      <div class="header-top">
        <div class="header-right">
          <button class="bufet" @click="$router.push('/bufet')">В меню</button>
        </div>
      </div>
      <div class="menu-bufet">
        <div class="menu-title">Ваш заказ:</div>
      </div>
    </div>
    <div class="table-main">
      <el-form
        ref="userForm"
        v-model="dailyMenuOrder"
        :model="dailyMenuOrder"
        label-width="150px"
        style="max-width: 700px"
        label-position="left"
      >
        <UserForm :form="dailyMenuOrder.formValue" :active-fields="UserFormFields.CreateWithPhone()" />
        <FieldValuesForm :form="dailyMenuOrder.formValue" />
      </el-form>
    </div>
    <div class="footer">
      <button class="add-to-card" @click="createOrder">Заказать1</button>
      <div class="footer-info">
        <div class="field1">{{ dailyMenuOrder.getCaloricSum() }} ккал</div>
        <div class="field2">{{ dailyMenuOrder.getPriceSum() }} р.</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { watch } from '@vue/runtime-core';
import { ElLoading, ElNotification } from 'element-plus';
import { computed, defineComponent, Ref, ref } from 'vue';

import DailyMenuOrder from '@/classes/DailyMenuOrder';
import UserFormFields from '@/classes/UserFormFields';
import FieldValuesForm from '@/components/FormConstructor/FieldValuesForm.vue';
import UserForm from '@/components/FormConstructor/UserForm.vue';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
import validate from '@/services/validate';

export default defineComponent({
  name: 'BufetOrder',
  components: { UserForm, FieldValuesForm },
  setup() {
    const dailyMenuOrder: DailyMenuOrder = DailyMenuOrdersStore.Item();
    const userForm = ref();
    const checkDailyMenuOrderItemsLength = () => {
      if (dailyMenuOrder.dailyMenuOrderItems.length === 0) {
        Provider.router.push('/bufet');
      }
    };

    watch(dailyMenuOrder.dailyMenuOrderItems, checkDailyMenuOrderItemsLength);

    const load = () => {
      checkDailyMenuOrderItemsLength();
    };

    Hooks.onBeforeMount(load);

    const createOrder = async () => {
      console.log('createOrder');
      // dailyMenuOrder.value.formValue.validate();
      // if (!validate(userForm, true) || !dailyMenuOrder.value.formValue.validated) {
      //   return;
      // }
      // const loading = ElLoading.service({
      //   lock: true,
      //   text: 'Загрузка',
      // });
      // dailyMenuOrder.value.formValue.clearIds();
      await DailyMenuOrdersStore.Create();
      // ElNotification({
      //   dangerouslyUseHTMLString: true,
      //   message:
      //     '<div />Заказ успешно создан. Для просмотра статуса перейдите в <router-link :to="/profile/education">личный кабинет</router-link></div>',
      //   type: 'success',
      //   duration: 0,
      // });
      // dailyMenuOrder.value.removeFromLocalStore();
      // await Provider.router.push('/bufet');
      // loading.close();
    };

    return {
      userForm,
      UserFormFields,
      createOrder,
      dailyMenuOrder,
      mounted: Provider.mounted,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.container-bufet {
  position: relative;
  width: 100%;
  color: #ffffff;
}

.header {
  display: block;
  position: sticky;
  top: 59px;
  width: 100%;
  z-index: 2;
}

.header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 40px);
  height: 60px;
  background: #205bb8;
  padding: 0 20px;
}

.icon-cart {
  width: 40px;
  height: 40px;
  fill: #d2def1;
  cursor: pointer;
  transition: 0.3s;
}

.icon-cart:hover {
  fill: #ffffff;
}

.header-left {
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 14px;
  color: inherit;
}

input[type='text'] {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  margin: 0 0 0 10px;
  border: none;
  border-radius: 20px;
  outline: none;
  background: #ffffff;
  text-transform: uppercase;
  padding-left: 12px;
  width: 33px;
  color: #205bb8;
}

.header-right {
  display: flex;
  align-items: center;
  justify-content: right;
  position: relative;
}

.sup {
  position: absolute;
  top: -3px;
  right: -8px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #449d7c;
  color: #ffffff;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}

.menu-bufet {
  width: 100%;
  height: 34px;
  background: #379fff;
  display: flex;
  align-items: center;
  justify-content: left;
}

.item {
  height: 34px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  margin: 0 10px;
  color: #343e5c;
}

.active-item {
  display: flex;
  align-items: center;
  white-space: nowrap;
  margin: 0 10px;
  color: #ffffff;
}

.table-main {
  width: calc(100% - 32px);
  display: block;
  padding: 16px;
  height: 100vh;
}

.main > div {
  object-fit: cover;
}

.footer {
  width: calc(100% - 40px);
  padding: 0 20px;
  height: 40px;
  background: #449d7c;
  display: flex;
  align-content: center;
  justify-content: space-between;

  position: sticky;
  bottom: 0px;
  z-index: 2;
}

.footer-info {
  display: flex;
  align-items: center;
  justify-content: right;
}

.add-to-card {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  margin: 0;
  cursor: pointer;
  border: none;
  padding: 0px;
  background: inherit;
  color: #d2def1;
  font-size: 16px;
}

.add-to-card:hover {
  color: #ffffff;
}

.field1 {
  font-size: 10px;
  color: #2754eb;
  margin-right: 20px;
}

.field2 {
  font-size: 16px;
  color: #ffffff;
}

.menu-title {
  font-size: 18px;
  color: #ffffff;
  margin-left: 20px;
}

.bufet {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  margin: 0;
  cursor: pointer;
  color: #d2def1;
  border: none;
  padding: 0px;
  background: inherit;
}

.bufet:hover {
  color: #ffffff;
}

@media screen and (max-width: 768px) {
  .menu-bufet {
    width: 100%;
    height: 34px;
    background: #379fff;
    display: flex;
    align-items: center;
    justify-content: left;
  }

  .container-bufet {
    margin-top: -20px;
  }
}
</style>
