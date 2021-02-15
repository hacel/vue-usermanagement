<template>
  <!-- form always calls submit action regardless of which button was pressed -->
  <!-- why are useredit and usercreate on the same page? -->
  <!-- right now its an if statement to know which buttons to show but the form submit always calls createuser -->
  <div>
    <div class="form-group">
      <label for="username">Username</label>
      <input
        type="text"
        class="form-control"
        v-model="form.username"
        placeholder="Enter username"
        autocomplete="username"
        required
      />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input
        v-model="form.password"
        type="password"
        class="form-control"
        placeholder="Password"
        autocomplete="current-password"
      />
    </div>
    <div class="form-check">
      <input
        v-model="form.is_admin"
        id="is_admin"
        type="checkbox"
        class="form-check-input"
      />
      <label class="form-check-label" for="is_admin">Admin? </label>
    </div>
    <div v-if="id">
      <button @click="PutUser" class="btn btn-primary">SAVE</button>
      <button @click="DeleteUser" class="btn btn-danger">DELETE</button>
    </div>
    <div v-else>
      <button @click="CreateUser" class="btn btn-primary">CREATE</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      form: {
        username: "",
        password: "",
        is_admin: false,
      },
    };
  },
  methods: {
    CreateUser() {
      this.$store
        .dispatch("create_user", this.form)
        .then(() => {
          this.$router.push("/users").catch((e) => e);
          this.$store.dispatch("toast", {
            title: "Success",
            body: "User created successfully",
          });
        })
        .catch((e) => console.log(e));
    },
    PutUser() {
      this.$store
        .dispatch("save_user", { data: this.form, id: this.id })
        .then((r) => {
          this.$router.push(`/users/detail/${this.id}`).catch((e) => e),
            (this.user = r.data);
        })
        .catch((e) => console.log(e));
    },
    DeleteUser() {
      this.$store
        .dispatch("delete_user", this.id)
        .then(() => this.$router.push("/users").catch((e) => e))
        .catch((e) => console.log(e));
    },
    get_data() {
      this.$store
        .dispatch("get_user", this.id)
        .then(() => {
          let user = this.$store.getters.user;
          this.form.username = user.username;
          this.form.is_admin = user.is_admin;
        })
        .catch((e) => console.log(e));
    },
  },
  mounted() {
    if (this.id) {
      this.get_data();
    }
  },
};
</script>

<style>
</style>