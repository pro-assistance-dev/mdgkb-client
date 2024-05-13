<template>
  <div v-if="!entityName || entityName.length === 0" class="search-line">
    <div class="search-label">{{ label }}</div>
    <RemoteSearch :key-value="searchKey" :max-width="2000" @select="(e) => $emit('selectSearch', e)" />
  </div>
  <div v-else class="container">
    <button class="admin-del" @click.prevent="$emit('reset')">Удалить</button>
    <div class="name" @click="Provider.routerPushBlank(link)">
      {{ entityName }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import RemoteSearch from '@/components/RemoteSearch.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'SetEntity',
  components: { RemoteSearch },
  emits: ['selectSearch', 'reset'],
  props: {
    link: { type: String as PropType<string>, required: true },
    searchKey: { type: String as PropType<string>, required: true },
    label: { type: String as PropType<string>, dafault: 'Выберите сотрудника для добавления:' },
    entityName: { type: String as PropType<string>, required: true },
  },
  setup() {
    return {
      Provider,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
$margin: 20px 0;

.name {
  &:hover {
    cursor: pointer;
  }
}
.container {
  position: relative;
  width: calc(100% - 20px);
  margin: 10px 0px 10px 0px;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
  padding: 12px 10px;
  background: #f9fafb;
}

.search-line {
  display: block;
  align-items: center;
  justify-content: left;
}

.search-label {
  font-size: 12px;
  color: $base-light-font-color;
  padding: 0 !important;
  text-transform: uppercase;
  margin-left: 5px;
}

.admin-del {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 36px;
  border: none;
  background: inherit;
  color: $base-light-font-color;
  transition: 0.3s;
  cursor: pointer;
}

.admin-del:hover {
  color: darken($color: #cf3d19, $amount: 5%);
}

.admin-del:hover {
  color: darken($color: #cf3d19, $amount: 5%);
}

@media screen and (max-width: 400px) {
  .container {
    width: calc(100% - 22px);
    margin: 0px 0px 20px 0px;
  }
}
</style>
