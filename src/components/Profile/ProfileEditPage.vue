<template>
  <div class="title">
    <div class="title-left">
      <h2><b>Мой профиль</b></h2>
      <svg class="icon-arrow-right">
        <use xlink:href="#arrow-right-profile"></use>
      </svg>
      <h2>Редактировать профиль</h2>
    </div>
    <div class="title-right">
      <button class="cancel-button">Отмена</button>
      <button class="save-button">Сохранить</button>
    </div>
  </div>
  <div class="right-block">
    <el-form>
      <div class="line-item">
        <div class="item-block">
          <div class="item-title"><h5>ФАМИЛИЯ&nbsp;*</h5></div>
          <div class="item-data">
            <el-form-item>
              <el-input placeholder="Введите фамилию" minlength="2"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="item-block">
          <div class="item-title"><h5>ИМЯ&nbsp;*</h5></div>
          <div class="item-data">
            <el-form-item>
              <el-input placeholder="Введите имя" minlength="2" />
            </el-form-item>
          </div>
        </div>
        <div class="item-block">
          <div class="item-title"><h5>ОТЧЕСТВО</h5></div>
          <div class="item-data">
            <el-form-item>
              <el-input placeholder="Введите отчество" minlength="2" />
            </el-form-item>
          </div>
        </div>
      </div>

      <div class="line-item">
        <div class="item-block">
          <div class="item-title"><h5>ПОЛ</h5></div>
          <div class="item-data">
            <el-form-item>
              <el-select round>
                <el-option></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="item-block">
          <div class="item-title"><h5>СЕМЕЙНЫЙ&nbsp;СТАТУС</h5></div>
          <div class="item-data">
            <el-form-item>
              <el-select round>
                <el-option></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="item-block">
          <div class="item-title"><h5>ДАТА&nbsp;РОЖДЕНИЯ *</h5></div>
          <div class="item-data">
            <el-form-item>
              <el-date-picker placeholder="Выберите дату"></el-date-picker>
            </el-form-item>
          </div>
        </div>
      </div>

      <div class="line-item">
        <div class="item-block-1">
          <div class="item-title"><h5>ДОКУМЕНТ&nbsp;УДОСТОВЕРЯЮЩИЙ&nbsp;ЛИЧНОСТЬ</h5></div>
          <div class="item-data">
            <el-form-item>
              <el-select round>
                <el-option></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="item-block-2">
          <div class="item-title"><h5>СЕРИЯ</h5></div>
          <div class="item-data">
            <el-form-item>
              <el-input placeholder="Серия" minlength="4" />
            </el-form-item>
          </div>
        </div>
        <div class="item-block-2">
          <div class="item-title"><h5>НОМЕР</h5></div>
          <div class="item-data">
            <el-form-item>
              <el-input placeholder="Номер" minlength="6" />
            </el-form-item>
          </div>
        </div>
        <div class="item-block-3">
          <div class="item-title"><h5>КЕМ&nbsp;ВЫДАН</h5></div>
          <div class="item-data">
            <el-form-item>
              <el-select round>
                <el-option></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
      </div>

      <div class="line-item">
        <div class="item-block-4">
          <div class="item-title"><h5>АДРЕС&nbsp;*</h5></div>
          <div class="item-data">
            <el-form-item>
              <el-input placeholder="Введите адрес" minlength="10" />
            </el-form-item>
          </div>
        </div>
        <div class="item-block-3">
          <div class="item-title"><h5>КОНТАКТНЫЙ&nbsp;ТЕЛЕФОН&nbsp;*</h5></div>
          <div class="item-data">
            <el-form-item>
              <el-input placeholder="Телефон" minlength="10" />
            </el-form-item>
          </div>
        </div>
        <div class="item-block-3">
          <div class="item-title"><h5>ПОЧТА&nbsp;*</h5></div>
          <div class="item-data">
            <el-form-item>
              <el-input placeholder="Почта" minlength="9" />
            </el-form-item>
          </div>
        </div>
      </div>

      <div class="line-item">
        <div class="item-block">
          <div class="item-title"><h5>ЯЗЫК&nbsp;*</h5></div>
          <div class="item-data">
            <el-form-item>
              <el-select round>
                <el-option></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="item-block">
          <div class="item-title"><h5>РЕЛИГИОЗНАЯ&nbsp;ПРИНАДЛЕЖНОСТЬ</h5></div>
          <div class="item-data">
            <el-form-item>
              <el-select round>
                <el-option></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="item-block">
          <div class="item-title"><h5>ЭТНИЧЕСКАЯ&nbsp;ПРИНАДЛЕЖНОСТЬ</h5></div>
          <div class="item-data">
            <el-form-item>
              <el-select round>
                <el-option></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>

    <div class="line-item">
      <div class="item-data">
        <button class="plus-button">
          ДОБАВИТЬ ДОВЕРЕННОЕ ЛИЦО
          <svg class="icon-plus">
            <use xlink:href="#profile-plus"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="line-item">
      <div class="item-data">
        <button class="plus-button-last">
          ДОБАВИТЬ МОЮ КЛИНИКУ
          <svg class="icon-plus">
            <use xlink:href="#profile-plus"></use>
          </svg>
        </button>
      </div>
    </div>
  </div>
  <svg width="0" height="0" class="hidden">
    <symbol id="arrow-right-profile" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M6 15L11 10L6 5L7 3L14 10L7 17L6 15Z"></path>
    </symbol>
    <symbol id="profile-plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M12 6C12.1989 6 12.3897 6.07902 12.5303 6.21967C12.671 6.36032 12.75 6.55109 12.75 6.75V11.25H17.25C17.4489 11.25 17.6397 11.329 17.7803 11.4697C17.921 11.6103 18 11.8011 18 12C18 12.1989 17.921 12.3897 17.7803 12.5303C17.6397 12.671 17.4489 12.75 17.25 12.75H12.75V17.25C12.75 17.4489 12.671 17.6397 12.5303 17.7803C12.3897 17.921 12.1989 18 12 18C11.8011 18 11.6103 17.921 11.4697 17.7803C11.329 17.6397 11.25 17.4489 11.25 17.25V12.75H6.75C6.55109 12.75 6.36032 12.671 6.21967 12.5303C6.07902 12.3897 6 12.1989 6 12C6 11.8011 6.07902 11.6103 6.21967 11.4697C6.36032 11.329 6.55109 11.25 6.75 11.25H11.25V6.75C11.25 6.55109 11.329 6.36032 11.4697 6.21967C11.6103 6.07902 11.8011 6 12 6V6Z"
      ></path>
    </symbol>
  </svg>
  <!-- <el-card v-if="user">
    <template #header><h3 style="text-align: center; margin: 0">Профиль</h3></template>
    <el-form label-width="120px" label-position="left" :model="user">
      <HumanForm :store-module="'users'" />

      <el-form-item prop="email" label="Email">
        <el-input v-model="user.email" placeholder="Email" type="email" />
      </el-form-item>

      <el-form-item prop="password" label="Пароль">
        <el-input v-model="user.password" placeholder="Пароль" type="password" />
      </el-form-item>
    </el-form>
  </el-card> -->
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted, Ref } from 'vue';
import { useStore } from 'vuex';

