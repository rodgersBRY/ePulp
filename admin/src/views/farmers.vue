<template>
<div id="farmers">
    <v-card flat width="60%" class="mx-auto mt-11">
			<div class="user-ops d-flex justify-space-between">
				<input type="text" name="search" id="search" v-model="searchQuery" placeholder="Search..." />
				<v-btn outlined text color="brown"><v-icon>mdi-plus</v-icon>Add New Farmer</v-btn>
			</div>
   
			<table>
				<thead>
					<tr>
						<th>Membership No</th>
						<th>Full Name</th>
						<th>Phone Number</th>
						<th>Total Weight (Kgs)</th>
					</tr>
				</thead>

				<tbody>
					<tr v-for="item in paginatedData" :key="item.membershipNo">
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
import Farmers from './farmers.json'

export default {
	name: 'Farmers',

	data() {
		return {
			tableData: Farmers,
			currentPage: 1,
			itemsPerPage: 10,
			searchQuery: '',
		}
	},

	computed: {
		totalPages() {
				return Math.ceil(this.tableData.length / this.itemsPerPage);
		},
		
		filteredData() {
				if(this.searchQuery == '') return this.tableData

				const query = this.searchQuery.toLowerCase()

				return this.tableData.filter(item => {
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
}
input {
    background-color: rgb(238, 238, 238);
    padding: 10px;
    border-radius: 0;
    width: 70%;
    margin-bottom: 1rem;
}

.table-container {
    max-width: 600px;
    margin: 0 auto;
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