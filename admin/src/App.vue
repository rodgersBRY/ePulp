<template>
  <v-app>
    <v-app-bar
      app
      flat
      dark
    >
      
    
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

.v-app-bar {
  background: var(--primary-color);
}
</style>