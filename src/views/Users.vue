<template>
  <div class="users">
    <button type="button" class="btn btn-primary" @click="show_model">
      Create User
    </button>
    <UserForm @success="data_created" />
    <!-- <button @click="onSubmit" variant="primary">CREATE</button> -->
    <!-- <button @click="showModal = false" variant="info">CLOSE</button> -->

    <!-- TABLE  -->
    <table class="table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Admin</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in users" :key="entry.id">
          <td>
            <a :href="'/users/' + entry.id">{{ entry.username }}</a>
          </td>
          <td>{{ entry.is_admin }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// import modal from "../components/Modal.vue";
import UserForm from "../components/UserForm";
import $ from "jquery";
/* eslint-disable no-unused-vars */
import boostrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
/* eslint-enable no-unused-vars */
export default {
  components: {
    // modal,
    UserForm,
  },
  data() {
    return {
      users: null,
      showModal: false,
    };
  },
  methods: {
    async get_data() {
      await this.$store.dispatch("load_data");
      this.users = this.$store.getters.users;
    },
    data_created() {
      this.get_data();
      $("#exampleModal").modal("hide");
    },
    show_model() {
      $("#exampleModal").modal("show");
    },
  },
  mounted() {
    this.get_data();
  },
};
</script>