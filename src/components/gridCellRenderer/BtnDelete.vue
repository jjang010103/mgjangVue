<template>
    <button class="btnDelete" @click="btnClickedHandler">Delete</button>
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
}
</style>
  