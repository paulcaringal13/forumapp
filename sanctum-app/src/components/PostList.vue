<template>
  <div className="flex flex-col grow gap-5 bg-white shadow-md rounded-lg p-4">
    <div
      v-for="post in posts"
      :key="post.id"
      className="border-b-[1px] border-gray-400 drop-shadow-xl p-2"
    >
      <div className="space-y-1">
        <h5 className="font-bold text-sm">
          <v-icon name="ri-user-3-fill" scale=".8" className="mr-2" />
          <span className="ml-2 font-medium text-gray-400">{{
            post.user.name
          }}</span>
        </h5>
        <p className="font-bold text-black text-lg">{{ post.title }}</p>

        <p className="text-sm text-gray-400">{{ post.body }}</p>

        <router-link
          :to="{ name: 'EditPost', params: { id: post.id } }"
          className="btn btn-secondary mr-2"
        >
          <v-icon name="ri-message-3-line" scale=".8" className="mr-2" />
          <span className="ml-2 font-medium text-gray-400 text-xs"
            >Comment</span
          ></router-link
        >
        <!-- <button @click="deletePost(post.id)" className="btn btn-danger">
          Delete
        </button> -->
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store"; // Import the Vuex store

export default {
  name: "PostList",
  props: ["posts"],
  methods: {
    deletePost(postId) {
      store.dispatch("deletePost", postId); // Dispatch deletePost action from store
    },
  },
  mounted() {
    console.log(this.posts);
  },
};
</script>

<!-- Fixed -->
