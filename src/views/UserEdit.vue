<template>
  <!-- needs to receive `user` from User.vue  -->
  <!-- why do we need form?  -->
  <!-- <form onsubmit.prevent="CreateUser"> -->
  <div>
    <label for="username">Username: </label>
    <input v-model="form.username" placeholder="Username" /><br />
    <label for="password">Password: </label>
    <input v-model="form.password" placeholder="Password" /><br />
    <label for="is_admin">Admin? </label>
    <input v-model="form.is_admin" id="is_admin" type="checkbox" />
    <div v-if="id">
      <button @click="PutUser" class="btn btn-primary">SAVE</button>
      <button @click="DeleteUser" class="btn btn-danger">DELETE</button>
    </div>
    <div v-else>
      <button @click="CreateUser" class="btn btn-primary">CREATE</button>
    </div>
  </div>
  <!-- </form> -->
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      form: {
        username: "",
        password: "",
        is_admin: false,
      },
    };
  },
  methods: {
    // submit calls it every time
    async CreateUser() {
      try {
        const response = await this.$store.dispatch("save_user", {
          data: this.form,
        });
        console.log(response);
        this.$router.push("/users");
      } catch (error) {
        console.log(error);
      }
    },
    async PutUser(event) {
      event.preventDefault();
      try {
        const response = await this.$store.dispatch("save_user", {
          data: this.form,
          id: this.id,
        });
        console.log(response);
        this.user = response.data;
        this.$router.push(`/users/detail/${this.id}`);
      } catch (error) {
        console.log(error);
      }
    },
    async DeleteUser() {
      try {
        const response = await this.$store.dispatch("delete_user", this.id);
        console.log(response);
        this.$router.push("/users");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>