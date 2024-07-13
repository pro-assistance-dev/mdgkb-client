<template>
  <div v-html="content" />
</template>

<script setup lang="ts">
defineProps({
  content: {
    type: String,
    default: '',
  },
});
</script>
<style lang="scss">
.editor-table {
  height: auto;
  border-collapse: collapse;
  width: 100%;
  border: 1px solid black;

  th {
    border-bottom: 1px solid #dcdfe6;
    text-align: left;
    background-color: #eff2f6;
    height: 20px;
    font-family: 'Open Sans', sans-serif;
    letter-spacing: 0.1ex;
    margin: 0px;
    font-size: 11px;
    font-weight: normal;
    color: #a3a5b9;
  }

  td {
    border-bottom: 1px solid #dcdfe6;
    padding: 9px 7px 9px 7px;
    height: auto;
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
}
</style>
