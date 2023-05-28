<template>
	<div id="login-page">
		<main>
			<section class="form">
				<form @submit.prevent="loginUser" method="post">
					<h2 class="text-center">LOGIN</h2>
					<br><br>
					<label for="phone">Phone Number</label>
					<input type="tel" v-model="phone" placeholder="07XXXXXX98">
					<label for="password">Password</label>
					<input type="password" v-model="password">
					<v-btn depressed block color="brown" dark type="submit" value="Login" class="mt-10" :loading="isLoading">Login</v-btn>
				</form>

				<error-dialog :display="error" @close-dialog="resetError" :error-text="error"></error-dialog>
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
					errorDialog: false,
			}
	},

	watch: {
        user(val) {
            if (val !== null && val !== undefined) {
                this.$router.push("/");
            }
        },
    },

	computed: {
			...mapGetters(["user","isLoading", "error"])
	},

	methods: {
		...mapActions(['login', 'clearError', 'setError']),

		loginUser() {
			if(this.phone == '' || this.password == '') {
				this.setError('Phone number or password cannot be empty')
			} else {
				var userForm = new FormData()

				userForm.append("phone", this.phone)
				userForm.append("password", this.password)
					
				this.login(userForm)			
			}				
		},

		resetError() {
			this.clearError()
		}
	}
}
</script>

<style scoped lang="scss">
@media screen and (max-width: 700px) {
	#login-page {
		height: 100vh;
		main {
			height: 100%;
			padding: 10px;
		}
	}
}

@media screen and (min-width: 700px) {
	#login-page {
    height: 90vh;
		display: flex;
		justify-content: center;
		align-items: center;
		main {
			width: 40%;
			padding: 4rem 7rem;
		}
	}
}

#login-page {
    main {
        background-color: var(--accent-color);
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