// import HumanForm from '@/components/admin/HumanForm.vue';
import IUser from '@/interfaces/IUser';

export default defineComponent({
  name: 'ProfileEditPage',
  // components: { HumanForm },
  setup() {
    const store = useStore();

    const userId: ComputedRef<string> = computed(() => store.getters['auth/user']?.id);
    const user: Ref<IUser> = computed(() => store.getters['users/item']);

    const loadUser = async () => {
      await store.dispatch('users/get', userId.value);
    };
    onMounted(loadUser);

    return {
      user,
    };
  },
});
</script>

<style scoped lang="scss">
.title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
  height: 40px;
  width: 880px;
}

h2,
h3 {
  color: #343e5c;
  font-weight: normal;
  margin: 0;
}

h4 {
  margin: 0;
  font-weight: normal;
  font-size: 15px;
}

h5 {
  margin: 0;
  font-weight: normal;
  font-size: 11px;
}

.right-block {
  background: #ffffff;
  border-radius: 5px;
  padding: 20px;
  width: 840px;
}

.item-title {
  display: flex;
  width: 100%;
  color: #a3a9be;
  margin-bottom: 3px;
}

.item-data {
  width: 100%;
  color: #343e5c;
}

.title-left {
  display: flex;
  justify-content: left;
}

.title-right {
  display: flex;
  justify-content: right;
}

.cancel-button {
  display: flex;
  padding: 7px 18px;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 14px;
  border-radius: 40px;
  border: 1px solid #a3a9be;
  color: #a3a9be;
  align-items: center;
  margin-right: 20px;
  background: #efefef;
}

.cancel-button:hover {
  background: #ffffff;
}

.save-button {
  display: flex;
  padding: 7px 18px;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 14px;
  border-radius: 40px;
  background: #2754eb;
  border: none;
  color: #ffffff;
  align-items: center;
}

.save-button:hover {
  background: #133dcc;
}

.icon-arrow-right {
  width: 24px;
  height: 40px;
  fill: #343e5c;
  margin: 0 15px;
}

.line-item {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.item-block {
  width: 31%;
  height: 60px;
  padding-bottom: 15px;
}

:deep(.el-form-item__content) {
  width: 100%;
}

:deep(.el-input__inner) {
  border-radius: 40px;
  padding-left: 25px;
  height: 32px;
  width: 100%;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
}

:deep(.el-input__inner::placeholder) {
  color: #4a4a4a;
}

:deep(.el-select .el-input .el-select__caret) {
  color: #343e5c;
  font-size: 15px;
  font-weight: bold;
  margin-right: 5px;
}

.el-select {
  width: 100%;
}

:deep(.el-input__prefix) {
  left: 230px;
  top: -3px;
}

:deep(.el-date-editor.el-input, .el-date-editor.el-input__inner) {
  width: 100%;
}

:deep(.el-input__icon) {
  color: #343e5c;
}

:deep(.el-input__suffix) {
  top: -3px;
}

.item-block-1 {
  width: 38.5%;
  height: 60px;
  padding-bottom: 15px;
}

.item-block-2 {
  width: 14%;
  height: 60px;
  padding-bottom: 15px;
}

.item-block-3 {
  width: 23%;
  height: 60px;
  padding-bottom: 15px;
}

.item-block-4 {
  width: 47%;
  height: 60px;
  padding-bottom: 15px;
}

.icon-plus {
  position: absolute;
  right: 5px;
  width: 24px;
  height: 24px;
  fill: #44d39e;
}

.plus-button {
  position: sticky;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 9px 10px;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 11px;
  border-radius: 40px;
  border: 1px solid #e1e6ef;
  color: #44d39e;
  align-items: center;
  background: #ffffff;
  margin-top: 5px;
}

.plus-button:hover {
  border: 1px solid #44d39e;
  background: #44d39e;
  color: #ffffff;
}

.plus-button-last {
  position: sticky;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 9px 10px;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 11px;
  border-radius: 40px;
  border: 1px solid #e1e6ef;
  color: #44d39e;
  align-items: center;
  background: #ffffff;
  margin-top: 25px;
}

.plus-button-last:hover {
  border: 1px solid #44d39e;
  background: #44d39e;
  color: #ffffff;
}
</style>
