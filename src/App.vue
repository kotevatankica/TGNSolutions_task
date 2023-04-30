<script>
</script>
<template>
  <div class="app">
    <div class="nav">
      <router-link :to="{ name: 'Home' }"><i class="fa fa-home" aria-hidden="true"></i>
      </router-link>
      <router-link :to="{ name: 'ProductsList' }">Products</router-link>
      <router-link :to="{ name: 'InvoicesList' }">Invoices</router-link>
    </div>
    <router-view />
    <div class="footer">
      Powered by: Tankica Koteva
      <a href="https://www.linkedin.com/in/kotevatankica/" target="_blank"> <i class="fa fa-linkedin-square"
          aria-hidden="true"></i></a>

      <a href="https://github.com/kotevatankica" target="_blank" rel="noopener noreferrer"> <i class="fa fa-github"
          aria-hidden="true"></i>
      </a>


    </div>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.nav {
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #192633bf;
  display: flex;
  padding: 23px;
  width: 100%;
  border-bottom: 0.5rem solid #cc2944;
}

.nav a {
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  margin: 0 auto;
  padding: 7px 14px;
  border-radius: 5px;
  box-sizing: border-box;
  border: none;
  border-bottom: 2px solid;
}

.nav a:hover {
  background-color: #cc2944;
}

.router-link-exact-active {
  background-color: #cc2944;
}

.footer {
  margin-top: auto;
  background-color: #192633;
  color: white;
  padding: 1.3rem;
  text-align: center;
  font-size: 18px;
  border-top: 1px solid #cc2944;

}

.footer a {
  margin: 10px;
}
</style>
