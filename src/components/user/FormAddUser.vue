<template>
  <div class="divForm">
    <form>
        <table>
          <tr>
            <td>Id</td>
            <td><input /></td>
          </tr>
          <tr>
            <td>Password</td>
            <td><input /></td>
          </tr>
          <tr>
            <td>E-Mail</td>
            <td><input /></td>
          </tr>
          <tr>
            <td>Phone</td>
            <td><input /></td>
          </tr>
          <tr>
            <td>Address</td>
            <td><input /></td>
          </tr>
          <tr>
            <td colspan="2">
              <input class="btnAction" type="submit" value="저장"/>
              <input class="btnAction" type="button" value="취소"/>
            </td>
          </tr>
        </table>
      </form>
  </div>
</template>
  
<script>
  export default {
    props: {
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  .divForm{
    width: fit-content;
    height: fit-content;
    background-color: rgb(34, 38, 40);
    border: 2px solid rgb(44, 48, 50);
    box-shadow: 6px 6px 6px rgba(83, 85, 87, 0.2);
    padding: 1%;
    margin: 0 auto;
    border-radius: 8px;

    &:active{
      background-color:rgb(72, 93, 114);
      transition: 0.5s ease-out;
    }
  }

  .btnAction {
    text-align: right;
  }
</style>
  