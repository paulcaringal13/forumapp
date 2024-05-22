<template>
  <div className="flex flex-col h-full w-full">
    <NavbarComponent />
    <h2 className="mx-10 mt-4 text-xl font-semibold">Add New Post</h2>
    <div
      className="flex flex-col p-4 mx-10 my-4 grow gap-5 bg-white shadow-md rounded-lg"
    >
      <div className="flex flex-col grow gap-2">
        <label for="title" className="text-xl font-semibold">Title:</label>
        <input
          type="text"
          v-model="title"
          className="form-control w-full px-4 py-3 text-xs outline outline-1 focus:outline-2 rounded-md mx-1"
          id="title"
          required
        />
        <label for="content" className="text-xl font-semibold">Content:</label>
        <textarea
          v-model="content"
          className="form-control grow w-full px-4 py-3 text-xs outline outline-1 focus:outline-2 rounded-md mx-1"
          id="content"
          rows="3"
          required
        ></textarea>
        <button
          @click="addPost"
          className="w-fit px-5 py-2 bg-slate-800 text-white ml-auto rounded-lg shadow-md hover:bg-slate-700"
        >
          Add Post
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axiosClient from "../../axios/axios";

import NavbarComponent from "./NavbarComponent.vue";

export default {
  name: "AddPost",
  components: {
    NavbarComponent,
  },
  data() {
    return {
      title: "",
      content: "",
    };
  },

  methods: {
    addPost() {
      const newPost = {
        title: this.title,
        content: this.content,
      };
      console.log(newPost);

      axiosClient
        .post("/postsCreate", newPost)
        .then((res) => {
          console.log(res);

          console.log(this.$store.state.posts);

          this.$store.state.posts = res.data.posts;
          setTimeout(() => {
            this.$router.push("/home");
          }, 2000);
        })
        .catch((err) => console.log(err)); // Dispatch addPost action from store
    },
  },
};
</script>

<!-- Fixed -->

