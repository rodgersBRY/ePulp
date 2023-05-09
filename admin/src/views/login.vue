<template>
    <div id="login-page">
        <main>
            <section class="form">
                <form @submit.prevent="loginUser" method="post">
                    <label for="phone">Phone number: </label>
                    <input type="tel" v-model="phone" placeholder="07XXXXXX98">
                    <label for="password">Password: </label>
                    <input type="password" v-model="password">
                    <button type="submit" value="Login">Login</button>
                </form>
            </section>
        </main>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

export default {
    data() {
        return {
            phone: '',
            password: '',
        }
    },

    computed: {
        ...mapGetters(["user"])
    },

    methods: {

        loginUser() {
            var userData = {
                phone: this.phone,
                password: this.password,
            }

            this.$store.dispatch("login", userData)
        }
    }
}
</script>