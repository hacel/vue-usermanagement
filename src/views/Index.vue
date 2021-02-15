<template>
  <div class="index">
    <h1>Home</h1>
    <button type="button" class="btn btn-primary" @click="add_toast">
      Show live toast
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    add_toast() {
      this.$store.dispatch("toast", { title: "titl3e", body: "body2" });
    },
  },
};
</script>