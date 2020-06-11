<template>
  <div id="app">

<!--    <img alt="Vue logo" src="./assets/logo.png">-->
<!--    <BookList />-->
<!--    <ShoppingCart />-->
      <router-link to="/" exact>Home</router-link>
      <router-link v-if="loggedIn" to="/logout">Logout</router-link>
      <router-link v-else to="/login" exact>Login</router-link>
      <router-link to="/posts">Posts</router-link>
      <router-link to="/posts/new" exact>New Post</router-link>
      <router-view></router-view>
  </div>
</template>

<script>
// import BookList from '@/components/BookList'
// import ShoppingCart from '@/components/ShoppingCart'


import {Auth} from "./api/post";

export default {
  name: 'App',
    data() {
      return {
          loggedIn: Auth.loggedIn()
      }
    },
    created() {
      Auth.onChange = loggedIn => {
        console.log('onchange', loggedIn)
        this.loggedIn = loggedIn
      }
    },
  components: {
    // BookList,
    // ShoppingCart
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.router-link-active {
    color: white;
    background-color: red;
}

.router-link-exact-active {
    color: white;
    background-color: blue;
}
</style>
