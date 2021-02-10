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
    <div id="details">
      Username: {{ user.username }} <br />Admin: {{ user.is_admin }}
    </div>
  </div>
</template>


<script>
export default {
  props: ["id"],
  data() {
    return {
      user: { username: null, is_admin: null },
    };
  },
  methods: {
    async get_data() {
      if (!this.$store.getters.users) {
        await this.$store.dispatch("get_users");
      }
      let id = this.id;
      this.user = this.$store.getters.user(id);
    },
  },
  mounted() {
    this.get_data();
  },
};
</script>