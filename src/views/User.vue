<template>
  <div class="user">
    <button
      type="button"
      class="btn btn-primary"
      @click="$router.push(`/users/edit/${id}`)"
    >
      Edit User
    </button>
    <!-- LIST -->
    <div class="card" style="width: 18rem">
      <div class="card-body">
        <h5 class="card-title">User Details</h5>
        <p class="card-text">Username: {{ user.username }}</p>
        <p class="card-text">Admin: {{ user.is_admin }}</p>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
export default {
  props: ["id"],
  computed: mapState({
    user: (state) => state.user.active_user,
  }),
  methods: {
    async get_data() {
      this.$store.dispatch("get_user", this.id).catch((e) => console.log(e));
    },
  },
  mounted() {
    // this.user = { username: null, is_admin: null };
    this.get_data();
  },
};
</script>