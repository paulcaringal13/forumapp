<template>
  <div className="flex flex-col h-full w-full">
    <NavbarComponent />

    <div className="flex justify-between mx-10 mt-4 text-xl font-semibold">
      <h1>Posts</h1>
      <router-link :to="`/add/${this.userId}`">Create Post</router-link>
    </div>

    <div v-if="posts.length == 0" class="flex flex-col py-3 grow mx-10">
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
  name: "HomePage",

  components: {
    NavbarComponent,
    PostList,
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
    userId() {
      return localStorage.getItem("id");
    },
  },
  mounted() {
    this.$store.dispatch("getPost");
    this.$store.dispatch("getUser", localStorage.getItem("id"));
  },

  methods: {
    deletePost(postId) {
      store.commit("deletePost", postId); // Dispatch deletePost action from store
    },
  },
};
</script>

<!-- Fixed -->
