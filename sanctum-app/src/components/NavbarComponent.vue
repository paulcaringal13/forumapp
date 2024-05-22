<template>
  <nav class="flex justify-between py-5 bg-slate-800 text-white">
    <router-link class="ml-10 font-extrabold">ForumApp</router-link>
    <ul class="w-fit flex gap-3 mr-10">
      <li class="nav-item">
        <router-link :to="`/home/${this.userId}`" class="nav-link"
          >Home</router-link
        >
      </li>
      <li class="nav-item">
        <router-link :to="`/posts/${this.userId}`" class="nav-link"
          >My Posts</router-link
        >
      </li>
      <li class="nav-item">
        <router-link to="/logout" class="nav-link">Logout</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavbarComponent",
  data() {
    return {
      userId: localStorage.getItem("id"),
    };
  },
};
</script>

<!-- Fixed -->
