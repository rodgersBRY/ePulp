<template>
    <div id="login-page">
        <main>
            <section class="form">
                <form @submit.prevent="loginUser" method="post">
                    <h2 class="text-center">LOGIN</h2>
                    <br><br>
                    <label for="phone">Phone number </label>
                    <input type="tel" v-model="phone" placeholder="07XXXXXX98">
                    <label for="password">Password </label>
                    <input type="password" v-model="password">
                    <v-btn depressed block color="brown" dark type="submit" value="Login" class="mt-10">Login</v-btn>
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
            var userForm = new FormData()

            userForm.append("phone", this.phone)
            userForm.append("password", this.password)

            this.$store.dispatch("login", userForm)
        }
    }
}
</script>

<style scoped lang="scss">
#login-page {
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    main {
        background-color: var(--accent-color);
        width: 40%;
        padding: 4rem 7rem;
        input {
            display: block;
            background-color: white;
            padding: 10px;
            width: 100%;
            margin: 5px 0 16px 0;
        }

    } 
}

</style>