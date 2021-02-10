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
import { mapState } from "vuex";
export default {
  props: ["id"],
  computed: mapState({
    user: "active_user",
  }),
  methods: {
    async get_data() {
      this.$store.dispatch("get_user", this.id).catch((e) => console.log(e));
    },
  },
  mounted() {
    this.get_data();
  },
};
</script>