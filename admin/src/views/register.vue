<template>
    <div id="register-page">
        <main>
            <form @submit.prevent="registerUser" method="post">
                <h2 class="text-center">Sign Up</h2>
                <br>
                <label for="name">Full Name</label>
                <input type="text" name="name" placeholder="e.g. Jane Doe" v-model="name">
                <label for="phone">Phone Number</label>
                <input type="tel" name="phone" placeholder="07XXXXXX89" v-model="phone">
                <label for="password">Password</label>
                <input type="password" name="password" v-model="password">
                <label for="confirmPass">Re-enter Password</label>
                <input type="password" name="confirmPass" v-model="confirmPass" :class="!passMatch ? 'error': ''">

                <v-btn type="submit" value="register" dark color="brown" block>Sign Up</v-btn>
            </form>
        </main>

        <footer>

        </footer>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            name: '',
            phone: '',
            password: '',
            confirmPass: '',
        }
    },

    computed: {
        ...mapGetters(['user','isLoading', 'error']),

        passMatch() {
            return this.password === this.confirmPass
        }
    },

    watch: {
        user(val) {
            if (val !== null && val !== undefined) {
                this.$router.push("/");
            }
        },
    },

    methods: {
        ...mapActions(['register']),
        registerUser() {
            if(this.password !== this.confirmPass) {
                alert('Passwords do not match!')
                return;
            }

            let userData = {
                name: this.name,
                phone: this.phone,
                password: this.password
            }

            this.register(userData)
        }
    }
}
</script>

<style scoped lang="scss">
#register-page {
	height: 90vh;
	display: flex;
	justify-content: center;
	align-items: center;
	main {
			background-color: var(--accent-color);
			width: 40%;
			padding: 2rem 7rem;
			input {
					display: block;
					background-color: white;
					padding: 10px;
					width: 100%;
					margin: 5px 0 16px 0;
			}

	} 
}

.error {
    border: 1px solid red;
}
</style>