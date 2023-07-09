<template>
  <CollapseContainer>
    <template #default="scope">
      <CollapseItem
        v-for="residencyApplication in user.residencyApplications"
        :key="residencyApplication.id"
        :title="`${residencyApplication.residencyCourse.getFullName()}`"
        :tab-id="residencyApplication.id"
        :collapsed="false"
        :active-id="scope.activeId"
        :show-tools-on-hover="false"
      >
        <template #tools>
          <div class="order-date" style="margin-right: 5px">
            {{ $dateTimeFormatter.format(residencyApplication.formValue.createdAt, { day: '2-digit', month: 'long', year: 'numeric' }) }}
          </div>
          <el-tag
            v-if="residencyApplication.formValue.formStatus.label"
            size="small"
            :style="`background-color: inherit; color: ${residencyApplication.formValue.formStatus.color}; border-color: ${residencyApplication.formValue.formStatus.color}`"
            >{{ residencyApplication.formValue.formStatus.label }}</el-tag
          >
        </template>
        <template #inside-content>
          <div class="margin-container">
            <div class="position">
              <div class="flex">
                <Button
                  v-for="item in residencyApplication.formValue.getUserActions()"
                  :key="item.id"
                  :text="item.childFormStatus.userActionName"
                  :color="item.childFormStatus.color"
                  :margin-right="'10px'"
                  width="120px"
                  height="36px"
                  font-size="14px"
                  @click="updateFormStatus(residencyApplication, item.childFormStatus)"
                />
              </div>
            </div>

            <div class="card-container">
              <router-link to="/residency?mode=programs"> Программы ординатуры </router-link>
            </div>
          </div>
        </template>
      </CollapseItem>
    </template>
  </CollapseContainer>
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, onBeforeUnmount } from 'vue';

import ResidencyApplication from '@/classes/ResidencyApplication';
import User from '@/classes/User';
import Button from '@/components/Base/Button.vue';
import CollapseContainer from '@/components/Main/Collapse/CollapseContainer.vue';
import CollapseItem from '@/components/Main/Collapse/CollapseItem.vue';
import IForm from '@/interfaces/IForm';
import IFormStatus from '@/interfaces/IFormStatus';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'ProfileResidencyApplicationsCards',
  components: {
    CollapseContainer,
    CollapseItem,
    Button,
  },
  setup() {
    const user: ComputedRef<User> = computed(() => Provider.store.getters['users/item']);
    const formStatuses: ComputedRef<IFormStatus[]> = computed<IFormStatus[]>(() => Provider.store.getters['formStatuses/items']);
    const cancelApplication = async (formValue: IForm, status: IFormStatus) => {
      ElMessageBox.confirm('Вы уверены, что хотите отменить заказ?', {
        confirmButtonText: 'Да',
        cancelButtonText: 'Отмена',
        type: 'warning',
      }).then(() => {
        formValue.setStatus(status, formStatuses.value);
        Provider.store.dispatch('formValues/update', formValue);
      });
    };

    const updateFormStatus = async (application: ResidencyApplication, status: IFormStatus) => {
      if (status.isCancelled()) {
        await cancelApplication(application.formValue, status);
        return;
      }
      if (status.isClarified()) {
        await Provider.router.push(`/profile/residency-applications/${application.id}`);
        return;
      }
      if (status.isEditable) {
        application.formValue.setStatus(status, formStatuses.value);
      }
      await Provider.store.dispatch('formValues/update', application.formValue);
    };

    onBeforeMount(async () => {
      await Provider.store.dispatch('formStatuses/getAll');
    });

    onBeforeUnmount(async () => {
      user.value.setResidencyApplicationsViewed();
      await Provider.store.dispatch('formValues/updateMany', user.value.getResidencyApplicationsFormValues());
    });

    return {
      user,
      updateFormStatus,
    };
  },
});
</script>

<style lang="scss" scoped>
.main-component {
  position: relative;
}

.line-title {
  width: 100%;
  margin-top: 16px;
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  letter-spacing: 1px;
  color: #343e5c;
}

.item {
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 1px;
  font-weight: normal;
  margin-top: 10px;
}

.price {
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 1px;
  font-weight: bold;
  margin-top: 10px;
}

.line-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.price-block {
  display: block;
}

.price-pc {
  font-size: 18px;
  width: 60px;
}

.name {
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 14px;
  color: #343e5c;
  margin-right: 10px;
}

.small-title {
  display: flex;
  align-items: center;
  justify-content: left;
  width: 100%;
  height: 20px;
  color: #a1a7bd;
  font-size: 11px;
  letter-spacing: 1px;
}

.quantity {
  display: flex;
  align-items: center;
  justify-content: right;
  width: 100%;
  height: 12px;
  color: #a1a7bd;
  font-size: 11px;
  letter-spacing: 1px;
  white-space: nowrap;
}

.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}

.image-box {
  display: block;
  width: 50px;
  height: 50px;
  overflow: hidden;
  margin: 5px;
  position: relative;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
}

.left {
  display: flex;
  min-width: 50%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.order-date {
  font-weight: normal;
  margin-left: 5px;
}

.margin-container {
  padding: 10px;
}

.scroll {
  width: 100%;
  max-height: 50vh;
  overflow: hidden;
  overflow-y: auto;
}

.position {
  display: flex;
  align-items: center;
  justify-content: right;
  width: 100%;
  margin-bottom: 10px;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: right;
  width: auto;
}

.total-price {
  font-size: 18px;
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 1px;
  font-weight: bold;
  margin-top: 16px;
}

.price-pc {
  display: flex;
  justify-content: right;
  align-items: center;
  font-size: 14px;
  width: auto;
  font-weight: bold;
}

.menu-shadow {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 960px) {
  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-top: 0px;
  }

  .line-title {
    margin-top: 0px;
  }

  .total-price {
    margin-top: 0px;
  }

  .order-date {
    display: none;
  }
}

@media screen and (max-width: 540px) {
  .margin-container {
    padding: 10px 5px;
  }
  .flex {
    margin-top: 0px;
  }

  .price-pc {
    display: flex;
    justify-content: right;
    align-items: center;
    font-size: 14px;
    width: auto;
    font-weight: bold;
  }
}

.card-container {
  background-color: #f9fafb;
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  padding: 16px;
}
</style>
