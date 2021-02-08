<template>
  <div class="user">
    <!-- POP UP -->
    <button id="show-modal" @click="showModal = true">Edit User</button>
    <modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">Edit User</h3>
      <div slot="body">
        <form>
          <label for="username">Username: </label>
          <input v-model="form.username" placeholder="Username" /><br />
          <label for="password">Password: </label>
          <input v-model="form.password" placeholder="Password" /><br />
          <label for="is_admin">Admin? </label>
          <input v-model="form.is_admin" id="is_admin" type="checkbox" />
        </form>
      </div>
      <div slot="footer">
        <button @click="onSubmit" variant="primary">UPDATE</button>
        <button @click="deleteUser" variant="danger">DELETE</button>
        <button @click="showModal = false" variant="info">CLOSE</button>
      </div>
    </modal>
    <!-- LIST -->
    <div id="details">
      Username: {{ user.username }} <br />Admin: {{ user.is_admin }}
    </div>
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
      user: { username: null, is_admin: null },
      showModal: false,
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
      this.user = this.$store.getters.users.find((user) => user.id == id);
      this.form.is_admin = this.user.is_admin;
      this.form.username = this.user.username;
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