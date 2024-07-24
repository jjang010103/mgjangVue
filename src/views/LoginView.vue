<script>
import axios from 'axios';
import qs from 'qs';

export default {
  data() {
    return {
      formData: {
        id: '',
        password: '',
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

        console.log("response " + response.data);                                         
      } catch (error) {
        
        console.log(error);   
      }
    }
  }
};
</script>

<template>
    <header>
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg"  width="125" height="125" />
    </header>
    <div class="container">
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
    </div>
</template>

<style lang="scss" scoped>
.logo {
  display: block;
  margin: 0 auto 2rem;
}

form div {
  margin-bottom: 5px;
}

input[type="text"], input[type="password"] {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

button {
  padding: 10px 20px;
  color: white;
  border: none;
  cursor: pointer;
}

@media (min-width: 1024px) {
  input[type="text"], input[type="password"] {
    width: 150%;
  }

  header {
    display: flex;
    align-items: center;
  }

  .logo {
    margin: 0;
  }
}
</style>
