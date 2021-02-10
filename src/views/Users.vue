<template>
  <div class="users">
    <button
      type="button"
      class="btn btn-primary"
      @click="$router.push('/users/new')"
    >
      Create User
    </button>

    <!-- TABLE  -->
    <table class="table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Admin</th>
        </tr>
      </thead>
      <tbody>
        <tr v-show="loading">
          <td colspan="2">Loading...</td>
        </tr>
        <tr v-for="entry in users" :key="entry.id">
          <td>
            <router-link
              :to="{ name: 'user_detail', params: { id: entry.id } }"
              >{{ entry.username }}</router-link
            >
          </td>
          <td>{{ entry.is_admin }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState({
    users: "users",
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
        .then((r) => console.log(r))
        .catch((e) => console.log(e))
        .finally(() => (this.loading = false));
    },
  },
  mounted() {
    this.get_data();
  },
};
</script>