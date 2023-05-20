<template>
  <v-app>
    <v-app-bar
      app
      flat
      dark
    >
      <img width="200px" src="./assets/mongo_logo.png" alt="mongo logo">
      <v-spacer/>

      <router-link class="nav-link" exact-active-class="active" tag="li" to="/">Home</router-link>
      <router-link class="nav-link" active-class="active" tag="li" to="/farmers">Farmers</router-link>
      <router-link class="nav-link" active-class="active" tag="li" to="/reports">Reports</router-link>
    
      <v-spacer/>

      <div v-if="!user">
        <v-btn text class="mr-5 authBtn" to="/login">
          LOGIN
          <v-icon class="ml-1">mdi-login</v-icon>
        </v-btn>
        <v-btn text class="mr-5 authBtn" to="/register">
          SIGN UP
          <v-icon class="ml-1">mdi-account-plus</v-icon>
        </v-btn>
      </div>
      
      <v-btn v-else text class="logoutBtn" @click="logoutUser">
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
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',

  computed: {
    ...mapGetters(['user'])
  },

  watch: {
    user(val) {
        if (val !== null && val !== undefined) {
            this.$router.push("/");
        }
    },
  },

  methods: {
     ...mapActions(['logout']),

    logoutUser() {
      this.logout()
      this.$router.push('/login')
    }
  }
};
</script>

<style lang="scss">
:root {
  --primary-color: rgba(29,68,53,255);
  --accent-color: rgba(250,180,85,.6);
}

input:focus {
  outline: none;
}

.v-toolbar__content {
  background-color: var(--primary-color);
  padding: 0 10px;

  li {
    list-style: none;
    margin: 0 2rem;
    padding: 0 16px;
    height: 100%;
    display: flex;
    align-items: center;
    
    &:hover,&.active {
      color: var(--accent-color);
      cursor: pointer;
      border-top: 3px solid var(--accent-color);
    }
  }

  .logoutBtn, .authBtn {
    color: var(--accent-color);
  }
  
}
</style>