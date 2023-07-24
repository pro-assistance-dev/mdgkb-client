<template>
  <el-form-item
    v-for="input in inputs.filter((i) => i.condition())"
    :key="input.name"
    :prop="`formValue.user.human.contactInfo.addressInfo.${input.name}`"
    :label="input.label"
    :rules="input.rule"
  >
    <el-autocomplete
      v-model="input.model"
      autocomplete="nope"
      filterable
      remote
      reserve-keyword
      :placeholder="input.label"
      :fetch-suggestions="(e, cb) => search(e, cb, input)"
      :trigger-on-focus="false"
      @select="(e) => setAddress(e, input)"
    />
  </el-form-item>
  <el-form-item v-if="addressInfo.zip !== 0" label="Почтовый индекс">
    {{ addressInfo.zip }}
  </el-form-item>
  <!--  <el-form-item v-if="addressInfo.building !== ''" label="Строение">-->
  <!--    {{i}}-->
  <!--  </el-form-item>-->
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType, Ref, ref } from 'vue';

import Address from '@/classes/Address';
import AddressInfo from '@/classes/AddressInfo';
import KladrApi from '@/classes/KladrApi';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'AddressInfoForm',
  // components: { DatePicker },
  props: {
    addressInfo: {
      type: Object as PropType<AddressInfo>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const regionSearchString: Ref<string> = ref('');
    const citySearchString: Ref<string> = ref('');
    const addresses: ComputedRef<Address[]> = computed(() => Provider.store.getters[`meta/addresses`]);
    const kladrAPI: ComputedRef<KladrApi> = computed(() => Provider.store.getters[`meta/kladrAPI`]);

    const rules = {
      region: [{ required: true, message: 'Пожалуйста, укажите регион', trigger: 'change' }],
      city: [{ required: true, message: 'Пожалуйста, укажите населённый пункт', trigger: 'change' }],
      street: [{ required: true, message: 'Пожалуйста, укажите улицу', trigger: 'change' }],
      building: [{ required: true, message: 'Пожалуйста, укажите дом', trigger: 'change' }],
    };

    const inputs = ref([
      {
        name: 'region',
        model: computed({
          get(): string {
            return props.addressInfo.region;
          },
          set(value): void {
            props.addressInfo.setRegion(value);
          },
        }),
        condition: (): boolean => true,
        label: 'Регион',
        setAddressFunc: props.addressInfo.selectRegion.bind(props.addressInfo),
        dropAddressFunc: props.addressInfo.dropRegion.bind(props.addressInfo),
        apiFunc: kladrAPI.value.setRegionId.bind(kladrAPI.value),
        apiDropFunc: kladrAPI.value.dropRegion.bind(kladrAPI.value),
        rule: rules.region,
      },
      {
        name: 'city',
        model: computed({
          get(): string {
            return props.addressInfo.city;
          },
          set(value): void {
            props.addressInfo.setCity(value);
          },
        }),
        condition: () => props.addressInfo.regionId !== '',
        label: 'Населённый пункт',
        setAddressFunc: props.addressInfo.selectCity.bind(props.addressInfo),
        dropAddressFunc: props.addressInfo.dropCity.bind(props.addressInfo),
        apiFunc: kladrAPI.value.setCityId.bind(kladrAPI.value),
        apiDropFunc: kladrAPI.value.dropCity.bind(kladrAPI.value),
        rule: rules.city,
      },
      {
        name: 'street',
        model: computed({
          get(): string {
            return props.addressInfo.street;
          },
          set(value): void {
            props.addressInfo.setStreet(value);
          },
        }),
        condition: () => props.addressInfo.cityId !== '',
        label: 'Улица',
        setAddressFunc: props.addressInfo.selectStreet.bind(props.addressInfo),
        dropAddressFunc: props.addressInfo.dropStreet.bind(props.addressInfo),
        apiFunc: kladrAPI.value.setStreetId.bind(kladrAPI.value),
        apiDropFunc: kladrAPI.value.dropStreet.bind(kladrAPI.value),
        rule: rules.street,
      },
      {
        name: 'building',
        model: computed({
          get(): string {
            return props.addressInfo.building;
          },
          set(value): void {
            props.addressInfo.setBuilding(value);
          },
        }),
        condition: () => props.addressInfo.streetId !== '',
        label: 'Дом',
        setAddressFunc: props.addressInfo.selectBuilding.bind(props.addressInfo),
        dropAddressFunc: () => undefined,
        apiFunc: kladrAPI.value.setBuildingId.bind(kladrAPI.value),
        apiDropFunc: () => undefined,
        rule: rules.building,
      },
      {
        name: 'flat',
        model: computed({
          get(): string {
            return props.addressInfo.flat;
          },
          set(value): void {
            props.addressInfo.setFlat(value);
          },
        }),
        condition: () => props.addressInfo.buildingId !== '',
        label: 'Номер квартиры',
        setAddressFunc: props.addressInfo.selectFlat.bind(props.addressInfo),
        dropAddressFunc: () => undefined,
        apiFunc: () => undefined,
        apiDropFunc: () => undefined,
        rule: '',
      },
    ]);

    const dropAddresses = () => {
      Provider.store.commit('meta/setAddresses');
    };

    const setAddress = async (e: { value: string; label: Address }, input: any) => {
      input.setAddressFunc(e.label.getFullName(), e.label.id, e.label.zip);
      input.apiFunc(e.label.id);
      dropAddresses();
    };

    const search = async (query: string, cb: (arg: any) => void, input: any) => {
      input.apiDropFunc();
      kladrAPI.value.query = query;
      await Provider.store.dispatch('meta/getAddress');
      const options = addresses.value.map((opt: Address) => {
        return { label: opt, value: opt.getFullName() };
      });
      cb(options);
    };

    return {
      setAddress,
      inputs,
      citySearchString,
      regionSearchString,
      search,
      addresses,
      kladrAPI,
    };
  },
});
</script>

<style lang="scss" scoped>
.error-block-message {
  font-size: 14px;
  // max-width: 350px;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  color: #f56c6c;
  border: 1px solid #f56c6c;
  background-color: lighten(#f56c6c, 25%);
}
:deep(.el-form-item__content) {
  min-width: 200px;
}
:deep(.el-form-item__label) {
  margin-left: 10px;
  // line-height: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>
