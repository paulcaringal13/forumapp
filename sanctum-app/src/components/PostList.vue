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
          <v-icon name="ri-eye-line" scale=".8" className="mr-2" />
          <span className="ml-2 font-medium text-gray-400 text-xs"
            >View Post</span
          ></router-link
        >
        <button @click="setCommentBox(post)" className="btn btn-secondary mr-2">
          <v-icon name="ri-message-3-line" scale=".8" className="mr-2" />
          <span className="ml-2 font-medium text-gray-400 text-xs"
            >Comment</span
          >
        </button>
        <div
          v-if="selectedPost == post.id"
          class="transform duration-500 transition-all relative"
          :class="{
            'scale-100': selectedPost == post.id,
            'scale-0': selectedPost != post.id,
          }"
        >
          <input
            type="text"
            v-model="comment"
            class="w-full px-3 py-2 text-xs outline outline-1 focus:outline-2 rounded-sm shadow-none transform duration-500 transition-all"
            id="comment"
            required
          />

          <button
            className="absolute right-0 top-0 mt-[6px] mr-2 text-xs p-1 text-gray-400 hover:text-black"
          >
            Post comment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store"; // Import the Vuex store

export default {
  name: "PostList",
  props: ["posts"],
  data() {
    return {
      comment: "",
      selectedPost: { isCommentBoxShowing: false, post_id: 0 },
    };
  },
  methods: {
    setCommentBox(post) {
      this.comment = "";
      this.selectedPost = post.id;
    },
    deletePost(postId) {
      store.dispatch("deletePost", postId); // Dispatch deletePost action from store
    },
  },
};
</script>

<!-- Fixed -->