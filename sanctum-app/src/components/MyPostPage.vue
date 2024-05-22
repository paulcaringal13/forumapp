<template>
  <div className="flex flex-col h-full w-full">
    <NavbarComponent />
    <div className="flex justify-between mx-10 mt-4 text-xl font-semibold">
      <h1>My Posts</h1>
    </div>
    <div v-if="posts.length == undefined" class="flex flex-col py-3 grow mx-10">
      <div
        className="flex flex-col grow gap-5 bg-white shadow-md rounded-lg p-4 items-center justify-center"
      >
        <v-icon
          name="ri-loader-2-fill"
          scale="4"
          animation="spin"
          speed="slow"
        />
        <h1 className="text-3xl font-semibold ml-2">Please Wait</h1>
      </div>
    </div>
    <div v-else>
      <div class="flex flex-col py-3 grow mx-10">
        <PostList :posts="posts" @delete-post="deletePost" />
      </div>
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

    console.log(this.posts.length0);
  },
  methods: {
    deletePost(postId) {
      store.dispatch("deletePost", postId); // Dispatch deletePost action from store
    },
  },
};
</script>

<!-- Fixed -->
