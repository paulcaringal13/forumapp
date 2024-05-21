<template>
  <div>
    <NavbarComponent />
    <div class="container mt-4">
      <h1>Posts</h1>
      <router-link to="/add" class="btn btn-primary mb-3">Add Post</router-link>
      <PostList :posts="posts" @delete-post="deletePost" />
    </div>
  </div>
</template>

<script>
import NavbarComponent from "./NavbarComponent.vue";
import PostList from "./PostList.vue";
import store from "../store"; // Import the Vuex store

export default {
  name: "HomePage",
  components: {
    NavbarComponent,
    PostList,
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
  },
  mounted() {
    this.$store.dispatch("getPost");
  },
  methods: {
    deletePost(postId) {
      store.dispatch("deletePost", postId); // Dispatch deletePost action from store
    },
  },
};
</script>
