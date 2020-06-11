<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="login">
            <input type="text" v-model="email">
            <input type="password" v-model="password">
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
    import {Auth} from "../api/post";

    export default {
        name: "Login",
        data() {
          return {
              email: 'test@test.com',
              password: '',
              err:false
          }
        },
        methods: {
            login() {
                Auth.login(this.email, this.password).then(() => {
                    this.$router.replace(this.$route.query.redirect || '/')
                })
            }
        }
    }
</script>

<style scoped>

</style>
