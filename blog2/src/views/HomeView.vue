<template>
  <div class="home">
    <div class="hero">
      <AboutMe />
      <br>
      <div class="recent">
        <h1>Recent Blogs</h1>
        <h2>A variety of topics...</h2>
        <BlogList :blogs="blogs" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AboutMe from '@/components/AboutMe.vue';
import BlogList from '@/components/BlogList.vue';
import axios from '@/axios'; // Import the globally configured axios instance

import { ref, onMounted } from 'vue'; // Import ref and onMounted

export default {
  name: 'HomeView',
  components: {
    AboutMe,
    BlogList
  },
  setup() {
    const blogs = ref([]);

    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/posts/date'); // Use global axios
        blogs.value = response.data.slice(0, 5).map(post => ({
          id: post.id,
          short: post.short_name,
          title: post.title,
          date: post.date
        }));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    onMounted(fetchBlogs);

    return {
      blogs
    };
  }
}
</script>

<style scoped>
.home {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px;
  text-align: left;
}

.recent h2 {
  font-size: 1.3em;
  margin: 0;
  margin-top: 5px;
}

.recent h1 {
  font-size: 2em;
  margin: 0;
  margin-top: 30px;
}

h1 {
  margin-top: 30px;
  font-size: 2em;
}
</style>
