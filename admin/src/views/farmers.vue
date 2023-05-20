<template>
<div id="farmers">
	<v-card flat width="60%" class="mx-auto mt-11">
		<div class="user-ops d-flex justify-space-between">
			<input type="text" name="search" id="search" v-model="searchQuery" placeholder="Search..." />
			<v-btn outlined text color="brown" :disabled="dialog" @click="dialog=true"><v-icon>mdi-plus</v-icon>New Farmer</v-btn>
		</div>
		<div class="new-farmer-form" v-show="dialog">
			<form @submit.prevent="addNewFarmer">
				<v-text-field dense outlined label="Full Name" type="text" color="brown" v-model="name"></v-text-field>
				<v-text-field dense outlined label="Phone Number" type="tel" color="brown" v-model="phone"></v-text-field>
				<v-text-field dense outlined label="Password" type="password" color="brown" v-model="password"></v-text-field>
				<div class="pa-3">
					<v-row no-gutters>
						<v-spacer></v-spacer>
						<v-btn text @click="closeDialog" color="red">Cancel</v-btn>
						<v-btn type="submit" depressed color="green" dark class="ml-2" :loading="isLoading">Save</v-btn>	
					</v-row>		
				</div>

				<error-dialog :display="errorDialog" error-text="All fields must be filled <br> before submitting" @close-dialog="errorDialog = false"></error-dialog>
				<!-- <v-dialog v-model="errorDialog" width="350px">
					<v-card class="text-center pa-4">
						<v-icon size="100" color="red">mdi-alert-circle-outline</v-icon>
						<v-card-text class="mt-3">All fields must be filled <br> before submitting</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn text block @click="errorDialog = false">close</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog> -->
			</form>
		</div>
		<v-progress-linear
		v-if="isLoading"
		indeterminate
		color="brown darken-2"
		></v-progress-linear>

		<table v-else>
			<thead>
				<tr>
					<th>Membership No</th>
					<th>Full Name</th>
					<th>Phone Number</th>
					<th>Total Weight (Kgs)</th>
				</tr>
			</thead>
			<div v-if="paginatedData.length === 0">
				<p class="grey--text">No farmers on the system</p>
			</div>
			<tbody v-else>				
				<tr  v-for="item in paginatedData" :key="item.membershipNo" @click="$router.push(`/farmers/${item._id}`)">
					<td>{{ item.membershipNo }}</td>
					<td>{{ item.fullName }}</td>
					<td>{{ item.phoneNumber }}</td>
					<td>{{ item.totalWeight }}</td>
				</tr>
			</tbody>
		</table>

		<div class="pagination">
			<v-btn icon outlined @click="previousPage" :disabled="currentPage === 1">
				<v-icon>mdi-arrow-left</v-icon>
			</v-btn>

			<span class='mx-4'>{{ currentPage }}</span>

			<v-btn icon outlined @click="nextPage" :disabled="currentPage === totalPages">
				<v-icon>mdi-arrow-right</v-icon>
			</v-btn>
		</div>
	</v-card>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import errorText from '@/components/error_component.vue'


export default {
	name: 'Farmers',

	components: {
		"error-dialog": errorText
	},

	data() {
		return {
			currentPage: 1,
			itemsPerPage: 10,
			searchQuery: '',
			dialog: false,
			errorDialog: false,

			name: '',
			phone: '',
			password: '',
		}
	},

	created() {
		this.$store.dispatch("fetchFarmers")
	},

	computed: {
		...mapGetters(['farmers','isLoading']),

		totalPages() {
				return Math.ceil(this.farmers.length / this.itemsPerPage);
		},
		
		filteredData() {
				if(this.searchQuery == '') return this.farmers

				const query = this.searchQuery.toLowerCase()

				return this.farmers.filter(item => {
				return Object.values(item).some(value => String(value).toLowerCase().includes(query))
				})
		},
		
		paginatedData() {
				const startIndex = (this.currentPage - 1) * this.itemsPerPage;
				const endIndex = startIndex + this.itemsPerPage;
				return this.filteredData.slice(startIndex, endIndex);
		},
	},

	methods: {
		closeDialog() {
			this.dialog = false
			this.name = '',
			this.phone = '',
			this.password = ''
		},

		async addNewFarmer() {
			if(this.name != '' || this.phone != '' || this.password != '') {
				const farmer = {
					fullName: this.name,
					phoneNumber: this.phone,
					password: this.password
				}

				await this.$store.dispatch('newFarmer', farmer)
				this.$store.dispatch("fetchFarmers")
				this.closeDialog()
			} else {
				this.errorDialog = true;
			}
			
		},

		previousPage() {
				if (this.currentPage > 1) {
				this.currentPage--;
				}
		},

		nextPage() {
			if (this.currentPage < this.totalPages) {
			this.currentPage++;
			}
		},
	},
}
</script>

<style scoped lang="scss">

#farmers {
    padding: 2rem 0;
		table {
			tbody tr {
				cursor: pointer;
			}
		}
}

input {
    background-color: rgb(238, 238, 238);
    padding: 10px;
    border-radius: 0;
    width: 70%;
    margin-bottom: 1rem;
}

.new-farmer-form {
	transition: display 10s ease-in-out;
}

table {
    width: 100%;
    border-collapse: collapse;
}

thead {
    background-color: #f2f2f2;
}

th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ccc;
}

tr:hover {
    background-color: #f9f9f9;
}

.pagination {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.pagination button {
    margin: 0 5px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    background-color: #fff;
    cursor: pointer;
}

.pagination button:hover {
    background-color: #f2f2f2;
}

.pagination button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
.pagination span {
    margin: 0 5px;
    font-weight: bold;
}
</style>