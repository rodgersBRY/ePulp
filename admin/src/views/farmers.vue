<template>
<div id="farmers">
	<v-card flat width="60%" class="mx-auto mt-11">
		<div class="user-ops d-flex justify-space-between">
			<input type="text" name="search" id="search" v-model="searchQuery" placeholder="Search..." />
			<v-btn outlined text color="brown" :disabled="dialog" @click="dialog=true"><v-icon>mdi-plus</v-icon>New Farmer</v-btn>
		</div>
		<div class="new-farmer-form" v-show="dialog">
			<form @submit.prevent="addNewFarmer">
				<v-text-field autofocus dense outlined label="Full Name" type="text" color="brown" v-model="name"></v-text-field>
				<v-text-field dense outlined label="Account Number" type="number" color="brown" v-model="accountNo"></v-text-field>
				<v-text-field dense outlined label="Phone Number" type="tel" color="brown" v-model="phone"></v-text-field>
				<v-text-field dense outlined label="Password" type="password" color="brown" v-model="password"></v-text-field>
				<div class="pa-3">
					<v-row no-gutters>
						<v-spacer></v-spacer>
						<v-btn text @click="closeDialog" color="red">Cancel</v-btn>
						<v-btn type="submit" depressed color="green" dark class="ml-2" :loading="isLoading">Save</v-btn>	
					</v-row>		
				</div>

				<error-dialog :display="error" :error-text="error" @close-dialog="resetError"></error-dialog>
				
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

			<span v-for="pageNumber in displayedPages" :key="pageNumber">
        <button @click="changePage(pageNumber)" :class="{ active: pageNumber === currentPage }">{{ pageNumber }}</button>
      </span>
			
			<v-btn icon outlined @click="nextPage" :disabled="currentPage === totalPages">
				<v-icon>mdi-arrow-right</v-icon>
			</v-btn>
		</div>
	</v-card>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'Farmers',

	data() {
		return {
			currentPage: 1,
			itemsPerPage: 10,
			searchQuery: '',
			dialog: false,

			name: '',
			phone: '',
			password: '',
			accountNo: '',
		}
	},

	created() {
		this.$store.dispatch("fetchFarmers")
	},

	computed: {
		...mapGetters(['farmers','isLoading', 'error']),

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

		displayedPages() {
			const range = 2; // Number of page numbers to display before and after the current page
			const currentPage = this.currentPage;
			const totalPages = this.totalPages;

			let startPage = Math.max(currentPage - range, 1);
			let endPage = Math.min(currentPage + range, totalPages);

			// Adjust the start and end pages if they go beyond the available range
			if (totalPages > range * 2 + 1) {
				if (currentPage <= range) {
					endPage = range * 2 + 1;
				} else if (currentPage >= totalPages - range) {
					startPage = totalPages - range * 2;
				}
			}

			return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
		},
	},

	methods: {
		...mapActions(['clearError', 'setError']),

		closeDialog() {
			this.dialog = false
			this.name = '',
			this.phone = '',
			this.password = '',
			this.accountNo=''
		},

		resetError() {
			this.clearError()
		},

		async addNewFarmer() {
			if(this.name != '' || this.phone != '' || this.password != '' || this.accountNo != '') {
				const farmer = {
					fullName: this.name,
					phoneNumber: this.phone,
					accountNo: this.accountNo,
					password: this.password
				}

				await this.$store.dispatch('newFarmer', farmer)
				this.$store.dispatch("fetchFarmers")
				this.closeDialog()
			} else {
				this.setError("All fields should be <br/> filled before submitting")
			}
			
		},

		previousPage() {
			if (this.currentPage > 1) {
				this.currentPage--;
			}
		},

		changePage(pageNumber) {
			this.currentPage = pageNumber;
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

.pagination button.active {
  background-color: #ccc;
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