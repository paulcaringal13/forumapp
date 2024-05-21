<template>
  <div className=" bg-green-500 h-full w-full">
    <NavbarComponent />
    <div class="bg-red-500">
      <h1>Posts</h1>
      <router-link to="/add" class="btn btn-primary mb-3"
        >Add Postd</router-link
      >
      <PostList :posts="posts" @delete-post="deletePost" />
    </div>
  </div>
</template>

<script>
import PostList from "./PostList.vue";
import store from "../store"; // Import the Vuex store
import NavbarComponent from "./NavbarComponent.vue";

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

<!-- Fixed -->
