import { createStore } from "vuex";
import axiosClient from "../../axios/axios";

export default createStore({
  state: {
    user: {
      name: localStorage.getItem("name"),
      id: localStorage.getItem("id"),
      email: localStorage.getItem("email"),
    },
    posts: [],
    selectedPost: {},
    updatepost: {
      postTitle: "",
      postBody: "",
    },
    myPost: {},
  },
  mutations: {
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
    setUser(state, currentUser) {
      state.user = currentUser;
    },
    setMyPost(state, data) {
      state.myPost = data;
    },
    setSelectedPost(state, data) {
      state.selectedPost = data;
    },
  },

  actions: {
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
          commit("setPosts", res.data.posts);
        })
        .catch((err) => console.log(err));
    },
    getUser({ commit }, user_id) {
      axiosClient
        .get(`/user/${user_id}`)
        .then((res) => {
          commit("setUser", res.data);
          console.log("ginawa ko getuser", res.data);
        })
        .catch((err) => console.log(err));
    },

    getSelectedPost({ commit }, postId) {
      axiosClient
        .get(`/viewpost/${postId}`)
        .then((res) => {
          commit("setSelectedPost", res.data);
          console.log("ginawa ko", res.data);
        })
        .catch((err) => console.log(err));
    },

    getMyPost({ commit }) {
      axiosClient
        .get("/mypost")
        .then((res) => {
          commit("setMyPost", res.data.response);
        })
        .catch((err) => console.log(err));
    },

    setCurrentUser({ commit }, currentUser) {
      commit("setUser", currentUser);
    },
  },
  getters: {
    allPosts: (state) => state.posts,
    getPostById: (state) => (id) => state.posts.find((post) => post.id === id),
  },
});

// Fixed
