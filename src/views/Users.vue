<template>
  <div class="users">
    <button id="show-modal" @click="showModal = true">Create User</button>
    <modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">Create User</h3>
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
        <button @click="onSubmit" variant="primary">CREATE</button>
        <button @click="showModal = false" variant="info">CLOSE</button>
      </div>
    </modal>

    <!-- TABLE  -->
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Admin</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in users" :key="entry.id">
          <a :href="'/users/' + entry.id">{{ entry.username }}</a>
          <td>{{ entry.is_admin }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from "../api/api";
import modal from "../components/Modal.vue";
export default {
  components: {
    modal,
  },
  data() {
    return {
      users: null,
      showModal: false,
      form: {
        username: "",
        password: "",
        is_admin: false,
      },
      searchQuery: "",
    };
  },
  methods: {
    async get_data() {
      await this.$store.dispatch("load_data");
      this.users = this.$store.getters.users;
    },
    async onSubmit() {
      try {
        const response = await api.Post(this.form);
        console.log(response);
        this.showModal = false;
        this.get_data();
        this.reset_form();
      } catch (error) {
        console.log(error);
      }
    },
    reset_form() {
      this.form.username = "";
      this.form.password = "";
      this.form.is_admin = false;
    },
  },
  mounted() {
    this.get_data();
  },
};
</script>