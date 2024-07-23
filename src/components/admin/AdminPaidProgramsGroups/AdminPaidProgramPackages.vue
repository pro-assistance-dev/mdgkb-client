<template>
  <el-card header="Пакет">
    <template #header>
      <span>Пакет</span>
      <el-button v-if="paidPackage.id" type="danger" icon="el-icon-delete" @click="removePackage(paidPackage.id)"></el-button>
      <el-button v-else type="success" icon="el-icon-plus" @click="paidProgram.addPackage()">Создать пакет</el-button>
    </template>
    <div v-if="paidPackage.id">
      <div>
        <span>Цена: </span>
        <el-input-number v-model="paidPackage.price"></el-input-number>
        <span> Рублей</span>
      </div>

      <draggable class="groups" :list="paidPackage.paidProgramServicesGroups" item-key="id" handle=".handle" @end="sortGroups">
        <template #item="{ element, index }">
          <div class="group">
            <el-icon class="handle"><Grid /></el-icon>
            <div class="card-header">
              <el-input v-model="element.name" class="title article-title"></el-input>
              <el-button type="danger" icon="el-icon-delete" @click.stop="paidPackage.removeServicesGroup(index)"></el-button>
              <el-button :type="element.home ? 'success' : ''" icon="el-icon-home-filled" @click.stop="element.home = !element.home"
                >Дома</el-button
              >
              <el-button icon="el-icon--home-filled" @click="addToAllPackages(element, index)">Добавить во все пакеты</el-button>
            </div>

            <!-- <draggable handle=".handle" :list="element.paidProgramServices" item-key="id" @end="sortServices(element)"> -->
            <!--   <template #item="{ element }"> -->
            <!--     <div class="card-header"> -->
            <!--       <el-icon class="handle"><Grid /></el-icon> -->
            <!--       <el-input v-model="element.name" /> -->
            <!--       <el-input v-model="element.quantity" /> -->
            <!--       <el-button type="danger" icon="el-icon-delete" @click.stop="element.removePaidProgramService(j)"></el-button> -->
            <!--     </div> -->
            <!--   </template> -->
            <!-- </draggable> -->
            <el-button type="success" size="mini" icon="el-icon-plus" @click="element.addPaidProgramService()"></el-button>
          </div>
        </template>
      </draggable>

      <el-card>
        <el-button @click="paidPackage.addServicesGroup()"> Добавить группу услуг </el-button>
      </el-card>
    </div>
  </el-card>
</template>

<script lang="ts">
import { Grid } from '@element-plus/icons-vue';
import { defineComponent, Ref, ref } from 'vue';
import draggable from 'vuedraggable';

import IPaidProgram from '@/interfaces/IPaidProgram';
import IPaidProgramPackage from '@/interfaces/IPaidProgramPackage';
import IPaidProgramService from '@/interfaces/IPaidProgramService';
import IPaidProgramServicesGroup from '@/interfaces/IPaidProgramServicesGroup';
export default defineComponent({
  name: 'AdminPaidProgramPackages',
  components: { draggable, Grid },
  setup() {
    const mounted: Ref<boolean> = ref(false);
    const form = ref();
    const paidPackage: IPaidProgramPackage = PaidProgramsStore.Item().getSelectedPackage();

    const paidProgram: IPaidProgram = PaidProgramsStore.Item();

    const addToAllPackages = async (group: IPaidProgramServicesGroup, i: number) => {
      PaidProgramsStore.Item().addGroupToAllPackages(group, i);
    };

    const removePackage = async (id: string) => {
      const program = PaidProgramsStore.Item();
      const index = program.paidProgramPackages.findIndex((group) => group.id === id);
      if (index > -1) {
        program.paidProgramPackagesForDelete.push(program.paidProgramPackages[index].id as string);
      }
      program.paidProgramPackages.splice(index, 1);
    };

    const sortServices = (group: IPaidProgramServicesGroup): void => {
      group.paidProgramServices.forEach((service: IPaidProgramService, i: number) => (service.order = i));
    };

    const sortGroups = (): void => {
      paidPackage.paidProgramServicesGroups.forEach((group: IPaidProgramServicesGroup, i: number) => (group.order = i));
    };

    return {
      paidProgram,
      removePackage,
      sortGroups,
      sortServices,
      addToAllPackages,
      mounted,
      paidPackage,
      form,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.group-header {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.el-card {
  margin-bottom: 20px;
}
:deep(.el-card__body) {
  font-size: 14px;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
.groups {
  display: flex;
  flex-wrap: wrap;
}

.group {
  margin: 10px;
  padding: 10px;
  border: black 2px solid;
}

.card-header {
  display: flex;
}

.handle {
  &:hover {
    cursor: grabbing;
  }
}
</style>
