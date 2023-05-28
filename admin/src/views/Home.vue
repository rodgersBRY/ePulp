<template>
  <div id="home">
    <section class="main">
      <v-card outlined class="card pa-2" @click="$router.push('/farmers')">
        <v-icon size="100">mdi-account-group</v-icon>
        <v-card-title>{{ farmers.length }}</v-card-title>
        <v-card-subtitle> Number of farmers </v-card-subtitle>
      </v-card>

      <v-card outlined class="card pa-2" @click="$router.push('#')">
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
@media screen and (max-width: 700px) {
  .main {
    width: 90%;
    margin: auto;
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
    .card {
      width: 95%;
      display: block;
      margin: 10px auto;
    }
  }
}

@media screen and (min-width: 700px) {
  .main {
    width: 80%;
    padding: 3rem;
    margin: auto;
    display: flex;

    .card {
      width: 400px;
      margin: 0 10px;
      cursor: pointer;
    }
  }
}


</style>