<template>
  <v-app>
    <v-app-bar
      app
      flat
      color="white black--text darken-2"
      dark
    >
    <h1>ePulp</h1>
    <v-spacer></v-spacer>

    <div class="nav-items">
      <ul>
        <li>Home</li>
        <li>About Us</li>
        <li>Login</li>
        <li>Register</li>
        <li>Logout</li>
      </ul>
    </div>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data() {
    return {

    }
  },
};
</script>

<style lang="scss" scoped>
.v-app-bar {
  font-family: 'PT Mono', monospace;
  padding: 1rem 10rem;

  h1 {
    color: rgb(78, 243, 78);
  }
}
.nav-items {
  ul {
    list-style: none;
    li {
    display: inline-block;
    margin: 0 1.5rem;
    cursor: pointer;
    border: 2px dashed black;
    border-radius: 0 10px;
    padding: 7px 10px;

    &:hover {
      color: rgb(78, 243, 78);;
      border: 2px dashed rgb(78, 243, 78);;
      transition: .3s color ease-in-out, .3s border ease-in-out;
    }
  }
  }
}
</style>