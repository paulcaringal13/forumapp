import { createStore } from "vuex";
import axiosClient from "../../axios/axios";

export default createStore({
  state: {
    posts: [
      // { id: 1, title: "Post 1", content: "Content of post 1 🍆🧓" },
      // { id: 2, title: "Post 2", content: "Content of post 2 🍑🍒" },
    ],
  },
  mutations: {
    ADD_POST(state, post) {
      state.posts.push(post);
    },
    EDIT_POST(state, updatedPost) {
      const index = state.posts.findIndex((post) => post.id === updatedPost.id);
      if (index !== -1) {
        state.posts[index] = updatedPost;
      }
    },
    DELETE_POST(state, postId) {
      state.posts = state.posts.filter((post) => post.id !== postId);
    },
    setPosts(state, posts) {
      state.posts = posts;
    },
  },

  actions: {
    addPost({ commit }, post) {
      commit("ADD_POST", post);
    },
    editPost({ commit }, post) {
      commit("EDIT_POST", post);
    },
    deletePost({ commit }, postId) {
      commit("DELETE_POST", postId);
    },
    getPost({ commit }) {
      axiosClient
        .get("/posts")
        .then((res) => {
          console.log(res.data.posts);
          commit("setPosts", res.data.posts);
        })
        .catch((err) => console.log(err));
    },
  },
  getters: {
    allPosts: (state) => state.posts,
    getPostById: (state) => (id) => state.posts.find((post) => post.id === id),
  },
});
