<template>
  <div class="users">
    <button id="show-modal" @click="showModal = true">Create User</button>
    <modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">Create User</h3>
      <div slot="body">
        <!-- <form>
          <label for="username">Username: </label>
          <input v-model="form.username" placeholder="Username" />
          <label for="password">Password: </label>
          <input v-model="form.password" placeholder="Password" />
          <label for="is_admin">Admin? </label>
          <input v-model="form.is_admin" id="is_admin" type="checkbox" />
        </form> -->
        <b-form inline @submit.prevent="onSubmit">
          <label class="sr-only" for="inline-form-input-username"
            >Username</label
          >
          <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-input
              id="inline-form-input-username"
              placeholder="Username"
              v-model="form.username"
              required
            ></b-form-input>
          </b-input-group>

          <label for="text-password">Password</label>
          <b-form-input
            type="password"
            id="text-password"
            placeholder="Password"
            v-model="form.password"
            required
          ></b-form-input>

          <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0" v-model="form.is_admin"
            >Admin?</b-form-checkbox
          >
        </b-form>
      </div>
      <div slot="footer">
        <b-button @click="onSubmit" variant="primary">CREATE</b-button>
        <b-button @click="showModal = false" variant="info">CLOSE</b-button>
      </div>
    </modal>
    <!-- LIST -->
    <b-table striped hover :items="users" :fields="fields">
      <template #cell(username)="data">
        <a :href="`/users/${data.item.id}`">{{ data.value }}</a>
      </template>
    </b-table>
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
      users: null,
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
        is_admin: false,
      },
    };
  },
  methods: {
    async onSubmit() {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/0.1/users/",
          this.form
        );
        console.log(response);
        this.showModal = false;
        this.get_data();
        this.reset_form();
      } catch (error) {
        console.log(error);
      }
    },
    async get_data() {
      await this.$store.dispatch("load_data");
      this.users = this.$store.state.users;
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