<template>
  <div>
    <NavbarComponent />
    <h2>Add New Post</h2>
    <form @submit.prevent="addPost">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          v-model="title"
          class="form-control"
          id="title"
          required
        />
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <textarea
          v-model="content"
          class="form-control"
          id="content"
          rows="3"
          required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Add Post</button>
    </form>
  </div>
</template>

<script>
import store from "../store"; // Import the Vuex store
import NavbarComponent from "./NavbarComponent.vue";

export default {
  name: "AddPost",
  components: {
    NavbarComponent,
  },
  data() {
    return {
      title: "",
      content: "",
    };
  },

  methods: {
    addPost() {
      const newPost = {
        id: Date.now(),
        title: this.title,
        content: this.content,
      };
      store.dispatch("addPost", newPost); // Dispatch addPost action from store
      this.$router.push("/home");
    },
  },
};
</script>

<!-- Fixed -->
