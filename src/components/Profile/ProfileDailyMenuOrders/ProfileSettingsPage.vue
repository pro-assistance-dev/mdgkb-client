<template>
  <div v-if="mounted" class="size" data-test="profile-settings-component">
    <div class="title">
      <div class="hidden">
        <h2><b>Настройки</b></h2>
      </div>
    </div>
    <div class="card-item">
      <div>
        <el-checkbox v-model="user.rejectEmail">Запретить рассылку email</el-checkbox>
      </div>
      <div>
        <el-button class="save-button" data-test="save-button" @click="saveUser">Сохранить</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, ref } from 'vue';
import { useStore } from 'vuex';

import IFormStatus from '@/interfaces/IFormStatus';
import IUser from '@/services/interfaces/IUser';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'ProfileSettingsPage',
  setup() {
    const mounted = ref(false);
    const store = useStore();
    const userId: ComputedRef<string> = computed(() => store.getters['auth/user']?.id);
    const user: ComputedRef<IUser> = computed(() => store.getters['users/item']);
    const formStatuses: ComputedRef<IFormStatus[]> = computed<IFormStatus[]>(() => store.getters['formStatuses/items']);

    onBeforeMount(async () => {
      await store.dispatch('users/get', userId.value);
      mounted.value = true;
    });

    const saveUser = async () => {
      await store.dispatch('users/update', user.value);
      await Provider.router.push('/profile');
    };

    return {
      mounted,
      user,
      formStatuses,
      saveUser,
    };
  },
});
</script>

<style lang="scss" scoped>
.give-button {
  cursor: pointer;
  display: flex;
  padding: 5px 18px;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 14px;
  border-radius: 5px;
  // border: 1px solid #a3a9be;
  color: #ffffff;
  align-items: center;
  background: #2754eb;
}

.give-button:hover {
  background: #133dcc;
}

h2,
h3 {
  color: #343e5c;
  font-weight: normal;
  margin: 0;
}

.title {
  display: flex;
  position: relative;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
  height: 40px;
  width: 100%;
}

.text-center {
  text-align: center;
  justify-content: center;
}

.card-flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 10px;
}
.card-container {
  height: 350px;
  margin: 0 auto;
}

.loadmore-button {
  display: flex;
  justify-content: center;
}

.card-item {
  border-radius: none;
  border: none;
}

.table-container {
  width: 100%;
  border: 1px solid #dcdfe6;
  border-bottom: none;
  border-radius: 5px 5px 0 0;
  background: #ffffff;
}

table {
  height: auto;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border-bottom: 1px solid #dcdfe6;
  padding: 9px 7px 9px 7px;
  height: auto;
}

th {
  text-align: left;
  padding: 2px 0 0 3px;
  background-color: #eff2f6;
  height: 20px;
}

th:first-child {
  border-radius: 5px 0 0 0;
}

th:last-child {
  border-radius: 0 5px 0 0;
}

tr {
  &:hover {
    background-color: #ecf5ff;
  }
}

.no-progmam {
  display: block;
  color: #b5b5b5;
}

.yes-progmam {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
}

.card-flex-container {
  display: block;
  padding: 0px;
}

h4 {
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 0.1ex;
  margin: 0px;
  font-size: 11px;
  font-weight: normal;
  color: #a3a5b9;
}

.my-block {
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #dcdfe6;
  padding: 20px;
  width: calc(100% - 40px);
}

.sup-cymbol-counter {
  display: flex;
  position: absolute;
  right: -20px;
  top: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #2754eb;
  color: #ffffff;
  align-items: center;
  justify-content: center;
  padding: 1px;
  font-size: 12px;
  font-family: 'Open Sans', sans-serif;
}

.sup-cymbol-attention {
  display: flex;
  position: absolute;
  right: -20px;
  top: -5px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #e62c21;
  color: #ffffff;
  align-items: center;
  justify-content: center;
  padding: 1px;
  font-size: 12px;
  font-family: 'Open Sans', sans-serif;
}

.sup-cymbol-approve {
  display: flex;
  position: absolute;
  right: -20px;
  top: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #44d39e;
  color: #ffffff;
  align-items: center;
  justify-content: center;
  padding: 1px;
  font-size: 12px;
  font-family: 'Open Sans', sans-serif;
}

.box {
  position: relative;
  margin-right: 20px;
}

.table-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.icon-edit {
  display: flex;
  width: 18px;
  height: 18px;
  stroke: #a3a9be;
  fill: none;
  margin-right: 10px;
}

.icon-edit:hover {
  cursor: pointer;
  stroke: #2754eb;
  fill: none;
}

