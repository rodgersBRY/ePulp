<template>
  <div id="farmer-details">
    <main class="farmer">
      <section class="main-section">
        <v-card width="60%" class="py-4 px-8 mx-auto" color="grey lighten-4" flat>
          <v-row justify="space-between">
            <v-icon size="150">mdi-account</v-icon>
            <div class="user-details">
              <v-card-title class="mb-3"><v-icon class="mr-2">mdi-badge-account</v-icon>{{ farmer.fullName }}</v-card-title>
              <v-card-subtitle><v-icon class="mr-2">mdi-phone</v-icon> {{ farmer.phoneNumber }}</v-card-subtitle>
              <v-card-text>Total weight: {{ farmer.totalWeight }} Kgs</v-card-text>
            </div>
          </v-row>
        </v-card>

        <v-row class="my-10" no-gutters>
          <v-spacer />
          <v-btn text color="green" @click="newBatchDialog = true"><v-icon>mdi-plus</v-icon> New Batch</v-btn>
          
          <!-- update new delivery dialog -->
          <v-dialog width="400px" v-model="newBatchDialog">
            <v-card class="pa-5">
              <v-card-title>
                Enter the coffee quantity
              </v-card-title> 
              <v-text-field outlined label="Weight" color="brown" v-model="weight"></v-text-field>
              <v-card-actions>
                <v-spacer />
                <v-btn depressed outlined text color="red" @click="newBatchDialog=false">Cancel</v-btn>
                <v-btn depressed outlined text color="green" @click="addNewCoffeeDelivery" :loading="isLoading">Add</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- success dialog -->
          <v-dialog width="400px" v-model="successDialog">
            <v-card class="text-center pa-4">
              <v-icon size="100" color="green">mdi-check-circle-outline</v-icon>
              <v-card-text class="mt-3">Successfully added</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text block @click="successDialog = false">close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>

        <div class="deliveries">
          <v-card class="py-4 px-2">
            <h2>Individual Deliveries</h2>
            <br />
            <v-progress-linear
            v-if="isLoading"
            indeterminate
            color="brown darken-2"
            ></v-progress-linear>
            <table v-else>
              <thead>
                <tr>
                  <th>Weight</th>
                  <th>Date of Delivery</th>
                </tr>
              </thead>
              <div v-if="paginatedData.length == 0">
                <p class="grey--text">No data found</p>
              </div>
              <tbody v-else>
                <tr v-for="item in paginatedData" :key="item._id">
                  <td>{{ item.coffeeWeight }} Kgs</td>
                  <td>{{ item.dateOfDelivery | dateFilter }}</td>
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
      </section>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default({
  name: "farmer-details",

  data() {
    return {
      farmerId:  this.$route.params.farmerId,
			currentPage: 1,
			itemsPerPage: 5,
      dialog: false,
      weight: null,
      newBatchDialog: false,
      successDialog: false,
    }
  },

  created() {
    this.$store.dispatch('fetchFarmer', this.farmerId)
  },

  filters: {
    dateFilter(val) {
      if (!val) return;

      var date = new Date(val).toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });
      
      return date;
    },
  },

  computed: {
    ...mapGetters(['farmers', 'farmer','isLoading']),

    farmerData() {
      return this.farmer.coffeeBatches
    },

    totalPages() {
				return Math.ceil(this.farmerData.length / this.itemsPerPage);
		},
		
		paginatedData() {
				const startIndex = (this.currentPage - 1) * this.itemsPerPage;
				const endIndex = startIndex + this.itemsPerPage;
				return this.farmerData.slice(startIndex, endIndex);
		},
  },

  methods: {
    ...mapActions(['updateFarmersQuantity']),

    async addNewCoffeeDelivery() {
      if(this.weight === '') {
        alert('Enter quantity to submit') 
      } else {
        await this.updateFarmersQuantity({id: this.farmerId, weight: this.weight})
        this.$store.dispatch('fetchFarmer', this.farmerId)
        this.weight = ''
        this.newBatchDialog = false
        this.successDialog = true
      }
    },

		previousPage() {
      if (this.currentPage > 1) this.currentPage--;
      
		},

		nextPage() {
			if (this.currentPage < this.totalPages) this.currentPage++;
		},
	},
})
</script>

<style scoped>
main {
  width: 60%;
  margin: 3rem auto 2rem auto;
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