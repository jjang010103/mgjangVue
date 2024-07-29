<template>
  <div class="divGrid">
      <ag-grid-vue
        class="ag-theme-alpine-dark"
        :rowData="rowData"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"></ag-grid-vue>
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

</style>