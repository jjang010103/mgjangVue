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
import axios from 'axios';
import qs from 'qs';
import { getToken } from '@/utils/tokenUtil';

export default {
  name: 'MyGrid',
  components: {
    AgGridVue
  },
  data() {
    return {
      columnDefs: [
        { headerName: "Code", field: "code", hide: true },
        { headerName: "Id", field: "id" },
        { headerName: "Pw", field: "pw" },
        { headerName: "E-Mail", field: "email" },
        { headerName: "Phone", field: "phone" },
        { headerName: "Address", field: "address" },
        { headerName: "Created Date", field: "createdDate" }
      ],
      defaultColDef: {
        sortable: true,
        filter: true
      },
      rowData: null,
      pageNum: 1
    };
  },
  mounted() {
    this.getAccounts();
  },
  methods:{
    async getAccounts() {
      try{
        const response = await axios.get('/api/account',
        {
          params: {
            pageSize: 10,
            pageNum: this.pageNum
          },
          headers: {
            'Authorization': `Bearer ${getToken()}`
          }
        });

        this.rowData = response.data.data.list;
      }
      catch (err) {
        console.error(err);
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>