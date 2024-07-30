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
        alert(`Button clicked: ${this.params.value}`);
      }
    }
  };
</script>

<style lang="scss" scoped>
.btnDelete {
  background-color: maroon;
  
}
</style>
  