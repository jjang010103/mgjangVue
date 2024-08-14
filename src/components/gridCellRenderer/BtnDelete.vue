<template>
    <button class="btnDelete" @click="btnClickedHandler">삭제</button>
</template>
  
<script>
  export default {
    props: {
      params: Object
    },
    methods: {
      btnClickedHandler() {
        if (this.params.onDelete) {
          this.params.onDelete(this.params.data);
        } else {
          alert('No delete function provided');
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
.btnDelete {
  background-color: maroon;
  border: 0;
  border-radius: 4px;

  &:hover{
    background-color:rgb(148, 20, 20);
    transition: 0.2s ease-out;
  }
}
</style>
  