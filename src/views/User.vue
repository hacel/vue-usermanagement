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
import api from "../api/api";
import modal from "../components/Modal.vue";
export default {
  components: {
    modal,
  },
  props: ["id"],
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
    async onSubmit(event) {
      event.preventDefault();
      try {
        const response = await api.Put(this.form, this.id);
        console.log(response);
        this.showModal = false;
        this.get_data();
        this.reset_form();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteUser() {
      try {
        const response = await api.Delete(this.id);
        console.log(response);
        this.$router.push("/users");
      } catch (error) {
        console.log(error);
      }
    },
    async get_data() {
      await this.$store.dispatch("load_data");
      let id = this.id;
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