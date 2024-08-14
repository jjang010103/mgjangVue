<template>
  <div class="divMain">
    <transition name="fade">
      <div v-if="visiblePopMsgBox" class="divPopMsgBox" ref="msgBoxPopup">{{ popupMessage }}</div>
    </transition>
    <button class="btnTopMenu" @click="showAddUserForm">추가</button>
    <div class="divGrid">
      <ag-grid-vue
        class="ag-theme-alpine-dark"
        :rowData="rowData"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        @firstDataRendered="onFirstDataRendered"
        @cellFocused="onCellFocused"
        @cellEditingStopped="onCellEditingStopped"></ag-grid-vue>
    </div>
    <FormUserAdd v-if="visibleAddUserForm"/>
  </div>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue3';
import axios from 'axios';
import { getToken } from '@/utils/tokenUtil';
import BtnDelete from "@/components/gridCellRenderer/BtnDelete.vue";
import FormUserAdd from "@/components/user/FormAddUser.vue";

export default {
  components: {
    AgGridVue,
    BtnDelete,
    FormUserAdd
  },
  data() {
    return {
      columnDefs: [
        { headerName: "Code", field: "code", hide: true },
        { headerName: "Id", field: "id" },
        { headerName: "Password", field: "pw", editable: true, 
          valueFormatter: (params) => {
            return '*'.repeat(params.value.length);
          }},
        { headerName: "E-Mail", field: "email", editable: true },
        { headerName: "Phone", field: "phone", editable: true },
        { headerName: "Address", field: "address", editable: true },
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
        { headerName: "Action",
          cellRenderer: "BtnDelete",
          filter: false,
          sortable: false,
          cellRendererParams: {
            onDelete: this.clickedDelete
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
      focusedRowData: null,
      focusedRowIndex: -1,
      agGridApi: null,
      visiblePopMsgBox: false,
      msgUpdate: 'Updated!',
      msgDelete: 'Deleted!',
      popupMessage: '',
      visibleAddUserForm: false
    };
  },
  mounted() {
    this.getAccounts();
    window.addEventListener('resize', this.onResize);
  },
  beforeUnmount(){
    window.removeEventListener('resize', this.onResize);
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
        const response = await axios.delete('/api/account/' + rowId, 
        {
          headers: {
            'Authorization': `Bearer ${getToken()}`
          }
        });

        this.rowData.splice(this.focusedRowIndex, 1);
        this.agGridApi.setRowData(this.rowData);
      }
      catch (err) {
        console.error(err);
      }
    },
    async updateAccount(rowId){
      try{
        const response = await axios.put('/api/account', 
        this.getFocusedRowData(rowId),
        {
          headers: {
            'Authorization': `Bearer ${getToken()}`
          }
        });
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
      this.focusedRowData = this.getFocusedRowData(this.focusedRowIndex);
    },
    onCellEditingStopped(params){
      if (params.oldValue !== params.newValue) {
        this.updateAccount(params.node.rowIndex);//onCellFocused 시점이 더 빨라서 엉뚱한 focusedRowIndex가 잡힘
        this.showPopMsgBox(this.msgUpdate);
      }
    },
    onResize(){
      if(this.agGridApi) {
        this.agGridApi.sizeColumnsToFit();
      }
    },
    clickedDelete(){
      this.deleteAccount(this.focusedRowData.code);
      this.showPopMsgBox(this.msgDelete);
    },
    getFocusedRowData(rowIndex){
      return this.agGridApi.getDisplayedRowAtIndex(rowIndex).data;
    },
    showPopMsgBox(msg){
      this.popupMessage = msg;

      this.visiblePopMsgBox = true;

      setTimeout(() => {
        this.visiblePopMsgBox = false;
      }, 750);
    },
    showAddUserForm(){
      this.visibleAddUserForm = true;
    }
  }
};
</script>

<style lang="scss" scoped>

</style>