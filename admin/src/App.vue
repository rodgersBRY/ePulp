<template>
  <v-app>
    <v-app-bar
      app
      flat
      dark
    >
      <h1>ePulp</h1>
      <v-spacer/>

      <router-link class="nav-link" exact-active-class="active" tag="li" to="/">Home</router-link>
      <router-link class="nav-link" active-class="active" tag="li" to="/farmers">Farmers</router-link>
      <router-link class="nav-link" active-class="active" tag="li" to="/reports">Reports</router-link>
    
      <v-spacer/>

      <v-btn text class="mr-5" color="brown lighten-3" to="/login">
        LOGIN
        <v-icon class="ml-1">mdi-login</v-icon>
      </v-btn>
      <v-btn text class="mr-5" color="brown lighten-3" to="/register">
        SIGN UP
        <v-icon class="ml-1">mdi-account-plus</v-icon>
      </v-btn>
      
      <v-btn text color="red lighten-3">
        LOGOUT
        <v-icon class="ml-1">mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
};
</script>

<style>
:root {
  --primary-color: rgb(85, 13, 13);
  --accent-color: rgb(160, 105, 105);
}

input:focus {
  outline: none;
}

.v-app-bar {
  background: var(--primary-color);
}
</style>