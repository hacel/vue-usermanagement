<template>
  <div
    class="toast mb-2"
    role="alert"
    aria-live="assertive"
    data-delay="5000"
    aria-atomic="true"
    style="min-width: 200px"
  >
    <div class="toast-header">
      <strong class="mr-auto">{{ title }}</strong>
      <button
        type="button"
        class="ml-2 mb-1 close"
        data-dismiss="toast"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="toast-body">{{ body }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: ["title", "body"],
};
</script>