<template>
  <div className="flex flex-col h-full w-full">
    <NavbarComponent />
    <h2 className="mx-10 mt-4 text-xl font-semibold">Edit Post</h2>
    <div
      className="flex flex-col p-4 mx-10 my-4 grow gap-5 bg-white shadow-md rounded-lg"
    >
      <form @submit.prevent="editPost" className="flex flex-col grow gap-2">
        <label for="title" className="text-xl font-semibold">Title</label>
        <input
          type="text"
          v-model="title"
          className="form-control w-full px-4 py-3 text-xs outline outline-1 focus:outline-2 rounded-md mx-1"
          id="title"
          required
        />
        <label for="content" className="text-xl font-semibold">Content</label>
        <textarea
          v-model="content"
          className="form-control grow w-full px-4 py-3 text-xs outline outline-1 focus:outline-2 rounded-md mx-1"
          id="content"
          rows="3"
          required
        ></textarea>
        <button
          type="submit"
          className="w-fit px-5 py-2 bg-slate-800 text-white ml-auto rounded-lg shadow-md hover:bg-slate-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import store from "../store"; // Import the Vuex store
import NavbarComponent from "./NavbarComponent.vue";

export default {
  name: "EditPost",
  props: ["id"],
  data() {
    return {
      title: "",
      content: "",
    };
  },
  components: {
    NavbarComponent,
  },
  computed: {
    post() {
      return store.getters.getPostById(parseInt(this.id));
    },
  },
  created() {
    if (this.post) {
      this.title = this.post.title;
      this.content = this.post.content;
    }
  },
  methods: {
    editPost() {
      const updatedPost = {
        id: parseInt(this.id),
        title: this.title,
        content: this.content,
      };
      store.dispatch("editPost", updatedPost); // Dispatch editPost action from store
      this.$router.push("/home");
    },
  },
};
</script>

<!-- Fixed -->
