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
        <div
          className="flex flex-col gap-1 px-6 pb-4 border-b-[1px] border-gray-400 drop-shadow-xl"
        >
          <h3 className="font-extrabold text-xl">{{ currentPost.title }}</h3>
          <h2 className="font-medium text-sm">
            {{ currentPost.body }}
          </h2>
        </div>
        <div className="border-b-[1px] border-gray-400 drop-shadow-xl p-2">
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
                <h5 className="font-bold text-sm">
                  <v-icon name="ri-user-3-fill" scale=".8" className="mr-2" />
                  <span className="ml-2 font-medium text-gray-400">{{
                    comment.user.name
                  }}</span>
                </h5>

                <p className="text-sm text-gray-400">
                  {{ comment.comment_body }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
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
    };
  },
  async mounted() {
    axiosClient
      .get(`/user/${localStorage.getItem("id")}`)
      .then((res) => {
        this.currentUser = res.data;
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    axiosClient
      .get(`/viewpost/${localStorage.getItem("postId")}`)
      .then((res) => {
        this.comments = res.data.comments;
        this.currentPost.title = res.data.title;
        this.currentPost.body = res.data.body;
        this.currentPost.user = res.data.user;
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  },
  //   methods: {
  //     async loadData() {
  //       const data = await this.fetchData();

  //       if (!data) {
  //         console.log("Data not found");
  //       } else {
  //         console.log(data);
  //       }
  //       // After data is fetched, update component data
  //
  //     },
  //     fetchData() {
  //       return new Promise((resolve) => {
  //         this.$store
  //           .dispatch("getSelectedPost", localStorage.getItem("postId"))
  //           .then(() =>
  //             this.$store.dispatch("getUser", localStorage.getItem("id"))
  //           )
  //           .then(() => resolve());
  //       });
  //     },

  //   updatePost(id) {

  //       axiosClient.put(`/postsUpdate/${id}`, this.updatepostdata).then((res) => {
  //           this.$store.state.selectedPost.title = this.updatepostdata.postTitle;
  //           this.$store.state.selectedPost.body = this.updatepostdata.postBody;
  //       }).catch((err) => console.log(err));

  //   },
  //   deletePost(id) {

  //       axiosClient.delete(`/postDelete/${id}`).then((res) => {
  //           console.log(res.data);
  //           this.$store.dispatch('getPost');
  //           this.createToast('deleted post');
  //           this.visibleDelete = false;
  //           setTimeout(() => {
  //               this.$router.push('/home');
  //           }, 2000);
  //       }).catch((err) => console.log(err));

  //   },
  //   postComment() {
  //       const comment_data = {
  //           post_id: this.posts.id,
  //           comment_body: this.comment_body,
  //       }

  //       axiosClient.post('/commentPost', comment_data).then((res) => {

  //           this.$store.dispatch('getPost');
  //           this.posts.comments.push(res.data.response);
  //           this.createToast('commented to post');
  //           this.showComment = false;
  //       }).catch((err) => console.log(err));
  //   },
  //   },
};
</script>
