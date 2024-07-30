<template>
  <main>
    <div  v-if="showHeader">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg"  width="42" height="42" />
      <nav>
        <RouterLink to="/user">사용자 관리</RouterLink>
        <RouterLink to="/product">제품 관리</RouterLink>
        <RouterLink to="/order">주문 관리</RouterLink>
        <RouterLink to="/" @click.prevent="logout">로그아웃</RouterLink>
      </nav>
    </div>
    <RouterView/>
  </main>
</template>

<script>
export default {
  data(){
    return {
      showHeader: true
    };
  },
  watch: {
    $route(to){
      this.showHeader = to.path !== '/';
    }
  },
  created() {
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus(){
      var token = localStorage.getItem('tkn');

      if(token != null) this.$router.push('/user');
    },
    logout() {
      localStorage.removeItem('tkn');
      sessionStorage.removeItem('tkn');
    }
  }
}
</script>

<style lang="scss" scoped>
  nav {
  border-left: 1px solid var(--color-border);
  }

  nav a {
    font-size: 1.25rem;
    display: block;
    padding: 0.5rem 1.5rem;
    text-align: center;
    text-decoration: none;
    color: hsla(160, 100%, 37%, 1);
    transition: 0.4s;
  }

  nav a.router-link-exact-active {
    background-color: rgb(0, 189, 126, 0.2);
    color: white;  
  }

  nav a.router-link-exact-active:hover {
    background-color: transparent;
  }

  nav a:last-of-type {
    background-color: rgb(52, 73, 94, 0.2);
  }

  @media (min-width: 1024px) {
  main {
    display: grid;
    grid-template-columns: 2fr 8fr;
    padding: 2rem;
    }
  }

</style>
