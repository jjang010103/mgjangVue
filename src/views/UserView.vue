<template>
  <div class="ag-theme-alpine" style="height: 500px; width: 600px;">
    <ag-grid-vue
      class="ag-theme-alpine"
      :rowData="rowData"
      :columnDefs="columnDefs"
      :defaultColDef="defaultColDef"
    ></ag-grid-vue>
  </div>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue3';

export default {
  name: 'MyGrid',
  components: {
    AgGridVue
  },
  data() {
    return {
      columnDefs: [
        { headerName: "Make", field: "make" },
        { headerName: "Model", field: "model" },
        { headerName: "Price", field: "price" }
      ],
      rowData: [
        { make: "Toyota", model: "Celica", price: 35000 },
        { make: "Ford", model: "Mondeo", price: 32000 },
        { make: "Porsche", model: "Boxster", price: 72000 }
      ],
      defaultColDef: {
        sortable: true,
        filter: true
      }
    };
  }
};
</script>

<style lang="scss" scoped>
  /* AG Grid 테마를 사용하기 위한 스타일 */
  .ag-theme-alpine {
    height: 100%;
    width: 100%;
  }
</style>