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
    setPosts(state, posts) {
      state.posts = posts;
    },
    setUser(state, currentUser) {
      state.user = currentUser;
    },
    setMyPost(state, data) {
      state.myPost = data;
    },
  },

  actions: {
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
