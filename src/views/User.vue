<template>
  <div class="user">
    <!-- POP UP -->
    <button id="show-modal" @click="showModal = true">Edit User</button>
    <modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">Edit User</h3>
      <div slot="body">
        <b-form inline @submit="onSubmit">
          <label class="sr-only" for="inline-form-input-username"
            >Username</label
          >
          <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-input
              id="inline-form-input-username"
              v-model="form.username"
              autocomplete="username"
              required
            ></b-form-input>
          </b-input-group>

          <label for="text-password">Password</label>
          <b-form-input
            type="password"
            id="text-password"
            placeholder="Password"
            v-model="form.password"
            autocomplete="current-password"
            required
          ></b-form-input>

          <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0" v-model="form.is_admin"
            >Admin?</b-form-checkbox
          >
        </b-form>
      </div>
      <div slot="footer">
        <b-button @click="onSubmit" variant="primary">UPDATE</b-button>
        <b-button @click="deleteUser" variant="danger">DELETE</b-button>
        <b-button @click="showModal = false" variant="info">CLOSE</b-button>
      </div>
    </modal>
    <!-- LIST -->
    <b-table striped hover :items="user" :fields="fields"></b-table>
  </div>
</template>


<script>
import axios from "axios";
import modal from "../components/Modal.vue";
export default {
  components: {
    modal,
  },
  data() {
    return {
      user: null,
      showModal: false,
      fields: [
        {
          key: "username",
        },
        {
          key: "is_admin",
          label: "Admin",
          formatter: (value) => {
            return value ? "True" : "False";
          },
        },
      ],
      form: {
        username: "",
        password: "",
        is_admin: null,
      },
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      axios
        .put(`http://localhost:8000/api/0.1/users/${this.$route.params.id}/`, {
          username: this.form.username,
          password: this.form.password,
          is_admin: this.form.is_admin,
        })
        .then((response) => {
          console.log(response);
          this.showModal = false;
          this.get_data();
          this.reset_form();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteUser() {
      axios
        .delete(`http://localhost:8000/api/0.1/users/${this.$route.params.id}/`)
        .then((response) => {
          console.log(response);
          this.$router.push("/users");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async get_data() {
      await this.$store.dispatch("load_data");
      let id = this.$route.params.id;
      this.user = [this.$store.state.users.find((user) => user.id == id)];
      this.form.is_admin = this.user[0].is_admin;
      this.form.username = this.user[0].username;
    },
    reset_form() {
      this.form.password = "";
    },
  },
  mounted() {
    this.get_data();
  },
};
</script>