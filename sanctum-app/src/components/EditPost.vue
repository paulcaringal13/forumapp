<template>
  <div>
    <h2>Edit Post</h2>
    <form @submit.prevent="editPost">
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
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  </div>
</template>

<script>
import store from "../store"; // Import the Vuex store

export default {
  name: "EditPost",
  props: ["id"],
  data() {
    return {
      title: "",
      content: "",
    };
  },
  computed: {
    post() {
      return store.getters.getPostById(parseInt(this.id));
    },
  },
  created() {
    if (this.post) {
      this.title = this.post.title;
      this.content = this.post.content;
    }
  },
  methods: {
    editPost() {
      const updatedPost = {
        id: parseInt(this.id),
        title: this.title,
        content: this.content,
      };
      store.dispatch("editPost", updatedPost); // Dispatch editPost action from store
      this.$router.push("/home");
    },
  },
};
</script>