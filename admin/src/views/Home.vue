<template>
  <div id="home">
    <section class="main">
      <v-card width="300px" height="200px" outlined class="card pa-2" @click="$router.push('/farmers')">
        <v-icon size="100">mdi-account-group</v-icon>
        <v-card-title>{{ farmers.length }}</v-card-title>
        <v-card-subtitle> Number of farmers </v-card-subtitle>
      </v-card>

      <v-card width="300px" height="200px" outlined class="card pa-2" @click="$router.push('/')">
        <v-icon size="100">mdi-scale-balance</v-icon>
        <v-card-title>{{ totalWeight }} Kgs</v-card-title>
        <v-card-subtitle>Coffee brought by farmers</v-card-subtitle>
      </v-card>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Farmers from "./farmers.json"

export default ({
  name: "Home",

  created() {
    this.$store.dispatch("fetchFarmers")
  },

  computed: {
    ...mapGetters(['farmers', 'totalWeight']),
  }
})
</script>

<style scoped lang="scss">
.main {
  width: 60%;
  padding: 3rem;
  margin: auto;
  display: flex;
  justify-content: space-around;

  .card {
    cursor: pointer;
  }
}
</style>