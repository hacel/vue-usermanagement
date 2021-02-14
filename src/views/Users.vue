<template>
  <div class="users">
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'index' }">Home</router-link>
        </li>
        <li class="breadcrumb-item active">
          <router-link :to="{ name: 'users' }">Users</router-link>
        </li>
      </ol>
    </nav>

    <button
      type="button"
      class="btn btn-primary"
      @click="$router.push('/users/new').catch((e) => e)"
    >
      Create User
    </button>
    <h5 v-show="loading">Loading...</h5>
    <!-- TABLE  -->
    <table class="table">
      <thead>
        <tr>
          <th>Username</th>
          <th colspan="2">Admin</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in users" :key="entry.id">
          <td>
            <router-link
              :to="{ name: 'user_detail', params: { id: entry.id } }"
              >{{ entry.username }}</router-link
            >
          </td>
          <td>{{ entry.is_admin }}</td>
          <td>
            <button
              type="button"
              class="btn btn-primary"
              @click="$router.push(`/users/edit/${entry.id}`).catch((e) => e)"
            >
              EDIT
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState({
    users: (state) => state.user.users,
  }),
  data: function () {
    return {
      loading: false,
    };
  },
  methods: {
    get_data() {
      this.loading = true;
      this.$store
        .dispatch("get_users")
        .catch((e) => console.log(e))
        .finally(() => (this.loading = false));
    },
  },
  mounted() {
    this.get_data();
  },
};
</script>