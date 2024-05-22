<template>
    <div className="flex flex-col h-full w-full">
      <NavbarComponent />
      <div className="flex justify-between mx-10 mt-4 text-xl font-semibold">
        <h1>My Posts</h1>
      </div>
  
      <div class="flex flex-col py-3 grow mx-10">
        <PostList :posts="posts" @delete-post="deletePost" />
      </div>
    </div>
  </template>
  
  <script>
  import PostList from "./PostList.vue";
  import store from "../store"; // Import the Vuex store
  import NavbarComponent from "./NavbarComponent.vue";
  
  export default {
    name: "MyPosts",
  
    components: {
      NavbarComponent,
      PostList,
    },
    computed: {
      posts() {
        return this.$store.state.myPost;
      },
    },
    mounted() {
      this.$store.dispatch("getMyPost");
    },
    methods: {
      deletePost(postId) {
        store.dispatch("deletePost", postId); // Dispatch deletePost action from store
      },
    },
  };
  </script>
  
  <!-- Fixed -->