<template>
  <div class="card-flex-container card-item">
    <div class="table-container">
      <table class="table-list">
        <colgroup>
          <col width="50%" />
          <col width="40%" />
          <col width="10%" />
        </colgroup>
        <thead>
          <th><h4>НАЗВАНИЕ ДОКУМЕНТА</h4></th>
          <th><h4>НАЗНАЧЕНИЕ</h4></th>
          <th><h4>ДЕЙСТВИЕ</h4></th>
        </thead>
        <tbody>
          <tr v-for="document in documents" :key="document.id">
            <td>
              {{ document.name }}
            </td>
            <td>ДПО</td>
            <td>
              <a :href="document.documentsScans[0]?.scan.getFileUrl()" target="_blank"> Скачать </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: 'DocumentsList',
  props: {
    documents: {
      type: Array as PropType<Document[]>,
      required: false,
      default: () => [],
    },
  },
  setup() {
    const mounted = ref(false);

    return {
      mounted,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/doctor-info-card.scss';

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
  width: 100%;
  border-radius: none;
  border-bottom: none;
}

.table-container {
  width: 100%;
  // overflow: scroll;
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
  // border-right: 1px solid #f2f2f2;
  height: 20px;
}

// th:last-child {
//   border-right: 1px solid #dcdfe6;
// }

// tr:nth-child(odd) {
//   background-color: #f2f2f2;
// }

tr {
  &:hover {
    background-color: #ecf5ff;
  }
}

.no-progmam {
  display: block;
  color: #b5b5b5;
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
</style>
