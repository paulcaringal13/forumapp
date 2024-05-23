<template>
  <div className="flex flex-col h-full w-full">
    <NavbarComponent />

    <div
      v-if="!currentUser.name && !currentPost.id"
      className="flex flex-col grow gap-2 bg-white shadow-md rounded-lg p-4 m-5 items-center justify-center"
    >
      <v-icon name="ri-loader-2-fill" scale="4" animation="spin" speed="slow" />
      <h1 className="text-3xl font-semibold ml-2">Please Wait</h1>
    </div>
    <div v-else>
      <div
        className="flex flex-col grow gap-2 bg-white shadow-md rounded-lg p-4 m-5"
      >
        <div className="border-b-[1px] border-gray-400 drop-shadow-xl p-2">
          <div className="space-y-1">
            <h1 className="font-bold text-sm">
              <v-icon name="ri-user-3-fill" scale="1" className="mr-2" />
              <span className="ml-2 font-2xl text-gray-400">{{
                this.currentPost.user.name
              }}</span>
            </h1>
          </div>
        </div>
        <div className="flex flex-col gap-1 px-6">
          <h3 className="font-extrabold text-xl">{{ currentPost.title }}</h3>
          <h2 className="font-medium text-sm">
            {{ currentPost.body }}
          </h2>
        </div>
        <div
          className="border-b-[1px] border-gray-400 drop-shadow-xl px-2 pb-2"
        >
          <div className="space-y-1">
            <h1 className="font-bold text-sm">
              <v-icon name="ri-message-3-line" scale="1" className="mr-2" />
              <span className="ml-2 font-2xl text-gray-400">Comments</span>
            </h1>
          </div>
        </div>
        <div
          v-if="this.comments.length == 0"
          className="text-lg font-semibold mx-auto my-5 flex text-gray-400"
        >
          No Comments Yet
        </div>
        <div v-else>
          <div className="relative">
            <div
              v-for="comment in this.comments"
              :key="comment.id"
              className="border-b-[1px] border-gray-400 drop-shadow-xl p-2"
            >
              <div className="space-y-1">
                <div className="w-full flex justify-between">
                  <h5 className="font-bold text-sm">
                    <v-icon name="ri-user-3-fill" scale=".8" className="mr-2" />
                    <span className="ml-2 font-medium text-gray-400">{{
                      comment.user.name
                    }}</span>
                  </h5>
                  <div
                    className="w-fit flex gap-2"
                    v-if="comment.user.id === this.currentUser.id"
                  >
                    <button @click="openEditBox(comment)" className="">
                      <span
                        className="ml-2 font-medium text-gray-400 text-xs hover:text-black"
                        >Edit</span
                      >
                    </button>
                    <button @click="deleteComment(comment.id)" className="">
                      <span
                        className="ml-2 font-medium text-gray-400 text-xs hover:text-black"
                        >Delete</span
                      >
                    </button>
                  </div>
                </div>

                <div
                  v-if="selectedComment.id == comment.id"
                  class="transform duration-500 transition-all relative"
                >
                  <input
                    type="text"
                    v-model="selectedComment.comment_body"
                    class="w-full px-3 py-2 text-xs outline outline-1 focus:outline-2 rounded-sm shadow-none transform duration-500 transition-all"
                    id="comment"
                    required
                  />

                  <button
                    className="absolute right-0 top-0 mt-[6px] mr-2 text-xs p-1 text-gray-400 hover:text-black"
                    @click="updateComment()"
                  >
                    Update comment
                  </button>
                </div>
                <p className="text-sm text-gray-400" v-else>
                  {{ comment.comment_body }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <h1 className="font-bold text-sm mb-1 mt-2">
            <v-icon name="ri-user-3-fill" scale=".8" className="mr-2" />
            <span className="ml-2  text-xs text-gray-400">{{
              this.currentUser.name
            }}</span>
          </h1>
          <textarea
            type="text"
            v-model="comment"
            class="w-full px-3 py-2 text-xs outline outline-1 focus:outline-2 rounded-sm shadow-none transform duration-500 transition-all"
            id="comment"
            required
          />

          <button
            className="absolute right-0 bottom-0 mb-2 mr-2 text-xs p-1 text-gray-400 hover:text-black"
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
import NavbarComponent from "./NavbarComponent.vue";
import axiosClient from "../../axios/axios";

export default {
  name: "ViewPost",
  components: {
    NavbarComponent,
  },
  data() {
    return {
      comments: [],
      comment: "",
      currentPost: {
        user: {},
        title: "",
        body: "",
      },
      currentUser: {},
      selectedComment: {},
    };
  },
  async mounted() {
    axiosClient
      .get(`/user/${localStorage.getItem("id")}`)
      .then((res) => {
        this.currentUser = res.data;
      })
      .catch((err) => console.log(err));

    axiosClient
      .get(`/viewpost/${localStorage.getItem("postId")}`)
      .then((res) => {
        this.comments = res.data.comments;
        this.currentPost = res.data;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    postComment() {
      const comment_data = {
        post_id: this.currentPost.id,
        comment_body: this.comment,
      };

      axiosClient
        .post("/commentPost", comment_data)
        .then((res) => {
          this.comments.push(res.data.response);
          this.comment = "";
        })
        .catch((err) => console.log(err));
    },

    updateComment() {
      console.log(this.selectedComment);
      axiosClient
        .put(`/commentUpdate/${this.selectedComment.id}`, this.selectedComment)
        .then((res) => {
          this.currentPost.comments.forEach((comment) => {
            if (comment.id === res.data.comment.id) {
              comment.comment_body = res.data.comment.comment_body;
            }
          });

          alert("Comment updated successfully!");
          this.selectedComment = {};
        })
        .catch((err) => console.log(err));
    },

    deleteComment(commentId) {
      axiosClient
        .delete(`/commentDelete/${commentId}`)
        .then((res) => {
          axiosClient
            .get(`/viewpost/${localStorage.getItem("postId")}`)
            .then((res) => {
              this.comments = res.data.comments;
              this.currentPost = res.data;
            })
            .catch((err) => console.log(err));

          alert(res.data.response);
        })
        .catch((err) => console.log(err));
    },

    openEditBox(comment) {
      this.selectedComment = comment;
    },
  },
};
</script>
