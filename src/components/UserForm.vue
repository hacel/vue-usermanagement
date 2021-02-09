
<template>
  <form @submit.prevent="onSubmit">
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" ref="vuemodal">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Create User</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <label for="username">Username: </label>
            <input v-model="form.username" placeholder="Username" /><br />
            <label for="password">Password: </label>
            <input v-model="form.password" placeholder="Password" /><br />
            <label for="is_admin">Admin? </label>
            <input v-model="form.is_admin" id="is_admin" type="checkbox" />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" class="btn btn-primary">CREATE</button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
// import api from "../api/api";
export default {
  name: "UserForm",
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
    async onSubmit() {
      return this.$emit("success");
      //   try {
      //     const response = await api.Post(this.form);
      //     this.$emit("success");
      //     console.log(response);
      //     this.reset_form();
      //   } catch (error) {
      //     console.log(error);
      //   }
    },
    reset_form() {
      this.form.username = "";
      this.form.password = "";
      this.form.is_admin = false;
    },
  },
};
</script>

<style>
</style>