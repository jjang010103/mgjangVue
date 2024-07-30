<template>
  <div class="divGrid">
      <ag-grid-vue
        class="ag-theme-alpine-dark"
        :rowData="rowData"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        @firstDataRendered="onFirstDataRendered"></ag-grid-vue>
    </div>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue3';
import axios from 'axios';
import { getToken } from '@/utils/tokenUtil';
import BtnDelete from "@/components/gridCellRenderer/BtnDelete.vue";

export default {
  name: 'MyGrid',
  components: {
    AgGridVue,
    BtnDelete
  },
  data() {
    return {
      columnDefs: [
        { headerName: "Code", field: "code", hide: true },
        { headerName: "Id", field: "id" },
        { headerName: "Pw", field: "pw", 
          valueFormatter: (params) => {
            return '*'.repeat(params.value.length);
          }},
        { headerName: "E-Mail", field: "email" },
        { headerName: "Phone", field: "phone" },
        { headerName: "Address", field: "address" },
        { headerName: "Created Date", field: "createdDate",
          valueFormatter: (params) => {
            if(params.value == null){
              return '-';
            }
            else{
              const date = new Date(params.value);
              const year = date.getFullYear();
              const month = ('0' + (date.getMonth() + 1)).slice(-2);
              const day = ('0' + date.getDate()).slice(-2);
              const hours = ('0' + date.getHours()).slice(-2);
              const minutes = ('0' + date.getMinutes()).slice(-2);
              return `${year}-${month}-${day} ${hours}:${minutes}`;
            }
          }
         },
        { headerName: "Actions",
          cellRenderer: "BtnDelete"
        }
      ],
      defaultColDef: {
        sortable: true,
        filter: true,
        cellStyle: { textAlign: 'center' }
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
    },
    onFirstDataRendered(params) {
      params.api.sizeColumnsToFit();
    }
  }
};
</script>

<style lang="scss" scoped>

</style>