<template>
  <div className="flex flex-col grow gap-5 bg-white shadow-md rounded-lg p-4">
    <div
      v-for="post in posts"
      :key="post.id"
      className="border-b-[1px] border-gray-400 drop-shadow-xl p-2"
    >
      <div className="space-y-1">
        <div className="flex justify-between">
          <h5 className="font-bold text-sm">
            <v-icon name="ri-user-3-fill" scale=".8" className="mr-2" />
            <span className="ml-2 font-medium text-gray-400">{{
              post.user.name
            }}</span>
          </h5>
          <div className="w-fit flex gap-3" v-if="this.currentPage == 'posts'">
            <button
              @click="goToEdit(post.id)"
              className="group hover:text-green-500"
            >
              <v-icon name="ri-edit-line" scale=".8" className="mr-2" />
              <span
                className="ml-2 font-medium text-gray-400 text-xs group-hover:text-green-500"
                >Edit</span
              >
            </button>
            <button
              @click="deletePost(post)"
              className="group hover:text-red-500"
            >
              <v-icon name="ri-delete-bin-7-line" scale=".8" className="mr-2" />
              <span
                className="ml-2 font-medium text-gray-400 text-xs group-hover:text-red-500"
                >Delete</span
              >
            </button>
          </div>
        </div>
        <p className="font-bold text-black text-lg">{{ post.title }}</p>

        <p className="text-sm text-gray-400">{{ post.body }}</p>

        <button @click="viewPost(post)" className="btn btn-secondary mr-2">
          <v-icon name="ri-eye-line" scale=".8" className="mr-2" />
          <span className="ml-2 font-medium text-gray-400 text-xs"
            >View Post</span
          >
        </button>
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
            @click="postComment()"
          >
            Post comment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosClient from "../../axios/axios";

export default {
  name: "PostList",
  props: ["posts"],
  data() {
    return {
      comment: "",
      selectedPost: 0,
      user_id: localStorage.getItem("id"),
      currentPage: this.$route.name,
    };
  },
  methods: {
    viewPost(post) {
      this.$store.state.selectedPost = post;
      this.$store.state.updatepost.postTitle = post.title;
      this.$store.state.updatepost.postBody = post.body;
      localStorage.setItem("postId", post.id);
      this.$router.push(`/viewpost/${this.$store.state.user.id}`);
    },
    setCommentBox(post) {
      this.comment = "";
      this.selectedPost = post.id;
    },

    goToEdit(postId) {
      this.$router.push(`/edit/${localStorage.getItem("id")}`);
      localStorage.setItem("postId", postId);
    },

    postComment() {
      const comment_data = {
        post_id: this.selectedPost,
        comment_body: this.comment,
      };
      axiosClient
        .post("/commentPost", comment_data)
        .then((res) => {
          this.posts.forEach((post) => {
            if (post.id === this.selectedPost) {
              post.comments.push(res.data.response);
            }
          });
          this.comment = "";
          this.selectedPost = 0;
          alert("Comment posted successfully, view post to see your comment.");
        })
        .catch((err) => console.log(err));
    },

    deletePost(post) {
      axiosClient
        .delete(`/postDelete/${post.id}`)
        .then((res) => {
          alert(res.data.response);
          this.$store.dispatch("getPost");
          this.$store.dispatch("getMyPost");
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.$store.dispatch("getUser", localStorage.getItem("id"));
  },
};
</script>
