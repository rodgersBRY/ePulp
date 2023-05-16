<template>
  <div id="home">
    <section class="main">
      <v-card width="300px" height="200px" outlined class="card pa-2" @click="$router.push('/farmers')">
        <v-icon size="100">mdi-account-group</v-icon>
        <v-card-title>{{ totalFarmers }}</v-card-title>
        <v-card-subtitle> Number of farmers </v-card-subtitle>
      </v-card>

      <v-card width="300px" height="200px" outlined class="card pa-2" @click="$router.push('/')">
        <v-icon size="100">mdi-scale-balance</v-icon>
        <v-card-title>{{ totalKgs }}</v-card-title>
        <v-card-subtitle>Total amount (Kgs) brought by farmers</v-card-subtitle>
      </v-card>
    </section>
  </div>
</template>

<script>
export default ({
  name: "Home",
  data() {
    return  {
      totalKgs: 5000,
      totalFarmers: 450,
    }
  },

  
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