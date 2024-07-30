<template>
  <div class="divGrid">
      <ag-grid-vue
        class="ag-theme-alpine-dark"
        :rowData="rowData"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        @firstDataRendered="onFirstDataRendered"
        @cellFocused="onCellFocused"></ag-grid-vue>
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
          cellRenderer: "BtnDelete",
          cellRendererParams: {
            onDelete: this.onClickedDelete
          }
        }
      ],
      defaultColDef: {
        sortable: true,
        filter: true,
        cellStyle: { textAlign: 'center' }
      },
      rowData: null,
      pageNum: 1,
      focusedRowId: -1,
      focusedRowIndex: -1,
      agGridApi: null
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
    async deleteAccount(rowId){
      try{
        const response = await axios.delete('/api/account/' + rowId,{
          headers: {
            'Authorization': `Bearer ${getToken()}`
          }
        });

        this.rowData.splice(this.focusedRowIndex, 1);
        this.agGridApi.setRowData(this.rowData);

        alert("Delete completed!");
      }
      catch (err) {
        console.error(err);
      }
    },
    onFirstDataRendered(params) {
      this.agGridApi = params.api;
      this.agGridApi.sizeColumnsToFit();
    },
    onCellFocused(params){
      this.focusedRowIndex = params.rowIndex;
      this.focusedRowId = this.agGridApi.getDisplayedRowAtIndex(this.focusedRowIndex).data['code'];
    },
    onClickedDelete(){
      this.deleteAccount(this.focusedRowId);
    }
  }
};
</script>

<style lang="scss" scoped>

</style>