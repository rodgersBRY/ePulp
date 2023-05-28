<template>
  <v-app>
    <nav fluid class="nav-bar">
      <img :src="require('./assets/logo.png')" alt="alt logo">

      <div class="nav-links">
        <button class="nav-btn" :class="{ active: activeLink === '/'}" @click="navigateUser('/')">Home</button>
        <button class="nav-btn" :class="{ active: activeLink === '/farmers'}" @click="navigateUser('/farmers')">Farmers</button>
      </div>

      <div class="other-links">
        <button v-if="!user" @click="$router.push('/login')"><v-icon color="var(--accent-color)">mdi-login</v-icon> Login</button>
        <button v-else @click="logoutUser"><v-icon color="var(--accent-color)">mdi-logout</v-icon> Logout</button>
      </div>
      
      <v-btn class="mobile-menu-icon" icon small color="white" @click="openNavMenu"><v-icon>{{drawer ? 'mdi-close' : 'mdi-menu'}}</v-icon></v-btn>
    </nav>
    
    <div class="mobile-nav">
      <v-btn icon @click="closeNavMenu" dark><v-icon>mdi-close</v-icon></v-btn>

      <img :src="require('./assets/logo.png')" alt="alt logo">

      <button class="nav-btn" :class="{ active: activeLink === '/'}" @click="navigateUser('/')">Home</button>
      <button class="nav-btn"  :class="{ active: activeLink === '/farmers'}" @click="navigateUser('/farmers')">Farmers</button>
      <button v-if="!user" @click="navigateUser('/login')"><v-icon color="var(--accent-color)">mdi-login</v-icon> Login</button>
      <button v-else @click="logoutUser"><v-icon color="var(--accent-color)">mdi-logout</v-icon> Logout</button>
    </div>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',

  data() {
    return {
      drawer: false,
      activeLink: '',
    }
  },

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

    openNavMenu() {
      this.openMenu=true
      let navDiv = document.getElementsByClassName("mobile-nav")[0];
      navDiv.style.width = "100%";
    },

    closeNavMenu() {
      this.openMenu = false
      let navDiv = document.getElementsByClassName("mobile-nav")[0];
      navDiv.style.width = "0";
    },

    navigateUser(route) {
      this.closeNavMenu()
      this.$router.push(route);
      this.activeLink = route
    },

    logoutUser() {
      this.logout()
      this.closeNavMenu()
      this.$router.push('/login')
    }
  }
};
</script>

<style lang="scss">
:root {
  --primary-color: rgba(29,68,53,255);
  --accent-color: rgba(250,180,85,.6);
  --active-color: rgba(250,180,85,.1);
}

input:focus {
  outline: none;
}

@media screen and (max-width: 700px) {
  .nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;

    img {
      width: 150px;
    }

    .nav-links, .other-links {
      display: none;
    }
  }  
}

@media screen and (min-width: 700px) {
  .nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;

    img {
      width: 180px;
    }

    .mobile-nav, .mobile-menu-icon {
      display: none;
    }

    .nav-links {
      height: 100%;

      .nav-btn {
        height: 100%;
        width: 100px;
        margin: 0 16px;
        padding: 10px;
        color: white;
        transition: background-color .3s ease-in-out, color .3s ease-in-out, border-top .3s ease-in-out;
        
        &:hover,&.active {
          border-top: 3px solid var(--accent-color);
          background-color: var(--active-color);
          color: var(--accent-color);
        }
      }
    }

    .other-links {
      button {
        color: var(--accent-color);
        background-color: var(--active-color);
        border-radius: 5px;
        width: 100px;
        padding: 10px 0;
        margin-right: 10px;
      }
    }
  }
}

.mobile-nav {
  z-index: 1;
  position: absolute;
  height: 100vh;
  width: 0;
  overflow: hidden;
  background-color: var(--primary-color);
  transition: width .5s ease-in-out;
  top: 0;
  left: 0;
  .v-btn {
    position: absolute;
    top: 0;
    right: 12px;
  }

  img {
    width: 100%;
    margin: 4rem 0;
  }

  button {
    display: block;
    width: 90%;
    margin: 10px auto;
    color: white;
    padding: 10px 0;
    border-radius: 5px;
    background-color: var(--active-color);
    &:last-child {
      background-color: var(--accent-color);
      margin-top: 3rem;
    }
  }
}

.nav-bar {
  background-color: var(--primary-color);
  padding: 0;
}


</style>