.icon-trash {
  display: flex;
  width: 22px;
  height: 22px;
  stroke: #a3a9be;
  fill: none;
  margin-right: 10px;
}

.icon-trash:hover {
  cursor: pointer;
  stroke: #e62c21;
  fill: none;
}

.give-drop {
  align-content: center;
  display: flex;
}

.give-button {
  display: inline-block;
  align-content: center;
}

.drop-give-button {
  display: none;
  position: absolute;
  top: 40px;
  right: -1px;
  border-radius: 5px;
  border: 1px solid #dfe4ee;
  z-index: 1;
}

.give-button:focus ~ .drop-give-button,
.give-button:active ~ .drop-give-button,
.drop-give-button:hover {
  display: block;
}

.give-button:focus-within {
  stroke: #379fff;
}

button {
  padding: 0;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
  display: flex;
}

.icon-menu {
  width: 28px;
  height: 28px;
  stroke: #343e5c;
  transition: 0.25s;
  padding-right: 7px;
  padding-left: 7px;
  display: flex;
}

.icon-menu:hover {
  stroke: #0671ba;
}

ul {
  margin: 0;
  padding: 0;
}
ul.drop-give-button-item li {
  background: #ffffff;
  border-bottom: 1px solid #dfe4ee;
  list-style: none;
  width: auto;
  padding-right: 10px;
}

ul.drop-give-button-item li a {
  text-decoration: none;
  display: block;
  padding: 5px 5px 5px 15px;
  color: #343e5c;
  transition: color 0.3s ease 0s;
  align-items: center;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 12px;
}

ul.drop-give-button-item li ul {
  display: none;
}

ul.drop-give-button-item li:hover {
  position: relative;
  background: #ecf5ff;
}

ul.drop-give-button-item li:first-child {
  border-radius: 5px 5px 0 0;
}

ul.drop-give-button-item li:last-child {
  border-radius: 0 0 5px 5px;
  border-bottom: none;
}
.status-buttons {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  button {
    img {
      height: 25px;
    }
    margin-bottom: 2px;
    padding: 3px 7px;
    border-radius: 5px;
    font-size: 12px;
    &:hover {
      cursor: pointer;
      filter: brightness(110%);
    }
  }
}
.buttons-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  button,
  svg {
    margin: 3px 0;
  }
}

.size {
  // max-width: 900px;
  padding-right: 20px;
}

.card-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 50px;
  padding: 0 5px;
  width: calc(100% - 10px);
}

.item-el-title {
  padding-top: 5px;
  display: flex;
  margin-right: 20px;
  text-transform: uppercase;
}

.item-el {
  display: flex;
  text-align: left;
  align-items: left;
}

ul.application-card {
  // text-decoration: none;
  list-style-type: none;
}

ul.application-card li {
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  margin-bottom: 30px;
}

.card-title {
  padding: 0 5px;
  background: #eff2f6;
  height: 50px;
  border-radius: 5px 5px 0 0;
}
.card-footer {
  padding: 0 5px;
  display: flex;
  justify-content: right;
  background: #eff2f6;
  height: 50px;
  border-radius: 0 0 5px 5px;
}

.item-el-tag {
  a {
    color: #ffffff;
    font-size: 12px;
    border-radius: 5px;
    background: #006bb4;
    padding: 5px 8px 5px 8px;
  }
}

@media screen and (max-width: 980px) {
  .size {
    padding: 0 10px;
  }
  /*   .table-container {
    display: none;
  }

  .moble-container {
    // padding-right: 20px;
    display: block;
    width: 100%;
  }
  .box {
    margin-right: 0px;
    background: #ffffff;
  }

  .my-block {
    padding: 10px;
    width: calc(100% - 20px);
  }

  .application-card {
    width: 100%;
    min-height: 20px;
  }
  .status-buttons {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    button {
      img {
        height: 25px;
      }
      margin-bottom: 2px;
      margin-left: 15px;
      padding: 3px 7px;
      border-radius: 5px;
      font-size: 12px;
      &:hover {
        cursor: pointer;
        filter: brightness(110%);
      }
    }
  } */

  .card-item {
    justify-content: left;
  }
}

@media screen and (max-width: 560px) {
  .size {
    margin-top: 20px;
  }
  .hidden {
    display: none;
  }
  .title {
    justify-content: right;
  }
}

@media screen and (max-width: 480px) {
  .my-block {
    padding: 5px;
    width: calc(100% - 10px);
  }

  .card-item {
    padding: 0 5px;
    width: calc(100% - 10px);
  }
  .size {
    padding: 0 5px;
  }

  .item-el-title {
    margin-right: 10px;
    min-width: 75px;
  }
}
</style>
