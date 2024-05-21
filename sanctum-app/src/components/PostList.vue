<template>
  <div>
    <div v-for="post in posts" :key="post.id" class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">{{ post.title }}</h5>
        <p class="card-text">{{ post.content }}</p>
        <router-link
          :to="{ name: 'EditPost', params: { id: post.id } }"
          class="btn btn-secondary mr-2"
          >Edit</router-link
        >
        <button @click="deletePost(post.id)" class="btn btn-danger">
          Delete
        </button>
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
};
</script>

<!-- Fixed -->
