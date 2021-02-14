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

    <div class="form-inline">
      <button
        type="button"
        class="btn btn-primary"
        @click="$router.push('/users/new').catch((e) => e)"
      >
        Create User
      </button>
      <input
        class="form-control m-2"
        type="text"
        v-model="search"
        placeholder="Search"
      />
    </div>
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
        <tr v-for="entry in filteredList" :key="entry.id">
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
    filteredList() {
      if (this.users) {
        return this.users.filter((user) => {
          return user.username
            .toLowerCase()
            .includes(this.search.toLowerCase());
        });
      }
    },
  }),
  data: function () {
    return {
      loading: false,
      search: "",
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