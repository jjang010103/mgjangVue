<template>
  <main>
    <div class="logo">
        <img alt="Vue logo" src="@/assets/logo.svg" width="135" height="135" />
    </div>
    <form @submit.prevent="login">
      <div>
          <input type="text" placeholder="ID" v-model="formData.id" required/>
      </div>
      <div>
          <input type="password" placeholder="PW" v-model="formData.password" required/>
      </div>
      <div>
          <input type="checkbox" id="autoLogin" v-model="formData.autoLogin"/>
          <label for="autoLogin">자동로그인</label>
      </div>
      <button class="green" type="submit">로그인</button>
    </form>
  </main>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

export default {
data() {
  return {
    formData: {
      id: null,
      password: null,
      autoLogin: false
    }
  };
},
methods: {
  async login() {
    try {
      const response = await axios.post('/api/auth', 
        qs.stringify({
          id: this.formData.id,
          pw: this.formData.password
        }));

      if(response.data == null){
        
      }
      else{
        if(this.formData.autoLogin) localStorage.setItem('tkn', response.data);
        else sessionStorage.setItem('tkn', response.data);

        this.$router.push('/user');
      }
    } catch (error) {

      console.log(error);   
    }
  }
}
};
</script>

<style lang="scss" scoped>
.logo {
  text-align: center;
  margin-bottom: 2rem;
}

form div {
margin-bottom: 6px;
}

input[type="text"], input[type="password"] {
width: 100%;
padding: 10px;
box-sizing: border-box;
}

.green {
text-decoration: none;
background-color: hsla(160, 100%, 37%, 1);
transition: 0.4s;
padding: 10px 20px;
color: white;
border: none;
cursor: pointer;
}

@media (min-width: 1024px) {
  main {
    grid-column: span 2;
    display: grid;
    grid-template-columns: 3fr 7fr;
    align-items: center;
    margin: 0 auto;
    width: 25vw;
    height: 90vh;
  }

  .logo {
    margin-right: 2rem;
    margin-top: 2rem;
  }
}
</style>
