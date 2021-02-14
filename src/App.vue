<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExampleDefault"
        aria-controls="navbarsExampleDefault"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/users">Users</router-link>
          </li>
        </ul>
        <p v-if="loggedin" class="navbar-text my-0 mr-2">
          <span class="text-muted">Signed in as </span>{{ username }}
        </p>
        <form class="form-inline my-0 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="text"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-secondary my-0 mr-2" type="submit">
            Search
          </button>
        </form>
        <button
          v-if="loggedin"
          class="btn btn-outline-secondary my-0"
          @click="logout"
        >
          Sign out
        </button>
        <button
          v-else
          class="btn btn-outline-primary my-0"
          @click="$router.push('/login').catch((e) => e)"
        >
          Sign in
        </button>
      </div>
    </nav>

    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/users">Users</router-link>
    </div> -->
    <main role="main" class="container">
      <router-view />
    </main>
    <!-- /.container -->
  </div>
</template>
<script>
export default {
  computed: {
    loggedin() {
      return this.$store.getters.isAuthenticated;
    },
    username() {
      return this.$store.getters.username;
    },
  },
  methods: {
    logout: function () {
      this.$store.dispatch("auth_logout").then(() => {
        this.$router.push("/").catch((e) => e);
      });
    },
  },
  created: function () {
    this.$store.dispatch("auto_login");
  },
};
</script>
<style>
body {
  padding-top: 5rem;
}
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
