<template>
  <!-- form always calls submit action regardless of which button was pressed -->
  <!-- why are useredit and usercreate on the same page? -->
  <!-- right now its an if statement to know which buttons to show but the form submit always calls createuser -->
  <div class="text-center p-5 mx-5">
    <form class="login form-signin" @submit.prevent="login">
      <h1>Sign in</h1>
      <div class="form-group">
        <label for="username">User name</label>
        <input
          id="username"
          required
          v-model="username"
          type="text"
          placeholder="Enter Username"
          autocomplete="username"
          class="form-control"
          autofocus
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          required
          v-model="password"
          type="password"
          placeholder="Password"
          autocomplete="current-password"
          class="form-control"
        />
      </div>
      <hr />
      <button type="submit" class="btn btn-primary btn-block">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: null,
      password: null,
    };
  },
  methods: {
    login: function () {
      const { username, password } = this;
      this.$store.dispatch("auth_request", { username, password }).then(() => {
        this.$router.push("/").catch((e) => e);
      });
    },
  },
};
</script>

<style>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
</style>